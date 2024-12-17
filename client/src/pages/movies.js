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
      <!-- Page Title -->
        <app-page-title>Movies</app-page-title>

        <!-- Centered Image Links -->
        <div class="image-container">
            <app-link href="/movie1-details"> <!-- Link to first movie details page -->
                <img src=${playlogo} alt="Movie 1" class="movie-image"> <!-- First movie image -->
            </app-link>
        </div>
        <div class="image-container">
            <app-link href="/movie2-details"> <!-- Link to second movie details page -->
                <img src=${playlogo} alt="Movie 2" class="movie-image"> <!-- Second movie image -->
            </app-link>
        </div>
        <div class="image-container">
            <a href="https://www.youtube.com/watch?v=EQRp0myfiSE"> <!-- Link to third movie details page -->
                <img src=${playminilogo} alt="Movie 3" class="movie-image"> <!-- Third movie image -->
            </a>
        </div>

        <!-- Go Back Button -->
        <div class="go-back">
            <app-link href="/commission">&larr; Go Back</app-link> <!-- Link back to the commission page -->
        </div>
    `;
  }
}

customElements.define('app-movies', Movies);
