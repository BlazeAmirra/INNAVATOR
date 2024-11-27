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
