
# requiresjs

一个js模块加载工具。

+ 支持定义别名
+ 支持加载文件夹下的所有js


## install

```
npm install -S requiresjs
```

## use

```
- libs
  |- user.js
  |- post.js

```

```js
const requires = require('requiresjs')

var libs = requires('@/libs')

console.log(libs.user)
console.log(libs.post)

```

## API

requires.alias(aliases) // 定义别名，默认存在`@`别名: {'@': process.cwd()}
requires.resolve('@/xxx') // 返回绝对路径
requires(dir|file) // 加载一个文件夹或者js文件，优先加载js