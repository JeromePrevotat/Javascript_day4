const previewImage = document.getElementById('imagePreview');
const imageUpload = document.getElementById('imageUpload');

function previewFile(){
    const file = imageUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            previewImage.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
        
}

function addEventListeners() {
    imageUpload.addEventListener('change', previewFile);

    console.log("Event listeners added");
}

function main(){
    console.log("Image module loaded");
    addEventListeners();
}

main();