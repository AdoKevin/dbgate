const { driverBase } = global.DBGATE_PACKAGES['dbgate-tools'];
const Dumper = require('./Dumper');
const { mysqlSplitterOptions } = require('dbgate-query-splitter/lib/options');
const _cloneDeepWith = require('lodash/cloneDeepWith');

/** @type {import('dbgate-types').SqlDialect} */
const dialect = {
  limitSelect: true,
  rangeSelect: true,
  rawUuids: true,
  stringEscapeChar: "'",
  fallbackDataType: 'String',
  offsetNotSupported: true,
  dropColumnDependencies: ['primaryKey', 'sortingKey'],
  changeColumnDependencies: ['primaryKey', 'sortingKey'],
  renameColumnDependencies: ['primaryKey', 'sortingKey'],
  createColumn: true,
  dropColumn: true,
  changeColumn: true,
  changeAutoIncrement: true,
  createIndex: true,
  dropIndex: true,
  anonymousPrimaryKey: true,
  createColumnWithColumnKeyword: true,
  specificNullabilityImplementation: true,
  omitForeignKeys: true,
  omitUniqueConstraints: true,
  omitIndexes: true,
  omitTableAliases: true,
  omitTableBeforeColumn: true,
  sortingKeys: true,

  columnProperties: {
    columnComment: true,
  },

  quoteIdentifier(s) {
    return `"${s}"`;
  },
};

/** @type {import('dbgate-types').EngineDriver} */
const driver = {
  ...driverBase,
  supportsTransactions: false,
  defaultPort: 9042,
  dumperClass: Dumper,
  dialect,
  engine: 'cassandra@dbgate-plugin-cassandra',
  title: 'Cassandra',
  showConnectionField: (field, values) => {
    return ['server', 'port', 'singleDatabase', 'isReadOnly', 'user', 'password'].includes(field);
  },
  getQuerySplitterOptions: (usage) =>
    usage == 'editor'
      ? { ...mysqlSplitterOptions, ignoreComments: true, preventSingleLineSplit: true }
      : mysqlSplitterOptions,
};

module.exports = driver;
