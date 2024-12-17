import { LitElement, html } from 'lit';
import styles from './styles/user.js';
import '../components/back-button.js';
import '../components/page-title.js';

import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

export class UserPage extends LitElement {
  static get properties() {
    return {
        userId: { type: String },
        updateParent: { type: Function },
        requestingRender: { type: Boolean },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.state = {
      status: 'loading',
      user: {},
      me: 0,
      user_name: ''
    };

    // Initial value for updateParent
    // Trigger parent components update lifecycle
    this.updateParent = () => {};
  }

  async updated() {
    const prevItem = this.state.user;
    let user;

    if (this.requestingRender && this.userId && prevItem?.snowflake_id !== this.userId) {
      user = await innavator_api.fetchUser(this.userId);

      this.state = {
        ...this.state,
        status: 'loaded',
        user,
      };

      this.state.me = innavator_api.get_this_user();
      this.state.author_name = innavator_utils.optimal_name(user);

      // If there was an error, make sure this is captured.
      if (user?.apiError) {
        this.state.apiError = user.apiError;
      }
      this.requestUpdate();
    }
  }

  render() {
    return html`${this.state.status === 'loading'
        ? html`<p>loading...</p>` : html`
        <app-page-title>User Profile</app-page-title>

        <div class="portfolio-image-container">
            <img ${this.state.user.profile_picture_url != "" ? html`src="${this.state.user.profile_picture_url}"` : ""} alt="${this.state.user.profile_picture_url != "" ? "Profile Picture" : "No image"}" class="portfolio-image"></img>
        </div>

        <div class="intro-box">
            <p>${this.state.author_name}</p>
            <p style="font-size: 14px;">Major: ${this.state.user.major}</p>
            <p style="font-size: 14px;">${this.state.user.website_url != "" ? html`
                <a href="${this.state.user.website_url}" target="_blank">${this.state.user.website_url}</a>
            ` : html`
                <i>No website URL</i>
            `}</p>
        </div>
        ${this.userId == this.state.me ? html`
        <div class="back-button-container">
            <app-link href="/account-information" class="back-button">Edit</app-link>
        </div>
        ` : html``}
        <div class="back-button-container">
            <app-link href="/user-portfolio/${this.userId}" class="back-button">User's Portfolio</app-link>
        </div>
    `}
    <div class="back-button-container">
        <app-back-button/>
    </div>
    `;
  }
}

customElements.define('app-user', UserPage);
