# Project Rules & Workflows

## 语言与交流
- 始终使用中文与用户对话。
- 生成的开发计划 (Plan) 必须使用中文。

## 项目管理 (Node.js/Next.js)
- **提交准则**：在执行 `git commit` 或 `git push` 之前，必须先通过本地全量检查。
- **强制命令**：必须运行 `npm run check` 并确保没有任何错误或警告。
  - 该命令包含：ESLint 检查、TypeScript 类型检查、i18n 多语言一致性检查、以及 Next.js 生产构建测试。
- **i18n 维护**：添加新功能时，需同步更新 `messages/` 下的所有 JSON 文件。使用 `scripts/check-i18n-consistency.js` 验证。

## 增加新语言的 SOP (标准操作流程)
为了避免路由跳转错误（如 `/ko` 跳到 `/en/ko`），请严格执行以下步骤：

1. **配置文件更新**：
   - 在 `i18n.ts` (根目录) 和 `lib/i18n.ts` 中将新语言代码添加到 `locales` 数组。
   - 在 `lib/i18n.ts` 的 `normalizeLocale` 和 `detectLocaleByIp` 中增加相应的逻辑。
2. **Worker 逻辑更新**：
   - 在 `workers/locale-redirect-worker.js` 的 `LOCALES` 数组中添加新语言代码。
3. **翻译文件创建**：
   - 基于 `messages/en.json` 创建 `messages/xx.json`。
   - 运行 `npm run check` 确保结构与英文版 100% 一致。
4. **前端路由警告**：
   - **禁止**在前端 JS (Client Components) 中编写硬编码的语言重定向逻辑。
   - 所有路由分发由 Cloudflare Worker 在边缘侧处理。
5. **部署顺序**：
   - 先 `git push` 触发 Pages 构建。
   - 确认 Pages 预览版已包含新语言页面（HTML 可访问）。
   - 在 `workers/` 目录下运行 `npx wrangler deploy` 更新边缘路由。

## 部署规范 (Cloudflare)
- **部署顺序**：始终先执行 `git push` 触发 Cloudflare Pages 构建，确认 Pages 预览或生产链接正常后，再根据需要部署 Cloudflare Workers。
- **Worker 管理**：修改 Worker 后需在 `workers/` 目录下运行 `npx wrangler deploy`。

## Git 流程
- 完成任务后提交到 GitHub。
- 系统已配置好 `git` 和 `gh` 命令行工具。
- 提交信息应简洁明了，体现变更意图（如 `feat:`, `fix:`, `chore:`）。
