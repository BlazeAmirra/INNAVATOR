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
import styles from './styles/with-student.js';
import '../components/page-title.js'

export class WithStudent extends LitElement {
  constructor() {
    super();
    this.title = "With Student";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>What do you need help with?</app-page-title>

        <!-- Centered Text Input Box -->
        <div class="input-container">
            <textarea placeholder="Enter your text here"></textarea> <!-- Text area for user input -->
        </div>

        <!-- Navigation Buttons Section -->
        <div class="navigation-buttons">
            <app-link href="/learn" class="back-arrow">&larr; Go Back</app-link> <!-- Go back to Learn page -->
            <app-link href="/yes-partner" class="next-button">Next</app-link> <!-- Link to next page -->
        </div>
    `;
  }
}

customElements.define('app-with-student', WithStudent);
