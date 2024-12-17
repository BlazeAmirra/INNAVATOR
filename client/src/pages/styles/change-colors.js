import { css } from 'lit';

const styles = css`
    /* Color Wheel Container */
    .color-wheel-container {
        margin-top: 20px;
        text-align: center;
    }

    .color-wheel {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        border: 3px solid #000000;
    }

    /* Scale Container */
    .scale-container {
        width: 80%;
        margin: 20px 0;
        display: flex;
        justify-content: center;
    }

    /* Scale Input */
    .color-scale {
        -webkit-appearance: none; /* Remove default styling */
        appearance: none;
        width: 100%;
        height: 8px;
        background: linear-gradient(to right, #000000, #555555, #888888, #aaaaaa, #cccccc, #eeeeee, #ffffff);
        border-radius: 5px;
        outline: none;
        cursor: pointer;
    }

    /* Scale Labels */
    .scale-labels {
        width: 80%;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        color: #01010190;
        margin-top: 10px;
    }

    .dark-label, .light-label {
        font-weight: bold;
    }
`;

export default styles;
