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
import styles from './styles/portfolio.js';
import '../components/back-button.js';
import '../components/page-title.js';

export class Portfolio extends LitElement {
  constructor() {
    super();
    this.title = "Portfolio";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Portfolio Page Title -->
        <app-page-title>Portfolio</app-page-title>

        <!-- Button Section for Portfolio Options -->
        <div class="button-container">
            <app-link href="/my-portfolio" class="option-button">★ My Portfolio</app-link>
            <app-link href="/showcase" class="option-button">★ Showcases</app-link>
            <app-link href="/inspiration" class="option-button">★ Inspiration</app-link>
            <app-link href="/patents" class="option-button">★ Patents</app-link>

            <!-- Go Back Button positioned like the others -->
            <app-back-button/>
        </div>
    `;
  }
}

customElements.define('app-portfolio', Portfolio);
