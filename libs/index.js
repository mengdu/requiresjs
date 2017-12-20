const fs = require('fs')
const path = require('path')
const isArr = val => Object.prototype.toString.call(val) === '[object Array]'

// 别名列表
const aliases = {
  '@': process.cwd()
}

function resolve (dir) {
  if (typeof dir !== 'string') {
    throw new Error('the path must be string')
  }
  var dirs = dir.split('/')
  var alias = dirs[0]
  // 判断别名是否定义
  if (!aliases[alias]) {
    throw new SyntaxError(`'${alias}' alias is not defined.`)
  }
  dirs.shift()
  // 构造路径
  return path.resolve(aliases[alias], dirs.join('/'))
}

/**
* 从文件夹里加载js
* @param {dir} 文件夹或者文件名，优先加载文件
* @param {whitelist} 白名单文件名
* @param {isLoadDir} 强制加载文件夹
* @return {modules}
**/
function requires (dir, whitelist, isLoadDir) {
  // 构造路径
  var filePath = resolve(dir)
  isLoadDir = isLoadDir || typeof whitelist === 'boolean' ? whitelist : false
  whitelist = isArr(whitelist) ? whitelist : (typeof whitelist === 'string' ? [whitelist] : [])
  // console.log(filePath, isLoadDir)
  // 优先载入.js
  if (!isLoadDir) {
    if (fs.existsSync(filePath + '.js') && fs.lstatSync(filePath + '.js').isFile()) {
      return require(filePath)
    }
  }
  var fileList = fs.readdirSync(filePath, 'utf8')
  var modules = {}
  for (var i in fileList) {
    var name = fileList[i]
    // console.log(filePath, name)
    var filename = path.resolve(filePath, name)
    var stat = fs.lstatSync(filename)
    var key = name.replace('.js', '')
    if (stat.isFile() && whitelist.indexOf(name) === -1) {
      modules[key] = require(filename)
    }
  }
  return modules
}

/**
* 配置别名
* @param {options} 别名键值对
* @return {requires}
**/
requires.alias = function (options) {
  for (var key in options) {
    Object.defineProperty(aliases, key, {
      value: options[key],
      configurable: false,
      enumerable: true,
      writable: false
    })
  }
  return requires
}

requires.resolve = resolve

module.exports = requires
