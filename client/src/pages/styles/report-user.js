import { css } from 'lit';

const styles = css`
    /* Instructions Text */
    .instructions {
        font-size: 18px; /* Font size for instructions */
        color: #000000; /* Color for instructions text */
        text-align: center; /* Center-align the instructions */
        margin: 20px 0; /* Space above and below the instructions */
    }

    /* Text Input Box */
    .input-box {
        width: 90%; /* Take up 90% of the page width */
        max-width: 600px; /* Maximum width of the text box */
        height: 150px; /* Height of the text box */
        padding: 10px; /* Padding inside the text box */
        border-radius: 8px; /* Rounded corners */
        border: 1px solid #3b3039; /* Border color and style */
        font-size: 16px; /* Font size inside the text box */
        margin: 20px 0; /* Space above and below the text box */
        resize: none; /* Prevent resizing of the text box */
    }

    /* Submit Button */
    .submit-button {
        background-color: #d6ade1; /* Button background color */
        color: #000000; /* Button text color */
        font-size: 18px; /* Font size for button text */
        font-weight: bold; /* Make button text bold */
        border: none; /* Remove border from the button */
        border-radius: 5px; /* Rounded corners */
        padding: 10px 20px; /* Padding inside the button */
        cursor: pointer; /* Show pointer cursor on hover */
        transition: background-color 0.3s, transform 0.2s; /* Smooth transition on hover */
        display: block; /* Make the button a block-level element */
        margin: 20px auto; /* Center the button horizontally and add vertical spacing */
        text-align: center; /* Center-align the text inside the button */
    }

    /* Submit Button Hover Effect */
    .submit-button:hover {
        background-color: #b893c7; /* Change background color on hover */
        transform: scale(1.05); /* Slightly enlarge the button on hover */
    }
`;

export default styles;
