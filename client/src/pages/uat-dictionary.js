import { LitElement, html } from 'lit';
import styles from './styles/uat-dictionary.js';
import '../components/back-button.js';
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
        <app-page-title>Dictionary Industry Terms</app-page-title>

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
            <p><strong>Agile:</strong> A development methodology involving the breakdown of the overall project into short cycles of a complete development pipeline.</p>
        </div>

        <div class="back-button-container">
            <app-back-button/>
        </div>
    `;
  }
}

customElements.define('app-uat-dictionary', UATDictionary);
