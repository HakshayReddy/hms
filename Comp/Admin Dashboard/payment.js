document.getElementById('fetchInvoices').addEventListener('click', function() {
    console.log('Fetching all invoices...');  // Added for debugging

    fetch('/api/invoices')  // Replace with your actual API URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Invoices fetched successfully:', data);  // Log fetched data

            const tableBody = document.querySelector('.payment-table tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            data.forEach(invoice => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${invoice.studentId}</td>
                    <td>${invoice.description}</td>
                    <td>₹${invoice.amount}</td>
                    <td>₹${invoice.paidAmount}</td>
                    <td>₹${invoice.remainingAmount}</td>
                    <td>${invoice.lastPaymentDate}</td>
                    <td>
                        <a href="updatepayment.html" class="update-button">Update</a>
                        <a href="acceptpayment.html" class="accept-button">Accept Payment</a>
                    </td>
                `;
                tableBody.appendChild(newRow);
            });
        })
        .catch(error => {
            console.error('Error fetching invoices:', error);  // Added error handling
            alert('Failed to fetch invoices. Please check your connection or try again later.');
        });
});
