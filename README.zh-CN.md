# “镍欧佩克”背后：印尼的资源民族主义

> 一个基于新古典现实主义的印尼镍矿 RKAB 配额政策教学与战略协商沙盘。

<p align="center">
  <img src="assets/cover-nickel-tradeoff-hero.jpg" alt="Nickel Trade-off：印尼镍配额协商" width="100%">
</p>

[在线沙盘](https://yangyr56.github.io/Nickel-Trade-offs-LLM-based-Multi-agent-Game-Simulation/) ·
[English README](README.md) ·
[GitHub Pages 工作流](https://github.com/yangyr56/Nickel-Trade-offs-LLM-based-Multi-agent-Game-Simulation/actions/workflows/pages.yml)

## 项目简介

本项目用于国际关系、国际政治经济、资源民族主义和关键矿产供应链教学。网站包含历史现实复现与多主体政策协商两部分，展示国际体系压力如何经过战略认知、国内联盟、制度能力和利益博弈，转化为印尼镍配额政策。

当前 V2 版本使用 `policy-quota-v3` 与 `KB-20261030-3`，知识库包含 85 条观察记录、19 条地方与社区补充证据和 17 个可见来源。

## 界面预览

下图为已部署版本的历史演变页面：

![历史演变页面预览](assets/cover-nickel-tradeoff.png)

## 首次必读

页面首次打开时会显示“沙盘必看历史背景”，玩家必须阅读并确认以下逻辑后才能操作：

```text
国际体系结构性约束 → 国内多元利益主体博弈 → 印尼镍配额政策选择
```

## 游戏角色

- **采矿企业**：关心产量、销售合同和投资回收。
- **冶炼及下游企业**：关心矿石供应连续性和既有产能利用率。
- **产区地方政府**：关心地方财政、就业、公共服务和转型资源。
- **受影响社区**：关心就业、环境、健康、土地、补偿和参与渠道。
- **中央协调者/主持人**：负责提出政策草案、组织协商和检查实施条件。

## 协商议题

1. 镍 RKAB 配额下调幅度与节奏
2. 过渡成本分担
3. 转型培训和公共服务配套

建议课堂形式为三轮谈判加最终决议投票；数字版本采用两轮协商，并由中央协调者作出采纳、修改或维持基线的决定。决议必须获得多数接受，并通过法律权限、资源、合作与实施承诺检查。

## 教学材料

| 文件 | 用途 |
|---|---|
| [`docs/background.md`](docs/background.md) | 完整历史、政策与利益相关方背景 |
| [`docs/role-briefs.md`](docs/role-briefs.md) | 中央协调者和四方角色卡 |
| [`docs/theory-guide.md`](docs/theory-guide.md) | 新古典现实主义教学与评估指南 |
| [`docs/agenda-template.md`](docs/agenda-template.md) | 谈判记录和最终决议模板 |
| [`src/simulation-script.md`](src/simulation-script.md) | 90-100 分钟课堂主持脚本 |

## 核心功能

- 2020-2026 年镍价、政策压力、企业压力代理与关键政治事件
- Huber-Ridge ARX 三个月价格情景与 95% 区间
- 印尼矿区、IMIP/IWIP、资本方向和环境压力地图
- 国旗化国际供需关系图谱及相对受益/受损分析
- 正式权力、资本关系、国内执行和社会合法性四层国内政治网络
- 规则模式与可选 DeepSeek 多主体协商
- 政策资源、合作承诺与实施条件校验

## 本地运行

需要 Node.js 22 或更高版本。

```powershell
Copy-Item .env.example .env
npm start
```

打开 `http://127.0.0.1:8080`。规则模式无需 API 密钥；实时 LLM 模式需在服务端配置 DeepSeek 密钥。不要提交真实 `.env`。

## GitHub Pages

仓库通过 `.github/workflows/pages.yml` 自动发布 `public/`。GitHub Pages 支持历史模块和规则协商；DeepSeek 服务端接口需要独立的 Node 部署环境。

## 项目结构

```text
├── assets/                      # 主封面、界面预览和视觉资源
├── docs/                        # 背景、角色卡、教师指南、决议模板
├── public/                      # 前端、历史模块与数据
├── knowledge/                   # 知识库、来源和编码记录
├── worker/                      # AI 协商与复评接口
├── scripts/                     # 数据和规则检查
├── src/                         # 课堂主持脚本
├── .github/workflows/pages.yml  # GitHub Pages 部署
├── server.mjs                   # 本地服务器
├── server-bundle.mjs            # 服务端构建产物
├── build.mjs                    # 构建脚本
└── LICENSE
```

## 数据与解释边界

- 社会网络分析是截至 2026-10-27 的公开文本累积快照。
- 主体、利益向量和关系强度是研究编码，不等同于真实授权或非正式政治关系。
- 国际供需连线是份额加权的结构性关联，不是实际双边贸易额。
- 环境圈为示意层，不代表精确毁林面积或排放量。
- 价格预测是模型情景，不是投资建议或高置信价格保证。
- LLM 发言是模拟文本，不构成现实政策预测。

## 许可证

本项目采用 [MIT License](LICENSE)。
