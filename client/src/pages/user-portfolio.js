import { LitElement, html } from 'lit';
import styles from './styles/user-portfolio.js';
import '../components/back-button.js';
import '../components/page-title.js';

import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

const art5 = new URL('../../assets/art5.jpg', import.meta.url).href;

export class UserPortfolio extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      user_snowflake: {type: String},
      updateParent: {type: Function},
      requestingRender: {type: Boolean},
      portfolio: {type: Array},
      loaded: {type: Boolean},
      author: {type: Object},
      author_name: {type: String},
      me: {type: String}
    };
  }

  constructor() {
    super();
    this.title = "User Portfolio";
    this.portfolio = [];
  }

  async update() {
    super.update();
    if (!this.requestingRender) {
      this.loaded = false;
    }
    if (this.requestingRender && this.user_snowflake && !this.loaded) {
      this.me = innavator_api.get_this_user();
      let result = await innavator_api.fetchPortfolio(this.user_snowflake);
      this.portfolio = result.results ? result.results : [];
      this.author = await innavator_api.fetchUser(this.user_snowflake);
      this.author_name = innavator_utils.optimal_name(this.author);
      this.loaded = true;
    }
  }

  render() {
    const listItems = [];
    if (this.portfolio.length > 0) {
      for (let i = 0; i < this.portfolio.length / 5; i++) {
        const listItem = [];
        for (let j = i * 5; j < (i + 1) * 5 && j < this.portfolio.length; j++) {
          listItem.push(html`
            <div class="portfolio-image">
              <app-link href="portfolio-entry/${this.portfolio[j].snowflake_id}">
                <img src="${this.portfolio[j].picture_url}" alt="${this.portfolio[j].name}" />
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

    return html`
      <!-- Page Title -->
        <app-page-title>Portfolio of <app-link href="/user/${this.user_snowflake}">${this.author_name}</app-link></app-page-title>

        <!--
        <div class="portfolio-image-container">
            <a href="https://example-website.com" target="_blank">
                <img src=${art5} alt="Portfolio Thumbnail" class="portfolio-image">
            </a>
        </div>

        <div class="intro-box">
            <p>Hi, my name is NeAndrea H. My major is Robotics & Embedded Systems. Check out my website for more.</p>
        </div>
        -->

        ${listItems}

        ${this.user_snowflake == this.me ? html`<div class="back-button-container">
            <app-link href="/add-portfolio-entry" class="back-button">Add Entry</app-link>
        </div>` : html``}

        <!-- Go Back Button -->
        <div class="back-button-container">
            <app-back-button/>
        </div>
    `;
  }
}

customElements.define('app-user-portfolio', UserPortfolio);
