import { LitElement, html } from 'lit';
import { map } from 'lit/directives/map.js';
import styles from './styles/add-portfolio-entry.js';
import '../components/page-title.js';
import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

export class AddPortfolioEntry extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      fetchedSubjects: {type: Boolean},
      subjects: {type: Array},

      name: {type: String},
      description: {type: String},
      subject: {type: String},
      url: {type: String},
      picture_url: {type: String},
      error: {type: String}
    };
  }

  constructor() {
    super();
    this.fetchedSubjects = false;
    this.subjects = [];
    this.title = 'Add Portfolio Entry';
    this.name = '';
    this.description = '';
    this.url = '';
    this.picture_url = '';
  }

  handleInput(e) {
    let {id, value} = e.target;
    this[id] = value;
  }

  async updated() {
    if (!this.fetchedSubjects) {
      this.subjects = await innavator_utils.get_whole_list(innavator_api.listSubjects);
      this.fetchedSubjects = true;
      this.requestUpdate();
    }
  }

  async attempt_add_portfolio_entry () {
    let result = await innavator_api.createPortfolioEntry(innavator_utils.collect_optionals(
      ["name", this.name],
      ["description", this.description],
      ["subject", this.subject],
      ["url", this.url],
      ["picture_url", this.picture_url]
    ));
    if (result.apiError) {
      if (result.apiError.message) {
        let messageJSON = innavator_utils.parsed_json_or_null(result.apiError.message);
        if (messageJSON && messageJSON.detail) {
          this.error = messageJSON.detail;
        }
        else {
          this.error = result.apiError.message;
        }
      }
      else {
        this.error = result.apiError;
      }
    }
    else {
      // TODO: return and refresh entries?
      window.location.href = "/";
    }
  }

  render() {
    return html`
      <app-page-title>Add Portfolio Entry</app-page-title>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" class="input-field" placeholder="Enter the project name" @input="${this.handleInput}"/>

        <label for="description">Description:</label>
        <input type="text" id="description" name="description" class="input-field" placeholder="Enter a project description (optional)" @input="${this.handleInput}"/>

        <label for="subject">Subject:</label>
        <select list="subject_choices" id="subject" name="subject" class="input-field" @input="${this.handleInput}">
          <option value=""></option>
          ${this.subjects.length > 0 ?
            map(this.subjects, value => html`<option value="${value.snowflake_id}">${value.name}</option>`) :
            html`No subjects.`}
        </select>

        <label for="url">URL:</label>
        <input type="url" id="url" name="url" class="input-field" placeholder="Enter a project URL (optional)" @input="${this.handleInput}"/>

        <label for="picture_url">Picture URL:</label>
        <input type="url" id="picture_url" name="picture_url" class="input-field" placeholder="Enter a project picture URL (optional)" @input="${this.handleInput}"/>

        <br/><br/>
        <span @click="${this.attempt_add_portfolio_entry}" class="signin-button">Add</span>
        <br/><br/>
        <span style="color: red;">${this.error}</span>
        <br/><br/>
        <app-back-button/>
    `;
  }
}

customElements.define('app-add-portfolio-entry', AddPortfolioEntry);
