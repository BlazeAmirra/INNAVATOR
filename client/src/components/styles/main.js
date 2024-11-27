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
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    color: #000000;
    text-align: center;
    margin-top: 40px; /* Space above */
    margin-bottom: 20px; /* Space below */
    padding: 0 20px; /* Horizontal padding for readability */
  }

  .subtitle {
    font-size: 18px;
    color: #000000;
    text-align: center;
    margin-top: 10px;
  }
`;

export default styles;
