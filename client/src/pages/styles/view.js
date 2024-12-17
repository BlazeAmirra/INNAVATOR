import { css } from 'lit';

const styles = css`
    /* Image Row Layout */
    .image-row {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 20px;
    }

    /* Image Container and Name Description Styling */
    .image-container {
        text-align: center;
    }

    /* Rounded Image Styling */
    .rounded-image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid #d6ade1;
        cursor: pointer;
    }

    /* Name Description Text Styling */
    .name-description {
        margin-top: 10px;
        font-size: 16px;
        color: #3b3039;
    }

    /* Back Button Styling */
    .back-button-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
`;

export default styles;
