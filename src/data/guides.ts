import type { TrackId, CategoryId } from "@/lib/types";

// ===========================================================================
// 参考書 (Study Guide) の型定義
// ===========================================================================

export type GuideSection = {
  /** 見出し */
  heading: string;
  /** 本文 (改行を含むプレーンテキスト) */
  body: string;
  /** オプションのコード例 */
  code?: string;
  /** オプションのコードの言語 (シンタックスハイライト用ラベル) */
  language?: string;
  /** よくある落とし穴・補足 */
  notes?: string[];
};

export type GuideChapter = {
  id: string;
  /** 章タイトル */
  title: string;
  /** 短い導入 (リスト画面用) */
  intro: string;
  /** 想定読了時間 (分) */
  readingMinutes: number;
  /** 学習目標 (この章で何を理解すべきか) */
  objectives: string[];
  /** 公式/参考リンク */
  references?: { label: string; url: string }[];
  /** 章本体 (節の配列) */
  sections: GuideSection[];
  /** 理解度確認: 関連クイズ問題 ID */
  comprehensionQuestionIds?: string[];
  /** 要点まとめ (章末) */
  keyTakeaways: string[];
};

export type Guide = {
  id: string;
  trackId: TrackId;
  /** ガイド名 (例: 「Ruby の地図 — はじめての一冊」) */
  title: string;
  /** 1 行説明 */
  subtitle: string;
  /** どんな読者に */
  audience: string;
  /** 出典 (公式ドキュメント / 書籍 / リンク) */
  sources: { label: string; url: string }[];
  emoji: string;
  /** 章の配列 */
  chapters: GuideChapter[];
  /** どのカテゴリと関連が深いか (リンク用) */
  relatedCategoryIds?: CategoryId[];
};

// ===========================================================================
// 参考書データ
// ===========================================================================

