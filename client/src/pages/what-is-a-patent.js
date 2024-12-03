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
import styles from './styles/what-is-a-patent.js';
import '../components/page-title.js';

export class WhatIsAPatent extends LitElement {
  constructor() {
    super();
    this.title = "What is a Patent?";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Patent Nonsense</app-page-title>

        <span>Hah, got 'em!</span>
        <br/><br/>
        <app-back-button></app-back-button>
    `;
  }
}

customElements.define('app-what-is-a-patent', WhatIsAPatent);
