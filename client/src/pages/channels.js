import { LitElement, html } from 'lit';
import styles from './styles/user-portfolio.js';
import '../components/back-button.js';
import '../components/page-title.js';

import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

export class Channels extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      group: {type: String},
      channels: {type: Array},
      loaded: {type: Boolean},
      requestingRender: {type: Boolean},
      groupName: {type: String},
      privileged: {type: Boolean},
      owner: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.title = "Channels in Group";
    this.channels = [];
    this.privileged = false;
    this.owner = false;
  }

  async update() {
    super.update();
    if (!this.requestingRender) {
      this.loaded = false;
    }
    if (this.requestingRender && this.group && !this.loaded) {
      this.channels = await innavator_utils.get_whole_list(innavator_api.listChannels, this.group);
      let groupInfo = await innavator_api.fetchGroup(this.group);
      this.groupName = groupInfo.name;
      this.owner = groupInfo.owner == innavator_api.get_this_user();
      this.privileged = (await innavator_api.fetchMembership(this.group)).is_privileged;
      this.loaded = true;
    }
  }

  render() {
    const listItems = [];
    if (this.channels.length > 0) {
      for (let i = 0; i < this.channels.length / 5; i++) {
        const listItem = [];
        for (let j = i * 5; j < (i + 1) * 5 && j < this.channels.length; j++) {
          listItem.push(html`
            <div class="portfolio-image">
              <app-link href="group-chat/${this.channels[j].snowflake_id}">
                <img alt="${this.channels[j].name}" />
              </app-link>
            </div>
          `);
        }
        listItems.push(html`
          <div class="image-pair">
            ${listItem}
          </div>
        `);
      }
    }
    else {
      listItems.push(html`<div>No results</div>`);
    }

    return html`${this.loaded ? html`
      <app-page-title>Channels in ${this.groupName}</app-page-title>

      ${listItems}

      ${this.privileged ? html`
        <div class="back-button-container">
          <app-link href="/create-channel/${this.group}" class="back-button">Create Channel</app-link>
          ${this.owner ? html`
            <app-link href="/edit-group/${this.group}" class="back-button">Edit Group</app-link>
          ` : html``}
        </div>
      ` : html``}
    ` : html`Loading...`}
    <div class="back-button-container">
        <app-back-button/>
    </div>
    `;
  }
}

customElements.define('app-channels', Channels);
