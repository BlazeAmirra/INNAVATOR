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
    /* Pink Stars Styling */
    .pink-stars {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 30px;
    }

    .star {
        font-size: 30px;
        color: #ffadc1; /* Pink color for small stars */
    }

    /* Large Purple Submit Star Styling */
    .submit-star {
        text-decoration: none; /* Remove underline from link */
    }

    .large-star {
        font-size: 30px;
        color: #fff;
        background-color: #b267d7; /* Purple color for the large star */
        padding: 20px;
        text-align: center;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }

    .large-star:hover {
        background-color: #a25fc4; /* Slightly darker shade on hover */
    }
`;

export default styles;
