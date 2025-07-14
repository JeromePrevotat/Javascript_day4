const clipboardInput = document.getElementById("clipboardInput");
const clipboardContent = document.getElementById("clipboardContent");
const clipboardPaste = document.getElementById("clipboardPaste");
const copyBtn = document.getElementById("copyBtn");
const pasteBtn = document.getElementById("pasteBtn");

async function copyToClipboard() {
    try{
        const text = clipboardInput.value;
        await navigator.clipboard.writeText(text);
        console.log("Text copied to clipboard:", text);
        clipboardContent.textContent = text;
    } catch (err) {
        console.error("Failed to copy text:", err);
    }

}

async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        console.log("Text pasted from clipboard:", text);
        clipboardPaste.textContent = text;
    } catch (err) {
        console.error("Failed to read text from clipboard:", err);
    }
}

function addEventListeners() {
    copyBtn.addEventListener("click", copyToClipboard);
    pasteBtn.addEventListener("click", pasteFromClipboard);
    console.log("Event listeners added");
}

function main(){
    console.log("Clipboard Module Loaded");
    addEventListeners();
}

main();