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
import styles from './styles/student-next.js';
import '../components/page-title.js';

export class StudentNext extends LitElement {
  constructor() {
    super();
    this.title = "Create Something";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>What do you need help with?</app-page-title> <!-- Title for the create-something page -->

        <!-- Input Box for User Text -->
        <div class="input-section">
            <input type="text" placeholder="Text here" class="text-input"> <!-- Placeholder input box for user text -->
        </div>

        <!-- Button Section with Back and Next Buttons -->
        <div class="button-section">
            <app-link href="/learn" class="back-button">&#8592; Back</app-link> <!-- Left arrow pointing back to the Commission page -->
            <app-link href="/partner-option" class="next-button">Next</app-link> <!-- Link to the next page for the process -->
        </div>
    `;
  }
}

customElements.define('app-student-next', StudentNext);
