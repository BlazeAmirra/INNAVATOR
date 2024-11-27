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
    /* Subtitle Styling */
    .subtitle {
        font-size: 22px;
        color: #3b3039;
        text-align: center;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    /* Image Row for Videos & Profiles */
    .image-row {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 20px;
    }

    /* Rounded Image Styling */
    .rounded-image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid #d6ade1;
        cursor: pointer;
    }

    /* Image Grid for Clubs & Classes */
    .image-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        justify-items: center;
        margin-bottom: 20px;
    }

    /* Centered Image for Interactive Projects */
    .center-image {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }

    /* Rounded Square Image */
    .rounded-square {
        width: 150px;
        height: 150px;
        border-radius: 10px;
        border: 1px solid #d6ade1;
        cursor: pointer;
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
`;

export default styles;
