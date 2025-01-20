const { parseFilter } = require('./parseFilter');
const { stringFilterBehaviour, numberFilterBehaviour } = require('dbgate-tools');

test('parse string', () => {
  const ast = parseFilter('"123"', stringFilterBehaviour);
  console.log(JSON.stringify(ast));
  expect(ast).toEqual({
    conditionType: 'like',
    left: { exprType: 'placeholder' },
    right: { exprType: 'value', value: '%123%' },
  });
});

test('should parse support bigInt', () => {
  const ast = parseFilter('"294054551160492032"', numberFilterBehaviour);
  expect(ast).toEqual({
    conditionType: 'binary',
    left: {
      exprType: 'placeholder',
    },
    operator: '=',
    right: { exprType: 'value', value: 294054551160492032n },
  });
});

test('should parse support normal number', () => {
  const ast = parseFilter('"32"', numberFilterBehaviour);
  expect(ast).toEqual({
    conditionType: 'binary',
    left: {
      exprType: 'placeholder',
    },
    operator: '=',
    right: { exprType: 'value', value: 32 },
  });
});
