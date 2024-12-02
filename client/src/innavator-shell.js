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
import { router } from './vendor/lit-element-router-2.0.3a/lit-element-router.js';
import { getSiteConfig } from './utils/fetch.js';
import { getConfig } from './utils/config.js';
import cache from './utils/cache.js';
import routes from './utils/routes.js';
import styles from './styles/shell.js';

// Pages
import './pages/home.js';
import './pages/about.js';
import './pages/account-information.js';
import './pages/add-portfolio-entry.js';
import './pages/ai-next.js';
import './pages/ai.js';
import './pages/art.js';
import './pages/block-user.js';
import './pages/change-colors.js';
import './pages/chat-settings.js';
import './pages/chat-with.js';
import './pages/checkout.js';
import './pages/commission.js';
import './pages/contact.js';
import './pages/create-something.js';
import './pages/electronics.js';
import './pages/feedback.js';
import './pages/founders.js';
import './pages/games.js';
import './pages/group-chat.js';
import './pages/inspiration.js';
import './pages/issue-tracker.js';
import './pages/learn.js';
import './pages/login.js';
import './pages/logout.js';
import './pages/movies.js';
import './pages/my-portfolio.js';
import './pages/no-partner.js';
import './pages/partner-option.js';
import './pages/patents.js';
import './pages/portfolio.js';
import './pages/profiles.js';
import './pages/register.js';
import './pages/report-user.js';
import './pages/settings.js';
import './pages/showcase.js';
import './pages/stars.js';
import './pages/student-next.js';
import './pages/uat-dictionary.js';
import './pages/video-audio.js';
import './pages/view.js';
import './pages/welcome.js';
import './pages/what-is-a-patent.js';
import './pages/with-student.js';
import './pages/work.js';
import './pages/yes-partner.js';

import './pages/not-found.js';
import './pages/error.js';

// old stuff
import './pages/product.js';
import './pages/product-list.js';
import './pages/shipping.js';

// Components
import './components/checkout-form.js';
import './components/checkout-dialog.js';
import './components/cart-item.js';
import './components/product-item.js';
import './components/header.js';
import './components/footer.js';
import './components/main.js';

// Material design
import '@material/mwc-button';
import '@material/mwc-textfield';
import '@material/mwc-select';
import '@material/mwc-list';
import '@material/mwc-dialog';
import { who_am_i } from './innavator-api.js';

export class InnavatorShell extends router(LitElement) {
  static get properties() {
    return {
      route: { type: String },
      params: { type: Object },
    };
  }

  static get routes() {
    return routes;
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.route = '';
    this.params = {};
    this.state = {
      config: {},
      cart: [],
      loading: true,
      logged_in: false
    };

    this.childUpdateRequest = this.childUpdateRequest.bind(this);
  }

  async connectedCallback() {
    super.connectedCallback();

    /*
    const config = await getSiteConfig();
    // Show loading animation only when
    // site config is unavailable
    if (config) {
      if (config.errors) {
        // An error was encountered, pass it along to the UI.
        this.state.apiError = config.errors;

        //this.requestUpdate();
        //return;
      }
      this.state.loading = false;
    }

    if (config?.apiError) {
      // An error was encountered, pass it along to the UI.
      this.state.apiError = config.apiError;
    }

    // Set django site config properties as
    // global variables for our css to leverage
    this.style.setProperty('--color-primary', config.color_primary);
    this.style.setProperty('--color-secondary', config.color_secondary);
    this.style.setProperty('--color-action', config.color_action);
    this.style.setProperty('--color-action-text', config.color_action_text);
    this.style.setProperty('--site-name-color', config.site_name_color);
    this.style.setProperty('--site-name-font', config.site_name_font);
    this.style.setProperty('--base-font', config.base_font);

    this.state.config = config;

    /* Dynamically pull fonts we require
    if (window.WebFont && config.base_font) {
      window.WebFont.load({
        google: {
          families: [config.base_font, config.site_name_font],
        },
      });
    }
    */

    let result = await who_am_i();
    this.state.logged_in = result.logged_in ? true : false;
    if (result.logged_in && (this.route === 'home' || this.route === 'login' || this.route === 'register')) {
      this.route = 'welcome';
    }
    else if (!result.logged_in && !(this.route === 'home' || this.route === 'login' || this.route === 'register')) {
      this.route = 'home';
    }
    this.state.loading = false;

    this.requestUpdate();
  }

