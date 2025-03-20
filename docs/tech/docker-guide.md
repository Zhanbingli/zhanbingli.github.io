title: Docker入门指南：从零开始掌握容器化技术
date: 2024-03-22
tags:
  - Docker
  - 容器化
  - DevOps
---

# Docker入门指南：从零开始掌握容器化技术

Docker作为目前最流行的容器化平台，彻底改变了软件的开发、测试和部署方式。本文将带领初学者系统地了解Docker的基本概念和使用方法，从零开始掌握这项革命性的技术。

## Docker是什么？

Docker是一个开源的应用容器引擎，让开发者可以将应用及其依赖打包到一个可移植的容器中，然后发布到任何流行的Linux或Windows操作系统中，实现虚拟化。Docker容器与传统虚拟机相比，更加轻量级和高效。

### 容器 vs 虚拟机

![容器vs虚拟机](https://via.placeholder.com/800x400?text=容器vs虚拟机)

|  | 容器 | 虚拟机 |
|---|---|---|
| 启动时间 | 秒级 | 分钟级 |
| 硬盘占用 | MB级 | GB级 |
| 性能 | 接近原生 | 有所损耗 |
| 系统支持量 | 单机可运行上千个容器 | 一般几十个VM |

## Docker核心概念

### 1. 镜像(Image)

镜像是Docker的可执行包，包含运行应用所需的所有内容——代码、运行时环境、库、环境变量和配置文件等。

### 2. 容器(Container)

容器是镜像的运行实例。可以被创建、启动、停止、删除、暂停等。容器之间彼此隔离，互不影响。

### 3. 仓库(Repository)

仓库是用来存放镜像的地方，最常用的是[Docker Hub](https://hub.docker.com/)。

## 安装Docker

不同操作系统安装Docker的方式略有不同，以下是主流系统的安装指南。

### MacOS安装

1. 下载并安装[Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
2. 打开Docker.app
3. 验证安装：

```bash
docker version
docker run hello-world
```

### Windows安装

1. 下载并安装[Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
2. 启动Docker Desktop
3. 验证安装：

```bash
docker version
docker run hello-world
```

### Linux安装(Ubuntu为例)

```bash
# 更新apt包索引
sudo apt-get update

# 安装必要的软件包
sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release

# 添加Docker官方GPG密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 设置稳定版仓库
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# 验证安装
sudo docker run hello-world
```

## Docker基本命令

### 镜像操作

```bash
# 列出本地所有镜像
docker images

# 搜索镜像
docker search ubuntu

# 拉取镜像
docker pull ubuntu:20.04

# 删除镜像
docker rmi ubuntu:20.04

# 构建镜像
docker build -t myapp:1.0 .
```

### 容器操作

```bash
# 创建并启动容器
docker run -d -p 80:80 --name mywebserver nginx

# 列出运行中的容器
docker ps

# 列出所有容器（包括已停止的）
docker ps -a

# 停止容器
docker stop mywebserver

# 启动容器
docker start mywebserver

# 重启容器
docker restart mywebserver

# 删除容器
docker rm mywebserver

# 查看容器日志
docker logs mywebserver

# 在运行的容器中执行命令
docker exec -it mywebserver bash
```

## 创建自己的Docker镜像

创建自定义Docker镜像最常用的方式是编写Dockerfile。下面是一个简单的Node.js应用的Dockerfile示例：

```dockerfile
# 使用官方Node.js镜像作为基础镜像
FROM node:14

# 设置工作目录
WORKDIR /usr/src/app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", "app.js"]
```

然后使用以下命令构建镜像：

```bash
docker build -t my-nodejs-app .
```

运行构建好的镜像：

```bash
docker run -p 3000:3000 -d --name my-running-app my-nodejs-app
```

## Docker Compose：管理多容器应用

对于由多个容器组成的应用，可以使用Docker Compose进行统一管理。首先创建一个`docker-compose.yml`文件：

```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - mongodb
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/myapp
  
  mongodb:
    image: mongo:4.4
    volumes:
      - mongodb_data:/data/db
    ports:
      - "27017:27017"

volumes:
  mongodb_data:
```

使用以下命令启动应用：

```bash
docker-compose up -d
```

停止应用：

```bash
docker-compose down
```

## Docker网络

Docker网络使容器之间可以相互通信，也可以与外部网络通信。

### 网络类型

- **bridge**：默认网络类型，适用于同一主机上的容器通信
- **host**：容器直接使用主机网络
- **none**：容器没有网络接口
- **overlay**：用于Docker Swarm中不同主机上的容器通信
- **macvlan**：允许为容器分配MAC地址，使其像物理设备一样

### 常用网络命令

```bash
# 列出所有网络
docker network ls

# 创建网络
docker network create mynetwork

# 创建容器时指定网络
docker run -d --network=mynetwork --name=container1 nginx

# 将已有容器连接到网络
docker network connect mynetwork container2

# 断开网络连接
docker network disconnect mynetwork container2

# 查看网络详情
docker network inspect mynetwork
```

## Docker数据管理

在Docker中，有多种方式可以管理数据：

### 1. 数据卷(Volume)

数据卷是Docker管理的宿主机文件系统的一部分，由Docker创建和管理。

```bash
# 创建数据卷
docker volume create mydata

# 使用数据卷启动容器
docker run -d -v mydata:/data --name mycontainer nginx
```

### 2. 挂载主机目录

可以将主机的目录或文件挂载到容器中。

```bash
# 挂载主机目录
docker run -d -v /host/data:/container/data --name mycontainer nginx

# 挂载单个文件
docker run -d -v /host/file.txt:/container/file.txt --name mycontainer nginx
```

## Docker安全最佳实践

1. **使用官方镜像**：尽量使用官方认证的镜像，减少安全风险
2. **定期更新镜像**：及时更新镜像以修复安全漏洞
3. **最小化镜像**：只包含必要的组件，减少攻击面
4. **不要以root身份运行应用**：在Dockerfile中使用`USER`指令切换到非root用户
5. **扫描镜像漏洞**：使用工具如Docker Security Scanning、Clair等扫描镜像漏洞
6. **限制资源使用**：使用`--memory`和`--cpu`选项限制容器资源使用
7. **使用只读文件系统**：适当时使用`--read-only`选项启动容器

## Docker进阶主题

### Docker Swarm

Docker Swarm是Docker的集群管理工具，可以将多个Docker主机组成一个虚拟Docker主机，提供高可用性和负载均衡。

```bash
# 初始化Swarm集群
docker swarm init

# 将节点加入Swarm集群
docker swarm join --token <token> <manager-ip>:<port>

# 部署服务
docker service create --replicas 3 -p 80:80 --name webservice nginx
```

### 使用Dockerfile多阶段构建

多阶段构建可以帮助减小最终镜像的大小。

```dockerfile
# 构建阶段
FROM node:14 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 常见问题排查

### 1. 容器无法启动

检查启动日志：
```bash
docker logs <container_id>
```

### 2. 容器无法访问网络

检查网络配置：
```bash
docker network inspect bridge
```

### 3. 数据卷无法挂载

确认路径是否正确，权限是否足够：
```bash
ls -la /host/path/to/volume
```

### 4. 镜像构建失败

查看构建日志，检查Dockerfile语法。

## 实战示例：部署NGINX网站

```bash
# 拉取NGINX镜像
docker pull nginx:latest

# 创建本地目录存放网站文件
mkdir -p ~/website/html

# 创建示例HTML文件
echo "<html><body><h1>Hello Docker!</h1></body></html>" > ~/website/html/index.html

# 启动NGINX容器，挂载本地目录
docker run -d -p 8080:80 --name mynginx -v ~/website/html:/usr/share/nginx/html nginx

# 访问网站
# 打开浏览器访问 http://localhost:8080
```

## 总结

Docker技术极大地简化了应用的开发、测试和部署流程。通过容器化，开发者可以专注于业务逻辑的开发，而不必担心环境配置问题。希望本指南能帮助你迈出Docker学习的第一步，开启容器化技术的探索之旅。

记住，Docker的学习是一个循序渐进的过程，建议先掌握基础知识，然后逐步探索更高级的主题。实践是最好的学习方式，动手尝试本文中的示例，将会加深你对Docker的理解。

## 参考资源

- [Docker官方文档](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Play with Docker](https://labs.play-with-docker.com/)

---

如果你对Docker有任何问题或建议，欢迎在评论区留言讨论！