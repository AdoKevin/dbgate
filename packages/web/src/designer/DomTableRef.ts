import type { DesignerTableInfo } from './types';

export default class DomTableRef {
  domTable: Element;
  domWrapper: Element;
  table: DesignerTableInfo;
  designerId: string;
  domRefs: { [column: string]: Element };

  constructor(table: DesignerTableInfo, domRefs, domWrapper: Element) {
    this.domTable = domRefs[''];
    this.domWrapper = domWrapper;
    this.table = table;
    this.designerId = table.designerId;
    this.domRefs = domRefs;
  }

  getRect() {
    if (!this.domWrapper) return null;
    if (!this.domTable) return null;

    const wrap = this.domWrapper.getBoundingClientRect();
    const rect = this.domTable.getBoundingClientRect();
    return {
      left: rect.left - wrap.left,
      top: rect.top - wrap.top,
      right: rect.right - wrap.left,
      bottom: rect.bottom - wrap.top,
    };
  }

  getColumnY(columnName: string) {
    let col = this.domRefs[columnName];
    if (!col) return null;
    const rect = col.getBoundingClientRect();
    const wrap = this.domWrapper.getBoundingClientRect();
    const tableRect = this.getRect();
    let res = (rect.top + rect.bottom) / 2 - wrap.top;
    if (res < tableRect.top) res = tableRect.top;
    if (res > tableRect.bottom) res = tableRect.bottom;
    return res;
  }
}
