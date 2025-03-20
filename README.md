# 李占兵的个人博客

这是我的个人博客网站，用于分享我的技术学习、生活随笔和英语学习经验。本站使用 [MkDocs](https://www.mkdocs.org/) 和 [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) 构建。

## 网站功能

- 💬 博客系统：支持文章分类、标签、归档
- 🔍 全文搜索：快速找到需要的内容
- 🌓 深色模式：自动适应系统设置或手动切换
- 📱 响应式设计：适配各种设备尺寸
- 📊 代码高亮和图表支持：包括 Mermaid 流程图
- 📈 网站统计：集成 Google Analytics
- 💭 评论系统：集成 Disqus 评论
- 📰 RSS 订阅：自动生成 RSS 提要

## 目录结构

```
zhanbingli.github.io/
├── docs/                  # 文章和页面存储目录
│   ├── blog/              # 博客文章
│   ├── tech/              # 技术文章
│   ├── life/              # 生活随笔
│   ├── english/           # 英语学习
│   ├── stylesheets/       # 自定义 CSS
│   ├── javascripts/       # 自定义 JavaScript
│   ├── overrides/         # 主题自定义覆盖文件
│   └── index.md           # 首页内容
├── assets/                # 资源文件
│   ├── images/            # 图片资源
│   ├── logo.svg           # 网站 Logo
│   └── favicon.svg        # 网站图标
├── scripts/               # 脚本工具
├── mkdocs.yml             # MkDocs 配置文件
└── requirements.txt       # 依赖包
```

## 本地开发

1. 克隆仓库
```bash
git clone https://github.com/zhanbingli/zhanbingli.github.io.git
cd zhanbingli.github.io
```

2. 安装依赖
```bash
pip install -r requirements.txt
```

3. 本地启动服务
```bash
mkdocs serve
```

4. 构建网站
```bash
mkdocs build
```

5. 部署到GitHub Pages
```bash
mkdocs gh-deploy
```

## 添加新文章

使用自动化脚本创建新文章:

```bash
./scripts/new-post.sh tech "文章标题"
./scripts/commit-post.sh "添加新文章：文章标题"
```

## 许可证

本网站内容采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议。
