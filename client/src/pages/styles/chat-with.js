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
    /* Back Arrow Styling */
    .back-arrow {
        display: flex;
        justify-content: flex-start;
        margin: 20px;
    }

    .back-arrow app-link {
        color: #000;
        font-size: 18px;
        text-decoration: none;
    }

    .back-arrow app-link:hover {
        text-decoration: underline;
    }

    /* Logo Section Styling */
    .logo-section {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .logo-image {
        width: 100px;
        height: auto;
    }

    /* Chat Box Section Styles */
    .chat-box {
        display: flex;
        align-items: center;
        background-color: #f9f9f9;
        border: 1px solid #d6ade1;
        border-radius: 8px;
        padding: 15px;
        max-width: 600px;
        margin: 20px auto;
    }

    .profile-picture {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 15px;
    }

    .chat-message {
        color: #3b3039;
        font-size: 16px;
    }

    /* Centered Image Section Styles */
    .centered-image-section {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .centered-image {
        width: 300px;
        height: 200px;
        border-radius: 8px;
        border: 1px solid #d6ade1;
    }

    /* User Input Box Section */
    .input-box-section {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .user-input-box {
        width: 80%;
        max-width: 600px;
        padding: 10px;
        border: 1px solid #c468c4;
        border-radius: 8px;
        font-size: 16px;
    }
`;

export default styles;