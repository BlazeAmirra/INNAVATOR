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
import styles from './styles/no-partner.js';
import '../components/page-title.js';

export class NoPartner extends LitElement {
  constructor() {
    super();
    this.title = "No Partner";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Okay, give me just a moment to help find what you need... do you know what you need?</app-page-title>
        <!-- Title with a prompt asking the user if they know what they need -->

        <!-- Input Box Section -->
        <div class="input-box-section">
            <input type="text" class="input-box" placeholder="Text here"> <!-- Placeholder for user input -->
        </div>

        <!-- Navigation Arrows Section -->
        <div class="arrow-section">
            <app-link href="/partner-option" class="back-arrow">&larr; Back</app-link> <!-- Go back link to partner-option page -->
            <app-link href="/commission" class="next-arrow">Next &rarr;</app-link> <!-- Next link to the next page -->
        </div>
    `;
  }
}

customElements.define('app-no-partner', NoPartner);
