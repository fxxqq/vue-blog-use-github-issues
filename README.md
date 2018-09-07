:running:前端迷:running:
============

[demo预览](https://www.ye63.com)

## 项目背景

刚接触 GitHub 的时候就开始在仓库 [ye63.github.io](https://github.com/ye63/ye63.github.io) 里创建 [Issues](https://github.com/ye63/ye63.github.io/issues) 来记录学习笔记，那时候我还不知道有 GitHub Pages，后来了解到了可以通过 GitHub Pages 来搭建 [个人博客站点](http://www.ye63.com)，但是如果涉及到在文章里嵌套图片的话还是比较麻烦的

通过 Issues 记录学习笔记的优点：

- [x] 在线编辑和预览，随时添加和提交（不用担心电脑坏了导致笔记丢失）
- [x] 当笔记里到嵌套图片时，支持粘贴屏幕截图和拖拽添加图片
- [x] 带有搜索和排序功能
- [x] 可通过 Label 来对 Issues 进行分类
- [x] 可以把每一个 Comment 作为一个小的知识点不停的追加到 Issue 里
- [x] 结合 GitHub Pages 绑定域名来搭建个人博客站点

 

## 使用方法

#### 本地运行

> 1.安装依赖

```
npm install
```
> 2.在本地开启服务，然后就可以通过 http://localhost:8080 访问了

```
npm run dev
```
> 3.[创建 OAuth Application](https://github.com/settings/applications/new)

 
> 4.个人配置 - 修改「BGAIssueBlog/src/store/account.js」文件中的「state」属性

```JavaScript
const state = {
  accessToken: localStorage.getItem(LS_KEY_ACCESS_TOKEN),  // 这个不要修改，这个不要修改，这个不要修改。当前登录用户的 GitHub AccessToken
  auth: {
    proxy: 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', // 这个不要修改，这个不要修改，这个不要修改。
    clientID: '*****',   // 改成你在 https://github.com/settings/applications/new 新建的 OAuth application 的 Client ID
    clientSecret: '*****'  // 改成你在 https://github.com/settings/applications/new 新建的 OAuth application 的 Client Secret
  },
  gitHubUser: null,  // 这个不要修改，这个不要修改，这个不要修改。
  gitHubUsername: 'ye63',  // 修改成你自己的 GitHub 账号
  copyright: '2014 - 2017',  // 修改成你自己的
  recordNumber: '',  // 修改成你自己的备案编号，如果没有备案的话就设置为 null
  repo: 'ye63/ye63.github.io',  // 记录 Issue 的仓库的全名「用户名/仓库名」
  pageSize: 10,  // 博客列表每页显示多少条博客
  showQQGroup: true,  // 如果要显示你自己的 QQ 群二维码图片的话这里配置成 true 并且替换「BGAIssueBlog-Web/static/img/qq-group.png」为你自己的 QQ 群二维码图片，否则配置成 false 即可
  thirdPartySite: [  // 配置你想在左上角展示的第三方站点信息
    {
      img: 'static/img/github.png',  // 第三方站点图标，存放在「BGAIssueBlog-Web/static/img」目录中
      url: 'https://github.com/ye63'  // 第三方站点的 url
    },
    {
      img: 'static/img/weibo.png',
      url: ''
    },
    {
      img: 'static/img/git.png',
      url: ''
    }
    // 如果还有其他站点需要显示，继续在这里追加
  ]
}
```
> 5.个人配置 - 修改网站图标

```
修改「BGAIssueBlog/static/img/favicon.ico」文件
```
> 6.个人配置 - 修改网站标题

```
修改「BGAIssueBlog/index.html」文件里「<title>」标签里的内容
```

#### 发布到 GitHub Pages

> 1.打包

```
npm run build
```
> 2.发布

```
拷贝「BGAIssueBlog/docs」目录里的所有文件到「GitHub Pages」的根目录下
并将「GitHub Pages」仓库 PUSH 到 GitHub 上
```

#### 绑定域名到 GitHub Pages

> 1.在「GitHub Pages」根目录下添加文件名为「CNAME」的文件，文件内容就是你的二级域名，例如我的是

```
www.ye63.com
```
> 2.登录你的域名控制台添加域名解析

```
「记录类型」选择「CNAME」
「主机记录」填「www」
「记录值」填「GitHub用户名.github.io」，例如我的是「ye63.github.io」
```

 
 
 
