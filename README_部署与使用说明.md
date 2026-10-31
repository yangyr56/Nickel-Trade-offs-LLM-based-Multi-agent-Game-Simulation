# 《镍的取舍》在线版完整部署包（V5 · 2026-10-30）

本包 = 当前线上运行的完整版本（含源代码、构建产物、配置与知识库），可在自有服务器、Docker 或任意支持单端口 HTTP 的环境独立运行。

公开演示（GitHub Pages 静态规则版，无模型调用）：https://yangyr56.github.io/Nickel-Trade-offs-LLM-based-Multi-agent-Game-Simulation/

---

## 一、包内结构

| 路径 | 说明 |
|---|---|
| `server.mjs` | HTTP 服务：口令登录（可关闭）、HMAC 签名会话、Origin 校验、身份注入 |
| `server-bundle.mjs` | **构建产物**（等价于 `dist/server/index.js`）：内嵌前端资源、知识库与全部业务逻辑，单文件 |
| `public/` | 前端：`index.html`、`style.css`、`app.js`（主流程）、`engine.js`（规则引擎）、`data.js`（菜单与数据）、`player-copy.js`（文案）、`followup.js`（复评追问）、`review-chart.js`（两轮态度图表） |
| `worker/` | 业务后端源码：`handler.mjs`（协商主逻辑）、`government.mjs`（中央拟案）、`followup.mjs`（复评清单） |
| `knowledge/` | 知识库 `observations.json`（85条摘要，另保留原始编号及归并关系）及历次核验记录、政策说明文档 |
| `build.mjs` | 构建脚本：把 `public/` + `knowledge/` + `worker/` 拼成 `server-bundle.mjs`（改前端或后端后需重跑） |
| `.env.example` | 无密钥配置模板；复制为 `.env` 后由部署方填写，公开包不含实际 `.env` |
| `verify-local.mjs` | 本机自检脚本：启动校验、匿名拦截、伪造身份头拦截、跨源登录拒绝、会话签发 |
| `Dockerfile`、`*.md` | 容器化与研究说明文档 |

## 二、运行要求

- Node.js ≥ 22（本项目零 npm 依赖，无需 `npm install`）
- 一个可用的 DeepSeek API 密钥
- 一个能暴露单端口 HTTP 服务的环境

## 三、三步启动

```bash
cd <本包目录>
# 0) 先改 .env 的 APP_ORIGIN（见下方说明），否则登录与实时接口会 403
# 1) 确认 .env 其余配置（至少填 DEEPSEEK_API_KEY）
# 2) 改前端或后端后重建（未改动可跳过）
node build.mjs && mv dist/server/index.js server-bundle.mjs
# 3) 启动
node --env-file=.env server.mjs
```

浏览器访问 `http://127.0.0.1:8080` 即可。

> ⚠️ **拿到本包后第一件事**：把 `.env` 里的 `APP_ORIGIN` 改成你实际访问的地址（本地填 `http://127.0.0.1:8080`，线上填 `https://你的域名`）。
> 公开包的 `.env.example` 使用本机地址；线上部署时需将 `APP_ORIGIN` 改成实际托管来源，填错会导致登录与实时接口返回403。

## 四、`.env` 关键配置

| 键 | 说明 |
|---|---|
| `DEEPSEEK_API_KEY` | 服务端持有，浏览器不接触。改密钥只改这一处 |
| `DEEPSEEK_MODEL` | 默认 `deepseek-flash`（混合推理模型，本项目固定关闭思考以保证 JSON 直出） |
| `APP_ORIGIN` | **必须是访问者浏览器里的真实来源**（含协议）。生产填 `https://你的域名`，本地填 `http://127.0.0.1:8080`。填错会导致登录与全部实时接口返回 403 |
| `NODE_ENV=production` | 强制要求 `APP_ORIGIN` 为 HTTPS |
| `HOST` | 普通服务器 `127.0.0.1`（配合反向代理）；容器 `0.0.0.0` |
| `PORT` | 普通部署 `8080`；容器平台由平台注入 `PORT` 变量即可 |
| `PUBLIC_DEMO_MODE` | `1` = 免口令，打开即用实时协商；`0` = 恢复口令登录（口令见 `DEMO_PASSWORD`） |
| `DEMO_PASSWORD` / `SESSION_SECRET` | 口令模式下的团队口令（≥12 字符）与会话签名密钥（≥32 字符） |

