import fs from 'fs';
import path from 'path';
import util from 'util';
import {
  compareFilePathsByFuzzyScore,
  scoreFilePathFuzzy,
  prepareQuery,
  IItemScore,
} from 'vscode-fuzzy-scorer';

export interface PathNode {
  isDir: boolean;
  path: string;
  relativePath: string;
  score: IItemScore | null;
}

export interface HighlightToken {
  value: string;
  highlighted: boolean;
  key: string; // token key used by React map
}

export interface ScoreMatch {
  start: number;
  end: number;
}

const readdir = util.promisify(fs.readdir);

export async function listNodes(nodePath: string, root?: string): Promise<PathNode[]> {
  const relativeRoot = root || nodePath;
  try {
    const nodes = await readdir(nodePath);
    const currentNode = [
      {
        isDir: true,
        path: nodePath,
        relativePath: path.relative(relativeRoot, nodePath),
        score: null,
      },
    ];
    if (nodes.length === 0) {
      return currentNode;
    }
    // recursively get child nodes
    const nodesWithPath = nodes.map(nodeName =>
      listNodes(path.join(nodePath, nodeName), relativeRoot)
    );
    const subNodes = await Promise.all(nodesWithPath);
    return subNodes.reduce((acc, val) => acc.concat(val), currentNode);
  } catch (err) {
    if (err.code === 'ENOTDIR') {
      return [
        {
          isDir: false,
          path: nodePath,
          relativePath: path.relative(relativeRoot, nodePath),
          score: null,
        },
      ];
    }
    return [];
  }
}

export function fuzzySearchNodes(nodes: PathNode[] | null, pattern: string): PathNode[] {
  if (!nodes) {
    return [];
  }

  if (!pattern) {
    return nodes.map(node => ({ ...node }));
  }

  const query = prepareQuery(pattern);

  const cache = {};

  const results = [...nodes].sort((r1, r2) =>
    compareFilePathsByFuzzyScore({ pathA: r1.relativePath, pathB: r2.relativePath, query, cache })
  );

  return results.map(item => ({
    ...item,
    score: scoreFilePathFuzzy({ path: item.relativePath, query, cache }),
  }));
}

export function highlightStringByScore(source: string, matches: ScoreMatch[]) {
  const { start } = matches[0];
  const tokens = start === 0 ? [] : [{ start: 0, end: start, highlighted: false }];

  matches.forEach((match, index) => {
    tokens.push({ start: match.start, end: match.end, highlighted: true });
    if (match.end === source.length) {
      return;
    }
    const isLast = index === matches.length - 1;

    const nextStart = isLast ? source.length : matches[index + 1].start;
    tokens.push({ start: match.end, end: nextStart, highlighted: false });
  });

  return tokens.map(token => {
    const substring = source.slice(token.start, token.end);
    return {
      key: `${substring} ${token.start}`,
      value: substring,
      highlighted: token.highlighted,
    };
  });
}
