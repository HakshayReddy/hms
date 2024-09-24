const btn = document.getElementById("btn-ver");
btn.addEventListener("click", function () {
    console.log("Hello");
});

// Replace with your actual API Gateway URL
const apiUrl = "https://0ey5491w6i.execute-api.eu-north-1.amazonaws.com/verifyCreds/";
const studentID = document.getElementById("un").value;
function getStudentEmail(studentID) {
    // Make an API call to the backend to get the student's email
    fetch(apiUrl + studentID)
        .then(response => response.json())
        .then(data => {
            if (data.email) {
                console.log('Student Email:', data.email);
                document.getElementById('emailOutput').innerText = 'Email: ' + data.email;
            } else {
                console.log('Error:', data.message);
                document.getElementById('emailOutput').innerText = 'Error: ' + data.message;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('emailOutput').innerText = 'Error: ' + error.message;
        });
}

// Call the function when needed (e.g., a button click event)
getStudentEmail('12345');  // Replace with actual studentID
