import { css } from 'lit';

const styles = css`
    /* Subtitle Styling */
    .subtitle {
        font-size: 22px;
        color: #3b3039;
        text-align: center;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    /* Image Row for Videos & Profiles */
    .image-row {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 20px;
    }

    /* Rounded Image Styling */
    .rounded-image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid #d6ade1;
        cursor: pointer;
        text-align: center;
        line-height: 100px;
    }

    /* Image Grid for Clubs & Classes */
    .image-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        justify-items: center;
        margin-bottom: 20px;
    }

    /* Centered Image for Interactive Projects */
    .center-image {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }

    /* Rounded Square Image */
    .rounded-square {
        width: 150px;
        height: 150px;
        border-radius: 10px;
        border: 1px solid #d6ade1;
        cursor: pointer;
    }

    /* Back Button Styling */
    .back-button-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
`;

export default styles;
