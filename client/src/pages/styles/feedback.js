import { css } from 'lit';

const styles = css`
    /* Feedback Input Box */
    .input-label {
        display: block;
        font-size: 18px;
        margin-top: 20px;
        color: #000000;
        text-align: center;
    }

    .feedback-box {
        width: 80%;
        height: 100px;
        margin: 10px auto;
        display: block;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #3b3039;
        font-size: 16px;
        resize: none;
    }

    /* Rating Section */
    .rating-title {
        font-size: 22px;
        margin-top: 20px;
        text-align: center;
        color: #000000;
    }

    /* Stars Container */
    .stars-container {
        display: flex;
        justify-content: center;
        margin: 10px 0;
    }

    .star {
        font-size: 32px;
        color: #ffcc00;
        margin: 0 5px;
        text-decoration: none;
        transition: transform 0.2s;
    }

    .star:hover {
        transform: scale(1.2); /* Enlarge star on hover */
    }

    /* Big Star Section */
    .big-star-container {
        text-align: center;
        margin-top: 20px;
    }

    .big-star {
        font-size: 60px;
        color: #d6ade1;
        text-decoration: none;
        transition: transform 0.2s, color 0.2s;
    }

    .big-star:hover {
        transform: scale(1.2); /* Enlarge big star on hover */
        color: #b893c7; /* Slightly change color on hover */
    }
`;

export default styles;
