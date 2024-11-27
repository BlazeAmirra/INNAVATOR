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

      <section class="contact-form"> <!-- Section for the contact form -->
          <h3>Get in Touch</h3> <!-- Subheading for the contact form -->
          <form> <!-- Start of the contact form -->
              <label for="name">Name</label> <!-- Label for the name input -->
              <input type="text" id="name" placeholder="Your name"> <!-- Input field for the user's name -->
              <label for="email">Email</label> <!-- Label for the email input -->
              <input type="email" id="email" placeholder="Your email"> <!-- Input field for the user's email -->
              <label for="message">Message</label>  <!-- Label for the message input -->
              <textarea id="message" placeholder="Your message"></textarea>  <!-- Textarea for the user's message -->
              <button type="submit">Send Message</button> <!-- Submit button for the form -->
          </form> <!-- End of the contact form -->
      </section>

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
