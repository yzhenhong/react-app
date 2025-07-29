/**
 * Prettier 配置文件
 *
 * Prettier 是一个代码格式化工具，用于统一代码风格
 * 该配置文件定义了项目的代码格式化规则
 *
 * 主要功能：
 * - 统一代码缩进和换行
 * - 统一引号使用（单引号/双引号）
 * - 统一分号使用
 * - 统一行尾字符
 * - 统一 JSX 格式
 */

module.exports = {
  // 在语句末尾添加分号
  // 例如：const name = 'John'; 而不是 const name = 'John'
  semi: true,

  // 在对象和数组的最后一个元素后添加逗号（ES5 兼容）
  // 例如：{ a: 1, b: 2, } 而不是 { a: 1, b: 2 }
  // 可选值：'none' | 'es5' | 'all'
  trailingComma: 'es5',

  // 使用单引号而不是双引号
  // 例如：'hello world' 而不是 "hello world"
  singleQuote: true,

  // 每行最大字符数，超过会自动换行
  // 建议值：80-120，这里使用 80 保持代码紧凑
  printWidth: 80,

  // 缩进空格数
  // 2 个空格是 JavaScript/TypeScript 项目的常见选择
  tabWidth: 2,

  // 使用空格而不是制表符进行缩进
  // 确保在不同编辑器中显示一致
  useTabs: false,

  // 对象字面量中的括号前后添加空格
  // 例如：{ foo: bar } 而不是 {foo: bar}
  bracketSpacing: true,

  // JSX 标签的 > 放在新行
  // 例如：
  // <div
  //   className="example"
  // >
  //   内容
  // </div>
  // 而不是 <div className="example">内容</div>
  bracketSameLine: false,

  // 箭头函数参数周围省略括号（当只有一个参数时）
  // 例如：x => x * 2 而不是 (x) => x * 2
  // 可选值：'avoid' | 'always'
  arrowParens: 'avoid',

  // 行尾使用 LF（Unix 风格）换行符
  // 确保跨平台一致性
  // 可选值：'lf' | 'crlf' | 'cr' | 'auto'
  endOfLine: 'lf',

  // 对象属性只在必要时使用引号
  // 例如：{ foo: 'bar', 'baz-qux': 'value' }
  // 只有包含特殊字符的属性名才加引号
  quoteProps: 'as-needed',

  // JSX 中使用单引号
  // 例如：<div className='example'> 而不是 <div className="example">
  jsxSingleQuote: true,

  // 保持 markdown 文本的换行
  // 不强制格式化 markdown 文件中的文本换行
  // 可选值：'always' | 'never' | 'preserve'
  proseWrap: 'preserve',
};
