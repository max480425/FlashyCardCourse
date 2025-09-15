import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
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
            <p className="text-lg">Welcome back! You're signed in.</p>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
