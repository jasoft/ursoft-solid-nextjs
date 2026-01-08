# Cloudflare Worker 部署说明

## 概述

此 Worker 处理旧路径的多语言跳转，实现：

- **语言检测顺序**：Cookie (`preferredLocale`) → Accept-Language 头 → 默认 `en`
- **302 重定向**：旧路径（如 `/support`）→ `/<locale>/support`
- **排除处理**：静态资源、API、系统文件不重定向
- **SEO 友好**：旧路径保持可访问，搜索引擎会跟随重定向

## 语言支持

- en (English, 默认)
- zh (中文)
- fr (Français)
- es (Español)
- ja (日本語)
- pt (Português)
- de (Deutsch)
- ru (Русский)

## 支持的页面路由

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

以及这些路由的子路径（如 `/docs/bootstrap-template`）。

## 排除的路径

以下路径**不进行重定向**：

- 静态资源：`/images/*`, `/dlds/*`, `/favicon.*`
- 系统文件：`/robots.txt`, `/sitemap.xml`
- API 路由：`/api/*`
- Next.js 资源：`/_next/*`
- 所有带文件扩展名的请求（.png, .jpg, .css, .js 等）

## Cookie 说明

- **名称**：`preferredLocale`
- **值**：支持的语言代码（en, zh, fr, es, ja, pt, de, ru）
- **有效期**：由客户端设置（建议1年）

## 部署步骤

### 方法 1: 使用 Cloudflare Dashboard

1. 登录 Cloudflare Dashboard
2. 选择你的域名
3. 进入 **Workers & Pages** → **Create Application** → **Create Worker**
4. 给 Worker 命名（如 `locale-redirect`）
5. 将 `locale-redirect-worker.js` 的内容复制到编辑器
6. 点击 **Deploy**

### 方法 2: 使用 Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录
wrangler login

# 创建项目（在 workers 目录）
wrangler init locale-redirect

# 编辑 wrangler.toml，配置路由绑定
# 将 locale-redirect-worker.js 重命名为 index.js

# 部署
wrangler deploy
```

### 路由绑定配置

在 Worker 设置中添加路由规则：

**路由模式**：`example.com/*` 或 `yourdomain.com/*`

**确保**：

- Worker 路由绑定在域名级别（不影响子域名，除非需要）
- 不要将 Worker 绑定到特定路径（如 `/support/*`），需要在根级别捕获所有请求

## 测试

### 测试语言检测

1. **默认语言**（无 cookie）

   ```
   访问：https://yourdomain.com/support
   预期：302 跳转到 https://yourdomain.com/en/support
   ```

2. **Cookie 语言**

   ```
   设置 cookie：preferredLocale=zh
   访问：https://yourdomain.com/support
   预期：302 跳转到 https://yourdomain.com/zh/support
   ```

3. **Accept-Language 头**
   ```
   请求头：Accept-Language: zh-CN, en-US;q=0.9
   访问：https://yourdomain.com/support
   预期：302 跳转到 https://yourdomain.com/zh/support
   ```

### 测试排除逻辑

1. **静态资源**

   ```
   访问：https://yourdomain.com/images/hero.png
   预期：直接返回图片，无重定向
   ```

2. **API 路由**

   ```
   访问：https://yourdomain.com/api/support
   预期：直接返回 API 响应，无重定向
   ```

3. **已带 locale 的路径**
   ```
   访问：https://yourdomain.com/zh/support
   预期：直接访问，无重定向
   ```

## 调试

在 Worker 代码中添加日志：

```javascript
console.log("Path:", pathname);
console.log("Target locale:", targetLocale);
```

查看日志：Cloudflare Dashboard → Workers & Pages → 选择 Worker → Logs。

## 注意事项

1. **Cookie 写入**：Worker 只负责读取 cookie。设置 cookie 需要在前端通过 JavaScript（如 `document.cookie`）完成。

2. **静态站点**：确保站点已成功部署，且 Next.js 构建的静态文件在 `public/` 和 `out/` 目录中。

3. **路由优先级**：确保 Worker 路由绑定在其他规则（如 Redirect Rules）之前，避免冲突。

4. **缓存**：首次部署后清除 Cloudflare 缓存：
   - Dashboard → Caching → Configuration → Purge Everything

## 常见问题

### Q: 为什么使用 302 而不是 301？

A: 因为语言检测是动态的（基于用户偏好），使用 302 允许搜索引擎和浏览器重新评估语言选择。如果确定永久跳转，可改为 301。

### Q: Worker 会影响静态资源性能吗？

A: 不会。静态资源、API、系统文件都会直接放行，Worker 仅处理页面路由。

### Q: 如何添加新的页面路由？

A: 在 `PAGE_ROUTES` 数组中添加路径即可：

```javascript
const PAGE_ROUTES = [
  "/",
  "/features",
  "/new-route", // 添加新路由
];
```

### Q: 如何修改默认语言？

A: 在代码中修改 `defaultLocale` 变量：

```javascript
const defaultLocale = "en"; // 改为其他语言
```

### Q: 如果用户手动切换语言，如何更新 cookie？

A: 在前端语言切换组件中添加：

```javascript
const setLocale = (locale) => {
  document.cookie = `preferredLocale=${locale}; path=/; max-age=31536000`;
  router.push(`/${locale}${pathname}`);
};
```

## 相关文件

- Worker 脚本：`workers/locale-redirect-worker.js`
- 前端语言切换：`components/LanguageSwitcher.tsx`
- i18n 配置：`i18n.ts`, `lib/i18n.ts`

## 支持

如有问题，请检查：

1. Worker 日志（Dashboard → Workers → Logs）
2. 网络请求响应头（查看 Location 头）
3. Cookie 设置（浏览器开发者工具 → Application → Cookies）
