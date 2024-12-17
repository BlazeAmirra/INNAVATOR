import { LitElement, html } from 'lit';
import styles from './styles/feedback.js';
import '../components/page-title.js';

export class Feedback extends LitElement {
  constructor() {
    super();
    this.title = 'Feedback';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>Feedback</app-page-title>

        <p class="subtitle">Please give us your honest opinion to make the app a better place.</p>

        <textarea id="feedback-input" class="feedback-box" placeholder="Speak your mind here"></textarea>

        <h2 class="rating-title">Please Rate Us</h2>

        <div class="stars-container">
            <app-link href="/stars/1"><span class="star">★</span></app-link>
            <app-link href="/stars/2"><span class="star">★</span></app-link>
            <app-link href="/stars/3"><span class="star">★</span></app-link>
            <app-link href="/stars/4"><span class="star">★</span></app-link>
            <app-link href="/stars/5"><span class="star">★</span></app-link>
        </div>

        <h2 class="rating-title">Special Feedback</h2>

        <div class="big-star-container">
            <app-link href="/special-feedback"><span class="big-star">★</span></app-link>
        </div>
    `;
  }
}

customElements.define('app-feedback', Feedback);
