# “镍欧佩克”背后：印尼的资源民族主义

印尼镍链历史现实复现与多主体政策协商网站。

## 页面结构

1. **01 历史演变**
   - 镍价历史变化趋势与关键政治事件
   - 印尼矿区和工业园空间分布
   - 国际体系行为体关系图谱
   - 国内政治博弈：利益方社会关系网络
2. **02 了解局势**
3. **03 设定政府**
4. **04 协商现场**
5. **05 决定与复盘**

## 在线部署

仓库包含 `.github/workflows/pages.yml`。在 GitHub 仓库中：

1. 打开 `Settings → Pages`。
2. 将 `Source` 设为 `GitHub Actions`。
3. 推送到 `main` 分支后，工作流会自动发布 `public/` 目录。

GitHub Pages 可以运行历史分析页面和规则模式协商流程。

DeepSeek 实时协商需要 Node 服务端和 API 密钥，不能仅靠 GitHub Pages 运行。

## 本地运行

需要 Node.js 22 或更高版本。

```powershell
Copy-Item .env.example .env
npm start
```

打开 `http://127.0.0.1:8080`。

`.env` 不应提交到 GitHub。API 密钥只配置在本地或受保护的部署环境中。

## 目录

- `public/`：前端页面、历史模块和数据
- `knowledge/`：协商规则与公开资料索引
- `worker/`：中央协商、角色回应和复评接口
- `server.mjs`：本地运行服务器
- `server-bundle.mjs`：可部署的构建产物
- `build.mjs`：重建 server bundle

## 数据与解释边界

社会网络分析是截至 2026-10-27 的公开文本累积关系快照，不代表非正式政治关系或完整权力排名。

历史页面的预测为模型情景，不是高置信镍价预测或投资建议。
