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
  /* Profile Picture Container */
    .profile-pic-container {
        text-align: center;
        margin-top: 20px;
        cursor: pointer; /* Indicates the profile picture is clickable */
    }

    .profile-pic {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        border: 3px solid #d6ade1;
    }

    /* Section Titles and Labels */
    .edit-picture-title {
        text-align: center;
        font-size: 22px;
        color: #000000;
        margin-top: 10px;
    }

    label {
        display: block;
        font-weight: bold;
        margin-top: 15px;
        font-size: 16px;
        color: #01010190;
    }

    /* Input Fields */
    .input-field {
        width: 300px;
        padding: 8px;
        border-radius: 5px;
        border: 1px solid #3b3039;
        margin-top: 5px;
        font-size: 16px;
    }

    /* Static Information (App Phone Number) */
    .static-info {
        font-size: 16px;
        color: #01010190;
        margin-top: 10px;
    }

    .signin-button {
        font-size: 18px;
        padding: 8px 16px;
        background-color: #d6ade1;
        color: #000000;
        border: 1px solid #3b3039;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
    }

    .signin-button:hover {
        background-color: #b893c7;
    }
`;

export default styles;
