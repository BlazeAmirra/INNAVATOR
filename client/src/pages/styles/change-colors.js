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
    /* Color Wheel Container */
    .color-wheel-container {
        margin-top: 20px;
        text-align: center;
    }

    .color-wheel {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        border: 3px solid #000000;
    }

    /* Scale Container */
    .scale-container {
        width: 80%;
        margin: 20px 0;
        display: flex;
        justify-content: center;
    }

    /* Scale Input */
    .color-scale {
        -webkit-appearance: none; /* Remove default styling */
        appearance: none;
        width: 100%;
        height: 8px;
        background: linear-gradient(to right, #000000, #555555, #888888, #aaaaaa, #cccccc, #eeeeee, #ffffff);
        border-radius: 5px;
        outline: none;
        cursor: pointer;
    }

    /* Scale Labels */
    .scale-labels {
        width: 80%;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        color: #01010190;
        margin-top: 10px;
    }

    .dark-label, .light-label {
        font-weight: bold;
    }

    /* Go Back Button Style */
    .back-button {
        font-size: 18px;
        padding: 8px 16px;
        background-color: #d6ade1;
        color: #000000;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
    }

    .back-button:hover {
        background-color: #b893c7;
    }
`;

export default styles;
