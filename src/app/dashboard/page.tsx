import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { getDeckStats, getRecentDecks } from "@/lib/actions";
import Link from "next/link";

export default async function Dashboard() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      
      <SignedIn>
        <DashboardContent />
      </SignedIn>
    </>
  );
}

async function DashboardContent() {
  try {
    const [stats, recentDecks] = await Promise.all([
      getDeckStats(),
      getRecentDecks(5)
    ]);

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome to your FlashyCard dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Total Decks
              </h3>
              <p className="text-3xl font-bold text-primary">{stats.totalDecks}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {stats.totalDecks === 0 ? 'No decks created yet' : `${stats.totalDecks} deck${stats.totalDecks === 1 ? '' : 's'} created`}
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Total Cards
              </h3>
              <p className="text-3xl font-bold text-primary">{stats.totalCards}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {stats.totalCards === 0 ? 'No cards created yet' : `${stats.totalCards} card${stats.totalCards === 1 ? '' : 's'} across all decks`}
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Study Sessions
              </h3>
              <p className="text-3xl font-bold text-primary">{stats.studySessions}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Start studying to track progress
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/decks/new">
                  Create New Deck
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/study">
                  Start Study Session
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/decks">
                  View All Decks
                </Link>
              </Button>
            </div>
          </div>

          {/* Recent Decks */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Recent Decks
            </h2>
            {recentDecks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentDecks.map((deck) => (
                  <div key={deck.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      {deck.title}
                    </h3>
                    {deck.description && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {deck.description}
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Updated {new Date(deck.updatedAt).toLocaleDateString()}
                      </span>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/decks/${deck.id}`}>
                          View Deck
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground text-center py-8">
                  No decks created yet. Create your first deck to get started!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Dashboard error:', error);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Error Loading Dashboard
          </h1>
          <p className="text-muted-foreground mb-4">
            There was an error loading your dashboard data.
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }
}
