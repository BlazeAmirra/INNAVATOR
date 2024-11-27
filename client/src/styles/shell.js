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
    font-family: Arial, sans-serif; /* Set a clean, readable font */
    background-color: #fff; /* Set a white background for the page */
    color: #01010190; /* Main text color with slight transparency */
    min-height: 100vh; /* Ensure full viewport height is covered */
    display: flex; /* Enable flexbox for layout */
    flex-direction: column; /* Arrange children vertically */
    margin: 0; /* Remove default body margin */
    align-items: center; /* Centers content horizontally */
    margin: 0;
    padding: 0;
    line-height: 1.6; /* Increases the line height for better readability */
  }

  h1 {
    font-size: 45px;
    color: purple;
  }

  .route {
    width: 100%;
  }
`;

export default styles;
