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
import styles from './styles/founders.js';
import '../components/back-button.js';
import '../components/page-title.js';

const art5 = new URL('../../assets/art5.jpg', import.meta.url).href;
const art7 = new URL('../../assets/art7.jpg', import.meta.url).href;
const art8 = new URL('../../assets/art8.jpg', import.meta.url).href;
const art12 = new URL('../../assets/art12.jpg', import.meta.url).href;
const art14 = new URL('../../assets/art14.jpg', import.meta.url).href;
const art15 = new URL('../../assets/art15.jpg', import.meta.url).href;
const art16 = new URL('../../assets/art16.jpg', import.meta.url).href;
const art17 = new URL('../../assets/art17.jpg', import.meta.url).href;

export class Founders extends LitElement {
  constructor() {
    super();
    this.title = "Founders' Page";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>Founder's Page</app-page-title>
        <h2 class="founders-subtitle">Say Hello to our Past Students!</h2>

        <div class="images-container">
            <div class="image-row">
                <div class="image-item">
                    <app-link href="/chat-with-blaze">
                        <img src=${art5} alt="Student 1" class="rounded-image">
                        <p>Blaze</p>
                    </app-link>
                </div>
                <div class="image-item">
                    <app-link href="/chat-with-nick">
                        <img src=${art8} alt="Student 2" class="rounded-image">
                        <p>Nick</p>
                    </app-link>
                </div>
                <div class="image-item">
                    <app-link href="/chat-with-preston">
                        <img src=${art7} alt="Student 3" class="rounded-image">
                        <p>Preston</p>
                    </app-link>
                </div>
            </div>

            <div class="image-row">
                <div class="image-item">
                    <app-link href="/chat-with">
                        <img src=${art12} alt="Student 4" class="rounded-image">
                        <p>Alexis</p>
                    </app-link>
                </div>
                <div class="image-item">
                    <app-link href="/chat-with-christelle">
                        <img src=${art14} alt="Student 5" class="rounded-image">
                        <p>Christelle</p>
                    </app-link>
                </div>
                <div class="image-item">
                    <app-link href="/chat-with-marcus">
                        <img src=${art16} alt="Student 6" class="rounded-image">
                        <p>Marcus</p>
                    </app-link>
                </div>
            </div>

            <div class="image-row">
                <div class="image-item">
                    <app-link href="/joshua">
                        <img src=${art15} alt="Student 7" class="rounded-image">
                        <p>Joshua</p>
                    </app-link>
                </div>
                <div class="image-item add-more">
                    <app-link href="/profiles">
                        <img src=${art17} alt="Add More" class="rounded-image">
                        <p>Add More</p>
                    </app-link>
                </div>
            </div>
        </div>

        <!-- Create Group Chat Button -->
        <div class="chat-button-container">
            <app-link href="/group-chat" class="create-chat-button">Create a Group Chat</app-link>
        </div>

        <!-- Go Back Button -->
        <div class="button-container">
            <app-back-button/>
        </div>
    `;
  }
}

customElements.define('app-founders', Founders);
