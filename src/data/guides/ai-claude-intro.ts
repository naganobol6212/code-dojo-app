import type { Guide } from "./types";

/**
 * AI / Claude トラックの体系ガイド。
 * 認定試験の案内 (exam-prep-overview) とは別物で、LLM アプリ開発を
 * 「基礎 → エージェント設計 → RAG → Claude Code → 実務 → MCP → セキュリティ → 運用/ガバナンス」
 * の順で体系的に学ぶための参考書。
 */
export const aiClaudeIntroGuide: Guide = {
  id: "ai-claude-intro",
  trackId: "ai-claude",
  title: "AI / Claude の地図 — LLM アプリ開発を体系で学ぶ",
  subtitle:
    "LLM の基礎 → エージェント設計パターン → RAG → Claude Code → 実務ワークフロー → MCP → AI セキュリティ → LLMOps / ガバナンス を 8 章で通読する",
  audience:
    "LLM / エージェントを雰囲気で使っているが、設計原則・落とし穴・運用まで体系立てて理解したい人。Claude Code を実務で使いこなしたい人",
  sources: [
    {
      label: "Anthropic: Building Effective Agents",
      url: "https://www.anthropic.com/research/building-effective-agents",
    },
    {
      label: "Claude Code Docs",
      url: "https://code.claude.com/docs/en/overview",
    },
    {
      label: "Model Context Protocol",
      url: "https://modelcontextprotocol.io/",
    },
    {
      label: "OWASP Top 10 for LLM Applications (2025)",
      url: "https://genai.owasp.org/llm-top-10/",
    },
    {
      label: "NIST AI Risk Management Framework",
      url: "https://www.nist.gov/itl/ai-risk-management-framework",
    },
  ],
  emoji: "🧠",
  relatedCategoryIds: [
    "ai-engineering",
    "claude-code-basics",
    "claude-code-practice",
    "ai-security",
  ],
  chapters: [
    // =======================================================================
    // 1. LLM と Claude の基礎
    // =======================================================================
    {
      id: "llm-foundations",
      title: "1. LLM とコンテキストの基礎 — まず土台を固める",
      intro:
        "トークン・コンテキストウィンドウ・プロンプト設計という共通言語をそろえる。ここを曖昧にすると、後続の RAG やエージェント設計の判断がぶれる。",
      readingMinutes: 8,
      objectives: [
        "トークン / コンテキストウィンドウ / コンパクションの関係を説明できる",
        "構造化出力・few-shot・system プロンプトの役割を区別できる",
        "Augmented LLM (LLM + 検索 + ツール + メモリ) という最小単位を理解する",
      ],
      references: [
        {
          label: "Anthropic: Prompt engineering overview",
          url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        },
      ],
      sections: [
        {
          heading: "1.1 トークンとコンテキストウィンドウ",
          body: "LLM は文章を「トークン」(単語よりやや小さい単位) に分割して処理する。1 回の対話でモデルが同時に見られるトークンの総量が「コンテキストウィンドウ」で、入力 (プロンプト + 履歴 + ツール結果) と出力の合計がこの上限に収まる必要がある。長い会話やツールの大きな出力はすぐにウィンドウを食いつぶすため、何を入れて何を捨てるかという「コンテキスト設計」が品質とコストを左右する。",
          notes: [
            "コンテキストは「大きいほど良い」ではない。無関係な情報が多いと重要箇所が薄まり、追従率が落ちる (lost in the middle)",
            "コストとレイテンシは入力トークン数にほぼ比例する。不要な履歴を持ち回らない",
          ],
        },
        {
          heading: "1.2 コンパクションと文脈使用率の管理",
          body: "Claude Code のようなエージェントは、コンテキストウィンドウが逼迫すると「コンパクション (compaction)」を行う。これは過去のやりとりを要約して圧縮し、空き容量を作る仕組みで、ロッシー (lossy = 細部が失われる) な処理である。実務上は文脈使用率がおよそ 60% を超えたあたりで警戒し、約 83.5% で auto-compaction が発火する、という目安が知られている。重要な決定や仕様は早めにファイル (CLAUDE.md など) へ書き出しておくと、圧縮で消えても復元できる。",
          code: `状態          挙動
~0-60%        通常。問題なし
~60%超        警戒。重要事項はファイルに退避しておく
~83.5%        auto-compaction 発火 (要約圧縮・ロッシー)
100%          ここに達する前に圧縮が挟まる`,
          language: "text",
          notes: [
            "「圧縮されたら困る情報」はコンテキストではなくファイルに置く、が鉄則",
            "長時間タスクは適宜セッションを分割し、要点を CLAUDE.md / メモに残す",
          ],
        },
        {
          heading: "1.3 プロンプト設計の基本と Augmented LLM",
          body: "良い出力は良いプロンプトから生まれる。基本の道具は (a) system プロンプトで役割と制約を固定する、(b) few-shot で「入出力の例」を見せる、(c) 構造化出力 (JSON Schema 等) で機械処理しやすい形を強制する、の 3 つ。さらに Anthropic はエージェントの最小単位を「Augmented LLM」= LLM 本体に検索 (retrieval)・ツール (tools)・メモリ (memory) を足したもの、と定義する。後続の章で扱う Workflow も Agent も、この Augmented LLM を組み合わせて作る。",
          code: `# Augmented LLM = エージェントの最小単位
LLM
 ├─ retrieval  : 必要な知識を外部から引いてくる (→ 3 章 RAG)
 ├─ tools      : 外部システムを操作する (→ 6 章 MCP)
 └─ memory     : 過去の文脈を保持する (→ 1.2 コンパクション)`,
          language: "text",
          notes: [
            "まず「プロンプトだけで解けないか」を試す。ツールやエージェント化はその後",
            "出力を下流で実行/レンダリングするなら、構造化出力 + 検証が安全 (→ 7 章セキュリティ)",
          ],
        },
      ],
      keyTakeaways: [
        "入力 + 出力がコンテキストウィンドウに収まる。大きさより「適切な中身」が重要",
        "コンパクションはロッシー。消えて困る情報はファイルへ退避する (~60% 警戒 / ~83.5% 発火)",
        "エージェントの最小単位は Augmented LLM (LLM + 検索 + ツール + メモリ)",
      ],
      comprehensionQuestionIds: ["ccb-001", "ccb-003", "ccp-020"],
    },

    // =======================================================================
    // 2. エージェント設計パターン
    // =======================================================================
    {
      id: "agent-patterns",
      title: "2. エージェント設計パターン — Workflow と Agent の使い分け",
      intro:
        "Anthropic『Building Effective Agents』の核心。多くの実用ケースは予測可能な Workflow で十分で、自律的な Agent は本当に必要なときだけ使う。",
      readingMinutes: 10,
      objectives: [
        "Workflow と Agent の本質的な違い (制御フローを誰が決めるか) を説明できる",
        "5 つの Workflow パターンを状況に応じて選べる",
        "ReAct / Plan-and-Execute の違いと向き不向きを理解する",
      ],
      references: [
        {
          label: "Anthropic: Building Effective Agents",
          url: "https://www.anthropic.com/research/building-effective-agents",
        },
      ],
      sections: [
        {
          heading: "2.1 Workflow と Agent の違い",
          body: "Anthropic は両者を明確に分ける。Workflow は「人間が書いた事前定義のコードパスを LLM とツールが辿る」予測可能な構成。Agent は「LLM 自身がプロセス (次にどのツールを使い、いつ止めるか) を動的に決める」自律的な構成。本質的な違いはモダリティやベンダーではなく、制御フローを誰が決めるかにある。Workflow はコスト・レイテンシが見積もりやすく本番運用しやすい。Agent はタスクの分解数が事前に読めないときに有効だが、ループや自律判断で失敗時のコストが大きい。「まず Workflow、足りなければ Agent」が原則。",
          diagram: `flowchart LR
  subgraph Workflow["Workflow (予測可能)"]
    direction LR
    W1[Step1] --> W2[Step2] --> W3[Step3]
  end
  subgraph Agent["Agent (自律的)"]
    direction LR
    L[LLM] -->|次の手を決める| T[ツール実行]
    T -->|結果を観察| L
    L -->|完了と判断| E((終了))
  end`,
          diagramCaption: "Workflow はコードが、Agent は LLM がフローを決める",
        },
        {
          heading: "2.2 5 つの Workflow パターン",
          body: "Anthropic は Workflow を 5 パターンに整理する。(1) Prompt Chaining = タスクを直列のサブステップに分け、前段の出力を後段の入力にする (途中に検証 gate を挟める)。(2) Routing = 分類器で入力を専門ハンドラへ振り分ける。(3) Parallelization = 並列処理。独立したサブタスクを同時に走らせる Sectioning と、同じ入力を複数回処理して多数決する Voting がある。(4) Orchestrator-Workers = オーケストレータが動的にサブタスクを分解し、ワーカーに割り振る (分解数が事前に読めないとき)。(5) Evaluator-Optimizer = 生成と評価をループさせ、評価者のフィードバックで生成を改善する。",
          code: `パターン              いつ使うか
Prompt Chaining       タスクが明確な直列ステップに割れるとき
Routing               入力の種類ごとに最適な処理が違うとき
Parallelization       独立サブタスクの同時実行 / 信頼性向上 (多数決)
Orchestrator-Workers  サブタスク数が事前に読めないとき
Evaluator-Optimizer   明確な評価基準があり、反復で質が上がるとき`,
          language: "text",
          notes: [
            "Sectioning は依存のない並列分割、Voting は同じ入力を複数プロンプトで処理し多数決",
            "Orchestrator-Workers と Parallelization の違いは「分解が静的か動的か」",
          ],
        },
        {
          heading: "2.3 ReAct と Plan-and-Execute",
          body: "Agent 寄りの代表パターン。ReAct は Thought (思考) → Action (ツール実行) → Observation (結果観察) のループを繰り返し、各ステップで次の手を考える。柔軟だがステップごとに LLM 呼び出しが入りトークンを食う。Plan-and-Execute はまず全体計画を立て、その後は計画に沿って実行するため、長く手順が読めるタスクで効率的 (毎ステップ考え直さない)。探索的で先が読めないタスクは ReAct、手順が概ね決まっているタスクは Plan-and-Execute が向く。",
          code: `# ReAct ループ
Thought:     ユーザーは A 市の天気を知りたい
Action:      weather_api(city="A")
Observation: 晴れ, 22℃
Thought:     これで回答できる
Answer:      A 市は晴れ、気温 22℃ です

# Plan-and-Execute
Plan:    [1] 天気取得 [2] 服装提案 [3] 整形
Execute: 計画に沿って 1→2→3 を実行 (途中で再計画は最小限)`,
          language: "text",
          notes: [
            "Reflection (自己批評して再生成) を挟むと品質が上がるが、コストとレイテンシは増える",
            "自律ループには必ず停止条件 (最大反復数・コスト上限) を設ける",
          ],
        },
      ],
      keyTakeaways: [
        "Workflow = コードが制御、Agent = LLM が制御。まず Workflow を検討する",
        "5 パターン (Chaining / Routing / Parallelization / Orchestrator-Workers / Evaluator-Optimizer) を状況で選ぶ",
        "ReAct は柔軟・高コスト、Plan-and-Execute は手順が読めるタスクで効率的",
      ],
      comprehensionQuestionIds: [
        "ai-eng-001",
        "ai-eng-002",
        "ai-eng-003",
        "ai-eng-004",
        "ai-eng-005",
        "ai-eng-007",
        "ai-eng-008",
      ],
    },

    // =======================================================================
    // 3. RAG
    // =======================================================================
    {
      id: "rag-fundamentals",
      title: "3. RAG — 外部知識で LLM を補強する",
      intro:
        "Retrieval-Augmented Generation。モデルが学習していない最新・社内知識を、検索で引いてプロンプトに足してから答えさせる。チャンク設計と検索精度が品質の鍵。",
      readingMinutes: 9,
      objectives: [
        "RAG の基本フロー (チャンク化 → 埋め込み → 検索 → 生成) を説明できる",
        "チャンクサイズ / ハイブリッド検索 / 再ランキングの役割を理解する",
        "RAG の評価指標 (Faithfulness など) の意味を区別できる",
      ],
      references: [
        {
          label: "Anthropic: Contextual Retrieval",
          url: "https://www.anthropic.com/news/contextual-retrieval",
        },
      ],
      sections: [
        {
          heading: "3.1 RAG の基本フロー",
          body: "RAG は大きく「事前準備 (インデックス構築)」と「実行時 (検索 + 生成)」に分かれる。事前準備では文書をチャンク (小さな断片) に分割し、各チャンクを埋め込みモデルでベクトル化してベクトル DB に保存する。実行時はユーザーの質問もベクトル化し、近いチャンクを検索して取得し、それらをプロンプトに添えて LLM に答えさせる。これにより「学習に含まれない知識」でも、検索で引ければ正確に答えられる。",
          code: `# 事前準備 (インデックス構築)
文書 → チャンク分割 → 埋め込み (ベクトル化) → ベクトル DB へ保存

# 実行時 (検索 + 生成)
質問 → 埋め込み → 類似チャンク検索 (top-k) → プロンプトに添付 → LLM が回答`,
          language: "text",
          notes: [
            "ベクトル DB の例: pgvector / Pinecone / Weaviate / Qdrant / Chroma など",
            "リレーショナル DB やキャッシュ (Redis) はベクトル DB ではない (混同に注意)",
          ],
        },
        {
          heading: "3.2 チャンク設計・ハイブリッド検索・再ランキング",
          body: "検索精度を決める 3 要素。チャンクは大きすぎるとノイズが増え、小さすぎると文脈が切れる (典型的な失敗)。ハイブリッド検索は dense (意味の近さ = 埋め込み) と sparse (語の一致 = BM25 等キーワード) を組み合わせ、両者の弱点を補う。Re-ranker (再ランキング) は、検索で広めに取った候補を、より精度の高いモデルで並べ替えて上位だけ残す段で、本番品質には事実上必須。",
          code: `質問
  │  ① 一次検索 (広めに top-50 を取る)
  ├──────────────┬──────────────┐
 dense (意味)   sparse (語一致)   ← ハイブリッド
  └──────┬───────┘
         │  ② Re-ranker で並べ替え
         ▼
   上位 top-5 だけを LLM へ渡す`,
          language: "text",
          notes: [
            "チャンクは「意味のまとまり」で切る (見出し単位など)。固定文字数で機械的に切ると文脈が壊れやすい",
            "Adaptive RAG は質問の難易度に応じて検索戦略を変え、単純な質問では検索を省くなど効率が上がる",
          ],
        },
        {
          heading: "3.3 RAG の評価 (RAGAs)",
          body: "RAG は「検索」と「生成」の二段なので、どちらが悪いかを切り分けて評価する。代表的なフレームワークが RAGAs。Faithfulness は「回答が取得したコンテキストに忠実か (幻覚していないか)」を測る生成側の指標。Context Recall は「正解に必要な情報を検索が取りこぼしていないか」を測る検索側の指標で、評価に正解 (ground truth) が要る。Faithfulness が低ければ生成 (プロンプト) を、Context Recall が低ければ検索 (チャンク/インデックス) を疑う。",
          notes: [
            "幻覚率の監視は「回答 vs 取得コンテキスト」の整合 (Faithfulness) を継続計測するのが有効",
            "検索が悪いのか生成が悪いのかを分けないと、改善が空回りする",
          ],
        },
      ],
      keyTakeaways: [
        "RAG = チャンク化 → 埋め込み → 検索 → プロンプト添付 → 生成",
        "ハイブリッド検索 (dense + sparse) + 再ランキングで精度が大きく上がる",
        "評価は二段で切り分け: Faithfulness (生成) と Context Recall (検索)",
      ],
      comprehensionQuestionIds: [
        "ai-eng-009",
        "ai-eng-010",
        "ai-eng-011",
        "ai-eng-012",
        "ai-eng-014",
        "ai-eng-016",
      ],
    },

    // =======================================================================
    // 4. Claude Code 基礎
    // =======================================================================
    {
      id: "claude-code-basics",
      title: "4. Claude Code 基礎 — ハーネスとカスタマイズ機構",
      intro:
        "Claude Code はターミナルで動くエージェント。ループの仕組みと、CLAUDE.md / Hooks / Skills / Subagents というカスタマイズの 4 本柱を押さえる。",
      readingMinutes: 11,
      objectives: [
        "ハーネスの 3 フェーズループと CLAUDE.md のスコープ/読み込み順を説明できる",
        "Hooks のイベントとタイムアウト、ブロックの仕組みを理解する",
        "Skills と Subagents の役割を区別し、使い分けられる",
      ],
      references: [
        {
          label: "Claude Code: Memory (CLAUDE.md)",
          url: "https://code.claude.com/docs/en/memory",
        },
        {
          label: "Claude Code: Hooks",
          url: "https://code.claude.com/docs/en/hooks",
        },
      ],
      sections: [
        {
          heading: "4.1 ハーネスと CLAUDE.md",
          body: "Claude Code の「ハーネス」は 1 ターンを コンテキスト収集 (gather context) → 行動 (take action) → 検証 (verify work) のループで回す。ここに永続的な指示を与えるのが CLAUDE.md (Memory)。スコープは 4 つあり、広い → 狭い の順で Managed policy → User (~/.claude/CLAUDE.md) → Project (./CLAUDE.md) → Local (./CLAUDE.local.md) と読み込まれる。重要なのは上書きではなく「連結 (concatenate)」される点で、組織方針・個人の好み・チーム共通ルールを両立できる。公式の目安は 200 行未満で、長いほど追従率が下がるため、肥大化したら @path/to/file の import 構文で分割する。",
          code: `# 読み込み順 (広い → 狭い、内容は連結される)
Managed policy        組織が配る固定ポリシー
  → User              ~/.claude/CLAUDE.md  (個人の全プロジェクト共通)
    → Project         ./CLAUDE.md          (リポジトリ共有・コミットする)
      → Local         ./CLAUDE.local.md    (gitignore 推奨の個人メモ)

# 長くなったら分割
@docs/style.md
@docs/testing.md`,
          language: "text",
          notes: [
            "Project (./CLAUDE.md) はチームで共有する規約置き場。コミットして全員に効かせる",
            "200 行未満が目安。詳細は別ファイルに切り出して @ で import",
          ],
        },
        {
          heading: "4.2 Hooks — 決定論的に介入する",
          body: "Hooks は特定イベントでシェルコマンドを実行する仕組み。「ツール実行直前にチェックを挟む」「保存時に自動フォーマット」などを、LLM の判断に頼らず決定論的に強制できる。代表イベントは PreToolUse (ツール実行前・ブロック可能) / PostToolUse / UserPromptSubmit / Stop など。matcher でどのツールに反応するかを指定する。タイムアウトは command / http / mcp_tool 型が 600 秒、prompt 型と UserPromptSubmit が 30 秒、agent 型が 60 秒。exit code が 0 以外 (特に 2) のときにブロック/フィードバックとして扱われる。",
          code: `// .claude/settings.json (PreToolUse で Bash と Edit をチェック)
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash|Edit",
        "hooks": [
          { "type": "command", "command": "./scripts/guard.sh" }
        ]
      }
    ]
  }
}`,
          language: "json",
          notes: [
            "matcher の Bash|Edit のように | で複数ツールを指定できる",
            "「毎回 X して」という自動化は memory ではなく Hooks で実現する (ハーネスが実行するため)",
          ],
        },
        {
          heading: "4.3 Skills と Subagents",
          body: "Skills は「特定の手順・知識をまとめた再利用パッケージ」。.claude/skills/<name>/SKILL.md に frontmatter (name / description) + 本文で定義し、説明文 (description) にマッチしたときモデルが自動で呼ぶ。Subagents は「別のコンテキストを持つ補助エージェント」。重い調査や独立した並列作業を任せ、メインの文脈を汚さずに結果だけ受け取れるのが最大のメリット。ビルトインの Explore は読み取り専用でコード探索に特化する。両者は補完関係: Skills = 手順/知識の注入、Subagents = 文脈の分離と並列化。",
          code: `# Skill の構造
.claude/skills/release/SKILL.md
---
name: release
description: 新しいリリースを作る (タグ付けと CHANGELOG 更新)
---
## 手順
1. ...

# Subagent: 重い調査を分離 (メイン文脈を汚さない)
「コードベース全体から X の使用箇所を Explore で洗い出して」`,
          language: "text",
          notes: [
            "勝手に呼ばれたくない Skill は description を絞る、または明示起動のみにする",
            "Subagent は結果の要約だけを返すので、大量の検索結果でメイン文脈を圧迫しない",
          ],
        },
      ],
      keyTakeaways: [
        "ハーネス = 収集 → 行動 → 検証。CLAUDE.md は 4 スコープを連結 (200 行未満が目安)",
        "Hooks はイベント駆動の決定論的介入。PreToolUse はブロック可能、タイムアウトは型で異なる",
        "Skills = 手順/知識の再利用、Subagents = 文脈分離と並列化",
      ],
      comprehensionQuestionIds: [
        "ccb-005",
        "ccb-007",
        "ccb-010",
        "ccb-012",
        "ccb-015",
        "ccb-019",
        "ccb-020",
      ],
    },

    // =======================================================================
    // 5. Claude Code 実務活用
    // =======================================================================
    {
      id: "claude-code-practice",
      title: "5. Claude Code 実務活用 — ワークフローと落とし穴",
      intro:
        "基礎機構を実務でどう組むか。Plan ファースト / 並列セッション / レビュー運用 / コンテキスト管理を押さえ、典型的な落とし穴を避ける。",
      readingMinutes: 10,
      objectives: [
        "推奨される基本ワークフロー (Explore → Plan → Code → Commit) を説明できる",
        "Output Style と権限承認の省力化の仕組みを理解する",
        "CLAUDE.md / コンテキスト管理の典型的な落とし穴を避けられる",
      ],
      references: [
        {
          label: "Claude Code: Common workflows",
          url: "https://code.claude.com/docs/en/common-workflows",
        },
      ],
      sections: [
        {
          heading: "5.1 基本ワークフローと Output Style",
          body: "公式が推奨する基本形は「まず調べる → 計画する → 実装する → コミットする」。いきなり実装させず、Plan モードで方針を固めてから着手すると手戻りが減る。Output Style は応答の振る舞いを切り替える設定で、組み込みは 4 種類: Default / Proactive (即実行寄り) / Explanatory (学習向けに解説を足す) / Learning (TODO(human) を挟んで人に書かせる)。変更は次のターンから反映される。",
          code: `# 推奨ワークフロー
Explore (調査) → Plan (計画) → Code (実装) → Commit (コミット)

# Output Style (組み込み 4 種)
Default      標準
Proactive    即実行寄り
Explanatory  要所で Insights 解説を足す (学習向け)
Learning     TODO(human) を挟み、人に手を動かさせる`,
          language: "text",
          notes: [
            "大きめのタスクほど Plan を挟む価値が高い。計画を承認してから実装に入る",
            "探索が広いときは Subagent (Explore) に投げてメイン文脈を温存する",
          ],
        },
        {
          heading: "5.2 権限承認の省力化と自動化の組み合わせ",
          body: "頻繁に使う安全なコマンドを毎回承認するのは非効率。settings の permission allow にルールを足して、定型コマンドを自動許可するのが推奨。さらに CLAUDE.md (規約) + Hooks (決定論的強制) + Skills (手順) + Commands (定型操作) を組み合わせると、「毎回同じ前置きを書く」手間を仕組み化できる。目的は属人的な口頭指示を、再現性のある自動化に置き換えること。",
          code: `// .claude/settings.json — 安全な定型コマンドを自動許可
{
  "permissions": {
    "allow": ["Bash(npm run test:*)", "Bash(git status)"]
  }
}`,
          language: "json",
          notes: [
            "allow は広げすぎない。破壊的コマンド (rm -rf, push --force 等) は自動許可しない",
            "「いつも X して」は memory に書いても実行されない。自動実行は Hooks の領分",
          ],
        },
        {
          heading: "5.3 レビュー運用と典型的な落とし穴",
          body: "コードレビューを任せるなら、差分を絞り、観点 (セキュリティ・パフォーマンス等) を明示すると質が上がる。組み込みの /code-review は現在の差分をレビューし、/security-review はセキュリティ観点に絞る。典型的な落とし穴: (1) CLAUDE.md を盛りすぎて追従率が落ちる、(2) 長い会話を引きずってコンパクションで重要な決定が消える、(3) 一度に大きすぎるタスクを丸投げして検証不能になる。いずれも「小さく区切り、要点をファイルに残す」で回避できる。",
          notes: [
            "レビューは「変更点だけ」に絞ると指摘が的確になる",
            "重要な設計判断は会話に置かず CLAUDE.md / PR 説明に書き出す",
          ],
        },
      ],
      keyTakeaways: [
        "基本は Explore → Plan → Code → Commit。大きいタスクほど Plan を挟む",
        "定型コマンドは permission allow で省力化、自動実行は Hooks で仕組み化",
        "落とし穴は「CLAUDE.md の肥大化」「文脈の引きずり」「丸投げ」— 小さく区切る",
      ],
      comprehensionQuestionIds: [
        "ccp-010",
        "ccp-019",
        "ccp-021",
        "ccp-022",
        "ccp-023",
        "ccp-025",
      ],
    },

    // =======================================================================
    // 6. MCP
    // =======================================================================
    {
      id: "mcp",
      title: "6. MCP — ツールを安全につなぐ標準プロトコル",
      intro:
        "Model Context Protocol。LLM と外部ツール/データを接続する共通規格。transport・スコープ・出力制御・セキュリティを理解する。",
      readingMinutes: 8,
      objectives: [
        "MCP の役割と推奨 transport / スコープを説明できる",
        "出力サイズ制御 (MAX_MCP_OUTPUT_TOKENS) と Tool Search の意義を理解する",
        "MCP 導入のセキュリティ的性質 (任意コード実行に近い) を認識する",
      ],
      references: [
        {
          label: "Model Context Protocol",
          url: "https://modelcontextprotocol.io/",
        },
        {
          label: "Claude Code: MCP",
          url: "https://code.claude.com/docs/en/mcp",
        },
      ],
      sections: [
        {
          heading: "6.1 MCP とは / transport とスコープ",
          body: "MCP は「LLM クライアントと、ツール/データを提供するサーバー」をつなぐ標準プロトコル。各社バラバラだった接続方法を共通化し、同じサーバーを複数のクライアントで使い回せる。transport は現在 http (streamable-http のエイリアス) が推奨。sse は deprecated、stdio はローカル用途では現役だが新規は http。サーバーのスコープは Local (自分だけ) / Project (リポジトリにコミットしてチーム共有) / User (全プロジェクト) の 3 つ。チームで共有したいなら Project スコープを使う。",
          code: `# transport
http     ← 推奨 (streamable-http のエイリアス)
sse      deprecated
stdio    ローカル用途では現役 (新規推奨ではない)

# スコープ
Local    自分のこのマシンだけ
Project  リポジトリにコミットしてチームで共有  ← 共有はこれ
User     自分の全プロジェクト`,
          language: "text",
        },
        {
          heading: "6.2 出力制御と Tool Search",
          body: "MCP サーバーのツール結果は大きくなりがちで、コンテキストを圧迫する。これを抑えるのが環境変数 MAX_MCP_OUTPUT_TOKENS で、デフォルトは 25,000。大量のツールを登録するとツール定義だけで文脈を食うため、Tool Search で「必要なときに必要なツールの定義だけを取り込む」遅延ロードの仕組みが用意されている。多数の MCP サーバーをつなぐ環境ほど、これらの制御が効いてくる。",
          notes: [
            "ツール結果が切れるときは MAX_MCP_OUTPUT_TOKENS を見直す",
            "ツールが多すぎると選択精度が落ちる。Tool Search で定義を遅延ロードする",
          ],
        },
        {
          heading: "6.3 MCP のセキュリティ的性質",
          body: "MCP サーバーのインストールは、性質として「任意コードを実行する依存パッケージの追加」に近い。サーバーは外部システムへアクセスし、ツールとしてあなたの環境で動く。出所不明のサーバーは、悪意あるツールや indirect prompt injection (7 章) の入口になりうる。仕様もすべてのセキュリティを保証するわけではなく、認可・スコープ制限・人による確認は利用側の責任。信頼できる発行元か、権限は最小か、を必ず確認する。",
          notes: [
            "「便利そう」で出所不明の MCP サーバーを入れない (npm の怪しいパッケージと同じ警戒を)",
            "MCP は Lethal Trifecta (7 章) の「ツール/外部通信」を一気に増やしうる — 権限は最小に",
          ],
        },
      ],
      keyTakeaways: [
        "MCP は LLM と外部ツールをつなぐ標準。推奨 transport は http、共有は Project スコープ",
        "MAX_MCP_OUTPUT_TOKENS (既定 25,000) と Tool Search で文脈圧迫を抑える",
        "サーバー導入は任意コード実行に近い。出所と権限を必ず確認する",
      ],
      comprehensionQuestionIds: [
        "ccb-023",
        "ccb-024",
        "ccb-025",
        "ccb-026",
        "aisec-027",
        "aisec-028",
      ],
    },

    // =======================================================================
    // 7. AI セキュリティ
    // =======================================================================
    {
      id: "ai-security",
      title: "7. AI セキュリティ — Prompt Injection と Lethal Trifecta",
      intro:
        "LLM 固有のリスクを体系で。OWASP LLM Top 10 (2025) を地図に、最重要のプロンプトインジェクションと、エージェントが危険になる条件を理解する。",
      readingMinutes: 11,
      objectives: [
        "OWASP LLM Top 10 (2025) の主要項目と 2025 版の新規追加を把握する",
        "Direct / Indirect プロンプトインジェクションの違いと、完全防御が無いことを理解する",
        "Lethal Trifecta / Agents Rule of Two で「危険な構成」を判定できる",
      ],
      references: [
        {
          label: "OWASP Top 10 for LLM Applications (2025)",
          url: "https://genai.owasp.org/llm-top-10/",
        },
        {
          label: "Simon Willison: The lethal trifecta",
          url: "https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/",
        },
      ],
      sections: [
        {
          heading: "7.1 OWASP LLM Top 10 (2025) の地図",
          body: "LLM アプリのリスクを整理した事実上の標準。最上位 LLM01 が Prompt Injection。続いて LLM02 Sensitive Information Disclosure (PII・認証情報・system prompt の漏洩)、LLM05 Improper Output Handling (出力を信頼して下流で実行し XSS/SSRF/SQLi/RCE)、LLM06 Excessive Agency (過剰な権限・機能・自律性) などが並ぶ。2025 版では System Prompt Leakage (LLM07) と Vector and Embedding Weaknesses (RAG 特有のリスク) が新規追加された。「system prompt に秘密を置けば隠せる」は誤りで、漏洩前提で設計する。",
          code: `# OWASP LLM Top 10 (2025) 抜粋
LLM01 Prompt Injection            最重要・直接/間接
LLM02 Sensitive Info Disclosure   PII / 認証情報 / system prompt の漏洩
LLM05 Improper Output Handling    出力を信頼 → XSS/SSRF/SQLi/RCE
LLM06 Excessive Agency            過剰な権限・機能・自律性
LLM07 System Prompt Leakage       (NEW) system prompt は隠せない前提で
       Vector & Embedding Weak.   (NEW) RAG / vector store 特有`,
          language: "text",
          notes: [
            "Excessive Agency のサブタイプ: 過剰な機能 / 過剰な権限 / 過剰な自律性",
            "Embedding は「安全な一方向ハッシュ」ではない。inversion で元の PII を復元されうる",
          ],
        },
        {
          heading: "7.2 プロンプトインジェクション",
          body: "最重要リスク。Direct injection はユーザーが直接「これまでの指示を無視して…」と入力して制御を奪う。Indirect injection は、LLM が読み込む外部データ (Web ページ・メール・取得文書・ツール結果) に攻撃指示を仕込み、間接的に乗っ取る。2026 年時点でも「これさえ入れれば完全に防げる単一の技術」は存在しない。緩和は多層で行う: 入力/出力のフィルタ、権限の最小化、人による確認 (HITL)、そして Simon Willison の Dual-LLM パターン (信頼できない入力を扱う LLM と、特権操作を行う LLM を分離する) など。Claude Code の auto モードのように、ツール使用を classifier が都度ゲートする設計は indirect injection に比較的耐性がある。",
          notes: [
            "「外部から来たテキストは信用しない」が原則。取得文書やツール結果も攻撃ベクトル",
            "完全防御は無い前提で、被害を限定する設計 (最小権限・HITL) を重ねる",
          ],
        },
        {
          heading: "7.3 Lethal Trifecta と Agents Rule of Two",
          body: "エージェントが「情報を盗まれる」構成を見抜く道具。Simon Willison の Lethal Trifecta は、次の 3 つが同時にそろうと exfiltration (情報持ち出し) 攻撃に対して致命的に脆弱になる、というもの: (1) 機密データへのアクセス、(2) 信頼できないコンテンツへの暴露、(3) 外部へ通信する手段。Meta の Agents Rule of Two はこれを設計指針にしたもので、1 セッションで [A] 信頼できない入力を処理、[B] 機密システム/データにアクセス、[C] 状態変更や外部通信、の 3 つのうち同時に満たすのは最大 2 つまでにし、3 つ必要なら人間の承認を挟む。MCP の組み合わせで 3 条件が一気にそろうことがあるので注意。",
          diagram: `flowchart TB
  A[① 機密データへのアクセス]
  B[② 信頼できないコンテンツへの暴露]
  C[③ 外部へ通信する手段]
  A --- D{3 つ同時?}
  B --- D
  C --- D
  D -->|Yes| X[Lethal Trifecta<br/>exfiltration に致命的に脆弱]
  D -->|2 つ以下| S[相対的に安全<br/>Rule of Two]`,
          diagramCaption: "3 条件が同時にそろうと危険。1 つ外す or 人の承認を挟む",
          notes: [
            "実例: GitHub MCP の悪用や EchoLeak など、3 条件が成立すると実害が出ている",
            "1 つでも条件を外す (外部通信を止める / 信頼できない入力を遮断する) と一気に安全側へ倒れる",
          ],
        },
      ],
      keyTakeaways: [
        "OWASP LLM Top 10 (2025) を地図に。LLM01 Prompt Injection が最重要、System Prompt Leakage 等が新規追加",
        "インジェクションに完全防御は無い。多層緩和 (最小権限・HITL・Dual-LLM) で被害を限定",
        "Lethal Trifecta (機密 + 信頼できない入力 + 外部通信) の同時成立を避ける = Rule of Two",
      ],
      comprehensionQuestionIds: [
        "aisec-001",
        "aisec-002",
        "aisec-003",
        "aisec-013",
        "aisec-014",
        "aisec-018",
        "aisec-019",
      ],
    },

    // =======================================================================
    // 8. LLMOps とガバナンス
    // =======================================================================
    {
      id: "llmops-governance",
      title: "8. LLMOps とガバナンス — 本番運用と規制",
      intro:
        "作って終わりではない。監視・評価・プロンプト管理という LLMOps と、NIST AI RMF / ISO 42001 / EU AI Act というガバナンスの地図を持つ。",
      readingMinutes: 10,
      objectives: [
        "LLMOps が MLOps と異なる点 (出力の非決定性・プロンプト管理) を説明できる",
        "本番監視で見る指標 (P95 latency・幻覚率) を理解する",
        "NIST AI RMF / ISO 42001 / EU AI Act の役割分担を区別できる",
      ],
      references: [
        {
          label: "NIST AI Risk Management Framework",
          url: "https://www.nist.gov/itl/ai-risk-management-framework",
        },
        {
          label: "EU AI Act",
          url: "https://artificialintelligenceact.eu/",
        },
      ],
      sections: [
        {
          heading: "8.1 LLMOps — 監視とプロンプト管理",
          body: "LLMOps は MLOps の延長だが、出力が非決定的で「正解が一意でない」点が大きく違う。同じ入力でも応答が揺れるため、評価は単純な精度だけでなく品質指標 (Faithfulness・有害性・形式遵守) を継続計測する。本番監視では平均だけでなく P95 latency (95 パーセンタイル) を見る — 平均は速くても一部ユーザーが極端に遅いと体験が壊れるため。プロンプトはコードとは別にバージョン管理すると、モデル更新や文言変更の影響を切り分けやすく、ロールバックも容易になる。",
          notes: [
            "幻覚率の上昇は「回答 vs 取得コンテキスト」の整合 (Faithfulness) 監視で早期に気づける",
            "LiteLLM のようなプロキシは、複数プロバイダの API を統一インターフェースで扱える",
          ],
        },
        {
          heading: "8.2 ガバナンスの 3 本柱",
          body: "性格の違う 3 つを混同しない。NIST AI RMF 1.0 は「実務フレームワーク」で、コア機能は GOVERN / MAP / MEASURE / MANAGE の 4 つ (米国・任意)。ISO/IEC 42001:2023 は「AI マネジメントシステムの国際規格」で、認証を取得できる (組織の仕組みづくり)。EU AI Act は「法的拘束力のある規制」で、リスクを 4 階層 (許容不可 / 高 / 限定 / 最小) に分け、高リスクには厳しい義務を課す。汎用 AI モデル (GPAI) は訓練計算量 10^25 FLOPs 超でシステミックリスクと見なされ追加義務が生じる。Model Cards (2018) はモデルの用途・性能・限界・バイアスを文書化する透明性の実践。",
          code: `枠組み           性格            ポイント
NIST AI RMF      実務 FW (任意)   GOVERN / MAP / MEASURE / MANAGE
ISO/IEC 42001    国際規格 (認証可) AI マネジメントシステムの仕組み
EU AI Act        法規制 (拘束力)  リスク 4 階層 / GPAI 10^25 FLOPs
Model Cards      文書化の実践     用途・性能・限界・バイアスの開示`,
          language: "text",
          notes: [
            "EU 市場に高リスク AI を出すなら: EU AI Act (法令遵守) が必須、NIST/ISO は実務の土台、Model Cards は透明性",
            "リスク 4 階層は 許容不可 (禁止) > 高リスク (厳格義務) > 限定リスク (透明性義務) > 最小リスク",
          ],
        },
        {
          heading: "8.3 LLM 特有の技術的負債",
          body: "従来のソフトウェア負債に加え、LLM システムには固有の負債がたまる。プロンプトの暗黙知化 (なぜこの文言かが誰も分からない)、評価データの陳腐化 (現実とずれたまま放置)、モデル/プロンプトの密結合 (どちらを変えても影響範囲が読めない) など。対策は、プロンプトをバージョン管理して変更履歴と意図を残す、評価セットを定期的に更新する、プロンプトとアプリコードを疎結合に保つこと。「動いているから触らない」が最も危険で、モデル更新で静かに品質が劣化する。",
          notes: [
            "プロンプトの別管理は「モデル更新 vs 文言変更」の影響切り分けに効く",
            "評価セットを固定したまま放置すると、現実とのズレに気づけない",
          ],
        },
      ],
      keyTakeaways: [
        "LLMOps の肝は非決定的出力の継続評価とプロンプトのバージョン管理。監視は P95 latency と幻覚率",
        "NIST AI RMF (実務 FW) / ISO 42001 (認証規格) / EU AI Act (法規制) は性格が違う — 混同しない",
        "EU AI Act はリスク 4 階層、GPAI は 10^25 FLOPs 超でシステミックリスク扱い",
      ],
      comprehensionQuestionIds: [
        "ai-eng-017",
        "ai-eng-018",
        "ai-eng-022",
        "ai-eng-024",
        "ai-eng-025",
        "ai-eng-026",
        "ai-eng-028",
        "ai-eng-029",
      ],
    },
  ],
};
