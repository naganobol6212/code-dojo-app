# 💎 RubyDojo

Ruby on Rails の知識をクイズで学べる学習アプリ + 構造化ジャーナル機能搭載。

- **200+ 問のクイズ**: Ruby 基礎 / コレクション / OOP / メタプロ / Rails 規約 / ActiveRecord / RSpec / ログ調査 / Git / セキュリティ / デバッグ / Linux CLI / 実践課題 など 15+ カテゴリ
- **段階的ヒント** + 詳しい解説 (理由・コード例・よくある間違い)
- **完璧 / 見直しマーク** で復習対象を管理
- **学習ジャーナル**: KPT / STAR / 5W1H / YWT / PREP / 日報 の 6 テンプレートで構造化言語訓練
- **ライト/ダークモード** 切替
- **データはすべて LocalStorage**: アカウント不要・外部送信なし

---

## ローカルで動かす

```bash
npm install
npm run dev
```

→ http://localhost:3000

## 本番ビルドの検証

```bash
npm run build
npm start
```

## デプロイ (Vercel)

最も簡単な方法。Next.js 製アプリは Vercel で **ゼロ設定**で動きます。

### 手順

1. [https://vercel.com/signup](https://vercel.com/signup) で GitHub アカウントでサインアップ (無料)
2. ダッシュボードで **「Add New → Project」** → 自分の GitHub から `ruby_on_rails_quiz` を選択
3. **Import** をクリック
4. ビルド設定は **触らず Deploy** (Next.js は自動検出される)
5. 数分待つと `https://your-app.vercel.app` で公開される

### 設定不要な理由

- ビルドコマンド: `npm run build` (自動検出)
- 出力ディレクトリ: `.next` (自動検出)
- Node バージョン: 22 (自動)
- 環境変数: 不要 (LocalStorage しか使ってない)

### ブランチデプロイ

PR を作ると Vercel が自動でプレビュー URL を発行します (検証に便利)。
本番ブランチ (`main`) にマージするとプロダクション URL が更新されます。

### カスタムドメイン

Vercel の Project Settings → Domains から自分のドメインを設定可能。

---

## 他のデプロイ先

| プラットフォーム | 備考 |
|---|---|
| **Vercel** (推奨) | Next.js 製、最速・無料・自動最適化 |
| **Cloudflare Pages** | 無料、Edge Runtime 対応、`@cloudflare/next-on-pages` |
| **Netlify** | Next.js プラグインで動く |
| **AWS Amplify** | Next.js テンプレ有り、有料 |
| **自前 VPS** | `npm run build` + `npm start` を pm2/systemd で |

---

## 技術スタック

- [Next.js 16](https://nextjs.org) App Router (静的生成 SSG)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (class ベース dark variant)
- [Framer Motion](https://www.framer.com/motion/) アニメーション
- TypeScript

---

## データの取り扱い

- すべてブラウザの LocalStorage に保存 (進捗、マーク、ジャーナル)
- サーバーへ送信される情報は無し
- リセットしたい時: ブラウザの DevTools → Application → Local Storage → 該当 origin をクリア

---

## ライセンス

学習用途で自由にお使いください。