  router(route, params) {
    this.route = route;
    this.params = params;
  }

  async update(changed) {
    this.state.cart = await cache.all();
    super.update(changed);
  }

  async childUpdateRequest() {
    this.state.cart = await cache.all();
    this.requestUpdate();
  }

  render() {
    const { loading, apiError } = this.state;
    const { AVOCANO_PURCHASE_MODE } = getConfig();

    if (apiError) {
      return html`<app-error .apiError=${apiError}></app-error>`;
    }

    document.title = "Innavator";

    return loading
      ? html`<app-loading></app-loading>`
      : html`
          ${!this.state.logged_in ? html`` : html`<app-header></app-header>`}
          <app-main active-route=${this.route}>
            <div class="route" route="home">
              <app-home></app-home>
            </div>
            <div class="route" route="product">
              <app-product
                .productId=${parseInt(this.params.id, 10)}
                .updateParent=${this.childUpdateRequest}
              ></app-product>
            </div>
            <div class="route" route="product-list">
              <app-product-list></app-product-list>
            </div>
            <div class="route" route="shipping">
              <app-shipping></app-shipping>
            </div>
            <div class="route" route="about">
              <app-about></app-about>
            </div>
            <div class="route" route="account-information">
              <app-account-information></app-account-information>
            </div>
            <div class="route" route="add-portfolio-entry">
              <app-add-portfolio-entry></app-add-portfolio-entry>
            </div>
            <div class="route" route="ai-next">
              <app-ai-next></app-ai-next>
            </div>
            <div class="route" route="ai">
              <app-ai></app-ai>
            </div>
            <div class="route" route="art">
              <app-art></app-art>
            </div>
            <div class="route" route="block-user">
              <app-block-user></app-block-user>
            </div>
            <div class="route" route="change-colors">
              <app-change-colors></app-change-colors>
            </div>
            <div class="route" route="chat-settings">
              <app-chat-settings></app-chat-settings>
            </div>
            <div class="route" route="chat-with">
              <app-chat-with></app-chat-with>
            </div>
            <div class="route" route="commission">
              <app-commission></app-commission>
            </div>
            <div class="route" route="contact">
              <app-contact></app-contact>
            </div>
            <div class="route" route="create-something">
              <app-create-something></app-create-something>
            </div>
            <div class="route" route="electronics">
              <app-electronics></app-electronics>
            </div>
            <div class="route" route="feedback">
              <app-feedback></app-feedback>
            </div>
            <div class="route" route="founders">
              <app-founders></app-founders>
            </div>
            <div class="route" route="games">
              <app-games></app-games>
            </div>
            <div class="route" route="group-chat">
              <app-group-chat></app-group-chat>
            </div>
            <div class="route" route="inspiration">
              <app-inspiration></app-inspiration>
            </div>
            <div class="route" route="issue-tracker">
              <app-issue-tracker></app-issue-tracker>
            </div>
            <div class="route" route="learn">
              <app-learn></app-learn>
            </div>
            <div class="route" route="login">
              <app-login></app-login>
            </div>
            <div class="route" route="logout">
              <app-logout></app-logout>
            </div>
            <div class="route" route="movies">
              <app-movies></app-movies>
            </div>
            <div class="route" route="my-portfolio">
              <app-my-portfolio></app-my-portfolio>
            </div>
            <div class="route" route="no-partner">
              <app-no-partner></app-no-partner>
            </div>
            <div class="route" route="partner-option">
              <app-partner-option></app-partner-option>
            </div>
            <div class="route" route="patents">
              <app-patents></app-patents>
            </div>
            <div class="route" route="portfolio">
              <app-portfolio></app-portfolio>
            </div>
            <div class="route" route="profiles">
              <app-profiles></app-profiles>
            </div>
            <div class="route" route="register">
              <app-register></app-register>
            </div>
            <div class="route" route="report-user">
              <app-report-user></app-report-user>
            </div>
            <div class="route" route="settings">
              <app-settings></app-settings>
            </div>
            <div class="route" route="showcase">
              <app-showcase></app-showcase>
            </div>
            <div class="route" route="stars">
              <app-stars></app-stars>
            </div>
            <div class="route" route="student-next">
              <app-student-next></app-student-next>
            </div>
            <div class="route" route="uat-dictionary">
              <app-uat-dictionary></app-uat-dictionary>
            </div>
            <div class="route" route="video-audio">
              <app-video-audio></app-video-audio>
            </div>
            <div class="route" route="view">
              <app-view></app-view>
            </div>
            <div class="route" route="welcome">
              <app-welcome></app-welcome>
            </div>
            <div class="route" route="what-is-a-patent">
              <app-what-is-a-patent></app-what-is-a-patent>
            </div>
            <div class="route" route="with-student">
              <app-with-student></app-with-student>
            </div>
            <div class="route" route="work">
              <app-work></app-work>
            </div>
            <div class="route" route="yes-partner">
              <app-yes-partner></app-yes-partner>
            </div>
            ${AVOCANO_PURCHASE_MODE === 'cart'
              ? html`<div class="route" route="checkout">
                  <app-checkout
                    .cart=${this.state.cart}
                    .updateParent=${this.childUpdateRequest}
                  ></app-checkout>
                </div>`
              : ''}
            <div class="route" route="not-found">
              <app-not-found></app-not-found>
            </div>
          </app-main>
          <app-footer></app-footer>`;
  }
}

