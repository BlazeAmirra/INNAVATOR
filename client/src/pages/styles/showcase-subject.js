import { css } from 'lit';

const styles = css`
    /* Portfolio Image Styling */
    .portfolio-image-container {
        text-align: center;
        margin: 20px 0;
    }

    .portfolio-image {
        width: 150px;
        height: auto;
        border-radius: 10px;
        border: 1px solid #d6ade1;
        cursor: pointer;
    }

    /* Introduction Box Styling */
    .intro-box {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #f5f5f5;
        border-radius: 10px;
        border: 1px solid #d6ade1;
        text-align: center;
        color: #3b3039;
        font-size: 18px;
    }

    /* Side-by-Side Image Pair Styling */
    .image-pair {
        display: flex;
        width: 100%;
        overflow: auto;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
    }

    .image-pair .portfolio-image {
        width: 150px;
        height: auto;
        border-radius: 8px;
        border: 1px solid #d6ade1;
    }

    /* Back Button Styling */
    .back-button-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .back-button {
        font-size: 18px;
        padding: 8px 16px;
        background-color: #d6ade1;
        color: #000000;
        border: 1px solid #3b3039;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
    }

    .back-button:hover {
        background-color: #b893c7;
    }
`;

export default styles;
