const draggableElements = document.querySelectorAll('.draggable');
const dropZone = document.getElementById('drop-zone');
let dragImg;

// CANVA RELATED
let img = new Image();
// ?
img.crossOrigin = "Anonymous";
img.src = "../resources/img/poop-emoji.png";
// AJOUTEZ CECI POUR VOIR LE TIMING
const imgWidth = 50;
const imgHeight = 50;
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Resize Drag Image via Canvas
function drawImageOnCanvas() {
    // DRAW IMAGE ON CANVAS
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight);

    const finalDragImage = new Image();
    finalDragImage.src = canvas.toDataURL();
    
    // SETDRAGIMAGE REQUIRE THE IMAGE TO BE IN THE DOM BUT OFFSCREEN
    finalDragImage.style.position = 'absolute';
    finalDragImage.style.left = '-9999px';
    document.body.appendChild(finalDragImage);
    
    dragImg = finalDragImage;
}

function addEventListeners() {
    // DRAGGABLE ELEMENTS
    draggableElements.forEach((element) => {
        element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('img/png', event.target.id);
            
            console.log(event.target.id);
            
            // Require a DOM element to be used as a drag image
            event.dataTransfer.setDragImage(dragImg, 10, 10);
            event.dataTransfer.dropEffect = 'move';   
        });
    });

    // DROP ZONE
    // Cancel default behavior to allow dropping
    dropZone.addEventListener("dragenter", (event) => {
        event.preventDefault();
    });

    dropZone.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    // Handle the drop event (requires both event listeners)
    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    });

    dropZone.addEventListener('drop', (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('img/png');
        event.target.appendChild(document.getElementById(data));
    });

    console.log("Event listeners added");
}

function main(){
    console.log("Drag and Drop Module Loaded");
    img.onload = () => {
        console.log("MAINTENANT, l'image est réellement chargée et prête à être dessinée.");
        drawImageOnCanvas();
        addEventListeners();
    };
}

main();