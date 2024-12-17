import { css } from 'lit';

const styles = css`
    /* Welcome Title Styling */
    .welcome-title {
        text-align: center; /* Center text */
        font-size: 36px; /* Large font size */
        color: #000000; /* Set main text color */
        margin-top: 40px; /* Space above */
    }

    /* Button Container */
    .button-container {
        display: flex; /* Enable flex layout */
        flex-direction: column; /* Arrange buttons vertically */
        align-items: center; /* Center align buttons */
        margin-top: 30px; /* Space above buttons */
    }

    /* Option Button Styling */
    .option-button {
        display: inline-block; /* Set as inline block for padding */
        background-color: #ed7a92; /* Button background color */
        color: #3b3039; /* Text color */
        padding: 15px 30px; /* Padding around text */
        border-radius: 8px; /* Rounded corners */
        text-decoration: none; /* Remove underline */
        font-weight: bold; /* Bold text */
        margin: 10px 0; /* Space between buttons */
        font-size: 18px; /* Font size */
        width: 200px; /* Set button width for uniformity */
        text-align: center; /* Center align text */
        cursor: pointer; /* Set cursor to pointer */
    }

    .option-button:hover {
        background-color: #c468c4; /* Change color on hover */
    }
`;

export default styles;
