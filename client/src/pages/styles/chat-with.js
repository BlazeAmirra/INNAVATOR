import { css } from 'lit';

const styles = css`
    /* Logo Section Styling */
    .logo-section {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .logo-image {
        width: 100px;
        height: auto;
    }

    /* Chat Box Section Styles */
    .chat-box {
        display: flex;
        align-items: center;
        background-color: #f9f9f9;
        border: 1px solid #d6ade1;
        border-radius: 8px;
        padding: 15px;
        max-width: 600px;
        margin: 20px auto;
    }

    .profile-picture {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 15px;
    }

    .chat-message {
        color: #3b3039;
        font-size: 16px;
    }

    /* Centered Image Section Styles */
    .centered-image-section {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .centered-image {
        width: 300px;
        height: 200px;
        border-radius: 8px;
        border: 1px solid #d6ade1;
    }

    /* User Input Box Section */
    .input-box-section {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .user-input-box {
        width: 80%;
        max-width: 600px;
        padding: 10px;
        border: 1px solid #c468c4;
        border-radius: 8px;
        font-size: 16px;
    }
`;

export default styles;
