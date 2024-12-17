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
