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
    /* Founder's Page Title Styling */
    .founders-title {
        text-align: center;
        font-size: 36px;
        color: #000000;
        margin-top: 40px;
    }

    /* Founder's Page Subtitle Styling */
    .founders-subtitle {
        text-align: center;
        font-size: 24px;
        color: #3b3039;
        margin-top: 10px;
    }

    /* Images Container Styling */
    .images-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
    }

    /* Individual Image Row Styling */
    .image-row {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }

    /* Image Item Styling */
    .image-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
    }

    /* Rounded Image Styling */
    .rounded-image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
    }

    /* Create Group Chat Button Container */
    .chat-button-container {
        display: flex;
        justify-content: center;
        margin-top: 40px;
    }

    /* Create Group Chat Button Styling */
    .create-chat-button {
        display: inline-block;
        background-color: #ed7a92;
        color: #3b3039;
        padding: 15px 30px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        font-size: 18px;
        cursor: pointer;
    }

    .create-chat-button:hover {
        background-color: #c468c4;
    }

    /* Go Back Button Styling */
    .button-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .go-back-button {
        display: inline-block;
        background-color: #d6ade1; /* Matching footer color */
        color: #3b3039;
        padding: 15px 30px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        font-size: 18px;
        width: 200px;
        text-align: center;
        cursor: pointer;
    }

    .go-back-button:hover {
        background-color: #c468c4;
    }

    .image-item app-link {
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .image-item app-link:hover {
        text-decoration: none;
        color: #555;
    }

    .rounded-image {
        display: block;
        margin: 0 auto;
    }

    .image-item p {
        margin-top: 8px;
        text-align: center;
        font-size: 1rem;
    }
`;

export default styles;
