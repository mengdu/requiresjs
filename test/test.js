const path = require('path')
const requiresjs = require('../libs')
const expect = require('chai').expect

requiresjs.alias({
  '@': path.resolve(__dirname, './demo')
})


describe('requiresjs test', function () {
  it('路径解析成绝对路径', function() {
    expect(requiresjs.resolve('@/aaa')).to.be.equal(path.resolve(__dirname, './demo/aaa'))
  })
  it('优先加载js', function () {
    expect(requiresjs('@/aaa')).to.be.deep.equal({name: 'aaa.js'})
    expect(requiresjs('@/aaa', true)).to.be.deep.equal({})
  })
  it('优先加载文件夹下的index.js', function () {
    expect(requiresjs('@/libs')).to.keys(['label', 'post', 'user'])
  })
  it('加载空文件夹', function () {
    expect(requiresjs('@/empty')).to.be.deep.equal({})
  })
  it('强制加载整个文件夹', function () {
    expect(requiresjs('@/libs', true)).to.keys(['index', 'label', 'post', 'user'])
  })
  it('过滤白名单', function () {
    expect(requiresjs('@/libs', ['index.js', 'label.js'], true)).to.keys(['post', 'user'])
  })
  it('加载父级目录模块', function () {
    expect(requiresjs('@/dir/index')).to.equal(require('./demo/aaa'))
  })
})

