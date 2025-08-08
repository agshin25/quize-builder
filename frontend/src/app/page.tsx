"use client";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          Welcome to Quiz Builder 🎯
        </h1>
        <p className="text-gray-600 mb-8">
          Create, manage, and explore quizzes with ease. Build your own quiz and
          share it with the world!
        </p>
        <button
          onClick={() => router.push("/quizzes")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    </main>
  );
}
