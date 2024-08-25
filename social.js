function uploadMedia() {
    const fileInput = document.getElementById('media');
    const descriptionInput = document.getElementById('description');
    const mediaGallery = document.getElementById('media-gallery');

    const file = fileInput.files[0];
    const description = descriptionInput.value;

    if (!file) {
        alert('Please select a file.');
        return;
    }

    if (!description) {
        alert('Please enter a description.');
        return;
    }

    const mediaItem = document.createElement('div');
    mediaItem.classList.add('media-item');

    const mediaElement = document.createElement(file.type.startsWith('image/') ? 'img' : 'video');
    mediaElement.src = URL.createObjectURL(file);
    mediaElement.controls = file.type.startsWith('video/');

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    mediaItem.appendChild(mediaElement);
    mediaItem.appendChild(descriptionElement);

    mediaGallery.appendChild(mediaItem);

    // Clear input fields
    fileInput.value = '';
    descriptionInput.value = '';
}
