import { LitElement, html } from 'lit';
import { map } from 'lit/directives/map.js';
import styles from './styles/user-portfolio.js';
import '../components/back-button.js';
import '../components/page-title.js';

import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

export class GroupInvites extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      invites: {type: Array},
      groupDict: {type: Object},
      loaded: {type: Boolean},
      requestingRender: {type: Boolean},
      requestingRefresh: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.title = "Group Invites";
    this.invites = [];
    this.loaded = false;
    this.requestingRefresh = false;
    this.groupDict = {};
  }

  async acceptInvite(group_snowflake) {
    let result = await innavator_api.acceptInviteToGroup(group_snowflake);
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
      // TODO: navigate to group?
      window.location.href = "/";
    }
  }

  async rejectInvite(group_snowflake) {
    let result = await innavator_api.leaveGroup(group_snowflake);
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
      this.requestingRefresh = true;
    }
  }

  async update() {
    super.update();
    if ((!this.loaded || this.requestingRefresh) && this.requestingRender) {
      this.invites = await innavator_utils.get_whole_list(innavator_api.fetchGroupRequestsToMe);
      let i;
      for (i = 0; i < this.invites.length; i++) {
        let invite = this.invites[i];
        if (!this.groupDict[invite.group]) {
          this.groupDict[invite.group] = await innavator_api.fetchGroup(invite.group);
        }
      }
      this.loaded = true;
      this.requestingRefresh = false;
    }
  }

  render() {
    return html`${this.loaded ? html`
        <app-page-title>Groups you were invited to</app-page-title>

        <div class="image-pair">
          ${this.invites.length > 0 ? map(this.invites, value => html`
            <div class="portfolio-image">
              <img src="" alt="${this.groupDict[value.group].name}"/>
              <div class="back-button-container">
                <button @click="${() => this.acceptInvite(this.groupDict[value.group].snowflake_id)}">Accept</button>
                <button @click="${() => this.rejectInvite(this.groupDict[value.group].snowflake_id)}">Decline</button>
              </div>
            </div>
          `) : html`No results.`}
        </div>
    ` : html`Loading...`}
    <div class="back-button-container">
        <app-back-button></app-back-button>
    </div>
    `;
  }
}

customElements.define('app-group-invites', GroupInvites);
