document.getElementById('fetchDetails').addEventListener('click', function() {
    const complaintId = document.getElementById('complaintId').value;

    // Simulate fetching data from a database
    const mockDatabase = {
        '101': { description: 'Leaking faucet in room 202', timestamp: '2024-09-15 10:00 AM' },
        '102': { description: 'Power outage in wing A', timestamp: '2024-09-16 12:30 PM' },
        // Add more mock complaints as needed
    };

    const issueDetails = mockDatabase[complaintId];

    if (issueDetails) {
        document.getElementById('issueDescription').innerText = issueDetails.description;
        document.getElementById('issueTimestamp').innerText = issueDetails.timestamp;
        document.getElementById('issueDetails').style.display = 'block';
    } else {
        alert('No details found for this Complaint ID.');
    }
});

document.getElementById('printIssue').addEventListener('click', function() {
    const description = document.getElementById('issueDescription').innerText;
    const timestamp = document.getElementById('issueTimestamp').innerText;

    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print Issue</title></head><body>');
    printWindow.document.write('<h2>Issue Details</h2>');
    printWindow.document.write('<p><strong>Description:</strong> ' + description + '</p>');
    printWindow.document.write('<p><strong>Timestamp:</strong> ' + timestamp + '</p>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
});
