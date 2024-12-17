import { LitElement, html } from 'lit';
import styles from './styles/report-user.js';
import '../components/page-title.js';

export class ReportUser extends LitElement {
  constructor() {
    super();
    this.title = "Report User";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Report User</app-page-title> <!-- Title of the page -->

        <!-- Subtitle or Instructions -->
        <p class="instructions">Please describe the issue you experienced with the user below:</p> <!-- Subtitle or explanation for the user -->

        <!-- Textbox for User Input -->
        <form action="submit.html" method="POST"> <!-- Form to submit the report -->
            <textarea name="user-issue" id="user-issue" class="input-box" placeholder="Type your issue here..." required></textarea>
            <!-- A text area where users can type their issue; it's required to submit -->

            <!-- Submit Button -->
            <button type="submit" class="submit-button">Submit Report</button> <!-- Button to submit the form -->
        </form>
    `;
  }
}

customElements.define('app-report-user', ReportUser);
