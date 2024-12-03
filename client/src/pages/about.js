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
import styles from './styles/about.js';
import '../components/page-title.js';

const logo = new URL('../../assets/InnavatorLogo.png', import.meta.url).href;

export class About extends LitElement {
  constructor() {
    super();
    this.title = 'About';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <app-page-title>About the Innavator App</app-page-title>
      <div class="secondary-logo-container"> <!-- Placeholder for secondary logo -->
        <img src=${logo} alt="Innavator App Logo" class="secondary-logo"/> <!-- Static logo -->
      </div>

      <div class="content">
          <p>
              The Innavator app is designed for University of Advancing Technology (UAT) students, whether new, current, or graduates, to help them develop teamwork skills, work on collaborative projects, and build professional profiles that showcase their abilities and achievements.
          </p>
          <p>
              The app’s mission is to make learning more interactive and inspire students to recognize and expand their potential in the workforce. Through Innavator, students can enhance their skills, increase job readiness, and foster innovative thinking.
          </p>
          <p>
              Innavator was created by NeAndrea Harris, also known as Blaze, who was inspired by her experience at FedEx, where she observed the power of collaboration among employees. Her vision was to develop an app that would serve as a creative outlet, allowing students to generate and refine ideas while working together.
          </p>
          <p>
              After presenting her concept at the Student Innovation Project (SIP), Blaze refined her approach, incorporating feedback to make the app even more impactful. With the support of her dedicated team, including King, Sanyerlis, Shjon, Sean, Nathaniel, Nick Preston Markus, and Alesis, the app is being brought to life, embodying Blaze’s vision of fostering creativity, teamwork, and professional growth among UAT students.
          </p>
      </div>
      <app-back-button/>
    `;
  }
}

customElements.define('app-about', About);
