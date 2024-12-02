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
import styles from './styles/contact.js';
import '../components/page-title.js';

export class Contact extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    return html`
      <app-page-title>Contact Us</app-page-title>

      <!--
      <section class="contact-form">
          <h3>Get in Touch</h3>
          <form>
              <label for="name">Name</label>
              <input type="text" id="name" placeholder="Your name">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="Your email">
              <label for="message">Message</label>
              <textarea id="message" placeholder="Your message"></textarea>
              <button type="submit">Send Message</button>
          </form>
      </section>
      -->

      <section class="email-contact"> <!-- Section for email contact information -->
          <h3>Contact via Email</h3> <!-- Subheading for email contact -->
          <p>If you prefer, you can also reach us via email at:  <!-- Paragraph introducing the email contact -->
              <a href="mailto:innavatoruat@gmail.com">innavatoruat@gmail.com</a> <!-- Email link for contacting -->
          </p>
      </section>
    `;
  }
}

customElements.define('app-contact', Contact);
