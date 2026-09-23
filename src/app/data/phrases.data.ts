import { Phrase } from '../models/phrase.model';

export const PHRASES: Phrase[] = [

  // =========================================================
  // 🛎️ CHECK-IN
  // =========================================================

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
    id: 'check-in-passports',
    category: 'check-in',
    italian: 'Posso avere i documenti di tutti gli ospiti, per favore?',
    english: 'May I have the ID documents of all guests, please?',
  },
  {
    id: 'check-in-wait',
    category: 'check-in',
    italian: 'Un momento, per favore. Controllo la sua prenotazione.',
    english: 'One moment, please. I will check your reservation.',
  },
  {
    id: 'check-in-found',
    category: 'check-in',
    italian: 'Perfetto, ho trovato la sua prenotazione.',
    english: 'Perfect, I found your reservation.',
  },
  {
    id: 'check-in-nights',
    category: 'check-in',
    italian: 'La sua prenotazione è per due notti.',
    english: 'Your reservation is for two nights.',
  },
  {
    id: 'check-in-room',
    category: 'check-in',
    italian: 'La sua camera è la numero centodue.',
    english: 'Your room is number 102.',
  },
  {
    id: 'check-in-floor',
    category: 'check-in',
    italian: 'La sua camera si trova al primo piano.',
    english: 'Your room is on the first floor.',
  },
  {
    id: 'check-in-key',
    category: 'check-in',
    italian: 'Questa è la chiave della sua camera.',
    english: 'This is your room key.',
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
    id: 'check-in-wifi',
    category: 'check-in',
    italian: 'Il Wi-Fi è gratuito e non serve la password.',
    english: 'Wi-Fi is free and no password is required.',
  },
  {
    id: 'check-in-checkout-time',
    category: 'check-in',
    italian: 'Il check-out è entro le undici.',
    english: 'Check-out is by eleven.',
  },
  {
    id: 'check-in-help',
    category: 'check-in',
    italian: 'Se ha bisogno di assistenza, può contattare la reception.',
    english: 'If you need any assistance, you can contact reception.',
  },
  {
    id: 'check-in-any-question',
    category: 'check-in',
    italian: 'Ha qualche domanda?',
    english: 'Do you have any questions?',
  },
  {
    id: 'check-in-enjoy',
    category: 'check-in',
    italian: 'Le auguro un piacevole soggiorno.',
    english: 'I wish you a pleasant stay.',
  },


  // =========================================================
  // 👋 CHECK-OUT
  // =========================================================

  {
    id: 'check-out-greeting',
    category: 'check-out',
    italian: 'Buongiorno. Desidera fare il check-out?',
    english: 'Good morning. Would you like to check out?',
  },
  {
    id: 'check-out-room',
    category: 'check-out',
    italian: 'Posso avere il numero della camera, per favore?',
    english: 'May I have your room number, please?',
  },
  {
    id: 'check-out-key',
    category: 'check-out',
    italian: 'Posso avere la chiave della camera, per favore?',
    english: 'May I have your room key, please?',
  },
  {
    id: 'check-out-wait',
    category: 'check-out',
    italian: 'Un momento, per favore. Controllo subito.',
    english: 'One moment, please. I will check right away.',
  },
  {
    id: 'check-out-stay',
    category: 'check-out',
    italian: 'Spero che il soggiorno sia stato piacevole.',
    english: 'I hope you had a pleasant stay.',
  },
  {
    id: 'check-out-everything-ok',
    category: 'check-out',
    italian: 'È andato tutto bene durante il soggiorno?',
    english: 'Was everything okay during your stay?',
  },
  {
    id: 'check-out-luggage',
    category: 'check-out',
    italian: 'Desidera lasciare i bagagli in deposito?',
    english: 'Would you like to leave your luggage with us?',
  },
  {
    id: 'check-out-luggage-free',
    category: 'check-out',
    italian: 'Può lasciare i bagagli qui in reception.',
    english: 'You can leave your luggage here at reception.',
  },
  {
    id: 'check-out-taxi',
    category: 'check-out',
    italian: 'Ha bisogno che le chiami un taxi?',
    english: 'Would you like me to call a taxi for you?',
  },

  // RECENSIONE - frase scelta da Acela
  {
    id: 'check-out-review',
    category: 'check-out',
    italian:
      'Ci farebbe molto piacere se lasciasse una recensione. Il suo feedback è molto importante per noi.',
    english:
      'We would really appreciate it if you could leave us a review. Your feedback is very important to us.',
  },
  {
    id: 'check-out-review-thanks',
    category: 'check-out',
    italian: 'Grazie mille per il suo feedback.',
    english: 'Thank you very much for your feedback.',
  },
  {
    id: 'check-out-goodbye',
    category: 'check-out',
    italian: 'Grazie per aver soggiornato con noi. Buona giornata!',
    english: 'Thank you for staying with us. Have a nice day!',
  },
  {
    id: 'check-out-trip',
    category: 'check-out',
    italian: 'Buon viaggio e arrivederci!',
    english: 'Have a safe trip and goodbye!',
  },


  // =========================================================
  // 📅 PRENOTAZIONI
  // =========================================================

  {
    id: 'reservation-help',
    category: 'reservations',
    italian: 'Come posso aiutarla con la prenotazione?',
    english: 'How may I help you with your reservation?',
  },
  {
    id: 'reservation-name',
    category: 'reservations',
    italian: 'A che nome è la prenotazione?',
    english: 'What name is the reservation under?',
  },
  {
    id: 'reservation-date',
    category: 'reservations',
    italian: 'Per quale data desidera prenotare?',
    english: 'What date would you like to book for?',
  },
  {
    id: 'reservation-nights',
    category: 'reservations',
    italian: 'Per quante notti?',
    english: 'For how many nights?',
  },
  {
    id: 'reservation-guests',
    category: 'reservations',
    italian: 'Per quante persone?',
    english: 'For how many people?',
  },
  {
    id: 'reservation-adults',
    category: 'reservations',
    italian: 'Quanti adulti?',
    english: 'How many adults?',
  },
  {
    id: 'reservation-children',
    category: 'reservations',
    italian: 'Ci sono bambini?',
    english: 'Are there any children?',
  },
  {
    id: 'reservation-room-type',
    category: 'reservations',
    italian: 'Che tipo di camera desidera?',
    english: 'What type of room would you like?',
  },
  {
    id: 'reservation-double',
    category: 'reservations',
    italian: 'Desidera una camera matrimoniale?',
    english: 'Would you like a double room?',
  },
  {
    id: 'reservation-twin',
    category: 'reservations',
    italian: 'Desidera una camera con due letti separati?',
    english: 'Would you like a twin room?',
  },
  {
    id: 'reservation-check-availability',
    category: 'reservations',
    italian: 'Controllo subito la disponibilità.',
    english: 'I will check availability right away.',
  },
  {
    id: 'reservation-available',
    category: 'reservations',
    italian: 'Sì, abbiamo disponibilità.',
    english: 'Yes, we have availability.',
  },
  {
    id: 'reservation-no-availability',
    category: 'reservations',
    italian: 'Mi dispiace, non abbiamo disponibilità per queste date.',
    english: 'I am sorry, we do not have availability for these dates.',
  },
  {
    id: 'reservation-email',
    category: 'reservations',
    italian: 'Posso avere il suo indirizzo email?',
    english: 'May I have your email address?',
  },
  {
    id: 'reservation-phone',
    category: 'reservations',
    italian: 'Posso avere un numero di telefono?',
    english: 'May I have a phone number?',
  },
  {
    id: 'reservation-confirmation',
    category: 'reservations',
    italian: 'Le invieremo la conferma della prenotazione via email.',
    english: 'We will send your booking confirmation by email.',
  },


  // =========================================================
  // ☕ COLAZIONE
  // =========================================================

  {
    id: 'breakfast-included',
    category: 'breakfast',
    italian: 'La colazione è inclusa nella sua prenotazione.',
    english: 'Breakfast is included in your reservation.',
  },
  {
    id: 'breakfast-not-included',
    category: 'breakfast',
    italian: 'La colazione non è inclusa nella sua prenotazione.',
    english: 'Breakfast is not included in your reservation.',
  },
  {
    id: 'breakfast-time',
    category: 'breakfast',
    italian: 'La colazione viene servita dalle sei alle nove.',
    english: 'Breakfast is served from six to nine.',
  },
  {
    id: 'breakfast-location',
    category: 'breakfast',
    italian: 'La colazione viene servita al piano terra.',
    english: 'Breakfast is served on the ground floor.',
  },
  {
    id: 'breakfast-add',
    category: 'breakfast',
    italian: 'Desidera aggiungere la colazione?',
    english: 'Would you like to add breakfast?',
  },
  {
    id: 'breakfast-cost',
    category: 'breakfast',
    italian: 'La colazione costa sette euro a persona.',
    english: 'Breakfast costs seven euros per person.',
  },


  // =========================================================
  // 💳 PAGAMENTI
  // =========================================================

  {
    id: 'payment-total',
    category: 'payments',
    italian: 'Questo è il totale del suo soggiorno.',
    english: 'This is the total for your stay.',
  },
  {
    id: 'payment-method',
    category: 'payments',
    italian: 'Come desidera pagare?',
    english: 'How would you like to pay?',
  },
  {
    id: 'payment-card',
    category: 'payments',
    italian: 'Può pagare con la carta.',
    english: 'You can pay by card.',
  },
  {
    id: 'payment-cash',
    category: 'payments',
    italian: 'Può pagare in contanti.',
    english: 'You can pay in cash.',
  },
  {
    id: 'payment-card-here',
    category: 'payments',
    italian: 'Può inserire la carta qui, per favore.',
    english: 'You can insert your card here, please.',
  },
  {
    id: 'payment-contactless',
    category: 'payments',
    italian: 'Può appoggiare la carta qui.',
    english: 'You can tap your card here.',
  },
  {
    id: 'payment-pin',
    category: 'payments',
    italian: 'Può inserire il PIN, per favore.',
    english: 'Please enter your PIN.',
  },
  {
    id: 'payment-approved',
    category: 'payments',
    italian: 'Perfetto, il pagamento è andato a buon fine.',
    english: 'Perfect, the payment was successful.',
  },
  {
    id: 'payment-declined',
    category: 'payments',
    italian: 'Mi dispiace, il pagamento non è andato a buon fine.',
    english: 'I am sorry, the payment was not successful.',
  },
  {
    id: 'payment-try-again',
    category: 'payments',
    italian: 'Possiamo riprovare, per favore?',
    english: 'Could we try again, please?',
  },
  {
    id: 'payment-receipt',
    category: 'payments',
    italian: 'Desidera la ricevuta?',
    english: 'Would you like a receipt?',
  },
  {
    id: 'payment-invoice',
    category: 'payments',
    italian: 'Ha bisogno della fattura?',
    english: 'Do you need an invoice?',
  },
  {
    id: 'payment-invoice-details',
    category: 'payments',
    italian: 'Posso avere i dati per la fattura, per favore?',
    english: 'May I have the billing details, please?',
  },


  // =========================================================
  // 📞 TELEFONO
  // =========================================================

  {
    id: 'phone-answer',
    category: 'phone',
    italian: 'Buongiorno, reception. Come posso aiutarla?',
    english: 'Good morning, reception. How may I help you?',
  },
  {
    id: 'phone-name',
    category: 'phone',
    italian: 'Posso sapere con chi parlo?',
    english: 'May I ask who is calling?',
  },
  {
    id: 'phone-room',
    category: 'phone',
    italian: 'Posso avere il numero della camera?',
    english: 'May I have your room number?',
  },
  {
    id: 'phone-hold',
    category: 'phone',
    italian: 'Un momento, per favore. Rimanga in linea.',
    english: 'One moment, please. Please stay on the line.',
  },
  {
    id: 'phone-transfer',
    category: 'phone',
    italian: 'Le passo subito la chiamata.',
    english: 'I will transfer your call now.',
  },
  {
    id: 'phone-not-available',
    category: 'phone',
    italian: 'Mi dispiace, al momento non è disponibile.',
    english: 'I am sorry, they are not available at the moment.',
  },
  {
    id: 'phone-message',
    category: 'phone',
    italian: 'Vuole lasciare un messaggio?',
    english: 'Would you like to leave a message?',
  },
  {
    id: 'phone-repeat',
    category: 'phone',
    italian: 'Può ripetere, per favore?',
    english: 'Could you repeat that, please?',
  },
  {
    id: 'phone-slow',
    category: 'phone',
    italian: 'Può parlare più lentamente, per favore?',
    english: 'Could you speak more slowly, please?',
  },
  {
    id: 'phone-spell',
    category: 'phone',
    italian: 'Può fare lo spelling, per favore?',
    english: 'Could you spell that, please?',
  },


  // =========================================================
  // 🙋 RICHIESTE DEGLI OSPITI
  // =========================================================

  {
    id: 'request-help',
    category: 'requests',
    italian: 'Certamente, controllo subito.',
    english: 'Of course, I will check right away.',
  },
  {
    id: 'request-towels',
    category: 'requests',
    italian: 'Ha bisogno di asciugamani puliti?',
    english: 'Do you need clean towels?',
  },
  {
    id: 'request-extra-pillow',
    category: 'requests',
    italian: 'Ha bisogno di un cuscino in più?',
    english: 'Do you need an extra pillow?',
  },
  {
    id: 'request-blanket',
    category: 'requests',
    italian: 'Ha bisogno di una coperta in più?',
    english: 'Do you need an extra blanket?',
  },
  {
    id: 'request-taxi',
    category: 'requests',
    italian: 'Vuole che le chiami un taxi?',
    english: 'Would you like me to call a taxi for you?',
  },
  {
    id: 'request-wakeup',
    category: 'requests',
    italian: 'A che ora desidera la sveglia?',
    english: 'What time would you like your wake-up call?',
  },
  {
    id: 'request-luggage',
    category: 'requests',
    italian: 'Può lasciare i bagagli qui in reception.',
    english: 'You can leave your luggage here at reception.',
  },


  // =========================================================
  // ⚠️ PROBLEMI / RECLAMI
  // =========================================================

  {
    id: 'problem-sorry',
    category: 'problems',
    italian: 'Mi dispiace per l’inconveniente.',
    english: 'I am sorry for the inconvenience.',
  },
  {
    id: 'problem-check',
    category: 'problems',
    italian: 'Controllo subito per lei.',
    english: 'I will check that for you right away.',
  },
  {
    id: 'problem-understand',
    category: 'problems',
    italian: 'Capisco il problema.',
    english: 'I understand the problem.',
  },
  {
    id: 'problem-maintenance',
    category: 'problems',
    italian: 'Contatto subito la manutenzione.',
    english: 'I will contact maintenance right away.',
  },
  {
    id: 'problem-housekeeping',
    category: 'problems',
    italian: 'Contatto subito il personale delle pulizie.',
    english: 'I will contact housekeeping right away.',
  },
  {
    id: 'problem-manager',
    category: 'problems',
    italian: 'Un momento, per favore. Chiamo il responsabile.',
    english: 'One moment, please. I will call the manager.',
  },
  {
    id: 'problem-wait',
    category: 'problems',
    italian: 'Mi dispiace per l’attesa. Stiamo verificando.',
    english: 'I am sorry for the wait. We are checking.',
  },


  // =========================================================
  // 💬 FRASI GENERICHE
  // =========================================================

  {
    id: 'general-good-morning',
    category: 'general',
    italian: 'Buongiorno.',
    english: 'Good morning.',
  },
  {
    id: 'general-good-evening',
    category: 'general',
    italian: 'Buonasera.',
    english: 'Good evening.',
  },
  {
    id: 'general-welcome',
    category: 'general',
    italian: 'Benvenuti.',
    english: 'Welcome.',
  },
  {
    id: 'general-please',
    category: 'general',
    italian: 'Per favore.',
    english: 'Please.',
  },
  {
    id: 'general-thank-you',
    category: 'general',
    italian: 'Grazie mille.',
    english: 'Thank you very much.',
  },
  {
    id: 'general-youre-welcome',
    category: 'general',
    italian: 'Prego.',
    english: 'You’re welcome.',
  },
  {
    id: 'general-one-moment',
    category: 'general',
    italian: 'Un momento, per favore.',
    english: 'One moment, please.',
  },
  {
    id: 'general-check',
    category: 'general',
    italian: 'Controllo subito.',
    english: 'I will check right away.',
  },
  {
    id: 'general-repeat',
    category: 'general',
    italian: 'Può ripetere, per favore?',
    english: 'Could you repeat that, please?',
  },
  {
    id: 'general-slowly',
    category: 'general',
    italian: 'Può parlare più lentamente, per favore?',
    english: 'Could you speak more slowly, please?',
  },
  {
    id: 'general-dont-understand',
    category: 'general',
    italian: 'Mi scusi, non ho capito.',
    english: 'I’m sorry, I didn’t understand.',
  },
  {
    id: 'general-anything-else',
    category: 'general',
    italian: 'Posso aiutarla con qualcos’altro?',
    english: 'May I help you with anything else?',
  },
  {
    id: 'general-no-problem',
    category: 'general',
    italian: 'Nessun problema.',
    english: 'No problem.',
  },
  {
    id: 'general-have-nice-day',
    category: 'general',
    italian: 'Buona giornata.',
    english: 'Have a nice day.',
  },
  {
    id: 'general-have-nice-evening',
    category: 'general',
    italian: 'Buona serata.',
    english: 'Have a nice evening.',
  },

];