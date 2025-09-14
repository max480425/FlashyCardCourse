import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Image
            className="dark:invert mx-auto mb-8"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl font-bold mb-4">Welcome to FlashyCard Course</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            A Next.js application with Clerk authentication
          </p>
        </div>

        <SignedOut>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Sign in or create an account to access the full features of FlashyCard Course.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn Next.js
              </a>
              <a
                className="rounded-full border border-solid border-gray-300 dark:border-gray-600 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                href="https://clerk.com/docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Clerk Docs
              </a>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="bg-green-50 dark:bg-green-900 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-green-800 dark:text-green-200">
              🎉 You're signed in!
            </h2>
            <p className="text-green-700 dark:text-green-300 mb-6">
              Welcome to FlashyCard Course. You now have access to all features.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Course Materials</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Access your personalized learning content and track your progress.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Flash Cards</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Create and study with interactive flash cards for better retention.
                </p>
              </div>
            </div>
          </div>
        </SignedIn>

        <footer className="mt-16 flex gap-[24px] flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </main>
    </div>
  );
}
