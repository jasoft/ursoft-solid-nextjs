# 旧路径多语言兼容 - 部署完成总结

## 已完成的工作

### 1. 创建 Cloudflare Worker

- 文件：`workers/locale-redirect-worker.js`
- 功能：
  - 语言检测（Cookie > Accept-Language > 默认 en）
  - 302 重定向旧路径到 `/<locale>/...`
  - 排除静态资源、API、系统文件
  - SEO 友好（搜索引擎跟随重定向）

### 2. 前端语言切换 Cookie 设置

- 文件：`components/LanguageSwitcher.tsx`
- 改动：切换语言时设置 `preferredLocale` cookie（有效期1年）

### 3. 文档

- `workers/README.md` - 详细部署和配置说明
- `workers/QUICK_START.md` - 快速部署指南

## 支持的语言

- en (English, 默认)
- zh (中文)
- fr (Français)
- es (Español)
- ja (日本語)
- pt (Português)
- de (Deutsch)
- ru (Русский)

## 兼容的旧路径

所有 app 目录下的页面路由，包括：

- / (首页)
- /features
- /download
- /order
- /support
- /privacy
- /refund-policy
- /delivery-policy
- /docs
- /blog
- /blog/blog-details
- /auth/signin
- /auth/signup
- /uninstaller/installed
- /uninstaller/update

以及这些路由的子路径。

## 不重定向的路径

- 静态资源：`/images/*`, `/dlds/*`, `/favicon.*`
- 系统文件：`/robots.txt`, `/sitemap.xml`
- API 路由：`/api/*`
- Next.js 嵄源：`/_next/*`
- 所有带文件扩展名的请求

## Cookie 规范

- 名称：`preferredLocale`
- 值：语言代码（en, zh, fr, es, ja, pt, de, ru）
- 有效期：1年（31536000秒）
- 路径：`/`
- SameSite：Lax

## 下一步：部署 Worker

### 方法 1: Dashboard

1. 登录 Cloudflare Dashboard
2. Workers & Pages → Create Worker
3. 复制 `locale-redirect-worker.js` 内容
4. Deploy

### 方法 2: Wrangler CLI

```bash
wrangler deploy
```

### 配置路由

在 Worker Settings → Triggers 添加：

```
Route: yourdomain.com/*
```

## 测试验证

### 1. 默认语言跳转

```
访问：https://yourdomain.com/support
预期：302 → https://yourdomain.com/en/support
```

### 2. Cookie 语言跳转

```
设置 cookie：preferredLocale=zh
访问：https://yourdomain.com/support
预期：302 → https://yourdomain.com/zh/support
```

### 3. Accept-Language 跳转

```
请求头：Accept-Language: ja-JP, en-US;q=0.9
访问：https://yourdomain.com/support
预期：302 → https://yourdomain.com/ja/support
```

### 4. 静态资源不跳转

```
访问：https://yourdomain.com/images/hero.png
预期：直接返回图片，无重定向
```

## 注意事项

1. **清除缓存**：首次部署 Worker 后清除 Cloudflare 缓存
2. **路由优先级**：确保 Worker 路由在其他规则之前
3. **Cookie 写入**：Worker 只负责读取 cookie，设置由前端完成
4. **静态站点**：确保 Next.js 构建产物正确部署

## 相关文件

```
workers/
├── locale-redirect-worker.js   # Worker 代码
├── README.md                   # 详细文档
└── QUICK_START.md              # 快速部署指南

components/
└── LanguageSwitcher.tsx        # 语言切换组件（已更新）
```

## 常见问题

### Q: Worker 部署后旧路径仍然 404？

A:

1. 检查路由配置是否绑定到域名根 `/*`
2. 清除 Cloudflare 缓存
3. 查看 Worker 日志确认是否执行

### Q: Cookie 未生效？

A:

1. 确认 Cookie 名称为 `preferredLocale`
2. 确认 Cookie path 为 `/`
3. 检查浏览器是否允许设置 cookie

### Q: Accept-Language 检测不准确？

A:

1. Accept-Language 格式为 `zh-CN, en-US;q=0.9`
2. Worker 只匹配主语言代码（zh, en 等）
3. 不匹配则使用默认 `en`

## 完成状态

✅ Cloudflare Worker 脚本创建
✅ 语言检测逻辑实现
✅ 页面路由白名单配置
✅ 静态资源排除配置
✅ 前端 Cookie 设置
✅ 部署文档编写
✅ 构建验证通过

部署 Worker 后，旧路径将自动跳转到用户语言版本，SEO 和用户体验最大化兼容。
