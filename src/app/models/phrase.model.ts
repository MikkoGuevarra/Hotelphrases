export type PhraseCategory =
  | 'check-in'
  | 'check-out'
  | 'reservations'
  | 'breakfast'
  | 'payments'
  | 'phone';

export interface Phrase {
  id: string;
  category: PhraseCategory;
  italian: string;
  english: string;
}