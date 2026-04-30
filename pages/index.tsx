

import LoginForm from "../components/auth/LoginForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center">
      <div className="w-full">

        <LoginForm />
      </div>
    </div>
  );
}