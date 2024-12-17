import { css } from 'lit';

const styles = css`
    :host {
        font-size: 18px;
        padding: 8px 16px;
        background-color: #d6ade1;
        color: #000000;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
        border: 1px solid #3b3039;
    }

    :host(:hover) {
        background-color: #b893c7;
    }
`;

export default styles;
