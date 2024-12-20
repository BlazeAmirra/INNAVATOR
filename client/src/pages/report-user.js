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
        <app-page-title>Report User</app-page-title>

        <p class="instructions">Please describe the issue you experienced with the user below:</p>

        <form action="submit.html" method="POST">
            <textarea name="user-issue" id="user-issue" class="input-box" placeholder="Type your issue here..." required></textarea>
            <button type="submit" class="submit-button">Submit Report</button>
        </form>
    `;
  }
}

customElements.define('app-report-user', ReportUser);
