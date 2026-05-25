import type { Question } from "@/lib/types";

/**
 * Expert ティアの問題集。
 *
 * 「シニアエンジニアの判断力 / 障害対応力」 を鍛える高難度問題。
 * - 設計判断 (トレードオフ) / 障害対応 (切り分け) / パフォーマンス最適化 が中心
 * - シナリオの語りは最小限、 鋭い 1 問を心がける
 * - 必ず references で公式ドキュメントを示し、 studyGuide で章レベル誘導
 *
 * ID 規則: ex-{categoryId 短縮}-{連番}
 */

export const expertQuestions: Question[] = [
  // ===========================================================================
  // active-record — 設計判断 (集計の非正規化)
  // ===========================================================================
  {
    id: "ex-ar-001",
    categoryId: "active-record",
    difficulty: "expert",
    type: "choice",
    question:
      "Post に `comments_count` を保持するか、 表示のたびに `post.comments.count` を打つかで議論。 月 1 億 PV、 コメント書き込みは 1 日 1 万件、 一覧画面で頻繁に comments_count を表示する。 設計判断として最も適切なのは？",
    choices: [
      "Post に `comments_count` カラムを持ち、 Comment に `belongs_to :post, counter_cache: true` を指定。 整合性は定期 reset_counters バッチで担保",
      "毎回 `post.comments.count` で SQL を打つ。 マスタが正で集計は SQL の仕事だから",
      "Redis にコメント数を保存し、 Post モデルからは Redis を参照",
      "comments_count カラムは持つが、 整合性ズレが起きたら都度手動で UPDATE",
    ],
    answerIndex: 0,
    choiceExplanations: [
      "正解。 読み込み圧倒的優位 (1 億 vs 1 万) のワークロードでは『計画的な非正規化』 が王道。 Rails は書き込み時に SQL レベルで +1 / -1 を atomic 実行するため、 通常ルートでは整合性が保たれる。 手動 SQL や `delete_all` で崩れる前提で、 `Post.find_each { |p| Post.reset_counters(p.id, :comments) }` を月次 cron に置く。",
      "不正解。 月 1 億 PV のたびに COUNT は B-Tree インデックスのリーフ走査が発生。 Posts.includes(:comments).size 等で N+1 を避けても、 集計コストは消えない。 read-heavy なら冗長化の判断が必要。",
      "不正解。 Redis は揮発性かつ単一障害点を増やす。 集計ズレ時の復旧導線も別途必要。 Rails 標準機能を捨てる正当な理由がない (今回の規模では Redis のキャッシュ層は別問題)。",
      "不正解。 整合性ズレは静かに進行し検知が困難。 設計段階で『どう補正するか』 を組み込まないアプローチは脆弱。 reset_counters という標準補正手段を活用するべき。",
    ],
    hints: [
      "読みと書きの比率をまず計算してみよ — 1 億 vs 1 万 で 10,000 倍。",
      "整合性は『誰がいつ担保するか』 を設計時に決めるべき。",
      "Rails には counter_cache と対になる reset_counters という補正経路が用意されている。",
    ],
    explanation: {
      summary:
        "読み込み圧倒的優位なら counter_cache + 定期 reset_counters バッチで補正、 が王道。 「計画的な非正規化」 + 「補正経路の組み込み」 がセットで設計の本質。",
      reason:
        "Rails の counter_cache は、 Comment 作成 / 削除時に Post.comments_count を +1 / -1 する仕組み。 書き込みパス側に微小なコスト (1 SQL の UPDATE) を追加する代わりに、 読みパスを O(1) に最適化する。 ただし `Comment.delete_all` (callback を呼ばない一括削除) や 手動 SQL DELETE、 paranoia による soft delete 切り替え時に counter が壊れる。 そのため設計段階で『定期的に reset_counters で再計算する』 補正経路を組み込むのが正しい設計判断 (B 案)。 Redis (C) は揮発性で SPOF を増やし、 手動補正 (D) はオペレーションエラーで破綻する。",
      codeExample:
        "# モデル\nclass Comment < ApplicationRecord\n  belongs_to :post, counter_cache: true\nend\n\nclass Post < ApplicationRecord\n  has_many :comments, dependent: :destroy\nend\n\n# マイグレーション (既存テーブルに後付けする場合)\nclass AddCommentsCountToPosts < ActiveRecord::Migration[7.1]\n  def change\n    add_column :posts, :comments_count, :integer, default: 0, null: false\n    # 既存データを再集計\n    reversible do |dir|\n      dir.up do\n        Post.reset_column_information\n        Post.find_each(batch_size: 1000) do |p|\n          Post.reset_counters(p.id, :comments)\n        end\n      end\n    end\n  end\nend\n\n# 月次補正 (cron / sidekiq-scheduler 等)\nclass ResetCountersJob\n  include Sidekiq::Job\n  def perform\n    Post.find_each(batch_size: 1000) do |p|\n      Post.reset_counters(p.id, :comments)\n    end\n  end\nend",
      commonMistakes: [
        "counter_cache 後付け時に reset_counters で初期化を忘れ、 全 Post の comments_count が 0 のままになる",
        "Comment を `delete_all` (callbacks 無視) で削除し、 counter が壊れる",
        "soft delete (paranoia, discard gem 等) 併用時、 deleted_at の切り替えで counter が同期しない",
        "テストで counter_cache に依存しているのに、 fixture / FactoryBot で Comment を直接 insert して counter_cache が 0 のまま落ちる",
      ],
      references: [
        {
          label: "Rails Guides: counter_cache",
          url: "https://guides.rubyonrails.org/association_basics.html#options-for-belongs-to-counter-cache",
        },
        {
          label: "Rails API: ActiveRecord::CounterCache#reset_counters",
          url: "https://api.rubyonrails.org/classes/ActiveRecord/CounterCache/ClassMethods.html#method-i-reset_counters",
        },
      ],
      studyGuide: [
        {
          guideId: "db-design-intro",
          chapterId: "antipatterns",
          note: "正規化と非正規化のトレードオフ — counter_cache は『計画的な非正規化』 の代表例",
        },
      ],
    },
  },
];
