import { css } from 'lit';

const styles = css`
    /* Centered Image Container */
    .image-container {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }

    .movie-image {
        width: 200px;
        height: auto;
        cursor: pointer;
        border: 1px solid #d6ade1;
        border-radius: 10px;
    }

    /* Go Back Button Styling */
    .go-back {
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }

    .go-back a {
        color: #000000;
        text-decoration: none;
        font-size: 18px;
    }

    .go-back a:hover {
        text-decoration: underline;
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
