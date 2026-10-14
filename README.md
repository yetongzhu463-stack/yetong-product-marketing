# yetong-product-marketing

按叶童本人四类产品营销内容、五个日常动作及已确认表达偏好，整理多身份产品营销安排、朋友圈文案和逐篇配图。推广私教、新课程、公开课、线上付费课、线下培训或咨询产品时使用；已有方案或草稿从当前阶段继续。不自创营销流程，不把历史稿或参考案例当本次产品事实；文风相似由本人试稿验收。

## 手机使用：豆包、WorkBuddy、Grok Bot

手机用户不需要先在手机终端运行`npx`。本仓库提供完整技能包和可直接发给Agent的安装请求；**能否原生安装，取决于当前平台入口和账号能力，不承诺所有手机Agent都能通装。**

→ [手机分平台教程](mobile/INSTALL.md) · [复制安装请求](mobile/INSTALL-PROMPT.txt) · [下载完整ZIP](https://raw.githubusercontent.com/yetongzhu463-stack/yetong-product-marketing/main/mobile/yetong-product-marketing.zip) · [完整TXT](https://raw.githubusercontent.com/yetongzhu463-stack/yetong-product-marketing/main/mobile/yetong-product-marketing-full.txt)

也可以先把下面这段直接发给Agent：

```text
请安装或原生保存「叶童产品营销」Skill：
https://github.com/yetongzhu463-stack/yetong-product-marketing
先读取 mobile/INSTALL.md 和 mobile/INSTALL-PROMPT.txt，再使用完整ZIP或8区段TXT，不能只读README。
检查你当前手机入口是否支持个人技能持久保存；支持则按原生机制保存，返回实际技能库名称和调用方法。
如果不支持、材料读不全或不能重新加载，明确报告未完成；不要把临时聊天记忆当作安装成功。
```

- **WorkBuddy**：支持手机云端工作，官方手机安装路径使用SkillHub；本Skill暂不上架SkillHub，GitHub直接安装需账号实测。详见[WorkBuddy步骤](mobile/INSTALL.md#workbuddy手机云端入口)。
- **Grok Bot**：按官方对话保存私人技能的方式准备，提供完整载荷；手机账号的保存与重载待实测。详见[Grok Bot步骤](mobile/INSTALL.md#grok-bot保存为私人技能)。
- **豆包**：使用实际开放的工作任务／自定义技能入口；产品体系支持自定义技能，不代表所有手机入口都能导入。详见[豆包步骤](mobile/INSTALL.md#豆包先进入工作任务再检查自定义技能入口)。

“保存进技能库并能在新任务调用”才是安装目标；只上传附件或得到“记住了”的回复不算。三个手机平台尚未完成原生安装实测，官方依据、成功标准和受限处理均写在教程中。

## 电脑端安装

```bash
npx -y skills add yetongzhu463-stack/yetong-product-marketing -g --all
```

## 使用

安装后，可以这样开始：

> 使用 $yetong-product-marketing，沿用我本人四类宣发顺序与频次，从当前阶段继续，区分本人原稿和喜欢的参考稿，按真实资料与已确认规则处理，来源、文风及后续天数不自行补定。

也可以直接提供新产品资料：

> 使用 $yetong-product-marketing。我以什么身份卖什么产品，谁付款、谁使用，他们有哪些困难和顾虑；以下是已确认交付、产品优势、个人优势、价格时间、报名入口及可公开素材。今天只写 3 条产品硬广，每条附图片思路。

已有稿件时，可以只要求修改某一篇、补图片思路或检查，不会自动重做整套方案。产品输入卡位于 `skills/yetong-product-marketing/assets/product-brief.md`；可以口述，不必填表。

## 方法与边界

- 这是叶童已确认的个人营销方法与表达偏好，不自动拥有安装者自己的文风、经历、成绩或客户档案。
- 顺序为产品硬广、选择理由、使用后感受、收款与复购；朋友圈每天 3～4 条，硬广两天。其余三类天数在需要完整排期时由使用者给出，不默认八天。
- 方案说明购买理由、顾虑、证据缺口和四类内容任务；每篇图片思路包含主体、文字、真实素材、说明或证明作用。
- 事实、效果、客户反馈、收款、复购和名额只用本次确认材料；缺证据保留待素材任务，不伪造。
- 不保证销量或训练、经营结果，不自动生成图片或发布内容。正文认可不等于效果或视觉成图已验证。

## 运行依赖

- 支持 Agent Skills 的客户端

Skill 本身是指令与参考资源，不依赖 Python、MCP、API 密钥或付费工具。安装步骤需要 Node.js／npm、Git 及访问 GitHub 的网络条件；实际素材由使用者提供。

GitHub 发布和 `npx` 安装不等于手机原生技能或手机 ChatGPT 插件已安装。手机请先按上方对应平台教程检查入口；本仓库不包含ChatGPT手机插件的打包配置或云端连接。

如需只在临时项目里试用，进入一个空目录后运行（不加 `-g`，不影响全局技能）：

```bash
npx -y skills add yetongzhu463-stack/yetong-product-marketing --all --copy
```

## 内容

本仓库只发布运行和分发这个 Skill 所需的文件。本地评测样本、预期答案和运行记录不包含在公开包中。

`skills/yetong-product-marketing`保留原有9个运行文件，手机ZIP逐文件一致；TXT是8份Markdown完整载荷，没有改写本人方法。分发文件及哈希由`node tools/build-mobile-package.mjs`生成，维护者可用`--check`检查。该脚本只打包，不执行跨端安装；需要Node.js及系统`zip`，使用者无需运行。

私人原稿、客户身份、聊天记录与收款材料不要直接提交到本仓库。Skill 不扫描私人目录；涉及公开客户材料时，应确认使用许可并隐藏非必要个人信息。
