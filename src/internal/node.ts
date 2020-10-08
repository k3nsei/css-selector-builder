export interface EmptyNode {
  kind: 'empty';
}

export interface IdNode {
  kind: 'id';
  value: string;
}

export interface ClassNode {
  kind: 'class';
  value: string;
}

export interface ElementNode {
  kind: 'element';
  value: string;
}

export type AttributeNodeOperator = '=' | '~=' | '|=' | '^=' | '$=' | '*=';

export interface AttributeNode {
  kind: 'attribute';
  attr: string;
  operator?: AttributeNodeOperator;
  value?: string;
}

export interface AtIndexNode {
  kind: 'at-index';
  value: number;
}

export interface NthChildNode {
  kind: 'nth-child';
  value: number | string | 'odd' | 'even';
}

export interface NthOfTypeNode {
  kind: 'nth-of-type';
  value: number | string | 'odd' | 'even';
}

export type CombineNodeSeparator = '' | ' ' | '>';

export interface CombineNode {
  kind: 'combine';
  separator: CombineNodeSeparator;
  children: Node[];
}

export type Node =
  | EmptyNode
  | IdNode
  | ClassNode
  | ElementNode
  | AttributeNode
  | AtIndexNode
  | NthChildNode
  | NthOfTypeNode
  | CombineNode;
