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
      <!-- Page Title -->
        <app-page-title>Games</app-page-title>

        <!-- Centered Image with Clickable Link -->
        <div class="image-container">
            <a href="https://greendog3.itch.io/maxwells-bullet-sumo"> <!-- Link to the game details page -->
                <img src=${maxwell} alt="Game Image" class="game-image"> <!-- Game image -->
            </a>
        </div>

        <!-- Add Your Game Button -->
        <div class="add-game-container">
            <app-link href="/add-game" class="add-game-button">Click here to add your game</app-link> <!-- Link to add game page -->
        </div>

        <!-- Go Back Button -->
        <div class="go-back">
            <app-link href="/commission">&larr; Go Back</app-link> <!-- Link back to the commission page -->
        </div>
    `;
  }
}

customElements.define('app-games', Games);
