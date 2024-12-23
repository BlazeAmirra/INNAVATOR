import { css } from 'lit';

const styles = css`
    /* Input Box Section Styles */
    .input-box-section {
        display: flex; /* Flex layout */
        justify-content: center; /* Center the input box */
        margin-top: 20px; /* Space above the input box */
    }

    .input-box {
        width: 80%; /* Set input box width to 80% of the screen */
        max-width: 600px; /* Set maximum width */
        padding: 10px; /* Padding inside the box */
        border: 1px solid #c468c4; /* Border color matching design */
        border-radius: 8px; /* Rounded corners */
        font-size: 16px; /* Font size for readability */
    }

    /* Arrow Section Styles */
    .arrow-section {
        display: flex; /* Flex layout for arrows */
        justify-content: space-between; /* Space arrows evenly on each side */
        align-items: center; /* Align arrows vertically */
        margin-top: 30px; /* Space above arrow section */
        padding: 0 20px; /* Horizontal padding for alignment */
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
