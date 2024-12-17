import { css } from 'lit';

const styles = css`
    /* Profile List Section Styling */
    .profile-list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 20px 0;
    }

    .profile-item {
        display: flex;
        align-items: center;
        background-color: #f9f9f9;
        border: 1px solid #d6ade1;
        border-radius: 8px;
        padding: 10px;
        margin: 10px 0;
        max-width: 300px;
        width: 100%;
        text-decoration: none; /* Remove underline from link */
    }

    .profile-item app-link {
        display: flex;
        align-items: center;
        color: #3b3039; /* Set link color */
        text-decoration: none; /* Remove underline from link */
        width: 100%;
    }

    .profile-image {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 15px;
    }

    .profile-name {
        font-size: 18px;
        color: #3b3039;
    }

    /* Go Back Button Styling */
    .go-back-container {
        text-align: center;
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
`;

export default styles;
