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
  /* Content Styles */
  .content {
      padding: 20px; /* Padding around content */
  }

  /* Secondary Logo Styles */
  .secondary-logo-container {
      margin-top: 20px; /* Space above the logo */
      text-align: center; /* Center text */
      margin-top: 40px; /* Space above */
      margin-bottom: 20px; /* Space below */
      padding: 0 20px; /* Horizontal padding for readability */
  }

  /* Static Logo Styles */
  .secondary-logo {
      width: 150px; /* Set width for logo */
      height: auto; /* Maintain aspect ratio */
  }
`;

export default styles;
