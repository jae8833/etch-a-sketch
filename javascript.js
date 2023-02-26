const gridContainer = document.querySelector('.grid-container');

// Sets Up Grid
function setUpGrid(boxesPerRowCol) {
    const gridWidthAndHeight = window.getComputedStyle(gridContainer).getPropertyValue('width').replace('px','');
    let squareWidthAndHeight = gridWidthAndHeight / boxesPerRowCol - 1;

    for (let i = 0; i < boxesPerRowCol; ++i) {
        for (let j = 0; j < boxesPerRowCol; ++j) {
            let square = document.createElement('div');
            square.style.cssText = `width: ${squareWidthAndHeight}px; height: ${squareWidthAndHeight}px`;
            square.classList.add('square');
            gridContainer.appendChild(square);
            square.addEventListener('mouseover', changeColor);
            square.addEventListener('mousedown', changeColor);
        }
    }

    gridSizeValue.textContent = `${boxesPerRowCol} x ${boxesPerRowCol}`;
    gridSizeSlider.value = `${boxesPerRowCol}`;
}


// Sketch
let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (mode === "blackWhite") e.target.style.backgroundColor = "black";
    if (mode === "rainbow") {
        let red = Math.floor(Math.random()*256);
        let green = Math.floor(Math.random()*256);
        let blue = Math.floor(Math.random()*256);
        e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
    }
    if (mode == "eraser") {
        e.target.style.backgroundColor = 'white';
    }
}


// OPTION BUTTONS
// Black/White Button
let blackWhiteBtn = document.querySelector("#black-white");
blackWhiteBtn.onclick = () => changeMode(blackWhiteBtn, 'blackWhite');

// Rainbow Button
let rainbowBtn = document.querySelector('#rainbow');
rainbowBtn.onclick = () => changeMode(rainbowBtn, "rainbow");

// Eraser Button
let eraserBtn = document.querySelector('#eraser');
eraserBtn.onclick = () => changeMode(eraserBtn, "eraser");

// Clear Button
let clearBtn = document.querySelector('#clear');
clearBtn.onclick = () => clear();

let modes = ['blackWhite',blackWhiteBtn,'rainbow',rainbowBtn,'eraser',eraserBtn];

function changeMode(newBtn, newMode) {
    mode = newMode;
    newBtn.classList.add('chosen');
    for (let i = 0; i < modes.length; i = i + 2) {
        if (modes[i] !== newMode) {
            modes[i+1].classList.remove('chosen');
        }
    }
}

function clear() {
    gridContainer.innerHTML = "";
    setUpGrid(boxesPerRowCol);
}


// Change Grid Size
const gridSizeValue = document.querySelector('#grid-size-value');
const gridSizeSlider = document.querySelector('#grid-size-slider');

gridSizeSlider.addEventListener('mousemove', (e) => {
    gridSizeValue.textContent=`${e.target.value} x ${e.target.value}`;
});

gridSizeSlider.addEventListener('change', (e) => {
    gridContainer.innerHTML = "";
    boxesPerRowCol = e.target.value;
    setUpGrid(boxesPerRowCol);
});


// Start Up Webpage
let boxesPerRowCol = 16;
setUpGrid(boxesPerRowCol);
changeMode(blackWhiteBtn, 'blackWhite')