import { LitElement, html } from 'lit';
import styles from './styles/change-colors.js';
import '../components/back-button.js';
import '../components/page-title.js';

const colortime = new URL('../../assets/colortime.jpg', import.meta.url).href;

const { min, max, round } = Math;

// TODO: COME BACK

export class ChangeColors extends LitElement {
  constructor() {
    super();
    this.title = 'Change Colors';
  }

  static get styles() {
    return styles;
  }

  // https://stackoverflow.com/a/9493060
  /**
   * Converts an HSL color value to RGB. Conversion formula
   * adapted from https://en.wikipedia.org/wiki/HSL_color_space.
   * Assumes h, s, and l are contained in the set [0, 1] and
   * returns r, g, and b in the set [0, 255].
   *
   * @param   {number}  h       The hue
   * @param   {number}  s       The saturation
   * @param   {number}  l       The lightness
   * @return  {Array}           The RGB representation
   */
  hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1/3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1/3);
    }

    return [round(r * 255), round(g * 255), round(b * 255)];
  }
  hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }
  /**
   * Converts an RGB color value to HSL. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
   * Assumes r, g, and b are contained in the set [0, 255] and
   * returns h, s, and l in the set [0, 1].
   *
   * @param   {number}  r       The red color value
   * @param   {number}  g       The green color value
   * @param   {number}  b       The blue color value
   * @return  {Array}           The HSL representation
   */
  rgbToHsl(r, g, b) {
    (r /= 255), (g /= 255), (b /= 255);
    const vmax = max(r, g, b), vmin = min(r, g, b);
    let h, s, l = (vmax + vmin) / 2;

    if (vmax === vmin) {
      return [0, 0, l]; // achromatic
    }

    const d = vmax - vmin;
    s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);
    if (vmax === r) h = (g - b) / d + (g < b ? 6 : 0);
    if (vmax === g) h = (b - r) / d + 2;
    if (vmax === b) h = (r - g) / d + 4;
    h /= 6;

    return [h, s, l];
  }

  render() {
    return html`
        <app-page-title>Color Time</app-page-title>

        <div>Not implemented: good color picker needed.</div>

        ${""/*
        <div class="color-wheel-container">
            <img src=${colortime} alt="Color Wheel" class="color-wheel"/>
        </div>

        <div class="scale-container">
            <input type="range" min="0" max="6" value="3" class="color-scale"/>
        </div>

        <div class="scale-labels">
            <span class="dark-label">Dark</span>
            <span class="light-label">Light</span>
        </div>
        */}

        <br/>
        <app-back-button/>
    `;
  }
}

customElements.define('app-change-colors', ChangeColors);
