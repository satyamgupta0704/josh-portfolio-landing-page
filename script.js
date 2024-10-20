const contactInfoButton = document.getElementById('SendMessage');
contactInfoButton.addEventListener('click', function() {
    if (document.getElementById('name').value === '' || document.getElementById('email').value === '' || document.getElementById('message').value === '') {
        alert('Please fill out all fields');
    }
    else{
        alert('Submitted!');
    }
});z