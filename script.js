// Grid size default
const DEFAULT_SIZE = 16

let currentSize = DEFAULT_SIZE

function setCurrentSize(newSize) {
    currentSize = newSize;
}

const container = document.getElementById('container-grid');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

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
        div.addEventListener("mouseover", function(){
            div.style.backgroundColor = 'red';
        });
        container.appendChild(div);
    }
}

// Generate the default grid when the page is loaded
window.onload = () => {
    generateGrid(DEFAULT_SIZE);
}
  