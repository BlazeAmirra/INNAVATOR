import { LitElement, html } from 'lit';
import styles from './styles/video-audio.js';
import '../components/page-title.js';

export class VideoAudio extends LitElement {
  constructor() {
    super();
    this.title = "Video and Audio Settings";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Video and Audio Settings</app-page-title>

        <!-- Description -->
        <p class="description">Configure your video and audio preferences for the chat experience.</p>

        <!-- Video and Audio Toggles -->
        <div class="settings-section">
            <label for="video-toggle" class="toggle-label">Enable Video</label>
            <input type="checkbox" id="video-toggle" class="toggle-input">

            <label for="audio-toggle" class="toggle-label">Enable Audio</label>
            <input type="checkbox" id="audio-toggle" class="toggle-input">
        </div>

        <!-- Audio Input/Output Device Selector -->
        <div class="settings-section">
            <label for="audio-input" class="dropdown-label">Select Audio Input Device:</label>
            <select id="audio-input" class="dropdown">
                <option value="microphone1">Microphone 1</option>
                <option value="microphone2">Microphone 2</option>
                <option value="microphone3">Microphone 3</option>
            </select>

            <label for="audio-output" class="dropdown-label">Select Audio Output Device:</label>
            <select id="audio-output" class="dropdown">
                <option value="speaker1">Speaker 1</option>
                <option value="speaker2">Speaker 2</option>
                <option value="speaker3">Speaker 3</option>
            </select>
        </div>

        <!-- Video Preview Section -->
        <div class="settings-section">
            <label for="video-preview" class="preview-label">Video Preview:</label>
            <div id="video-preview" class="video-preview-box">
                <!-- Placeholder for video preview -->
                <p>Video feed will appear here.</p>
            </div>
        </div>

        <!-- Save Button -->
        <div class="save-button-container">
            <button class="save-button">Save Settings</button>
        </div>
    `;
  }
}

customElements.define('app-video-audio', VideoAudio);
