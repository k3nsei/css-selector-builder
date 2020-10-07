import { Node } from '../node';

export function assertInvalidNode(node: Node): never {
  throw new Error(`Unexpected node: ${node}`);
}
