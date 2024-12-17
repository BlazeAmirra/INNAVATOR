import { css } from 'lit';

const styles = css`
    /* Commission Page Title Styling */
    .commission-title {
        text-align: center;
        font-size: 36px;
        color: #000000;
        margin-top: 40px;
    }

    /* Button Container */
    .button-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
    }

    /* Option Button Styling */
    .option-button {
        display: inline-block;
        background-color: #ed7a92;
        color: #3b3039;
        padding: 15px 30px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        margin: 10px 0;
        font-size: 18px;
        width: 200px;
        text-align: center;
        cursor: pointer;
    }

    .option-button:hover {
        background-color: #c468c4;
    }

    /* Go Back Button Styling */
    .go-back-button {
        display: inline-block;
        background-color: #d6ade1; /* Same color as the header and footer */
        color: #fff; /* White text color */
        padding: 15px 30px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        margin: 20px 0;
        font-size: 18px;
        width: 200px;
        text-align: center;
        cursor: pointer;
    }

    .go-back-button:hover {
        background-color: #c468c4; /* Change color on hover */
    }
`;

export default styles;
