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
    /* Portfolio Image Styling */
    .portfolio-image-container {
        text-align: center;
        margin: 20px 0;
    }

    .portfolio-image {
        width: 150px;
        height: auto;
        border-radius: 10px;
        border: 1px solid #d6ade1;
        cursor: pointer;
    }

    /* Introduction Box Styling */
    .intro-box {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #f5f5f5;
        border-radius: 10px;
        border: 1px solid #d6ade1;
        text-align: center;
        color: #3b3039;
        font-size: 18px;
    }

    /* Side-by-Side Image Pair Styling */
    .image-pair {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
    }

    .image-pair .portfolio-image {
        width: 150px;
        height: auto;
        border-radius: 8px;
        border: 1px solid #d6ade1;
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
