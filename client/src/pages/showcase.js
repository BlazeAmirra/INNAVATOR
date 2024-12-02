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

const threedtools = new URL('../../assets/3dtools.png', import.meta.url).href;
const advertising = new URL('../../assets/advertising.png', import.meta.url).href;
const apps = new URL('../../assets/apps.png', import.meta.url).href;
const coding = new URL('../../assets/coding.png', import.meta.url).href;
const gardening = new URL('../../assets/gardening.png', import.meta.url).href;
const live = new URL('../../assets/live.png', import.meta.url).href;
const meet = new URL('../../assets/meet.png', import.meta.url).href;
const nerf = new URL('../../assets/nerf.png', import.meta.url).href;
const robotics = new URL('../../assets/robotics.png', import.meta.url).href;
const view = new URL('../../assets/view.png', import.meta.url).href;

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
            <app-link href="/profile1" target="_blank"><img src=${live} alt="Profile 1" class="rounded-image"></app-link>
            <app-link href="/profile2" target="_blank"><img src=${meet} alt="Profile 2" class="rounded-image"></app-link>
            <app-link href="/view" target="_blank"><img src=${view} alt="Profile 3" class="rounded-image"></app-link>
        </div>

        <!-- Subtitle: Clubs & Classes -->
        <h2 class="subtitle">Clubs & Classes</h2>

        <!-- Clubs & Classes Image Links (2 Rows) -->
        <div class="image-grid">
            <app-link href="/club1" target="_blank"><img src=${gardening} alt="Club 1" class="rounded-image"></app-link>
            <app-link href="/club2" target="_blank"><img src=${nerf} alt="Club 2" class="rounded-image"></app-link>
            <app-link href="/club3" target="_blank"><img src=${advertising} alt="Club 3" class="rounded-image"></app-link>
            <app-link href="/class1" target="_blank"><img src=${coding} alt="Class 1" class="rounded-image"></app-link>
            <app-link href="/class2" target="_blank"><img src=${robotics} alt="Class 2" class="rounded-image"></app-link>
            <app-link href="/class3" target="_blank"><img src=${threedtools} alt="Class 3" class="rounded-image"></app-link>
        </div>

        <!-- Subtitle: Interactive Projects -->
        <h2 class="subtitle">Interactive Projects</h2>

        <!-- Interactive Project Center Image -->
        <div class="center-image">
            <app-link href="/project" target="_blank"><img src=${apps} alt="Interactive Project" class="rounded-square"></app-link>
        </div>

        <!-- Go Back Button -->
        <div class="back-button-container">
            <app-link href="/portfolio" class="back-button">Go Back</app-link>
        </div>
    `;
  }
}

customElements.define('app-showcase', Showcase);
