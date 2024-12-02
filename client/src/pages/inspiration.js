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
import styles from './styles/inspiration.js';
import '../components/page-title.js';

const apps = new URL('../../assets/apps.png', import.meta.url).href;
const autodoc = new URL('../../assets/autodoc.png', import.meta.url).href;
const games = new URL('../../assets/games.png', import.meta.url).href;
const joblinks = new URL('../../assets/joblinks.png', import.meta.url).href;
const live1 = new URL('../../assets/live1.png', import.meta.url).href;
const rec = new URL('../../assets/rec.png', import.meta.url).href;
const robotics1 = new URL('../../assets/robotics1.png', import.meta.url).href;

export class Inspiration extends LitElement {
  constructor() {
    super();
    this.title = "Inspiration";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Inspiration</app-page-title>

        <!-- Subtitle for Videos Section -->
        <h2 class="subtitle">Videos</h2>

        <!-- Row of Three Rounded Images (Clickable) -->
        <div class="image-row">
            <app-link href="/video1"><img src=${live1} alt="Video 1" class="rounded-image"></app-link>
            <app-link href="/video2"><img src=${rec} alt="Video 2" class="rounded-image"></app-link>
            <app-link href="/video3"><img src=${autodoc} alt="Video 3" class="rounded-image"></app-link>
        </div>

        <!-- Centered Rectangular Image (Clickable) -->
        <div class="centered-image-container">
            <app-link href="/main-video"><img src=${joblinks} alt="Main Video" class="centered-rectangular-image"></app-link>
        </div>

        <!-- Title for Interactive Projects Section -->
        <h2 class="subtitle">Interactive Projects</h2>

        <!-- Row of Three Rounded Images (Clickable) -->
        <div class="image-row">
            <app-link href="/games"><img src=${games} alt="Project 1" class="rounded-image"></app-link>
            <app-link href="/project2"><img src=${apps} alt="Project 2" class="rounded-image"></app-link>
            <app-link href="/project3"><img src=${robotics1} alt="Project 3" class="rounded-image"></app-link>
        </div>

        <!-- Go Back Button -->
        <div class="back-button-container">
            <app-link href="/portfolio" class="back-button">Go Back</app-link>
        </div>
    `;
  }
}

customElements.define('app-inspiration', Inspiration);
