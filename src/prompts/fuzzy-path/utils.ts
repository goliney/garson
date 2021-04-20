import glob, { IOptions } from 'glob';
import {
  compareFilePathsByFuzzyScore,
  scoreFilePathFuzzy,
  prepareQuery,
  IItemScore,
} from 'vscode-fuzzy-scorer';

export interface FuzzySearchItem {
  path: string;
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

export async function listNodes(pattern: string, options: IOptions = {}): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(pattern, options, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

export function fuzzySearchNodes(nodes: string[] | null, pattern: string): FuzzySearchItem[] {
  if (!nodes) {
    return [];
  }

  if (!pattern) {
    return nodes.map(path => ({ path, score: null }));
  }

  const query = prepareQuery(pattern);

  const cache = {};

  const results = [...nodes].sort((pathA, pathB) =>
    compareFilePathsByFuzzyScore({ pathA, pathB, query, cache })
  );

  return results.map(path => ({
    path,
    score: scoreFilePathFuzzy({ path, query, cache }),
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