export const guides: Guide[] = [
  // ---------- Ruby 入門ガイド ----------
  {
    id: "ruby-intro",
    trackId: "ruby",
    title: "Ruby の地図 — はじめての一冊",
    subtitle:
      "公式リファレンス + チェリー本 (プロを目指す人のためのRuby入門) のエッセンスを 7 章に圧縮した入門ガイド (基礎 → コレクション → OOP → 例外 → メタプロ → テスト → Gem)",
    audience:
      "Ruby を初めて学ぶ人、JavaScript / Python 等から移ってきた人",
    sources: [
      { label: "Ruby 公式リファレンス", url: "https://docs.ruby-lang.org/ja/" },
      { label: "Ruby スタイルガイド", url: "https://rubystyle.guide/" },
    ],
    emoji: "💎",
    relatedCategoryIds: ["ruby-basics", "collections", "ruby-oop"],
    chapters: [
      {
        id: "values-and-control",
        title: "1. 値と制御構造 — Ruby の世界観",
        intro:
          "Ruby ではほぼ全てが『オブジェクト』。nil もメソッドを持ち、true/false の判定にも特徴がある。",
        readingMinutes: 6,
        objectives: [
          "Ruby の基本データ型 (Integer / Float / String / Symbol / nil / true/false) を区別できる",
          "Ruby の真偽値判定 (false と nil だけが偽) の特徴を説明できる",
          "if / unless / case-when を式として使えることを理解する",
        ],
        references: [
          {
            label: "公式: クラス階層",
            url: "https://docs.ruby-lang.org/ja/latest/class/index.html",
          },
        ],
        sections: [
          {
            heading: "1.1 すべてがオブジェクト",
            body: "Ruby ではプリミティブと呼ばれる『特別な値』がほとんど存在しない。整数 42 もメソッド `42.even?` を持ち、`nil` も `nil.to_s` (空文字列) や `nil.to_a` (空配列) を持つ。これにより『メソッドチェーンが安全に書ける』『分岐コードが減る』という Ruby 特有の書き味になる。",
            code: "42.even?           #=> true\nnil.to_s           #=> \"\"\nnil.to_a           #=> []\n[1, 2, 3].class    #=> Array\nArray.class        #=> Class (Class もまたオブジェクト)",
            language: "ruby",
            notes: [
              "他言語経験者の最初のつまずき: nil に対するメソッド呼び出しが NoMethodError にならないケースがある (to_s / to_a / to_i 等)",
            ],
          },
          {
            heading: "1.2 真偽値: false と nil だけが falsy",
            body: "Ruby の if 文で『偽』と評価される値は false と nil の 2 つだけ。0 / '' / [] は全て truthy。これは JavaScript / Python と異なるので注意。",
            code: "if 0    then puts \"truthy\" end  # → truthy\nif \"\"   then puts \"truthy\" end  # → truthy\nif []   then puts \"truthy\" end  # → truthy\nif nil  then puts \"truthy\" end  # 出力なし",
            language: "ruby",
            notes: [
              "空配列を『何もない』と判定したい場合は `arr.empty?` を使う。`if arr` だと常に truthy",
            ],
          },
          {
            heading: "1.3 制御構造は式 (値を返す)",
            body: "Ruby の if / case / while / begin は式として値を返す。これにより、最終行を return する関数や 1 行で代入する書き方が自然に書ける。",
            code: "grade = if score >= 80 then \"A\"\n        elsif score >= 60 then \"B\"\n        else \"C\"\n        end\n\n# case/when も同様\nlabel = case status\n        when :draft     then \"下書き\"\n        when :published then \"公開済\"\n        end",
            language: "ruby",
            notes: [
              "後置 if / unless: `return false unless valid?` のような Guard Clause パターンを多用する",
            ],
          },
        ],
        keyTakeaways: [
          "nil もメソッドを持つオブジェクト。to_s / to_a / to_i などで安全にチェイン可能",
          "Ruby の真偽値判定は false と nil だけが偽。他言語の感覚と違うので明示的に `.empty?` などを使う",
          "if / case は式。最終評価された値が戻り値になる",
        ],
        comprehensionQuestionIds: ["rb-001", "rb-002", "rb-003", "rb-032"],
      },
      {
        id: "collections-and-blocks",
        title: "2. コレクションとブロック — Ruby のしなやかさ",
        intro:
          "Array / Hash / Enumerable とブロックの組合せは Ruby の核心。map / select / inject の 3 つを使いこなせば多くのロジックが宣言的に書ける。",
        readingMinutes: 8,
        objectives: [
          "Array / Hash の基本操作と破壊的/非破壊的メソッドの違いを理解する",
          "ブロック (`{|x| ...}`) を yield で受け取る仕組みを説明できる",
          "map / select / inject (reduce) の使い分けができる",
        ],
        sections: [
          {
            heading: "2.1 Array と Hash",
            body: "Array は順序付きコレクション、Hash はキー・値のペア。どちらも Enumerable モジュールを include しているため、map / select / inject などの強力なメソッドを共有する。Hash のキーには Symbol を使うのが Ruby の慣習。",
            code: "arr = [1, 2, 3]\narr.first        #=> 1\narr.last         #=> 3\narr.push(4)      # 破壊的、arr は [1,2,3,4]\narr + [5]        # 非破壊、新しい配列\n\nh = { name: \"Alice\", age: 20 }\nh[:name]         #=> \"Alice\"\nh.fetch(:none, \"default\")\nh.each { |k, v| puts \"#{k}=#{v}\" }",
            language: "ruby",
            notes: [
              "破壊的メソッドは末尾に `!` が付くものが多い (push は例外)。破壊か非破壊かは `arr.object_id` を見比べる癖を付けると安全",
            ],
          },
          {
            heading: "2.2 ブロックは Ruby の関数引数",
            body: "メソッドの後ろに `do...end` または `{...}` で渡されるのが『ブロック』。メソッド側は `yield` でブロックを呼び出す。明示的に Proc として受け取る場合は `&blk` 引数を使う。",
            code: "def repeat(n)\n  n.times { yield }\nend\nrepeat(3) { puts \"hi\" }   # 'hi' を 3 回\n\ndef call_with(x, &blk)\n  blk.call(x)\nend\ncall_with(5) { |n| n * 2 }   #=> 10",
            language: "ruby",
            notes: [
              "ブロックは『軽量な関数』。each / map / each_with_index など Enumerable の多くがブロックを取る",
              "Symbol#to_proc により `arr.map(&:to_s)` のような短縮形が書ける",
            ],
          },
          {
            heading: "2.3 map / select / inject の 3 本柱",
            body: "map は変換、select は絞り込み、inject (reduce) は畳み込み。これら 3 つを組合せると大半の集合操作が宣言的に書ける。",
            code: "# map: 変換\n[1, 2, 3].map { |n| n * 2 }            #=> [2, 4, 6]\n\n# select: 絞り込み\n[1, 2, 3, 4].select { |n| n.even? }    #=> [2, 4]\n\n# inject: 畳み込み (初期値 + 累積)\n[1, 2, 3, 4].inject(0) { |sum, n| sum + n }   #=> 10\n[1, 2, 3, 4].inject(:+)                       #=> 10 (短縮形)\n\n# 組合せ: 偶数の二乗の和\n[1, 2, 3, 4].select(&:even?).map { |n| n ** 2 }.sum   #=> 20",
            language: "ruby",
            notes: [
              "メソッドチェーンの間でデバッグしたい時は `.tap { |x| p x }` を挟む",
              "Hash 構築は `each_with_object({})` が安全 (inject の罠を回避)",
            ],
          },
        ],
        keyTakeaways: [
          "Array / Hash は Enumerable を共有 → map / select / inject が両方で使える",
          "ブロックはメソッドの最後に渡せる軽量関数。yield で呼ぶか &blk で Proc 化",
          "map (変換) / select (絞り込み) / inject (累積) で多くの集合操作が宣言的に書ける",
        ],
        comprehensionQuestionIds: ["col-001", "col-002", "col-005", "col-013"],
      },
      {
        id: "classes-and-modules",
        title: "3. クラスとモジュール — Ruby らしいオブジェクト指向",
        intro:
          "Ruby はクラスベースの OOP に Mixin (モジュール) を組み合わせる。継承を深くせずに振る舞いを合成するのが Ruby らしさ。",
        readingMinutes: 7,
        objectives: [
          "class / module の定義と attr_accessor の役割を説明できる",
          "継承と Mixin (include / prepend / extend) の使い分けを理解する",
          "private / protected / public の可視性を把握する",
        ],
        sections: [
          {
            heading: "3.1 クラスの基本",
            body: "クラスは initialize で初期化、attr_accessor で getter/setter を一括定義。インスタンス変数は `@` で始まる。",
            code: "class User\n  attr_accessor :name, :age\n\n  def initialize(name:, age: 0)\n    @name = name\n    @age = age\n  end\n\n  def adult?\n    @age >= 18\n  end\nend\n\nu = User.new(name: \"Alice\", age: 20)\nu.name           #=> \"Alice\"\nu.adult?         #=> true",
            language: "ruby",
            notes: [
              "attr_accessor は getter/setter を生成するマクロ。読み取り専用なら attr_reader、書き込み専用なら attr_writer",
            ],
          },
          {
            heading: "3.2 Module による Mixin",
            body: "Ruby は単一継承だが、Module を include することで複数の振る舞いを混ぜ込める (Mixin)。Comparable / Enumerable などの標準モジュールが代表例。",
            code: "module Greetable\n  def greet\n    \"Hello, #{name}!\"\n  end\nend\n\nclass User\n  include Greetable\n  attr_reader :name\n  def initialize(name); @name = name; end\nend\n\nUser.new(\"Alice\").greet   #=> \"Hello, Alice!\"\n\n# 標準 Comparable: <=> を定義すれば < <= == >= > が自動で得られる\nclass Version\n  include Comparable\n  attr_reader :major, :minor\n  def initialize(s); @major, @minor = s.split('.').map(&:to_i); end\n  def <=>(other); [major, minor] <=> [other.major, other.minor]; end\nend",
            language: "ruby",
            notes: [
              "include はインスタンスメソッドに、extend はクラスメソッド (特異メソッド) に、prepend は元のメソッドより前 (super で元を呼べる) に挿入",
              "Rails の Concern は `extend ActiveSupport::Concern` で書く慣習化された Mixin パターン",
            ],
          },
          {
            heading: "3.3 可視性: public / private / protected",
            body: "デフォルトは public。private はレシーバ無しでのみ呼べる、protected は同クラス・サブクラスの他インスタンスからレシーバ付きで呼べる、という違いがある。",
            code: "class User\n  def public_action\n    do_secret_work\n  end\n\n  private\n\n  def do_secret_work\n    # User インスタンス内部からのみ呼べる\n  end\nend\n\nUser.new.public_action     # OK\nUser.new.do_secret_work    # NoMethodError",
            language: "ruby",
            notes: [
              "Ruby の private は他言語と意味が違う: 『明示的レシーバ (self を含む) では呼べない』だけ。サブクラスからは呼べる",
              "send を使うと private も呼べてしまう。意図しない外部呼び出しを防ぐには public_send を使う",
            ],
          },
        ],
        keyTakeaways: [
          "attr_accessor / attr_reader / attr_writer で getter/setter を一括宣言",
          "Module の include で複数の振る舞いを Mixin。継承の深いツリーを避ける",
          "private はレシーバ無し呼び出しの制約。完全な隠蔽ではない",
        ],
        comprehensionQuestionIds: ["oop-001", "oop-005", "oop-006", "rb-044"],
      },
      {
        id: "exceptions",
        title: "4. 例外処理 — raise / rescue / ensure を使いこなす",
        intro:
          "Ruby の例外階層と begin/rescue/ensure/retry。Exception を直接 rescue しないという鉄則と、例外の使いどころ・避けどころ。",
        readingMinutes: 8,
        objectives: [
          "Exception / StandardError / カスタム例外の階層関係を理解する",
          "begin / rescue / else / ensure / retry の役割を区別できる",
          "『何を raise するか』『何を rescue するか』の設計判断ができる",
        ],
        references: [
          {
            label: "Ruby 公式: 例外処理",
            url: "https://docs.ruby-lang.org/ja/latest/doc/spec=2fcontrol.html#begin",
          },
          {
            label: "Ruby 公式: Exception クラス",
            url: "https://docs.ruby-lang.org/ja/latest/class/Exception.html",
          },
        ],
        sections: [
          {
            heading: "4.1 例外階層 — StandardError を捕まえる",
            body:
              "Ruby の例外は Exception を頂点としたツリー構造。アプリで rescue するべきは StandardError とその子。`SystemExit` (exit 呼び出し) や `Interrupt` (Ctrl-C) も Exception の子だが、これらを rescue するとアプリが止まらなくなる。`rescue` (クラス省略) は暗黙的に `rescue StandardError` を意味するので、こちらを使うのが安全。",
            code:
              "# 階層 (主要なもの)\n# Exception\n#   ├── SystemExit         (exit したとき)\n#   ├── Interrupt          (Ctrl-C)\n#   ├── NoMemoryError\n#   └── StandardError      ← アプリで rescue すべきはここ以下\n#         ├── ArgumentError\n#         ├── TypeError\n#         ├── ZeroDivisionError\n#         └── RuntimeError ← raise '...' のデフォルト\n\nbegin\n  do_something\nrescue ArgumentError => e   # 特定例外\n  log(e)\nrescue => e                  # = StandardError 全般\n  notify(e)\nend\n\n# ❌ 絶対避ける: SystemExit や Interrupt まで握る\nbegin\n  do_something\nrescue Exception => e\n  ...\nend",
            language: "ruby",
            notes: [
              "アプリ用のカスタム例外は必ず `class MyError < StandardError; end` で定義する",
              "rescue 句の評価順は『上から最初にマッチしたもの』。specific を上、汎用を下に",
            ],
          },
          {
            heading: "4.2 ensure / else / retry — 制御フローの脇役たち",
            body:
              "`ensure` は『正常終了でも例外発生でも必ず実行』(他言語の finally)。`else` は『正常終了したときだけ実行』(rescue されなかった時)。`retry` は rescue 節で『begin 節をもう一度試す』。リトライ回数を制限しないと無限ループになるので、必ずカウンタを付ける。",
            code:
              "# ファイルクローズの定型 (ブロック付き File.open なら ensure 不要)\nf = File.open('data.txt')\nbegin\n  process(f)\nrescue => e\n  log(e)\nelse\n  puts '正常終了'  # 例外なし時のみ\nensure\n  f.close   # 例外有無に関わらず必ず\nend\n\n# リトライ (上限付き)\nattempts = 0\nbegin\n  attempts += 1\n  call_external_api\nrescue Net::OpenTimeout\n  retry if attempts < 3\n  raise\nend",
            language: "ruby",
            notes: [
              "ensure 内で return すると外側の戻り値が上書きされる。純粋なクリーンアップのみに留める",
              "retry を使うときは必ずリトライ上限を設定。ActiveJob の `retry_on` などフレームワーク機能も検討",
            ],
          },
          {
            heading: "4.3 例外の設計 — 何を raise すべきか",
            body:
              "例外は『想定外の状況』を呼び出し元に伝える仕組み。バリデーションエラーのような『想定内』は戻り値 (Result オブジェクト) で扱う方が読みやすい場面も多い。Rails の `save` / `save!` の使い分けがその例。自作の例外クラスはエラー種別を語る命名 (`PaymentFailedError`, `InvalidStateError`) にし、StandardError を継承する。",
            code:
              "# カスタム例外定義\nclass PaymentError < StandardError; end\nclass InsufficientFundsError < PaymentError; end\n\n# 呼び出し側でクラスごとに分岐\nbegin\n  charge!\nrescue InsufficientFundsError\n  redirect_to top_up_path\nrescue PaymentError => e\n  notify_admin(e)\n  render :failed\nend\n\n# 例外チェーン (Ruby 2.1+)\nbegin\n  external_api\nrescue OriginalError => e\n  raise MyWrapperError, '失敗', cause: e   # e が e.cause として保持\nend",
            language: "ruby",
            notes: [
              "raise の引数は『例外クラス』『メッセージ』『cause』。`raise 'msg'` は RuntimeError の短縮形",
              "Rails の rescue_from でコントローラ全体の例外を共通ハンドリングできる",
            ],
          },
        ],
        keyTakeaways: [
          "rescue (クラス省略) は StandardError とその子だけを捕まえる。Exception を直接 rescue しない",
          "ensure は必ず実行されるリソース解放枠。return / raise を書くと挙動が壊れるので避ける",
          "想定内のエラーは戻り値 (Result/Form Object)、想定外は例外、と使い分ける",
        ],
        comprehensionQuestionIds: ["rb-027", "rb-028", "adv-003", "adv-004"],
      },
      {
        id: "metaprogramming",
        title: "5. メタプログラミング入門 — Ruby らしい『動的さ』を味方に",
        intro:
          "define_method / method_missing / instance_eval などの基本道具と、それらが Rails の DSL の裏でどう使われているかを理解する。",
        readingMinutes: 9,
        objectives: [
          "define_method と def の違い (クロージャ vs スコープゲート) を理解する",
          "method_missing + respond_to_missing? の組み合わせを書ける",
          "モンキーパッチ / prepend / Refinements の使い分けを判断できる",
        ],
        references: [
          {
            label: "Ruby 公式: Module#define_method",
            url: "https://docs.ruby-lang.org/ja/latest/method/Module/i/define_method.html",
          },
          {
            label: "Metaprogramming Ruby (Paolo Perrotta) — 定番書籍",
            url: "https://pragprog.com/titles/ppmetr2/metaprogramming-ruby-2/",
          },
        ],
        sections: [
          {
            heading: "5.1 define_method — 動的に getter/setter を作る",
            body:
              "`def` は新しいスコープを作るため、ループ変数を捕捉できない。`define_method` はブロックを受け取るのでクロージャとして動き、周囲の変数を捕捉できる。attr_accessor の自前実装が好例。",
            code:
              "class User\n  [:name, :email, :age].each do |attr|\n    define_method(attr) do\n      instance_variable_get(\"@#{attr}\")\n    end\n    define_method(\"#{attr}=\") do |val|\n      instance_variable_set(\"@#{attr}\", val)\n    end\n  end\nend\n# attr_accessor :name, :email, :age と同等",
            language: "ruby",
            notes: [
              "Rails の attr_accessor / scope / validates も内部で define_method を多用",
              "動的定義しすぎると IDE 補完が効かない。本当に動的にする必要があるかを毎回問う",
            ],
          },
          {
            heading: "5.2 method_missing — 未定義メソッドを動的にハンドル",
            body:
              "オブジェクトに存在しないメソッドが呼ばれると最後に method_missing が呼ばれる。これを override すれば『動的にメソッドを生やす』ことができる。ActiveRecord の `find_by_email` や OpenStruct の正体。`respond_to_missing?` も必ずセットで定義する (`respond_to?` が嘘をつかないように)。",
            code:
              "class Proxy\n  def initialize(target); @target = target; end\n\n  def method_missing(name, *args, &blk)\n    if @target.respond_to?(name)\n      @target.public_send(name, *args, &blk)\n    else\n      super\n    end\n  end\n\n  def respond_to_missing?(name, include_private = false)\n    @target.respond_to?(name, include_private) || super\n  end\nend\n\nProxy.new([1, 2, 3]).length   #=> 3 (Array に委譲)",
            language: "ruby",
            notes: [
              "method_missing は通常メソッドより遅い。頻繁に呼ばれるなら define_method で事前生成する",
              "respond_to_missing? を忘れると Duck Typing で『振る舞いがあるか』をチェックするコードが壊れる",
            ],
          },
          {
            heading: "5.3 オープンクラス vs Refinements",
            body:
              "Ruby はクラスをいつでも再オープン可能 (Open Class)。標準ライブラリを拡張する『モンキーパッチ』が書けるが、グローバルに影響するため他 gem との衝突リスクがある。`prepend` で super 経由のラップに、`Refinements (refine + using)` でスコープを限定するのが安全。",
            code:
              "# ❌ グローバル: アプリ全体で String#shout が有効に\nclass String\n  def shout; upcase + '!!'; end\nend\n\n# ✅ Refinements: using を書いたスコープだけで有効\nmodule StringExt\n  refine String do\n    def shout; upcase + '!!'; end\n  end\nend\n\nclass MyClass\n  using StringExt\n  def call\n    'hello'.shout   # ここでだけ shout が呼べる\n  end\nend\n'hello'.shout       # NoMethodError (スコープ外)",
            language: "ruby",
            notes: [
              "Rails の ActiveSupport は歴史的に多数のモンキーパッチを当てているが、現代の gem では Refinements を選ぶケースが増えている",
              "prepend は『元メソッドを super で呼べる形でラップ』する用途 (計装、ロギング)",
            ],
          },
        ],
        keyTakeaways: [
          "define_method はクロージャ。def では捕捉できない外側の変数を持ち回せる",
          "method_missing と respond_to_missing? は必ずセット。Duck Typing が壊れないように",
          "標準ライブラリの拡張は Refinements か別オブジェクト (Decorator) で局所化する",
        ],
        comprehensionQuestionIds: ["adv-006", "adv-007", "adv-012", "adv-020"],
      },
      {
        id: "testing",
        title: "6. テストと TDD — Minitest と RSpec、Mock/Stub の基本",
        intro:
          "Ruby 標準の Minitest と業界標準の RSpec、Red-Green-Refactor の TDD サイクル、Mock/Stub の使い分け。",
        readingMinutes: 9,
        objectives: [
          "Minitest と RSpec の構文の違いと使い分けを理解する",
          "Red → Green → Refactor の 3 ステップを意識して 1 機能を書ける",
          "Mock と Stub の違いを説明し、過剰なモックを避けられる",
        ],
        references: [
          {
            label: "RSpec Rails (公式)",
            url: "https://github.com/rspec/rspec-rails",
          },
          {
            label: "Better Specs (RSpec ベストプラクティス)",
            url: "https://www.betterspecs.org/",
          },
        ],
        sections: [
          {
            heading: "6.1 Minitest と RSpec — 二大テストフレームワーク",
            body:
              "Minitest は Ruby 標準で軽量・高速。RSpec は読みやすい DSL (describe/it) と豊富なマッチャーで Rails コミュニティで圧倒的シェア。新規プロジェクトは RSpec が多数派だが、Rails 公式は Minitest を推奨している点も知っておく。",
            code:
              "# Minitest\nrequire 'minitest/autorun'\n\nclass CalculatorTest < Minitest::Test\n  def test_addition\n    assert_equal 5, Calculator.add(2, 3)\n  end\nend\n\n# RSpec\nrequire 'spec_helper'\n\nRSpec.describe Calculator do\n  describe '.add' do\n    it 'returns the sum of two numbers' do\n      expect(Calculator.add(2, 3)).to eq 5\n    end\n  end\nend",
            language: "ruby",
            notes: [
              "Minitest は速度・依存の少なさが強み。Rails コミュニティの多数派は RSpec",
              "Better Specs はチェックリストとして有用 (1 it 1 expect, let の使い方など)",
            ],
          },
          {
            heading: "6.2 TDD のサイクル — Red / Green / Refactor",
            body:
              "1. **Red**: まず失敗するテストを書く (機能はまだ無いので赤になる) \n2. **Green**: 最小限の実装でテストを通す (汚くてもいい) \n3. **Refactor**: テストが通る状態を保ったままコードを綺麗にする\nこのサイクルを 5〜15 分で回す。テストが要件のドキュメントになり、設計の壊れも早く検知できる。",
            code:
              "# 例: Fizz の実装を TDD で\n# Step 1: Red (まだ Calculator.fizz が無いので失敗する)\nit 'returns Fizz when divisible by 3' do\n  expect(FizzBuzz.call(3)).to eq 'Fizz'\nend\n\n# Step 2: Green (とりあえず通す)\nclass FizzBuzz\n  def self.call(n)\n    'Fizz' if n % 3 == 0\n  end\nend\n\n# Step 3: Refactor (テストが通ったまま設計を改善)\nclass FizzBuzz\n  RULES = { 3 => 'Fizz', 5 => 'Buzz' }.freeze\n  def self.call(n)\n    RULES.map { |k, v| v if n % k == 0 }.compact.join.presence || n.to_s\n  end\nend",
            language: "ruby",
            notes: [
              "リファクタリングはテストが緑のまま行うのが原則。緑じゃなくなったらすぐ戻す",
              "TDD は速いフィードバックループが目的。1 サイクル 15 分以上かかったら粒度が大きすぎる",
            ],
          },
          {
            heading: "6.3 Mock と Stub — 過剰モックの罠",
            body:
              "**Stub**: 『メソッドの戻り値を差し替える』 — 入力に対する出力を固定する。\n**Mock**: 『メソッドが呼ばれることを期待する』 — 副作用 (DB 書込み、メール送信) の検証。\nDouble (= Test Double) という総称が両方を指す。**過剰なモック**は『テストは通るが本物は動かない』状態を生むので、外部 I/O (API / メール) はモック、純粋ロジックはモックせず実物を使うのが原則。",
            code:
              "# Stub: 戻り値の差し替え\nallow(Time).to receive(:current).and_return(Time.new(2026, 1, 1))\n\n# Mock: 呼び出されることを期待\nexpect(NotifyMailer).to receive(:welcome).with(user).and_call_original\n\n# instance_double で型安全な double\nuser = instance_double(User, name: 'Alice', admin?: true)\nexpect(user.name).to eq 'Alice'",
            language: "ruby",
            notes: [
              "instance_double / class_double は本物のクラスに存在するメソッドだけ stub 可能。本物がリネームされた時テストが壊れて気付ける",
              "過剰モックの兆候: テストの 80% が allow/expect で埋まっている → 設計を見直す",
            ],
          },
        ],
        keyTakeaways: [
          "RSpec が主流だが Minitest も実用十分。プロジェクトのスタイルガイドに従う",
          "TDD は Red → Green → Refactor の高速ループ。1 サイクル 15 分以下が目安",
          "外部 I/O はモック、純粋ロジックはモックしない。instance_double で型安全に",
        ],
        comprehensionQuestionIds: ["pr-001", "pr-007"],
      },
      {
        id: "gems-and-bundler",
        title: "7. Gem と Bundler — 依存関係を管理する",
        intro:
          "Gemfile / Gemfile.lock の役割、bundle update の安全な使い方、gem の作成と公開の基礎。",
        readingMinutes: 8,
        objectives: [
          "Gemfile / Gemfile.lock の役割と『なぜ両方コミットするか』を理解する",
          "bundle install / update / outdated の挙動を区別できる",
          "簡単な gem を作って rubygems.org に公開できる手順を知る",
        ],
        references: [
          {
            label: "Bundler 公式",
            url: "https://bundler.io/",
          },
          {
            label: "RubyGems Guides",
            url: "https://guides.rubygems.org/",
          },
        ],
        sections: [
          {
            heading: "7.1 Gemfile と Gemfile.lock",
            body:
              "Gemfile は『欲しい gem の宣言』。Gemfile.lock は『bundle install で確定した実際のバージョン』。両方コミットすることで『チーム全員が同じバージョンで動く』を保証する。本番デプロイでも `bundle install --deployment` で Gemfile.lock 通りにインストールするのが定石。",
            code:
              "# Gemfile\nsource 'https://rubygems.org'\n\nruby '3.3.0'\n\ngem 'rails', '~> 7.1.0'      # 7.1.x の最新まで OK、7.2 は不可\ngem 'pg', '>= 1.5'\ngem 'puma'\n\ngroup :development, :test do\n  gem 'rspec-rails'\n  gem 'factory_bot_rails'\nend\n\n# 開発者ローカルでだけ使う gem\ngroup :development do\n  gem 'bullet'\n  gem 'rubocop', require: false\nend",
            language: "ruby",
            notes: [
              "`~> 7.1.0` は『7.1.x の最新まで』(pessimistic version constraint)。バージョン更新の安全マージン",
              "`gem '...', github: 'user/repo'` で GitHub から直接読み込めるが、本番では版を固定する",
            ],
          },
          {
            heading: "7.2 bundle install / update / outdated",
            body:
              "**install**: Gemfile.lock があればそれを再現、無ければ Gemfile から解決して .lock を作る。\n**update**: 指定 gem (省略時は全部) を Gemfile.lock を無視して最新化。\n**outdated**: 古い gem を一覧表示するだけ。\n本番の手順: ローカルで `bundle update rails` → テスト → 通れば Gemfile.lock を commit → デプロイ。**未指定の `bundle update` は危険** (全 gem が動く)。",
            code:
              "$ bundle install         # Gemfile.lock 通りに揃える (初回 / CI)\n$ bundle outdated        # 古い gem を確認\n$ bundle update rails    # rails 関連だけ最新化\n$ bundle exec rspec      # bundle 経由で実行 (バージョン固定)",
            language: "bash",
            notes: [
              "本番デプロイ前は必ず `bundle install --deployment --without development test` で本番だけのインストール",
              "セキュリティ更新は `bundle audit` (bundler-audit gem) で脆弱性チェック",
            ],
          },
          {
            heading: "7.3 自作 gem の最小構成",
            body:
              "`bundle gem my_gem` でひな形を生成。lib/ に実装、my_gem.gemspec にメタデータ、README + LICENSE + テストを揃えれば最小構成は完成。`gem build` でパッケージ、`gem push` で rubygems.org に公開。社内 gem なら private な gem server (geminabox / Gemfury) を使う。",
            code:
              "$ bundle gem my_helper\n$ cd my_helper\n# lib/my_helper.rb を実装\n# my_helper.gemspec の TODO を埋める\n$ rake spec        # テスト\n$ gem build my_helper.gemspec\n$ gem push my_helper-0.1.0.gem   # rubygems.org に公開",
            language: "bash",
            notes: [
              "gemspec の license / homepage / source_code_uri は省略しない (rubygems で警告)",
              "Semantic Versioning (semver) に従い破壊的変更でメジャーを上げる",
            ],
          },
        ],
        keyTakeaways: [
          "Gemfile.lock も必ずコミット。チーム全員 + 本番で同じバージョンを再現するため",
          "`bundle update` (引数なし) は地雷。具体的に gem 名を指定する",
          "自作 gem は bundle gem でひな形 → semver で公開",
        ],
        comprehensionQuestionIds: ["rails-007", "rails-010"],
      },
    ],
  },

  // ---------- JavaScript 入門ガイド ----------
  {
    id: "javascript-intro",
    trackId: "javascript",
    title: "Modern JavaScript — ES2015+ の地図",
    subtitle:
      "MDN 公式 + You Don't Know JS のエッセンスを 7 章に。値とスコープ → 関数 → 非同期 → 配列 → OOP → ESM → TypeScript への橋渡し",
    audience:
      "JavaScript を体系的に学び直したい人、フロントエンド/Node に入りたい人",
    sources: [
      { label: "MDN Web Docs (JavaScript)", url: "https://developer.mozilla.org/ja/docs/Web/JavaScript" },
      { label: "TC39 ECMAScript 仕様", url: "https://tc39.es/ecma262/" },
    ],
    emoji: "🟨",
    relatedCategoryIds: ["js-basics", "js-functions", "js-async"],
    chapters: [
      {
        id: "values-and-scopes",
        title: "1. 値とスコープ — 変数宣言の三択",
        intro:
          "let / const / var の違い、プリミティブと参照、truthy / falsy の罠を整理する。",
        readingMinutes: 6,
        objectives: [
          "let / const / var のスコープと再代入可否を区別できる",
          "プリミティブと参照型のコピー挙動の違いを説明できる",
          "==/=== の差、falsy 値、Nullish Coalescing (??) を使い分けられる",
        ],
        sections: [
          {
            heading: "1.1 let / const / var",
            body: "現代の JS では基本 const、再代入が必要なら let、var は使わない。var には『ホイスト + 関数スコープ』という古い癖があり、ループ内で罠が起きやすい。",
            code: "// var の罠: ループ後も生存\nfor (var i = 0; i < 3; i++) {}\nconsole.log(i)        // 3\n\n// let はブロックスコープ\nfor (let j = 0; j < 3; j++) {}\nconsole.log(j)        // ReferenceError\n\n// const は再代入不可だが、中身は変更可\nconst arr = [1, 2]\narr.push(3)           // OK\narr = [4]             // TypeError",
            language: "javascript",
            notes: [
              "const のオブジェクトの中身を完全に固定したいなら `Object.freeze(obj)`",
              "var はモダンコードベースでは出てこないので使わない",
            ],
          },
          {
            heading: "1.2 プリミティブと参照",
            body: "number / string / boolean / null / undefined / symbol / bigint はプリミティブで値コピー。object / array / function は参照型で代入は参照コピー。これが React の『state を直接 mutate しない』ルールの根拠でもある。",
            code: "// プリミティブ: 値コピー\nlet a = 1\nlet b = a\nb = 99\nconsole.log(a)        // 1\n\n// オブジェクト: 参照コピー\nconst x = { n: 1 }\nconst y = x\ny.n = 99\nconsole.log(x.n)      // 99\n\n// 浅いコピー\nconst z = { ...x }\n// 深いコピー\nconst deep = structuredClone(x)",
            language: "javascript",
            notes: [
              "structuredClone は ES2022+ の標準。古いブラウザ向けは JSON.parse(JSON.stringify(obj)) で代替",
            ],
          },
          {
            heading: "1.3 真偽値・== の罠・??",
            body: "JS の falsy は false / 0 / '' / null / undefined / NaN / 0n。`==` は緩い比較で罠が多いので `===` を使う。`??` (Nullish Coalescing) は null / undefined だけで右辺を採用 (`||` と違い 0 や '' を保持)。",
            code: "// falsy\nBoolean(0)            // false\nBoolean('')           // false\nBoolean([])           // true (空配列は truthy!)\nBoolean({})           // true\n\n// == の罠\n0 == false            // true\n'' == false           // true\nnull == undefined     // true\n\n// === を使う\n0 === false           // false\n\n// ??\nconst port = process.env.PORT ?? 3000   // PORT が 0 だったら 0 を採用\nconst port2 = process.env.PORT || 3000  // 0 は falsy なので 3000 になる罠",
            language: "javascript",
            notes: [
              "Ruby と違って JS では空配列 [] / 空オブジェクト {} は truthy",
              "?? + ?. (Optional Chaining) の組合せが nil 安全の現代形",
            ],
          },
        ],
        keyTakeaways: [
          "基本 const、再代入は let、var は禁止級",
          "オブジェクトの代入は参照コピー。複製は { ...obj } / structuredClone(obj)",
          "比較は === 一択。デフォルト値は || ではなく ?? を使う",
        ],
        comprehensionQuestionIds: ["js-002", "js-003", "js-004", "js-007", "js-011"],
      },
      {
        id: "functions-and-closures",
        title: "2. 関数 — クロージャと this の整理",
        intro:
          "アロー関数と通常関数の違い、クロージャの仕組み、this のスコープを押さえる。",
        readingMinutes: 7,
        objectives: [
          "アロー関数 / 通常関数の this の違いを説明できる",
          "クロージャ (関数が定義時の変数を覚えている性質) を理解する",
          "高階関数 / map / filter / reduce を使いこなす",
        ],
        sections: [
          {
            heading: "2.1 関数の 2 種類",
            body: "function 宣言は this を持つ、アロー関数 (=>) は this を外側のスコープから継承する。コールバック内で this を保ちたい時はアロー関数、オブジェクトのメソッドとしては通常関数を使う。",
            code: "// 通常関数: this はレシーバ\nconst obj = {\n  name: 'A',\n  greet() { return `hi, ${this.name}` }\n}\nobj.greet()           // 'hi, A'\n\n// アロー: this は定義時の外側\nclass Timer {\n  constructor() { this.n = 0 }\n  start() {\n    setInterval(() => { this.n++ }, 1000)   // this = Timer\n  }\n}\n\n// 注意: オブジェクトメソッドにアローを使うと this が undefined / window\nconst bad = {\n  name: 'A',\n  greet: () => `hi, ${this.name}`   // this は外側 (= undefined)\n}",
            language: "javascript",
          },
          {
            heading: "2.2 クロージャ",
            body: "クロージャ = 関数 + その関数が定義された時のスコープ。これにより『private な値を持つ関数』『カウンタ』『メモ化』などが書ける。React の useState の内部実装もクロージャ。",
            code: "function makeCounter() {\n  let count = 0\n  return () => ++count\n}\n\nconst c = makeCounter()\nc()    // 1\nc()    // 2\nc()    // 3\n// count は外側のローカル変数だが、返した関数が捕捉して保持",
            language: "javascript",
          },
          {
            heading: "2.3 高階関数 (map / filter / reduce)",
            body: "JS の Array には map / filter / reduce / some / every / find などの高階関数が標準装備。これらをチェインすると宣言的にデータ変換を書ける。",
            code: "const users = [\n  { name: 'A', age: 20, active: true },\n  { name: 'B', age: 30, active: false },\n  { name: 'C', age: 25, active: true }\n]\n\n// アクティブユーザーの平均年齢\nconst activeAges = users.filter(u => u.active).map(u => u.age)\nconst avg = activeAges.reduce((a, b) => a + b, 0) / activeAges.length\n\n// 一行で sum + count\nconst { total, count } = users\n  .filter(u => u.active)\n  .reduce((acc, u) => ({\n    total: acc.total + u.age,\n    count: acc.count + 1\n  }), { total: 0, count: 0 })",
            language: "javascript",
            notes: [
              "破壊的: push, pop, shift, unshift, splice, sort, reverse",
              "非破壊的: map, filter, slice, concat, flat, flatMap (ほぼ全て)",
              "sort や reverse でコピーが欲しい時は [...arr].sort() で先にコピー",
            ],
          },
        ],
        keyTakeaways: [
          "this を継承したい (コールバック内など) ならアロー関数、レシーバとして this を使うなら通常関数",
          "クロージャで private 状態を保持できる。React Hook の内部も同じ原理",
          "map / filter / reduce のチェインで宣言的にデータ変換を書く",
        ],
        comprehensionQuestionIds: [
          "jsf-001",
          "jsf-002",
          "jsf-003",
          "jsf-007",
          "jsf-008",
        ],
      },
      {
        id: "async-and-promise",
        title: "3. 非同期処理 — Promise / async-await / Event Loop",
        intro:
          "JS はシングルスレッド + Event Loop。非同期処理を正しく扱うには Promise と async/await の理解が必須。",
        readingMinutes: 7,
        objectives: [
          "Promise の状態 (pending / fulfilled / rejected) と then/catch チェインを理解する",
          "async / await の意味と try/catch でのエラーハンドリングを使える",
          "Promise.all / allSettled / race / any の使い分けができる",
        ],
        sections: [
          {
            heading: "3.1 Promise の基本",
            body: "Promise は『将来の値を表すオブジェクト』。pending → fulfilled / rejected の 3 状態。.then で成功、.catch で失敗をハンドル。fetch の戻り値は Promise。",
            code: "fetch('/api/users')\n  .then(res => res.json())\n  .then(users => console.log(users))\n  .catch(err => console.error(err))\n\n// 自前で Promise を作る\nfunction wait(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms))\n}\n\nawait wait(1000)   // 1 秒待つ",
            language: "javascript",
            notes: [
              "fetch は 404 / 500 でも reject しない (ok チェック必須)",
              "Promise はチェイン可能。前段の戻り値が次段の引数",
            ],
          },
          {
            heading: "3.2 async / await",
            body: "async 関数は常に Promise を返す。中で await を使うと『その Promise が解決するまで関数の実行を中断』する糖衣構文。try / catch でエラーハンドル。",
            code: "async function loadUser(id) {\n  try {\n    const res = await fetch(`/api/users/${id}`)\n    if (!res.ok) throw new Error(`HTTP ${res.status}`)\n    return await res.json()\n  } catch (err) {\n    console.error('failed:', err)\n    return null\n  }\n}\n\n// 直列 vs 並列\n// ❌ 遅い (直列)\nconst a = await fetchA()\nconst b = await fetchB()\n\n// ✅ 速い (並列)\nconst [a, b] = await Promise.all([fetchA(), fetchB()])",
            language: "javascript",
          },
          {
            heading: "3.3 Event Loop と実行順",
            body: "JS はシングルスレッド。同期コード → マイクロタスク (Promise.then / queueMicrotask) → マクロタスク (setTimeout / setInterval) の順で処理される。これを理解するとデバッグが楽になる。",
            code: "console.log('1')\nsetTimeout(() => console.log('2'), 0)\nPromise.resolve().then(() => console.log('3'))\nconsole.log('4')\n// 出力: 1 → 4 → 3 → 2\n// (同期 → マイクロタスク → マクロタスク)",
            language: "javascript",
            notes: [
              "Promise.all: 1 つでも失敗で全体失敗",
              "Promise.allSettled: 全結果を { status, value/reason } で返す (部分失敗を許容)",
              "Promise.race: 最初に決定 (成否どちらでも) した結果",
              "Promise.any: 最初に成功した結果。全部失敗で AggregateError",
            ],
          },
        ],
        keyTakeaways: [
          "Promise は将来の値。fetch の戻り値が代表例",
          "async/await は Promise の糖衣構文。try/catch でエラー処理",
          "並列にできるものは Promise.all、失敗許容なら allSettled",
        ],
        comprehensionQuestionIds: ["jsa-001", "jsa-002", "jsa-003", "jsa-007"],
      },
      {
        id: "arrays-and-iteration",
        title: "4. 配列とイテレーション — map / filter / reduce と Spread",
        intro:
          "MDN 標準の Array メソッドを実例で。for ループより宣言的に書く感覚と、Spread / Rest で配列を扱うイディオム。",
        readingMinutes: 7,
        objectives: [
          "map / filter / reduce / find / some / every を使い分けられる",
          "Spread (...) と Rest (...) の文脈による意味の違いを説明できる",
          "for...of と for...in の違いを理解する",
        ],
        references: [
          {
            label: "MDN: Array (配列)",
            url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array",
          },
        ],
        sections: [
          {
            heading: "4.1 map / filter / reduce の 3 本柱",
            body:
              "JavaScript の Array は『非破壊的な変換系メソッド』を豊富に持つ。`map` は要素変換 (要素数同じ)、`filter` は絞り込み (要素数減る)、`reduce` は畳み込み (1 つの値に集約)。チェーン可能で関数型スタイルが書ける。",
            code:
              "const nums = [1, 2, 3, 4, 5];\n\n// map: 全要素を変換\nnums.map(n => n * 2);\n// → [2, 4, 6, 8, 10]\n\n// filter: 条件で絞り込み\nnums.filter(n => n % 2 === 0);\n// → [2, 4]\n\n// reduce: 初期値 + 累積\nnums.reduce((acc, n) => acc + n, 0);\n// → 15\n\n// チェーン (偶数の二乗の合計)\nnums\n  .filter(n => n % 2 === 0)\n  .map(n => n * n)\n  .reduce((a, b) => a + b, 0);\n// → 4 + 16 = 20",
            language: "javascript",
            notes: [
              "map / filter は新しい配列を返す (非破壊)。元配列は変わらない",
              "Array.prototype.forEach は副作用専用 (戻り値 undefined)。値を返したいなら map",
              "find / some / every は条件評価系。find は最初の要素、some は『どれか true』、every は『全部 true』",
            ],
          },
          {
            heading: "4.2 Spread (...) と Rest (...) — 同じ記号、違う意味",
            body:
              "`...` は文脈で意味が変わる。**展開** (Spread) は『配列/オブジェクトをばらす』、**集約** (Rest) は『複数を 1 つの配列にまとめる』。関数引数の前後で見分ける癖を付ける。",
            code:
              "// Spread: 配列を展開\nconst a = [1, 2, 3];\nconst b = [...a, 4, 5];           // [1, 2, 3, 4, 5]\nconsole.log(Math.max(...a));      // 3 (関数呼び出しに展開)\n\n// オブジェクトの Spread (シャローコピー + 上書き)\nconst u = { name: 'Alice', age: 20 };\nconst v = { ...u, age: 21 };       // { name: 'Alice', age: 21 }\n\n// Rest: 残り引数を配列にまとめる\nfunction sum(first, ...rest) {\n  return first + rest.reduce((a, b) => a + b, 0);\n}\nsum(1, 2, 3, 4);                   // 10\n\n// 分割代入の Rest\nconst [head, ...tail] = [1, 2, 3, 4];\n// head = 1, tail = [2, 3, 4]",
            language: "javascript",
            notes: [
              "Spread は浅いコピーのみ。ネストオブジェクトは参照を共有する (深いコピーは structuredClone)",
              "Rest 引数は最後でしか使えない (function f(...rest, last) は構文エラー)",
            ],
          },
          {
            heading: "4.3 for...of / for...in / forEach の使い分け",
            body:
              "`for...of` は **値** を順に取り出す (配列・Map・Set・Generator など Iterable に使う)。`for...in` は **キー (プロパティ名)** を返す (主にオブジェクト用)。`forEach` は配列専用で副作用向き。配列処理では原則 `for...of` か関数型メソッド (map/filter/reduce) を使う。",
            code:
              "const arr = ['a', 'b', 'c'];\n\nfor (const value of arr) {\n  console.log(value);              // 'a', 'b', 'c'\n}\n\n// インデックスも欲しいなら entries()\nfor (const [i, value] of arr.entries()) {\n  console.log(i, value);            // 0 'a', 1 'b', ...\n}\n\nconst obj = { name: 'Alice', age: 20 };\nfor (const key in obj) {\n  console.log(key, obj[key]);       // name Alice, age 20\n}\n\n// Object のキー/値を扱う関数型 API\nObject.keys(obj);                   // ['name', 'age']\nObject.values(obj);                 // ['Alice', 20]\nObject.entries(obj);                // [['name', 'Alice'], ['age', 20]]",
            language: "javascript",
            notes: [
              "for...in は配列にも使えるが、prototype のプロパティも列挙して罠が多いので避ける",
              "非同期 for...await...of で async iterable を順に await できる",
            ],
          },
        ],
        keyTakeaways: [
          "map / filter / reduce で宣言的に書く。for ループに頼らない",
          "Spread / Rest は同じ ... でも『展開』『集約』の役割が逆。文脈で読む",
          "値を回すなら for...of。キーが欲しいなら Object.entries。配列の for...in は罠",
        ],
        comprehensionQuestionIds: ["js-007", "js-011"],
      },
      {
        id: "objects-and-classes",
        title: "5. オブジェクトとクラス — リテラルから class 構文 + プロトタイプ",
        intro:
          "JS のオブジェクトリテラル、class 構文、プロトタイプチェーン、継承の整理。Ruby のクラスとの違いも対比。",
        readingMinutes: 8,
        objectives: [
          "オブジェクトリテラルとクラス構文の関係を理解する",
          "プロトタイプチェーンが『継承の正体』であることを説明できる",
          "extends / super / static / private (#) の使い方を区別できる",
        ],
        references: [
          {
            label: "MDN: クラス (Classes)",
            url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes",
          },
          {
            label: "MDN: 継承とプロトタイプチェーン",
            url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Inheritance_and_the_prototype_chain",
          },
        ],
        sections: [
          {
            heading: "5.1 オブジェクトリテラル — 軽量な値の入れ物",
            body:
              "JS は『オブジェクトは Hash みたいなもの』で、リテラルが軽量。プロパティの短縮構文、計算プロパティ名、メソッド短縮形などモダン JS の便利機能が揃う。",
            code:
              "// プロパティ短縮 (変数名と同じならキー省略)\nconst name = 'Alice';\nconst age = 20;\nconst user = { name, age };\n// = { name: name, age: age }\n\n// メソッド短縮\nconst api = {\n  url: 'https://example.com',\n  fetch() {        // function キーワード省略\n    return fetch(this.url);\n  },\n};\n\n// 計算プロパティ名\nconst key = 'role';\nconst data = { [key]: 'admin', [`${key}Id`]: 1 };\n// { role: 'admin', roleId: 1 }\n\n// 分割代入で取り出し\nconst { name: userName, age: userAge = 0 } = user;\n// userName = 'Alice', userAge = 20",
            language: "javascript",
            notes: [
              "オブジェクトリテラル `{}` は『新しいオブジェクトを毎回作る』。useMemo などで参照同一性が重要な React の文脈で罠になる",
              "分割代入のデフォルト値 (`age = 0`) は値が undefined のときだけ発動。null には反応しない",
            ],
          },
          {
            heading: "5.2 class 構文 — シンタックスシュガーだが読みやすい",
            body:
              "ES2015 で導入された class は『プロトタイプベースの継承』の上に乗ったシンタックスシュガー。Ruby の class とは違い『内部はプロトタイプチェーン』。new で呼ぶ際に constructor が走る。",
            code:
              "class Animal {\n  static species = 'Animalia';  // クラスプロパティ\n  #secret;                       // プライベートフィールド (ES2022+)\n\n  constructor(name) {\n    this.name = name;\n    this.#secret = 'hidden';\n  }\n\n  greet() {\n    return `Hi, I'm ${this.name}`;\n  }\n\n  get displayName() {            // getter\n    return this.name.toUpperCase();\n  }\n}\n\nclass Dog extends Animal {\n  constructor(name, breed) {\n    super(name);                 // 親 constructor を必ず呼ぶ\n    this.breed = breed;\n  }\n\n  greet() {\n    return `${super.greet()} (wan)`;\n  }\n}\n\nconst d = new Dog('Pochi', 'Shiba');\nd.greet();         // 'Hi, I'm Pochi (wan)'\nd.displayName;     // 'POCHI'\nAnimal.species;    // 'Animalia'",
            language: "javascript",
            notes: [
              "`#field` は本物の private (ES2022+)。`_field` の慣習より厳密で、外からアクセスすると SyntaxError",
              "extends 後の constructor では `super(...)` を呼ぶ前に this を使うと ReferenceError",
            ],
          },
          {
            heading: "5.3 プロトタイプチェーン — JS の継承の正体",
            body:
              "class は内部的に『関数 + prototype オブジェクト + チェーン』。`d.greet()` は『d 自身に greet が無ければ d.__proto__ (= Dog.prototype) を見る → 無ければさらに上 (Animal.prototype)』と辿る。`Object.getPrototypeOf` で確認できる。",
            code:
              "Object.getPrototypeOf(d) === Dog.prototype;        // true\nObject.getPrototypeOf(Dog.prototype) === Animal.prototype; // true\nObject.getPrototypeOf(Animal.prototype) === Object.prototype; // true\n\n// instanceof はチェーンを上に辿って判定\nd instanceof Dog;       // true\nd instanceof Animal;    // true\nd instanceof Object;    // true\n\n// Ruby の ancestors 相当 (チェーンを配列化する自前関数)\nfunction ancestors(obj) {\n  const chain = [];\n  let cur = obj;\n  while (cur) {\n    chain.push(cur);\n    cur = Object.getPrototypeOf(cur);\n  }\n  return chain;\n}",
            language: "javascript",
            notes: [
              "プロトタイプを動的に書き換える `Object.setPrototypeOf` は遅いので推奨されない。クラス継承で十分",
              "TypeScript の `interface` / Java の `interface` のような『純粋な型契約』は JS には無い。Duck Typing",
            ],
          },
        ],
        keyTakeaways: [
          "オブジェクトリテラルは軽量。短縮プロパティ・計算キー・分割代入を活用",
          "class はシンタックスシュガー。中身はプロトタイプチェーン",
          "#field は本物の private。_field の慣習よりも安全",
        ],
        comprehensionQuestionIds: ["js-004", "js-011"],
      },
      {
        id: "modules-esm",
        title: "6. モジュール — ESM (import / export) と CommonJS",
        intro:
          "標準 ESM の import / export、CommonJS との互換、tree shaking、Node.js / ブラウザでの取り扱いの違いを整理。",
        readingMinutes: 7,
        objectives: [
          "named export / default export の使い分けを判断できる",
          "ESM と CommonJS の本質的な違いと相互運用を理解する",
          "tree shaking が効く / 効かない条件を知る",
        ],
        references: [
          {
            label: "MDN: JavaScript モジュール",
            url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules",
          },
          {
            label: "Node.js: ECMAScript Modules",
            url: "https://nodejs.org/api/esm.html",
          },
        ],
        sections: [
          {
            heading: "6.1 ESM の基本 — export と import",
            body:
              "`export` で公開するシンボルを宣言、`import` で取り込む。**named export** は名前そのままインポート、**default export** は import 名を自由に付けられる (1 ファイル 1 つまで)。チーム規約として『named を基本、default は控えめに』が今のトレンド。",
            code:
              "// math.js (export 側)\nexport const PI = 3.14;\nexport function add(a, b) { return a + b; }\nexport default function multiply(a, b) { return a * b; }\n\n// app.js (import 側)\nimport multiply, { PI, add } from './math.js';\n// default import (multiply) と named import を同時に\n\n// rename しながら named import\nimport { add as addNumbers } from './math.js';\n\n// すべて取り込む (空間オブジェクト)\nimport * as math from './math.js';\nmath.PI; math.add(1, 2);",
            language: "javascript",
            notes: [
              "named export はリファクタリングしやすい (リネームしたら import 側もエラーで気付く)",
              "default export はライブラリのトップレベル API などごく一部に限定",
            ],
          },
          {
            heading: "6.2 ESM と CommonJS — 同居の現実",
            body:
              "Node.js の歴史的経緯で `require / module.exports` の CommonJS と、標準 `import / export` の ESM が共存している。`package.json` の `\"type\": \"module\"` で ESM 扱い、ファイル拡張子 `.mjs` / `.cjs` でも切り替え可能。**ESM は同期 require できない**、**ESM から CommonJS を default import で読める** といった互換ルールがある。",
            code:
              "// CommonJS (Node.js の歴史的形式)\n// math.cjs\nfunction add(a, b) { return a + b; }\nmodule.exports = { add };\n\n// ESM 側で読む (default として読める)\nimport math from './math.cjs';\nmath.add(1, 2);\n\n// package.json\n// {\n//   \"type\": \"module\",  // .js を ESM 扱い\n//   ...\n// }",
            language: "javascript",
            notes: [
              "新規プロジェクトは ESM 推奨。フロントエンドのバンドラ (Vite/webpack) も ESM 中心",
              "ESM では __dirname / __filename が無い。`import.meta.url` から path を導出する",
            ],
          },
          {
            heading: "6.3 Tree Shaking — 使わない export を捨てる",
            body:
              "バンドラ (webpack / Rollup / esbuild) はビルド時に『import されていない export』を削って配信サイズを減らす。これが **tree shaking**。効くためには ESM の静的 import (`import { foo } from '...'`) が必要。CommonJS や動的 import は対象外。",
            code:
              "// utils.js\nexport function used() { /* ... */ }\nexport function unused() { /* ... */ }   // tree shaking で削除される\n\n// app.js\nimport { used } from './utils.js';\nused();\n// → ビルド後の bundle には used だけが含まれる",
            language: "javascript",
            notes: [
              "tree shaking は『副作用が無い』前提。グローバル変数を書き換える import は削られない",
              "package.json の \"sideEffects\": false を宣言すると tree shaking がより積極的に",
            ],
          },
        ],
        keyTakeaways: [
          "named export を基本、default export は控えめに。リファクタリングで気付ける",
          "ESM と CommonJS の境界 (.mjs / .cjs / type: module) を意識する",
          "Tree shaking は ESM の静的 import 限定。動的 import や CommonJS では効かない",
        ],
        comprehensionQuestionIds: [],
      },
      {
        id: "typescript-bridge",
        title: "7. TypeScript への橋渡し — 型注釈の最初の一歩",
        intro:
          "JS の延長線として TS を理解する。型注釈 / interface / type / Generics の入り口、tsconfig.json の strict、any との付き合い方。",
        readingMinutes: 8,
        objectives: [
          "プリミティブ型・配列・オブジェクト・関数の型注釈を書ける",
          "interface と type の使い分けを判断できる",
          "Generics の基本構文を読み書きできる",
          "any / unknown / never の違いを理解する",
        ],
        references: [
          {
            label: "TypeScript 公式 (Handbook)",
            url: "https://www.typescriptlang.org/docs/handbook/intro.html",
          },
          {
            label: "TypeScript: 5 分で始める",
            url: "https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html",
          },
        ],
        sections: [
          {
            heading: "7.1 型注釈の基本",
            body:
              "TS は『JS にコンパイル時の型チェックを足した拡張』。実行時には型情報が消える (zero runtime)。変数・関数引数・戻り値に型注釈を書くと、IDE 補完とエラー検出が劇的に改善する。",
            code:
              "// プリミティブ\nconst name: string = 'Alice';\nconst age: number = 20;\nconst active: boolean = true;\n\n// 配列\nconst tags: string[] = ['ruby', 'rails'];\nconst nums: Array<number> = [1, 2, 3];   // 同義\n\n// オブジェクト (inline)\nconst user: { name: string; age: number } = { name: 'A', age: 20 };\n\n// 関数\nfunction greet(name: string, greeting = 'Hi'): string {\n  return `${greeting}, ${name}`;\n}\n\n// アロー関数\nconst add = (a: number, b: number): number => a + b;",
            language: "typescript",
            notes: [
              "戻り値の型注釈は省略可 (推論される) だが、公開 API では明示すると壊れにくい",
              "`tsconfig.json` の `\"strict\": true` を必ず有効にする。半端な型は意味が薄い",
            ],
          },
          {
            heading: "7.2 interface vs type — 似ているが微妙に違う",
            body:
              "**interface**: オブジェクトの形を宣言。同名で複数回宣言すると **マージ** される (declaration merging)。\n**type**: 型エイリアス。Union (`A | B`) / Intersection (`A & B`) / Mapped Type など複雑な型表現が可能。\n単純なオブジェクトは interface、Union や複雑な型は type、と使い分ける流派が多い。",
            code:
              "// interface (オブジェクトの形)\ninterface User {\n  name: string;\n  age: number;\n}\ninterface User {       // 同名で追加 (declaration merging)\n  email: string;\n}\n// User は { name, age, email } になる\n\n// type (より柔軟)\ntype Status = 'draft' | 'published' | 'archived';   // Union\ntype Identifier = string | number;\ntype Reader = User & { canRead: true };               // Intersection\n\n// 関数型\ntype Handler = (event: Event) => void;",
            language: "typescript",
            notes: [
              "ライブラリ API の拡張ポイントには interface が向く (利用者がマージ可能)",
              "純粋な値オブジェクトには type の方が見やすい",
            ],
          },
          {
            heading: "7.3 Generics と any / unknown / never",
            body:
              "**Generics** は『型をパラメータ化』する。`Array<T>`, `Map<K, V>` などコンテナで多用。**any** は『型チェックを諦める』脱出口、**unknown** は『安全な any』(使う前に型ガードが必要)、**never** は『絶対に起きない型』。any を多用すると TS の意味が無くなるので、まず unknown を試す。",
            code:
              "// Generics: 汎用関数\nfunction first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\nfirst<number>([1, 2, 3]);          // number | undefined\nfirst(['a', 'b']);                  // 推論で string | undefined\n\n// Generics: 制約付き\nfunction pluck<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\npluck({ name: 'Alice' }, 'name');   // string\n\n// unknown は安全な any\nfunction parse(input: unknown): string {\n  if (typeof input === 'string') return input;\n  if (typeof input === 'number') return input.toString();\n  throw new Error('invalid');\n}\n\n// never (絶対に起きない)\nfunction fail(msg: string): never {\n  throw new Error(msg);\n}",
            language: "typescript",
            notes: [
              "any を書くたびに 1 杯コーヒーを我慢する、くらいの覚悟で。unknown + 型ガードを習慣に",
              "Generics の `extends` は『継承』ではなく『部分集合の制約』。`<T extends string>` は『T は string の部分集合』",
            ],
          },
        ],
        keyTakeaways: [
          "TS は JS の延長。型は実行時に消える (zero runtime cost)",
          "strict: true を必ず有効化。半端な型では意味が薄い",
          "any は最終手段。まず unknown + 型ガードを試す",
        ],
        comprehensionQuestionIds: [],
      },
    ],
  },
];

export const findGuide = (id: string) => guides.find((g) => g.id === id);

export const guidesByTrack = (trackId: TrackId) =>
  guides.filter((g) => g.trackId === trackId);
