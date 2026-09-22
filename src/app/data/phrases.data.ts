import { Phrase } from '../models/phrase.model';

export const PHRASES: Phrase[] = [
  {
    id: 'check-in-welcome',
    category: 'check-in',
    italian: 'Buongiorno, benvenuti. Ha una prenotazione?',
    english: 'Good morning, welcome. Do you have a reservation?',
  },
  {
    id: 'check-in-name',
    category: 'check-in',
    italian: 'Posso avere il nome della prenotazione?',
    english: 'May I have the name on the reservation?',
  },
  {
    id: 'check-in-document',
    category: 'check-in',
    italian: 'Posso avere un documento di identità, per favore?',
    english: 'May I have an ID document, please?',
  },
  {
    id: 'check-in-nights',
    category: 'check-in',
    italian: 'La sua prenotazione è per due notti.',
    english: 'Your reservation is for two nights.',
  },
  {
    id: 'check-in-breakfast',
    category: 'check-in',
    italian: 'La colazione è inclusa nella prenotazione.',
    english: 'Breakfast is included in your reservation.',
  },
  {
    id: 'check-in-breakfast-time',
    category: 'check-in',
    italian: 'La colazione viene servita dalle sei alle nove.',
    english: 'Breakfast is served from six to nine.',
  },
  {
    id: 'check-in-breakfast-floor',
    category: 'check-in',
    italian: 'La colazione viene servita al piano terra.',
    english: 'Breakfast is served on the ground floor.',
  },
  {
    id: 'check-in-room',
    category: 'check-in',
    italian: 'La sua camera è la numero centodue.',
    english: 'Your room is number 102.',
  },
];