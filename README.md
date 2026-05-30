# 26考研马原闪卡复习

一个可部署到自有服务器的静态 SPA，当前只保留“分析题原理 + 名词解释”两类新知识，用于考前高频背诵。

## 功能

- 18 条分析题原理：正面看题型适用范围，背面看“适用范围 / 原理内容 / 方法论”。
- 28 条名词解释：按导论、第一章、第三章、第四章、第五章串联整理，并附记忆链。
- 单卡过卡背诵：一次只显示一张，翻面核对后标记，不会打断背诵节奏。
- 搜索、按模块筛选、随机抽卡复习。
- 不会、模糊、掌握三档本地进度，复习记录保存在浏览器 `localStorage`。
- 静态构建产物可直接放到服务器 Web 目录，由 Caddy/Nginx 托管。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物在 `dist/`。项目没有后端接口，部署时只需要托管静态文件。

## Caddy 示例

```caddyfile
marx.toki.codes {
    root * /home/你的用户名/docker-service/mayuan-review/dist
    encode zstd gzip
    try_files {path} /index.html
    file_server
}
```

注意 `root` 建议写绝对路径，不要写 `~`。
