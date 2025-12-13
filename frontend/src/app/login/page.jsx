import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6">Login to Travelin</h2>

        <GoogleLoginButton />

        <p className="mt-4 text-gray-500 text-sm">
          Sign in using your Google account
        </p>
      </div>
    </div>
  );
}
