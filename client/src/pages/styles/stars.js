import { css } from 'lit';

const styles = css`
    /* Pink Stars Styling */
    .pink-stars {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 30px;
    }

    .star {
        font-size: 30px;
        color: #ffadc1; /* Pink color for small stars */
    }

    /* Large Purple Submit Star Styling */
    .submit-star {
        text-decoration: none; /* Remove underline from link */
    }

    .large-star {
        font-size: 30px;
        color: #fff;
        background-color: #b267d7; /* Purple color for the large star */
        padding: 20px;
        text-align: center;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }

    .large-star:hover {
        background-color: #a25fc4; /* Slightly darker shade on hover */
    }
`;

export default styles;
