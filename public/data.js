window.NICKEL_DATA = {
  "menu": {
    "P02": {
      "name": "配额安排与过渡节奏",
      "options": {
        "B": {
          "text": "沿用现有配额，本轮不额外收紧",
          "actor_effects": {},
          "government_effects": [
            0,
            0,
            0,
            0,
            0,
            0
          ],
          "cost": {},
          "required": [],
          "rule_id": "P02_B_V2",
          "evidence": [
            "N001",
            "N002",
            "B024",
            "B034"
          ],
          "status": "D：政策工具为研究情景；数值与时限非经验估计",
          "real_legal_gate": null,
          "unknown": "实际配额量、价格、净收益、财政审批与长期成效仍需独立核验",
          "timing": "沿用现有安排，无新增收紧。",
          "implementation_gate": "既有法定义务继续适用。",
          "design_rationale": "企业沿用既有生产安排，短期衔接负担较小；本轮也不会增加对开采的约束。"
        },
        "A": {
          "text": "下一执行期收紧配额，三个月后复评",
          "actor_effects": {
            "MINER": [
              null,
              -1,
              -1,
              0
            ],
            "PROCESSOR": [
              -1,
              null,
              -1,
              0
            ]
          },
          "government_effects": [
            0,
            0,
            1,
            0,
            0,
            -1
          ],
          "cost": {
            "MINER": 1,
            "PROCESSOR": 1
          },
          "required": [
            "MINER",
            "PROCESSOR"
          ],
          "rule_id": "P02_A_V2",
          "evidence": [
            "N001",
            "N002",
            "B024",
            "B034"
          ],
          "status": "D：政策工具为研究情景；数值与时限非经验估计",
          "real_legal_gate": null,
          "unknown": "实际配额量、价格、净收益、财政审批与长期成效仍需独立核验",
          "timing": "较快启动额外收紧，三个月后检查供矿与经营情况。",
          "implementation_gate": "企业明确配合调整；实际配额仍需相应审批和复评。",
          "design_rationale": "较快开始控制开采，但矿企可采售矿量受限，冶炼企业需要重排供矿和生产。没有准备期，合同与开工衔接压力更大；净利润变化仍需判断。"
        },
        "C": {
          "text": "先给六个月准备期，再分阶段收紧",
          "actor_effects": {
            "MINER": [
              null,
              1,
              0,
              0
            ],
            "PROCESSOR": [
              0,
              null,
              1,
              0
            ]
          },
          "government_effects": [
            0,
            0,
            1,
            0,
            0,
            1
          ],
          "cost": {
            "GOV": 1,
            "MINER": 1,
            "PROCESSOR": 1
          },
          "required": [
            "MINER",
            "PROCESSOR"
          ],
          "rule_id": "P02_C_V2",
          "evidence": [
            "N001",
            "N002",
            "B024",
            "B034"
          ],
          "status": "D：政策工具为研究情景；数值与时限非经验估计",
          "real_legal_gate": null,
          "unknown": "实际配额量、价格、净收益、财政审批与长期成效仍需独立核验",
          "timing": "先准备六个月，再分步实施和复评；资源控制的启动晚于立即收紧。",
          "implementation_gate": "核对与协调投入、企业调整合作均须明确；不得把准备期当作已经完成收紧。",
          "design_rationale": "先核对供矿、合同和生产衔接，让企业有时间调整；但收紧生效更晚，还会占用中央核对与协调资源。准备期不等于取消后续约束。"
        }
      },
      "driver": "quota-policy"
    },
    "P04": {
      "name": "过渡与履约支持",
      "options": {
        "B": {
          "text": "不新增企业补助，资金留待其他安排",
          "actor_effects": {},
          "government_effects": [
            0,
            0,
            0,
            0,
            0,
            0
          ],
          "cost": {},
          "required": [],
          "rule_id": "P04_B_V2",
          "evidence": [
            "N010",
            "N017"
          ],
          "status": "D：政策工具为研究情景；数值与时限非经验估计",
          "real_legal_gate": null,
          "unknown": "实际配额量、价格、净收益、财政审批与长期成效仍需独立核验",
          "timing": "本轮无新增企业补助。",
          "implementation_gate": "不影响其他已选配套，也不豁免企业法定义务。",
          "design_rationale": "中央不承担这轮额外企业补助，企业自行消化调整成本。培训和公共服务是否有政府投入，仍由后两题单独选择。"
        },
        "A": {
          "text": "提供一年过渡支持，先拨付、后核查用途",
          "actor_effects": {
            "MINER": [
              1,
              0,
              0,
              0
            ],
            "PROCESSOR": [
              0,
              1,
              0,
              0
            ]
          },
          "government_effects": [
            -1,
            0,
            0,
            0,
            0,
            1
          ],
          "cost": {
            "GOV": 3
          },
          "required": [
            "MINER",
            "PROCESSOR"
          ],
          "rule_id": "P04_A_V2",
          "evidence": [
            "N010",
            "N017"
          ],
          "status": "D：政策工具为研究情景；数值与时限非经验估计",
          "real_legal_gate": null,
          "unknown": "实际配额量、价格、净收益、财政审批与长期成效仍需独立核验",
          "timing": "先安排过渡支持，一年内核对用途和退出安排。",
          "implementation_gate": "企业接受用途核查，中央审批与资源到位后才可能拨付。",
          "design_rationale": "对符合试点条件的企业先提供缓冲，帮助较快消化调整成本；中央先承担较多经费，留给其他事项的配套空间更少。这份支持不自动换来培训成果。"
        },
        "C": {
          "text": "提供一年履约支持，培训节点验收后拨付",
          "actor_effects": {
            "MINER": [
              null,
              0,
              -1,
              0
            ],
            "PROCESSOR": [
              0,
              null,
              0,
              0
            ]
          },
          "government_effects": [
            -1,
            1,
            0,
            0,
            1,
            0
          ],
          "cost": {
            "GOV": 2,
            "MINER": 1,
            "PROCESSOR": 1
          },
          "required": [
            "MINER",
            "PROCESSOR"
          ],
          "rule_id": "P04_C_V2",
          "evidence": [
            "N010",
            "N017"
          ],
          "status": "D：政策工具为研究情景；数值与时限非经验估计",
          "real_legal_gate": null,
          "unknown": "实际配额量、价格、净收益、财政审批与长期成效仍需独立核验",
          "timing": "先投入和核验培训节点，再按条件拨付；不能当作企业现在已经拿到钱。",
          "implementation_gate": "须选择培训题的任一新增方案，相关合作齐备；实际验收与拨付仍是后续节点。",
          "design_rationale": "把支持与本地培训或供应商试点的履约挂钩，中央先预留较少资金；企业需要先垫付投入、提交材料，最终经营收益不能只凭补助承诺判断。",
          "dependency_rule": {
            "policy": "P05",
            "options": [
              "A",
              "C"
            ]
          }
        }
      },
      "driver": "policy-tool"
    },
    "P05": {
      "name": "岗位与本地供应能力",
      "options": {
        "B": {
          "text": "维持已有安排，暂不增加培训项目",
          "actor_effects": {},
          "government_effects": [
            0,
            0,
            0,
            0,
            0,
            0
          ],
          "cost": {},
          "required": [],
          "rule_id": "P05_B_V2",
          "evidence": [
            "N011",
            "B013",
            "O02"
          ],
          "status": "D：政策工具为研究情景；数值与时限非经验估计",
          "real_legal_gate": null,
          "unknown": "实际配额量、价格、净收益、财政审批与长期成效仍需独立核验",
          "timing": "无新增项目。",
          "implementation_gate": "保留既有安排，不把它记为新增成果。",
          "design_rationale": "本轮不追加投入和组织任务，也不新增承诺本地岗位或供应商机会。"
        },
        "A": {
          "text": "先做岗位培训，企业出资、地方对接",
          "actor_effects": {
            "MINER": [
              -1,
              0,
              -1,
              0
            ],
            "PROCESSOR": [
              0,
              -1,
              0,
              1
            ],
            "LOCAL": [
              1,
              0,
              -1,
              0
            ],
            "COMMUNITY": [
              0,
              1,
              0,
              0
            ]
          },
          "government_effects": [
            0,
            0,
            0,
            0,
            1,
            0
          ],
          "cost": {
            "MINER": 1,
            "PROCESSOR": 1,
            "LOCAL": 1
          },
          "required": [
            "MINER",
            "PROCESSOR",
            "LOCAL"
          ],
          "rule_id": "P05_A_V2",
          "evidence": [
            "N011",
            "B013",
            "O02"
          ],
          "status": "D：政策工具为研究情景；数值与时限非经验估计",
          "real_legal_gate": null,
          "unknown": "实际配额量、价格、净收益、财政审批与长期成效仍需独立核验",
          "timing": "先围绕既有岗位启动培训，复评就业对接；不保证每位参与者获得岗位。",
          "implementation_gate": "企业培训投入与地方对接合作明确，实际岗位结果另行核对。",
          "design_rationale": "围绕现有岗位开展培训，企业承担经费，地方组织就业对接；准备较简单、中央不用新增配套，但企业和地方要承担成本，对产业链深度的改变有限。"
        },
        "C": {
          "text": "共建技能与本地供应商试点，分阶段验收",
          "actor_effects": {
            "MINER": [
              -1,
              0,
              -1,
              1
            ],
            "PROCESSOR": [
              0,
              -1,
              0,
              1
            ],
            "LOCAL": [
              null,
              0,
              -1,
              0
            ],
            "COMMUNITY": [
              0,
              null,
              1,
              0
            ]
          },
          "government_effects": [
            -1,
            1,
            0,
            0,
            1,
            0
          ],
          "cost": {
            "GOV": 1,
            "MINER": 2,
            "PROCESSOR": 2,
            "LOCAL": 1
          },
          "required": [
            "MINER",
            "PROCESSOR",
            "LOCAL"
          ],
          "rule_id": "P05_C_V2",
          "evidence": [
            "N011",
            "B013",
            "O02"
          ],
          "status": "D：政策工具为研究情景；数值与时限非经验估计",
          "real_legal_gate": null,
          "unknown": "实际配额量、价格、净收益、财政审批与长期成效仍需独立核验",
          "timing": "先确定岗位、供应商申请条件与投入分工，再分阶段检查培训和采购对接。",
          "implementation_gate": "政企和地方投入齐备；采购资格及实际订单单独核验，不保证订单数量。",
          "design_rationale": "政企共同建设技能培训、供应商辅导和采购资格核验，争取把更多配套能力留在本地；项目范围更广，需要更多企业投入与协调时间，近期岗位和采购增量仍不确定。"
        }
      },
      "driver": "policy-tool"
    },
    "P11": {
      "name": "基本服务与综合试点",
      "options": {
        "B": {
          "text": "维持现有服务安排，本轮不扩展",
          "actor_effects": {},
          "government_effects": [
            0,
            0,
            0,
            0,
            0,
            0
          ],
          "cost": {},
          "required": [],
          "rule_id": "P11_B_V2",
          "evidence": [
            "O03",
            "O04",
            "N016",
            "N006"
          ],
          "status": "D：政策工具为研究情景；数值与时限非经验估计",
          "real_legal_gate": null,
          "unknown": "实际配额量、价格、净收益、财政审批与长期成效仍需独立核验",
          "timing": "沿用现有服务。",
          "implementation_gate": "既有环境与服务义务持续，不能以未选试点为由免除。",
          "design_rationale": "地方继续承担既有责任，本轮不新增试点和投入，已有的生活诉求仍需持续回应。"
        },
        "A": {
          "text": "先保基本服务，地方统筹、中央补缺",
          "actor_effects": {
            "LOCAL": [
              0,
              0,
              -1,
              1
            ],
            "COMMUNITY": [
              1,
              0,
              1,
              0
            ]
          },
          "government_effects": [
            -1,
            0,
            0,
            1,
            0,
            0
          ],
          "cost": {
            "GOV": 1,
            "LOCAL": 2,
            "COMMUNITY": 1
          },
          "required": [
            "LOCAL",
            "COMMUNITY"
          ],
          "rule_id": "P11_A_V2",
          "evidence": [
            "O03",
            "O04",
            "N016",
            "N006"
          ],
          "status": "D：政策工具为研究情景；数值与时限非经验估计",
          "real_legal_gate": null,
          "unknown": "实际配额量、价格、净收益、财政审批与长期成效仍需独立核验",
          "timing": "先保障现有基本服务，一年内持续回应和检查；不承诺扩展覆盖范围。",
          "implementation_gate": "地方运营投入及居民反馈参与明确；仍需确认持续运营经费。",
          "design_rationale": "先围绕现有供水及基本服务维护开展一年保障安排，公开回应居民问题。中央投入较少，地方需要承担更多统筹和运营，暂不承诺扩大服务范围。"
        },
        "C": {
          "text": "开展一年综合服务试点，中央配套、居民监督",
          "actor_effects": {
            "MINER": [
              0,
              0,
              0,
              1
            ],
            "PROCESSOR": [
              0,
              0,
              0,
              1
            ],
            "LOCAL": [
              0,
              1,
              1,
              1
            ],
            "COMMUNITY": [
              1,
              0,
              1,
              0
            ]
          },
          "government_effects": [
            -1,
            0,
            0,
            1,
            1,
            0
          ],
          "cost": {
            "GOV": 2,
            "LOCAL": 1,
            "COMMUNITY": 1
          },
          "required": [
            "LOCAL",
            "COMMUNITY"
          ],
          "rule_id": "P11_C_V2",
          "evidence": [
            "O03",
            "O04",
            "N016",
            "N006"
          ],
          "status": "D：政策工具为研究情景；数值与时限非经验估计",
          "real_legal_gate": null,
          "unknown": "实际配额量、价格、净收益、财政审批与长期成效仍需独立核验",
          "timing": "一年试点，季度公开回应；具体扩展范围和长期运营仍须复评。",
          "implementation_gate": "中央配套、地方运营和居民参与均明确；参与监督不包含同意搬迁。",
          "design_rationale": "将服务改善、地方运营和居民监督一并组织，定期公开回应，并讨论更广的服务衔接。中央承担更多配套，地方初期负担较轻，但会占用其他政策的投入空间。"
        }
      },
      "driver": "policy-tool"
    }
  },
  "roles": [
    {
      "actor_id": "MINER",
      "name": "采矿企业阵营",
      "representation": "以合法矿石销售经营者的利益视角聚合；不等于APNI本身，也不包括所有无证经营者。",
      "internal_differences": [
        "独立矿商与矿冶一体化公司不同",
        "大型矿企与小矿主的融资、成本和合同不同，小矿主直接资料不足"
      ],
      "criteria": [
        {
          "id": "MINER_1",
          "name": "净经营回报",
          "raw_priority": 3,
          "weight": 0.3333333333333333,
          "range_definition": "从本轮额外安排显著挤压可用经营空间，到基本可承受，再到改善；不是实测利润",
          "evidence": "B022、N015、N017",
          "cardinal_status": "D：3/2/1及指标等距评分均为研究设定，非测量",
          "score_domain": [
            -1,
            0,
            1
          ],
          "unknown": null,
          "direction_identifiable": "须按采矿企业各事项的证据、适用范围与局限判断，不能从矩阵非偏好行推导效用",
          "ranking_identifiable": false,
          "simulation_reason": "此数值保持V1.1设计初值；对应主体逐事项判断见五张利益矩阵，未据本次资料重新估计权重"
        },
        {
          "id": "MINER_2",
          "name": "计划与交易确定性",
          "raw_priority": 3,
          "weight": 0.3333333333333333,
          "range_definition": "安排不明确／保持基线／有可核对的期限与流程",
          "evidence": "B024、N015",
          "cardinal_status": "D：3/2/1及指标等距评分均为研究设定，非测量",
          "score_domain": [
            -1,
            0,
            1
          ],
          "unknown": null,
          "direction_identifiable": "须按采矿企业各事项的证据、适用范围与局限判断，不能从矩阵非偏好行推导效用",
          "ranking_identifiable": false,
          "simulation_reason": "此数值保持V1.1设计初值；对应主体逐事项判断见五张利益矩阵，未据本次资料重新估计权重"
        },
        {
          "id": "MINER_3",
          "name": "转型负担可承担性",
          "raw_priority": 2,
          "weight": 0.2222222222222222,
          "range_definition": "任务无资金和过渡／基线／有可核对的分期与资源",
          "evidence": "N017、B024",
          "cardinal_status": "D：3/2/1及指标等距评分均为研究设定，非测量",
          "score_domain": [
            -1,
            0,
            1
          ],
          "unknown": null,
          "direction_identifiable": "须按采矿企业各事项的证据、适用范围与局限判断，不能从矩阵非偏好行推导效用",
          "ranking_identifiable": false,
          "simulation_reason": "此数值保持V1.1设计初值；对应主体逐事项判断见五张利益矩阵，未据本次资料重新估计权重"
        },
        {
          "id": "MINER_4",
          "name": "地方关系与经营协调",
          "raw_priority": 1,
          "weight": 0.1111111111111111,
          "range_definition": "争议无回应／基线／有可核对的沟通和处理",
          "evidence": "B036、O01",
          "cardinal_status": "D：3/2/1及指标等距评分均为研究设定，非测量",
          "score_domain": [
            -1,
            0,
            1
          ],
          "unknown": null,
          "direction_identifiable": "须按采矿企业各事项的证据、适用范围与局限判断，不能从矩阵非偏好行推导效用",
          "ranking_identifiable": false,
          "simulation_reason": "此数值保持V1.1设计初值；对应主体逐事项判断见五张利益矩阵，未据本次资料重新估计权重"
        }
      ],
      "preference_fixed_within_run": true,
      "actions": [
        "提供自身被授权的生产和经营资料",
        "提出销售、价格执行或实施节奏建议",
        "经单独授权后提出限定供货或合规改造意向"
      ],
      "boundaries": [
        "依法经营及适用义务不能通过偏好分数取消",
        "不能替全部矿主出售矿石或同意全国减产"
      ],
      "cooperation_conditions": [
        "销售和合规信息用途、范围及权限明确后，讨论提供限定资料",
        "供货须明确企业、品位数量、合同、产能及履行期"
      ],
      "alternatives": [
        "减少或推迟自愿新增投入",
        "寻求其他合法买方或合同调整；可行性待核"
      ],
      "evidence_ids": [
        "B024",
        "N015",
        "N017",
        "B036"
      ],
      "authority": {
        "real": "按具体事项待核，不授予阵营全国授权",
        "sandbox": "仅可在已登记的模拟事项和资源内明确提出承诺"
      },
      "initial_state": {
        "information": "公开情境、政策基线、四卡、政府路线和规则版本",
        "existing_commitments": [],
        "real_resources": null,
        "real_authority": null,
        "real_reservation_payoff": null
      },
      "unknowns": [
        "完整真实接受条件",
        "具体法人/机构/参与者授权",
        "项目预算和成本",
        "各内部类型的权重差异"
      ],
      "value_interpretation": "相对给定参照方案的模型评价，不是成功概率或跨主体可比较福利",
      "review_status": "研究与设计初稿；待用户复核",
      "scenario_authority": {
        "scope": "本局限定试点；不约束全国、第三方、土地同意或法定审批",
        "resources": {
          "work": 4
        },
        "cost_unit": "D投入单位，非人民币、人数或全国能力",
        "expiry": "当前政策版本；修改后重新确认",
        "outside_action": "不作新增自愿投入，原有法定义务持续"
      }
    },
    {
      "actor_id": "PROCESSOR",
      "name": "冶炼与下游产业阵营",
      "representation": "基准采用依赖外购矿石的加工经营视角；包括不同资本来源的模拟利益，不代表单一园区全部企业。",
      "internal_differences": [
        "矿冶一体化公司对矿源冲击可能不同",
        "存量火法、湿法及在建项目不能使用同一停复产参数",
        "国企任务与商业回报存在张力，不从股权直接推定统一偏好"
      ],
      "criteria": [
        {
          "id": "PROCESSOR_1",
          "name": "原料与连续经营",
          "raw_priority": 3,
          "weight": 0.3,
          "range_definition": "原料安排更不确定／基线／数量质量与交付安排更明确",
          "evidence": "B034、N002",
          "cardinal_status": "D：3/2/1及指标等距评分均为研究设定，非测量",
          "score_domain": [
            -1,
            0,
            1
          ],
          "unknown": null,
          "direction_identifiable": "须按冶炼与下游各事项的证据、适用范围与局限判断，不能从矩阵非偏好行推导效用",
          "ranking_identifiable": false,
          "simulation_reason": "此数值保持V1.1设计初值；对应主体逐事项判断见五张利益矩阵，未据本次资料重新估计权重"
        },
        {
          "id": "PROCESSOR_2",
          "name": "净经营回报",
          "raw_priority": 3,
          "weight": 0.3,
          "range_definition": "新增安排明显挤压／基线／改善；成本已含在该项时不再额外扣同一成本",
          "evidence": "N005、N017",
          "cardinal_status": "D：3/2/1及指标等距评分均为研究设定，非测量",
          "score_domain": [
            -1,
            0,
            1
          ],
          "unknown": null,
          "direction_identifiable": "须按冶炼与下游各事项的证据、适用范围与局限判断，不能从矩阵非偏好行推导效用",
          "ranking_identifiable": false,
          "simulation_reason": "此数值保持V1.1设计初值；对应主体逐事项判断见五张利益矩阵，未据本次资料重新估计权重"
        },
        {
          "id": "PROCESSOR_3",
          "name": "投资与程序确定性",
          "raw_priority": 2,
          "weight": 0.2,
          "range_definition": "项目安排模糊／基线／期限责任明确",
          "evidence": "B014、B024",
          "cardinal_status": "D：3/2/1及指标等距评分均为研究设定，非测量",
          "score_domain": [
            -1,
            0,
            1
          ],
          "unknown": null,
          "direction_identifiable": "须按冶炼与下游各事项的证据、适用范围与局限判断，不能从矩阵非偏好行推导效用",
          "ranking_identifiable": false,
          "simulation_reason": "此数值保持V1.1设计初值；对应主体逐事项判断见五张利益矩阵，未据本次资料重新估计权重"
        },
        {
          "id": "PROCESSOR_4",
          "name": "升级合作可实现性",
          "raw_priority": 2,
          "weight": 0.2,
          "range_definition": "只有口号或无授权要求／基线／有阶段目标与资源",
          "evidence": "B013、B014、N011",
          "cardinal_status": "D：3/2/1及指标等距评分均为研究设定，非测量",
          "score_domain": [
            -1,
            0,
            1
          ],
          "unknown": null,
          "direction_identifiable": "须按冶炼与下游各事项的证据、适用范围与局限判断，不能从矩阵非偏好行推导效用",
          "ranking_identifiable": false,
          "simulation_reason": "此数值保持V1.1设计初值；对应主体逐事项判断见五张利益矩阵，未据本次资料重新估计权重"
        }
      ],
      "preference_fixed_within_run": true,
      "actions": [
        "解释采购、工艺和经营约束",
        "提出有期限的改造、培训或技术合作方案",
        "确认自身被授权的资金或数据贡献"
      ],
      "boundaries": [
        "不能替股东、银行、全部入驻公司或工人承诺",
        "停炉选项保留，成本与热工约束单列；不是绝对不能停"
      ],
      "cooperation_conditions": [
        "追加投资需企业授权、资金、矿源与项目阶段相匹配",
        "监测信息合作需用途、商业秘密边界与负责人员明确"
      ],
      "alternatives": [
        "替代采购、减产或计划停复炉，须具体工况核对",
        "推迟自愿新增投资；不等于可拒绝既有法定义务"
      ],
      "evidence_ids": [
        "B034",
        "N003",
        "N004",
        "N005",
        "B014",
        "O03"
      ],
      "authority": {
        "real": "按具体事项待核，不授予阵营全国授权",
        "sandbox": "仅可在已登记的模拟事项和资源内明确提出承诺"
      },
      "initial_state": {
        "information": "公开情境、政策基线、四卡、政府路线和规则版本",
        "existing_commitments": [],
        "real_resources": null,
        "real_authority": null,
        "real_reservation_payoff": null
      },
      "unknowns": [
        "完整真实接受条件",
        "具体法人/机构/参与者授权",
        "项目预算和成本",
        "各内部类型的权重差异"
      ],
      "value_interpretation": "相对给定参照方案的模型评价，不是成功概率或跨主体可比较福利",
      "review_status": "研究与设计初稿；待用户复核",
      "scenario_authority": {
        "scope": "本局限定试点；不约束全国、第三方、土地同意或法定审批",
        "resources": {
          "work": 4
        },
        "cost_unit": "D投入单位，非人民币、人数或全国能力",
        "expiry": "当前政策版本；修改后重新确认",
        "outside_action": "不作新增自愿投入，原有法定义务持续"
      }
    },
    {
      "actor_id": "LOCAL",
      "name": "产区地方政府阵营",
      "representation": "聚合产区公共服务、地方发展与协调负担的视角；省、县、议会的具体权力保持分列。",
      "internal_differences": [
        "产业规模、地方财政和承受能力有差异",
        "行政执行与议会审议不同；不能互相替代",
        "省与县的权限、资金不能共用"
      ],
      "criteria": [
        {
          "id": "LOCAL_1",
          "name": "本地就业与生计收益",
          "raw_priority": 3,
          "weight": 0.3,
          "range_definition": "收益安排受损／基线／有具体培训岗位或生计机会",
          "evidence": "O02、N016",
          "cardinal_status": "D：3/2/1及指标等距评分均为研究设定，非测量",
          "score_domain": [
            -1,
            0,
            1
          ],
          "unknown": null,
          "direction_identifiable": "须按地方政府各事项的证据、适用范围与局限判断，不能从矩阵非偏好行推导效用",
          "ranking_identifiable": false,
          "simulation_reason": "此数值保持V1.1设计初值；对应主体逐事项判断见五张利益矩阵，未据本次资料重新估计权重"
        },
        {
          "id": "LOCAL_2",
          "name": "公共服务与地方可用资源",
          "raw_priority": 3,
          "weight": 0.3,
          "range_definition": "新增需求无安排／基线／服务与资金匹配",
          "evidence": "O03、O04、N016",
          "cardinal_status": "D：3/2/1及指标等距评分均为研究设定，非测量",
          "score_domain": [
            -1,
            0,
            1
          ],
          "unknown": null,
          "direction_identifiable": "须按地方政府各事项的证据、适用范围与局限判断，不能从矩阵非偏好行推导效用",
          "ranking_identifiable": false,
          "simulation_reason": "此数值保持V1.1设计初值；对应主体逐事项判断见五张利益矩阵，未据本次资料重新估计权重"
        },
        {
          "id": "LOCAL_3",
          "name": "任务可执行性",
          "raw_priority": 2,
          "weight": 0.2,
          "range_definition": "任务超出权限或无人员／基线／职责与人员明确",
          "evidence": "O01、O04、B009",
          "cardinal_status": "D：3/2/1及指标等距评分均为研究设定，非测量",
          "score_domain": [
            -1,
            0,
            1
          ],
          "unknown": null,
          "direction_identifiable": "须按地方政府各事项的证据、适用范围与局限判断，不能从矩阵非偏好行推导效用",
          "ranking_identifiable": false,
          "simulation_reason": "此数值保持V1.1设计初值；对应主体逐事项判断见五张利益矩阵，未据本次资料重新估计权重"
        },
        {
          "id": "LOCAL_4",
          "name": "环境与社会稳定",
          "raw_priority": 2,
          "weight": 0.2,
          "range_definition": "未回应的风险增加／基线／有监测、处置及参与",
          "evidence": "O02、N016",
          "cardinal_status": "D：3/2/1及指标等距评分均为研究设定，非测量",
          "score_domain": [
            -1,
            0,
            1
          ],
          "unknown": null,
          "direction_identifiable": "须按地方政府各事项的证据、适用范围与局限判断，不能从矩阵非偏好行推导效用",
          "ranking_identifiable": false,
          "simulation_reason": "此数值保持V1.1设计初值；对应主体逐事项判断见五张利益矩阵，未据本次资料重新估计权重"
        }
      ],
      "preference_fixed_within_run": true,
      "actions": [
        "汇集规划意见、组织职责范围内的协调",
        "提出地方服务和预算需求",
        "在明确授权和资源下承诺限定人员或配套事项"
      ],
      "boundaries": [
        "不能替中央批准矿权或改变税法",
        "同一笔预算不因政府和地方两张卡重复出现"
      ],
      "cooperation_conditions": [
        "额外任务需负责部门、人员工时、资金及适用程序",
        "涉及议会或上级程序的事项只可表达拟申请，不当作已批准"
      ],
      "alternatives": [
        "缩小自愿新增任务或调整时序",
        "请求上级资源与跨部门协调"
      ],
      "evidence_ids": [
        "O01",
        "O02",
        "O03",
        "O04",
        "B009",
        "N016"
      ],
      "authority": {
        "real": "按具体事项待核，不授予阵营全国授权",
        "sandbox": "仅可在已登记的模拟事项和资源内明确提出承诺"
      },
      "initial_state": {
        "information": "公开情境、政策基线、四卡、政府路线和规则版本",
        "existing_commitments": [],
        "real_resources": null,
        "real_authority": null,
        "real_reservation_payoff": null
      },
      "unknowns": [
        "完整真实接受条件",
        "具体法人/机构/参与者授权",
        "项目预算和成本",
        "各内部类型的权重差异"
      ],
      "value_interpretation": "相对给定参照方案的模型评价，不是成功概率或跨主体可比较福利",
      "review_status": "研究与设计初稿；待用户复核",
      "scenario_authority": {
        "scope": "本局限定试点；不约束全国、第三方、土地同意或法定审批",
        "resources": {
          "work": 3
        },
        "cost_unit": "D投入单位，非人民币、人数或全国能力",
        "expiry": "当前政策版本；修改后重新确认",
        "outside_action": "不作新增自愿投入，原有法定义务持续"
      }
    },
    {
      "actor_id": "COMMUNITY",
      "name": "受影响社区阵营",
      "representation": "以健康、生计、参与和空间连续性为共同议题的模拟阵营；没有代表全部社区同意政策的权力。",
      "internal_differences": [
        "Kawasi部分居民拒搬与Kurisa部分居民愿搬来自不同地点",
        "就业依赖、渔农生计、年龄和土地关系不同",
        "NGO、工会、村级组织不自动等于全体居民"
      ],
      "criteria": [
        {
          "id": "COMMUNITY_1",
          "name": "健康与基本环境服务",
          "raw_priority": 3,
          "weight": 0.3,
          "range_definition": "风险及服务恶化／基线／有可核对的水质空气和服务安排",
          "evidence": "N006、N012、O06",
          "cardinal_status": "D：3/2/1及指标等距评分均为研究设定，非测量",
          "score_domain": [
            -1,
            0,
            1
          ],
          "unknown": null,
          "direction_identifiable": "须按受影响社区各事项的证据、适用范围与局限判断，不能从矩阵非偏好行推导效用",
          "ranking_identifiable": false,
          "simulation_reason": "此数值保持V1.1设计初值；对应主体逐事项判断见五张利益矩阵，未据本次资料重新估计权重"
        },
        {
          "id": "COMMUNITY_2",
          "name": "生计与分配保障",
          "raw_priority": 3,
          "weight": 0.3,
          "range_definition": "原生计受损未回应／基线／有明确生计恢复安排",
          "evidence": "N006、N013、N014",
          "cardinal_status": "D：3/2/1及指标等距评分均为研究设定，非测量",
          "score_domain": [
            -1,
            0,
            1
          ],
          "unknown": null,
          "direction_identifiable": "须按受影响社区各事项的证据、适用范围与局限判断，不能从矩阵非偏好行推导效用",
          "ranking_identifiable": false,
          "simulation_reason": "此数值保持V1.1设计初值；对应主体逐事项判断见五张利益矩阵，未据本次资料重新估计权重"
        },
        {
          "id": "COMMUNITY_3",
          "name": "参与与问责",
          "raw_priority": 2,
          "weight": 0.2,
          "range_definition": "只有通知无回应／基线／有资料、发言、回应与复核渠道",
          "evidence": "N008、N009、N014",
          "cardinal_status": "D：3/2/1及指标等距评分均为研究设定，非测量",
          "score_domain": [
            -1,
            0,
            1
          ],
          "unknown": null,
          "direction_identifiable": "须按受影响社区各事项的证据、适用范围与局限判断，不能从矩阵非偏好行推导效用",
          "ranking_identifiable": false,
          "simulation_reason": "此数值保持V1.1设计初值；对应主体逐事项判断见五张利益矩阵，未据本次资料重新估计权重"
        },
        {
          "id": "COMMUNITY_4",
          "name": "土地文化与空间连续性",
          "raw_priority": 2,
          "weight": 0.2,
          "range_definition": "未经具体同意改变空间安排／基线／有尊重差异的方案",
          "evidence": "B033、N006、N013、N014",
          "cardinal_status": "D：3/2/1及指标等距评分均为研究设定，非测量",
          "score_domain": [
            -1,
            0,
            1
          ],
          "unknown": null,
          "direction_identifiable": "须按受影响社区各事项的证据、适用范围与局限判断，不能从矩阵非偏好行推导效用",
          "ranking_identifiable": false,
          "simulation_reason": "此数值保持V1.1设计初值；对应主体逐事项判断见五张利益矩阵，未据本次资料重新估计权重"
        }
      ],
      "preference_fixed_within_run": true,
      "actions": [
        "提出诉求、质疑资料和提出替代方案",
        "由限定参与者决定是否参加监督讨论",
        "保留投诉、拒绝自愿协议及其他合法救济选择"
      ],
      "boundaries": [
        "参与监测不表示放弃权利或接受全部政策",
        "不替所有居民同意搬迁、转让土地或放弃诉讼"
      ],
      "cooperation_conditions": [
        "参加讨论需可理解资料、便利渠道和明确代表范围",
        "涉及搬迁必须另开具体居民情境，不在基准局自动交易"
      ],
      "alternatives": [
        "继续表达分歧或寻求资料和救济",
        "提出不同地点和生计群体的替代方案"
      ],
      "evidence_ids": [
        "N006",
        "N007",
        "N013",
        "N014",
        "B033",
        "O06"
      ],
      "authority": {
        "real": "按具体事项待核，不授予阵营全国授权",
        "sandbox": "仅可在已登记的模拟事项和资源内明确提出承诺"
      },
      "initial_state": {
        "information": "公开情境、政策基线、四卡、政府路线和规则版本",
        "existing_commitments": [],
        "real_resources": null,
        "real_authority": null,
        "real_reservation_payoff": null
      },
      "unknowns": [
        "完整真实接受条件",
        "具体法人/机构/参与者授权",
        "项目预算和成本",
        "各内部类型的权重差异"
      ],
      "value_interpretation": "相对给定参照方案的模型评价，不是成功概率或跨主体可比较福利",
      "review_status": "研究与设计初稿；待用户复核",
      "scenario_authority": {
        "scope": "本局限定试点；不约束全国、第三方、土地同意或法定审批",
        "resources": {
          "work": 2
        },
        "cost_unit": "D投入单位，非人民币、人数或全国能力",
        "expiry": "当前政策版本；修改后重新确认",
        "outside_action": "不作新增自愿投入，原有法定义务持续"
      }
    }
  ],
  "government": {
    "objectives": [
      "财政与国家收益",
      "产业能力与自主",
      "资源持续利用",
      "环境与社会保障",
      "地方执行与分配",
      "投资与市场稳定"
    ],
    "routes": [
      {
        "id": "G1",
        "name": "收益与稳定优先",
        "raw": [
          3,
          1,
          2,
          1,
          2,
          3
        ],
        "tradeoff": "优先讨论近期收益和经营稳定，须解释对升级与长期投入的安排",
        "weights": [
          0.25,
          0.08333333333333333,
          0.16666666666666666,
          0.08333333333333333,
          0.16666666666666666,
          0.25
        ],
        "status": "全部排序、数值与路线划分为D模拟设定，非已观察到的真实部门联盟"
      },
      {
        "id": "G2",
        "name": "产业升级优先",
        "raw": [
          2,
          3,
          2,
          1,
          1,
          3
        ],
        "tradeoff": "优先讨论分阶段能力建设及投资条件，承认财政和地方配套压力",
        "weights": [
          0.16666666666666666,
          0.25,
          0.16666666666666666,
          0.08333333333333333,
          0.08333333333333333,
          0.25
        ],
        "status": "全部排序、数值与路线划分为D模拟设定，非已观察到的真实部门联盟"
      },
      {
        "id": "G3",
        "name": "资源与治理韧性优先",
        "raw": [
          1,
          2,
          3,
          3,
          2,
          1
        ],
        "tradeoff": "优先讨论资源质量、环境和可执行性，承认近期增长与收入取舍",
        "weights": [
          0.08333333333333333,
          0.16666666666666666,
          0.25,
          0.25,
          0.16666666666666666,
          0.08333333333333333
        ],
        "status": "全部排序、数值与路线划分为D模拟设定，非已观察到的真实部门联盟"
      }
    ],
    "adjustment": "开局最多转移1个优先点：一项减1，另一项加1；均保持1—3，总点数不变；选定后锁定。允许不调整。",
    "constraints": "调整不改变法律、预算、事实或他人权重；六目标范围先按明确的政策条款及阶段投入比较，不估算五至十年实现值",
    "questions": [
      {
        "id": "Q1",
        "text": "本局优先采用哪种目标排序？",
        "options": [
          "收益与稳定优先",
          "产业升级优先",
          "资源与治理韧性优先"
        ]
      },
      {
        "id": "Q2",
        "text": "是否进行一次有限优先点转移？",
        "options": [
          "不调整",
          "按规则转移1点并注明理由"
        ]
      }
    ],
    "evidence": [
      "N002",
      "N010",
      "N011",
      "N016",
      "N017"
    ],
    "representation": "以选择题表达中央协调后的模拟排序，不宣称消除现实部门分歧"
  },
  "scenario": {
    "id": "S20261029",
    "cutoff": "2026-10-29",
    "status": "D：四压力同时存在的试点情景，不是当前全国数据测量",
    "pressures": [
      "供矿与经营调整压力",
      "财政支持空间有限",
      "产业能力升级任务",
      "地方服务与参与负担"
    ],
    "capacity": {
      "GOV": 4,
      "MINER": 4,
      "PROCESSOR": 4,
      "LOCAL": 3,
      "COMMUNITY": 2
    },
    "already_spent": {
      "GOV": 0,
      "MINER": 0,
      "PROCESSOR": 0,
      "LOCAL": 0,
      "COMMUNITY": 0
    },
    "unit": "D投入单位，各承担者独立，不互相替代",
    "sandbox_legal": true,
    "real_legal": null,
    "scope": "有限试点，不代表全国法定授权",
    "stages": {
      "近期": "准备资料、确认授权、安排首期投入",
      "中期": "执行试点，季度/半年按条款核验",
      "远期": "5—10年视野下复评；不外推试点效果"
    },
    "rejection_cost": "拒绝新增投入则相应依赖条款不具实施准备，不凭空罚款；现行义务不变"
  },
  "phrases": {
    "MINER": [
      [
        "这个安排有望改善我们的经营回报",
        "我们的经营回报会承压",
        "调整新增负担，改善经营回报"
      ],
      [
        "生产和交易安排更明确了",
        "政策变化给生产和交易增加了不确定性",
        "稳定政策和执行时间表"
      ],
      [
        "配套安排减轻了我们的转型负担",
        "新增转型任务给我们带来了更大的负担",
        "提供准备期和成本配套"
      ],
      [
        "这个安排有助于改善地方经营关系",
        "地方关系和经营协调面临更多压力",
        "回应地方争议，减少经营摩擦"
      ]
    ],
    "PROCESSOR": [
      [
        "原料和连续生产安排更有保障了",
        "原料供应和连续生产面临更多风险",
        "保障供矿衔接和生产调整时间"
      ],
      [
        "这个安排有望改善加工经营回报",
        "加工经营回报受到挤压",
        "缓解采购及新增投入的成本压力"
      ],
      [
        "投资和项目安排更容易规划了",
        "项目和政策安排的不确定性增加了",
        "稳定项目条件和审批安排"
      ],
      [
        "升级合作更容易推进了",
        "升级任务的实施难度增加了",
        "协调技术、人员与投入条件"
      ]
    ],
    "LOCAL": [
      [
        "本地居民和企业有望获得更多机会",
        "本地就业和生计可能受到影响",
        "照顾本地就业和供应商机会"
      ],
      [
        "地方服务和资源配套有所改善",
        "地方服务负担增加，可用资源却承压",
        "给地方服务配套人员和经费"
      ],
      [
        "这些任务更容易落实了",
        "新增任务让地方执行更加吃力",
        "调整任务和执行节奏"
      ],
      [
        "这个安排有助于改善环境和社会稳定",
        "地方环境和社会稳定面临更多压力",
        "处理环境与社会争议"
      ]
    ],
    "COMMUNITY": [
      [
        "我们的健康和基本生活服务有望改善",
        "我们担心健康和基本生活环境受到影响",
        "改善基本服务和生活环境"
      ],
      [
        "我们的生计和收益保障有望改善",
        "我们的工作和家庭生计可能受损",
        "照顾受影响居民的收入和生计"
      ],
      [
        "我们的意见更有机会得到回应",
        "我们的意见难以得到有效回应",
        "让居民能表达意见，遇到问题有人回应"
      ],
      [
        "这个安排有助于维持我们的生活空间和联系",
        "我们的土地、生活空间和社区联系面临压力",
        "尊重原有生活空间与社区联系"
      ]
    ]
  },
  "evidence": [
    {
      "title": "政府：兼顾经营、供给与储量",
      "note": "ESDM 2026-06-25公开评估说明（N001/N002）。支持多个目标并存，不给出目标的精确排序。",
      "url": "https://www.esdm.go.id/id/media-center/arsip-berita/kementerian-esdm-belum-putuskan-besaran-rkab-nikel-2026"
    },
    {
      "title": "企业：许可确定性与长期投资",
      "note": "PT Vale 2026-01-15公司声明。是一体化企业的公开表述，不代表全部矿商或加工企业。",
      "url": "https://vale.com/documents/44618/1438419/IN%2B-%2BPTVI%2B-%2BSiaran%2BPers%2B-%2BRKAB%2B2026.pdf/999f9d02-933f-6a19-7cb4-3d6bbc730083?download=false&t=1768464262898&version=1.0"
    },
    {
      "title": "地方：发展、公共服务与环境",
      "note": "莫罗瓦利县规划会议，事件2025-07-04、发布2025-07-09（O02/R02）。地方表述不能推为全国一致排序。",
      "url": "https://morowalikab.go.id/news/kabupaten-morowali-gelar-musrenbang-rpjmd-2025-2029-di-kecamatan-bahodopi"
    },
    {
      "title": "居民：水电与生活诉求",
      "note": "Jaring Nusa KTI 2025-11-19报道中的居民引述及组织表达，二者不混为同一来源。诉求不等于全村授权。",
      "url": "https://jaringnusa.id/desa-kawasi-krisis-air-bersih-dan-listrik-warga-melakukan-protes/"
    },
    {
      "title": "企业回应：服务与环境安排",
      "note": "Harita 2026-08-03企业声明（N012）。设施、运营和居民认可需分别验证，不能当独立监测结论。",
      "url": "https://tbpnickel.com/en/harita-nickels-latest-information-on-several-issues-in-kawasi-village-obi-island"
    }
  ],
  "policy_version": "policy-quota-v2"
};
