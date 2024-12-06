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
import styles from './styles/art.js';
import '../components/back-button.js';
import '../components/page-title.js';

const art1 = new URL('../../assets/art1.png', import.meta.url).href;
const art2 = new URL('../../assets/art2.png', import.meta.url).href;
const art3 = new URL('../../assets/art3.png', import.meta.url).href;
const art4 = new URL('../../assets/art4.png', import.meta.url).href;
const innavatorLogo = new URL('../../assets/InnavatorLogo.png', import.meta.url).href;

export class Art extends LitElement {
  constructor() {
    super();
    this.title = 'Art';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <app-page-title>Art</app-page-title>

      <div class="back-button-container">
          <app-back-button/>
      </div>

      <section class="art-gallery">
          <div class="art-item">
              <img src=${art1} alt="Amirra in the fighting stance">
              <p class="art-description">Amirra in the fighting stance is an original piece by NeAndrea Harris for a possible future animated show called Jracana.</p>
          </div>

          <div class="art-item">
              <img src=${innavatorLogo} alt="Amirra Innavator logo">
              <p class="art-description">Amirra Innavator logo was inspired by NeAndrea Harris' Original character canon just for fun.</p>
          </div>

          <div class="art-item">
              <img src=${art2} alt="BlazeAmirra logo">
              <p class="art-description">BlazeAmirra by NeAndrea Harris "nickname" logo for a head canon just for fun.</p>
          </div>

          <div class="art-item">
              <img src=${art3} alt="Zin artwork">
              <p class="art-description">Zin by NeAndrea Harris is an inspirational balance and peace in one's life.</p>
          </div>

          <div class="art-item">
              <img src=${art4} alt="A spring night artwork">
              <p class="art-description">A spring night, a new classic addition to NeAndrea Harris's background themes originally for the project "I Am The DJ." Still an amazing picture of traditional and digital art together.</p>
          </div>
      </section>
    `;
  }
}

customElements.define('app-art', Art);
