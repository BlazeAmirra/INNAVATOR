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
import { getConfig } from '../utils/config.js';
import { getCartItemTotal } from '../helpers/checkout.js';
import styles from './styles/header.js';
import './link.js';

const cartIcon = new URL('../../assets/shopping_cart.svg', import.meta.url)
  .href;

export class Header extends LitElement {
  static get properties() {
    return {
      headerTitle: { type: String },
      cart: { type: Array },
    };
  }

  static get styles() {
    return styles;
  }

  render() {
    document.title = this.headerTitle;
    const { AVOCANO_PURCHASE_MODE } = getConfig();

    return html`
      <nav>
        <ul> <!-- Unordered list for navigation items -->
          <li><app-link href="/">Home</app-link></li> <!-- Link to Home page -->
          <li><app-link href="/settings">Settings</app-link></li> <!-- Link to Settings page -->
          <li><app-link href="/work">Work</app-link></li> <!-- Link to Work page -->
          <li><app-link href="/about">About</app-link></li> <!-- Link to About page -->
          <li><app-link href="/contact">Contact</app-link></li> <!-- Link to Contact page -->
        </ul>
      </nav>
    `;
  }
}

customElements.define('app-header', Header);
