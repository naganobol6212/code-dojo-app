import type { Question } from "@/lib/types";

export const questions: Question[] = [
  // ===== Ruby 基礎 =====
  {
    id: "rb-001",
    categoryId: "ruby-basics",
    difficulty: "beginner",
    type: "choice",
    question:
      "Ruby で「変更不可な、一意な識別子として使われる軽量オブジェクト」を表すリテラルはどれですか？",
    choices: [
      '"hello"',
      ":hello",
      "'hello'",
      "%w[hello]",
    ],
    answerIndex: 1,
    hints: [
      "文字列とは違い、同じ値であれば常にメモリ上で同じオブジェクトになります。",
      "頭にコロンが付くリテラルです。Hash のキーなどでよく使われます。",
      "答えは `:hello` (Symbol) です。`\"hello\".object_id` は毎回変わりますが、`:hello.object_id` は常に同じです。",
    ],
    explanation:
      "Symbol は immutable で一意なオブジェクト。Hash のキーや状態を表すフラグとして使うとメモリ効率とパフォーマンスの両面で有利です。",
  },
  {
    id: "rb-002",
    categoryId: "ruby-basics",
    difficulty: "beginner",
    type: "choice",
    question: "次のコードの実行結果はどれですか？",
    code: "puts nil.to_s.length",
    choices: ["NoMethodError", "0", "nil", "4"],
    answerIndex: 1,
    hints: [
      "`nil` には `to_s` メソッドがあり、エラーにはなりません。",
      "`nil.to_s` は空文字列 `\"\"` を返します。",
      "空文字列の `length` は 0 です。",
    ],
    explanation:
      "`nil.to_s` は `\"\"` を返し、`\"\".length` は `0` です。Ruby では nil にも to_s/to_a/to_i などの変換メソッドが定義されています。",
  },
  {
    id: "rb-003",
    categoryId: "ruby-basics",
    difficulty: "beginner",
    type: "choice",
    question: "Ruby で「偽 (falsy)」と評価される値はどれですか？(複数選べそうな場合は最も正確なもの)",
    choices: [
      "0",
      '""',
      "[]",
      "false と nil のみ",
    ],
    answerIndex: 3,
    hints: [
      "JavaScript や Python とは異なるので注意。",
      "`if 0 then puts \"truthy\" end` は何を出力するか考えてみましょう。",
      "Ruby では `false` と `nil` 以外はすべて truthy です。",
    ],
    explanation:
      "Ruby において false と評価されるのは `false` と `nil` だけ。`0`, `\"\"`, `[]` はすべて truthy です。これは他言語経験者が最もハマるポイントの1つ。",
  },
  {
    id: "rb-004",
    categoryId: "ruby-basics",
    difficulty: "intermediate",
    type: "choice",
    question: "次のコードの出力は？",
    code: "x = 10\nputs x.respond_to?(:even?) ? x.even? : \"no method\"",
    choices: ["true", "false", '"no method"', "NoMethodError"],
    answerIndex: 0,
    hints: [
      "`respond_to?` は、そのオブジェクトがメソッドを持っているかを返します。",
      "`Integer#even?` は標準メソッドです。",
      "10 は偶数なので `even?` は true を返します。",
    ],
    explanation:
      "Integer は `even?`/`odd?` を持つので `respond_to?(:even?)` は true。三項演算子で `x.even?` が評価され、10 は偶数なので結果は true。",
  },
  {
    id: "rb-005",
    categoryId: "ruby-basics",
    difficulty: "intermediate",
    type: "text",
    question:
      '"hello world" を全て大文字に変換するメソッド名は？(メソッド名のみを記入、例: foo_bar)',
    answers: ["upcase"],
    hints: [
      "String クラスのインスタンスメソッドです。",
      "反対のメソッドは `downcase` です。",
      "答えは `upcase` です。`\"hello\".upcase #=> \"HELLO\"`",
    ],
    explanation:
      "`String#upcase` は文字列をすべて大文字に変換します。破壊的メソッド `upcase!` もあります。",
  },

  // ===== コレクション =====
  {
    id: "col-001",
    categoryId: "collections",
    difficulty: "beginner",
    type: "choice",
    question: "次のコードの出力は？",
    code: "[1, 2, 3].map { |n| n * 2 }",
    choices: ["[1, 2, 3]", "[2, 4, 6]", "6", "[1, 4, 9]"],
    answerIndex: 1,
    hints: [
      "`map` は配列の各要素を変換した新しい配列を返します。",
      "ブロック `{ |n| n * 2 }` は各要素を 2 倍にします。",
      "1→2, 2→4, 3→6 で `[2, 4, 6]` になります。",
    ],
    explanation:
      "`Enumerable#map` (別名 `collect`) は要素を変換した新しい配列を返します。元の配列は変更されません。",
  },
  {
    id: "col-002",
    categoryId: "collections",
    difficulty: "beginner",
    type: "choice",
    question: "Hash から値を取り出す際、キーが存在しない場合に nil ではなくデフォルト値を返すメソッドは？",
    code: "h = { a: 1 }\nh.??(:b, 99)",
    choices: ["[]", "dig", "fetch", "find"],
    answerIndex: 2,
    hints: [
      "`h[:b]` だと nil が返ります。",
      "第2引数にデフォルト値を取れるメソッドです。",
      "答えは `fetch`。`h.fetch(:b, 99) #=> 99`。デフォルト値を省略するとキーが無いときは KeyError。",
    ],
    explanation:
      "`Hash#fetch(key, default)` はキーが無いとき default を返します。ブロックも渡せます: `h.fetch(:b) { |k| \"missing #{k}\" }`。",
  },
  {
    id: "col-003",
    categoryId: "collections",
    difficulty: "intermediate",
    type: "choice",
    question: "次のコードと等価なものは？",
    code: "[1, 2, 3, 4].select { |n| n.even? }",
    choices: [
      "[1, 2, 3, 4].filter { |n| n.even? }",
      "[1, 2, 3, 4].reject { |n| n.even? }",
      "[1, 2, 3, 4].map { |n| n.even? }",
      "[1, 2, 3, 4].each { |n| n.even? }",
    ],
    answerIndex: 0,
    hints: [
      "`select` は条件に合う要素だけを残します。",
      "`reject` は逆に条件に合う要素を除外します。",
      "Ruby 2.6 から `filter` は `select` の別名です。",
    ],
    explanation:
      "`select` と `filter` はエイリアス (Ruby 2.6+)。`reject` はその逆。`map` は変換、`each` は単に走査するだけで配列を返しません。",
  },
  {
    id: "col-004",
    categoryId: "collections",
    difficulty: "intermediate",
    type: "text",
    question: "[3, 1, 4, 1, 5, 9, 2, 6] の合計値を求めるメソッド名は？(メソッド名のみ)",
    answers: ["sum"],
    hints: [
      "Ruby 2.4 以降に追加された Enumerable のメソッドです。",
      "古くは `inject(:+)` でも同じことができました。",
      "答えは `sum`。`[3,1,4,1,5,9,2,6].sum #=> 31`",
    ],
    explanation:
      "`Enumerable#sum` は要素の合計を返します。引数で初期値を指定可能: `arr.sum(100)`。ブロックも渡せます: `arr.sum { |n| n * 2 }`。",
  },
  {
    id: "col-005",
    categoryId: "collections",
    difficulty: "advanced",
    type: "choice",
    question: "次のコードの出力は？",
    code: '[[1, "a"], [2, "b"], [3, "c"]].to_h',
    choices: [
      '{1=>"a", 2=>"b", 3=>"c"}',
      '[1, "a", 2, "b", 3, "c"]',
      "TypeError",
      '{"a"=>1, "b"=>2, "c"=>3}',
    ],
    answerIndex: 0,
    hints: [
      "`to_h` は [key, value] のペアの配列を Hash に変換します。",
      "各内側配列の最初の要素がキー、2番目が値になります。",
      "結果は `{1=>\"a\", 2=>\"b\", 3=>\"c\"}`",
    ],
    explanation:
      "`Array#to_h` は `[[k1,v1], [k2,v2]]` 形式を Hash に変換。ブロックを渡せば変換ルールも書けます: `arr.to_h { |x| [x, x*2] }`。",
  },

  // ===== Rails 規約 =====
  {
    id: "rails-001",
    categoryId: "rails-convention",
    difficulty: "beginner",
    type: "text",
    question:
      "Rails で `User` モデルに対応するデータベースのテーブル名は？(慣習通りの名前)",
    answers: ["users"],
    hints: [
      "Rails は「設定より規約 (Convention over Configuration)」が基本。",
      "テーブル名はモデル名を複数形にした snake_case です。",
      "答えは `users`。",
    ],
    explanation:
      "Rails の規約: モデルは単数形 CamelCase (`User`)、テーブルは複数形 snake_case (`users`)。複雑な複数形 (`Person → people`) も ActiveSupport が解決します。",
  },
  {
    id: "rails-002",
    categoryId: "rails-convention",
    difficulty: "beginner",
    type: "choice",
    question: "MVC の役割として正しいものは？",
    choices: [
      "Model: HTML描画 / View: DB処理 / Controller: 入力検証",
      "Model: DB/ビジネスロジック / View: HTML描画 / Controller: 入出力の橋渡し",
      "Model: ルーティング / View: ビジネスロジック / Controller: HTML描画",
      "Model: 設定ファイル / View: テスト / Controller: ログ",
    ],
    answerIndex: 1,
    hints: [
      "Model はデータとそれに関するロジックを担当。",
      "View はユーザーに見せる部分。",
      "Controller はリクエストを受けて Model や View を呼び出します。",
    ],
    explanation:
      "Rails では Model は ActiveRecord/ビジネスロジック、View は ERB/HTML、Controller は両者を仲介するレイヤー。Skinny Controller, Fat Model が原則。",
  },
  {
    id: "rails-003",
    categoryId: "rails-convention",
    difficulty: "intermediate",
    type: "text",
    question:
      "`BlogPost` モデルに対応するコントローラーの慣習的なファイル名は何ですか？(例: app/controllers/xxx.rb の xxx 部分)",
    answers: ["blog_posts_controller", "blog_posts_controller.rb"],
    hints: [
      "コントローラー名は複数形 + `Controller` が慣習。",
      "ファイル名は snake_case です。",
      "答えは `blog_posts_controller` (クラス名は `BlogPostsController`)。",
    ],
    explanation:
      "Rails の規約: `BlogPost` モデル → `BlogPostsController` クラス → `app/controllers/blog_posts_controller.rb` ファイル。routes でも `resources :blog_posts`。",
  },

  // ===== ActiveRecord =====
  {
    id: "ar-001",
    categoryId: "active-record",
    difficulty: "beginner",
    type: "choice",
    question:
      "User が複数の Post を持つ関係を表す ActiveRecord の宣言は？",
    code: "class User < ApplicationRecord\n  ???\nend",
    choices: [
      "has_one :posts",
      "belongs_to :posts",
      "has_many :posts",
      "has_and_belongs :posts",
    ],
    answerIndex: 2,
    hints: [
      "1対多の関係です。「1人が複数の Post を持つ」。",
      "`has_*` の系統です。",
      "`has_many :posts` が正解。`posts` テーブル側は `user_id` カラムを持ち、`belongs_to :user` を宣言します。",
    ],
    explanation:
      "1対多: 親側に `has_many :children`、子側に `belongs_to :parent`。子側のテーブルに `parent_id` 外部キーが必要。Rails 5+ では `belongs_to` はデフォルトで必須。",
  },
  {
    id: "ar-002",
    categoryId: "active-record",
    difficulty: "beginner",
    type: "choice",
    question: "User テーブルから id が 1 のレコードを取得する最も慣習的なコードは？",
    choices: [
      "User.where(id: 1)",
      "User.find(1)",
      "User.select(1)",
      "User.get(1)",
    ],
    answerIndex: 1,
    hints: [
      "`where` は条件に合うレコードの集合 (ActiveRecord::Relation) を返します。",
      "1件のレコードをオブジェクトとして返すメソッドです。",
      "見つからないと `ActiveRecord::RecordNotFound` を投げるメソッドです。",
    ],
    explanation:
      "`find(id)` は 1 件のレコードを返し、見つからないと例外。`where(id: 1).first` は nil を返すという違いがあります。`find_by(id: 1)` も nil 返しの選択肢。",
  },
  {
    id: "ar-003",
    categoryId: "active-record",
    difficulty: "intermediate",
    type: "choice",
    question:
      "N+1 問題を回避するためのメソッドは？",
    choices: ["preload", "includes", "eager_load", "上記すべて"],
    answerIndex: 3,
    hints: [
      "関連レコードを「事前に」読み込むメソッド群です。",
      "`includes` は状況に応じて preload と eager_load を使い分けます。",
      "3つともそれぞれ役割があり、すべて N+1 対策に使えます。",
    ],
    explanation:
      "`preload` は別クエリで先読み、`eager_load` は LEFT JOIN、`includes` はクエリの条件に応じて自動選択。N+1 検出は bullet gem が便利。",
  },
  {
    id: "ar-004",
    categoryId: "active-record",
    difficulty: "intermediate",
    type: "text",
    question:
      "users テーブルに `name` カラムを追加するマイグレーションを生成するコマンドは `rails generate migration ???`。??? に入る部分を答えてください (例: AddXxxToYyy 形式)。",
    answers: [
      "AddNameToUsers name:string",
      "AddNameToUsers",
      "add_name_to_users",
      "add_name_to_users name:string",
    ],
    hints: [
      "命名規則: `Add{カラム名}To{テーブル名}` (CamelCase)。",
      "生成時にカラム型も指定できます: `name:string`",
      "答え例: `AddNameToUsers name:string` (カラム型省略可)",
    ],
    explanation:
      "`rails g migration AddNameToUsers name:string` のように書くと、`add_column :users, :name, :string` を含むマイグレーションが自動生成されます。",
  },

  // ===== ルーティング/コントローラ =====
  {
    id: "rt-001",
    categoryId: "routing-controller",
    difficulty: "beginner",
    type: "choice",
    question:
      "`config/routes.rb` に `resources :posts` と書いたとき、自動生成されないルートはどれ？",
    choices: [
      "GET /posts (index)",
      "GET /posts/new (new)",
      "GET /posts/:id (show)",
      "GET /posts/search (search)",
    ],
    answerIndex: 3,
    hints: [
      "`resources` は RESTful な 7 アクションを生成します。",
      "index, show, new, create, edit, update, destroy の 7 つです。",
      "`search` は RESTful の標準ではないので、別途定義が必要です。",
    ],
    explanation:
      "`resources :posts` は7つの RESTful ルートを生成。カスタムアクションは `resources :posts do; collection { get :search }; end` のように追加します。",
  },
  {
    id: "rt-002",
    categoryId: "routing-controller",
    difficulty: "intermediate",
    type: "choice",
    question:
      "コントローラーで、全アクション実行前にユーザー認証を行う Rails 標準の仕組みは？",
    choices: ["before_filter", "before_action", "around_filter", "after_action"],
    answerIndex: 1,
    hints: [
      "Rails 4 以前は別名でした。",
      "`before_*` 系のメソッドです。",
      "現在の慣習は `before_action :authenticate_user!` のような書き方。",
    ],
    explanation:
      "Rails 5+ では `before_action` が標準 (`before_filter` は廃止)。`only:` / `except:` でアクションを絞れます: `before_action :authenticate_user!, only: [:edit, :update]`。",
  },
  {
    id: "rt-003",
    categoryId: "routing-controller",
    difficulty: "advanced",
    type: "text",
    question:
      "params から `name` と `email` だけを取り出し、不正なキー混入を防ぐ Rails の仕組みを何と呼びますか？(カタカナまたは英語で)",
    answers: [
      "Strong Parameters",
      "strong parameters",
      "strong_parameters",
      "ストロングパラメータ",
      "ストロングパラメーター",
    ],
    hints: [
      "Rails 4 で導入された機能です。",
      "`params.require(:user).permit(:name, :email)` のように書きます。",
      "Mass Assignment 脆弱性を防ぐための仕組み。",
    ],
    explanation:
      "Strong Parameters は `permit` で許可したキーだけを通すことで Mass Assignment 脆弱性を防ぐ仕組み。`params.require(:user).permit(:name, :email)` が定型句。",
  },
];

export const questionsByCategory = (categoryId: string) =>
  questions.filter((q) => q.categoryId === categoryId);

export const findQuestion = (id: string) =>
  questions.find((q) => q.id === id);
