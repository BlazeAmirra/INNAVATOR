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
    /* Input Section Styles */
    .input-section {
        display: flex; /* Flex layout for alignment */
        justify-content: center; /* Center the input box horizontally */
        margin-top: 20px; /* Space above the input section */
    }

    .text-input {
        width: 80%; /* Set width for input box */
        max-width: 600px; /* Limit max width for large screens */
        padding: 12px; /* Internal padding for readability */
        font-size: 16px; /* Font size for input text */
        border: 1px solid #d6ade1; /* Border color matching theme */
        border-radius: 8px; /* Rounded corners for input */
        box-sizing: border-box; /* Ensure padding doesn’t affect total width */
    }

    /* Button Section Styles */
    .button-section {
        display: flex; /* Flex layout for horizontal alignment */
        justify-content: center; /* Center the buttons horizontally */
        margin-top: 20px; /* Space above button section */
        gap: 20px; /* Space between the buttons */
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
