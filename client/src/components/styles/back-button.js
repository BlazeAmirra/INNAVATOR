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
    :host {
        font-size: 18px;
        padding: 8px 16px;
        background-color: #d6ade1;
        color: #000000;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
        border: 1px solid #3b3039;
    }

    :host(:hover) {
        background-color: #b893c7;
    }
`;

export default styles;
