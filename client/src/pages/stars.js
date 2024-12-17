import { LitElement, html } from 'lit';
import styles from './styles/stars.js';
import '../components/page-title.js';

// TODO: REVISIT

export class Stars extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      stars: {type: String},
      updateParent: {type: Function},
      requestingRender: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.title = 'Stars';
  }

  render() {
    let title;
    let star_items = [];

    switch (this.stars) {
      case 1:
        title = html`Thank you! We will take your feedback and fix the issue right away!`;
        break;
      case 2:
        title = html`Thank you! We will take your feedback into consideration and make improvements!`;
        break;
      case 3:
        title = html`Thank you! We will take your feedback into consideration and make the adjustments!`;
        break;
      case 4:
        title = html`Thank you! We will take your feedback into consideration and add those cool features!`;
        break;
      case 5:
        title = html`Thank you! We will take your feedback into consideration and make this app more awesome!`;
        break;
      default:
        title = html`Thank you! We will take your feedback into consideration and cheer on your exploration!`;
        break;
    }

    if (this.stars > 0 && this.stars < 6) {
      for (let i = 0; i < this.stars; i++) {
        star_items.push(html`<div class="star">&#9733;</div>`);
      }
    }
    else {
      star_items.push(html`<span>You've input a nonsense amount of stars. That's fine, we're just not gonna put you through drawing them all in case it was a lot.</span>`);
    }

    return html`
        <app-page-title>${title}</app-page-title>

        <!-- Pink Star Section -->
        <div class="pink-stars">
            ${star_items}
        </div>

        <div class="pink-stars">
          <!-- Large Purple Submit Star -->
          <app-link href="/welcome" class="submit-star"> <!-- Link to home page -->
              <div class="large-star">
                  Submit
              </div>
          </app-link>
        </div>
    `;
  }
}

customElements.define('app-stars', Stars);
