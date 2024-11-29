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
import styles from './styles/stars.js';
import '../components/page-title.js';

export class Stars extends LitElement {
  constructor() {
    super();
    this.title = 'Stars';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>Thank you! We will take your feedback and fix the issue right away!</app-page-title> <!-- 1 star -->
        <app-page-title>Thank you! We will take your feedback into consideration and make improvements!</app-page-title> <!-- 2 star -->
        <app-page-title>Thank you! We will take your feedback into consideration and make the adjustments!</app-page-title> <!-- 3 star -->
        <app-page-title>Thank you! We will take your feedback into consideration and add those cool features!</app-page-title> <!-- 4 star -->
        <app-page-title>Thank you! We will take your feedback into consideration and make this app more awesome!</app-page-title> <!-- 5 star -->

        <!-- Pink Star Section -->
        <div class="pink-stars">
            <div class="star">&#9733;</div> <!-- Star 1 -->
            <div class="star">&#9733;</div> <!-- Star 2 -->
            <!-- Arbitrary star count -->
        </div>

        <div class="pink-stars">
          <!-- Large Purple Submit Star -->
          <app-link href="/welcome" class="submit-star"> <!-- Link to home page -->
              <div class="large-star">
                  Submit
              </div>
          </app-link>
        </div>
    `;
  }
}

customElements.define('app-stars', Stars);
