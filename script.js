const container = document.querySelector("#container-grid");

function generateGrid() {
    for (let i = 0; i < 16 ; i++) {
        const div = document.createElement("div");
        div.classList.add("grid-element");
        div.addEventListener("mouseover", function(){
            div.style.backgroundColor = 'red';
        });
        container.appendChild(div);
    }
}

generateGrid();
  