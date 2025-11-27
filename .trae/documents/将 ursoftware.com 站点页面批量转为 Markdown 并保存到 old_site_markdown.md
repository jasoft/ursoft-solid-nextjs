## 任务概述
- 从 `https://ursoftware.com/sitemap.xml` 获取页面列表，批量转换为 Markdown，输出到 `old_site/markdown/` 目录。
- 目标是保留页面的主体内容（标题、正文、图片、列表、表格、按钮文本），剔除导航、页脚、侧边栏等与正文无关的元素。

## 目标页面
- 根据当前站点的 sitemap，拟处理以下 URL：
  - `/`（首页）
  - `/download/`
  - `/support/`
  - `/features/`
  - `/order/`
  - `/uninstaller/update/`
  - `/uninstaller/installed/`
  - `/privacy/`
  - `/404notfound/`
- 如需增减页面（例如分类页、Feed、资源文件等），我会按您的偏好调整；默认仅转换正文页面。

## 输出位置与命名规则
- 目录：`old_site/markdown/`（若不存在则创建）。
- 文件命名（扁平化，保持可读）：
  - `/` → `home.md`
  - `/download/` → `download.md`
  - `/support/` → `support.md`
  - `/features/` → `features.md`
  - `/order/` → `order.md`
  - `/uninstaller/update/` → `uninstaller-update.md`
  - `/uninstaller/installed/` → `uninstaller-installed.md`
  - `/privacy/` → `privacy.md`
  - `/404notfound/` → `404notfound.md`

## 转换方法
- 使用 Jina MCP 的网页处理能力批量抓取并转 Markdown：
  - 自动提取页面 `<main>` 或可读性最高的正文区域（类似 Readability 提取）。
  - 保留标题层级（`h1`~`h3`）与结构化内容（列表、表格、强调、引用）。
  - 图片：以 `![alt](绝对URL)` 形式保留，若缺少 `alt` 则用文件名或上下文生成简述。
  - 链接：内部链接转为绝对 URL（`https://ursoftware.com/...`），保留可读的链接文本。
  - 代码块/按键/按钮：以 Markdown 语法近似表达（如反引号、粗体等）。
  - 去除导航、页脚、版权声明、Cookie 提示等非正文模块。

## 元数据与一致性
- 在每个 Markdown 顶部添加 YAML front matter：
  - `title`: 页面主标题
  - `source_url`: 原始页面 URL
  - `lastmod`: 来自 sitemap 的 `lastmod`（如有）
  - `fetched_at`: 抓取时间（ISO）
  - `original_path`: 站点路径（如 `/download/`）
- 统一编码为 UTF-8，行宽与换行遵循 Markdown 常规（不硬断行）。

## 质量校验
- 随机抽取 2~3 个页面进行人工核对：
  - 比对标题、段落与关键图片是否完整呈现。
  - 检查链接数量与目标是否正确。
  - 评估是否误保留导航/页脚内容，必要时微调提取策略。
- 若远程抓取受限，回退使用本仓库中的 `old_site/` 静态 HTML 作为来源，保证输出一致。

## 变更范围与安全
- 仅新增 `old_site/markdown/` 下的 Markdown 文件，不改动现有源码或配置。
- 不引入外部密钥；网络请求仅用于公开页面内容抓取。

## 后续可选
- 如需用于新站点渲染，可按现有框架增加目录结构或组件化拆分。
- 可对图片进行本地化（下载到仓库再引用）或继续使用绝对链接。

请确认以上页面范围与命名规则；确认后我将执行并交付 Markdown 文件。