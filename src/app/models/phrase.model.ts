export type PhraseCategory =
  | 'check-in'
  | 'check-out'
  | 'reservations'
  | 'breakfast'
  | 'payments'
  | 'phone'
  | 'requests'
  | 'problems'
  | 'general';

export interface Phrase {
  id: string;
  category: PhraseCategory;
  italian: string;
  english: string;
}