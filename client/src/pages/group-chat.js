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
import styles from './styles/group-chat.js';
import '../components/page-title.js';

const art5 = new URL('../../assets/art5.jpg', import.meta.url).href;
const art7 = new URL('../../assets/art7.jpg', import.meta.url).href;
const art12 = new URL('../../assets/art12.jpg', import.meta.url).href;
const art16 = new URL('../../assets/art16.jpg', import.meta.url).href;

export class GroupChat extends LitElement {
  constructor() {
    super();
    this.title = "Group Chat";
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <!-- Page Title -->
        <app-page-title>Group Chat</app-page-title>

        <!-- Chat Messages Section -->
        <div class="chat-container">
            <!-- Message 1 - Left Side -->
            <div class="chat-message left">
                <app-link href="/chat-with-blaze">
                    <img src=${art5} alt="Blaze" class="chat-image">
                </app-link>
                <p class="chat-text">Hello, ready to work on the project?</p>
            </div>

            <!-- Message 2 - Right Side -->
            <div class="chat-message right">
                <app-link href="/chat-with-preston">
                    <img src=${art7} alt="Preston" class="chat-image">
                </app-link>
                <p class="chat-text">Yep, I have started on the code.</p>
            </div>

            <!-- Message 3 - Left Side -->
            <div class="chat-message left">
                <app-link href="/chat-with-alexis">
                    <img src=${art12} alt="Alexis" class="chat-image">
                </app-link>
                <p class="chat-text">I will see if I can find some security issues we may run into.</p>
            </div>

            <!-- Message 4 - Right Side -->
            <div class="chat-message right">
                <app-link href="/chat-with-marcus">
                    <img src=${art16} alt="Marcus" class="chat-image">
                </app-link>
                <p class="chat-text">Sweet! I can document the results and conduct test.</p>
            </div>
        </div>

        <!-- Whiteboard Section -->
        <div class="whiteboard-container">
            <h2 class="whiteboard-title">Collaborative Whiteboard</h2>
            <canvas id="whiteboard" width="800" height="600"></canvas> <!-- The whiteboard canvas where the drawing occurs -->
            <div class="whiteboard-buttons">
                <button id="clearButton">Clear Whiteboard</button> <!-- Button to clear the whiteboard -->
                <button id="undoButton">Undo</button> <!-- Button to undo last action -->
                <button id="redoButton">Redo</button> <!-- Button to redo undone actions -->
                <!-- Color Picker Button and Hidden Color Input -->
                <div class="color-picker-container">
                    <button id="colorPickerButton">Color Picker</button> <!-- Button to toggle color picker visibility -->
                    <input type="color" id="colorPicker" value="#000000" title="Choose Drawing Color"> <!-- Hidden color picker input -->
                </div>
                <button id="saveButton">Save as Image</button> <!-- Button to save the whiteboard as an image -->
            </div>
        </div>

        <!-- Go Back Button Section -->
        <div class="go-back-button">
            <app-link href="/welcome">Go Back</app-link> <!-- Go back to the previous page -->
        </div>
    `;
  }
}

customElements.define('app-group-chat', GroupChat);

/*
<!-- Whiteboard Script -->
    <script>
        // Get references to elements on the page
        const canvas = document.getElementById('whiteboard'); // Reference to the canvas element where drawing occurs
        const ctx = canvas.getContext('2d'); // Get the 2D context of the canvas to draw on
        const clearButton = document.getElementById('clearButton'); // Reference to the clear button
        const undoButton = document.getElementById('undoButton'); // Reference to the undo button
        const redoButton = document.getElementById('redoButton'); // Reference to the redo button
        const saveButton = document.getElementById('saveButton'); // Reference to the save button
        const colorPicker = document.getElementById('colorPicker'); // Reference to the color picker input
        const colorPickerButton = document.getElementById('colorPickerButton'); // Reference to the color picker button

        let drawing = false; // Track whether the user is currently drawing on the canvas
        let history = []; // Array to store the states of the whiteboard for undo/redo functionality
        let redoStack = []; // Stack to store states for redo functionality
        let currentColor = colorPicker.value; // Set the default drawing color to the value of the color picker input

        // Function to get the mouse position relative to the canvas
        const getMousePos = (event) => {
            const rect = canvas.getBoundingClientRect(); // Get the position of the canvas element on the page
            return {
                x: event.clientX - rect.left, // Calculate mouse X position relative to the canvas
                y: event.clientY - rect.top // Calculate mouse Y position relative to the canvas
            };
        };

        // Function to save the current state of the canvas (for undo/redo)
        const saveState = () => {
            if (history.length >= 50) history.shift(); // If there are more than 50 states, remove the oldest state
            history.push(canvas.toDataURL()); // Save the current canvas state as a data URL
            redoStack = []; // Clear the redo stack when a new action is made
        };

        // Function to restore the canvas to a previous state from history
        const restoreState = (state) => {
            const img = new Image(); // Create a new image element to hold the saved canvas state
            img.src = state; // Set the image source to the saved canvas state
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before restoring the image
                ctx.drawImage(img, 0, 0); // Draw the restored image onto the canvas
            };
        };

        // Event listener for mouse down (start drawing)
        canvas.addEventListener('mousedown', (event) => {
            drawing = true; // Set the drawing flag to true to indicate the user is drawing
            saveState(); // Save the current canvas state before starting the new drawing
            const { x, y } = getMousePos(event); // Get the current mouse position on the canvas
            ctx.beginPath(); // Begin a new path for the drawing
            ctx.moveTo(x, y); // Move the pen to the starting position
        });

        // Event listener for mouse move (drawing while the mouse is moving)
        canvas.addEventListener('mousemove', (event) => {
            if (drawing) {
                const { x, y } = getMousePos(event); // Get the current mouse position on the canvas
                ctx.lineTo(x, y); // Draw a line to the current mouse position
                ctx.strokeStyle = currentColor; // Set the drawing color
                ctx.lineWidth = 2; // Set the line width
                ctx.lineJoin = 'round'; // Set the line join style for smooth curves
                ctx.stroke(); // Actually draw the line
            }
        });

        // Event listener for mouse up (stop drawing)
        canvas.addEventListener('mouseup', () => {
            drawing = false; // Set the drawing flag to false to stop drawing
        });

        // Clear the canvas when the clear button is clicked
        clearButton.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
            saveState(); // Save the empty state to the history for undo/redo
        });

        // Undo the last drawing action
        undoButton.addEventListener('click', () => {
            if (history.length > 0) {
                const lastState = history.pop(); // Get the last saved state from history
                redoStack.push(canvas.toDataURL()); // Push the current state to the redo stack
                if (history.length > 0) {
                    restoreState(history[history.length - 1]); // Restore the previous state from history
                } else {
                    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas if there are no more history states
                }
            }
        });

        // Redo the last undone action
        redoButton.addEventListener('click', () => {
            if (redoStack.length > 0) {
                const redoState = redoStack.pop(); // Get the last undone state from redo stack
                restoreState(redoState); // Restore the redo state to the canvas
                history.push(canvas.toDataURL()); // Save the current state to history for future undo actions
            }
        });

        // Open/close the color picker when the button is clicked
        colorPickerButton.addEventListener('click', () => {
            colorPicker.style.display = colorPicker.style.display === 'none' ? 'block' : 'none';
        });

        // Update the drawing color when the color picker value changes
        colorPicker.addEventListener('input', (event) => {
            currentColor = event.target.value; // Set the drawing color to the selected color
        });

        // Save the canvas as an image when the save button is clicked
        saveButton.addEventListener('click', () => {
            const link = document.createElement('a'); // Create a new anchor element for the download link
            link.href = canvas.toDataURL(); // Set the link's href attribute to the canvas image data URL
            link.download = 'whiteboard-image.png'; // Set the download attribute to specify the file name
            link.click(); // Simulate a click to trigger the download
        });

        // Initially save the initial empty canvas state
        saveState();
    </script>
*/
