import { LitElement, html } from 'lit';
import styles from './styles/issue-tracker.js';
import '../components/page-title.js';

export class IssueTracker extends LitElement {
  constructor() {
    super();
    this.title = "Issue Tracker";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>Issue Tracker</app-page-title>

        <p class="description">Track reported issues and submit new concerns for resolution.</p>

        <table class="issue-table">
            <thead>
                <tr>
                    <th>Issue ID</th>
                    <th>Description</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Chat disconnects frequently.</td>
                    <td>In Progress</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Video call not working.</td>
                    <td>Resolved</td>
                </tr>
            </tbody>
        </table>

        <form class="issue-form">
            <label for="issue-description">Describe your issue:</label>
            <textarea id="issue-description" name="issue-description" placeholder="Enter the issue details here..."></textarea>
            <button type="submit" class="submit-button">Submit Issue</button>
        </form>
    `;
  }
}

customElements.define('app-issue-tracker', IssueTracker);
