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
import { map } from 'lit/directives/map.js';
import styles from './styles/my-portfolio.js';
import '../components/page-title.js';

import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

const art5 = new URL('../../assets/art5.jpg', import.meta.url).href;
const art6 = new URL('../../assets/art6.jpg', import.meta.url).href;
const electronics1 = new URL('../../assets/electronics1.jpg', import.meta.url).href;

export class MyPortfolio extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      user_snowflake: {type: String},
      portfolio: {type: Array},
      loaded: {type: Boolean},
      logged_in: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.title = "My Portfolio";
    this.portfolio = [];
  }

  async update() {
    super.update();
    if (!this.loaded) {
      let result = await innavator_api.who_am_i();
      if (result.logged_in) {
        this.user_snowflake = result.snowflake_id;
        result = await innavator_api.fetchPortfolio(this.user_snowflake);
        if (result.results) {
          this.portfolio = result.results;
        }
      }
      else {
        this.not_logged_in = true;
      }
      this.loaded = true;
    }
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>My Portfolio</app-page-title>

        <!--
        <div class="portfolio-image-container">
            <a href="https://example-website.com" target="_blank">
                <img src=${art5} alt="Portfolio Thumbnail" class="portfolio-image">
            </a>
        </div>

        <div class="intro-box">
            <p>Hi, my name is NeAndrea H. My major is Robotics & Embedded Systems. Check out my website for more.</p>
        </div>
        -->

        <!-- Two Images Side by Side -->
        <div class="image-pair">
            ${map(this.portfolio, entry => entry.url != "" ? html`
              <div class="portfolio-image">
                <a href="" target="_blank">
                  <img src="${entry.picture_url}" alt="${entry.name}" />
                </a>
              </div>
              ` : html`
              <div class="portfolio-image">
                <img src="${entry.picture_url}" alt="${entry.name}" />
              </div>
              `
            )}
        </div>

        <div class="back-button-container">
            <app-link href="/add-portfolio-entry" class="back-button">Add Entry</app-link>
        </div>

        <!-- Go Back Button -->
        <div class="back-button-container">
            <app-link href="/portfolio" class="back-button">Go Back</app-link>
        </div>
    `;
  }
}

customElements.define('app-my-portfolio', MyPortfolio);
