import { css } from 'lit';

const styles = css`
    /* Description Text */
    .description {
        font-size: 18px; /* Font size for description */
        text-align: center; /* Center-align text */
        margin: 10px 0; /* Space above and below description */
        color: #01010190; /* Slightly muted color */
    }

    /* Issue Table Styles */
    .issue-table {
        width: 100%; /* Take 80% of the page width */
        margin: 20px 0; /* Space above and below the table */
        border-collapse: collapse; /* Remove spacing between table cells */
    }

    .issue-table th,
    .issue-table td {
        border: 1px solid #d6ade1; /* Border around cells */
        padding: 10px; /* Padding inside cells */
        text-align: left; /* Left-align cell content */
    }

    .issue-table th {
        background-color: #d6ade1; /* Header row background color */
        color: #000000; /* Header row text color */
    }

    .issue-table td {
        background-color: #f9f9f9; /* Alternate row color */
        color: #000000; /* Cell text color */
    }

    /* Form Styles */
    .issue-form {
        width: 100%; /* Take 80% of the page width */
        margin: 20px 0; /* Space above and below the form */
        display: flex; /* Flexbox layout */
        flex-direction: column; /* Arrange elements vertically */
        align-items: center; /* Center-align form elements */
    }

    .issue-form label {
        font-size: 18px; /* Font size for labels */
        color: #000000; /* Label text color */
        margin-bottom: 10px; /* Space below the label */
    }

    .issue-form textarea {
        width: 100%; /* Full width of the form container */
        height: 100px; /* Fixed height for the text area */
        padding: 10px; /* Padding inside the text area */
        border: 1px solid #3b3039; /* Border around text area */
        border-radius: 5px; /* Rounded corners */
        font-size: 16px; /* Font size for text area content */
        margin-bottom: 20px; /* Space below the text area */
    }

    .submit-button {
        background-color: #d6ade1; /* Button background color */
        color: #fff; /* Button text color */
        font-size: 18px; /* Font size for button text */
        border: none; /* Remove border */
        border-radius: 5px; /* Rounded corners */
        padding: 10px 20px; /* Padding inside the button */
        cursor: pointer; /* Pointer cursor on hover */
        transition: background-color 0.3s, transform 0.2s; /* Smooth hover effects */
    }

    .submit-button:hover {
        background-color: #c396d8; /* Darker background on hover */
        transform: scale(1.05); /* Slightly enlarge on hover */
    }
`;

export default styles;
