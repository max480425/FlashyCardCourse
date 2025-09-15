"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-foreground">FlashyCard</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your personal flashcard platform
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-foreground">FlashyCard</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your personal flashcard platform
        </p>
        
        <SignedOut>
          <div className="flex gap-4 justify-center">
            <SignInButton>
              <Button size="lg">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="secondary" size="lg">
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="text-muted-foreground">
            <p className="text-lg mb-4">Welcome back! Redirecting to dashboard...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
