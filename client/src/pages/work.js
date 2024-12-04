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
import '../components/back-button.js';
import '../components/page-title.js';

// TODO: REVISIT

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
        <span>NEEDS REWORK</span>
        <br/><br/>
        <app-back-button></app-back-button>
        <!-- definitely not a privacy concern.
        <div class="form-container">
            <app-page-title size="22px">You're seeking employment? We can help you! Fill out the information and we can take the next steps.</app-page-title>

            <label for="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name">

            <label for="major">Major:</label>
            <input type="text" id="major" placeholder="Enter your major">

            <label for="skill-level">Skill Level:</label>
            <input type="text" id="skill-level" placeholder="Enter your skill level">

            <label for="additional-info">Any additional information? Resume, certificates, etc...</label>
            <textarea id="additional-info" placeholder="Add more information here"></textarea>

            <div class="navigation-buttons">
                <app-back-button></app-back-button>
                <app-link href="/submit" class="next-button">Next</app-link>
            </div>
        </div>
        -->
    `;
  }
}

customElements.define('app-work', Work);
