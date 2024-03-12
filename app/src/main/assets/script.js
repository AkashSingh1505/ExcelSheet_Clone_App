// JavaScript functions
function showConfirmationBox() {
    var confirmationBox = document.getElementById('confirmationBox');
    confirmationBox.style.display = 'block';
}

function hideConfirmationBox() {
    var confirmationBox = document.getElementById('confirmationBox');
    confirmationBox.style.display = 'none';
}

function closePage() {
    hideConfirmationBox();
    // You can add your close page logic here.
    AndroidInterface.close();
}
