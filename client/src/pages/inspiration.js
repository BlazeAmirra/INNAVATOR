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
            <app-link href="/video1"><img src="assets/live1.png" alt="Video 1" class="rounded-image"></app-link>
            <app-link href="/video2"><img src="assets/rec.png" alt="Video 2" class="rounded-image"></app-link>
            <app-link href="/video3"><img src="assets/autodoc.png" alt="Video 3" class="rounded-image"></app-link>
        </div>

        <!-- Centered Rectangular Image (Clickable) -->
        <div class="centered-image-container">
            <app-link href="/main-video"><img src="assets/joblinks.png" alt="Main Video" class="centered-rectangular-image"></app-link>
        </div>

        <!-- Title for Interactive Projects Section -->
        <h2 class="subtitle">Interactive Projects</h2>

        <!-- Row of Three Rounded Images (Clickable) -->
        <div class="image-row">
            <app-link href="/games"><img src="assets/games.png" alt="Project 1" class="rounded-image"></app-link>
            <app-link href="/project2"><img src="assets/apps.png" alt="Project 2" class="rounded-image"></app-link>
            <app-link href="/project3"><img src="assets/robotics1.png" alt="Project 3" class="rounded-image"></app-link>
        </div>

        <!-- Go Back Button -->
        <div class="back-button-container">
            <app-link href="/portfolio" class="back-button">Go Back</app-link>
        </div>
    `;
  }
}

customElements.define('app-inspiration', Inspiration);
