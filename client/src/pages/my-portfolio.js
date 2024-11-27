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
import styles from './styles/my-portfolio.js';
import '../components/page-title.js';

export class MyPortfolio extends LitElement {
  constructor() {
    super();
    this.title = "My Portfolio";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>My Portfolio</app-page-title>

        <!-- Portfolio Image (Clickable Link) -->
        <div class="portfolio-image-container">
            <a href="https://example-website.com" target="_blank"> <!-- Link to portfolio website -->
                <img src="assets/art5.jpg" alt="Portfolio Thumbnail" class="portfolio-image"> <!-- Portfolio image thumbnail -->
            </a>
        </div>

        <!-- Introduction Box -->
        <div class="intro-box">
            <p>Hi, my name is NeAndrea H. My major is Robotics & Embedded Systems. Check out my website for more.</p>
        </div>

        <!-- Two Images Side by Side -->
        <div class="image-pair">
            <img src="assets/electronics1.jpg" alt="Image 1" class="portfolio-image">
            <img src="assets/art6.jpg" alt="Image 2" class="portfolio-image">
        </div>

        <!-- Go Back Button -->
        <div class="back-button-container">
            <app-link href="/portfolio" class="back-button">Go Back</app-link>
        </div>
    `;
  }
}

customElements.define('app-my-portfolio', MyPortfolio);