customElements.define('innavator-shell', InnavatorShell);

/*
    <script>
      // Executes the following code when the window finishes loading
      window.onload = function() {
          // Selects the modal element by its ID
          var modal = document.getElementById("userAgreementModal");
  
          // Show the modal when the page loads
          modal.style.display = "block";
  
          // Function to close the modal if the user agrees
          document.getElementById("agreeButton").onclick = function() {
              modal.style.display = "none";
          };
  
          // Function to redirect if the user cancels
          document.getElementById("cancelButton").onclick = function() {
              alert("You must agree to the terms to proceed.");
              window.location.href = "index.html"; // Or whatever page you want to redirect to
          };
      };
    </script>
    <!-- User Agreement Modal -->
    <div id="userAgreementModal">
      <div class="modal-content"> <!-- Content area of the modal -->
          <h2><strong>Innavator App User Agreement</strong></h2> <!-- Title of the modal -->
          <p> <!-- Paragraph containing the introduction -->
              Welcome to the Innavator app, a project developed by Students at the University of Advancing Technology Production class designed to help students like you build projects, teamwork skills, and individual profiles to achieve success in your career.
          </p>
          <p> <!-- Paragraph explaining to read the terms -->
              Before you proceed, please take a moment to read and agree to the following terms.
          </p>
          <p><strong>User Consent</strong></p>
          <p>By clicking "<strong>I Agree</strong>" below, you agree to the following:</p>
          <p><strong>1. Content and Project Sharing:</strong> By submitting any content, including but not limited to projects, assignments, and portfolios, you consent to having this information displayed within the Innavator app. This content may be viewed by other students, faculty, and potential employers as part of the app’s networking and project collaboration features.</p>
          <p><strong>2. Social Media Information:</strong> If you choose to link your social media accounts or provide related information within the app, you consent to this information being accessible to other users of the platform. This may include but is not limited to LinkedIn, X (Formerly Twitter), and other professional or creative platforms you share.</p>
          <p><strong>3. Ownership and Attribution:</strong> You retain ownership of your work submitted through Innavator. We respect your intellectual property and will ensure proper attribution of your content. By participating, you grant the app and its developers permission to display and share your contributions for the purposes of collaboration and inspiration within the UAT community.</p>
          <p><strong>4. Consent to Participate:</strong> By using the Innavator app, you acknowledge that this platform is designed to facilitate learning, creativity, and professional development. You agree to engage respectfully and ethically with other students and their work.</p>
          <p><strong>5. Data Usage:</strong> Any information provided in the app will be used solely for the purposes of project collaboration, skill development, and career advancement within the UAT community. Your data will not be shared outside of this scope without your explicit consent.</p>
          <p><strong>6. Changes to Agreement:</strong> This agreement may be updated periodically to reflect changes in app functionality or user policies. You will be notified of any significant changes, and continued use of the app signifies your acceptance of those terms.</p>
          <p>Do you agree to these terms?</p>
          <p>If you do not agree, you will not be able to proceed with using the Innavator app.</p>
          <p>Thank you for helping us make UAT’s learning experience more interactive and inspiring!</p>
          <p>We’re excited to have you on board as part of the UAT community!</p>

          <button class="modal-button" id="agreeButton">I Agree</button> <!-- Button for agreeing to the terms -->
          <button class="modal-button cancel" id="cancelButton">Cancel</button> <!-- Button for canceling the agreement -->
      </div>
    </div>
*/
