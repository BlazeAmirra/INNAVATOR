import { css } from 'lit';

const styles = css`
  :host {
    background-color: #d6ade1; /* Footer background color */
    color: #000000; /* Footer text color */
    text-align: center; /* Center text */
    padding: 20px 0; /* Vertical padding */
    margin: 0; /* Remove margin */
    margin-top: auto; /* Push footer to the bottom */
    width: 100%; /* Full width of the page */
  }

  p {
    /* padding: 5px 0; Space above and below text */
    padding: 0; /* No extra padding */
    margin: 0; /* Remove default margin */
  }

  .footer-content {
    display: flex; /* Flexbox layout */
    flex-direction: column; /* Stack items vertically */
    align-items: center; /* Center-align content */
  }

  .social-icons {
    margin-top: 10px; /* Space above icons */
  }

  .social-icons a { /* Styles the anchor tags inside the social icons section */
    margin: 0 10px; /* Space between social icons */
    color: #000000; /* Set icon color */
    text-decoration: none; /* Remove underline */
    font-size: 18px; /* Font size for social links */
  }

  .social-icons a:hover { /* Styles social icon links on hover */
    text-decoration: underline;
  }
`;

export default styles;
