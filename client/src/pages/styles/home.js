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
  .homeBase {
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .loading {
    padding: 20px;
  }
  
  /* Logo Container */
  .logo-container {
    display: flex; /* Flex layout for centering */
    justify-content: center; /* Center horizontally */
    padding-top: 40px; /* Space from the top */
  }

  /* UAT Logo Image Styling */
  .UAT-logo {
    max-width: 200px; /* Set max width for responsiveness */
    height: auto; /* Maintain aspect ratio */
    cursor: pointer; /* Set cursor to pointer for interactivity */
  }

  /* App Name Styling */
  .app-name {
    text-align: center; /* Center text */
    font-size: 36px; /* Set large font size */
    color: #000000; /* Set main text color */
    margin-top: 20px; /* Add space above */
  }

  /* Sign-in Button Container */
  .signin-container {
    display: flex; /* Flex layout for centering */
    justify-content: center; /* Center button horizontally */
    margin-top: 30px; /* Space above button */
  }

  .signin-button {
    font-size: 18px;
    padding: 8px 16px;
    background-color: #d6ade1;
    color: #000000;
    border: 1px solid #3b3039;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }

  .signin-button:hover {
    background-color: #b893c7;
  }

  /* Secondary Logo Container */
  .secondary-logo-container {
    display: flex; /* Flex layout for centering */
    justify-content: center; /* Center content horizontally */
    margin-top: 20px; /* Add space above */
    padding-bottom: 40px; /* Space below before footer */
  }

  /* Secondary Logo Image Styling */
  .secondary-logo {
    max-width: 250px; /* Increase max width to make it larger */
    height: auto; /* Maintain aspect ratio */
    cursor: pointer; /* Set cursor to pointer for interactivity */
  }

  /* Hover Effect for Secondary Logo */
  .hover-logo {
    transition: transform 0.3s ease, opacity 0.3s ease; /* Smooth hover transition */
  }

  .hover-logo:hover {
    content: var(--hover-img); /* Change to the hover image on hover */
    transform: scale(1.1); /* Slightly increase size on hover */
    opacity: 0.8; /* Slightly dim the image */
  }

  /* Styles specific to the modal */
  #userAgreementModal {
      display: none; /* Hidden by default */
      position: fixed; /* Stay in place */
      z-index: 1; /* Sit on top */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  }

  /* Modal content */
  .modal-content {
      background-color: white;
      margin: 15% auto; /* 15% from the top and centered */
      padding: 20px;
      border: 1px solid #888;
      width: 80%; /* Could be more or less, depending on screen size */
      max-width: 600px;
      text-align: center;
      border-radius: 10px;
      max-height: 400px; /* Limit the height of the modal */
      overflow-y: auto; /* Enable vertical scrolling */
  }

  /* Buttons */
  .modal-button {
      padding: 10px 20px; /* Adds padding around the button text */
      background-color: #ed7a92; /* Sets the background color of the button */
      color: #3b3039; /* Sets the text color of the button */
      border: none; /* Removes any default border */
      border-radius: 5px; /* Rounds the corners of the button */
      cursor: pointer; /* Changes the cursor to a pointer when hovering over the button */
      margin: 10px; /* Adds margin around the button */
      font-weight: bold; /* Makes the button text bold */
  }

  .modal-button:hover {
      background-color: #c468c4; /* Changes the background color when the button is hovered */
  }

  .modal-button.cancel {
      background-color: #fbc791; /* Sets a different background color for the cancel button */
      font-weight: bold; /* Ensures the cancel button text is bold as well */
  }

  .modal-button.cancel:hover {
      background-color: #8e2565; /* Changes the background color for the cancel button when hovered */
  }

`;

export default styles;
