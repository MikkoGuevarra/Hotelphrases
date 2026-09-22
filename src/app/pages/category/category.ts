import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PHRASES } from '../../data/phrases.data';
import { PhraseCategory } from '../../models/phrase.model';
import { Favorites } from '../../core/services/favorites';

@Component({
  selector: 'app-category',
  imports: [RouterLink],
  template: `
    <main class="page">
      <div class="container">
        <header class="header">
          <a routerLink="/" class="back" aria-label="Torna alla home"> ‹ </a>

          <div>
            <h1>{{ title() }}</h1>
            <p>{{ phrases().length }} frasi</p>
          </div>
        </header>

        <div class="phrase-list">
          @for (phrase of phrases(); track phrase.id) {
            <article class="phrase-card">
              <button
                type="button"
                class="favorite"
                [class.favorite--active]="favorites.isFavorite(phrase.id)"
                [attr.aria-label]="
                  favorites.isFavorite(phrase.id)
                    ? 'Rimuovi dai preferiti'
                    : 'Aggiungi ai preferiti'
                "
                (click)="favorites.toggle(phrase.id)"
              >
                {{ favorites.isFavorite(phrase.id) ? '★' : '☆' }}
              </button>
              <div class="phrase">
                <span class="flag">🇮🇹</span>

                <p class="italian">
                  {{ phrase.italian }}
                </p>
              </div>

              <div class="divider"></div>

              <div class="phrase">
                <span class="flag">🇬🇧</span>

                <p class="english">
                  {{ phrase.english }}
                </p>
              </div>

              <button
                type="button"
                class="listen"
                (click)="speak(phrase.italian)"
              >
                <span>🔊</span>
                Ascolta
              </button>
            </article>
          } @empty {
            <div class="empty">
              <span>💬</span>
              <h2>Nessuna frase</h2>
              <p>Non abbiamo ancora aggiunto frasi per questa categoria.</p>
            </div>
          }
        </div>
      </div>
    </main>
  `,
  styles: `
    :host {
      display: block;
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
      width: min(100%, 520px);
      min-height: 100dvh;
      margin: 0 auto;
      padding: 24px 20px 50px;
      background: #fff;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 28px;
    }

    .back {
      display: grid;
      flex: 0 0 auto;
      width: 42px;
      height: 42px;
      place-items: center;

      border: 1px solid #e8ebf0;
      border-radius: 14px;

      color: #172033;
      text-decoration: none;
      font-size: 30px;
      line-height: 1;

      background: #fff;
    }

    .header h1 {
      margin: 0;
      font-size: 23px;
      letter-spacing: -0.03em;
    }

    .header p {
      margin: 3px 0 0;
      color: #929aaa;
      font-size: 13px;
    }

    .phrase-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .phrase-card {
      padding: 18px;
      position: relative;
      border: 1px solid #edf0f4;
      border-radius: 20px;

      background: #fff;

      box-shadow: 0 5px 18px rgb(25 35 55 / 4%);
    }

    .phrase {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    .favorite {
      position: absolute;
      top: 14px;
      right: 14px;

      display: grid;
      width: 36px;
      height: 36px;
      padding: 0;

      place-items: center;

      border: 0;
      border-radius: 50%;

      background: transparent;
      color: #a2a9b6;

      font-size: 25px;
      line-height: 1;

      cursor: pointer;
    }

    .favorite--active {
      color: #f4b740;
    }

    .phrase {
      padding-right: 38px;
    }
    .flag {
      flex: 0 0 auto;
      font-size: 19px;
    }

    .phrase p {
      margin: 0;
      line-height: 1.5;
    }

    .italian {
      color: #172033;
      font-size: 16px;
      font-weight: 650;
    }

    .english {
      color: #7b8497;
      font-size: 14px;
    }

    .divider {
      height: 1px;
      margin: 14px 0;
      background: #f0f2f5;
    }

    .listen {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      width: 100%;
      height: 44px;
      margin-top: 18px;

      border: 0;
      border-radius: 13px;

      background: #edf4ff;
      color: #3973dd;

      font: inherit;
      font-size: 14px;
      font-weight: 700;

      cursor: pointer;
    }

    .listen:active {
      transform: scale(0.98);
    }

    .empty {
      padding: 60px 30px;
      color: #7b8497;
      text-align: center;
    }

    .empty > span {
      font-size: 36px;
    }

    .empty h2 {
      margin: 16px 0 6px;
      color: #172033;
      font-size: 18px;
    }

    .empty p {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
    }

    @media (min-width: 600px) {
      .page {
        padding: 32px 0;
      }

      .container {
        min-height: calc(100dvh - 64px);
        border: 1px solid #edf0f4;
        border-radius: 28px;
        box-shadow: 0 20px 60px rgb(25 35 55 / 8%);
      }
    }
  `,
})
export class Category {
  private readonly route = inject(ActivatedRoute);
  readonly favorites = inject(Favorites);
  readonly categoryId = this.route.snapshot.paramMap.get(
    'id',
  ) as PhraseCategory;

  readonly phrases = computed(() =>
    PHRASES.filter((phrase) => phrase.category === this.categoryId),
  );

  readonly title = computed(() => {
    const titles: Record<PhraseCategory, string> = {
      'check-in': 'Check-in',
      'check-out': 'Check-out',
      reservations: 'Prenotazioni',
      breakfast: 'Colazione',
      payments: 'Pagamenti',
      phone: 'Telefono',
    };

    return titles[this.categoryId] ?? 'Frasi';
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
}
