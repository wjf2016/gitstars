# React 版本 Gitstars

> 仅作为个人练习 React 使用

## 技术栈

- react
- react-dom
- prop-types
- redux
- react-redux
- redux-thunk: 异步 action 中间件
- immutable
- antd
- axios
- react-dnd: react 拖拽插件
- react-transition-group: react 过渡动效

## 数据结构

### 标签

目前有三种类别的标签：默认、自定义和语言

- 默认标签成员有两个：全部（all）和未标签（untagged）
- 自定义标签为用户添加
- 语言标签是 repository language

``` js
import { List } from 'immutable'

{ id: Number, name: String, repos: List }

// repos 成员是 repository id

/**
 * 其实语言标签的 repos 不需要使用 Immutable List 类型
 * 因为语言标签和它的 repos 成员都无法再 Gitstars 中被修改
 * 但考虑的数据结构和类型的一致所以还是使用 List 类型数据
*/
```

### repository

repository 的数据都来自 Github API 返回结果，包含一系列自身属性，Gitstars 会添加一个新属性 `_customTags` 保存 reposigory 所拥有的自定义标签集合。

``` js
import { List } from 'immutable'

{ id: Number, _customTags: List, ... }

// _customTags 成员是 自定义标签（引用集合）
```


