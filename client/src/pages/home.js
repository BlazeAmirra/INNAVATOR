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
/*
import { getActiveProduct } from '../utils/fetch.js';
import cache from '../utils/cache.js';
import '../components/product-item.js';
*/
import styles from './styles/home.js';
import '../components/page-title.js';

export class Home extends LitElement {
  /*
  constructor() {
    super();
    this.title = 'Home';
    this.state = {
      status: 'loading',
      productItem: {},
    };
  }

  static get styles() {
    return styles;
  }

  async disconnectedCallback() {
    super.disconnectedCallback();
    cache.deleteDB();
  }

  async firstUpdated() {
    const productItem = await getActiveProduct();

    this.state = {
      ...this.state,
      status: 'loaded',
      productItem,
    };

    if (productItem?.apiError) {
      this.state.apiError = productItem.apiError;
    }

    this.requestUpdate();
  }

  render() {
    const { status, productItem, apiError } = this.state;

    if (apiError) {
      return html`<div class="homeBase">
        <p>No active product found. Check <a href="/products">Products</a>.</p>
      </div>`;
    }

    return html`
      <div class="homeBase">
        ${status === 'loading'
          ? html`<p class="loading">loading... 🥑</p>`
          : html`<app-product-item
              .productId="{this.productId}"
              .productItem=${productItem}
            ></app-product-item>`}
      </div>
    `;
  }
  */
  constructor() {
    super();
    this.title = 'Home';
    /*
    this.state = {
      status: 'loading'
    };
    */
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Placeholder for app logo with link to UAT page -->
        <div class="logo-container">
            <!-- Link to UAT page wrapping the logo image -->
            <a href="https://www.uat.edu/" target="_blank">
                <img src="assets/UATLogo.png" alt="UAT Logo" class="UAT-logo"> <!-- Replace "UATLogo.png" with actual logo path -->
            </a>
        </div>

        <!-- Section for App Name Display -->
        <app-page-title>Innavator</app-page-title> <!-- Displays the app name centered -->

        <!-- Sign-in Button Section -->
        <div class="signin-container">
            <!-- Button linking to sign-in page -->
            <app-link href="/login" class="signin-button">SIGN IN</app-link>
            <app-link href="/register" class="signin-button">REGISTER</app-link>
        </div>

        <!-- Placeholder for secondary logo with link to Innavator page -->
        <div class="secondary-logo-container">
            <!-- Link to Innavator page wrapping the secondary logo image -->
            <app-link href="/about">
                <!-- Class 'hover-logo' applied for hover effect -->
                <img src="assets/InnavatorLogo.png" alt="Innavator App Logo" class="secondary-logo hover-logo">
                <!-- Replace "assets/InnavatorLogo.png" with actual secondary logo path -->
            </app-link>
        </div>
    `;
  }
}

customElements.define('app-home', Home);
