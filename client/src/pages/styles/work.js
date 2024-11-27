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
    /* Form Container Styling */
    .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 500px;
        width: 100%;
        padding: 20px;
        background-color: #f9f9f9;
        border: 1px solid #d6ade1;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        text-align: center; /* Center content inside the container */
    }

    /* Input Field Styling */
    label {
        font-size: 16px;
        color: #3b3039;
        margin: 10px 0 5px;
        width: 100%;
        text-align: left;
    }

    input[type="text"],
    textarea {
        width: 100%;
        max-width: 400px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #d6ade1;
        border-radius: 5px;
        margin-bottom: 15px;
        text-align: center;
    }

    textarea {
        height: 100px;
        resize: none;
    }

    /* Navigation Buttons Styling */
    .navigation-buttons {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 300px;
        margin-top: 20px;
    }

    .back-arrow,
    .next-button {
        color: #000000;
        text-decoration: none;
        font-size: 18px;
    }

    .back-arrow:hover,
    .next-button:hover {
        text-decoration: underline;
    }
`;

export default styles;
