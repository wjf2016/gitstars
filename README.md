[English document](https://github.com/Monine/gitstars/blob/master/README-en.md)

Github 作为开发者的第一社交平台，拥有数不胜数的优秀开源项目，给工作和学习带来巨大方便，遇到自己需要或是喜爱的项目只需轻轻点击 Star 便可收入囊中。

Star is easy，可随着 Stars Repositories 增长和时间流逝，在需要使用到某个项目时难免记不清叫什么，而 Github 又只提供简单的搜索，找到目标 Star Repositorie 竟也成了件小小的麻烦事。

所以拥有自己的 Github Stars Repositories Manager 也算是开发者的必备需求。

之前有使用过市面上的一些 Github Stars Repositories Manager，比如 [Astral](https://app.astralapp.com)，虽说能用，但总觉得不顺手、不好用。

Gitstars 由此诞生 🎉

纯前端的实现，没有服务器和数据库，你的 Github 就是一切。

# Gitstars

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![GitHub license](https://img.shields.io/github/license/Monine/gitstars.svg)](https://github.com/Monine/gitstars/blob/master/LICENSE)

> 每个开发者都该拥有的 Github Stars Repositories Manager

欢迎进入 [https://monine.github.io/gitstars/](https://monine.github.io/gitstars/) 体验畅玩，更欢迎体验之后在 [Issues](https://github.com/Monine/gitstars/issues) 提供建议。

![gitstars](http://oh8wftuto.bkt.clouddn.com/gitstars-v1.2.0.jpg)

*感谢 [imsun](https://github.com/imsun) 提供获取 access token 服务*

## 技术栈

- [Vue](https://cn.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [Element-UI](http://element-cn.eleme.io/2.0/#/zh-CN)
- [Axios](https://github.com/axios/axios)
- [Github API v3](https://developer.github.com/v3/)

大量使用 Flex 布局，所以请不要在 IE 浏览器上使用。

本项目发布版使用 Vue 开发，源码在 [dev 分支](https://github.com/Monine/gitstars/tree/dev)。也有 React 开发版本，源码在 [react-dev 分支](https://github.com/Monine/gitstars/tree/react-dev)，仅用作练习。

欢迎阅读源码，提出意见。

## 简介

界面风格模仿 [Astral](https://app.astralapp.com)，支持中英文切换。

你可能会好奇，没有数据库，标签管理数据保存在哪？请看下图：

![gitstars-gists-gitstars-json](http://oh8wftuto.bkt.clouddn.com/gitstars-gist-v1.0.2.jpg)

当你第一次访问 [Gitstars](https://monine.github.io/gitstars/)，你的 Github Gists 内会生成一个文件名为 `gitstars.json` 的 Gist 项目。（上图有两个是因为开发所需，作为用户，你只会有一个。）

你所有的标签管理数据都储存在 `gitstars.json` 这份文件内，也就是说你所有的标签管理操作都是在修改这份文件而已，没有数据库，一切都在 Github 上，都属于你。

但是，每次使用从 Github API 获取管理数据相对较慢，而且从 Github API 获取的数据都会有 60 秒的缓存（可查看 Response Header Cache-Control 字段），也就是说你修改了管理数据后刷新页面会发现依然是修改之前的数据，为此我有邮件询问 Github 如何取消缓存，回复是无法取消...

![github-api-replay-cache-control](http://oh8wftuto.bkt.clouddn.com/github-api-replay-cache-control.jpg)

因此为了解决此处体验问题，使我想到一个就算没有上述问题也应该做的一项优化：

**把管理数据同步保存在 localStorage 内**

这很有必要，Gitstars 不仅做到了，还做了完善的 异常/错误 回退处理，这你无需关心。不仅是你的管理数据，其它的一些不变的数据也同样会保存在 localStorage 内，避免每次打开使用都从 Github API 获取这些内容，这也提升了页面内容的加载速度。

管理数据同步存储在 localStorage 内又会导致一个问题：**多客户端之间数据不同步**。

因此为了数据正确，必须在每次访问 Gitstars 时从远程获取一次数据，然后与本地数据对比最后修改时间值，仅当远程数据时间值大于本地时间值时更新本地数据为远程数据。

## LICENSE

MIT
