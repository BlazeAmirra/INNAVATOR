import { css } from 'lit';

const styles = css`
    /* Button Styling for Patent Links */
    .button-container {
        margin-bottom: 20px;
        text-align: center;
    }

    .patent-button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #d6ade1;
        color: #fff;
        text-decoration: none;
        font-size: 18px;
        border-radius: 5px;
        border: 1px solid #3b3039;
        width: 200px;
        text-align: center;
    }

    .patent-button:hover {
        background-color: #c296d9;
        color: #000;
    }

    /* Back Button Styling */
    .back-button-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
`;

export default styles;
