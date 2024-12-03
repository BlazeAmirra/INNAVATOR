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
        text-align: center;
        font-size: 22px;
        color: #3b3039;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    /* Row Layout for Rounded Images */
    .image-row {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin: 20px 0;
    }

    /* Rounded Image Styling */
    .rounded-image {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 1px solid #d6ade1;
        cursor: pointer;
    }

    /* Centered Rectangular Image Styling */
    .centered-image-container {
        text-align: center;
        margin: 20px 0;
    }

    .centered-rectangular-image {
        width: 200px;
        height: 120px;
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
`;

export default styles;
