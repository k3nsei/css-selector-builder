import { CssSelector } from '../css-selector';

describe('CssSelector', () => {
  let b: CssSelector;

  beforeEach(() => {
    b = CssSelector.create();
  });

  it('Should return empty string', () => {
    const expected: string = '';
    const result: string = b.toString();

    expect(result).toBe(expected);
  });

  it('Should id selector match', () => {
    const expected: string = '#root';
    const result: string = b.id('root').toString();

    expect(result).toBe(expected);
  });

  it('Should class selector match', () => {
    const expected: string = '.list';
    const result: string = b.class('list').toString();

    expect(result).toBe(expected);
  });

  it('Should element selector match', () => {
    const expected: string = 'span';
    const result: string = b.element('span').toString();

    expect(result).toBe(expected);
  });

  it('Should attribute selector match', () => {
    const expected: string = '[disabled]';
    const result: string = b.attribute('disabled').toString();

    expect(result).toBe(expected);
  });

  it('Should attribute selector with text match', () => {
    const expected: string = '[data-example="text"]';
    const result: string = b.attribute('data-example', '=', 'text').toString();

    expect(result).toBe(expected);
  });

  it('Should eq selector match', () => {
    const expected: string = 'button:nth-child(1)';
    const result: string = b.join(b.element('button'), b.eq(0)).toString();

    expect(result).toBe(expected);
  });

  it('Should nth-child selector match', () => {
    const expected: string = 'span:nth-child(even)';
    const result: string = b.join(b.element('span'), b.nthChild('even')).toString();

    expect(result).toBe(expected);
  });

  it('Should nth-of-type selector match', () => {
    const expected: string = 'div:nth-of-type(3n+0)';
    const result: string = b.join(b.element('div'), b.nthOfType('3n+0')).toString();

    expect(result).toBe(expected);
  });

  it('Should complex selector match', () => {
    const expected: string = '#root .child:nth-child(1) button:nth-child(3)[disabled="disabled"] span.label i.icon';
    const result: string = b
      .append(
        b.id('root'),
        b.join(b.class('child'), b.eq(0)),
        b.join(b.element('button'), b.nthChild(3), b.attribute('disabled', '=', 'disabled')),
        b.join(b.element('span'), b.class('label')),
        b.join(b.element('i'), b.class('icon')),
      )
      .toString();

    expect(result).toBe(expected);
  });
});
