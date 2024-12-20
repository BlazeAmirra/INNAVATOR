import { LitElement, html } from 'lit';
import styles from './styles/movies.js';
import '../components/page-title.js';

const playlogo = new URL('../../assets/playlogo.jpg', import.meta.url).href;
const playminilogo = new URL('../../assets/playminilogo.jpg', import.meta.url).href;

export class Movies extends LitElement {
  constructor() {
    super();
    this.title = "Movies";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>Movies</app-page-title>

        <div class="image-container">
            <app-link href="/movie1-details">
                <img src=${playlogo} alt="Movie 1" class="movie-image"/>
            </app-link>
        </div>
        <div class="image-container">
            <app-link href="/movie2-details">
                <img src=${playlogo} alt="Movie 2" class="movie-image"/>
            </app-link>
        </div>
        <div class="image-container">
            <a href="https://www.youtube.com/watch?v=EQRp0myfiSE">
                <img src=${playminilogo} alt="Movie 3" class="movie-image"/>
            </a>
        </div>

        <div class="go-back">
            <app-link href="/commission">&larr; Go Back</app-link>
        </div>
    `;
  }
}

customElements.define('app-movies', Movies);
