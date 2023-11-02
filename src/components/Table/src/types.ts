export interface TableOptions {
  // 表头
  label: string
  // 字段名称
  prop?: string
  // 列宽
  width?: string | number
  // 对齐方式
  align?: 'left' | 'center' | 'right'
  // 自定义列模板名称 插槽名称
  slot?: string
  // 是否操作列
  action?: boolean
  // 是否可编辑单元格
  editable?: boolean
}
