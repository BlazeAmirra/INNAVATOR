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
import styles from './styles/electronics.js';
import '../components/page-title.js';

export class Electronics extends LitElement {
  constructor() {
    super();
    this.title = 'Electronics';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Electronics Page Title -->
        <app-page-title>Electronics</app-page-title> <!-- Displays the electronics page title centered -->

        <!-- First Image and Description Section -->
        <div class="content-section">
            <img src="assets/electronics.jpg" alt="Electronics Image 1" class="content-image"> <!-- Replace with actual image path -->
            <div class="description-box">
                <p>This is Project Motor display by NeAndrea Harris. It shows the word motor on the top of the M5 stick
                    when the button is pressed. When the side button is pressed, it says congratulations, here is a cookie.
                </p> <!-- Placeholder text for description -->
            </div>
        </div>

        <!-- Second Image and Description Section -->
        <div class="content-section">
            <img src="assets/electronics1.jpg" alt="Electronics Image 2" class="content-image"> <!-- Replace with actual image path -->
            <div class="description-box">
                <p>This is project Sumo Rojo by NeAndrea Harris. Her first ever Robot from first robotics. This is one of
                    the inspirations that got her into robotics and her first attempt of coding.
                </p> <!-- Placeholder text for description -->
            </div>
        </div>

        <!-- Mock Chat Box Section with Clickable Link -->
        <app-link href="/create-something" class="chat-box-link"> <!-- Link to a new page to "make something" -->
            <div class="chat-box">
                <p>Click here to make something with you.</p> <!-- Placeholder text for chat input -->
            </div>
        </app-link>
    `;
  }
}

customElements.define('app-electronics', Electronics);
