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
import styles from './styles/partner-option.js';
import '../components/page-title.js';

export class PartnerOption extends LitElement {
  constructor() {
    super();
    this.title = "Partner Option";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Nice, would you like a partner?</app-page-title> <!-- Title for the partner-option page -->

        <!-- Button Section with Yes and No Options -->
        <div class="button-section">
            <app-link href="/yes-partner" class="option-button">Yes</app-link> <!-- Link to Yes Partner page -->
            <app-link href="/no-partner" class="option-button">No</app-link> <!-- Link to No Partner page -->
        </div>
    `;
  }
}

customElements.define('app-partner-option', PartnerOption);
