




// Reference to the modal element for displaying success messages
var modal = document.getElementById('successModal');

// Reference to the close button inside the modal
var span = document.getElementsByClassName('close')[0];

// References to the form, tracker button, and tracker section
var form = document.getElementById('complaint-form');
var trackerButton = document.getElementById('trackerButton');
var trackerSection = document.getElementById('trackerSection');

// Handle form submission: Show the success modal and reset the form
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the default manner
    modal.style.display = 'block'; // Display the success modal
    form.reset(); // Clear the form fields after submission
});

// Close the modal when the close button is clicked
span.onclick = function() {
    modal.style.display = 'none'; // Hide the modal
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none'; // Hide the modal if clicked outside
    }
}

// Toggle the display of the tracker section when the tracker button is clicked
// trackerButton.addEventListener('click', () => {
//     trackerSection.style.display = trackerSection.style.display === 'block' ? 'none' : 'block';
// });
data =[["maintenance","the not nice","in-progress"],["Room Cleaning","the not nice","resolved"],["mg","the not nice","pending"]];
trackerButton.addEventListener('click', () => {
    var option=document.getElementById('complaint-type').value;
    for(let i=0;i<data.length;i++)
    {
        if(data[i][2]=="in-progress")
        {
            trackerSection.innerHTML+=`<div class="complaint-item">
            <h3 id="Maintenance">${data[i][0]}</h3>
            <p><strong>Description:</strong> ${data[i][1]}</p>
            <p><strong>Status:</strong> <span class="status-in-progress">${data[i][2]}</span></p>
        </div>`;
        }
        else if(data[i][2]=="resolved")
        {
            trackerSection.innerHTML+=`<div class="complaint-item">
            <h3 id="Maintenance">${option}</h3>
            <p><strong>Description:</strong> ${data[0][1]}</p>
            <p><strong>Status:</strong> <span class="status-resolved">${data[i][2]}</span></p>
        </div>`;
        }
        else if(data[i][2]=="pending"){
            trackerSection.innerHTML+=`<div class="complaint-item">
            <h3 id="Maintenance">${option}</h3>
            <p><strong>Description:</strong> ${data[0][1]}</p>
            <p><strong>Status:</strong> <span class="status-pending">${data[i][2]}</span></p>
        </div>`;
        }
        trackerSection.style.display = trackerSection.style.display === 'block' ? 'none' : 'block';
    }
});
