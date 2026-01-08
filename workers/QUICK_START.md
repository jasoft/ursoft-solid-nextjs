# Cloudflare Worker 快速部署指南

## 前置条件

- 已部署静态站点到 Cloudflare Pages 或其他托管
- Cloudflare 账户

## 部署步骤

### 1. 准备 Worker 代码

文件位置：`workers/locale-redirect-worker.js`

### 2. 部署方式（二选一）

#### 方法 A: 使用 Wrangler CLI（推荐）

这是最快且不易出错的方法，已配置好 `wrangler.toml`。

1. 进入 workers 目录：
   ```bash
   cd workers
   ```
2. 部署并自动绑定路由：
   ```bash
   npx wrangler deploy
   ```

#### 方法 B: 通过 Cloudflare Dashboard 部署

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 选择你的域名
3. 进入 **Workers & Pages**
4. 点击 **Create Application** -> **Create Worker**
5. 命名 Worker（如 `locale-redirect`）
6. 将 `locale-redirect-worker.js` 内容复制到编辑器并点击 **Deploy**

### 3. 配置路由绑定 (仅 Dashboard 方式需要手动配置)

如果你使用了 **方法 A**，这一步已经自动完成了。如果是 **方法 B**：

1. 在 Worker 页面点击 **Settings** (设置) → **Triggers** (触发器)
2. 找到 **Routes** (路由) 区域，点击 **Add Route**
3. 填写：
   - Route: `www.ursoftware.com/*`（替换为你的实际域名）
   - Zone: 选择 `ursoftware.com`
4. 点击 **Add Route**

### 4. 验证部署

测试旧路径是否自动跳转：

```bash
curl -I https://yourdomain.com/support
```

预期响应：

```
HTTP/2 302
location: https://yourdomain.com/en/support
```

## 修改域名

在 `workers/locale-redirect-worker.js` 中修改域名绑定：

```javascript
// 在 Cloudflare Dashboard 的路由配置中设置
Route: yourdomain.com/*
```

## 清除缓存

首次部署后清除缓存：

1. 进入 **Caching** → **Configuration**
2. 点击 **Purge Everything**

## 常见问题

### Worker 不工作

检查：

1. 路由配置是否正确
2. Worker 是否已部署并激活
3. 域名 DNS 是否指向 Cloudflare

### Cookie 未生效

检查：

1. 浏览器是否允许设置 cookie
2. Cookie 名称是否为 `preferredLocale`
3. Cookie path 是否为 `/`

查看 Cookie：

- Chrome DevTools → Application → Cookies → 你的域名

### 语言检测不正确

检查：

1. Accept-Language 头格式
2. Cookie 值是否为有效的语言代码
3. 默认语言是否为 `en`

## 支持的语言

- en (English, 默认)
- zh (中文)
- fr (Français)
- es (Español)
- ja (日本語)
- pt (Português)
- de (Deutsch)
- ru (Русский)

## 相关文档

- 详细说明：`workers/README.md`
- Worker 代码：`workers/locale-redirect-worker.js`
- 语言切换组件：`components/LanguageSwitcher.tsx`
