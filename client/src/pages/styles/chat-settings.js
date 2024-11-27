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
    /* Buttons Container */
    .buttons-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    /* Settings Buttons */
    .settings-button {
        background-color: #d6ade1; /* Button background color */
        color: #000000; /* Button text color */
        font-size: 18px;
        font-weight: bold;
        text-decoration: none;
        padding: 15px 20px;
        margin: 10px 0; /* Space between buttons */
        border-radius: 5px; /* Rounded corners */
        width: 200px; /* Fixed button width */
        text-align: center; /* Center text inside button */
        transition: background-color 0.3s, transform 0.2s; /* Smooth transition for hover effect */
    }

    /* Hover Effect for Buttons */
    .settings-button:hover {
        background-color: #b893c7; /* Change background on hover */
        transform: scale(1.1); /* Slightly enlarge button on hover */
    }

`;

export default styles;
