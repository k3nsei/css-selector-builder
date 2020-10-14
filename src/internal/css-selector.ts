import { EMPTY_NODE } from './constants/empty-node';
import { CssSelectorToStringConverter } from './css-selector-to-string-converter';
import type {
  ActiveNode,
  AtIndexNode,
  AttributeNode,
  AttributeNodeOperator,
  CheckedNode,
  ClassNode,
  CombineNode,
  CombineNodeSeparator,
  DisabledNode,
  ElementNode,
  EmptyNode,
  EnabledNode,
  FirstChildNode,
  FirstNodeNode,
  FocusNode,
  HoverNode,
  IdNode,
  InvalidNode,
  LastChildNode,
  LastNodeNode,
  Node,
  NotNode,
  NthChildNode,
  NthOfTypeNode,
  RequiredNode,
  RootElementNode,
  ValidNode,
  VisitedNode,
} from './node';

export class CssSelector<T extends Node> {
  #node: T;

  public static create(): CssSelector<EmptyNode> {
    return new CssSelector(EMPTY_NODE);
  }

  private static from<T extends Node>(node: T): CssSelector<T> {
    return new CssSelector(node);
  }

  private constructor(node: T) {
    this.#node = node;
  }

  public toString(): string {
    return new CssSelectorToStringConverter(this.#node).toString();
  }

  public id(value: string): CssSelector<IdNode> {
    return CssSelector.from({ kind: 'id', value });
  }

  public class(value: string): CssSelector<ClassNode> {
    return CssSelector.from({ kind: 'class', value });
  }

  public root(): CssSelector<RootElementNode> {
    return CssSelector.from({ kind: 'root' });
  }

  public element(value: string): CssSelector<ElementNode> {
    return CssSelector.from({ kind: 'element', value });
  }

  public attribute(attr: string, operator: AttributeNodeOperator = '=', value?: string): CssSelector<AttributeNode> {
    return CssSelector.from({ kind: 'attribute', attr, operator, value });
  }

  public active(): CssSelector<ActiveNode> {
    return CssSelector.from({ kind: 'active' });
  }

  public hover(): CssSelector<HoverNode> {
    return CssSelector.from({ kind: 'hover' });
  }

  public visited(): CssSelector<VisitedNode> {
    return CssSelector.from({ kind: 'visited' });
  }

  public focus(): CssSelector<FocusNode> {
    return CssSelector.from({ kind: 'focus' });
  }

  public checked(): CssSelector<CheckedNode> {
    return CssSelector.from({ kind: 'checked' });
  }

  public required(): CssSelector<RequiredNode> {
    return CssSelector.from({ kind: 'required' });
  }

  public valid(): CssSelector<ValidNode> {
    return CssSelector.from({ kind: 'valid' });
  }

  public invalid(): CssSelector<InvalidNode> {
    return CssSelector.from({ kind: 'invalid' });
  }

  public disabled(): CssSelector<DisabledNode> {
    return CssSelector.from({ kind: 'disabled' });
  }

  public enabled(): CssSelector<EnabledNode> {
    return CssSelector.from({ kind: 'enabled' });
  }

  public eq(value: number): CssSelector<AtIndexNode> {
    return CssSelector.from({ kind: 'at-index', value });
  }

  public firstChild(): CssSelector<FirstChildNode> {
    return CssSelector.from({ kind: 'first-child' });
  }

  public lastChild(): CssSelector<LastChildNode> {
    return CssSelector.from({ kind: 'last-child' });
  }

  public nthChild(value: number | string | 'odd' | 'even'): CssSelector<NthChildNode> {
    return CssSelector.from({ kind: 'nth-child', value });
  }

  public firstNode(): CssSelector<FirstNodeNode> {
    return CssSelector.from({ kind: 'first-node' });
  }

  public lastNode(): CssSelector<LastNodeNode> {
    return CssSelector.from({ kind: 'last-node' });
  }

  public nthOfType(value: number | string | 'odd' | 'even'): CssSelector<NthOfTypeNode> {
    return CssSelector.from({ kind: 'nth-of-type', value });
  }

  public not<T extends Node>(selector: CssSelector<T>): CssSelector<NotNode> {
    return CssSelector.from({ kind: 'not', child: selector.#node });
  }

  public append(
    firstSelector: CssSelector<Node>,
    secondSelector: CssSelector<Node>,
    ...otherSelectors: CssSelector<Node>[]
  ): CssSelector<CombineNode> {
    return this.combine(' ', [firstSelector, secondSelector].concat(otherSelectors));
  }

  public join(
    firstSelector: CssSelector<Node>,
    secondSelector: CssSelector<Node>,
    ...otherSelectors: CssSelector<Node>[]
  ): CssSelector<CombineNode> {
    return this.combine('', [firstSelector, secondSelector].concat(otherSelectors));
  }

  private combine(separator: CombineNodeSeparator, selectors: CssSelector<Node>[]): CssSelector<CombineNode> {
    return CssSelector.from({
      kind: 'combine',
      separator,
      children: selectors.map((selector: CssSelector<Node>): Node => selector.#node),
    });
  }
}
