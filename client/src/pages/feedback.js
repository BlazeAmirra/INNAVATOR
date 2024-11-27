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
import styles from './styles/feedback.js';
import '../components/page-title.js';

export class Feedback extends LitElement {
  constructor() {
    super();
    this.title = 'Feedback';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Feedback</app-page-title> <!-- Main title of the feedback page -->

        <!-- Subtitle -->
        <p class="subtitle">Please give us your honest opinion to make the app a better place.</p> <!-- Subtitle prompting the user -->

        <!-- Text Input Box for Feedback -->
        <textarea id="feedback-input" class="feedback-box" placeholder="Speak your mind here"></textarea> <!-- Textarea for user input -->

        <!-- Rating Section -->
        <h2 class="rating-title">Please Rate Us</h2> <!-- Heading for the rating section -->

        <!-- Five Star Rating -->
        <div class="stars-container">
            <!-- Each star is clickable and redirects to another page -->
            <app-link href="/1-star"><span class="star">★</span></app-link> <!-- Star 1 -->
            <app-link href="/2-star"><span class="star">★</span></app-link> <!-- Star 2 -->
            <app-link href="/3-star"><span class="star">★</span></app-link> <!-- Star 3 -->
            <app-link href="/4-star"><span class="star">★</span></app-link> <!-- Star 4 -->
            <app-link href="/5-star"><span class="star">★</span></app-link> <!-- Star 5 -->
        </div>

        <!-- Big Star for Special Feedback -->
        <div class="big-star-container">
            <app-link href="/special-feedback"><span class="big-star">★</span></app-link> <!-- Big star that redirects to another page -->
        </div>
    `;
  }
}

customElements.define('app-feedback', Feedback);
