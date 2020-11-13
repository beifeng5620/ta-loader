const func = () => {
  /**
   * ? test 4 : inner comment
   */
  document.body.addEventListener('click', function () {
    /**
     * @log id-4
     * @description 点击了 body
     */
  })
}

export default () => {
  // ? test 3 : bottom comment
  func()

  /**
   * @log id-3
   * @description 这是一行说明
   * @param key1 value1
   * @param key2 value2
   * @module rely
   */

  // ? test 5 : ignore
  /**
   * @log id-5
   * @ignore
   */

  // ? test 6 : var
  const v = '...'

  /**
   * @log id-6
   * @param v $v
   */
}
