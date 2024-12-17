import { css } from 'lit';

const styles = css`
  /* Centered Input Container Styling */
    .input-container {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }

    textarea {
        width: 300px;
        height: 100px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #d6ade1;
        border-radius: 8px;
        resize: none;
    }

    /* Centered Navigation Buttons Styling */
    .navigation-buttons {
        display: flex;
        justify-content: center; /* Centers buttons within the container */
        gap: 20px; /* Space between the back and next buttons */
        margin-top: 20px;
    }

    .next-button {
        font-size: 18px;
        padding: 8px 16px;
        background-color: #d6ade1;
        color: #000000;
        border: 1px solid #3b3039;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
    }

    .next-button:hover {
        background-color: #b893c7;
    }
`;

export default styles;
