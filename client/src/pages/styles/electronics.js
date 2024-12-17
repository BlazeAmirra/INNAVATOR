import { css } from 'lit';

const styles = css`
    /* Electronics Page Title Styling */
    .electronics-title {
        text-align: center; /* Center text */
        font-size: 36px; /* Large font size */
        color: #000000; /* Set main text color */
        margin-top: 40px; /* Space above */
    }

    /* Content Section Styling */
    .content-section {
        display: flex; /* Enable flex layout */
        align-items: center; /* Center items vertically */
        justify-content: center; /* Center items horizontally */
        margin: 20px 0; /* Vertical spacing between sections */
    }

    .content-image {
        max-width: 150px; /* Set a reasonable max width for images */
        height: auto; /* Maintain aspect ratio */
        margin-right: 20px; /* Space between image and description */
        border-radius: 8px; /* Slightly rounded corners */
    }

    .description-box {
        background-color: #f9f9f9; /* Light background for contrast */
        padding: 15px; /* Padding inside the box */
        border: 1px solid #d6ade1; /* Light border color */
        border-radius: 8px; /* Rounded corners for box */
        max-width: 500px; /* Set max width for readability */
        color: #000000; /* Set text color */
    }

    /* Chat Box Link Styling */
    .chat-box-link {
        text-decoration: none; /* Remove underline from link */
    }

    .chat-box {
        background-color: #ededed; /* Light gray background */
        border: 1px solid #c468c4; /* Border color */
        border-radius: 8px; /* Rounded corners for chat box */
        padding: 15px; /* Padding inside the box */
        margin: 20px auto; /* Center box with margin */
        max-width: 600px; /* Limit width of chat box */
        text-align: center; /* Center text */
        font-style: italic; /* Italicize text for placeholder style */
        color: #3b3039; /* Dark text color */
        cursor: pointer; /* Pointer cursor for interactive feel */
        transition: background-color 0.3s; /* Smooth background color transition on hover */
    }

    .chat-box:hover {
        background-color: #f0d5f0; /* Change background on hover for interactivity */
    }

`;

export default styles;
