const today = new Date().toISOString().split('T')[0];
document.getElementById('from-date').setAttribute('min', today); 
document.getElementById('to-date').setAttribute('min', today); 

var data2=[["12345","ECS","29-08-2014","9:35 AM","29-08-2014","11:00 PM","Not Approved","Not Approved"],["23456","Shopping","29-08-2014","9:35 AM","29-08-2014","11:00 PM","Approved","Approved"]]
var data=[["Pranav","22BCE7558","Mohan","pillala mari vari street, tenali",717,"2024-08-31","saipranav425@gmail.com","9014456063"],["Hakshay","22BCE9807","shiva","Ananthapur",717,"2005-06-24","hakshay2005@gmail.com","9398237819"]];
function loadData()
{
    for(let i=0;i<data.length;i++)
    {
        var d1=data[i][0];
        if(d1=="Pranav")
        {
            document.getElementById("name").value="Appala "+data[i][0]+" Sai";
            document.getElementById("student-id").value=data[i][1];
            document.getElementById("father-name").value=data[i][2];
            document.getElementById("address").value=data[i][3];
            document.getElementById("room").value=data[i][4];
            document.getElementById("email").value=data[i][6];
            document.getElementById("phone").value=data[i][7];
        }
    }
    for(let i=0;i<data2.length;i++)
    {
        if(data2[i][6]=="Not Approved" && data2[i][7]=="Not Approved")
        {
            document.getElementById("tracker").innerHTML+=
        `<div class="show-track">
                <div class="leave-item">
                    <p><strong>Leave Id: </strong>${data2[i][0]}</p>
                    <p><strong>Purpose: </strong>${data2[i][1]}</p>
                    <p><strong>From date: </strong>${data2[i][2]}<strong>           From time: </strong>${data2[i][3]}</p>
                    <p><strong>To date: </strong>${data2[i][4]} <strong>           To time: </strong>${data2[i][5]}</p>
                    <button class="download" id="download">Download Form</button>
                    <p><strong>Status:</strong><strong> Mentor : </strong><span class="status-Napproved">${data2[i][6]}</span><strong> Warden : </strong><span class="status-Napproved">${data2[i][7]}</span></p>
                </div>
            </div>`;
        }
        else if(data2[i][6]=="Approved" && data2[i][7]=="Not Approved")
        {
            document.getElementById("tracker").innerHTML+=
        `<div class="show-track">
                <div class="leave-item">
                    <p><strong>Leave Id: </strong>${data2[i][0]}</p>
                    <p><strong>Purpose: </strong>${data2[i][1]}</p>
                    <p><strong>From date: </strong>${data2[i][2]}<strong>           From time: </strong>${data2[i][3]}</p>
                    <p><strong>To date: </strong>${data2[i][4]} <strong>           To time: </strong>${data2[i][5]}</p>
                    <button class="download" id="download">Download Form</button>
                    <p><strong>Status:</strong><strong> Mentor : </strong><span class="status-Approved">${data2[i][6]}</span><strong> Warden : </strong><span class="status-Napproved">${data2[i][7]}</span></p>
                </div>
            </div>`;
        }
        else if(data2[i][6]=="Approved" && data2[i][7]=="Approved"){
            document.getElementById("tracker").innerHTML+=
        `<div class="show-track">
                <div class="leave-item">
                    <p><strong>Leave Id: </strong>${data2[i][0]}</p>
                    <p><strong>Purpose: </strong>${data2[i][1]}</p>
                    <p><strong>From date: </strong>${data2[i][2]}<strong>           From time: </strong>${data2[i][3]}</p>
                    <p><strong>To date: </strong>${data2[i][4]} <strong>           To time: </strong>${data2[i][5]}</p>
                    <button class="download" id="download">Download Form</button>
                    <p><strong>Status:</strong><strong> Mentor : </strong><span class="status-Approved">${data2[i][6]}</span><strong> Warden : </strong><span class="status-Approved">${data2[i][7]}</span></p>
                    </div>
            </div>`;
        }
    }
}
    loadData();
// Toggle the editability of a specific input field
function toggleEdit(field) {
    var input = document.getElementById(field);
    if(input.readOnly) 
    {
        input.readOnly = false; // Make the input field editable
        input.focus(); // Set focus on the input field
    } 
    else 
    {
        input.readOnly = true; // Make the input field read-only again
    }
}

// Handle form submission: Prevent default behavior and show the confirmation popup
document.getElementById('profile-form').onsubmit = function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    document.getElementById('popup').classList.add('show'); // Display the confirmation popup
};

// Handle the confirm button click: Hide the popup and show the success message
document.getElementById('confirm-btn').onclick = function() {
    document.getElementById('popup').classList.remove('show'); // Hide the confirmation popup
    document.getElementById('success-message').classList.add('show'); // Display the success message
    setTimeout(() => {
        document.getElementById('success-message').classList.remove('show'); // Hide the success message after 3 seconds
    }, 3000);
};

// Handle the cancel button click: Simply hide the confirmation popup
document.getElementById('cancel-btn').onclick = function() {
    document.getElementById('popup').classList.remove('show'); // Hide the confirmation popup
};

// Manually close the success message
function closeSuccessMessage() {
    document.getElementById('success-message').classList.remove('show'); // Hide the success message
}
function generateReceiptHTML() {
    // Create the HTML content for the receipt
    var receiptHTML = `
        <!DOCTYPE html>
<html>
<head>
    <title>Hostel Weekend Out Pass</title>
    <style>
        body {
            text-align: center;
            font-family: Arial, sans-serif;
        }

        .pass {
            border: 2px solid black;
            padding: 20px;
            margin: 20px auto;
            width: 80%;
            max-width: 600px;
        }

        .pass h2 {
            font-size: 24px;
            margin-bottom: 10px;
        }

        .pass p {
            margin-bottom: 5px;
        }

        .pass .details {
            display: flex;
            // justify-content: space-between;
        }
    </style>
</head>
<body>
    <div class="pass">
        <h2>HOSTEL WEEKEND OUT PASS</h2>
        <p>Outing ID: W2167359</p>
        <p>Date: 18-08-2024</p>
        <div class="details">
            <p>1. Regd No : </p>
            <p>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 22BCE7558</p>
        </div>
        <div class="details">
            <p>2. Name : </p>
            <p>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  APPALA PRANAV SAI</p>
        </div>
        <div class="details">
            <p>3. Hostel Block : </p>
            <p>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp MH-4</p>
        </div>
        <div class="details">
            <p>4. Hostel Room No : </p>
            <p>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp 502</p>
        </div>
        <div class="details">
            <p>5. Place Of Visit : </p>
            <p>&nbsp &nbsp &nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp Vijayawada</p>
        </div>
        <div class="details">
            <p>6. Purpose Of Visit : </p>
            <p>&nbsp &nbsp &nbsp &nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp shopping</p>
        </div>
        <div class="details">
            <p>7. Date & Time Slot : </p>
            <p>&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp &nbsp&nbsp &nbsp&nbsp &nbsp 18-08-2024 & 9:30 AM-3:30PM</p>
        </div>
        <div class="details">
            <p>8. Contact No : </p>
            <p>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp 9014456063</p>
        </div>
    </div>
</body>
</html>
        `;

    return receiptHTML;
}
document.getElementById('download').addEventListener('click',function()
{
    var receiptIframe = document.getElementById("receiptIframe");
    receiptIframe.contentWindow.document.open();
    receiptIframe.contentWindow.document.write(generateReceiptHTML());
    receiptIframe.contentWindow.document.close();
    receiptIframe.contentWindow.print();

});

