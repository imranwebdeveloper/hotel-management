import { RegisterForm } from "@/components/register-form";

export const metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <RegisterForm />
    </div>
  );
}
