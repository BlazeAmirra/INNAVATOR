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
    /* Image Row Layout */
    .image-row {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 20px;
    }

    /* Image Container and Name Description Styling */
    .image-container {
        text-align: center;
    }

    /* Rounded Image Styling */
    .rounded-image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid #d6ade1;
        cursor: pointer;
    }

    /* Name Description Text Styling */
    .name-description {
        margin-top: 10px;
        font-size: 16px;
        color: #3b3039;
    }

    /* Back Button Styling */
    .back-button-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .back-button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #d6ade1;
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #3b3039;
    }

    .back-button:hover {
        background-color: #c296d9;
        color: #000;
    }

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
`;

export default styles;
