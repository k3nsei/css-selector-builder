import type {
  AtIndexNode,
  AttributeNode,
  AttributeNodeOperator,
  ClassNode,
  CombineNode,
  CombineNodeSeparator,
  ElementNode,
  EmptyNode,
  IdNode,
  Node,
  NthChildNode,
} from './node';
import { assertInvalidNode } from './utils/assert-invalid-node';

const EMPTY_NODE: EmptyNode = {
  kind: 'empty',
};

export class CssSelectorStringifier {
  #node: Node;

  constructor(node: Node) {
    this.#node = node;
  }

  public stringify(): string {
    return this.stringifyNode(this.#node);
  }

  private stringifyNode(node: Node): string {
    switch (node.kind) {
      case 'empty':
        return this.empty();
      case 'id':
        return this.id(node);
      case 'class':
        return this.class(node);
      case 'element':
        return this.element(node);
      case 'attribute':
        return this.attribute(node);
      case 'at-index':
        return this.eq(node);
      case 'nth-child':
        return this.nthChild(node);
      case 'combine':
        return this.combine(node);
      default:
        return assertInvalidNode(node);
    }
  }

  private empty(): string {
    return '';
  }

  private id(node: IdNode): string {
    return `#${node.value}`;
  }

  private class(node: ClassNode): string {
    return `.${node.value}`;
  }

  private element(node: ElementNode): string {
    return `${node.value}`;
  }

  private attribute(node: AttributeNode): string {
    const value: string = node.operator && node.value ? `${node.operator}"${node.value}"` : '';

    return `[${node.attr}${value}]`;
  }

  private eq(node: AtIndexNode): string {
    return `:nth-child(${node.index + 1})`;
  }

  private nthChild(node: NthChildNode): string {
    return `:nth-child(${node.position})`;
  }

  private combine(node: CombineNode): string {
    return node.children.map((childNode: Node): string => this.stringifyNode(childNode)).join(node.separator);
  }
}

export class CssSelector {
  #node: Node;

  public get node(): Node {
    return this.#node;
  }

  public static create(node: Node = EMPTY_NODE): CssSelector {
    return new CssSelector(node);
  }

  private static flatMapNodes(builders: CssSelector[]): Node[] {
    return builders.reduce((nodes: Node[], builder: CssSelector): Node[] => {
      return nodes.concat(builder.node);
    }, []);
  }

  private constructor(node: Node) {
    this.#node = node;
  }

  public stringify(): string {
    return new CssSelectorStringifier(this.node).stringify();
  }

  public id(value: string): CssSelector {
    const node: IdNode = {
      kind: 'id',
      value,
    };

    return CssSelector.create(node);
  }

  public class(value: string): CssSelector {
    const node: ClassNode = {
      kind: 'class',
      value,
    };

    return CssSelector.create(node);
  }

  public element(value: string): CssSelector {
    const node: ElementNode = {
      kind: 'element',
      value,
    };

    return CssSelector.create(node);
  }

  public attribute(attr: string, operator: AttributeNodeOperator = '=', value?: string): CssSelector {
    const node: AttributeNode = {
      kind: 'attribute',
      attr,
      operator,
      value,
    };

    return CssSelector.create(node);
  }

  public eq(index: number): CssSelector {
    const node: AtIndexNode = {
      kind: 'at-index',
      index,
    };

    return CssSelector.create(node);
  }

  public nthChild(position: number): CssSelector {
    const node: NthChildNode = {
      kind: 'nth-child',
      position,
    };

    return CssSelector.create(node);
  }

  public append(head: CssSelector, ...tail: CssSelector[]): CssSelector {
    return this.combine(' ', head, tail);
  }

  public join(head: CssSelector, ...tail: CssSelector[]): CssSelector {
    return this.combine('', head, tail);
  }

  private combine(separator: CombineNodeSeparator, head: CssSelector, tail: CssSelector[]): CssSelector {
    const node: CombineNode = {
      kind: 'combine',
      separator,
      children: [head.node].concat(CssSelector.flatMapNodes(tail)),
    };

    this.#node = node;

    return CssSelector.create(node);
  }
}
