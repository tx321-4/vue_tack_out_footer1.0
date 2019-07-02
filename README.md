# Vue.js2.0+  高仿饿了么外卖App商家模块
## [原文链接：（https://github.com/ustbhuangyi/vue-sell）](https://github.com/ustbhuangyi/vue-sell)

>注意：Vue.js 不支持 IE8 及其以下 IE 版本。

## 第一步：搭建开发环境 
```bash
npm install -g vue vue-cli

vue init webpack my-project # 'my-project'为项目文件夹
# 这里需要进行一些配置，根据情况来决定

cd my-project
npm install 
npm run dev
```

## 第二步 目录结构说明

```bash
vue_tack_out_footer1.0
├── build # 项目构建(webpack)相关代码
├── node_modules # 项目依赖模块
├── src # 源码目录
│    ├── common
│    │     ├── fonts # 字体库
│    │     ├── js # JavaScript
│    │     └── stylus # 样式库
│    ├── components # 组件文件
│    ├── App.vue # 项目入口文件
│    └── main.js # 项目的核心文件
├── static # 静态资源目录
│    └── css
│          └── reset.css # CSSreset
├── index.html # 首页入口文件
├── data.json # mock.js 模拟数据
├── package-lock.json # 项目配置文件
├── package.json # 项目配置文件
├── .xxxx文件 # 这些是一些配置文件，包括语法配置，git配置等
└──README.md # 项目的说明文档，markdown 格式
```
> 模拟后台数据

* 在`build`中 `webpack.dev.conf.js` 编写模拟数据api
  * 创建 express 请求 server
  * 在 `devServer` 中创建 `before(app)`
```javascript
'use strict'
...
const portfinder = require('portfinder')

const express = require('express')
const app = express() //请求server
var appData = require('../data.json')//加载本地数据文件
var seller = appData.seller //获取对应的本地数据
var goods = appData.goods
var ratings = appData.ratings
var apiRoutes = express.Router()
app.use('/api', apiRoutes) //通过路由请求数据

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    ...
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app){
      app.get('/api/seller', (req, res) => {
        res.json({
          errno: 0,
          data: seller
        }) //接口返回json数据， 上面配置的数据seller就赋值给data请求后调用
      }),
      app.get('/api/goods', (req, res) => {
        res.json({
          errno: 0,
          data: goods
        }) //接口返回json数据， 上面配置的数据goods就赋值给data请求后调用
      }),
      app.get('/api/ratings', (req, res) => {
        res.json({
          errno: 0,
          data: ratings
        }) //接口返回json数据， 上面配置的数据ratings就赋值给data请求后调用
      })
    }
  },
  {
    ...
  }
})
```
* 访问 数据
  * localhost:8080/api/seller
  * localhost:8080/api/goods
  * localhost:8080/api/ratings


## 第三步 注册组件 header

> 目录结构说明

```bash

├── src # 源码目录
│    ├── common
│    ├── components # 组件文件
│    │       └── header 
│    │             └── header.vue
│    ├── App.vue # 项目入口文件
│    └── main.js # 项目的核心文件

```
* 编辑 `header.vue`
```html
<template>
<div clas="header">
  我是header
</div>
</template>

<script type='text/ecmascript-6'>
export default{};
</script>

<style lang='stylus' rel='stylesheet/stylus'>

</style>

```

* 编辑 `App.vue`
```html
<template>
  <div>
    <v-header></v-header>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header.vue';

export default {
  components: {
    'v-header': header
  }
};

</script>

<style lang='stylus' rel='stylesheet/stylus'>

</style>

```
## 第三步 vue-router
>安装 `vue-router`
```bash
npm install --save vue-router
```

> 目录结构说明

```bash

├── src # 源码目录
│    ├── common
│    ├── components # 组件文件
│    │       ├── header 
│    │       │     └── header.vue
│    │       ├── goods 
│    │       │     └── goods.vue
│    │       ├── ratings 
│    │       │     └── ratings.vue
│    │       └── seller 
│    │             └── seller.vue
│    ├── App.vue # 项目入口文件
│    └── main.js # 项目的核心文件

```
* goods.vue、ratings.vue、seller.vue 内容跟 header.vue 相似

* 编辑 `App.vue`
```html
<template>
  <div>
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
         <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
         <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
         <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header.vue';

export default {
  components: {
    'v-header': header
  }
};

</script>

<style lang='stylus' rel='stylesheet/stylus'>
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      .tab-item
        flex: 1
        text-align: center
</style>
```

* 编辑 `main.js`
```javascript

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

Vue.use(VueRouter);
Vue.config.productionTip = false;
const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
];

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
});

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

router.push('/goods');

```

* vue-router 3.0 新特性 
  * 取消了 router.map
  * v-link => router-link
  * router.go() => router.push();

* 如何给 link 加 激活--- active
  * 在`new VueRouter` 中添加————linkActiveClass: 'active'

``` javascript
const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
  linkActiveClass: 'active'
});
```



