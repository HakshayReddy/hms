const btn = document.getElementById("btn-ver");
btn.addEventListener("click", function () {
    console.log("Hello");
    const studentID = document.getElementById("un").value;
    getStudentEmail(studentID);
});

// Replace with your actual API Gateway URL
async function getStudentEmail(studentID) {
    // Make an API call to the backend to get the student's email
const apiUrl = "https://0ey5491w6i.execute-api.eu-north-1.amazonaws.com/stage1/verifyCreds";

    fetch(apiUrl, {
        method: 'GET', 
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : "*",
          'Access-Control-Allow-Credentials': true,
        }
      })  
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error(error);
      });
}
