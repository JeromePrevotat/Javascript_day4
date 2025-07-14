const canvas = document.getElementById("myCanvas");
const colorPicker = document.getElementById("colorPicker");
const btnSave = document.getElementById("saveBtn");
const btnLoad = document.getElementById("loadBtn");

function isStorageAvailable(type){
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
    return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
        );
    }
}

function addEventListeners(){
    colorPicker.addEventListener("input", (event) => {
        const selectedColor = event.target.value;
        console.log("Selected color:", selectedColor);
        canvas.style.backgroundColor = selectedColor;
    });
    btnSave.addEventListener("click", () => {
        const canvasColor = canvas.style.backgroundColor;
        localStorage.setItem("canvasColor", canvasColor);
        console.log("Canvas color saved to LocalStorage");
    });
    btnLoad.addEventListener("click", () => {
        const canvasColor = localStorage.getItem("canvasColor");
        if (!canvasColor) console.log("No canvas color found in LocalStorage");
        canvas.style.backgroundColor = canvasColor
        colorPicker.value = canvasColor;
        console.log("Canvas color loaded from LocalStorage");
        }
    );
    console.log("Event listeners added");
}

function loadLocalStorage(){

}
 
function main(){
    console.log("LocalStorage module loaded");
    if (!isStorageAvailable("localStorage")) console.error("LocalStorage is not available");
    console.log("LocalStorage is available");
    addEventListeners();
    loadLocalStorage();
}

main();