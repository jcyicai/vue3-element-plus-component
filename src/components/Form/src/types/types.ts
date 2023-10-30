import { RuleItem } from './rule'

// 表单配置选项
export interface FormOptions {
  // 表单项显示的元素
  type:
    | 'cascader'
    | 'checkbox'
    | 'checkbox-group'
    | 'checkbox-button'
    | 'color-picker'
    | 'date-picker'
    | 'input'
    | 'input-number'
    | 'radio'
    | 'radio-group'
    | 'radio-button'
    | 'rate'
    | 'select'
    | 'option'
    | 'slider'
    | 'switch'
    | 'time-picker'
    | 'time-select'
    | 'transfer'
    | 'upload'
  // 表单项值
  value: any
  // 表单项label
  label?: string
  // 表单项的标识
  prop?: string
  // 表单项验证规则
  rules?: RuleItem | RuleItem[]
  // 表单项的占位符
  placeholder?: string
  // 表单元素特有属性
  attrs?: {
    // 是否清空
    clearable?: boolean
    // 是否显示切换密码
    showPassword?: boolean
    // 是否禁用
    disabled?: boolean
  }
}
