const views = {
  type: 'views',
  create1: 'CREATE VIEW obj1 AS SELECT id FROM t1',
  create2: 'CREATE VIEW obj2 AS SELECT id FROM t2',
  drop1: 'DROP VIEW obj1',
  drop2: 'DROP VIEW obj2',
};
const matviews = {
  type: 'matviews',
  create1: 'CREATE MATERIALIZED VIEW obj1 AS SELECT id FROM t1',
  create2: 'CREATE MATERIALIZED VIEW obj2 AS SELECT id FROM t2',
  drop1: 'DROP MATERIALIZED VIEW obj1',
  drop2: 'DROP MATERIALIZED VIEW obj2',
};

const engines = [
  {
    label: 'MySQL',
    connection: {
      engine: 'mysql@dbgate-plugin-mysql',
      password: 'Pwd2020Db',
      user: 'root',
      server: 'mysql',
      port: 3306,
    },
    local: {
      server: 'localhost',
      port: 15001,
    },
    // skipOnCI: true,
    objects: [views],
    dbSnapshotBySeconds: true,
    dumpFile: 'data/chinook-mysql.sql',
    dumpChecks: [
      {
        sql: 'select count(*) as res from genre',
        res: '25',
      },
    ],
  },
  {
    label: 'MariaDB',
    connection: {
      engine: 'mariadb@dbgate-plugin-mysql',
      password: 'Pwd2020Db',
      user: 'root',
      server: 'mysql',
      port: 3306,
    },
    local: {
      server: 'localhost',
      port: 15004,
    },
    skipOnCI: true,
    objects: [views],
    dbSnapshotBySeconds: true,
    dumpFile: 'data/chinook-mysql.sql',
    dumpChecks: [
      {
        sql: 'select count(*) as res from genre',
        res: '25',
      },
    ],
  },
  {
    label: 'PostgreSQL',
    connection: {
      engine: 'postgres@dbgate-plugin-postgres',
      password: 'Pwd2020Db',
      user: 'postgres',
      server: 'postgres',
      port: 5432,
    },
    local: {
      server: 'localhost',
      port: 15000,
    },
    objects: [
      views,
      matviews,
      {
        type: 'procedures',
        create1: 'CREATE PROCEDURE obj1() LANGUAGE SQL AS $$  select * from t1 $$',
        create2: 'CREATE PROCEDURE obj2() LANGUAGE SQL AS $$  select * from t2 $$',
        drop1: 'DROP PROCEDURE obj1',
        drop2: 'DROP PROCEDURE obj2',
      },
      {
        type: 'functions',
        create1:
          'CREATE FUNCTION obj1() returns int LANGUAGE plpgsql AS $$ declare  res integer; begin select count(*) into res from t1; return res; end; $$',
        create2:
          'CREATE FUNCTION obj2() returns int LANGUAGE plpgsql AS $$ declare res integer; begin select count(*) into res from t2; return res; end; $$',
        drop1: 'DROP FUNCTION obj1',
        drop2: 'DROP FUNCTION obj2',
      },
    ],
    supportSchemas: true,
    supportRenameSqlObject: true,
    defaultSchemaName: 'public',
    dumpFile: 'data/chinook-postgre.sql',
    dumpChecks: [
      {
        sql: 'select count(*) as res from "public"."Genre"',
        res: '25',
      },
    ],

    parameters: [
      {
        testName: 'simple',
        create: 'CREATE PROCEDURE obj1(a integer) LANGUAGE SQL AS $$ select * from t1 $$',
        objectTypeField: 'procedures',
        list: [
          {
            parameterName: 'a',
            parameterMode: 'IN',
            dataType: 'integer',
          },
        ],
      },
      {
        testName: 'dataTypes',
        create:
          'CREATE PROCEDURE obj1(a integer, b varchar(20), c numeric(18,2)) LANGUAGE SQL AS $$ select * from t1 $$',
        objectTypeField: 'procedures',
        list: [
          {
            parameterName: 'a',
            parameterMode: 'IN',
            dataType: 'integer',
          },
          {
            parameterName: 'b',
            parameterMode: 'IN',
            dataType: 'varchar(20)',
          },
          {
            parameterName: 'c',
            parameterMode: 'IN',
            dataType: 'numeric(18,2)',
          },
        ],
      },
      {
        testName: 'paramModes',
        create: 'CREATE PROCEDURE obj1(IN a integer, INOUT b integer) LANGUAGE SQL AS $$ select * from t1 $$',
        objectTypeField: 'procedures',
        list: [
          {
            parameterName: 'a',
            parameterMode: 'IN',
            dataType: 'integer',
          },
          {
            parameterName: 'b',
            parameterMode: 'INOUT',
            dataType: 'integer',
          },
        ],
      },
    ],
  },
  {
    label: 'SQL Server',
    connection: {
      engine: 'mssql@dbgate-plugin-mssql',
      password: 'Pwd2020Db',
      user: 'sa',
      server: 'mssql',
      port: 1433,
    },
    local: {
      server: 'localhost',
      port: 15002,
    },
    objects: [
      views,
      {
        type: 'procedures',
        create1: 'CREATE PROCEDURE obj1 AS SELECT id FROM t1',
        create2: 'CREATE PROCEDURE obj2 AS SELECT id FROM t2',
        drop1: 'DROP PROCEDURE obj1',
        drop2: 'DROP PROCEDURE obj2',
      },
    ],
    parameters: [
      {
        testName: 'simple',
        create: 'CREATE PROCEDURE obj1 (@param1 int) AS SELECT id from t1',
        objectTypeField: 'procedures',
        list: [
          {
            parameterName: '@param1',
            parameterMode: 'IN',
            dataType: 'int',
          },
        ],
      },
      {
        testName: 'dataTypes',
        create: 'CREATE PROCEDURE obj1 (@p1 bit, @p2 nvarchar(20), @p3 decimal(18,2), @p4 float) AS SELECT id from t1',
        objectTypeField: 'procedures',
        list: [
          {
            parameterName: '@p1',
            parameterMode: 'IN',
            dataType: 'bit',
          },
          {
            parameterName: '@p2',
            parameterMode: 'IN',
            dataType: 'nvarchar(20)',
          },
          {
            parameterName: '@p3',
            parameterMode: 'IN',
            dataType: 'decimal(18,2)',
          },
          {
            parameterName: '@p4',
            parameterMode: 'IN',
            dataType: 'float',
          },
        ],
      },
      {
        testName: 'outputParam',
        create: 'CREATE PROCEDURE obj1 (@p1 int OUTPUT) AS SELECT id from t1',
        objectTypeField: 'procedures',
        list: [
          {
            parameterName: '@p1',
            parameterMode: 'OUT',
            dataType: 'int',
          },
        ],
      },
    ],
    supportSchemas: true,
    supportRenameSqlObject: true,
    defaultSchemaName: 'dbo',
    // skipSeparateSchemas: true,
  },
  {
    label: 'SQLite',
    generateDbFile: true,
    connection: {
      engine: 'sqlite@dbgate-plugin-sqlite',
    },
    objects: [views],
    skipOnCI: false,
    skipChangeColumn: true,
  },
  {
    label: 'CockroachDB',
    connection: {
      engine: 'cockroach@dbgate-plugin-postgres',
      user: 'root',
      server: 'cockroachdb',
      port: 26257,
    },
    local: {
      server: 'localhost',
      port: 15003,
    },
    skipOnCI: true,
    objects: [views, matviews],
  },
  {
    label: 'ClickHouse',
    connection: {
      engine: 'clickhouse@dbgate-plugin-clickhouse',
      databaseUrl: 'http://clickhouse:8123',
      password: 'Pwd2020Db',
    },
    local: {
      databaseUrl: 'http://localhost:15005',
    },
    skipOnCI: false,
    objects: [views],
    skipDataModifications: true,
    skipReferences: true,
    skipIndexes: true,
    skipNullability: true,
    skipUnique: true,
    skipAutoIncrement: true,
    skipPkColumnTesting: true,
    skipDataDuplicator: true,
    skipStringLength: true,
    alterTableAddColumnSyntax: true,
    dbSnapshotBySeconds: true,
    skipChangeColumn: true,
  },
];

const filterLocal = [
  // filter local testing
  '-MySQL',
  '-MariaDB',
  'PostgreSQL',
  '-SQL Server',
  '-SQLite',
  '-CockroachDB',
  '-ClickHouse',
];

const enginesPostgre = engines.filter(x => x.label == 'PostgreSQL');

module.exports = process.env.CITEST
  ? engines.filter(x => !x.skipOnCI)
  : engines.filter(x => filterLocal.find(y => x.label == y));

module.exports.enginesPostgre = enginesPostgre;
