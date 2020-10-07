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

export interface NthChildNode {
  kind: 'nth-child';
  position: number;
}

export interface AtIndexNode {
  kind: 'at-index';
  index: number;
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
  | NthChildNode
  | AtIndexNode
  | CombineNode;
