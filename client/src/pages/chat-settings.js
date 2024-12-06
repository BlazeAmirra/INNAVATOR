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
import styles from './styles/chat-settings.js';
import '../components/page-title.js';

export class ChatSettings extends LitElement {
  constructor() {
    super();
    this.title = 'Chat Settings';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>Chat Settings</app-page-title> <!-- Title of the page -->

        <div class="buttons-container">
            <app-link href="/change-colors" class="settings-button">★ Chat Color</app-link>

            <app-link href="/change-colors" class="settings-button">★ Whiteboard Color</app-link>

            <app-link href="/account-information" class="settings-button">★ Name Change</app-link>

            <app-link href="/report-user" class="settings-button">★ Report User</app-link>

            <app-link href="/block-user" class="settings-button">★ Block User</app-link>

            <app-link href="/issue-tracker" class="settings-button">★ Issue Tracker</app-link>

            <app-link href="/video-audio" class="settings-button">★ Video and Audio</app-link>
        </div>
    `;
  }
}

customElements.define('app-chat-settings', ChatSettings);
