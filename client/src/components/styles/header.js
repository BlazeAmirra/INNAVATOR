import { css } from 'lit';

const styles = css`
  :host {
    background-color: #d6ade1; /* Background color for the header */
    color: #fff; /* Set header text color to white */
    padding: 15px 0; /* Vertical padding */
    text-align: center; /* Center header content */
    width: 100%; /* Full width of the screen */
  }

  nav ul { /* Styles the unordered list inside the navigation */
    list-style: none; /* Removes bullet points from the list */
    padding: 0; /* Removes default padding from the list */
    display: flex; /* Enables flexbox layout for the list items */
    justify-content: center; /* Centers the navigation links horizontally */
    margin: 0;
  }

  nav ul li { /* Styles each list item in the navigation */
    display: inline; /* Displays the list items in a horizontal line */
    margin-right: 20px; /* Adds space to the right of each list item */
  }

  nav ul li:last-child { /* Targets the last list item in the navigation */
    margin-right: 0; /* Removes margin on the last item to prevent extra space */
  }

  nav ul li a { /* Styles the anchor tags inside the list items */
    color: #000000; /* Sets the text color of the links to black */
    text-decoration: none; /* Removes the underline from links */
    font-size: 18px; /* Sets the font size of the links */
  }

  nav ul li a:hover { /* Styles links on hover */
    text-decoration: underline; /* Underlines the text when hovered over */
  }
`;

export default styles;
