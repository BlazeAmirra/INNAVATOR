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
import styles from './styles/patents.js';
import '../components/page-title.js';

export class Patents extends LitElement {
  constructor() {
    super();
    this.title = "Patents";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Patents</app-page-title>

        <!-- Button for "My Patents" -->
        <div class="button-container">
            <app-link href="/my-patents" class="patent-button">★ My Patents</app-link>
        </div>

        <!-- Button for "Links to patents" -->
        <div class="button-container">
            <app-link href="/links-to-patents" class="patent-button">★ Links to Patents</app-link>
        </div>

        <!-- Button for "What is a patent?" -->
        <div class="button-container">
            <app-link href="/what-is-a-patent" class="patent-button">★ What is a Patent?</app-link>
        </div>

        <!-- Go Back Button -->
        <div class="back-button-container">
            <app-link href="/portfolio" class="back-button">Go Back</app-link>
        </div>
    `;
  }
}

customElements.define('app-patents', Patents);
