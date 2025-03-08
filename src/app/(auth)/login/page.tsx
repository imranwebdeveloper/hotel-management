import { LoginForm } from "@/components/login-form";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <LoginForm />
    </div>
  );
}
