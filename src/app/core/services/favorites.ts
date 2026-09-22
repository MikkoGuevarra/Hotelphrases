import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Favorites {
  private readonly storageKey = 'hotel-phrases-favorites';

  private readonly favoriteIds = signal<string[]>(
    this.loadFavorites()
  );

  readonly favorites = this.favoriteIds.asReadonly();

  isFavorite(phraseId: string): boolean {
    return this.favoriteIds().includes(phraseId);
  }

  toggle(phraseId: string): void {
    this.favoriteIds.update((ids) => {
      const updatedIds = ids.includes(phraseId)
        ? ids.filter((id) => id !== phraseId)
        : [...ids, phraseId];

      this.saveFavorites(updatedIds);

      return updatedIds;
    });
  }

  private loadFavorites(): string[] {
    try {
      const stored = localStorage.getItem(this.storageKey);

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveFavorites(ids: string[]): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(ids)
    );
  }
}