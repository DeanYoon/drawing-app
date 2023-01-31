# drawing-app
https://deanyoon.github.io/drawing-app/

<img width="563" alt="drawing" src="https://user-images.githubusercontent.com/68269605/215655830-b64f4ccc-8f73-4890-9915-dce39c7a8e47.png">



This is a web-based painting application that allows you to draw and color on a virtual canvas. The app includes several tools for drawing, including a pen, paint bucket, eraser, stamp, and text input. Additionally, the app includes features for uploading and downloading your creations.

# Features
- Pen tool for drawing lines
- Paint bucket tool for filling areas with color
- Eraser tool for erasing parts of the canvas
- Stamp tool for adding text to the canvas
- Text input for customizing the stamp text
- Option to change the color of the tools
- Option to change the size of the pen and stamp
- Upload and download capabilities for saving and sharing your creations

# Code Structure
The app is written in JavaScript and uses the HTML5 canvas element to display the virtual canvas. The code is organized with variables declared at the beginning to store references to various HTML elements on the page, such as buttons, input fields, and the canvas itself.

Event listeners are then attached to the buttons and other elements to respond to user interactions and perform the appropriate actions, such as drawing on the canvas, changing colors, or uploading a file.

The reset function is used to reset the state of the app when switching between tools, and the unBtnAll function is used to un-highlight all buttons when a new tool is selected.

The onPenBtnClick, onPaintClick, onEraserBtnClick, and onTrashBtnClick functions are called when the corresponding buttons are clicked and perform the actions associated with each tool. The stampCanvas function is called when the mouse is moved on the canvas and adds text to the canvas when the stamp tool is selected.

The lineSize function is called when the mouse wheel is used to change the size of the pen or stamp, and the stampCanvas function is called when the mouse is clicked on the canvas to add text.

The onMove function is called whenever the mouse is moved on the canvas and updates the drawing as necessary, and the stopDrawing function is called when the mouse button is released to stop drawing.

# Conclusion
This painting app provides a simple and intuitive interface for drawing and coloring on a virtual canvas. Its compact code base and use of the HTML5 canvas make it a great starting point for learning more about web development and JavaScript programming.
