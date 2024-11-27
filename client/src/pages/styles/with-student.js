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
  /* Centered Input Container Styling */
    .input-container {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }

    textarea {
        width: 300px;
        height: 100px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #d6ade1;
        border-radius: 8px;
        resize: none;
    }

    /* Centered Navigation Buttons Styling */
    .navigation-buttons {
        display: flex;
        justify-content: center; /* Centers buttons within the container */
        gap: 20px; /* Space between the back and next buttons */
        margin-top: 20px;
    }

    .back-arrow,
    .next-button {
        color: #000000;
        text-decoration: none;
        font-size: 18px;
        padding: 10px 20px; /* Adds padding for better button appearance */
        border: 1px solid #d6ade1;
        border-radius: 5px;
        transition: background-color 0.3s, color 0.3s; /* Smooth transition effect */
    }

    .back-arrow:hover,
    .next-button:hover {
        background-color: #d6ade1;
        color: #fff;
    }
`;

export default styles;
