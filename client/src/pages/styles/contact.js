// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { css } from 'lit';

const styles = css`
  /* Contact Form */
  .contact-form { /* Styles the contact form section */
      max-width: 600px; /* Sets the maximum width of the contact form */
      margin: 20px auto; /* Centers the form horizontally and adds vertical margin */
      padding: 20px; /* Adds padding inside the contact form */
      background-color: #fff; /* Sets the background color to white */
      border-radius: 8px; /* Rounds the corners of the contact form */
      color: #000000; /* Sets the text color inside the form to black */
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Adds a subtle shadow effect to the form */
  }

  .contact-form h3 { /* Styles the heading of the contact form */
      margin-bottom: 20px; /* Adds space below the heading */
  }

  .contact-form form label { /* Styles the labels inside the contact form */
      display: block; /* Displays each label as a block element */
      margin: 10px 0 5px; /* Adds top margin and bottom margin to separate labels from inputs */
  }

  .contact-form form input, /* Styles all input fields inside the contact form */
  .contact-form form textarea { /* Styles the textarea fields inside the contact form */
      width: 100%; /* Sets the width to 100% of the parent container */
      padding: 10px; /* Adds padding inside the input fields */
      margin-bottom: 15px; /* Adds space below each input field */
      border: 1px solid #fff; /* Sets a white border around the input fields */
      border-radius: 5px; /* Rounds the corners of the input fields */
  }

  .contact-form button { /* Styles the submit button inside the contact form */
      width: 100%; /* Sets the width of the button to 100% of the parent container */
      padding: 10px; /* Adds padding inside the button */
      background-color: #d33782; /* Sets the background color of the button */
      color: #000000; /* Sets the text color of the button to black */
      border: none; /* Removes any default border around the button */
      border-radius: 5px; /* Rounds the corners of the button */
      cursor: pointer; /* Changes the cursor to a pointer when hovering over the button */
  }

  .contact-form button:hover { /* Styles the submit button on hover */
      background-color: #d33782; /* Sets the background color on hover (remains the same) */
  }

  /* Email Contact Section */
  .email-contact { /* Styles the email contact section */
      text-align: center; /* Centers the text inside the email contact section */
      /*background-color: #c67bd9; Sets the background color of the email contact section */
      padding: 10px 0; /* Adds vertical padding to the email contact section */
      margin: 0; /* Removes extra margin around the section */
  }

  .email-contact h3 { /* Styles the heading inside the email contact section */
      font-size: 24px; /* Sets the font size of the heading */
      color: #000000; /* Sets the text color to black */
  }

  .email-contact p { /* Styles the paragraph inside the email contact section */
      font-size: 16px; /* Sets the font size of the paragraph */
      color: #000000; /* Sets the text color to black */
  }

  .email-contact app-link { /* Styles the anchor tag in the email contact section */
      color: #0073e6; /* Sets the text color of the link to a shade of blue */
      text-decoration: none; /* Removes the underline from the link */
  }

  .email-contact app-link:hover { /* Styles the email link on hover */
      text-decoration: underline; /* Underlines the text when hovered over */
  }
`;

export default styles;
