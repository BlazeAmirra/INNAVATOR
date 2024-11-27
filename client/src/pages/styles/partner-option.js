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
    /* Button Section Styles */
    .button-section {
        display: flex; /* Flex layout for horizontal alignment */
        justify-content: center; /* Center the buttons horizontally */
        margin-top: 20px; /* Space above button section */
        gap: 20px; /* Space between the buttons */
    }

    .option-button {
        display: inline-block; /* Inline block for padding and margin */
        background-color: #c468c4; /* Button background color */
        color: #fff; /* White text color for contrast */
        padding: 10px 20px; /* Padding for button dimensions */
        text-decoration: none; /* Remove underline from link */
        border-radius: 8px; /* Rounded corners for button */
        font-size: 18px; /* Font size for readability */
        transition: background-color 0.3s; /* Smooth background color change on hover */
    }

    .option-button:hover {
        background-color: #a655a0; /* Darker background on hover */
    }
`;

export default styles;
