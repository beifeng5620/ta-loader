// 测试用函数
import './package/TA'

// ? test 1 : 函数外
import main from './rely'

/**
 * @log id-1
 */
main()

// ? test 2 : top comment
window.c = () => {
  /**
   * @log id-2
   * @module index
   */

  return Math.random()
}

setInterval(() => {
  const div = document.createElement('div')
  div.innerHTML = window.c()
  document.body.appendChild(div)
}, 3000)
