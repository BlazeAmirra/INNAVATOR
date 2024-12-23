import { LitElement, html } from 'lit';
import { navigator } from '../vendor/lit-element-router-2.0.3a/lit-element-router.js';

import styles from './styles/welcome.js';
import '../components/page-title.js';
import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

export class Welcome extends navigator(LitElement) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      greeting_name: {type: String},
      loaded: {type: Boolean},
      logged_in: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.title = "Welcome";
    this.greeting_name = "";
    this.loaded = false;
    this.not_logged_in = false;
  }

  async update() {
    super.update();
    if (!this.loaded) {
      let result = await innavator_api.who_am_i();
      if (result.logged_in) {
        this.greeting_name = innavator_utils.optimal_name(await innavator_api.fetchUser(result.snowflake_id));
      }
      else {
        this.not_logged_in = true;
      }
      this.loaded = true;
    }
  }

  render() {
    return this.loaded ? html`
        <app-page-title>Welcome to Innavator, ${this.greeting_name}!</app-page-title>

        <div class="button-container">
            <app-link href="/commission" class="option-button">★ Commission</app-link>

            <app-link href="/learn" class="option-button">★ Learn</app-link>

            <app-link href="/portfolio" class="option-button">★ Portfolio</app-link>

            <app-link href="/groups" class="option-button">★ Groups</app-link>
        </div>
    ` : html`<span>Loading...</span>`;
  }
}

customElements.define('app-welcome', Welcome);