### Docker（境内注意镜像源）

```bash
docker build --build-arg NODE_IMAGE=docker.m.daocloud.io/library/node:22-alpine -t nickel-app .
docker run -d -p 8080:8080 -v $PWD/.env:/app/.env:ro -e APP_ORIGIN=https://你的域名 nickel-app
```

### nginx 反向代理要点

```nginx
location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_read_timeout 100s;   # 模型生成较慢，超时过短会截断
    proxy_send_timeout 100s;
}
```

## 五、移交与分发注意

1. **本公开交付包已移除实际 `.env`**。部署方从 `.env.example` 复制并单独填写密钥、演示口令及会话签名密钥；不要把新 `.env` 提交到公开仓库或放入公开压缩包。
2. **`PUBLIC_DEMO_MODE=1` 状态下，任何拿到链接的人都能调用实时协商并消耗账户余额**；实际费用以模型供应商计费和本局用量为准。若需收回，改为 `0` 重启即可恢复口令登录。
3. 密钥、余额与用量上限在 DeepSeek 开放平台侧管理；应用内限流为每分钟 24 次调用（内存态，重启清零，非持久账户上限）。
4. 公开资料记录与模型设定分开；角色权重、政策影响与资源单位含研究假设，不等于现实政府能力或政策成效。角色为聚合利益原型。

## 六、已验证事项（2026-10-30）

- 本机自检 5 项通过：服务启动、匿名不可用付费接口、伪造 `oai-*` 身份头被剥离、跨源登录拒绝、会话签发。
- 线上实测：免登录状态 `authorized:true`；角色协商 200（约 5.1k tokens，一次通过校验，模型立场与规则评估一致）；中央拟案 200（候选 CBCA，约 13.3k tokens，一次通过）；复评接口缺参返回 400 明确校验错误。
- 前后端版本一致性：三个实时接口均要求 `policy_version: policy-quota-v3`，不一致时提示刷新页面。

---

## 七、GitHub 发布版说明（2026-10-30 晚）

来源：`github.com/yangyr56/Nickel-Trade-offs-LLM-based-Multi-agent-Game-Simulation`（main 分支归档）。政策版本仍为 `policy-quota-v3` / `KB-20261030-3`，后端 `worker/handler.mjs` 与上一部署包完全一致；新增内容集中在**研究展示层**：

| 模块 | 内容 |
|---|---|
| `briefing.js/css` | 首页简报面板（`index.html` 直接引用） |
| `history.html/js/css` + `history-host/target.css` | 独立历史页（`/history.html`，iframe 嵌入式布局） |
| `sna.js` / `spatial.js` / `international_nickel_shares.js` / `research_results.js` / `flags.js` | 网络关系、空间分布、国际镍企份额与研究成果可视化 |

两个部署通道的区别：仓库自带 `.github/workflows/pages.yml` 只把 `public/` 发布到 GitHub Pages（**纯静态、规则模式、无 DeepSeek 实时协商**）；本包部署的是带 Node 后端的完整版（静态展示 + 实时协商 + 中央拟案 + 复评，均免登录可用）。两者可并存：GitHub Pages 版供公开浏览，本版供实时推演。

境内适配（同前，2026-10-30 全天沿用）：构建产物改名 `server-bundle.mjs`；`APP_ORIGIN` 对齐托管域名并切生产模式；`PUBLIC_DEMO_MODE=1` 免口令；`HOST=0.0.0.0`；`DEEPSEEK_API_KEY` 由部署方单独设置、仅存服务端。注意 `scripts/build-worker.mjs` 依赖仓库未包含的 `.openai/hosting.json`，境内构建一律用根目录 `build.mjs`。

线上实测（2026-10-30 晚）：免登录 `authorized:true`；10 个新增静态资源全部 200；角色协商 200（4.2 秒，LOCAL 立场 unclear，8.4k prompt/379 输出，一次通过）；中央拟案 200（6.9 秒，候选 CBCA，16.2k prompt/716 输出，一次通过）。
