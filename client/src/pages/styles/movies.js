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

    .movie-image {
        width: 200px;
        height: auto;
        cursor: pointer;
        border: 1px solid #d6ade1;
        border-radius: 10px;
    }

    /* Go Back Button Styling */
    .go-back {
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }

    .go-back a {
        color: #000000;
        text-decoration: none;
        font-size: 18px;
    }

    .go-back a:hover {
        text-decoration: underline;
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
