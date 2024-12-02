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
import styles from './styles/change-colors.js';
import '../components/page-title.js';

const colortime = new URL('../../assets/colortime.jpg', import.meta.url).href;

export class ChangeColors extends LitElement {
  constructor() {
    super();
    this.title = 'Change Colors';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Color Time</app-page-title>

        <!-- Centered Color Wheel -->
        <div class="color-wheel-container">
            <img src=${colortime} alt="Color Wheel" class="color-wheel"> <!-- Color wheel image placeholder -->
        </div>

        <!-- Dark to Light Scale Section -->
        <div class="scale-container">
            <input type="range" min="0" max="6" value="3" class="color-scale"> <!-- Scale input slider -->
        </div>

        <!-- Dark and Light Labels -->
        <div class="scale-labels">
            <span class="dark-label">Dark</span>
            <span class="light-label">Light</span>
        </div>

        <!-- Go Back Button -->
        <button onclick="history.back()" class="back-button">&#x2190; Back</button> <!-- Left arrow icon -->
    `;
  }
}

customElements.define('app-change-colors', ChangeColors);
