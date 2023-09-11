const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#000000';

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function setCurrentColor(newColor) {
    currentColor = newColor;
}

const colorPicker = document.getElementById('colorPicker');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const container = document.getElementById('container-grid');

colorPicker.oninput = (e) => setCurrentColor(e.target.value); // change color with color picker
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
    e.target.style.backgroundColor = currentColor
}

// Generate the default grid when the page is loaded
window.onload = () => {
    generateGrid(DEFAULT_SIZE);
}
  