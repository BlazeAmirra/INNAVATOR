import { LitElement, html } from 'lit';
import { map } from 'lit/directives/map.js';
import styles from './styles/inspiration.js';
import '../components/back-button.js';
import '../components/page-title.js';
import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

const apps = new URL('../../assets/apps.png', import.meta.url).href;
const autodoc = new URL('../../assets/autodoc.png', import.meta.url).href;
const games = new URL('../../assets/games.png', import.meta.url).href;
const joblinks = new URL('../../assets/joblinks.png', import.meta.url).href;
const live1 = new URL('../../assets/live1.png', import.meta.url).href;
const rec = new URL('../../assets/rec.png', import.meta.url).href;
const robotics1 = new URL('../../assets/robotics1.png', import.meta.url).href;

export class Inspiration extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      fetchedSubjects: {type: Boolean},
      subjects: {type: Array}
    };
  }

  constructor() {
    super();
    this.title = "Inspiration";
    this.fetchedSubjects = false;
    this.subjects = [];
  }

  async updated() {
    if (!this.fetchedSubjects) {
      this.subjects = await innavator_utils.get_whole_list(innavator_api.listSubjects);
      this.fetchedSubjects = true;
      this.requestUpdate();
    }
  }

  render() {
    return html`
        <app-page-title>Inspiration</app-page-title>

        <h2 class="subtitle">Videos</h2>

        <div class="image-row">
            <app-link href="/video1"><img src=${live1} alt="Video 1" class="rounded-image"></app-link>
            <app-link href="/video2"><img src=${rec} alt="Video 2" class="rounded-image"></app-link>
            <app-link href="/video3"><img src=${autodoc} alt="Video 3" class="rounded-image"></app-link>
        </div>

        <div class="centered-image-container">
            <app-link href="/main-video"><img src=${joblinks} alt="Main Video" class="centered-rectangular-image"></app-link>
        </div>

        <h2 class="subtitle">Interactive Projects</h2>

        <div class="image-row">
            <!--
            <app-link href="/games"><img src=${games} alt="Project 1" class="rounded-image"></app-link>
            <app-link href="/project2"><img src=${apps} alt="Project 2" class="rounded-image"></app-link>
            <app-link href="/project3"><img src=${robotics1} alt="Project 3" class="rounded-image"></app-link>
            -->
            ${this.subjects.length > 0 ?
              map(this.subjects, value => html`<app-link href="/interactive-projects/${value.snowflake_id}"><div class="rounded-image">${value.name}</div></app-link>`) : 
              html`No subjects.`}
        </div>

        <div class="back-button-container">
            <app-back-button/>
        </div>
    `;
  }
}

customElements.define('app-inspiration', Inspiration);
