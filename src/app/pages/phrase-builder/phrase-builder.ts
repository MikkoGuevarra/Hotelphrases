import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type Situation =
  | 'check-in'
  | 'check-out'
  | 'reservations'
  | 'breakfast'
  | 'payments'
  | 'phone';

interface GeneratedPhrase {
  id: string;
  italian: string;
  english: string;
}

@Component({
  selector: 'app-phrase-builder',
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
            <h1>Componi frase</h1>
            <p>Crea una frase personalizzata per l'ospite</p>
          </div>
        </header>

        <!-- SITUAZIONE -->
        <section class="section">
          <label class="label">
            Situazione
          </label>

          <div class="situations">

            @for (item of situations; track item.id) {

              <button
                type="button"
                class="situation-card"
                [class.situation-card--active]="
                  situation() === item.id
                "
                (click)="situation.set(item.id)"
              >

                <span class="situation-card__icon">
                  {{ item.icon }}
                </span>

                <span class="situation-card__content">
                  <strong>{{ item.label }}</strong>
                  <small>{{ item.description }}</small>
                </span>

                @if (situation() === item.id) {
                  <span class="situation-card__check">
                    ✓
                  </span>
                }

              </button>

            }

          </div>
        </section>

        <!-- DETTAGLI -->
        <section class="section">
          <h2>Dettagli</h2>

          @switch (situation()) {

            <!-- =====================
                 CHECK-IN
            ====================== -->
            @case ('check-in') {

              <div class="field">
                <label for="guestName">
                  Nome ospite
                </label>

                <input
                  id="guestName"
                  type="text"
                  placeholder="Es. Mr. Smith"
                  [value]="guestName()"
                  (input)="
                    guestName.set(
                      $any($event.target).value
                    )
                  "
                />
              </div>

              <div class="form-row">

                <div class="field">
                  <label for="room">
                    Camera
                  </label>

                  <input
                    id="room"
                    type="text"
                    inputmode="numeric"
                    placeholder="Es. 205"
                    [value]="room()"
                    (input)="
                      room.set(
                        $any($event.target).value
                      )
                    "
                  />
                </div>

                <div class="field">
                  <label for="nights">
                    Notti
                  </label>

                  <input
                    id="nights"
                    type="number"
                    min="1"
                    placeholder="Es. 2"
                    [value]="nights()"
                    (input)="
                      nights.set(
                        $any($event.target).value
                      )
                    "
                  />
                </div>

              </div>

              <div class="field">
                <label for="checkout">
                  Data check-out
                </label>

                <input
                  id="checkout"
                  type="date"
                  [value]="checkout()"
                  (input)="
                    checkout.set(
                      $any($event.target).value
                    )
                  "
                />
              </div>

              <label class="toggle-card">

                <div>
                  <strong>☕ Colazione inclusa</strong>

                  <small>
                    Aggiungi le informazioni sulla colazione
                  </small>
                </div>

                <input
                  type="checkbox"
                  [checked]="breakfastIncluded()"
                  (change)="
                    breakfastIncluded.set(
                      $any($event.target).checked
                    )
                  "
                />

                <span class="toggle"></span>

              </label>

              @if (breakfastIncluded()) {

                <div class="options-box">

                  <div class="form-row">

                    <div class="field">
                      <label for="breakfastFrom">
                        Dalle
                      </label>

                      <input
                        id="breakfastFrom"
                        type="time"
                        [value]="breakfastFrom()"
                        (input)="
                          breakfastFrom.set(
                            $any($event.target).value
                          )
                        "
                      />
                    </div>

                    <div class="field">
                      <label for="breakfastTo">
                        Alle
                      </label>

                      <input
                        id="breakfastTo"
                        type="time"
                        [value]="breakfastTo()"
                        (input)="
                          breakfastTo.set(
                            $any($event.target).value
                          )
                        "
                      />
                    </div>

                  </div>

                  <div class="field">
                    <label for="breakfastLocation">
                      Dove
                    </label>

                    <input
                      id="breakfastLocation"
                      type="text"
                      placeholder="Es. piano terra"
                      [value]="breakfastLocation()"
                      (input)="
                        breakfastLocation.set(
                          $any($event.target).value
                        )
                      "
                    />
                  </div>

                </div>

              }

            }

            <!-- =====================
                 CHECK-OUT
            ====================== -->
            @case ('check-out') {

              <div class="field">
                <label for="checkoutRoom">
                  Numero camera
                </label>

                <input
                  id="checkoutRoom"
                  type="text"
                  inputmode="numeric"
                  placeholder="Es. 205"
                  [value]="checkoutRoom()"
                  (input)="
                    checkoutRoom.set(
                      $any($event.target).value
                    )
                  "
                />
              </div>

              <div class="field">
                <label for="checkoutTime">
                  Orario check-out
                </label>

                <input
                  id="checkoutTime"
                  type="time"
                  [value]="checkoutTime()"
                  (input)="
                    checkoutTime.set(
                      $any($event.target).value
                    )
                  "
                />
              </div>

              <label class="toggle-card">

                <div>
                  <strong>🧳 Deposito bagagli</strong>
                  <small>Chiedi se desidera lasciare i bagagli</small>
                </div>

                <input
                  type="checkbox"
                  [checked]="checkoutLuggage()"
                  (change)="
                    checkoutLuggage.set(
                      $any($event.target).checked
                    )
                  "
                />

                <span class="toggle"></span>

              </label>

              <label class="toggle-card toggle-card--spaced">

                <div>
                  <strong>🚕 Taxi</strong>
                  <small>Chiedi se ha bisogno di un taxi</small>
                </div>

                <input
                  type="checkbox"
                  [checked]="checkoutTaxi()"
                  (change)="
                    checkoutTaxi.set(
                      $any($event.target).checked
                    )
                  "
                />

                <span class="toggle"></span>

              </label>

            }

            <!-- =====================
                 PRENOTAZIONE
            ====================== -->
            @case ('reservations') {

              <div class="field">
                <label for="reservationName">
                  Nome prenotazione
                </label>

                <input
                  id="reservationName"
                  type="text"
                  placeholder="Es. Smith"
                  [value]="reservationName()"
                  (input)="
                    reservationName.set(
                      $any($event.target).value
                    )
                  "
                />
              </div>

              <div class="form-row">

                <div class="field">
                  <label for="reservationFrom">
                    Dal
                  </label>

                  <input
                    id="reservationFrom"
                    type="date"
                    [value]="reservationFrom()"
                    (input)="
                      reservationFrom.set(
                        $any($event.target).value
                      )
                    "
                  />
                </div>

                <div class="field">
                  <label for="reservationTo">
                    Al
                  </label>

                  <input
                    id="reservationTo"
                    type="date"
                    [value]="reservationTo()"
                    (input)="
                      reservationTo.set(
                        $any($event.target).value
                      )
                    "
                  />
                </div>

              </div>

              <div class="field">
                <label for="reservationGuests">
                  Numero ospiti
                </label>

                <input
                  id="reservationGuests"
                  type="number"
                  min="1"
                  placeholder="Es. 2"
                  [value]="reservationGuests()"
                  (input)="
                    reservationGuests.set(
                      $any($event.target).value
                    )
                  "
                />
              </div>

              <label class="toggle-card">

                <div>
                  <strong>☕ Colazione inclusa</strong>
                  <small>
                    La prenotazione comprende la colazione
                  </small>
                </div>

                <input
                  type="checkbox"
                  [checked]="reservationBreakfast()"
                  (change)="
                    reservationBreakfast.set(
                      $any($event.target).checked
                    )
                  "
                />

                <span class="toggle"></span>

              </label>

            }

            <!-- =====================
                 COLAZIONE
            ====================== -->
            @case ('breakfast') {

              <div class="form-row">

                <div class="field">
                  <label for="standaloneBreakfastFrom">
                    Dalle
                  </label>

                  <input
                    id="standaloneBreakfastFrom"
                    type="time"
                    [value]="standaloneBreakfastFrom()"
                    (input)="
                      standaloneBreakfastFrom.set(
                        $any($event.target).value
                      )
                    "
                  />
                </div>

                <div class="field">
                  <label for="standaloneBreakfastTo">
                    Alle
                  </label>

                  <input
                    id="standaloneBreakfastTo"
                    type="time"
                    [value]="standaloneBreakfastTo()"
                    (input)="
                      standaloneBreakfastTo.set(
                        $any($event.target).value
                      )
                    "
                  />
                </div>

              </div>

              <div class="field">
                <label for="standaloneBreakfastLocation">
                  Dove viene servita
                </label>

                <input
                  id="standaloneBreakfastLocation"
                  type="text"
                  placeholder="Es. piano terra"
                  [value]="standaloneBreakfastLocation()"
                  (input)="
                    standaloneBreakfastLocation.set(
                      $any($event.target).value
                    )
                  "
                />
              </div>

              <label class="toggle-card">

                <div>
                  <strong>✓ Colazione inclusa</strong>
                  <small>
                    Conferma che è inclusa nel soggiorno
                  </small>
                </div>

                <input
                  type="checkbox"
                  [checked]="standaloneBreakfastIncluded()"
                  (change)="
                    standaloneBreakfastIncluded.set(
                      $any($event.target).checked
                    )
                  "
                />

                <span class="toggle"></span>

              </label>

            }

            <!-- =====================
                 PAGAMENTO
            ====================== -->
            @case ('payments') {

              <div class="field">
                <label for="paymentAmount">
                  Importo
                </label>

                <div class="input-prefix">
                  <span>€</span>

                  <input
                    id="paymentAmount"
                    type="number"
                    inputmode="decimal"
                    min="0"
                    step="0.01"
                    placeholder="Es. 120.00"
                    [value]="paymentAmount()"
                    (input)="
                      paymentAmount.set(
                        $any($event.target).value
                      )
                    "
                  />
                </div>
              </div>

              <div class="field">
                <label for="paymentMethod">
                  Metodo di pagamento
                </label>

                <select
                  id="paymentMethod"
                  [value]="paymentMethod()"
                  (change)="
                    paymentMethod.set(
                      $any($event.target).value
                    )
                  "
                >
                  <option value="">
                    Seleziona...
                  </option>

                  <option value="card">
                    Carta
                  </option>

                  <option value="cash">
                    Contanti
                  </option>
                </select>
              </div>

              <label class="toggle-card">

                <div>
                  <strong>🧾 Ricevuta fiscale</strong>
                  <small>
                    Chiedi se desidera la ricevuta
                  </small>
                </div>

                <input
                  type="checkbox"
                  [checked]="paymentReceipt()"
                  (change)="
                    paymentReceipt.set(
                      $any($event.target).checked
                    )
                  "
                />

                <span class="toggle"></span>

              </label>

              <label class="toggle-card toggle-card--spaced">

                <div>
                  <strong>📄 Fattura</strong>
                  <small>
                    Chiedi se necessita della fattura
                  </small>
                </div>

                <input
                  type="checkbox"
                  [checked]="paymentInvoice()"
                  (change)="
                    paymentInvoice.set(
                      $any($event.target).checked
                    )
                  "
                />

                <span class="toggle"></span>

              </label>

            }

            <!-- =====================
                 TELEFONO
            ====================== -->
            @case ('phone') {

              <div class="field">
                <label for="phoneDepartment">
                  Reparto / persona richiesta
                </label>

                <input
                  id="phoneDepartment"
                  type="text"
                  placeholder="Es. Reception, ristorante..."
                  [value]="phoneDepartment()"
                  (input)="
                    phoneDepartment.set(
                      $any($event.target).value
                    )
                  "
                />
              </div>

              <label class="toggle-card">

                <div>
                  <strong>⏳ Mettere in attesa</strong>
                  <small>
                    Frase per chiedere di attendere
                  </small>
                </div>

                <input
                  type="checkbox"
                  [checked]="phoneHold()"
                  (change)="
                    phoneHold.set(
                      $any($event.target).checked
                    )
                  "
                />

                <span class="toggle"></span>

              </label>

              <label class="toggle-card toggle-card--spaced">

                <div>
                  <strong>☎️ Trasferire la chiamata</strong>
                  <small>
                    Frase per trasferire la chiamata
                  </small>
                </div>

                <input
                  type="checkbox"
                  [checked]="phoneTransfer()"
                  (change)="
                    phoneTransfer.set(
                      $any($event.target).checked
                    )
                  "
                />

                <span class="toggle"></span>

              </label>

            }

          }

        </section>

        <!-- =========================
             CHECK-IN PREVIEW
        ========================== -->
        @if (situation() === 'check-in') {

          <section class="preview">

            <div class="preview__header">

              <div>
                <span class="preview__eyebrow">
                  FRASE PRONTA
                </span>

                <h2>🇮🇹 Italiano</h2>
              </div>

              <span class="preview__status">
                Live
              </span>

            </div>

            <p class="preview__phrase">
              {{ italianPhrase() }}
            </p>

            <div class="translation">
              <span>🇬🇧</span>

              <p>
                {{ englishPhrase() }}
              </p>
            </div>

            <div class="actions">

              <button
                type="button"
                class="action action--primary"
                (click)="speakText(italianPhrase())"
              >
                🔊 Ascolta
              </button>

              <button
                type="button"
                class="action action--secondary"
                (click)="copyText(italianPhrase())"
              >
                {{ copied() ? '✓ Copiata' : '📋 Copia' }}
              </button>

            </div>

          </section>

        } @else {

          <!-- =========================
               QUICK PHRASES
          ========================== -->
          <section class="quick-phrases">

            <div class="quick-phrases__header">

              <div>
                <span>FRASI PRONTE</span>
                <h2>Usa quella che ti serve</h2>
              </div>

              <span class="count">
                {{ activePhrases().length }}
              </span>

            </div>

            <div class="quick-phrases__list">

              @for (
                phrase of activePhrases();
                track phrase.id
              ) {

                <article class="quick-phrase">

                  <div class="quick-phrase__italian">
                    <span>🇮🇹</span>

                    <strong>
                      {{ phrase.italian }}
                    </strong>
                  </div>

                  <div class="quick-phrase__english">
                    <span>🇬🇧</span>

                    <span>
                      {{ phrase.english }}
                    </span>
                  </div>

                  <div class="quick-phrase__actions">

                    <button
                      type="button"
                      class="quick-phrase__listen"
                      (click)="speakText(phrase.italian)"
                    >
                      🔊 Ascolta
                    </button>

                    <button
                      type="button"
                      class="quick-phrase__copy"
                      (click)="copyText(phrase.italian)"
                    >
                      📋 Copia
                    </button>

                  </div>

                </article>

              }

            </div>

          </section>

        }

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
      width: min(100%, 520px);
      min-width: 0;
      min-height: 100dvh;

      margin: 0 auto;
      padding: 24px 20px 50px;

      background: #fff;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 14px;

      margin-bottom: 30px;
    }

    .back {
      display: grid;

      width: 42px;
      height: 42px;
      flex: 0 0 auto;

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

    .section {
      margin-bottom: 30px;
    }

    .section h2,
    .label {
      display: block;

      margin: 0 0 14px;

      font-size: 16px;
      font-weight: 700;
    }

    /* =========================
       SITUATIONS
    ========================= */

    .situations {
      display: grid;
      grid-template-columns:
        repeat(2, minmax(0, 1fr));

      gap: 10px;
    }

    .situation-card {
      display: flex;

      min-width: 0;
      min-height: 92px;

      padding: 13px;

      align-items: flex-start;
      gap: 10px;

      border: 1px solid #e7ebf1;
      border-radius: 16px;

      background: #fff;
      color: #172033;

      font: inherit;
      text-align: left;

      cursor: pointer;

      transition:
        border-color 150ms ease,
        background 150ms ease,
        transform 150ms ease;
    }

    .situation-card:active {
      transform: scale(.98);
    }

    .situation-card--active {
      border-color: #bcd1fa;
      background: #f4f8ff;
    }

    .situation-card__icon {
      display: grid;

      width: 36px;
      height: 36px;
      flex: 0 0 auto;

      place-items: center;

      border-radius: 11px;

      background: #f2f5fa;

      font-size: 17px;
    }

    .situation-card--active
    .situation-card__icon {
      background: #e5efff;
    }

    .situation-card__content {
      display: flex;

      min-width: 0;
      flex: 1;

      flex-direction: column;
      gap: 3px;
    }

    .situation-card__content strong {
      font-size: 13px;
      line-height: 1.3;
    }

    .situation-card__content small {
      color: #8b94a5;

      font-size: 10px;
      line-height: 1.35;
    }

    .situation-card__check {
      display: grid;

      width: 20px;
      height: 20px;
      flex: 0 0 auto;

      place-items: center;

      border-radius: 50%;

      background: #5d8df5;
      color: #fff;

      font-size: 11px;
      font-weight: 800;
    }

    /* =========================
       FORM
    ========================= */

    .field {
      display: flex;

      width: 100%;
      min-width: 0;

      flex-direction: column;
      gap: 7px;

      margin-bottom: 16px;
    }

    .field label {
      color: #566074;

      font-size: 13px;
      font-weight: 600;
    }

    .field input,
    .field select {
      display: block;

      width: 100%;
      min-width: 0;
      max-width: 100%;
      height: 50px;

      padding: 0 14px;

      border: 1px solid #e2e6ed;
      border-radius: 13px;
      outline: 0;

      background: #fafbfc;
      color: #172033;

      font: inherit;
      font-size: 14px;

      transition:
        border-color 150ms ease,
        box-shadow 150ms ease,
        background 150ms ease;
    }

    .field input:focus,
    .field select:focus {
      border-color: #5d8df5;

      background: #fff;

      box-shadow:
        0 0 0 4px rgb(93 141 245 / 10%);
    }

    .field input::placeholder {
      color: #adb4c0;
    }

    .form-row {
      display: grid;

      grid-template-columns:
        repeat(2, minmax(0, 1fr));

      width: 100%;

      gap: 12px;
    }

    .input-prefix {
      display: flex;

      width: 100%;

      align-items: center;

      border: 1px solid #e2e6ed;
      border-radius: 13px;

      background: #fafbfc;

      overflow: hidden;
    }

    .input-prefix > span {
      padding-left: 14px;

      color: #566074;

      font-size: 14px;
      font-weight: 700;
    }

    .input-prefix input {
      border: 0;

      background: transparent;

      box-shadow: none;
    }

    .input-prefix:focus-within {
      border-color: #5d8df5;

      background: #fff;

      box-shadow:
        0 0 0 4px rgb(93 141 245 / 10%);
    }

    .input-prefix input:focus {
      box-shadow: none;
    }

    /* =========================
       TOGGLE
    ========================= */

    .toggle-card {
      position: relative;

      display: flex;

      align-items: center;
      gap: 12px;

      padding: 15px;

      border: 1px solid #edf0f4;
      border-radius: 16px;

      cursor: pointer;
    }

    .toggle-card--spaced {
      margin-top: 12px;
    }

    .toggle-card div {
      display: flex;

      min-width: 0;
      flex: 1;

      flex-direction: column;
      gap: 3px;
    }

    .toggle-card strong {
      font-size: 14px;
    }

    .toggle-card small {
      color: #8992a3;

      font-size: 12px;
      line-height: 1.4;
    }

    .toggle-card input {
      position: absolute;

      opacity: 0;
      pointer-events: none;
    }

    .toggle {
      position: relative;

      width: 44px;
      height: 26px;
      flex: 0 0 auto;

      border-radius: 999px;

      background: #dfe3e9;

      transition: background 150ms ease;
    }

    .toggle::after {
      position: absolute;

      top: 3px;
      left: 3px;

      width: 20px;
      height: 20px;

      border-radius: 50%;

      background: #fff;

      box-shadow:
        0 2px 5px rgb(0 0 0 / 15%);

      content: '';

      transition: transform 150ms ease;
    }

    .toggle-card input:checked + .toggle {
      background: #5d8df5;
    }

    .toggle-card
    input:checked + .toggle::after {
      transform: translateX(18px);
    }

    .options-box {
      width: 100%;
      min-width: 0;

      margin-top: 16px;
      padding: 16px;

      border-radius: 16px;

      background: #f8fafc;
    }

    .options-box .field:last-child {
      margin-bottom: 0;
    }

    /* =========================
       PREVIEW
    ========================= */

    .preview {
      padding: 20px;

      border: 1px solid #dbe6fb;
      border-radius: 20px;

      background:
        linear-gradient(
          145deg,
          #f7faff,
          #fff
        );

      box-shadow:
        0 10px 30px
        rgb(50 90 160 / 8%);
    }

    .preview__header {
      display: flex;

      align-items: flex-start;
      justify-content: space-between;

      gap: 16px;
    }

    .preview__eyebrow {
      color: #5d8df5;

      font-size: 10px;
      font-weight: 800;

      letter-spacing: .12em;
    }

    .preview h2 {
      margin: 5px 0 0;

      font-size: 15px;
    }

    .preview__status {
      padding: 5px 9px;

      border-radius: 999px;

      background: #eaf8ef;
      color: #31834e;

      font-size: 10px;
      font-weight: 700;
    }

    .preview__phrase {
      margin: 20px 0;

      font-size: 18px;
      font-weight: 650;

      line-height: 1.55;
    }

    .translation {
      display: flex;

      align-items: flex-start;
      gap: 10px;

      padding-top: 16px;

      border-top:
        1px solid #edf0f4;
    }

    .translation p {
      margin: 0;

      color: #7b8497;

      font-size: 13px;
      line-height: 1.5;
    }

    .actions {
      display: grid;

      grid-template-columns:
        1fr 1fr;

      gap: 10px;

      margin-top: 20px;
    }

    .action {
      height: 44px;

      border: 0;
      border-radius: 13px;

      font: inherit;
      font-size: 13px;
      font-weight: 700;

      cursor: pointer;
    }

    .action--primary {
      background: #5d8df5;
      color: #fff;
    }

    .action--secondary {
      border: 1px solid #e1e6ee;

      background: #fff;
      color: #566074;
    }

    /* =========================
       QUICK PHRASES
    ========================= */

    .quick-phrases {
      margin-top: 8px;
    }

    .quick-phrases__header {
      display: flex;

      align-items: center;
      justify-content: space-between;

      gap: 16px;

      margin-bottom: 14px;
    }

    .quick-phrases__header > div {
      display: flex;

      flex-direction: column;
      gap: 4px;
    }

    .quick-phrases__header span {
      color: #5d8df5;

      font-size: 10px;
      font-weight: 800;

      letter-spacing: .1em;
    }

    .quick-phrases__header h2 {
      margin: 0;

      font-size: 18px;
    }

    .quick-phrases__header .count {
      display: grid;

      width: 32px;
      height: 32px;

      place-items: center;

      border-radius: 10px;

      background: #edf4ff;
      color: #3973dd;

      font-size: 12px;

      letter-spacing: 0;
    }

    .quick-phrases__list {
      display: flex;

      flex-direction: column;
      gap: 12px;
    }

    .quick-phrase {
      padding: 16px;

      border: 1px solid #e8ecf2;
      border-radius: 18px;

      background: #fff;

      box-shadow:
        0 5px 18px
        rgb(25 35 55 / 4%);
    }

    .quick-phrase__italian,
    .quick-phrase__english {
      display: flex;

      align-items: flex-start;
      gap: 10px;
    }

    .quick-phrase__italian strong {
      font-size: 15px;
      line-height: 1.45;
    }

    .quick-phrase__english {
      margin-top: 10px;

      color: #7b8497;

      font-size: 13px;
      line-height: 1.45;
    }

    .quick-phrase__actions {
      display: grid;

      grid-template-columns:
        1fr 1fr;

      gap: 8px;

      margin-top: 15px;
    }

    .quick-phrase__listen,
    .quick-phrase__copy {
      height: 42px;

      border: 0;
      border-radius: 12px;

      font: inherit;
      font-size: 12px;
      font-weight: 700;

      cursor: pointer;
    }

    .quick-phrase__listen {
      background: #edf4ff;
      color: #3973dd;
    }

    .quick-phrase__copy {
      border: 1px solid #e6e9ef;

      background: #fff;
      color: #626d80;
    }

    @media (max-width: 370px) {

      .situations {
        grid-template-columns: 1fr;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

    }

    @media (min-width: 600px) {

      .page {
        padding: 32px 0;
      }

      .container {
        min-height:
          calc(100dvh - 64px);

        border:
          1px solid #edf0f4;

        border-radius: 28px;

        box-shadow:
          0 20px 60px
          rgb(25 35 55 / 8%);
      }

    }
  `,
})
export class PhraseBuilder {

  /* =========================
     SITUAZIONE
  ========================= */

  readonly situation =
    signal<Situation>('check-in');

  readonly situations = [
    {
      id: 'check-in' as const,
      label: 'Check-in',
      description: 'Accoglienza e soggiorno',
      icon: '🛎️',
    },
    {
      id: 'check-out' as const,
      label: 'Check-out',
      description: 'Partenza dell’ospite',
      icon: '👋',
    },
    {
      id: 'reservations' as const,
      label: 'Prenotazione',
      description: 'Dettagli prenotazione',
      icon: '📅',
    },
    {
      id: 'breakfast' as const,
      label: 'Colazione',
      description: 'Orari e informazioni',
      icon: '☕',
    },
    {
      id: 'payments' as const,
      label: 'Pagamento',
      description: 'Pagamenti e ricevute',
      icon: '💳',
    },
    {
      id: 'phone' as const,
      label: 'Telefono',
      description: 'Gestione chiamate',
      icon: '📞',
    },
  ];

  /* =========================
     CHECK-IN
  ========================= */

  readonly guestName = signal('');
  readonly room = signal('');
  readonly nights = signal('');
  readonly checkout = signal('');

  readonly breakfastIncluded =
    signal(true);

  readonly breakfastFrom =
    signal('06:00');

  readonly breakfastTo =
    signal('09:00');

  readonly breakfastLocation =
    signal('piano terra');

  /* =========================
     CHECK-OUT
  ========================= */

  readonly checkoutRoom = signal('');
  readonly checkoutTime = signal('');

  readonly checkoutLuggage =
    signal(false);

  readonly checkoutTaxi =
    signal(false);

  /* =========================
     PRENOTAZIONE
  ========================= */

  readonly reservationName =
    signal('');

  readonly reservationFrom =
    signal('');

  readonly reservationTo =
    signal('');

  readonly reservationGuests =
    signal('');

  readonly reservationBreakfast =
    signal(false);

  /* =========================
     COLAZIONE
  ========================= */

  readonly standaloneBreakfastFrom =
    signal('06:00');

  readonly standaloneBreakfastTo =
    signal('09:00');

  readonly standaloneBreakfastLocation =
    signal('piano terra');

  readonly standaloneBreakfastIncluded =
    signal(true);

  /* =========================
     PAGAMENTO
  ========================= */

  readonly paymentAmount =
    signal('');

  readonly paymentMethod =
    signal('');

  readonly paymentReceipt =
    signal(false);

  readonly paymentInvoice =
    signal(false);

  /* =========================
     TELEFONO
  ========================= */

  readonly phoneDepartment =
    signal('');

  readonly phoneHold =
    signal(false);

  readonly phoneTransfer =
    signal(false);

  /* =========================
     UI
  ========================= */

  readonly copied =
    signal(false);

  /* =========================
     CHECK-IN ITALIANO
  ========================= */

  readonly italianPhrase =
    computed(() => {

      const parts: string[] = [];

      const name =
        this.guestName().trim();

      const room =
        this.room().trim();

      if (name) {
        parts.push(
          `Buongiorno ${name}, benvenuto.`
        );
      } else {
        parts.push(
          'Buongiorno, benvenuto.'
        );
      }

      if (this.nights()) {

        const nights =
          Number(this.nights());

        parts.push(
          `La sua prenotazione è per ${nights} ${
            nights === 1
              ? 'notte'
              : 'notti'
          }.`
        );

      }

      if (room) {
        parts.push(
          `La sua camera è la numero ${room}.`
        );
      }

      if (this.checkout()) {
        parts.push(
          `Il check-out è previsto per il ${this.formatDate(
            this.checkout()
          )}.`
        );
      }

      if (this.breakfastIncluded()) {

        parts.push(
          'La colazione è inclusa.'
        );

        if (
          this.breakfastFrom() &&
          this.breakfastTo()
        ) {
          parts.push(
            `La colazione viene servita dalle ${this.breakfastFrom()} alle ${this.breakfastTo()}.`
          );
        }

        const location =
          this.breakfastLocation().trim();

        if (location) {
          parts.push(
            `La colazione viene servita al ${location}.`
          );
        }

      }

      return parts.join(' ');
    });

  /* =========================
     CHECK-IN ENGLISH
  ========================= */

  readonly englishPhrase =
    computed(() => {

      const parts: string[] = [];

      const name =
        this.guestName().trim();

      const room =
        this.room().trim();

      if (name) {
        parts.push(
          `Good morning ${name}, welcome.`
        );
      } else {
        parts.push(
          'Good morning, welcome.'
        );
      }

      if (this.nights()) {

        const nights =
          Number(this.nights());

        parts.push(
          `Your reservation is for ${nights} ${
            nights === 1
              ? 'night'
              : 'nights'
          }.`
        );

      }

      if (room) {
        parts.push(
          `Your room is number ${room}.`
        );
      }

      if (this.checkout()) {
        parts.push(
          `Your check-out date is ${this.formatDateEnglish(
            this.checkout()
          )}.`
        );
      }

      if (this.breakfastIncluded()) {

        parts.push(
          'Breakfast is included.'
        );

        if (
          this.breakfastFrom() &&
          this.breakfastTo()
        ) {
          parts.push(
            `Breakfast is served from ${this.breakfastFrom()} to ${this.breakfastTo()}.`
          );
        }

        const location =
          this.breakfastLocation().trim();

        if (location) {
          parts.push(
            `Breakfast is served at ${location}.`
          );
        }

      }

      return parts.join(' ');
    });

  /* =========================
     CHECK-OUT
  ========================= */

  readonly checkoutPhrases =
    computed<GeneratedPhrase[]>(() => {

      const phrases:
        GeneratedPhrase[] = [
          {
            id: 'checkout-stay',
            italian:
              'Spero che il soggiorno sia stato piacevole.',
            english:
              'I hope you had a pleasant stay.',
          },
        ];

      const room =
        this.checkoutRoom().trim();

      if (room) {

        phrases.push({
          id: 'checkout-room',
          italian:
            `Camera ${room}, corretto?`,
          english:
            `Room ${room}, correct?`,
        });

      } else {

        phrases.push({
          id: 'checkout-room',
          italian:
            'Posso avere il numero della camera, per favore?',
          english:
            'May I have your room number, please?',
        });

      }

      if (this.checkoutTime()) {
        phrases.push({
          id: 'checkout-time',
          italian:
            `Il check-out è previsto entro le ${this.checkoutTime()}.`,
          english:
            `Check-out is by ${this.checkoutTime()}.`,
        });
      }

      if (this.checkoutLuggage()) {
        phrases.push({
          id: 'checkout-luggage',
          italian:
            'Desidera lasciare i bagagli in deposito?',
          english:
            'Would you like to leave your luggage with us?',
        });
      }

      if (this.checkoutTaxi()) {
        phrases.push({
          id: 'checkout-taxi',
          italian:
            'Ha bisogno che le chiami un taxi?',
          english:
            'Would you like me to call a taxi for you?',
        });
      }

      phrases.push({
        id: 'checkout-goodbye',
        italian:
          'Grazie per aver soggiornato con noi. Buona giornata!',
        english:
          'Thank you for staying with us. Have a nice day!',
      });

      return phrases;
    });

  /* =========================
     PRENOTAZIONE
  ========================= */

  readonly reservationPhrases =
    computed<GeneratedPhrase[]>(() => {

      const phrases:
        GeneratedPhrase[] = [];

      const name =
        this.reservationName().trim();

      if (name) {

        phrases.push({
          id: 'reservation-name',
          italian:
            `La prenotazione è a nome ${name}, corretto?`,
          english:
            `The reservation is under the name ${name}, correct?`,
        });

      } else {

        phrases.push({
          id: 'reservation-name',
          italian:
            'A che nome è la prenotazione?',
          english:
            'What name is the reservation under?',
        });

      }

      if (
        this.reservationFrom() &&
        this.reservationTo()
      ) {

        phrases.push({
          id: 'reservation-dates',
          italian:
            `Ha prenotato dal ${this.formatDate(
              this.reservationFrom()
            )} al ${this.formatDate(
              this.reservationTo()
            )}.`,
          english:
            `Your reservation is from ${this.formatDateEnglish(
              this.reservationFrom()
            )} to ${this.formatDateEnglish(
              this.reservationTo()
            )}.`,
        });

      }

      if (this.reservationGuests()) {

        const guests =
          Number(
            this.reservationGuests()
          );

        phrases.push({
          id: 'reservation-guests',
          italian:
            `La prenotazione è per ${guests} ${
              guests === 1
                ? 'persona'
                : 'persone'
            }.`,
          english:
            `The reservation is for ${guests} ${
              guests === 1
                ? 'guest'
                : 'guests'
            }.`,
        });

      }

      if (
        this.reservationBreakfast()
      ) {
        phrases.push({
          id: 'reservation-breakfast',
          italian:
            'La colazione è inclusa nella prenotazione.',
          english:
            'Breakfast is included in your reservation.',
        });
      }

      phrases.push({
        id: 'reservation-confirm',
        italian:
          'Le confermo i dettagli della prenotazione.',
        english:
          'Let me confirm your reservation details.',
      });

      return phrases;
    });

  /* =========================
     COLAZIONE
  ========================= */

  readonly breakfastPhrases =
    computed<GeneratedPhrase[]>(() => {

      const phrases:
        GeneratedPhrase[] = [];

      if (
        this.standaloneBreakfastIncluded()
      ) {
        phrases.push({
          id: 'breakfast-included',
          italian:
            'La colazione è inclusa nel soggiorno.',
          english:
            'Breakfast is included in your stay.',
        });
      }

      if (
        this.standaloneBreakfastFrom() &&
        this.standaloneBreakfastTo()
      ) {
        phrases.push({
          id: 'breakfast-hours',
          italian:
            `La colazione viene servita dalle ${this.standaloneBreakfastFrom()} alle ${this.standaloneBreakfastTo()}.`,
          english:
            `Breakfast is served from ${this.standaloneBreakfastFrom()} to ${this.standaloneBreakfastTo()}.`,
        });
      }

      const location =
        this.standaloneBreakfastLocation()
          .trim();

      if (location) {
        phrases.push({
          id: 'breakfast-location',
          italian:
            `La colazione viene servita al ${location}.`,
          english:
            `Breakfast is served at ${location}.`,
        });
      }

      phrases.push({
        id: 'breakfast-help',
        italian:
          'Posso aiutarla con qualcos’altro?',
        english:
          'May I help you with anything else?',
      });

      return phrases;
    });

  /* =========================
     PAGAMENTO
  ========================= */

  readonly paymentPhrases =
    computed<GeneratedPhrase[]>(() => {

      const phrases:
        GeneratedPhrase[] = [];

      const amount =
        this.paymentAmount().trim();

      if (amount) {

        phrases.push({
          id: 'payment-total',
          italian:
            `Il totale è di ${this.formatAmount(
              amount
            )} euro.`,
          english:
            `The total is ${this.formatAmount(
              amount
            )} euros.`,
        });

      } else {

        phrases.push({
          id: 'payment-method-question',
          italian:
            'Come desidera pagare?',
          english:
            'How would you like to pay?',
        });

      }

      if (
        this.paymentMethod() === 'card'
      ) {
        phrases.push({
          id: 'payment-card',
          italian:
            'Può pagare con la carta.',
          english:
            'You can pay by card.',
        });
      }

      if (
        this.paymentMethod() === 'cash'
      ) {
        phrases.push({
          id: 'payment-cash',
          italian:
            'Può pagare in contanti.',
          english:
            'You can pay in cash.',
        });
      }

      if (this.paymentReceipt()) {
        phrases.push({
          id: 'payment-receipt',
          italian:
            'Desidera la ricevuta fiscale?',
          english:
            'Would you like a receipt?',
        });
      }

      if (this.paymentInvoice()) {
        phrases.push({
          id: 'payment-invoice',
          italian:
            'Ha bisogno della fattura?',
          english:
            'Do you need an invoice?',
        });
      }

      phrases.push({
        id: 'payment-thanks',
        italian:
          'Grazie, il pagamento è stato effettuato.',
        english:
          'Thank you, the payment has been completed.',
      });

      return phrases;
    });

  /* =========================
     TELEFONO
  ========================= */

  readonly phonePhrases =
    computed<GeneratedPhrase[]>(() => {

      const phrases:
        GeneratedPhrase[] = [
          {
            id: 'phone-answer',
            italian:
              'Buongiorno, reception. Come posso aiutarla?',
            english:
              'Good morning, reception. How may I help you?',
          },
        ];

      const department =
        this.phoneDepartment().trim();

      if (department) {
        phrases.push({
          id: 'phone-department',
          italian:
            `Desidera parlare con ${department}?`,
          english:
            `Would you like to speak with ${department}?`,
        });
      }

      if (this.phoneHold()) {
        phrases.push({
          id: 'phone-hold',
          italian:
            'Un momento, per favore. Rimanga in linea.',
          english:
            'One moment, please. Please stay on the line.',
        });
      }

      if (this.phoneTransfer()) {
        phrases.push({
          id: 'phone-transfer',
          italian:
            'Le passo subito la chiamata.',
          english:
            'I will transfer your call now.',
        });
      }

      phrases.push({
        id: 'phone-repeat',
        italian:
          'Può ripetere, per favore?',
        english:
          'Could you repeat that, please?',
      });

      phrases.push({
        id: 'phone-slowly',
        italian:
          'Può parlare più lentamente, per favore?',
        english:
          'Could you speak more slowly, please?',
      });

      return phrases;
    });

  /* =========================
     ACTIVE PHRASES
  ========================= */

  readonly activePhrases =
    computed<GeneratedPhrase[]>(() => {

      switch (this.situation()) {

        case 'check-out':
          return this.checkoutPhrases();

        case 'reservations':
          return this.reservationPhrases();

        case 'breakfast':
          return this.breakfastPhrases();

        case 'payments':
          return this.paymentPhrases();

        case 'phone':
          return this.phonePhrases();

        default:
          return [];

      }

    });

  /* =========================
     AUDIO
  ========================= */

  speakText(text: string): void {

    if (
      !('speechSynthesis' in window)
    ) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    utterance.lang = 'it-IT';
    utterance.rate = 0.9;

    window.speechSynthesis.speak(
      utterance
    );
  }

  /* =========================
     COPY
  ========================= */

  async copyText(
    text: string
  ): Promise<void> {

    try {

      await navigator.clipboard.writeText(
        text
      );

      this.copied.set(true);

      setTimeout(() => {
        this.copied.set(false);
      }, 1500);

    } catch {

      this.copied.set(false);

    }

  }

  /* =========================
     FORMATTERS
  ========================= */

  private formatDate(
    value: string
  ): string {

    return new Intl.DateTimeFormat(
      'it-IT',
      {
        day: 'numeric',
        month: 'long',
      }
    ).format(
      new Date(
        `${value}T12:00:00`
      )
    );

  }

  private formatDateEnglish(
    value: string
  ): string {

    return new Intl.DateTimeFormat(
      'en-GB',
      {
        day: 'numeric',
        month: 'long',
      }
    ).format(
      new Date(
        `${value}T12:00:00`
      )
    );

  }

  private formatAmount(
    value: string
  ): string {

    const amount =
      Number(value);

    if (Number.isNaN(amount)) {
      return value;
    }

    return new Intl.NumberFormat(
      'it-IT',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    ).format(amount);

  }
}