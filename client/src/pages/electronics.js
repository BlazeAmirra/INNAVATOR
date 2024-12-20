import { LitElement, html } from 'lit';
import styles from './styles/electronics.js';
import '../components/page-title.js';

const electronics = new URL('../../assets/electronics.jpg', import.meta.url).href;
const electronics1 = new URL('../../assets/electronics1.jpg', import.meta.url).href;

export class Electronics extends LitElement {
  constructor() {
    super();
    this.title = 'Electronics';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
        <app-page-title>Electronics</app-page-title>

        <div class="content-section">
            <img src=${electronics} alt="Electronics Image 1" class="content-image"/>
            <div class="description-box">
                <p>This is Project Motor display by NeAndrea Harris. It shows the word motor on the top of the M5 stick
                    when the button is pressed. When the side button is pressed, it says congratulations, here is a cookie.
                </p>
            </div>
        </div>

        <div class="content-section">
            <img src=${electronics1} alt="Electronics Image 2" class="content-image"/>
            <div class="description-box">
                <p>This is project Sumo Rojo by NeAndrea Harris. Her first ever Robot from first robotics. This is one of
                    the inspirations that got her into robotics and her first attempt of coding.
                </p>
            </div>
        </div>

        <app-link href="/create-something" class="chat-box-link">
            <div class="chat-box">
                <p>Click here to make something with you.</p>
            </div>
        </app-link>
    `;
  }
}

customElements.define('app-electronics', Electronics);
