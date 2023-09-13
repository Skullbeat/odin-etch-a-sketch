const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#000000';
const DEFAULT_MODE = 'color';

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const container = document.getElementById('container-grid');

colorPicker.oninput = (e) => setCurrentColor(e.target.value); // change color with color picker
colorBtn.onclick = () => setCurrentMode('color'); // Set Mode 'color'
rainbowBtn.onclick = () => setCurrentMode('rainbow'); // Set Mode 'rainbow'
eraserBtn.onclick = () => setCurrentMode('eraser'); // Set Mode 'eraser'(delete)
clearBtn.onclick = () => reloadGrid(); // Clean the board
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value); // change size value to show current size in html
sizeSlider.onchange = (e) => changeSize(e.target.value); // chage size of the grid

// I evaluate whether the mouse button is pressed or not.
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// Update the grid size with the slider input
function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
    clearGrid();
    generateGrid(currentSize);
}

function clearGrid() {
    container.innerHTML = '';
}


function generateGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size ; i++) {
        const div = document.createElement("div");
        div.classList.add("grid-element");
        div.addEventListener('mouseover', changeColor);
        container.appendChild(div);
    }
}

function changeColor(e) {
    if (!mouseDown) return

    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#FFFFFF';
    }
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active');
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
      eraserBtn.classList.remove('active');
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active');
    } else if (newMode === 'color') {
      colorBtn.classList.add('active');
    } else if (newMode === 'eraser') {
      eraserBtn.classList.add('active');
    }
}

// Generate the default grid when the page is loaded
window.onload = () => {
    generateGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
}
  