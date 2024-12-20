import { LitElement, html } from 'lit';
import { map } from 'lit/directives/map.js';
import styles from './styles/edit-portfolio-entry.js';
import '../components/page-title.js';
import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

export class EditGroup extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      groupId: { type: String },
      updateParent: { type: Function },
      requestingRender: { type: Boolean },

      loaded: {type: Boolean},
      group: {type: Object},
      memberships: {type: Array},
      userDict: {type: Object},

      name: {type: String},
      owner: {type: String},
      error: {type: String}
    };
  }

  constructor() {
    super();

    // Initial value for updateParent
    // Trigger parent components update lifecycle
    this.updateParent = () => {};

    this.loaded = false;
    this.group = {};
    this.memberships = [];
    this.userDict = {};

    this.title = 'Edit Portfolio Entry';
    this.name = '';
    this.owner = '';
  }

  handleInput(e) {
    let {id, value} = e.target;
    this[id] = value;
  }

  async updated() {
    const prevItem = this.group;

    if (this.requestingRender && this.groupId && prevItem?.snowflake_id !== this.groupId) {
      this.group = await innavator_api.fetchGroup(this.groupId);

      this.memberships = await innavator_utils.get_whole_list(innavator_api.listMembers, this.groupId);

      let i;
      for (i = 0; i < this.memberships.length; i++) {
        let membership = this.memberships[i];
        if (!this.userDict[membership.user]) {
          this.userDict[membership.user] = await innavator_api.fetchUser(membership.user);
        }
      }

      this.loaded = true;

      // If there was an error, make sure this is captured.
      if (this.group?.apiError) {
        this.state.apiError = group.apiError;
      }
      this.requestUpdate();
    }
  }

  async attempt_edit_group () {
    let result = await innavator_api.patchGroup(innavator_utils.collect_optionals(
      ["group", this.groupId],
      ["name", this.name],
      ["owner", this.owner]
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
    return html`${!this.loaded
      ? html`<p>loading...</p>` : html`
        <app-page-title>Edit Group</app-page-title>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" class="input-field" placeholder="${this.group.name}" @input="${this.handleInput}"/>

        <label for="owner">Owner:</label>
        <select id="owner" name="owner" class="input-field" @input="${this.handleInput}">
          <option value=""></option>
          ${map(this.memberships, value => html`<option value="${this.userDict[value.user].snowflake_id}">${innavator_utils.optimal_name(this.userDict[value.user])} - ${this.userDict[value.user].user.username}</option>`)}
        </select>

        <br/><br/>
        <span @click="${this.attempt_edit_group}" class="signin-button">Edit</span>
        <br/><br/>
        <span style="color: red;">${this.error}</span>
    `}
    <br/><br/>
    <app-back-button/>
    `;
  }
}

customElements.define('app-edit-group', EditGroup);
