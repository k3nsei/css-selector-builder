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

export interface RootElementNode {
  kind: 'root';
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

export interface ActiveNode {
  kind: 'active';
}

export interface HoverNode {
  kind: 'hover';
}

export interface VisitedNode {
  kind: 'visited';
}

export interface FocusNode {
  kind: 'focus';
}

export interface CheckedNode {
  kind: 'checked';
}

export interface RequiredNode {
  kind: 'required';
}

export interface ValidNode {
  kind: 'valid';
}

export interface InvalidNode {
  kind: 'invalid';
}

export interface DisabledNode {
  kind: 'disabled';
}

export interface EnabledNode {
  kind: 'enabled';
}

export interface AtIndexNode {
  kind: 'at-index';
  value: number;
}

export interface FirstChildNode {
  kind: 'first-child';
}

export interface LastChildNode {
  kind: 'last-child';
}

export interface NthChildNode {
  kind: 'nth-child';
  value: number | string | 'odd' | 'even';
}

export interface FirstNodeNode {
  kind: 'first-node';
}

export interface LastNodeNode {
  kind: 'last-node';
}

export interface NthOfTypeNode {
  kind: 'nth-of-type';
  value: number | string | 'odd' | 'even';
}

export interface NotNode {
  kind: 'not';
  child: Node;
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
  | RootElementNode
  | ElementNode
  | AttributeNode
  | ActiveNode
  | HoverNode
  | VisitedNode
  | FocusNode
  | CheckedNode
  | RequiredNode
  | ValidNode
  | InvalidNode
  | DisabledNode
  | EnabledNode
  | AtIndexNode
  | FirstChildNode
  | LastChildNode
  | NthChildNode
  | FirstNodeNode
  | LastNodeNode
  | NthOfTypeNode
  | NotNode
  | CombineNode;
