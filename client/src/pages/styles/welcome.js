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
    /* Welcome Title Styling */
    .welcome-title {
        text-align: center; /* Center text */
        font-size: 36px; /* Large font size */
        color: #000000; /* Set main text color */
        margin-top: 40px; /* Space above */
    }

    /* Button Container */
    .button-container {
        display: flex; /* Enable flex layout */
        flex-direction: column; /* Arrange buttons vertically */
        align-items: center; /* Center align buttons */
        margin-top: 30px; /* Space above buttons */
    }

    /* Option Button Styling */
    .option-button {
        display: inline-block; /* Set as inline block for padding */
        background-color: #ed7a92; /* Button background color */
        color: #3b3039; /* Text color */
        padding: 15px 30px; /* Padding around text */
        border-radius: 8px; /* Rounded corners */
        text-decoration: none; /* Remove underline */
        font-weight: bold; /* Bold text */
        margin: 10px 0; /* Space between buttons */
        font-size: 18px; /* Font size */
        width: 200px; /* Set button width for uniformity */
        text-align: center; /* Center align text */
        cursor: pointer; /* Set cursor to pointer */
    }

    .option-button:hover {
        background-color: #c468c4; /* Change color on hover */
    }
`;

export default styles;
