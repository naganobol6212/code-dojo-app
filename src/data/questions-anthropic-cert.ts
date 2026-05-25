import type { Question } from "@/lib/types";

/**
 * Anthropic Claude Certified Architect — Foundations (CCA-F) 試験対策
 * 2026 年 3 月 12 日リリース、Claude Partner Network と同時公開。
 * 全 30 問: 試験ロジ 8 / ドメイン構成 10 / Anthropic Academy 6 / 推奨対策 6。
 */
export const anthropicCertQuestions: Question[] = [
  // ===========================================================================
  // 試験ロジスティクス (acc-001 〜 acc-008)
  // ===========================================================================
  {
    id: "acc-001",
    categoryId: "anthropic-cert",
    difficulty: "beginner",
    type: "choice",
    question:
      "CCA-F (Claude Certified Architect — Foundations) 試験の合格に必要なスコアは？ スコアスケールは 100〜1,000。",
    choices: ["720", "650", "800", "900"],
    answerIndex: 0,
    choiceExplanations: [
      "正解。100〜1,000 のスケーリング方式で、合格ラインは 720 (約 72%)。",
      "不正解。650 は合格ラインに届かない。",
      "不正解。800 は合格ラインを超えるが、最低基準は 720。",
      "不正解。900 は要求水準より高すぎる。",
    ],
    hints: [
      "合格率は概ね 72% 程度に設定されている。",
      "スコアは 100〜1,000 のスケーリング方式。",
      "ドメインごとに重みが付くため、配点が高いドメインを落とすと不利。",
    ],
    explanation: {
      summary:
        "CCA-F の合格ラインは 100〜1,000 のスケーリングスコアで 720 (約 72%)。ドメイン加重スコアリングのため、重み 27% の Agentic Architecture を落とすと挽回しづらい。",
      reason:
        "60 問の選択式を 120 分で解くが、単純な正答数ではなくドメイン重み付きで採点される。Agentic 27%、Claude Code 20%、Prompt Engineering 20%、MCP 18%、Context 15% の比率で得点が積み上がるため、配点の高い領域を優先的に固めるのが王道。",
      references: [
        {
          label: "Claude Partner Network 発表",
          url: "https://www.anthropic.com/news/claude-partner-network",
        },
        {
          label: "CCA-F アクセスリクエスト",
          url: "https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request",
        },
      ],
    },
  },
  {
    id: "acc-002",
    categoryId: "anthropic-cert",
    difficulty: "beginner",
    type: "choice",
    question: "CCA-F 試験の制限時間と問題数の組み合わせとして正しいのは？",
    choices: [
      "120 分 / 60 問 (シナリオベース選択式)",
      "90 分 / 50 問",
      "180 分 / 80 問",
      "60 分 / 30 問",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。120 分で 60 問のシナリオ駆動選択式を解く。1 問あたり 2 分の計算。",
      "不正解。90 分 / 50 問は別ベンダー試験の数字。",
      "不正解。180 分は長すぎ、80 問は多すぎる。",
      "不正解。Foundations はもっと網羅的で 30 問では収まらない。",
    ],
    hints: [
      "1 問あたり 2 分のペース配分。",
      "6 つの本番想定シナリオが軸になっている。",
      "選択式 (multiple-choice) のみ。",
    ],
    explanation: {
      summary:
        "60 問・120 分のシナリオ駆動式選択問題。6 つの現実的な本番シナリオに紐付いた設問が出題される。",
      reason:
        "暗記ではなく『この場面でどう設計判断するか』が問われるため、本番運用経験のある人が有利。1 問 2 分のペースを意識し、長文シナリオに振り回されないよう要点抽出の練習を積むと良い。",
      references: [
        {
          label: "Anthropic Learn",
          url: "https://www.anthropic.com/learn",
        },
      ],
    },
  },
  {
    id: "acc-003",
    categoryId: "anthropic-cert",
    difficulty: "beginner",
    type: "choice",
    question: "CCA-F 試験の 1 回あたりの受験料は？ (Partner Network Early Access 枠を除いた一般価格)",
    choices: [
      "$99 USD",
      "$199 USD",
      "$49 USD",
      "$299 USD",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。1 回あたり $99 USD。Claude Partner Network メンバー企業の最初の 5,000 名は Early Access で無料。",
      "不正解。$199 は他クラウドベンダー試験の価格帯。",
      "不正解。$49 は実際の半額。",
      "不正解。$299 は Advanced 系認定でも想定されない高額。",
    ],
    hints: [
      "Partner Network 加入は無料、所属社員枠で初期 5,000 名は無料受験可能。",
      "Skilljar 経由で決済する。",
      "100 ドル付近に設定されている。",
    ],
    explanation: {
      summary:
        "通常受験料は $99 USD/回。Claude Partner Network 加盟組織の最初の 5,000 名社員は Early Access として無料で受験できる。",
      reason:
        "Anthropic はパートナー人材の育成を促す目的で、ネットワーク加盟 (無料) 企業に対し初期枠を無償提供。Partner Network への参加自体に料金はかからないため、所属組織が加盟していれば実質無料で取得できるルートがある。",
      references: [
        {
          label: "Claude Partner Network",
          url: "https://www.anthropic.com/news/claude-partner-network",
        },
      ],
    },
  },
  {
    id: "acc-004",
    categoryId: "anthropic-cert",
    difficulty: "intermediate",
    type: "choice",
    question:
      "CCA-F の受験中に許可されているものとして正しい記述は？",
    choices: [
      "外部ツール (Claude / 公式ドキュメント / 検索) は一切使用不可。Skilljar 上で専門のプロクター監督下で受験する。",
      "Claude Code を開いて手元で試しながら回答してよい。",
      "公式ドキュメントを別タブで閲覧してよい。",
      "受験者同士のチャットでディスカッション可能。",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。プロクター付きオンライン試験で、外部ツール・資料は禁止。",
      "不正解。Claude 製品の使用は試験中は不可。",
      "不正解。ドキュメント参照は禁止 (オフライン試験と同じ扱い)。",
      "不正解。コラボレーションは不正行為とみなされる。",
    ],
    hints: [
      "Skilljar 上のプロクター監督下で実施される。",
      "リアルタイム監視あり。",
      "open-book ではなく closed-book。",
    ],
    explanation: {
      summary:
        "Skilljar 経由のプロクター監督オンライン試験で、外部ツールや資料の参照は不可。Claude そのものを使うことも禁止されている。",
      reason:
        "実務での『調べながら設計する』スキルではなく、判断ロジックが頭に入っているかを測る設計。120 分で 60 問を解く必要があり、検索する余裕もない。事前準備で意思決定パターンを身体化しておくのが鍵。",
      references: [
        {
          label: "CCA-F アクセスリクエスト",
          url: "https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request",
        },
      ],
    },
  },
  {
    id: "acc-005",
    categoryId: "anthropic-cert",
    difficulty: "beginner",
    type: "choice",
    question:
      "CCA-F の前提条件 (受験前に Anthropic が推奨している実務経験) として最も近いものは？",
    choices: [
      "Claude を使った本番運用の経験が概ね 6 ヶ月以上",
      "AI 開発の経験 5 年以上必須",
      "AWS / GCP のアーキテクト資格保有者のみ",
      "前提なし。誰でも初心者から受験して問題なし",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。Anthropic は『6 ヶ月以上の本番経験』を強く推奨。",
      "不正解。5 年は過剰な要件で実態と異なる。",
      "不正解。他社クラウド資格は前提ではない。",
      "不正解。前提なしと書かれているが、未経験合格は現実的に困難。",
    ],
    hints: [
      "シナリオベースなので机上の知識では難しい。",
      "半年程度の本番経験が目安。",
      "他社クラウド資格は不要。",
    ],
    explanation: {
      summary:
        "Anthropic 推奨は『Claude を使った 6 ヶ月以上の本番運用経験』。実プロジェクトでのトレードオフ判断を問う出題形式のため、未経験では合格は厳しい。",
      reason:
        "シナリオ問題はドキュメントを覚えただけでは選びにくく、Agentic ループの失敗パターンや MCP ツール設計の現実的制約を体感している必要がある。Partner Network 経由で社内案件を回している層を想定。",
      references: [
        {
          label: "Anthropic Learn",
          url: "https://www.anthropic.com/learn",
        },
      ],
    },
  },
  {
    id: "acc-006",
    categoryId: "anthropic-cert",
    difficulty: "intermediate",
    type: "choice",
    question:
      "2026 年 5 月現在、CCA-F 試験を受験できるのは？",
    choices: [
      "Claude Partner Network メンバー企業に所属する人 (ネットワーク加入は無料)",
      "誰でも自由に申し込み可能",
      "Anthropic 社員のみ",
      "米国在住者のみ",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。受験は Partner Network メンバー組織に絞られている。組織加入自体は無料。",
      "不正解。一般オープン受付ではない (2026 年 5 月時点)。",
      "不正解。社外のパートナー人材育成が目的。",
      "不正解。地域による制限はないが、ネットワーク加盟による制限がある。",
    ],
    hints: [
      "現状は Partner Network 限定。",
      "加盟は無料なので組織が登録すれば社員は受験可能。",
      "2026 年 3 月 12 日に Partner Network と同時に発表された。",
    ],
    explanation: {
      summary:
        "CCA-F は Claude Partner Network メンバー組織所属者にゲートされている。ネットワーク加入は組織単位で無料のため、未加盟なら所属企業に加盟申請を依頼する。",
      reason:
        "Anthropic は 2026 年 3 月 12 日の Partner Network 立ち上げ ($100M 投資) と同時に CCA-F を発表し、まずパートナーエコシステム内での人材タグ付けに使う設計。今後 Advanced Architect や Developer / Seller 認定の前提となる予定。",
      references: [
        {
          label: "Claude Partner Network",
          url: "https://www.anthropic.com/news/claude-partner-network",
        },
      ],
    },
  },
  {
    id: "acc-007",
    categoryId: "anthropic-cert",
    difficulty: "beginner",
    type: "choice",
    question:
      "CCA-F 試験を配信しているラーニング基盤は？",
    choices: [
      "Skilljar (Anthropic Academy も同基盤)",
      "Coursera",
      "Udemy",
      "Pearson VUE のテストセンター",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。Anthropic Academy / CCA-F は Skilljar 上でホストされている。",
      "不正解。Coursera ではない。",
      "不正解。Udemy は無関係。",
      "不正解。物理テストセンターではなくオンラインプロクター。",
    ],
    hints: [
      "オンラインプロクターで完結する。",
      "Anthropic Academy と同じ URL ドメイン。",
      "anthropic.skilljar.com を覗くと分かる。",
    ],
    explanation: {
      summary:
        "受験も学習も Skilljar が基盤。Anthropic Academy のコース・CCA-F の申込・配信が anthropic.skilljar.com 配下で統一されている。",
      reason:
        "Skilljar は B2B 向け LMS で、Anthropic は学習体験とプロクター試験を 1 つのアカウントに集約。受験するにはまず Skilljar の Anthropic Academy アカウント (メール登録) を作る必要がある。",
      references: [
        {
          label: "Anthropic Academy (Skilljar)",
          url: "https://anthropic.skilljar.com/",
        },
      ],
    },
  },
  {
    id: "acc-008",
    categoryId: "anthropic-cert",
    difficulty: "intermediate",
    type: "choice",
    question:
      "CCA-F のスコアリング方式の説明として正しいのは？",
    choices: [
      "100〜1,000 のスケーリングスコアで、ドメイン加重 (重い分野の問題が大きく寄与) で算出される",
      "1 問 1 点の単純合計で 60 点満点",
      "ドメインごとに 100% 必要 (1 つでも下回ると不合格)",
      "面接官による主観評価",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。100〜1,000 にスケーリングし、ドメイン重みで配点が変わる。",
      "不正解。単純合計ではなくスケーリング。",
      "不正解。各ドメイン 100% 要求はされていない。",
      "不正解。選択式試験で主観評価はない。",
    ],
    hints: [
      "ドメイン重みは 27 / 20 / 20 / 18 / 15 %。",
      "合格は 720 ポイント。",
      "重い分野ほど 1 問の価値が高い。",
    ],
    explanation: {
      summary:
        "100〜1,000 のスケーリングスコアでドメイン加重採点。Agentic Architecture (27%) のような重い領域での失点は他ドメインで挽回しづらい。",
      reason:
        "スケーリングは『試験回ごとの難易度差を吸収』する目的もあるため、生の正答率がそのままスコアにはならない。配点が大きいドメインの正答率を優先的に上げる戦略が有効。",
      references: [
        {
          label: "CCA-F アクセスリクエスト",
          url: "https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request",
        },
      ],
    },
  },

  // ===========================================================================
  // ドメイン構成と重み (acc-009 〜 acc-018)
  // ===========================================================================
  {
    id: "acc-009",
    categoryId: "anthropic-cert",
    difficulty: "beginner",
    type: "choice",
    question:
      "CCA-F で最も配点比率が大きいドメインは？",
    choices: [
      "Agentic Architecture & Orchestration (27%)",
      "Claude Code Configuration & Workflows (20%)",
      "Tool Design & MCP Integration (18%)",
      "Context Management & Reliability (15%)",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。Agentic Architecture & Orchestration が 27% で最重。",
      "不正解。Claude Code は 20% で 2 位タイ。",
      "不正解。MCP は 18% で 4 位。",
      "不正解。Context Management は 15% で最も軽い。",
    ],
    hints: [
      "エージェントループ・マルチエージェント・セッション管理の領域。",
      "5 ドメインで最も重い。",
      "20% / 18% / 15% より大きい数値。",
    ],
    explanation: {
      summary:
        "Agentic Architecture & Orchestration が 27% で最重。エージェントループ (gather context → take action → verify) / マルチエージェント / セッション管理が中心トピック。",
      reason:
        "Anthropic の最新プロダクト戦略 (Claude Code / Subagents / Skills) はすべてエージェント駆動。本番でエージェントを安定させた経験が問われるため最も配点を高くしている。",
      references: [
        {
          label: "Anthropic Learn",
          url: "https://www.anthropic.com/learn",
        },
      ],
    },
  },
  {
    id: "acc-010",
    categoryId: "anthropic-cert",
    difficulty: "intermediate",
    type: "choice",
    question:
      "『Claude Code Configuration & Workflows』ドメイン (20%) で問われやすいテーマは？",
    choices: [
      "CLAUDE.md の階層 (project / user / enterprise memory) と custom slash command、CI/CD 連携",
      "MCP サーバの実装と JSON-RPC 仕様",
      "RLHF の損失関数",
      "GPU クラスタの設計",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。CLAUDE.md 階層・slash command・CI/CD が中心。",
      "不正解。それは Tool Design & MCP ドメイン (18%) の範囲。",
      "不正解。学術的な訓練手法は範囲外。",
      "不正解。インフラ設計は CCA-F の対象外。",
    ],
    hints: [
      "Claude Code の運用設定が中心。",
      "メモリの階層構造を覚えておく。",
      "slash command のスコープも頻出。",
    ],
    explanation: {
      summary:
        "20% のこのドメインは Claude Code の運用面が中心。CLAUDE.md の project/user/enterprise メモリ階層、custom slash command、CI/CD パイプライン (GitHub Actions / SessionStart hook) への組み込みが頻出。",
      reason:
        "実務で Claude Code を組織展開する際、メモリ階層の上書き順序や slash command のスコープ (project vs personal) を間違えるとガバナンスが崩壊する。Foundations は『運用に耐える Claude Code 設定が組めるか』を測る。",
      references: [
        {
          label: "Claude Code docs",
          url: "https://docs.claude.com/claude-code",
        },
      ],
    },
  },
  {
    id: "acc-011",
    categoryId: "anthropic-cert",
    difficulty: "intermediate",
    type: "choice",
    question:
      "『Prompt Engineering & Structured Output』ドメイン (20%) で頻出のトピックは？",
    choices: [
      "JSON schema を使った structured output、few-shot prompting、データ抽出",
      "GPU メモリ最適化",
      "Diffusion モデルのサンプリング",
      "音声合成パイプライン",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。JSON schema・few-shot・データ抽出が 3 大テーマ。",
      "不正解。GPU 最適化は CCA-F の範囲外。",
      "不正解。Diffusion は Claude の対象外領域。",
      "不正解。音声は Claude API の対象外。",
    ],
    hints: [
      "structured output が大トピック。",
      "few-shot で出力フォーマットを安定化する方法。",
      "PDF / 帳票からの構造化抽出。",
    ],
    explanation: {
      summary:
        "JSON schema を使った structured output、few-shot prompting、データ抽出 (entity extraction) が中核。Prompt Engineering を 1 ドメインとして配点 20% を割り振っているのが特徴。",
      reason:
        "Anthropic API の `response_format` / Tool Use での型保証 / few-shot による出力スキーマ固定など、ハルシネーションを抑える実務テクが問われる。Claude 101 と Building with the Claude API のコースが直結する。",
      references: [
        {
          label: "Building with the Claude API",
          url: "https://anthropic.skilljar.com/claude-with-the-anthropic-api",
        },
      ],
    },
  },
  {
    id: "acc-012",
    categoryId: "anthropic-cert",
    difficulty: "intermediate",
    type: "choice",
    question:
      "『Tool Design & MCP Integration』ドメインの配点は？",
    choices: ["18%", "15%", "20%", "27%"],
    answerIndex: 0,
    choiceExplanations: [
      "正解。MCP は 18%。Agentic 27% > Claude Code 20% = Prompt 20% > MCP 18% > Context 15%。",
      "不正解。15% は Context Management。",
      "不正解。20% は Claude Code / Prompt Engineering。",
      "不正解。27% は Agentic Architecture。",
    ],
    hints: [
      "MCP は 4 番目に重い。",
      "Tool 設計・エラー処理・サーバスコープ。",
      "20% より下、15% より上。",
    ],
    explanation: {
      summary:
        "Tool Design & MCP Integration は 18%。MCP ツールインターフェース設計、エラーハンドリング、server scoping (local / project / user) が中心。",
      reason:
        "MCP は Anthropic が推進する標準だが、ツールを乱立させると context window 圧迫やエージェントの判断ミスを誘発する。『良いツール定義』『失敗時のリトライ/エスカレーション』を設計できるかを測る。",
      references: [
        {
          label: "Introduction to MCP (Academy)",
          url: "https://anthropic.skilljar.com/",
        },
      ],
    },
  },
  {
    id: "acc-013",
    categoryId: "anthropic-cert",
    difficulty: "intermediate",
    type: "choice",
    question:
      "『Context Management & Reliability』ドメインで問われやすい話題は？",
    choices: [
      "コンテキストウィンドウ管理、エスカレーションロジック、Human-in-the-loop",
      "Transformer の attention 数式",
      "K8s の Pod 設計",
      "OAuth のスコープ設計",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。context window / エスカレーション / HITL が 3 本柱。",
      "不正解。学術寄りで CCA-F の対象外。",
      "不正解。インフラ運用は対象外。",
      "不正解。OAuth は範囲外。",
    ],
    hints: [
      "コンテキストウィンドウのオーバーフロー対策。",
      "信頼度が低い時の人間への引き渡し。",
      "失敗パスのリトライ設計。",
    ],
    explanation: {
      summary:
        "15% のこのドメインでは、context window の使い切り対策・エスカレーション (上位モデルや人間へ) ・Human-in-the-loop の介入ポイント設計が問われる。",
      reason:
        "本番運用での信頼性は『失敗時に静かに壊れない』ことが本質。コンテキスト圧縮・要約戦略、confidence しきい値での停止、危険操作前の確認プロンプトなど、SRE 的な観点が出題される。",
      references: [
        {
          label: "Anthropic Learn",
          url: "https://www.anthropic.com/learn",
        },
      ],
    },
  },
  {
    id: "acc-014",
    categoryId: "anthropic-cert",
    difficulty: "advanced",
    type: "choice",
    question:
      "『Agentic Architecture』ドメインで Anthropic が標準としているエージェントループの 3 段階は？",
    choices: [
      "gather context → take action → verify",
      "plan → execute → log",
      "input → forward → output",
      "prompt → sample → softmax",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。Anthropic 公式のエージェントループ表現。",
      "不正解。一般的だが Anthropic の公式語彙ではない。",
      "不正解。ニューラルネット推論の流れで的外れ。",
      "不正解。サンプリング処理の説明で別の話。",
    ],
    hints: [
      "ループは 3 段階。",
      "最後は『検証』で結果を確かめる。",
      "Anthropic の公式表現を覚える。",
    ],
    explanation: {
      summary:
        "Anthropic はエージェントを『gather context → take action → verify』のループとして定式化。CCA-F でもこの語彙で出題されるため暗記必須。",
      reason:
        "verify ステップが省略されると幻覚や副作用が蓄積する。本番でのリトライ・検証ステップ設計 (例: ファイル変更後にテスト実行、API 呼び出し後にレスポンス検査) が試験で頻出する。",
      references: [
        {
          label: "Anthropic Learn",
          url: "https://www.anthropic.com/learn",
        },
      ],
    },
  },
  {
    id: "acc-015",
    categoryId: "anthropic-cert",
    difficulty: "intermediate",
    type: "choice",
    question:
      "CCA-F のシナリオ数 (試験全体を貫く本番想定シナリオの数) は？",
    choices: ["6", "3", "10", "1"],
    answerIndex: 0,
    choiceExplanations: [
      "正解。6 つの本番シナリオがベースになっている。",
      "不正解。3 では網羅性が足りず実態と異なる。",
      "不正解。10 は多すぎる。",
      "不正解。1 シナリオでは 60 問支えきれない。",
    ],
    hints: [
      "6 ドメインではなく 5 ドメイン。シナリオ数は別カウント。",
      "1 シナリオあたり 10 問前後。",
      "現実的な業務ケースを模している。",
    ],
    explanation: {
      summary:
        "60 問は 6 つの本番想定シナリオに紐付いて出題される。各シナリオで複数の領域 (Agentic / MCP / Context など) が複合的に問われる。",
      reason:
        "ドメインごとに独立した知識を問うのではなく『1 つのプロジェクトで全領域の判断を要求』する設計。シナリオの文脈を取り違えると一気に複数問落とすため、設問のリード文を丁寧に読む練習が必要。",
      references: [
        {
          label: "CCA-F アクセスリクエスト",
          url: "https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request",
        },
      ],
    },
  },
  {
    id: "acc-016",
    categoryId: "anthropic-cert",
    difficulty: "advanced",
    type: "choice",
    question:
      "CCA-F の出題範囲『外』に明確に含まれるのは？ (= 試験で問われない領域)",
    choices: [
      "Claude モデルの内部 RLHF アルゴリズムや GPU クラスタ設計",
      "CLAUDE.md の階層上書きルール",
      "MCP server の scope (local / project / user)",
      "Agentic ループの verify ステップ",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。モデル内部 (訓練・推論基盤) は Foundations の対象外。",
      "不正解。Claude Code ドメインの中心トピック。",
      "不正解。MCP ドメインの中心トピック。",
      "不正解。Agentic ドメインの中心トピック。",
    ],
    hints: [
      "Foundations はあくまで『使う側のアーキテクト』向け。",
      "モデル開発者の知識は不要。",
      "学術的内容は出ない。",
    ],
    explanation: {
      summary:
        "CCA-F は『Claude を使った本番システムを設計するアーキテクト』向けで、モデル内部 (RLHF / attention / GPU) や学術的内容は対象外。",
      reason:
        "5 ドメインはすべて『Anthropic のプロダクトをどう組み合わせて顧客課題を解くか』に閉じている。モデル研究や MLOps インフラは Advanced Architect 以降で扱う可能性はあるが、Foundations では問われない。",
      references: [
        {
          label: "Claude Partner Network",
          url: "https://www.anthropic.com/news/claude-partner-network",
        },
      ],
    },
  },
  {
    id: "acc-017",
    categoryId: "anthropic-cert",
    difficulty: "advanced",
    type: "choice",
    question:
      "次のうち『Agentic Architecture』ドメインで扱う Subagent / マルチエージェント設計の判断軸として最も適切なのは？",
    choices: [
      "context 分離・専門性・並列化のメリットが orchestration コストを上回るか",
      "Subagent は常に使うべきで、単一エージェントは非推奨",
      "Subagent はトークン削減のためにのみ使う",
      "Subagent は本番では使わず学習目的のみ",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。Anthropic 公式の判断軸 (context isolation / specialization / parallelism vs orchestration overhead)。",
      "不正解。乱用は逆効果。",
      "不正解。目的をトークン削減に限定するのは誤り。",
      "不正解。本番でも積極的に使われている。",
    ],
    hints: [
      "Subagent の利点とコストを天秤にかける。",
      "context 分離・専門化・並列。",
      "orchestration が複雑化すると逆にバグの温床。",
    ],
    explanation: {
      summary:
        "Subagent は『context を分けたい / 専門性を持たせたい / 並列実行したい』というメリットが orchestration コスト (引き渡しエラー・観測性低下) を上回る時に使う。常用ではない。",
      reason:
        "Foundations では『どのシナリオで Subagent を切り出すか』が頻出。例えば長尺リサーチ→要約パイプラインや、コード生成と code review を分けるケースは Subagent 適。一方、短い対話で十分なものは単一エージェントが安全。",
      references: [
        {
          label: "Introduction to Subagents (Academy)",
          url: "https://anthropic.skilljar.com/",
        },
      ],
    },
  },
  {
    id: "acc-018",
    categoryId: "anthropic-cert",
    difficulty: "intermediate",
    type: "choice",
    question:
      "CCA-F の 5 ドメインを配点の大きい順に並べた組み合わせとして正しいのは？",
    choices: [
      "Agentic 27% > Claude Code 20% = Prompt 20% > MCP 18% > Context 15%",
      "MCP 27% > Agentic 20% > Prompt 20% > Claude Code 18% > Context 15%",
      "Claude Code 27% > Agentic 20% > Prompt 20% > MCP 18% > Context 15%",
      "Agentic 30% > Claude Code 25% > Prompt 20% > MCP 15% > Context 10%",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。公式の重み配分。",
      "不正解。MCP が首位ではない。",
      "不正解。Claude Code は 20%。",
      "不正解。各数値が違う (公式は 27/20/20/18/15)。",
    ],
    hints: [
      "27 / 20 / 20 / 18 / 15 を覚える。",
      "Claude Code と Prompt は同率。",
      "Context が最軽。",
    ],
    explanation: {
      summary:
        "重みは Agentic 27% > Claude Code 20% = Prompt Engineering 20% > MCP 18% > Context Management 15%。合計 100%。",
      reason:
        "重みは Anthropic がエージェント中心戦略を取っていることを反映。学習計画も Agentic 27% に最大の時間を割り、Claude Code / Prompt を並行、MCP・Context は補助的に固めるのが妥当。",
      references: [
        {
          label: "CCA-F アクセスリクエスト",
          url: "https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request",
        },
      ],
    },
  },

  // ===========================================================================
  // Anthropic Academy コース (acc-019 〜 acc-024)
  // ===========================================================================
  {
    id: "acc-019",
    categoryId: "anthropic-cert",
    difficulty: "beginner",
    type: "choice",
    question:
      "Anthropic Academy (anthropic.skilljar.com) のコース料金・登録要件として正しいのは？",
    choices: [
      "全コース無料、メールアドレス登録のみで受講可能",
      "月額 $29 のサブスクリプション",
      "Partner Network 加盟が必須",
      "コースごとに $49〜199 の購入が必要",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。全 17 コースが無料、メール登録のみ。",
      "不正解。サブスク制ではない。",
      "不正解。Academy 受講に Partner Network 加盟は不要 (CCA-F 受験には必要)。",
      "不正解。コース個別課金はない。",
    ],
    hints: [
      "学習は誰でも無料。",
      "登録はメールだけ。",
      "Partner 加盟が要るのは受験のほう。",
    ],
    explanation: {
      summary:
        "Anthropic Academy のコースは全て無料、メールアドレスのみで登録可能。約 17 コースが Skilljar 上で提供されている。",
      reason:
        "学習自体のハードルを下げ、エコシステム全体の Claude スキル底上げを狙う設計。Partner Network 加盟は『CCA-F 試験を受ける』ためのゲートで、Academy のコース受講には関係ない。",
      references: [
        {
          label: "Anthropic Academy",
          url: "https://anthropic.skilljar.com/",
        },
      ],
    },
  },
  {
    id: "acc-020",
    categoryId: "anthropic-cert",
    difficulty: "intermediate",
    type: "choice",
    question:
      "Anthropic Academy の『Claude Code 101』が中心テーマとしているワークフローは？",
    choices: [
      "Explore → Plan → Code → Commit",
      "Test → Debug → Deploy",
      "Prompt → Sample → Output",
      "Gather → Act → Verify",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。Claude Code 101 の公式ワークフロー。",
      "不正解。一般論で Anthropic 公式表現ではない。",
      "不正解。これはサンプリングの説明で誤り。",
      "不正解。Gather → Act → Verify はエージェントループ (Agentic ドメイン) の語彙。",
    ],
    hints: [
      "4 段階のワークフロー。",
      "Claude Code 入門の中核。",
      "実装よりも『探索 → 計画』を先に置く点が特徴。",
    ],
    explanation: {
      summary:
        "Claude Code 101 は『Explore → Plan → Code → Commit』を推奨ワークフローとして提示。実装する前に探索・計画を行う点が AI コーディング特有のベストプラクティス。",
      reason:
        "Claude Code でいきなり実装に走るとコンテキスト不足で破綻しがち。先にコードベースを Explore し、Plan モードで設計を固めてから実装、最後に git commit に落とすパターンが標準。",
      references: [
        {
          label: "Claude Code 101",
          url: "https://anthropic.skilljar.com/claude-code-101",
        },
      ],
    },
  },
  {
    id: "acc-021",
    categoryId: "anthropic-cert",
    difficulty: "intermediate",
    type: "choice",
    question:
      "次のうち、Anthropic Academy が提供している MCP 関連コースの組み合わせとして正しいのは？",
    choices: [
      "Introduction to MCP と Advanced MCP の 2 本立て",
      "MCP for Beginners と MCP Certification の 2 本立て",
      "MCP Bootcamp 1 本のみ",
      "MCP コースは存在しない",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。Introduction と Advanced の 2 本構成。",
      "不正解。Certification コースは別物 (CCA-F は別ライン)。",
      "不正解。Bootcamp という名称はない。",
      "不正解。MCP コースは存在する。",
    ],
    hints: [
      "初級と上級が分かれている。",
      "両方無料。",
      "Tool Design ドメイン (18%) に直結。",
    ],
    explanation: {
      summary:
        "Academy では Introduction to MCP と Advanced MCP の 2 コースが提供されている。CCA-F の Tool Design & MCP Integration ドメイン (18%) 対策の中核教材。",
      reason:
        "Introduction で MCP の概念 (Resources / Tools / Prompts) を理解し、Advanced で server scoping / 認証 / エラーハンドリングまで踏み込む構成。両方受講するとドメイン重み 18% を効率的にカバーできる。",
      references: [
        {
          label: "Anthropic Academy",
          url: "https://anthropic.skilljar.com/",
        },
      ],
    },
  },
  {
    id: "acc-022",
    categoryId: "anthropic-cert",
    difficulty: "intermediate",
    type: "choice",
    question:
      "『AI Fluency: Framework & Foundations』コースの特徴として正しい記述は？",
    choices: [
      "UCC・Ringling の教授陣と共同制作で、AI 一般リテラシーを扱う基礎コース",
      "Claude Code 専用のコマンドリファレンス集",
      "MCP プロトコル仕様書",
      "CCA-F の合格保証コース",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。University College Cork (UCC) と Ringling College of Art and Design の教授陣と共同制作。",
      "不正解。Claude Code コマンド集ではない。",
      "不正解。MCP 仕様書ではない。",
      "不正解。合格保証コースは存在しない。",
    ],
    hints: [
      "学術機関との共同制作。",
      "AI 全般のリテラシーが対象。",
      "技術特化ではなく基礎フレームワーク。",
    ],
    explanation: {
      summary:
        "『AI Fluency: Framework & Foundations』は UCC と Ringling College の教授陣と共同制作された AI リテラシー基礎コース。CCA-F 直結というより前提教養。",
      reason:
        "教育機関と組むことで Anthropic は『Claude 専有知識』ではなく『AI と協働する一般的フレームワーク』を Academy のエントリーポイントに置いている。学生・教育者・NPO 向け派生コースも存在。",
      references: [
        {
          label: "AI Fluency",
          url: "https://anthropic.skilljar.com/ai-fluency-framework-foundations",
        },
      ],
    },
  },
  {
    id: "acc-023",
    categoryId: "anthropic-cert",
    difficulty: "beginner",
    type: "choice",
    question:
      "Anthropic Academy が立ち上がった日付は？",
    choices: [
      "2026 年 3 月 2 日",
      "2025 年 12 月 1 日",
      "2026 年 3 月 12 日 (CCA-F と同日)",
      "2024 年 6 月 1 日",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。Academy は 2026 年 3 月 2 日にローンチ。",
      "不正解。2025 年内ではない。",
      "不正解。3 月 12 日は Partner Network と CCA-F の発表日。Academy はその 10 日前に先行公開。",
      "不正解。2024 年ではない。",
    ],
    hints: [
      "CCA-F より少し早く公開された。",
      "2026 年 3 月初旬。",
      "Partner Network 発表 (3/12) と分けて覚える。",
    ],
    explanation: {
      summary:
        "Anthropic Academy は 2026 年 3 月 2 日にローンチ。10 日後の 3 月 12 日に Partner Network と CCA-F が発表され、Academy が試験対策学習の入口として位置付けられた。",
      reason:
        "Academy 先行公開 → ネットワーク+認定発表という順番で、エコシステム拡大の段取りを丁寧に設計している。試験対策コースが揃った状態で受験ルートが開く構造。",
      references: [
        {
          label: "Anthropic Academy",
          url: "https://anthropic.skilljar.com/",
        },
      ],
    },
  },
  {
    id: "acc-024",
    categoryId: "anthropic-cert",
    difficulty: "intermediate",
    type: "choice",
    question:
      "Anthropic は GitHub 上でも `anthropics/courses` という教材リポジトリを公開している。これと Skilljar Academy の関係として正しいのは？",
    choices: [
      "GitHub 版はオープンソースの教材集、Skilljar Academy は別途運営される公式 LMS。両者は独立",
      "GitHub 版が Skilljar Academy の正本",
      "Skilljar Academy は GitHub Pages でホストされている",
      "GitHub 版は廃止され Skilljar に統合済み",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。GitHub 版は OSS 教材、Skilljar Academy は別運営の公式 LMS。",
      "不正解。GitHub は正本ではなく補助教材的位置付け。",
      "不正解。Skilljar は独自基盤で GitHub Pages ではない。",
      "不正解。両方並行して存在する。",
    ],
    hints: [
      "GitHub にも anthropics/courses リポジトリがある。",
      "Skilljar とは別チャネル。",
      "OSS 版は notebook 等の素材。",
    ],
    explanation: {
      summary:
        "github.com/anthropics/courses は OSS の教材リポジトリ (notebook 等)、anthropic.skilljar.com は別運営の公式 LMS。両者は独立して並走する。",
      reason:
        "OSS 版は自学者・社内研修向けに改変自由な素材を提供。Skilljar 版は『受講証跡』『プロクター試験』『修了証』など LMS 機能が乗る公式ルート。CCA-F 受験トラックを使うなら Skilljar 必須。",
      references: [
        {
          label: "anthropics/courses",
          url: "https://github.com/anthropics/courses",
        },
        {
          label: "Anthropic Academy",
          url: "https://anthropic.skilljar.com/",
        },
      ],
    },
  },

  // ===========================================================================
  // 推奨対策・関連認定 (acc-025 〜 acc-030)
  // ===========================================================================
  {
    id: "acc-025",
    categoryId: "anthropic-cert",
    difficulty: "intermediate",
    type: "choice",
    question:
      "Agentic Architecture ドメイン (27%) 対策で最も直結する Anthropic Academy のコース組み合わせは？",
    choices: [
      "Introduction to Subagents + Introduction to Agent Skills + Claude Code in Action",
      "AI Fluency for Students + AI Capabilities and Limitations",
      "Amazon Bedrock コースのみ",
      "Building with the Claude API のみで十分",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。Subagents / Skills / Claude Code in Action がエージェント設計を実践的にカバー。",
      "不正解。教養系コースで直結度は低い。",
      "不正解。Bedrock コースはデプロイ寄りで Agentic は手薄。",
      "不正解。API コースは Prompt Engineering 寄りで Agentic 全体は弱い。",
    ],
    hints: [
      "Subagent と Skills は Agentic ループの実装パターン。",
      "Claude Code in Action は応用例。",
      "1 コースだけでは 27% はカバーしきれない。",
    ],
    explanation: {
      summary:
        "Agentic ドメイン 27% は『Introduction to Subagents』『Introduction to Agent Skills』『Claude Code in Action』の 3 本立てが王道。エージェントループ・マルチエージェント・セッション管理を網羅できる。",
      reason:
        "Subagents で並列・専門化、Skills で再利用可能なエージェント部品、Claude Code in Action で本番運用感を学ぶ構成。Anthropic が想定する Agentic アーキテクトの基礎一式。",
      references: [
        {
          label: "Claude Code in Action",
          url: "https://anthropic.skilljar.com/claude-code-in-action",
        },
      ],
    },
  },
  {
    id: "acc-026",
    categoryId: "anthropic-cert",
    difficulty: "intermediate",
    type: "choice",
    question:
      "Prompt Engineering & Structured Output ドメイン (20%) 対策に最適なコースは？",
    choices: [
      "Building with the Claude API + Claude 101",
      "Introduction to MCP + Advanced MCP",
      "AI Fluency for Educators",
      "Amazon Bedrock 単独",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。API 操作と Claude 製品の前提を両方押さえられる。",
      "不正解。MCP コースは Tool Design ドメイン向け。",
      "不正解。Educators 向けは教育用途で直結度低。",
      "不正解。Bedrock 単独では API 設計が手薄。",
    ],
    hints: [
      "JSON schema・few-shot の話題は API コースが詳しい。",
      "Claude 101 で Artifacts / Skills の前提を押さえる。",
      "MCP は別ドメイン。",
    ],
    explanation: {
      summary:
        "Prompt Engineering & Structured Output (20%) は『Building with the Claude API』+『Claude 101』が王道。API での structured output 指定、few-shot 例示、データ抽出パターンを実機で学ぶ。",
      reason:
        "Claude 101 で Projects / Artifacts / Skills / Research モードの前提知識を固め、API コースで実装レベルの構造化出力を扱う流れ。試験のシナリオ問題は『API か Claude.ai か』を選ばせる場面もあり両視点が必要。",
      references: [
        {
          label: "Building with the Claude API",
          url: "https://anthropic.skilljar.com/claude-with-the-anthropic-api",
        },
      ],
    },
  },
  {
    id: "acc-027",
    categoryId: "anthropic-cert",
    difficulty: "intermediate",
    type: "choice",
    question:
      "CCA-F の合格に向けて最も推奨される『実務経験』のあり方は？",
    choices: [
      "6 ヶ月以上、Claude を使った本番システム (Claude Code / API / MCP のいずれか) を運用した経験",
      "ChatGPT を毎日使った経験",
      "機械学習論文を 50 本読んだ経験",
      "他社クラウド認定資格 3 つ以上",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。Anthropic 推奨は 6 ヶ月以上の本番運用経験。",
      "不正解。別製品の経験は CCA-F の判断軸とは異なる。",
      "不正解。学術知識は範囲外。",
      "不正解。他社認定は前提ではない。",
    ],
    hints: [
      "推奨期間は 6 ヶ月以上。",
      "Anthropic 製品の本番運用がポイント。",
      "シナリオ問題は経験ベースで強くなる。",
    ],
    explanation: {
      summary:
        "本番運用経験 6 ヶ月以上が公式推奨。Claude Code・API・MCP いずれかで実装と運用 (失敗対応・コスト最適化・観測性) を経験していると、シナリオ問題で迷いが減る。",
      reason:
        "シナリオ問題は教科書的に最適解が一つに決まらず、トレードオフの優先順位を聞いてくる。本番でインシデント対応した経験があると『どこから落ちるか』が直感的に分かるため正答率が大きく変わる。",
      references: [
        {
          label: "Anthropic Learn",
          url: "https://www.anthropic.com/learn",
        },
      ],
    },
  },
  {
    id: "acc-028",
    categoryId: "anthropic-cert",
    difficulty: "advanced",
    type: "choice",
    question:
      "Claude Partner Network が CCA-F の文脈で果たす役割として正しい記述は？",
    choices: [
      "Network 加盟が CCA-F 受験ゲートになっており、加盟組織の社員枠で受験が可能。加盟自体は無料",
      "Network は Anthropic の有料サブスクで月額数百ドル",
      "Network は受験者の合格保証を提供する",
      "Network はモデル提供を独占し、非加盟は Claude API を使えない",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。Network が受験ゲート。加盟無料。",
      "不正解。加盟料は不要。",
      "不正解。合格保証はない。",
      "不正解。Claude API は誰でも利用可能。",
    ],
    hints: [
      "Network 加盟は無料。",
      "受験ゲートとしての役割。",
      "API 利用とは別軸の制度。",
    ],
    explanation: {
      summary:
        "Claude Partner Network は Anthropic が 2026/3/12 に発表した $100M 投資のパートナーエコシステム。加盟は無料で、加盟組織の社員枠で CCA-F を受験できる。",
      reason:
        "Anthropic はパートナー人材の質を担保する目的で、Network 加盟組織にスキル認定 (CCA-F) と Early Access 無料受験枠 (5,000 名) を提供。Advanced Architect 認定もここから派生していく予定。",
      references: [
        {
          label: "Claude Partner Network",
          url: "https://www.anthropic.com/news/claude-partner-network",
        },
      ],
    },
  },
  {
    id: "acc-029",
    categoryId: "anthropic-cert",
    difficulty: "advanced",
    type: "choice",
    question:
      "2026 年内に Anthropic が追加リリースを予告している認定として正しい組み合わせは？",
    choices: [
      "Seller 認定 / Developer 認定 / Advanced Architect 認定 (CCA-F が前提)",
      "Claude PhD 認定 / Claude Black Belt 認定",
      "Bedrock Specialty / Vertex Specialty",
      "Anthropic Certified Trainer のみ",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。Seller / Developer / Advanced Architect が公式予告ラインナップ。",
      "不正解。架空の名称。",
      "不正解。他社クラウドベンダーの認定。",
      "不正解。Trainer 認定は予告されていない。",
    ],
    hints: [
      "営業・実装・上級アーキの 3 系統が予定されている。",
      "Advanced は CCA-F 合格者向け。",
      "Bedrock / Vertex は他社認定。",
    ],
    explanation: {
      summary:
        "Anthropic は 2026 年内に Seller (営業) / Developer (実装) / Advanced Architect (上級設計、CCA-F 前提) の追加認定を予告。現状リリース済みは CCA-F のみ。",
      reason:
        "CCA-F は Foundations 層を抑え、その上に専門領域 (営業・実装・上級設計) を積む 3 階層の認定戦略。エコシステム全体のスキルマップを Anthropic が定義しに来ている。",
      references: [
        {
          label: "Claude Partner Network",
          url: "https://www.anthropic.com/news/claude-partner-network",
        },
      ],
    },
  },
  {
    id: "acc-030",
    categoryId: "anthropic-cert",
    difficulty: "advanced",
    type: "choice",
    question:
      "CCA-F 学習計画として最も効率の良い順番は？ (ゼロから 3 ヶ月で合格を目指す想定)",
    choices: [
      "Claude 101 → AI Fluency → Claude Code 101 → Introduction to MCP → Subagents/Agent Skills → Building with the Claude API → 模試/実プロジェクト演習",
      "いきなり Advanced MCP から始め、他は飛ばす",
      "Anthropic 論文だけを 3 ヶ月読み続ける",
      "AWS の AI 認定を先に取得してから挑む",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。基礎 → ツール → エージェント → 応用 → 演習の自然な勾配。",
      "不正解。基礎なしで Advanced は非効率。",
      "不正解。論文学習は試験範囲外。",
      "不正解。他社認定は前提ではなく時間の無駄。",
    ],
    hints: [
      "基礎 (Claude 101 / AI Fluency) から入る。",
      "ドメイン重みが大きいエージェント領域に十分時間を割く。",
      "最後は実プロジェクトで定着させる。",
    ],
    explanation: {
      summary:
        "Claude 101 と AI Fluency で土台 → Claude Code 101 で開発ワークフロー → MCP で Tool Design → Subagents / Agent Skills で Agentic (27%) → Building with the Claude API で Prompt Engineering (20%) → 模試と実プロジェクト演習で仕上げ、が王道。",
      reason:
        "ドメイン重み (Agentic 27 > Claude Code 20 = Prompt 20 > MCP 18 > Context 15) に応じて学習時間を傾斜配分するのが現実解。シナリオ問題対策として、最後の 1 ヶ月は実プロジェクトで失敗パターンを体験するのが効く。",
      references: [
        {
          label: "Anthropic Academy",
          url: "https://anthropic.skilljar.com/",
        },
        {
          label: "Claude Code docs",
          url: "https://docs.claude.com/claude-code",
        },
      ],
    },
  },
];
