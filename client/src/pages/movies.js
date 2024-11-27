// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { LitElement, html } from 'lit';
import styles from './styles/movies.js';
import '../components/page-title.js';

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
                <img src="assets/playlogo.jpg" alt="Movie 1" class="movie-image"> <!-- First movie image -->
            </app-link>
        </div>
        <div class="image-container">
            <app-link href="/movie2-details"> <!-- Link to second movie details page -->
                <img src="assets/playlogo.jpg" alt="Movie 2" class="movie-image"> <!-- Second movie image -->
            </app-link>
        </div>
        <div class="image-container">
            <a href="https://www.youtube.com/watch?v=EQRp0myfiSE"> <!-- Link to third movie details page -->
                <img src="assets/playminilogo.jpg" alt="Movie 3" class="movie-image"> <!-- Third movie image -->
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
