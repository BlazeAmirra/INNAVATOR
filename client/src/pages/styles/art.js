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
    /* Go Back Button Styles */
    .back-button-container {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }

    .back-button {
        color: #c468c4;
        font-size: 16px;
        text-decoration: none;
        border: 1px solid #c468c4;
        padding: 8px 16px;
        border-radius: 5px;
        transition: background-color 0.3s, color 0.3s;
    }

    .back-button:hover {
        background-color: #c468c4;
        color: #fff;
    }

    /* Art Gallery Section */
    .art-gallery {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }

    .art-item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        width: 80%;
        max-width: 800px;
        border: 1px solid #c468c4;
        border-radius: 8px;
        padding: 10px;
    }

    .art-item img {
        width: 150px;
        height: auto;
        border-radius: 5px;
        margin-right: 15px;
    }

    .art-description {
        flex: 1;
        color: #01010190;
    }
`;

export default styles;
