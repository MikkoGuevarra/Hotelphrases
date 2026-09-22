import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PHRASES } from '../../data/phrases.data';
import { Favorites } from '../../core/services/favorites';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <main class="home">
      <div class="home__container">
        <!-- HEADER -->
        <header class="header">
          <div>
            <h1>Hotel Phrases</h1>
            <p>Ciao, Acela 👋</p>
          </div>

          <button type="button" class="language" aria-label="Lingua">🇮🇹</button>
        </header>

        <!-- HERO -->
        <section class="hero">
          <h2>Come posso aiutarti?</h2>

          <p>Trova velocemente la frase giusta da usare con gli ospiti.</p>

          <div class="search">
            <span class="search__icon">⌕</span>

            <input
              type="search"
              placeholder="Cerca una frase..."
              aria-label="Cerca una frase"
              [value]="search()"
              (input)="search.set($any($event.target).value)"
            />
          </div>
          @if (search()) {
            <div class="search-results">
              @for (phrase of searchResults(); track phrase.id) {
                <article class="search-result">
                  <button
                    type="button"
                    class="search-result__favorite"
                    [class.search-result__favorite--active]="
                      favorites.isFavorite(phrase.id)
                    "
                    [attr.aria-label]="
                      favorites.isFavorite(phrase.id)
                        ? 'Rimuovi dai preferiti'
                        : 'Aggiungi ai preferiti'
                    "
                    (click)="favorites.toggle(phrase.id)"
                  >
                    {{ favorites.isFavorite(phrase.id) ? '★' : '☆' }}
                  </button>

                  <div class="search-result__language">
                    <span>🇮🇹</span>

                    <p class="search-result__italian">
                      {{ phrase.italian }}
                    </p>
                  </div>

                  <div class="search-result__language">
                    <span>🇬🇧</span>

                    <p>
                      {{ phrase.english }}
                    </p>
                  </div>

                  <button
                    type="button"
                    class="search-result__listen"
                    (click)="speak(phrase.italian)"
                  >
                    <span>🔊</span>
                    Ascolta
                  </button>
                </article>
              } @empty {
                <div class="search-empty">
                  <span>🔍</span>

                  <p>
                    Nessuna frase trovata per
                    <strong>"{{ search() }}"</strong>
                  </p>
                </div>
              }
            </div>
          }
        </section>

        <!-- CATEGORIE -->
        <section class="categories">
          <div class="section-header">
            <h3>Categorie</h3>

            <button type="button">Vedi tutte</button>
          </div>

          <div class="categories__grid">
            @for (category of categories; track category.id) {
              <button
                type="button"
                class="category-card"
                [routerLink]="['/category', category.id]"
              >
                <span class="category-card__icon">
                  {{ category.icon }}
                </span>

                <span class="category-card__label">
                  {{ category.label }}
                </span>

                <span class="category-card__arrow"> › </span>
              </button>
            }
          </div>
        </section>

        <a routerLink="/favorites" class="favorites-link">
          <span>⭐</span>

          <div>
            <strong>I miei preferiti</strong>
            <small>Le frasi che usi più spesso</small>
          </div>

          <span class="favorites-link__arrow">›</span>
        </a>

        <a routerLink="/compose" class="compose-link">
          <span class="compose-link__icon">✨</span>

          <div>
            <strong>Componi una frase</strong>
            <small>Inserisci i dati e crea la frase da dire all'ospite</small>
          </div>

          <span class="compose-link__arrow">›</span>
        </a>
      </div>
    </main>
  `,
  styles: `
    :host {
      display: block;
    }

    .home {
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

    .home__container {
      width: min(100%, 520px);
      min-height: 100dvh;
      margin: 0 auto;
      padding: 24px 20px 40px;
      background: #ffffff;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 40px;
    }

    .header h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 750;
      letter-spacing: -0.02em;
    }

    .header p {
      margin: 5px 0 0;
      color: #7b8497;
      font-size: 14px;
    }

    .language {
      display: grid;
      width: 42px;
      height: 42px;
      padding: 0;
      place-items: center;

      border: 1px solid #e8ebf0;
      border-radius: 14px;

      background: #ffffff;
      font-size: 19px;
      cursor: pointer;
    }

    .hero {
      margin-bottom: 32px;
    }

    .hero h2 {
      margin: 0;
      font-size: clamp(27px, 8vw, 34px);
      line-height: 1.12;
      letter-spacing: -0.035em;
    }

    .hero > p {
      max-width: 390px;
      margin: 10px 0 24px;
      color: #7b8497;
      font-size: 15px;
      line-height: 1.5;
    }

    .search {
      display: flex;
      align-items: center;
      gap: 12px;

      height: 56px;
      padding: 0 16px;

      border: 1px solid #e4e8ef;
      border-radius: 16px;

      background: #f8fafc;

      transition:
        border-color 150ms ease,
        box-shadow 150ms ease,
        background 150ms ease;
    }

    .search:focus-within {
      border-color: #5d8df5;
      background: #ffffff;
      box-shadow: 0 0 0 4px rgb(93 141 245 / 10%);
    }

    .search__icon {
      color: #8992a3;
      font-size: 25px;
      line-height: 1;
    }

    .search input {
      width: 100%;
      border: 0;
      outline: 0;
      background: transparent;

      color: #172033;
      font: inherit;
      font-size: 15px;
    }

    .search input::placeholder {
      color: #a2a9b6;
    }

    .categories {
      margin-top: 32px;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .section-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .section-header button {
      padding: 6px;
      border: 0;
      background: transparent;
      color: #5d8df5;
      font: inherit;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }

    .categories__grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .category-card {
      position: relative;

      display: flex;
      flex-direction: column;
      align-items: flex-start;

      min-width: 0;
      min-height: 125px;
      padding: 16px;

      border: 1px solid #edf0f4;
      border-radius: 18px;

      background: #ffffff;
      color: #172033;
      text-align: left;

      cursor: pointer;

      box-shadow: 0 5px 18px rgb(25 35 55 / 4%);

      transition:
        transform 150ms ease,
        border-color 150ms ease,
        box-shadow 150ms ease;
    }

    .category-card:hover {
      transform: translateY(-2px);
      border-color: #dfe6f2;
      box-shadow: 0 8px 24px rgb(25 35 55 / 8%);
    }

    .category-card:active {
      transform: scale(0.98);
    }

    .category-card__icon {
      display: grid;
      width: 42px;
      height: 42px;
      margin-bottom: 15px;

      place-items: center;

      border-radius: 13px;
      background: #f0f5ff;

      font-size: 20px;
    }

    .category-card__label {
      padding-right: 20px;
      font-size: 14px;
      font-weight: 650;
    }

    .category-card__arrow {
      position: absolute;
      right: 16px;
      bottom: 14px;

      color: #a2a9b6;
      font-size: 22px;
      line-height: 1;
    }

    .favorites-link {
      display: flex;
      align-items: center;
      gap: 14px;

      margin-top: 24px;
      padding: 16px;

      border: 1px solid #edf0f4;
      border-radius: 18px;

      background: #fff;
      color: #172033;

      text-decoration: none;

      box-shadow: 0 5px 18px rgb(25 35 55 / 4%);
    }

    .favorites-link > span:first-child {
      display: grid;
      width: 42px;
      height: 42px;
      flex: 0 0 auto;

      place-items: center;

      border-radius: 13px;
      background: #fff7df;

      font-size: 20px;
    }

    .favorites-link div {
      display: flex;
      min-width: 0;
      flex: 1;
      flex-direction: column;
      gap: 3px;
    }

    .favorites-link strong {
      font-size: 14px;
    }

    .favorites-link small {
      color: #8b93a3;
      font-size: 12px;
    }

    .favorites-link__arrow {
      color: #a2a9b6;
      font-size: 24px;
    }

    .search-results {
      display: flex;
      flex-direction: column;
      gap: 10px;

      margin-top: 12px;
    }

    .search-result {
      padding: 14px;

      border: 1px solid #edf0f4;
      border-radius: 16px;

      background: #fff;

      box-shadow: 0 5px 18px rgb(25 35 55 / 4%);
    }

    .search-result__language {
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .search-result__language + .search-result__language {
      margin-top: 9px;
    }

    .search-result__language span {
      flex: 0 0 auto;
    }

    .search-result__language p {
      margin: 0;

      color: #172033;

      font-size: 14px;
      line-height: 1.45;
    }

    .search-result__language:last-child p {
      color: #7b8497;
      font-size: 13px;
    }

    .search-empty {
      padding: 24px;

      border: 1px dashed #dfe4ec;
      border-radius: 16px;

      color: #7b8497;
      text-align: center;
    }

    .search-empty > span {
      font-size: 25px;
    }

    .search-empty p {
      margin: 8px 0 0;

      font-size: 13px;
      line-height: 1.5;
    }

    .search-result {
      position: relative;
    }

    .search-result__favorite {
      position: absolute;
      top: 10px;
      right: 10px;

      display: grid;
      width: 36px;
      height: 36px;
      padding: 0;

      place-items: center;

      border: 0;
      border-radius: 50%;

      background: transparent;
      color: #a2a9b6;

      font-size: 24px;
      cursor: pointer;
    }

    .search-result__favorite--active {
      color: #f4b740;
    }

    .search-result__language {
      padding-right: 36px;
    }

    .search-result__italian {
      font-weight: 650;
    }

    .search-result__listen {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;

      width: 100%;
      height: 40px;
      margin-top: 13px;

      border: 0;
      border-radius: 12px;

      background: #edf4ff;
      color: #3973dd;

      font: inherit;
      font-size: 13px;
      font-weight: 700;

      cursor: pointer;
    }

    .search-result__listen:active {
      transform: scale(0.98);
    }

    .compose-link {
      display: flex;
      align-items: center;
      gap: 14px;

      margin-top: 12px;
      padding: 16px;

      border: 1px solid #edf0f4;
      border-radius: 18px;

      background: #fff;
      color: #172033;

      text-decoration: none;

      box-shadow: 0 5px 18px rgb(25 35 55 / 4%);
    }

    .compose-link__icon {
      display: grid;
      width: 42px;
      height: 42px;
      flex: 0 0 auto;

      place-items: center;

      border-radius: 13px;
      background: #f0f5ff;

      font-size: 20px;
    }

    .compose-link div {
      display: flex;
      min-width: 0;
      flex: 1;
      flex-direction: column;
      gap: 3px;
    }

    .compose-link strong {
      font-size: 14px;
    }

    .compose-link small {
      color: #8b93a3;
      font-size: 12px;
      line-height: 1.4;
    }

    .compose-link__arrow {
      color: #a2a9b6;
      font-size: 24px;
    }

    @media (min-width: 600px) {
      .home {
        padding: 32px 0;
      }

      .home__container {
        min-height: calc(100dvh - 64px);
        border: 1px solid #edf0f4;
        border-radius: 28px;
        box-shadow: 0 20px 60px rgb(25 35 55 / 8%);
      }
    }
  `,
})
export class Home {
  readonly search = signal('');
  readonly favorites = inject(Favorites);
  readonly searchResults = computed(() => {
    const query = this.search().trim().toLowerCase();

    if (!query) {
      return [];
    }

    return PHRASES.filter(
      (phrase) =>
        phrase.italian.toLowerCase().includes(query) ||
        phrase.english.toLowerCase().includes(query),
    );
  });

  speak(text: string): void {
    if (!('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = 'it-IT';
    utterance.rate = 0.9;

    window.speechSynthesis.speak(utterance);
  }
  readonly categories = [
    {
      id: 'check-in',
      label: 'Check-in',
      icon: '🛎️',
    },
    {
      id: 'check-out',
      label: 'Check-out',
      icon: '👋',
    },
    {
      id: 'reservations',
      label: 'Prenotazioni',
      icon: '📅',
    },
    {
      id: 'breakfast',
      label: 'Colazione',
      icon: '☕',
    },
    {
      id: 'payments',
      label: 'Pagamenti',
      icon: '💳',
    },
    {
      id: 'phone',
      label: 'Telefono',
      icon: '📞',
    },
  ];
}
