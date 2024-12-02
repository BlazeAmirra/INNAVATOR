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
import styles from './styles/yes-partner.js';
import '../components/page-title.js'

const art5 = new URL('../../assets/art5.jpg', import.meta.url).href;
const art7 = new URL('../../assets/art7.jpg', import.meta.url).href;
const art8 = new URL('../../assets/art8.jpg', import.meta.url).href;

export class YesPartner extends LitElement {
  constructor() {
    super();
    this.title = "Yes Partner";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Wonderful, Here are some great people you can work with.<p>Click on who you want and you can start a new chat.</p></app-page-title> <!-- Title for the yes-partner page -->

        <!-- Partner Image Section -->
        <div class="partner-section">
            <!-- Clickable images for partners -->
            <app-link href="/chat-with-preston" class="partner-link">
                <img src=${art7} alt="Partner 1" class="partner-image"> <!-- Replace with actual image path -->
            </app-link>
            <app-link href="/chat-with-blaze" class="partner-link">
                <img src=${art5} alt="Partner 2" class="partner-image"> <!-- Replace with actual image path -->
            </app-link>
            <app-link href="/chat-with-nick" class="partner-link">
                <img src=${art8} alt="Partner 3" class="partner-image"> <!-- Replace with actual image path -->
            </app-link>
        </div>

        <!-- Go Back Button -->
        <div class="button-section">
            <app-link href="/partner-option" class="back-button">&larr; Go Back</app-link> <!-- Go back link to partner-option page -->
        </div>
    `;
  }
}

customElements.define('app-yes-partner', YesPartner);
