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
import styles from './styles/view.js';
import '../components/page-title.js';

export class View extends LitElement {
  constructor() {
    super();
    this.title = "View";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Who do you want to view?</app-page-title>

        <!-- First Row of Images -->
        <div class="image-row">
            <div class="image-container">
                <app-link href="/chat-with-blaze" target="_blank">
                    <img src="assets/art5.jpg" alt="Person 1" class="rounded-image">
                </app-link>
                <p class="name-description">Blaze</p>
            </div>
            <div class="image-container">
                <app-link href="/person2" target="_blank">
                    <img src="assets/UATLogo.png" alt="Person 2" class="rounded-image">
                </app-link>
                <p class="name-description">Nick</p>
            </div>
            <div class="image-container">
                <app-link href="/chat-with-preston" target="_blank">
                    <img src="assets/UATLogo.png" alt="Person 3" class="rounded-image">
                </app-link>
                <p class="name-description">Preston</p>
            </div>
        </div>

        <!-- Second Row of Images -->
        <div class="image-row">
            <div class="image-container">
                <app-link href="/chat-with-alexis" target="_blank">
                    <img src="assets/UATLogo.png" alt="Person 4" class="rounded-image">
                </app-link>
                <p class="name-description">Alexis</p>
            </div>
            <div class="image-container">
                <app-link href="/person5" target="_blank">
                    <img src="assets/UATLogo.png" alt="Person 5" class="rounded-image">
                </app-link>
                <p class="name-description">Christelle</p>
            </div>
            <div class="image-container">
                <app-link href="/person6" target="_blank">
                    <img src="assets/UATLogo.png" alt="Person 6" class="rounded-image">
                </app-link>
                <p class="name-description">Marcus</p>
            </div>
        </div>

        <!-- Third Row of Images -->
        <div class="image-row">
            <div class="image-container">
                <app-link href="/joshua" target="_blank">
                    <img src="assets/UATLogo.png" alt="Person 7" class="rounded-image">
                </app-link>
                <p class="name-description">Joshua</p>
            </div>
        </div>

        <!-- Go Back Button -->
        <div class="back-button-container">
            <app-link href="/showcase" class="back-button">Go Back</app-link>
        </div>
    `;
  }
}

customElements.define('app-view', View);