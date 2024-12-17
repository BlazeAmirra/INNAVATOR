import { css } from 'lit';

const styles = css`
    /* Subtitle Styling */
    .subtitle {
        text-align: center;
        font-size: 22px;
        color: #3b3039;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    /* Row Layout for Rounded Images */
    .image-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: center;
        gap: 20px;
        margin: 20px 0;
    }

    /* Rounded Image Styling */
    .rounded-image {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 1px solid #d6ade1;
        cursor: pointer;
        text-align: center;
        line-height: 80px;
    }

    /* Centered Rectangular Image Styling */
    .centered-image-container {
        text-align: center;
        margin: 20px 0;
    }

    .centered-rectangular-image {
        width: 200px;
        height: 120px;
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
