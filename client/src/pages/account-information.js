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

import { LitElement, html } from 'lit';
import styles from './styles/account-information.js';

const editpicture = new URL('../../assets/editpicture.png', import.meta.url).href;

export class AccountInfo extends LitElement {
  constructor() {
    super();
    this.title = 'Account Information';
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Centered Profile Picture with Click Event -->
        <div class="profile-pic-container" onclick="triggerFileInput()">
            <img src=${editpicture} alt="Profile Picture" class="profile-pic" id="profilePic">
        </div>

        <!-- Hidden File Input -->
        <input type="file" id="uploadPic" accept="image/*" onchange="changeProfilePic()" style="display: none;">

        <!-- Edit Picture Title -->
        <h2 class="edit-picture-title">Edit Picture</h2>

        <!-- Name Field -->
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" class="input-field" placeholder="Enter your name">

        <!-- School Email Field -->
        <label for="school-email">School Email:</label>
        <input type="email" id="school-email" name="school-email" class="input-field" placeholder="Enter your school email">

        <!-- Personal Email Field (Optional) -->
        <label for="personal-email">Personal Email (Optional):</label>
        <input type="email" id="personal-email" name="personal-email" class="input-field" placeholder="Enter your personal email">

        <!-- App Phone Number (Display Only) -->
        <p class="static-info">Your app phone #: (123)456-7890</p>

        <!-- Optional Phone Number Field -->
        <label for="phone-optional">Your phone # (Optional):</label>
        <input type="tel" id="phone-optional" name="phone-optional" class="input-field" placeholder="Enter your phone number">

        <!-- Present Hours Field -->
        <label for="present-hours">Present hours:</label>
        <input type="text" id="present-hours" name="present-hours" class="input-field" placeholder="Enter your available hours">
    `;
  }
}

customElements.define('app-account-information', AccountInfo);

/*
<script>
        // Function to trigger the file input when the profile image is clicked
        function triggerFileInput() {
            document.getElementById('uploadPic').click();
        }

        // Function to change the profile picture when a new image is uploaded
        function changeProfilePic() {
            const fileInput = document.getElementById('uploadPic');
            const profilePic = document.getElementById('profilePic');

            if (fileInput.files && fileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePic.src = e.target.result;
                }
                reader.readAsDataURL(fileInput.files[0]);
            }
        }
    </script>
*/
