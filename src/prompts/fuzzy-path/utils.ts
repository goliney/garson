import fs from 'fs';
import path from 'path';
import util from 'util';
import FuzzySearch from 'fz-search';

export type Indices = [number, number][];

export interface PathNode {
  isDir: boolean;
  path: string;
  relativePath: string;
  highlightedRelativePath: string;
}

export interface PathNodeMatched extends PathNode {
  indices: Indices;
}

interface HighlightToken {
  value: string;
  highlighted: boolean;
  key: number; // token key used by React map
}

const readdir = util.promisify(fs.readdir);

export const HIGHLIGHT_SYMBOL_START = '<HIGHLIGHT_SYMBOL_START>';
export const HIGHLIGHT_SYMBOL_END = '<HIGHLIGHT_SYMBOL_END>';

export async function listNodes(nodePath: string, root?: string): Promise<PathNode[]> {
  const relativeRoot = root || nodePath;
  try {
    const nodes = await readdir(nodePath);
    const currentNode = [
      {
        isDir: true,
        path: nodePath,
        relativePath: path.relative(relativeRoot, nodePath),
        highlightedRelativePath: '',
      },
    ];
    if (nodes.length === 0) {
      return currentNode;
    }
    const nodesWithPath = nodes.map(nodeName =>
      listNodes(path.join(nodePath, nodeName), relativeRoot),
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
          highlightedRelativePath: '',
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
    return nodes.map(node => ({ ...node, indices: [] }));
  }

  const fuzzy = new FuzzySearch<PathNode>({
    source: nodes,
    keys: 'relativePath',
    token_field_min_length: 1, // start searching with a query this long
    highlight_before: HIGHLIGHT_SYMBOL_START,
    highlight_after: HIGHLIGHT_SYMBOL_END,
  });

  const results = fuzzy.search(pattern);

  return results.map(item => ({
    ...item,
    highlightedRelativePath: fuzzy.highlight(item.relativePath),
  }));
}

export function parseHighlightedString(stringWithHighlights: string) {
  /* eslint-disable no-plusplus */
  let key = 0;
  return stringWithHighlights
    .split(HIGHLIGHT_SYMBOL_START) // RegExps are hard
    .filter(match => !!match)
    .reduce<HighlightToken[]>((acc, match) => {
      if (match.includes(HIGHLIGHT_SYMBOL_END)) {
        const [highlightedValue, value] = match.split(HIGHLIGHT_SYMBOL_END);
        // eslint-disable-next-line no-plusplus
        acc.push({ value: highlightedValue, highlighted: true, key: key++ });
        acc.push({ value, highlighted: false, key: key++ });
      } else {
        acc.push({ value: match, highlighted: false, key: key++ });
      }
      return acc;
    }, []);
  /* eslint-enable no-plusplus */
}
