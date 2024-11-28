export interface NamedObjectInfo {
  pureName: string;
  schemaName?: string;
  contentHash?: string;
  engine?: string;
}

export interface ColumnReference {
  columnName: string;
  refColumnName?: string;
  isIncludedColumn?: boolean;
  isDescending?: boolean;
}

export interface ConstraintInfo extends NamedObjectInfo {
  pairingId?: string;
  constraintName?: string;
  constraintType: 'primaryKey' | 'foreignKey' | 'sortingKey' | 'index' | 'check' | 'unique';
}

export interface ColumnsConstraintInfo extends ConstraintInfo {
  columns: ColumnReference[];
}

export interface PrimaryKeyInfo extends ColumnsConstraintInfo {}

export interface ForeignKeyInfo extends ColumnsConstraintInfo {
  refSchemaName?: string;
  refTableName: string;
  updateAction?: string;
  deleteAction?: string;
}

export interface IndexInfo extends ColumnsConstraintInfo {
  isUnique: boolean;
  // indexType: 'normal' | 'clustered' | 'xml' | 'spatial' | 'fulltext';
  indexType?: string;
  // condition for filtered index (SQL Server)
  filterDefinition?: string;
}

export interface UniqueInfo extends ColumnsConstraintInfo {}

export interface CheckInfo extends ConstraintInfo {
  definition: string;
}

export interface ColumnInfo extends NamedObjectInfo {
  pairingId?: string;
  columnName: string;
  notNull?: boolean;
  autoIncrement?: boolean;
  dataType: string;
  displayedDataType?: string;
  precision?: number;
  scale?: number;
  length?: number;
  computedExpression?: string;
  isPersisted?: boolean;
  isSparse?: boolean;
  defaultValue?: string;
  defaultConstraint?: string;
  columnComment?: string;
  isUnsigned?: boolean;
  isZerofill?: boolean;
  options?: [];
  canSelectMultipleOptions?: boolean;
  undropColumnName?: string;
}

export interface DatabaseObjectInfo extends NamedObjectInfo {
  pairingId?: string;
  objectId?: string;
  createDate?: string;
  modifyDate?: string;
  hashCode?: string;
  objectTypeField?: string;
  obejctComment?: string;
}

export interface SqlObjectInfo extends DatabaseObjectInfo {
  createSql?: string;
  requiresFormat?: boolean; // SQL is human unreadable, requires formatting (eg. MySQL views)
}

export interface TableInfo extends DatabaseObjectInfo {
  columns: ColumnInfo[];
  primaryKey?: PrimaryKeyInfo;
  sortingKey?: ColumnsConstraintInfo;
  foreignKeys: ForeignKeyInfo[];
  dependencies?: ForeignKeyInfo[];
  indexes?: IndexInfo[];
  uniques?: UniqueInfo[];
  checks?: CheckInfo[];
  preloadedRows?: any[];
  preloadedRowsKey?: string[];
  preloadedRowsInsertOnly?: string[];
  tableRowCount?: number | string;
  tableEngine?: string;
  __isDynamicStructure?: boolean;
}

export interface CollectionInfo extends DatabaseObjectInfo {
  // all known columns with definition (only used in Cassandra)
  knownColumns?: ColumnInfo[];

  // unique combination of columns (should be contatenation of partitionKey and clusterKey)
  uniqueKey?: ColumnReference[];

  // partition key columns
  partitionKey?: ColumnReference[];

  // unique key inside partition
  clusterKey?: ColumnReference[];
}

export interface ViewInfo extends SqlObjectInfo {
  columns: ColumnInfo[];
}

export interface ParameterInfo {
  objectId?: string | number;
  schemaName: string;
  parameterName?: string;
  pureName: string;
  dataType: string;
  isOutputParameter?: boolean;
}
export interface ProcedureInfo extends SqlObjectInfo {
  parameters?: ParameterInfo[];
}

export interface FunctionInfo extends SqlObjectInfo {
  parameters?: ParameterInfo[];
  // returnDataType?: string;
}

export interface TriggerInfo extends SqlObjectInfo {}

export interface SchemaInfo {
  objectId?: string;
  schemaName: string;
  isDefault?: boolean;
}

export interface DatabaseInfoObjects {
  tables: TableInfo[];
  collections: CollectionInfo[];
  views: ViewInfo[];
  matviews: ViewInfo[];
  procedures: ProcedureInfo[];
  functions: FunctionInfo[];
  triggers: TriggerInfo[];
}

export interface DatabaseInfo extends DatabaseInfoObjects {
  engine?: string;
}
