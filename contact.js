// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    // Get response message element
    const responseElement = document.getElementById('contactResponse');
    
    // Validate email
    if (!validateEmail(email)) {
        showResponse('Please enter a valid email address', 'error');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For demo, we'll just show a success message
    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };
    
    console.log('Form Data:', formData);
    
    // Show success message
    showResponse('Thank you for your message! We will get back to you soon.', 'success');
    
    // Clear form
    e.target.reset();
});

function showResponse(message, type) {
    const responseElement = document.getElementById('contactResponse');
    responseElement.textContent = message;
    responseElement.className = 'response-message ' + type;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        responseElement.style.display = 'none';
    }, 5000);
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Add smooth scrolling for contact link
document.querySelector('a[href="#contact"]').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});
