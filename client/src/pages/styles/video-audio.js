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
    /* Description */
    .description {
        font-size: 18px; /* Description font size */
        text-align: center; /* Center-align text */
        margin: 10px 0; /* Add space around */
        color: #01010190; /* Neutral gray color */
    }

    /* Settings Section */
    .settings-section {
        width: 80%; /* Take up 80% of page width */
        margin: 20px 0; /* Add spacing between sections */
        display: flex; /* Flexbox layout */
        flex-direction: column; /* Stack elements vertically */
        align-items: center; /* Center-align content */
    }

    .toggle-label {
        font-size: 18px; /* Font size for toggle label */
        margin-bottom: 10px; /* Add space below */
    }

    .toggle-input {
        margin-bottom: 20px; /* Add space below toggle switch */
        transform: scale(1.5); /* Make toggle larger */
    }

    /* Dropdowns */
    .dropdown-label {
        font-size: 18px; /* Font size for dropdown label */
        margin-bottom: 10px; /* Add space below */
    }

    .dropdown {
        width: 60%; /* Dropdown width */
        padding: 10px; /* Padding inside */
        font-size: 16px; /* Font size */
        border: 1px solid #d6ade1; /* Border color */
        border-radius: 5px; /* Rounded corners */
        margin-bottom: 20px; /* Space below dropdown */
    }

    /* Video Preview Box */
    .video-preview-box {
        width: 60%; /* Set width of the preview box */
        height: 200px; /* Fixed height */
        background-color: #f9f9f9; /* Light gray background */
        border: 2px dashed #d6ade1; /* Dashed border */
        display: flex; /* Flex layout */
        justify-content: center; /* Center-align content horizontally */
        align-items: center; /* Center-align content vertically */
        border-radius: 5px; /* Rounded corners */
    }

    /* Save Button */
    .save-button {
        background-color: #d6ade1; /* Button background color */
        color: #fff; /* Text color */
        font-size: 18px; /* Font size */
        padding: 10px 20px; /* Padding inside the button */
        border: none; /* Remove border */
        border-radius: 5px; /* Rounded corners */
        cursor: pointer; /* Pointer cursor */
        transition: background-color 0.3s, transform 0.2s; /* Smooth hover effect */
        margin-top: 20px; /* Space above the button */
    }

    /* Hover effect for Save Button */
    .save-button:hover {
        background-color: #c396d8; /* Darker background on hover */
        transform: scale(1.05); /* Slightly enlarge on hover */
    }

    /* Center the Save Button */
    .save-button-container {
        display: flex; /* Use flexbox layout */
        justify-content: center; /* Center content horizontally */
        align-items: center; /* Center content vertically */
        width: 100%; /* Take full width of the parent container */
        margin-top: 20px; /* Add space above the container */
    }
`;

export default styles;
