import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
            <Card>
              <CardHeader>
                <CardTitle>Total Decks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">{stats.totalDecks}</div>
                <CardDescription>
                  {stats.totalDecks === 0 ? 'No decks created yet' : `${stats.totalDecks} deck${stats.totalDecks === 1 ? '' : 's'} created`}
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">{stats.totalCards}</div>
                <CardDescription>
                  {stats.totalCards === 0 ? 'No cards created yet' : `${stats.totalCards} card${stats.totalCards === 1 ? '' : 's'} across all decks`}
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Study Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">{stats.studySessions}</div>
                <CardDescription>
                  Start studying to track progress
                </CardDescription>
              </CardContent>
            </Card>
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
                  <Card key={deck.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{deck.title}</CardTitle>
                      {deck.description && (
                        <CardDescription>{deck.description}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary" className="text-xs">
                          Updated {new Date(deck.updatedAt).toLocaleDateString()}
                        </Badge>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/decks/${deck.id}`}>
                            View Deck
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    No decks created yet. Create your first deck to get started!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Dashboard error:', error);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Error Loading Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <CardDescription className="mb-4">
              There was an error loading your dashboard data.
            </CardDescription>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}
