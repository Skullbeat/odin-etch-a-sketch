const container = document.querySelector("#container-grid");

function generateGrid() {
    for (let i = 0; i < 16 ; i++) {
        const div = document.createElement("div");
        div.classList.add("grid-element");
        container.appendChild(div);
    }
}

generateGrid();
  