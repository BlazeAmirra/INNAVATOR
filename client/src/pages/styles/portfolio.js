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
    /* Portfolio Page Title Styling */
    .portfolio-title {
        text-align: center;
        font-size: 36px;
        color: #000000;
        margin-top: 40px;
    }

    /* Button Container */
    .button-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
    }

    /* Option Button Styling */
    .option-button {
        display: inline-block;
        background-color: #ed7a92;
        color: #3b3039;
        padding: 15px 30px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        margin: 10px 0;
        font-size: 18px;
        width: 200px;
        text-align: center;
        cursor: pointer;
    }

    .option-button:hover {
        background-color: #c468c4;
    }
`;

export default styles;
