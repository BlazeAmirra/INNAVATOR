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
import styles from './styles/showcase.js';
import '../components/page-title.js';

export class Showcase extends LitElement {
  constructor() {
    super();
    this.title = "Showcase";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Showcase</app-page-title>

        <!-- Subtitle: Videos & Profiles -->
        <h2 class="subtitle">Videos & Profiles</h2>

        <!-- Videos & Profiles Image Links -->
        <div class="image-row">
            <app-link href="/profile1" target="_blank"><img src="assets/live.png" alt="Profile 1" class="rounded-image"></app-link>
            <app-link href="/profile2" target="_blank"><img src="assets/meet.png" alt="Profile 2" class="rounded-image"></app-link>
            <app-link href="/view" target="_blank"><img src="assets/view.png" alt="Profile 3" class="rounded-image"></app-link>
        </div>

        <!-- Subtitle: Clubs & Classes -->
        <h2 class="subtitle">Clubs & Classes</h2>

        <!-- Clubs & Classes Image Links (2 Rows) -->
        <div class="image-grid">
            <app-link href="/club1" target="_blank"><img src="assets/gardening.png" alt="Club 1" class="rounded-image"></app-link>
            <app-link href="/club2" target="_blank"><img src="assets/nerf.png" alt="Club 2" class="rounded-image"></app-link>
            <app-link href="/club3" target="_blank"><img src="assets/advertising.png" alt="Club 3" class="rounded-image"></app-link>
            <app-link href="/class1" target="_blank"><img src="assets/coding.png" alt="Class 1" class="rounded-image"></app-link>
            <app-link href="/class2" target="_blank"><img src="assets/robotics.png" alt="Class 2" class="rounded-image"></app-link>
            <app-link href="/class3" target="_blank"><img src="assets/3dtools.png" alt="Class 3" class="rounded-image"></app-link>
        </div>

        <!-- Subtitle: Interactive Projects -->
        <h2 class="subtitle">Interactive Projects</h2>

        <!-- Interactive Project Center Image -->
        <div class="center-image">
            <app-link href="/project" target="_blank"><img src="assets/apps.png" alt="Interactive Project" class="rounded-square"></app-link>
        </div>

        <!-- Go Back Button -->
        <div class="back-button-container">
            <app-link href="/portfolio" class="back-button">Go Back</app-link>
        </div>
    `;
  }
}

customElements.define('app-showcase', Showcase);
