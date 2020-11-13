# ta-loader

*version: 1.0*

基于 webpack 的埋点自动化方案：注释即埋点。开发环境零干扰，自动生成报告，省略单项可配置。

### 安装

本项目依赖 babel 版本：***7.0*** +

```bash
  yarn add -D ta-loader
```

### 使用

`webpack` 配置格式如下：

```js
  module: {
    rules: [
      // 需要在 babel-loader 之前引用
      {
        test: /\.js$/,
        loader: 'ta-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
```

在需要埋点的地方使用如下形式注释：

```js
  // e.g. 1 -> INSTANCE.FUNC({ id: 'id' })
  /**
   * @log id
   */

  // e.g. 2 -> INSTANCE.FUNC({ id: 'id', key1: 'value1', key2: value2 })
  /**
   * @log id
   * @param key1 value1
   * @param key2 $value2
   */
```

即可在打包时自动完成埋点方法注入。

### 埋点方式

理想情况下，你的埋点方法应为如下形式：

```js
  INSTANCE.FUNC({ id: '...', ...params })
```

你可以在 `options` 如下形式自定义：

```js
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ta-loader',
        options: {
          __INSTANCE_NAME__: 'TA',
          __FUNC_NAME__: 'log',
          __DEFAULT_PARAM__: 'id'
        }
      }
    ]
  }
```

例：

```js
  {
    loader: 'ta-loader',
    options: {
      __INSTANCE_NAME__: 'Push',
      __FUNC_NAME__: 'event',
      __DEFAULT_PARAM__: 'id'
    }
  }
```

将在注释处注入：

```js
  Push.event({ id: '...', ...params })
```

注：本 loader 只对注释进行处理转为方法，埋点具体方法需要自己实现。

### 配置项

#### 注解配置

在注释时，将读取以下注解与值：

@name|必须|说明
:-:|:-:|:-
`@log`|yes|唯一 id 标识符
`@module`|no|所属模块（生成报告使用）
`@description`|no|说明信息（生成报告使用）
`@ignore`|no|是否忽略该处注释，你可以通过使用 `@ignore` 注解临时忽略某一处的埋点
`@param`|no|附带参数，可多项；当以 `$` 为前缀时进行动态变量取值

#### loader options

name|类型|默认值|必须|说明
:-:|:-:|:-:|:-:|:-
`env`|string|`production`|no|在什么环境启用，若未设定环境，则由 `open` 决定是否启用
`ignore`|array|`[]`|no|需要忽略的注解对应 `@log` 值的列表
`open`|boolean|`true`|no|是否启用注解转换（总开关）
`report`|boolean|`true`|no|是否生成埋点报告
`__INSTANCE_NAME__`|string|`TA`|no|埋点方法实例名
`__FUNC_NAME__`|string|`log`|no|埋点所需调用方法名
`__DEFAULT_PARAM__`|string|`id`|no|埋点唯一标识 key 值

### 埋点报告

默认情况下，打包将自动在根目录生成埋点报告：

`report-detailed.json` ：埋点详细数据

`report-simple.json` ：埋点一览（不包括忽略处）

你可以适配埋点报告导入埋点系统，完善埋点一体化流水线。


### 其他

如果你需要更复杂的应用场景，可以进一步开发自己的埋点自动化流水线。