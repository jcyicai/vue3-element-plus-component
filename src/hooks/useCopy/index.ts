import { ElMessage } from 'element-plus'
// 功能： 复制
export const useCopy = (text: string) => {
  // 创建输入框
  const input = document.createElement('input')
  // 给输入框 value 赋值
  input.value = text
  // 追加到 body 里面去
  document.body.appendChild(input)
  // 选择输入框的操作
  input.select()
  // 执行复制操作
  document.execCommand('Copy')
  // 删除加入的输入框
  document.body.removeChild(input)
  // 提示用户
  ElMessage.success('复制成功')
}
