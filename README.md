# 李占兵的个人博客

这是我的个人博客网站，使用 MkDocs 和 Material for MkDocs 主题构建。

## 网站内容

- **博客文章**: 个人博客文章集合
- **技术博客**: 分享我的技术学习和经验
- **生活随笔**: 记录生活点滴
- **英语学习**: 英语学习资源和笔记
- **关于我**: 个人介绍

## 功能特点

- **响应式设计**: 适配各种设备尺寸
- **博客系统**: 支持分类、标签、归档
- **Markdown增强**: 支持代码高亮、表格、流程图等
- **深色模式**: 支持深色/浅色模式切换
- **全文搜索**: 快速找到需要的内容
- **RSS订阅**: 支持内容订阅

## 本地开发

### 安装依赖

```bash
pip install -r requirements.txt
```

### 本地预览

```bash
mkdocs serve
```

### 构建网站

```bash
mkdocs build
```

### 创建新文章

使用脚本快速创建新文章:

```bash
./scripts/new-post.sh blog "文章标题"
```

### 提交和部署

```bash
./scripts/commit-post.sh docs/blog/posts/your-post.md
```

## 部署

该网站通过 GitHub Pages 自动部署。

```bash
mkdocs gh-deploy
```

## 技术栈

- [MkDocs](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [MkDocs Blog Plugin](https://github.com/fmaida/mkdocs-blog-plugin)
- [MkDocs RSS Plugin](https://github.com/Guts/mkdocs-rss-plugin)
