import { css } from 'lit';

const styles = css`
    /* Confirmation Text */
    .confirmation-text {
        font-size: 18px; /* Font size for confirmation text */
        color: #000000; /* Text color */
        text-align: center; /* Center-align text */
        margin: 20px 0; /* Add space above and below the text */
    }

    /* Button Container */
    .button-container {
        display: flex; /* Display buttons in a row */
        justify-content: center; /* Center-align buttons horizontally */
        gap: 20px; /* Add space between buttons */
        margin-top: 20px; /* Add space above the buttons */
    }

    /* Block Button */
    .block-button {
        background-color: #d9534f; /* Red background for block button */
        color: #fff; /* White text color */
        font-size: 18px; /* Font size for button text */
        font-weight: bold; /* Bold button text */
        border: none; /* Remove border */
        border-radius: 5px; /* Rounded corners */
        padding: 10px 20px; /* Padding inside the button */
        cursor: pointer; /* Pointer cursor on hover */
        transition: background-color 0.3s, transform 0.2s; /* Smooth hover effects */
    }

    /* Block Button Hover Effect */
    .block-button:hover {
        background-color: #c9302c; /* Darker red on hover */
        transform: scale(1.05); /* Slightly enlarge on hover */
    }

    /* Cancel Button */
    .cancel-button {
        background-color: #5bc0de; /* Blue background for cancel button */
        color: #fff; /* White text color */
        font-size: 18px; /* Font size for button text */
        font-weight: bold; /* Bold button text */
        border: none; /* Remove border */
        border-radius: 5px; /* Rounded corners */
        padding: 10px 20px; /* Padding inside the button */
        cursor: pointer; /* Pointer cursor on hover */
        transition: background-color 0.3s, transform 0.2s; /* Smooth hover effects */
    }

    /* Cancel Button Hover Effect */
    .cancel-button:hover {
        background-color: #31b0d5; /* Darker blue on hover */
        transform: scale(1.05); /* Slightly enlarge on hover */
    }
`;

export default styles;
