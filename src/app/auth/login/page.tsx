import { AuthLoginForm } from "./AuthLoginForm";

export const metadata = {
  title: "ログイン — CodeDojo",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-10 sm:py-14">
      <AuthLoginForm />
    </div>
  );
}
