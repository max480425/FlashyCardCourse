'use server';

import { db } from '@/db';
import { decksTable, cardsTable } from '@/db/schema';
import { eq, count } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

export async function getUserDecks() {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('User not authenticated');
  }

  try {
    const decks = await db
      .select({
        id: decksTable.id,
        title: decksTable.title,
        description: decksTable.description,
        createdAt: decksTable.createdAt,
        updatedAt: decksTable.updatedAt,
      })
      .from(decksTable)
      .where(eq(decksTable.userId, userId))
      .orderBy(decksTable.createdAt);

    return decks;
  } catch (error) {
    console.error('Error fetching user decks:', error);
    throw new Error('Failed to fetch decks');
  }
}

export async function getDeckStats() {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('User not authenticated');
  }

  try {
    // Get total decks count
    const totalDecksResult = await db
      .select({ count: count() })
      .from(decksTable)
      .where(eq(decksTable.userId, userId));

    const totalDecks = totalDecksResult[0]?.count || 0;

    // Get total cards count across all user's decks
    const totalCardsResult = await db
      .select({ count: count() })
      .from(cardsTable)
      .innerJoin(decksTable, eq(cardsTable.deckId, decksTable.id))
      .where(eq(decksTable.userId, userId));

    const totalCards = totalCardsResult[0]?.count || 0;

    return {
      totalDecks,
      totalCards,
      studySessions: 0, // Placeholder for future implementation
      accuracyRate: null, // Placeholder for future implementation
    };
  } catch (error) {
    console.error('Error fetching deck stats:', error);
    throw new Error('Failed to fetch deck statistics');
  }
}

export async function getRecentDecks(limit: number = 5) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('User not authenticated');
  }

  try {
    const recentDecks = await db
      .select({
        id: decksTable.id,
        title: decksTable.title,
        description: decksTable.description,
        createdAt: decksTable.createdAt,
        updatedAt: decksTable.updatedAt,
      })
      .from(decksTable)
      .where(eq(decksTable.userId, userId))
      .orderBy(decksTable.updatedAt)
      .limit(limit);

    return recentDecks;
  } catch (error) {
    console.error('Error fetching recent decks:', error);
    throw new Error('Failed to fetch recent decks');
  }
}
