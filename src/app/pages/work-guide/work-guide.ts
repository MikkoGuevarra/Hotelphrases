import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface GuideItem {
  id: string;
  title: string;
  description?: string;
  steps: string[];
  warning?: string;
}

interface GuideCategory {
  id: string;
  icon: string;
  title: string;
  description: string;
  items: GuideItem[];
}

@Component({
  selector: 'app-work-guide',
  imports: [RouterLink],
  template: `
    <main class="page">
      <div class="container">

        <!-- HEADER -->
        <header class="header">
          <a
            routerLink="/"
            class="back"
            aria-label="Torna alla home"
          >
            ‹
          </a>

          <div>
            <h1>Guida lavoro</h1>
            <p>I tuoi appunti sempre con te</p>
          </div>
        </header>

        <!-- HERO -->
        <section class="hero">
          <span class="hero__icon">📋</span>

          <div>
            <h2>Cosa devi fare?</h2>

            <p>
              Cerca velocemente una procedura
              o un promemoria.
            </p>
          </div>
        </section>

        <!-- SEARCH -->
        <div class="search">
          <span>⌕</span>

          <input
            type="search"
            placeholder="Cerca: Booking, fattura, Wi-Fi..."
            [value]="query()"
            (input)="query.set($any($event.target).value)"
          />

          @if (query()) {
            <button
              type="button"
              aria-label="Cancella ricerca"
              (click)="query.set('')"
            >
              ×
            </button>
          }
        </div>

        <!-- CATEGORY FILTER -->
        <div class="filters">

          <button
            type="button"
            [class.active]="selectedCategory() === 'all'"
            (click)="selectedCategory.set('all')"
          >
            Tutte
          </button>

          @for (category of categories; track category.id) {

            <button
              type="button"
              [class.active]="selectedCategory() === category.id"
              (click)="selectedCategory.set(category.id)"
            >
              {{ category.icon }}
              {{ category.title }}
            </button>

          }

        </div>

        <!-- RESULTS -->
        <section class="results">

          @for (category of filteredCategories(); track category.id) {

            <div class="category">

              <div class="category__header">

                <span class="category__icon">
                  {{ category.icon }}
                </span>

                <div>
                  <h2>{{ category.title }}</h2>
                  <p>{{ category.description }}</p>
                </div>

              </div>

              <div class="items">

                @for (item of category.items; track item.id) {

                  <article class="guide-card">

                    <div class="guide-card__header">

                      <div>
                        <h3>{{ item.title }}</h3>

                        @if (item.description) {
                          <p>
                            {{ item.description }}
                          </p>
                        }
                      </div>

                    </div>

                    <ol class="steps">

                      @for (step of item.steps; track $index) {

                        <li>
                          <span class="step-number">
                            {{ $index + 1 }}
                          </span>

                          <span>
                            {{ step }}
                          </span>
                        </li>

                      }

                    </ol>

                    @if (item.warning) {

                      <div class="warning">
                        <span>💡</span>

                        <p>
                          {{ item.warning }}
                        </p>
                      </div>

                    }

                  </article>

                }

              </div>

            </div>

          } @empty {

            <div class="empty">
              <span>🔎</span>

              <h2>Nessun risultato</h2>

              <p>
                Prova a cercare con un'altra parola.
              </p>
            </div>

          }

        </section>

      </div>
    </main>
  `,
  styles: `
    :host {
      display: block;
    }

    :host,
    :host *,
    :host *::before,
    :host *::after {
      box-sizing: border-box;
    }

    .page {
      min-height: 100dvh;

      background: #f7f9fc;
      color: #172033;

      font-family:
        Inter,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        sans-serif;
    }

    .container {
      width: min(100%, 560px);
      min-height: 100dvh;

      margin: 0 auto;
      padding: 24px 20px 60px;

      background: #fff;
    }

    /* HEADER */

    .header {
      display: flex;
      align-items: center;
      gap: 14px;

      margin-bottom: 24px;
    }

    .back {
      display: grid;

      width: 42px;
      height: 42px;

      flex: 0 0 auto;

      place-items: center;

      border: 1px solid #e8ebf0;
      border-radius: 14px;

      color: #172033;
      text-decoration: none;

      font-size: 30px;
      line-height: 1;
    }

    .header h1 {
      margin: 0;

      font-size: 23px;
      letter-spacing: -.03em;
    }

    .header p {
      margin: 3px 0 0;

      color: #929aaa;

      font-size: 13px;
    }

    /* HERO */

    .hero {
      display: flex;
      align-items: center;
      gap: 14px;

      padding: 18px;

      border: 1px solid #dce8ff;
      border-radius: 20px;

      background:
        linear-gradient(
          135deg,
          #f1f6ff,
          #fafcff
        );
    }

    .hero__icon {
      display: grid;

      width: 48px;
      height: 48px;

      flex: 0 0 auto;

      place-items: center;

      border-radius: 15px;

      background: #fff;

      font-size: 23px;

      box-shadow:
        0 5px 15px rgb(35 70 130 / 8%);
    }

    .hero h2 {
      margin: 0;

      font-size: 17px;
    }

    .hero p {
      margin: 4px 0 0;

      color: #7f899b;

      font-size: 12px;
      line-height: 1.45;
    }

    /* SEARCH */

    .search {
      display: flex;
      align-items: center;
      gap: 10px;

      height: 52px;

      margin-top: 18px;
      padding: 0 14px;

      border: 1px solid #e4e8ee;
      border-radius: 15px;

      background: #fafbfc;
    }

    .search > span {
      color: #8993a4;

      font-size: 22px;
    }

    .search input {
      width: 100%;
      min-width: 0;

      border: 0;
      outline: 0;

      background: transparent;

      color: #172033;

      font: inherit;
      font-size: 14px;
    }

    .search input::placeholder {
      color: #a5adba;
    }

    .search button {
      border: 0;

      background: transparent;
      color: #929aaa;

      font-size: 22px;

      cursor: pointer;
    }

    /* FILTERS */

    .filters {
      display: flex;
      gap: 8px;

      margin: 16px -20px 28px;
      padding: 0 20px;

      overflow-x: auto;

      scrollbar-width: none;
    }

    .filters::-webkit-scrollbar {
      display: none;
    }

    .filters button {
      flex: 0 0 auto;

      padding: 9px 13px;

      border: 1px solid #e6eaf0;
      border-radius: 999px;

      background: #fff;
      color: #697386;

      font: inherit;
      font-size: 12px;
      font-weight: 650;

      cursor: pointer;
    }

    .filters button.active {
      border-color: #5d8df5;

      background: #5d8df5;
      color: #fff;
    }

    /* CATEGORY */

    .category + .category {
      margin-top: 34px;
    }

    .category__header {
      display: flex;
      align-items: center;
      gap: 11px;

      margin-bottom: 13px;
    }

    .category__icon {
      display: grid;

      width: 38px;
      height: 38px;

      flex: 0 0 auto;

      place-items: center;

      border-radius: 12px;

      background: #f1f5fb;

      font-size: 18px;
    }

    .category__header h2 {
      margin: 0;

      font-size: 16px;
    }

    .category__header p {
      margin: 2px 0 0;

      color: #939baa;

      font-size: 11px;
    }

    /* CARDS */

    .items {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .guide-card {
      padding: 17px;

      border: 1px solid #e8ecf1;
      border-radius: 18px;

      background: #fff;

      box-shadow:
        0 5px 20px rgb(20 35 60 / 4%);
    }

    .guide-card__header h3 {
      margin: 0;

      font-size: 14px;
    }

    .guide-card__header p {
      margin: 4px 0 0;

      color: #8b94a5;

      font-size: 11px;
      line-height: 1.4;
    }

    /* STEPS */

    .steps {
      display: flex;
      flex-direction: column;
      gap: 11px;

      margin: 15px 0 0;
      padding: 0;

      list-style: none;
    }

    .steps li {
      display: flex;
      align-items: flex-start;
      gap: 10px;

      color: #515c70;

      font-size: 13px;
      line-height: 1.5;
    }

    .step-number {
      display: grid;

      width: 23px;
      height: 23px;

      flex: 0 0 auto;

      place-items: center;

      border-radius: 8px;

      background: #edf4ff;
      color: #4c7dde;

      font-size: 10px;
      font-weight: 800;
    }

    /* WARNING */

    .warning {
      display: flex;
      align-items: flex-start;
      gap: 9px;

      margin-top: 15px;
      padding: 11px 12px;

      border-radius: 12px;

      background: #fff9e9;
    }

    .warning p {
      margin: 0;

      color: #7a6840;

      font-size: 11px;
      line-height: 1.45;
    }

    /* EMPTY */

    .empty {
      padding: 50px 20px;

      text-align: center;
    }

    .empty > span {
      font-size: 32px;
    }

    .empty h2 {
      margin: 12px 0 4px;

      font-size: 16px;
    }

    .empty p {
      margin: 0;

      color: #919aaa;

      font-size: 12px;
    }

    @media (min-width: 600px) {

      .page {
        padding: 32px 0;
      }

      .container {
        min-height: calc(100dvh - 64px);

        border: 1px solid #edf0f4;
        border-radius: 28px;

        box-shadow:
          0 20px 60px
          rgb(25 35 55 / 8%);
      }

    }
  `,
})
export class WorkGuide {

