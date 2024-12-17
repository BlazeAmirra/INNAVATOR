import { css } from 'lit';

const styles = css`
    /* Centered Image Container */
    .image-container {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }

    .game-image {
        width: 300px;
        height: auto;
        cursor: pointer;
        border: 1px solid #d6ade1;
        border-radius: 10px;
    }

    /* Add Game Button Container */
    .add-game-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .add-game-button {
        font-size: 18px;
        color: #ffffff;
        background-color: #d6ade1;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 8px;
        border: none;
        cursor: pointer;
    }

    .add-game-button:hover {
        background-color: #c09cc5;
    }

    /* Go Back Button Styling */
    .go-back {
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }

    .go-back app-link {
        color: #000000;
        text-decoration: none;
        font-size: 18px;
    }

    .go-back app-link:hover {
        text-decoration: underline;
    }
`;

export default styles;
