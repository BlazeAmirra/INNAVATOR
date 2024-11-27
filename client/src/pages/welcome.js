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
import styles from './styles/welcome.js';
import '../components/page-title.js';

export class Welcome extends LitElement {
  constructor() {
    super();
    this.title = "Welcome";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Welcome Message -->
        <app-page-title>Welcome to Innavator!</app-page-title> <!-- Displays the welcome title centered -->

        <!-- Button Section for Various Options -->
        <div class="button-container">
            <!-- Button for Commission -->
            <app-link href="/commission" class="option-button">★ Commission</app-link>

            <!-- Button for Learn -->
            <app-link href="/learn" class="option-button">★ Learn</app-link>

            <!-- Button for Portfolio -->
            <app-link href="/portfolio" class="option-button">★ Portfolio</app-link>

            <!-- Button for Founder's Chat -->
            <app-link href="/founders" class="option-button">★ Founder's Chat</app-link>
        </div>
    `;
  }
}

customElements.define('app-welcome', Welcome);
