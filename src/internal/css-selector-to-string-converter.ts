import {
  AtIndexNode,
  AttributeNode,
  ClassNode,
  CombineNode,
  ElementNode,
  IdNode,
  Node,
  NotNode,
  NthChildNode,
  NthOfTypeNode,
} from './node';
import { assertInvalidNode } from './utils/assert-invalid-node';

export class CssSelectorToStringConverter {
  private static stringifyNode(node: Node): string {
    switch (node.kind) {
      case 'empty':
        return CssSelectorToStringConverter.empty();
      case 'id':
        return CssSelectorToStringConverter.id(node);
      case 'class':
        return CssSelectorToStringConverter.class(node);
      case 'root':
        return CssSelectorToStringConverter.root();
      case 'element':
        return CssSelectorToStringConverter.element(node);
      case 'attribute':
        return CssSelectorToStringConverter.attribute(node);
      case 'active':
        return CssSelectorToStringConverter.active();
      case 'hover':
        return CssSelectorToStringConverter.hover();
      case 'visited':
        return CssSelectorToStringConverter.visited();
      case 'focus':
        return CssSelectorToStringConverter.focus();
      case 'checked':
        return CssSelectorToStringConverter.checked();
      case 'valid':
        return CssSelectorToStringConverter.valid();
      case 'invalid':
        return CssSelectorToStringConverter.invalid();
      case 'disabled':
        return CssSelectorToStringConverter.disabled();
      case 'enabled':
        return CssSelectorToStringConverter.enabled();
      case 'at-index':
        return CssSelectorToStringConverter.eq(node);
      case 'first-child':
        return CssSelectorToStringConverter.firstChild();
      case 'last-child':
        return CssSelectorToStringConverter.lastChild();
      case 'nth-child':
        return CssSelectorToStringConverter.nthChild(node);
      case 'first-node':
        return CssSelectorToStringConverter.firstNode();
      case 'last-node':
        return CssSelectorToStringConverter.lastNode();
      case 'nth-of-type':
        return CssSelectorToStringConverter.nthOfType(node);
      case 'not':
        return CssSelectorToStringConverter.not(node);
      case 'combine':
        return CssSelectorToStringConverter.combine(node);
      default:
        return assertInvalidNode(node);
    }
  }

  private static empty(): string {
    return '';
  }

  private static id(node: IdNode): string {
    return `#${node.value}`;
  }

  private static class(node: ClassNode): string {
    return `.${node.value}`;
  }

  private static root(): string {
    return ':root';
  }

  private static element(node: ElementNode): string {
    return `${node.value}`;
  }

  private static active(): string {
    return ':active';
  }

  private static hover(): string {
    return ':hover';
  }

  private static visited(): string {
    return ':visited';
  }

  private static focus(): string {
    return ':focus';
  }

  private static checked(): string {
    return ':checked';
  }

  private static valid(): string {
    return ':valid';
  }

  private static invalid(): string {
    return ':invalid';
  }

  private static disabled(): string {
    return ':disabled';
  }

  private static enabled(): string {
    return ':enabled';
  }

  private static attribute(node: AttributeNode): string {
    const value: string = node.operator && node.value ? `${node.operator}"${node.value}"` : '';

    return `[${node.attr}${value}]`;
  }

  private static eq(node: AtIndexNode): string {
    return `:nth-child(${node.value + 1})`;
  }

  private static firstChild(): string {
    return ':first-child';
  }

  private static lastChild(): string {
    return ':last-child';
  }

  private static nthChild(node: NthChildNode): string {
    return `:nth-child(${node.value})`;
  }

  private static firstNode(): string {
    return ':first-node';
  }

  private static lastNode(): string {
    return ':last-node';
  }

  private static nthOfType(node: NthOfTypeNode): string {
    return `:nth-of-type(${node.value})`;
  }

  private static not(node: NotNode): string {
    return `:not(${CssSelectorToStringConverter.stringifyNode(node.child)})`;
  }

  private static combine(node: CombineNode): string {
    return node.children
      .map((childNode: Node): string => CssSelectorToStringConverter.stringifyNode(childNode))
      .join(node.separator);
  }

  #node: Node;

  constructor(node: Node) {
    this.#node = node;
  }

  public toString(): string {
    return CssSelectorToStringConverter.stringifyNode(this.#node);
  }
}
