#!/bin/bash

# 检查参数
if [ $# -lt 1 ]; then
    echo "Usage: ./commit-post.sh <file-path>"
    echo "Example: ./commit-post.sh docs/tech/my-new-article.md"
    exit 1
fi

# 获取文件路径
file_path=$1

# 检查文件是否存在
if [ ! -f "$file_path" ]; then
    echo "Error: File $file_path does not exist"
    exit 1
fi

# 获取文章标题
if [[ "$file_path" == *"/blog/posts/"* ]]; then
    # 博客文章，从YAML front matter中提取标题
    title=$(grep "^title: " "$file_path" | cut -d':' -f2- | xargs)
else
    # 普通文章，从一级标题提取
    title=$(grep "^# " "$file_path" | cut -d' ' -f2-)
fi

# 如果标题为空，使用文件名作为标题
if [ -z "$title" ]; then
    title=$(basename "$file_path" .md)
fi

# 构建站点
echo "正在构建站点..."
python3 -m mkdocs build

# 提交更改
echo "正在提交更改..."
git add "$file_path"
git commit -m "Add new article: $title"
git push origin gh-pages

# 部署到 GitHub Pages
echo "正在部署到 GitHub Pages..."
python3 -m mkdocs gh-deploy

echo "文章已成功提交并部署！"
echo "网站地址: https://zhanbingli.github.io/"