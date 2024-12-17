import { LitElement, html } from 'lit';
import styles from './styles/edit-portfolio-entry.js';
import '../components/page-title.js';
import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

export class CreateChannel extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      groupId: { type: String },
      name: {type: String},
      error: {type: String}
    };
  }

  constructor() {
    super();
    this.title = 'Edit Portfolio Entry';
    this.name = '';
    this.error = '';
  }

  handleInput(e) {
    let {id, value} = e.target;
    this[id] = value;
  }

  async attemptCreateChannel () {
    let result = await innavator_api.createChannel(this.groupId, this.name);
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
      <app-page-title>Create Channel</app-page-title>

      <label for="name">Name:</label>
      <input type="text" id="name" name="name" class="input-field" @input="${this.handleInput}" />

      <br/><br/>
      <span @click="${this.attemptCreateChannel}" class="signin-button">Edit</span>
      <br/><br/>
      <span style="color: red;">${this.error}</span>
      <br/><br/>
      <app-back-button/>
    `;
  }
}

customElements.define('app-create-channel', CreateChannel);
