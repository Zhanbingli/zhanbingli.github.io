#!/bin/bash

# 检查参数
if [ $# -lt 2 ]; then
    echo "Usage: ./new-post.sh <category> <title>"
    echo "Categories: tech, life, english, blog"
    exit 1
fi

# 获取参数
category=$1
title=$2

# 检查分类是否有效
if [[ ! "$category" =~ ^(tech|life|english|blog)$ ]]; then
    echo "Invalid category. Must be one of: tech, life, english, blog"
    exit 1
fi

# 创建文件名（将空格替换为连字符，并转换为小写）
filename=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
date=$(date +%Y-%m-%d)

# 确定目标目录
if [ "$category" == "blog" ]; then
    target_dir="docs/blog/posts"
else
    target_dir="docs/$category"
fi

# 确保目录存在
mkdir -p "$target_dir"

# 创建文章文件
if [ "$category" == "blog" ]; then
    # 博客文章模板
    cat > "$target_dir/$filename.md" << EOF
---
title: $title
date: $date
authors:
  - zhanbingli
categories:
  - $category
tags:
  - [待添加]
---

# $title

<!-- 摘要 -->

[在这里添加文章摘要]

<!-- more -->

## 引言
[在这里添加文章引言]

## 正文
### 第一部分
[在这里添加正文内容]

### 第二部分
[在这里添加更多内容]

## 总结
[在这里添加总结]

## 参考资料
- [参考链接1]
- [参考链接2]
EOF
else
    # 普通文章模板
    cat > "$target_dir/$filename.md" << EOF
# $title

> 发布时间：$date
> 阅读时间：5分钟
> 分类：$category
> 标签：[待添加]

## 引言
[在这里添加文章引言]

## 正文
### 第一部分
[在这里添加正文内容]

### 第二部分
[在这里添加更多内容]

## 总结
[在这里添加总结]

## 参考资料
- [参考链接1]
- [参考链接2]
EOF
fi

# 输出成功信息和后续步骤
echo "文章已创建：$target_dir/$filename.md"
echo "请编辑文章内容，然后运行以下命令预览和发布："
echo "python3 -m mkdocs serve  # 本地预览"
echo "git add $target_dir/$filename.md"
echo "git commit -m \"Add new article: $title\""
echo "git push origin gh-pages"
echo "python3 -m mkdocs gh-deploy  # 部署到GitHub Pages"