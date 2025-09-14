import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Button } from "@/components/ui/button";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FlashyCard Course",
  description: "A Next.js app with Clerk authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#0f172a",
          colorInputBackground: "#1e293b",
          colorInputText: "#f8fafc",
        },
        elements: {
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
          card: "bg-slate-800 border-slate-700",
          headerTitle: "text-white",
          headerSubtitle: "text-slate-300",
          socialButtonsBlockButton: "bg-slate-700 hover:bg-slate-600 text-white border-slate-600",
          formFieldInput: "bg-slate-700 border-slate-600 text-white",
          footerActionLink: "text-blue-400 hover:text-blue-300",
        },
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${poppins.variable} antialiased`}
        >
          <header className="border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-semibold">FlashyCard Course</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <SignedOut>
                    <SignInButton 
                      mode="modal"
                      appearance={{
                        baseTheme: dark,
                      }}
                    >
                      <Button variant="default">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton 
                      mode="modal"
                      appearance={{
                        baseTheme: dark,
                      }}
                    >
                      <Button variant="secondary">
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton 
                      appearance={{
                        baseTheme: dark,
                        elements: {
                          avatarBox: "w-8 h-8",
                          userButtonPopoverCard: "bg-slate-800 border-slate-700",
                          userButtonPopoverActionButton: "text-slate-300 hover:bg-slate-700",
                        },
                      }}
                    />
                  </SignedIn>
                </div>
              </div>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
