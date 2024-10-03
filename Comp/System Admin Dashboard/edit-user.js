// Retrieve student ID from URL parameters
function getStudentIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Populate form fields based on student ID
function populateEditForm(studentId) {
    // Fetch student details based on studentId (mocked here)
    document.getElementById('studentName').value = ''; // Example data
    document.getElementById('fathersName').value = ''; // Example data
    document.getElementById('roomAllotted').value = ''; // Example data
    document.getElementById('branch').value = ''; // Example data
    document.getElementById('email').value = ''; // Example data
    document.getElementById('phone').value = ''; // Example data
    //<!-- data will be retrieved here from the server -->
}

document.addEventListener('DOMContentLoaded', () => {
    const studentId = getStudentIdFromURL();
    if (studentId) {
        populateEditForm(studentId);
    }

    document.getElementById('editStudentForm').addEventListener('submit', (event) => {
        event.preventDefault();
        // Handle form submission logic
        const formData = {
            studentName: document.getElementById('studentName').value,
            fathersName: document.getElementById('fathersName').value,
            roomAllotted: document.getElementById('roomAllotted').value,
            branch: document.getElementById('branch').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

        // Send form data to the server using fetch API
        fetch('/api/updateStudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // Show success message if the update is successful
                alert('Student details updated successfully!');
            } else {
                // Show failure message if the update fails
                alert('Failed to update student details. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error during form submission:', error);
            // Show failure message if there is an error
            alert('An error occurred while updating student details.');
        });
    });
});
