import { css } from 'lit';

const styles = css`
    /* Form Container Styling */
    .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 500px;
        width: 100%;
        padding: 20px;
        background-color: #f9f9f9;
        border: 1px solid #d6ade1;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        text-align: center; /* Center content inside the container */
    }

    /* Input Field Styling */
    label {
        font-size: 16px;
        color: #3b3039;
        margin: 10px 0 5px;
        width: 100%;
        text-align: left;
    }

    input[type="text"],
    textarea {
        width: 100%;
        max-width: 400px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #d6ade1;
        border-radius: 5px;
        margin-bottom: 15px;
        text-align: center;
    }

    textarea {
        height: 100px;
        resize: none;
    }

    /* Navigation Buttons Styling */
    .navigation-buttons {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 300px;
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
