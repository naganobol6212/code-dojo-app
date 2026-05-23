import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "ruby-basics",
    name: "Ruby 基礎",
    description: "変数、Symbol、nil、真偽値、メソッド定義など",
    emoji: "💎",
  },
  {
    id: "collections",
    name: "コレクション",
    description: "Array, Hash, Enumerable, ブロック",
    emoji: "📦",
  },
  {
    id: "rails-convention",
    name: "Rails 規約",
    description: "命名規則、MVC、Convention over Configuration",
    emoji: "🛤️",
  },
  {
    id: "active-record",
    name: "ActiveRecord",
    description: "モデル、関連、クエリ、マイグレーション",
    emoji: "🗄️",
  },
  {
    id: "routing-controller",
    name: "ルーティング/コントローラ",
    description: "routes.rb, RESTful, before_action, params",
    emoji: "🔀",
  },
];

export const findCategory = (id: string) =>
  categories.find((c) => c.id === id);