  readonly query = signal('');

  readonly selectedCategory = signal('all');

  readonly categories: GuideCategory[] = [

    /* =========================
       CHECK-IN
    ========================= */

    {
      id: 'check-in',
      icon: '🛎️',
      title: 'Check-in',
      description: 'Informazioni utili durante l’arrivo',
      items: [
        {
          id: 'check-in-info',
          title: 'Informazioni principali',
          steps: [
            'Controlla i dati della prenotazione.',
            'Verifica le informazioni della camera.',
            'Comunica gli orari dei servizi necessari.',
          ],
        },
        {
          id: 'wifi',
          title: 'Wi-Fi',
          steps: [
            'Il Wi-Fi è gratuito.',
            'Non serve la password.',
          ],
        },
        {
          id: 'assistance',
          title: 'Assistenza',
          steps: [
            'Se l’ospite ha bisogno di assistenza, può contattare la Reception.',
          ],
        },
      ],
    },

    /* =========================
       CHECK-OUT
    ========================= */

    {
      id: 'check-out',
      icon: '👋',
      title: 'Check-out',
      description: 'Controlli prima della partenza',
      items: [
        {
          id: 'key-card',
          title: 'Key card',
          steps: [
            'Controlla se il cliente ha restituito la key card.',
            'Se non è stata restituita, verifica prima di completare la partenza.',
          ],
        },
        {
          id: 'receipt-invoice',
          title: 'Ricevuta o fattura',
          steps: [
            'Controlla se deve essere emessa una ricevuta.',
            'Controlla se il cliente richiede una fattura.',
          ],
          warning:
            'Negli appunti è indicato di prestare particolare attenzione alla ricevuta.',
        },
      ],
    },

    /* =========================
       PRENOTAZIONI
    ========================= */

    {
      id: 'reservations',
      icon: '📅',
      title: 'Prenotazioni',
      description: 'Booking, aziende e prenotazioni manuali',
      items: [
        {
          id: 'company',
          title: 'Prenotante / Company',
          steps: [
            'Controlla il nome dell’azienda associata alla prenotazione.',
            'Se manca il nome, verifica prima i dati della company.',
          ],
        },
        {
          id: 'booking',
          title: 'Booking.com',
          steps: [
            'Controlla se la prenotazione è prepagata.',
            'Verifica chi è il pagante.',
            'Controlla se paga l’azienda oppure il cliente.',
          ],
        },
        {
          id: 'manual-reservation',
          title: 'Prenotazione manuale',
          steps: [
            'Quando crei una prenotazione manuale, controlla attentamente la tariffa.',
            'Verifica i dati prima di confermare.',
          ],
        },
        {
          id: 'disabled-room',
          title: 'Camere disabilitate',
          steps: [
            'Controlla le camere disabilitate prima di assegnare una camera.',
            'Controlla sempre le prenotazioni in corso per evitare di bloccare il sistema.',
          ],
        },
      ],
    },

    /* =========================
       COLAZIONE
    ========================= */

    {
      id: 'breakfast',
      icon: '☕',
      title: 'Colazione e servizi',
      description: 'Orari e informazioni da ricordare',
      items: [
        {
          id: 'breakfast-info',
          title: 'Colazione',
          steps: [
            'Controlla se la colazione è inclusa nella prenotazione.',
            'Se necessario, comunica all’ospite gli orari e il luogo.',
          ],
        },
      ],
    },

    /* =========================
       PAGAMENTI
    ========================= */

    {
      id: 'payments',
      icon: '💳',
      title: 'Pagamenti',
      description: 'Pagante, azienda, cliente e documenti',
      items: [
        {
          id: 'payer',
          title: 'Chi paga?',
          steps: [
            'Controlla sempre chi è indicato come pagante.',
            'Company significa che il pagante è l’azienda.',
            'Client significa che paga il cliente.',
          ],
        },
        {
          id: 'company-transfer',
          title: 'Pagamento azienda',
          steps: [
            'Se paga l’azienda, controlla le indicazioni presenti nella prenotazione.',
            'Negli appunti è indicato anche il pagamento tramite bonifico.',
          ],
        },
        {
          id: 'fiscal-document',
          title: 'Documento fiscale',
          steps: [
            'Controlla se serve una ricevuta.',
            'Controlla se serve una fattura.',
            'Verifica i dati prima di completare l’operazione.',
          ],
        },
      ],
    },

    /* =========================
       TELEFONO / RECEPTION
    ========================= */

    {
      id: 'reception',
      icon: '☎️',
      title: 'Reception',
      description: 'Telefonate e controlli operativi',
      items: [
        {
          id: 'phone-call',
          title: 'Phone call',
          steps: [
            'Ascolta la richiesta del cliente.',
            'Se necessario, metti la chiamata in attesa.',
            'Trasferisci la chiamata alla persona o al reparto corretto.',
          ],
        },
        {
          id: 'important-checks',
          title: 'Controlli importanti',
          steps: [
            'Controlla subito le informazioni importanti.',
            'Se qualcosa non è chiaro, verifica prima di procedere.',
          ],
        },
      ],
    },

    /* =========================
       EMAIL
    ========================= */

    {
      id: 'email',
      icon: '✉️',
      title: 'Email',
      description: 'Promemoria per comunicazioni e documenti',
      items: [
        {
          id: 'email-documents',
          title: 'Documenti email',
          steps: [
            'Controlla le email relative al check-in e al check-out.',
            'Controlla eventuali confirmation letter.',
            'Verifica eventuali documenti o informazioni allegati.',
          ],
        },
      ],
    },

  ];

  readonly filteredCategories = computed(() => {

    const query =
      this.query()
        .trim()
        .toLowerCase();

    const selected =
      this.selectedCategory();

    return this.categories
      .filter(category => {

        if (
          selected !== 'all' &&
          category.id !== selected
        ) {
          return false;
        }

        return true;

      })
      .map(category => {

        if (!query) {
          return category;
        }

        const categoryMatches =
          category.title
            .toLowerCase()
            .includes(query) ||
          category.description
            .toLowerCase()
            .includes(query);

        const items =
          category.items.filter(item => {

            const text = [
              item.title,
              item.description ?? '',
              ...item.steps,
              item.warning ?? '',
            ]
              .join(' ')
              .toLowerCase();

            return text.includes(query);

          });

        if (
          categoryMatches &&
          items.length === 0
        ) {
          return category;
        }

        return {
          ...category,
          items,
        };

      })
      .filter(
        category =>
          !query ||
          category.items.length > 0 ||
          category.title
            .toLowerCase()
            .includes(query) ||
          category.description
            .toLowerCase()
            .includes(query)
      );

  });
}