import { LitElement, html } from 'lit';
import { map } from 'lit/directives/map.js';
import styles from './styles/group-chat.js';
import '../components/back-button.js';
import '../components/page-title.js';
import * as innavator_api from '../innavator-api.js';
import * as innavator_utils from '../innavator-utils.js';

const art5 = new URL('../../assets/art5.jpg', import.meta.url).href;
const art7 = new URL('../../assets/art7.jpg', import.meta.url).href;
const art12 = new URL('../../assets/art12.jpg', import.meta.url).href;
const art16 = new URL('../../assets/art16.jpg', import.meta.url).href;

export class GroupChat extends LitElement {
    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            channel: {type: String},
            updateParent: {type: Function},
            requestingRender: {type: Boolean},
            messages: {type: Array},
            loaded: {type: Boolean},
            groupName: {type: String},
            channelName: {type: String},
            userDict: {type: Object},
            inputMessage: {type: String}
        };
    }

    constructor() {
        super();
        this.title = "Group Chat";
        this.messages = [];
        this.loaded = false;
        this.groupName = "";
        this.channelName = "";
        this.userDict = {};
    }

    originalTimestamp(message) {
        // use of BigInt is due to 32-bit cutoff when bitshifting Number
        return Number(BigInt(message.snowflake_id) >> 22n) + innavator_api.get_epoch();
    }

    timeOrDate(timestamp) {
        if (timestamp < (Date.now() - 1000 * 60 * 60 * 24)) {
            return new Date(timestamp).toLocaleDateString();
        }
        return new Date(timestamp).toLocaleTimeString();
    }

    handleInput(e) {
        let {id, value} = e.target;
        this[id] = value;
    }

    async attempt_send_message() {
        let result = await innavator_api.sendMessage(this.channel, this.inputMessage);
        if (result.apiError) {
          if (result.apiError.message) {
            let messageJSON = innavator_utils.parsed_json_or_null(result.apiError.message);
            if (messageJSON && messageJSON.detail) {
              this.error = messageJSON.detail;
            }
            else {
              this.error = result.apiError.message;
            }
          }
          else {
            this.error = result.apiError;
          }
        }
        else {
            this.loaded = false;
            this.requestUpdate();
        }
    }

    async update() {
        super.update();
        if (!this.requestingRender) {
            this.loaded = false;
        }
        if (this.requestingRender && this.channel && !this.loaded) {
            let result = await innavator_api.listMessages(this.channel);
            this.messages = result.results ? result.results : [];

            result = await innavator_api.fetchChannel(this.channel);
            this.channelName = result.name;
            this.groupName = (await innavator_api.fetchGroup(result.group)).name;

            let i;
            for (i = 0; i < this.messages.length; i++) {
                let message = this.messages[i];
                if (!this.userDict[message.sender]) {
                    this.userDict[message.sender] = await innavator_api.fetchUser(message.sender);
                }
            }
            this.loaded = true;
        }
    }

    render() {
        return html`
            <app-page-title>${this.groupName} - ${this.channelName}</app-page-title>

            <div class="chat-container">
                ${map(this.messages, value => html`
                <div class="chat-message left">
                    <app-link href="/user/${value.sender}">
                        <img src="${this.userDict[value.sender].profile_picture_url}" alt="${innavator_utils.optimal_name(this.userDict[value.sender])}" class="chat-image"/>
                    </app-link>
                    <p>
                        <span class="chat-text">${value.contents}</span>
                        <span title="${new Date(this.originalTimestamp(value)).toLocaleString()}">${this.timeOrDate(this.originalTimestamp(value))}</span>
                        <span>${value.is_edited ? html`<span title="${new Date(Date.parse(value.last_revision)).toLocaleString()}">(edited)</span>` : html``}</span>
                    </p>
                </div>
                `)}
                <!--
                <div class="chat-message left">
                    <app-link href="/chat-with-blaze">
                        <img src=${art5} alt="Blaze" class="chat-image">
                    </app-link>
                    <p class="chat-text">Hello, ready to work on the project?</p>
                </div>

                <div class="chat-message right">
                    <app-link href="/chat-with-preston">
                        <img src=${art7} alt="Preston" class="chat-image">
                    </app-link>
                    <p class="chat-text">Yep, I have started on the code.</p>
                </div>

                <div class="chat-message left">
                    <app-link href="/chat-with-alexis">
                        <img src=${art12} alt="Alexis" class="chat-image">
                    </app-link>
                    <p class="chat-text">I will see if I can find some security issues we may run into.</p>
                </div>

                <div class="chat-message right">
                    <app-link href="/chat-with-marcus">
                        <img src=${art16} alt="Marcus" class="chat-image">
                    </app-link>
                    <p class="chat-text">Sweet! I can document the results and conduct test.</p>
                </div>
                -->
            </div>
            <div>
                <input type="text" id="inputMessage" name="inputMessage" class="input-field" placeholder="Type a message" @input="${this.handleInput}" />
                <button @click="${this.attempt_send_message}">Send</button>
            </div>

            <div class="go-back-button">
                <app-back-button/>
            </div>
        `;
    }
}

customElements.define('app-group-chat', GroupChat);

/*

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
*/


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
