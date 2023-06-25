# 使用docker-compose编排项目案例

结构如下：

-- images
  -- nginx
    -- conf.d
      -- default.conf
  -- node
    -- web
      -- public
        -- index.html
      -- server.js
    -- Dockerfile
-- docker-compose.yml

docker-compose生成三个容器，分别是db、node、web，其中db服务于node容器，node容器启动一个http服务，暴露3000端口。web容器是一个nginx服务。

项目为node目录下的web项目生成一个镜像，该镜像启动一个node(http)服务，并拷贝静态文件(public)。

nginx服务映射本机的8080端口到nginx的80端口，http://localhost:8080/ 将代理到服务的静态目录web/public，http://localhost:8080/api 将代理到node容器的3000端口。

其中nginx服务的配置文件/conf.d/default.conf和静态目录public都在宿主机建立了数据盘，宿主机中的更改可以直接在容器中生效。