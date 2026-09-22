import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PHRASES } from '../../data/phrases.data';
import { Favorites } from '../../core/services/favorites';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink],
  template: `
    <main class="page">
      <div class="container">

        <header class="header">
          <a
            routerLink="/"
            class="back"
            aria-label="Torna alla home"
          >
            ‹
          </a>

          <div>
            <h1>Preferiti</h1>
            <p>Le frasi che usi più spesso</p>
          </div>
        </header>

        @if (phrases().length) {

          <div class="phrase-list">

            @for (phrase of phrases(); track phrase.id) {

              <article class="phrase-card">

                <button
                  type="button"
                  class="favorite favorite--active"
                  aria-label="Rimuovi dai preferiti"
                  (click)="favorites.toggle(phrase.id)"
                >
                  ★
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

            }

          </div>

        } @else {

          <div class="empty">
            <div class="empty__icon">
              ☆
            </div>

            <h2>Nessun preferito</h2>

            <p>
              Salva le frasi che usi più spesso per
              trovarle velocemente qui.
            </p>

            <a routerLink="/" class="empty__button">
              Esplora le frasi
            </a>
          </div>

        }

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
        "Segoe UI",
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

      background: #fff;
      color: #172033;

      font-size: 30px;
      line-height: 1;
      text-decoration: none;
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
      position: relative;

      padding: 18px;

      border: 1px solid #edf0f4;
      border-radius: 20px;

      background: #fff;

      box-shadow: 0 5px 18px rgb(25 35 55 / 4%);
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
      display: flex;
      align-items: flex-start;
      gap: 12px;
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
      transform: scale(.98);
    }

    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;

      padding: 80px 30px;

      text-align: center;
    }

    .empty__icon {
      display: grid;
      width: 72px;
      height: 72px;

      place-items: center;

      border-radius: 22px;

      background: #f0f5ff;
      color: #5d8df5;

      font-size: 40px;
    }

    .empty h2 {
      margin: 20px 0 7px;
      font-size: 20px;
    }

    .empty p {
      max-width: 290px;
      margin: 0;

      color: #7b8497;

      font-size: 14px;
      line-height: 1.55;
    }

    .empty__button {
      display: flex;
      align-items: center;
      justify-content: center;

      min-height: 44px;
      margin-top: 24px;
      padding: 0 20px;

      border-radius: 13px;

      background: #5d8df5;
      color: #fff;

      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
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
export class FavoritesPage {

  readonly favorites = inject(Favorites);

  readonly phrases = computed(() => {
    const favoriteIds = this.favorites.favorites();

    return PHRASES.filter((phrase) =>
      favoriteIds.includes(phrase.id)
    );
  });

  speak(text: string): void {
    if (!('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang = 'it-IT';
    utterance.rate = 0.9;

    window.speechSynthesis.speak(utterance);
  }
}