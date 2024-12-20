import { LitElement, html } from 'lit';
import styles from './styles/games.js';
import '../components/page-title.js';

const maxwell = new URL('../../assets/maxwell.png', import.meta.url).href;

export class Games extends LitElement {
  constructor() {
    super();
    this.title = "Games";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>Games</app-page-title>

        <div class="image-container">
            <a href="https://greendog3.itch.io/maxwells-bullet-sumo">
                <img src=${maxwell} alt="Game Image" class="game-image"/>
            </a>
        </div>

        <div class="add-game-container">
            <app-link href="/add-game" class="add-game-button">Click here to add your game</app-link>
        </div>

        <div class="go-back">
            <app-link href="/commission">&larr; Go Back</app-link>
        </div>
    `;
  }
}

customElements.define('app-games', Games);
