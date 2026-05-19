# 马原高分复习

一个可部署到自有服务器的静态 SPA，用闪卡和章节结构辅助复习《马克思主义基本原理》。

## 功能

- 前五章章节知识结构
- 知识脉络：哲学总线、辩证法线、认识论线、历史唯物主义线、政治经济学线
- 概念关系图：展示名词之间的决定、反作用、展开和发展关系
- 理解记忆：闪卡背面显示关联逻辑和记忆提示
- 名词解释闪卡：翻面、筛选、搜索、随机复习
- 本地进度：不会、模糊、掌握
- 高频考点：结合现有 README 和 2024 秋回忆题
- 薄弱项列表：自动聚合未掌握卡片

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物在 `dist/`。因为 `vite.config.ts` 使用了 `base: "./"`，可以部署到服务器根目录，也可以部署到子目录。

## 自有服务器部署

### Nginx 示例

把 `dist/` 上传到服务器，例如 `/var/www/mayuan-review`，然后配置：

```nginx
server {
    listen 80;
    server_name your-domain.example;

    root /var/www/mayuan-review;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }
}
```

如果部署在子路径，例如 `https://example.com/mayuan/`，可以直接把 `dist/` 内容放到对应目录。当前项目没有后端接口，进度保存在访问者自己的浏览器 `localStorage` 中。

## 内容来源

- `../README.md`
- `../往年题/2024秋季马原.md`
- `../马原名词解释.pdf`
- `../马克思主义基本原理（2023年版）.pdf`
- `../马原重点笔记__马克思主义基本原理_马原__.pdf`
