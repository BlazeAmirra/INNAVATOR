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
import styles from './styles/learn.js';
import '../components/back-button.js';
import '../components/page-title.js';

export class Learn extends LitElement {
  constructor() {
    super();
    this.title = "Learn";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <app-page-title>Learn</app-page-title>

        <!-- Button Section for Learn Options -->
        <div class="button-container">
            <app-link href="/with-student" class="option-button">★ With Student</app-link>
            <app-link href="/ai" class="option-button">★ AI</app-link>
            <app-link href="/founders" class="option-button">★ Graduate</app-link>
            <app-link href="/uat-dictionary" class="option-button">★ UAT Dictionary</app-link>

            <!-- Go Back Button at the bottom -->
            <app-back-button/>
        </div>
    `;
  }
}

customElements.define('app-learn', Learn);
