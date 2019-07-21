import fs from 'fs';
import path from 'path';
import util from 'util';

const readdir = util.promisify(fs.readdir);

export async function listNodes(nodePath: string): Promise<string[]> {
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
