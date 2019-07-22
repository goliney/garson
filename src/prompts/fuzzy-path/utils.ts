import fs from 'fs';
import path from 'path';
import util from 'util';
import fuzzy from 'fuzzy';

export type NodesList = string[];

const readdir = util.promisify(fs.readdir);

export async function listNodes(nodePath: string): Promise<NodesList> {
  try {
    const nodes = await readdir(nodePath);
    const currentNode = [nodePath];
    if (nodes.length === 0) {
      return currentNode;
    }
    const nodesWithPath = nodes.map(nodeName => listNodes(path.join(nodePath, nodeName)));
    const subNodes = await Promise.all(nodesWithPath);
    return subNodes.reduce((acc, val) => acc.concat(val), currentNode);
  } catch (err) {
    if (err.code === 'ENOTDIR') {
      return [nodePath];
    }
    return [];
  }
}

export function fuzzySearchNodes(nodes: NodesList, pattern: string): NodesList {
  return fuzzy
    .filter(pattern, nodes, { pre: '<Color green>', post: '</Color>' })
    .map(match => match.string);
}
