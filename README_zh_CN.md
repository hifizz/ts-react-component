# TypeScript React Component 脚手架

急速的使用 TypeScript 开始开发你的 React 组件，轻松发布 npm 。

## 开始

```bash
# 克隆本项目
git clone https://github.com/hifizz/ts-react-component.git awesome-componet
cd awesome-componet
# 移除本项目的 git remote 设置
git remote rm origin
```

## 安装

```bash
yarn install
```

## 构建

```bash
yarn build
```

## Publish

```bash
npm login
npm publish
```

## 配置

本项目使用 rollup 来做构建工具。Rollup 的配置及其简单，查阅文档即可：[docs](https://rollupjs.org/guide/en)

项目中默认配置了 `es5` `es module` `commomjs` 三种格式的最终代码输出到 `lib` 文件夹。

## TODO

- [] docmentation for package.json props mean.
- [] jest for test.
- [] ci config
