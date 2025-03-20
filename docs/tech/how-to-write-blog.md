# 如何写博客文章并提交

本教程将指导你如何为本博客写文章并提交。

## 1. 博客文章结构

所有的博客文章都放在 `docs` 目录下的相应分类目录中：

- 技术文章：放在 `docs/tech/` 目录
- 生活随笔：放在 `docs/life/` 目录

## 2. 创建新文章

### 2.1 直接创建方法

1. 在相应分类目录下创建 Markdown 文件
2. 文件名使用英文，以 `.md` 为后缀
3. 中文标题的文章，文件名可以使用拼音或英文描述

例如，创建一篇技术文章：

```bash
touch docs/tech/python-async-programming.md
```

### 2.2 文章前言部分

每篇文章都应该包含前言部分，格式如下：

```markdown
---
title: 文章标题
date: 2023-05-20
description: 文章简短描述
tags:
  - tag1
  - tag2
---

# 文章标题

正文内容...
```

## 3. 添加文章到导航菜单

编辑 `mkdocs.yml` 文件，在 `nav` 部分添加你的文章：

```yaml
nav:
  - 首页: index.md
  - 技术博客: 
    - 技术首页: tech/index.md
    - Python异步编程: tech/python-异步编程实践.md
    - 新文章标题: tech/your-new-article.md  # 添加这一行
```

## 4. 预览你的文章

在本地预览你的文章：

```bash
mkdocs serve
```

然后访问 http://127.0.0.1:8000 查看效果。

## 5. 提交你的文章

### 5.1 使用Git命令提交

```bash
# 添加所有更改
git add .

# 提交更改
git commit -m "添加新文章：文章标题"

# 推送到GitHub
git push origin main
```

### 5.2 等待自动部署

推送完成后，GitHub Actions 会自动运行部署工作流：

1. 构建网站
2. 部署到 gh-pages 分支
3. 更新网站内容

通常，部署过程需要1-2分钟完成。

## 6. 文章写作技巧

### 6.1 Markdown 语法

本博客支持标准 Markdown 语法，以及一些扩展功能：

#### 代码块

```python
def hello_world():
    print("Hello, World!")
```

#### 引用

> 这是一段引用文字

#### 列表

- 项目1
- 项目2
  - 子项目A
  - 子项目B

#### 表格

| 名称 | 说明 |
| ---- | ---- |
| 示例1 | 描述1 |
| 示例2 | 描述2 |

### 6.2 添加图片

图片应放在 `docs/assets/images/` 目录下，然后在文章中引用：

```markdown
![图片描述](/assets/images/example.jpg)
```

## 7. 故障排除

如果部署过程中遇到问题，可以：

1. 检查 GitHub 仓库的 Actions 标签页查看错误日志
2. 确保文章的 Markdown 格式正确
3. 验证 `mkdocs.yml` 中的文章路径是否正确

希望这个指南能帮助你顺利地开始写博客文章！ 