# NexDroid HMI for EdgerOs

## 结构

- server-后台
  - server/main.js 主文件
- web-前端
  - web/models/index.js redux 的主要 model，socket.io 连接也在这里连接
  - web/service/index.js socket.io 的方法们
