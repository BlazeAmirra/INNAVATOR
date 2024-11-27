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
import styles from './styles/uat-dictionary.js';
import '../components/page-title.js';

export class UATDictionary extends LitElement {
  constructor() {
    super();
    this.title = "UAT Dictionary";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Dictionary Industry Terms</app-page-title>

        <!-- Dictionary Terms Section -->
        <div class="dictionary-container">
            <p><strong>UX:</strong> The user's experience on a device or platform.</p>
            <p><strong>UI:</strong> The feel and interaction.</p>
            <p><strong>PWM:</strong> Pulse Width Modulation.</p>
            <p><strong>HTML:</strong> Basic programming language.</p>
            <p><strong>Networking:</strong> Making work connections.</p>
            <p><strong>Wire-frame:</strong> How a program is connected and navigated.</p>
            <p><strong>Framework:</strong> How the details are presented.</p>
            <p><strong>Voltage Drop:</strong> The total of resistances added to find the voltage.</p>
            <p><strong>Resistance:</strong> The force that lessens the effect of electricity.</p>
            <p><strong>Files:</strong> A place to store your documents, images, and code.</p>
            <p><strong>Embedded Systems:</strong> An organized function within a computer or device to perform a specific task.</p>
            <p><strong>AI:</strong> Self-learning artificial intelligence.</p>
            <p><strong>Prototype:</strong> A test to demonstrate a product and how it will function.</p>
            <p><strong>XML:</strong> Stores OOP files.</p>
            <p><strong>JSON:</strong> Stores OOP files.</p>
            <p><strong>CSS:</strong> Styling language used in many programming languages to make the UI and UX look neat and organized.</p>
            <p><strong>PCB:</strong> Printed Circuit Board, or PCB, are boards you can build and modify circuits on. Items like Raspberry Pis are considered PCBs.</p>
        </div>

        <!-- Go Back Button -->
        <div class="back-button-container">
            <app-link href="/chat-with-nick" class="back-button">Go Back</app-link>
        </div>
    `;
  }
}

customElements.define('app-uat-dictionary', UATDictionary);
