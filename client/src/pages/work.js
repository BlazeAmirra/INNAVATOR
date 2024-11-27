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
import styles from './styles/work.js';
import '../components/page-title.js'

export class Work extends LitElement {
  constructor() {
    super();
    this.title = "Work";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Form Container -->
        <div class="form-container">
            <!-- Centered Page Title -->
            <app-page-title size="22px">You're seeking employment? We can help you! Fill out the information and we can take the next steps.</app-page-title>

            <!-- Input Fields -->
            <label for="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name">

            <label for="major">Major:</label>
            <input type="text" id="major" placeholder="Enter your major">

            <label for="skill-level">Skill Level:</label>
            <input type="text" id="skill-level" placeholder="Enter your skill level">

            <label for="additional-info">Any additional information? Resume, certificates, etc...</label>
            <textarea id="additional-info" placeholder="Add more information here"></textarea>

            <!-- Navigation Buttons -->
            <div class="navigation-buttons">
                <app-link href="/welcome" class="back-arrow">Back</app-link>
                <app-link href="/submit" class="next-button">Next</app-link>
            </div>
        </div>
    `;
  }
}

customElements.define('app-work', Work);
