
# requiresjs

一个js模块加载工具。

> 1、为了方便加载目录里的所有模块；
> 2、解决深层目录下的模块加载父级目录模块出现的类似 `../../`, `../libs` 等一长串路径问题。

+ 支持定义别名
+ 支持加载文件夹下的所有js


## install

```bat
npm install -S requiresjs
```

**test**


```bat
npm run test
```

## use

```
- libs
  |- user.js
  |- post.js
- demo.js
- app.js

```

```js
// app.js

const requires = require('requiresjs')

var libs = requires('@/libs')

console.log(libs.user)
console.log(libs.post)
console.log(requires('@/demo')) // 同 require('/demo')

```

## API

+ `requires.alias(aliases)` // 定义别名，默认存在 `@ `别名: `{'@': process.cwd()}`
+ `requires.resolve('@/xxx')` // 返回绝对路径
+ `requires(dir|file[, whiteList[, isLoadDir]])` // 加载一个文件夹或者js文件，优先加载js
