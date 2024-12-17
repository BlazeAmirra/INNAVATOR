import { css } from 'lit';

const styles = css`
    /* Partner Section Styles */
    .partner-section {
        display: flex; /* Flex layout for horizontal alignment */
        justify-content: center; /* Center images horizontally */
        gap: 20px; /* Space between the images */
        margin-top: 20px; /* Space above partner section */
    }

    .partner-image {
        width: 100px; /* Set width for each partner image */
        height: 100px; /* Set height for each partner image */
        border-radius: 50%; /* Make images circular */
        border: 2px solid #c468c4; /* Border around images */
        transition: transform 0.3s; /* Smooth scaling effect */
        cursor: pointer; /* Pointer cursor to indicate clickable */
    }

    .partner-image:hover {
        transform: scale(1.1); /* Scale image slightly on hover */
    }

    /* Button Section Styles */
    .button-section {
        display: flex; /* Flex layout */
        justify-content: center; /* Center the button */
        margin-top: 30px; /* Space above button section */
    }
`;

export default styles;
