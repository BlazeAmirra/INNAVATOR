import { css } from 'lit';

const styles = css`
    /* Settings Page Title Styling */
    .settings-title {
        text-align: center; /* Center text */
        font-size: 36px; /* Large font size */
        color: #000000; /* Set main text color */
        margin-top: 40px; /* Space above */
    }

    /* Buttons Container Styling */
    .buttons-container {
        display: flex; /* Enable flex layout */
        flex-direction: column; /* Stack buttons vertically */
        align-items: center; /* Center align buttons */
        margin-top: 30px; /* Space above buttons */
    }

    /* Settings Button Styling */
    .settings-button {
        display: inline-block; /* Set as inline block for padding */
        background-color: #ed7a92; /* Button background color */
        color: #3b3039; /* Text color */
        padding: 15px 30px; /* Padding around text */
        border-radius: 8px; /* Rounded corners */
        text-decoration: none; /* Remove underline */
        font-weight: bold; /* Bold text */
        font-size: 18px; /* Font size */
        margin: 10px 0; /* Space between buttons */
        width: 200px; /* Set a fixed width for buttons */
        text-align: left; /* Align text to the left */
    }

    .settings-button:hover {
        background-color: #c468c4; /* Change color on hover */
    }
`;

export default styles;
