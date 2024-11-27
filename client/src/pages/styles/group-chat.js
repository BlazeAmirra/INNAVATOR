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
    /* Centered Chat Container */
    .chat-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto; /* Center container horizontally */
        max-width: 600px;
        width: 100%;
        background-color: #f5f5f5;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #d6ade1;
    }

    /* Chat Message Styling */
    .chat-message {
        display: flex;
        align-items: center;
        margin: 10px 0;
        width: 90%;
    }

    .chat-message.left {
        justify-content: flex-start; /* Aligns message to the left */
    }

    .chat-message.right {
        justify-content: flex-end; /* Aligns message to the right */
    }

    .chat-image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 0 10px;
        cursor: pointer;
    }

    .chat-text {
        max-width: 70%;
        padding: 10px;
        background-color: #f9f9f9;
        border-radius: 10px;
        border: 1px solid #d6ade1;
        color: #3b3039;
    }

    /* Additional Images Styling */
    .additional-images {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
    }

    .extra-image {
        width: 100px;
        height: auto;
        border-radius: 8px;
        border: 1px solid #d6ade1;
    }

    /* Go Back Button Styling */
    .go-back-button {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .go-back-button app-link {
        color: #000000;
        text-decoration: none;
        font-size: 18px;
        padding: 10px 20px;
        background-color: #d6ade1;
        border-radius: 8px;
        border: 1px solid #d6ade1;
    }

    .go-back-button app-link:hover {
        background-color: #c89bd5;
    }

    canvas {
        border: 1px solid black;
        cursor: crosshair;
        display: block;
        margin: 20px auto;
    }

    .whiteboard-title {
        text-align: center;
        font-size: 24px;
        margin: 20px 0;
    }

    .whiteboard-buttons {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
    }

    .whiteboard-buttons button,
    .whiteboard-buttons input[type="color"] {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        background-color: #d6ade1;
        color: #000;
        border: 1px solid #d6ade1;
        border-radius: 8px;
    }

    .whiteboard-buttons button:hover {
        background-color: #c89bd5;
    }

    .color-picker-container {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    /* Initially hide the color picker */
    .color-picker-container input[type="color"] {
        display: none;
        padding: 0;
        border: none;
        background: transparent;
        width: 50px;
        height: 30px;
        cursor: pointer;
    }
`;

export default styles;
