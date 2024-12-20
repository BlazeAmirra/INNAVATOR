import { LitElement, html } from 'lit';
import { map } from 'lit/directives/map.js';
import styles from './styles/user-portfolio.js';
import '../components/back-button.js';
import '../components/page-title.js';

import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

export class Groups extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      groupMemberships: {type: Array},
      groupDict: {type: Object},
      loaded: {type: Boolean},
      requestingRender: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.title = "Group List";
    this.groupMemberships = [];
    this.groupDict = {};
    this.loaded = false;
  }

  async update() {
    super.update();
    if (!this.loaded && this.requestingRender) {
      this.groupMemberships = await innavator_utils.get_whole_list(innavator_api.listGroupMemberships);
      let i;
      for (i = 0; i < this.groupMemberships.length; i++) {
        let groupMembership = this.groupMemberships[i];
        if (!this.groupDict[groupMembership.group]) {
          this.groupDict[groupMembership.group] = await innavator_api.fetchGroup(groupMembership.group);
        }
      }
      this.loaded = true;
    }
  }

  render() {
    return html`${this.loaded ? html`
      <app-page-title>Groups you are in</app-page-title>

      <div class="image-pair">
      ${this.groupMemberships.length > 0 ? map(this.groupMemberships, value => html`
        <div class="portfolio-image">
          <app-link href="/channels/${this.groupDict[value.group].snowflake_id}">
            <img src="" alt="${this.groupDict[value.group].name}"/>
          </app-link>
        </div>
      `) : html`No results.`}
      </div>
      ` : html`Loading...`}
      <div class="back-button-container">
        <app-back-button></app-back-button>
        <app-link href="/create-group" class="back-button">Create Group</app-link>
        <app-link href="/group-invites" class="back-button">Group Invites</app-link>
      </div>
    `;
  }
}

customElements.define('app-groups', Groups);
