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
import styles from './styles/commission.js';
import '../components/page-title.js';

export class Commission extends LitElement {
  constructor() {
    super();
    this.title = 'Commission';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <app-page-title>Commission</app-page-title>

        <!-- Commission Options -->
        <div class="button-container">
            <app-link href="/electronics" class="option-button">★ Electronics</app-link>
            <app-link href="/games" class="option-button">★ Games</app-link>
            <app-link href="/movies" class="option-button">★ Movies</app-link>
            <app-link href="/art" class="option-button">★ Art</app-link>

            <!-- Go Back Button at the bottom -->
            <app-link href="/welcome" class="go-back-button">Go Back</app-link> <!-- Link to home page with a "Go Back" button -->
        </div>
    `;
  }
}

customElements.define('app-commission', Commission);
