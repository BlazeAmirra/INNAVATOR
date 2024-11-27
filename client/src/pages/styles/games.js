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
    /* Centered Image Container */
    .image-container {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }

    .game-image {
        width: 300px;
        height: auto;
        cursor: pointer;
        border: 1px solid #d6ade1;
        border-radius: 10px;
    }

    /* Add Game Button Container */
    .add-game-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .add-game-button {
        font-size: 18px;
        color: #ffffff;
        background-color: #d6ade1;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 8px;
        border: none;
        cursor: pointer;
    }

    .add-game-button:hover {
        background-color: #c09cc5;
    }

    /* Go Back Button Styling */
    .go-back {
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }

    .go-back app-link {
        color: #000000;
        text-decoration: none;
        font-size: 18px;
    }

    .go-back app-link:hover {
        text-decoration: underline;
    }
`;

export default styles;
