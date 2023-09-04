const resizeButton = document.getElementById("resize");
const grid = document.querySelector(".grid");
const buttons = document.querySelectorAll(".mode");
const colorPicker = document.getElementById("color");

let gridSize = 16;
let currentMode = "default";
let currentColor = "#000";

function draw(e) {
  if (e.buttons === 1 || e.buttons === 3 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    alert(currentMode, e.target.style.backgroundColor);
    switch (currentMode) {
      case "grabber":
        break;
      case "rainbow":
        e.target.style.backgroundColor = generateRandomColor();
        break;
      case "eraser":
        e.target.style.backgroundColor = "white";
        break;
      case "darken":
        e.target.style.backgroundColor = adjustBrightness(
          e.target.style.backgroundColor,
          -25
        );
        break;
      case "darken":
        e.target.style.backgroundColor = adjustBrightness(
          e.target.style.backgroundColor,
          -25
        );
        break;
      case "lighten":
        e.target.style.backgroundColor = adjustBrightness(
          e.target.style.backgroundColor,
          25
        );
        break;
      default:
        e.target.style.backgroundColor = currentColor;
        break;
    }
  }
}

function generateGrid(gridSize) {
  if (gridSize > 64) {
    alert("Grid size is too large.");
    return;
  } else if (gridSize <= 0) {
    alert("Grid size is too small.");
    return;
  }

  grid.style.gridTemplateColumns = `repeat(${gridSize}, minmax(0, 1fr))`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, minmax(0, 1fr))`;

  grid.innerHTML = "";
  for (let i = 0; i < gridSize * gridSize; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.style.backgroundColor = "#fff";
    box.addEventListener("mouseenter", draw);
    box.addEventListener("mousedown", draw);
    box.addEventListener("touchstart", draw);
    box.addEventListener("touchend", draw);
    box.addEventListener("touchmove", draw);
    grid.appendChild(box);
  }
}

function resize() {
  const newSize = prompt("Enter grid size:");
  grid.innerHTML = "";
  generateGrid(newSize);
}

function toggleMode(e, mode) {
  currentMode = currentMode === mode ? "default" : mode;
  resetButtons();
  currentMode === mode
    ? e.target.classList.add("active")
    : e.target.classList.remove("active");
}

function toggleGridLines(e) {
  grid.classList.toggle("grid-lines");
  e.target.classList.toggle("active");
}

function clearGrid() {
  grid.innerHTML = "";
  generateGrid(gridSize);
}

function resetButtons() {
  for (const button of buttons) {
    button.classList.remove("active");
  }
}

function changeColor(e) {
  currentColor = e.target.value;
}

function generateRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function adjustBrightness(rgb, amount) {
  const colorArray = rgb
    .slice(rgb.indexOf("(") + 1, rgb.indexOf(")"))
    .split(", ")
    .map((elem) => +elem);
  let color = convertToHex(...colorArray);
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).slice(-2)
      )
  );
}

// Load squares
generateGrid(16);

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("box") && currentMode === "grabber") {
    resetButtons();
    currentMode = "default";
    const rgb = e.target.style.backgroundColor;
    const colorArray = rgb
      .slice(rgb.indexOf("(") + 1, rgb.indexOf(")"))
      .split(", ")
      .map((elem) => +elem);
    currentColor = convertToHex(...colorArray);
    colorPicker.value = convertToHex(...colorArray);
  }
});

function convertToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

