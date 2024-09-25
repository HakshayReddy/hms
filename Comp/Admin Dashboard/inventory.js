// Inventory data array
let inventoryItems = [];

// Save Inventory Item
document.getElementById('inventoryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const itemName = document.getElementById('itemName').value;
    const itemQuantity = document.getElementById('itemQuantity').value;
    const itemStatus = document.getElementById('itemStatus').value;

    const newItem = {
        id: inventoryItems.length + 1, // Simple ID assignment
        name: itemName,
        quantity: parseInt(itemQuantity), // Ensure quantity is a number
        status: itemStatus
    };

    // Add new item to the inventory list
    inventoryItems.push(newItem);

    // Reset form
    document.getElementById('inventoryForm').reset();

    // Update inventory table
    displayInventory();
});

// Display Inventory
function displayInventory() {
    const inventoryTableBody = document.querySelector("#inventoryTable tbody");
    inventoryTableBody.innerHTML = ""; // Clear existing entries

    inventoryItems.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.status}</td>
            <td>
                <button onclick="editInventoryItem(${item.id})">Edit</button>
                <button class="remove-button" onclick="removeInventoryItem(${item.id})">Remove</button>
            </td>
        `;
        inventoryTableBody.appendChild(row);
    });

    checkLowInventory();
}

// Edit Inventory Item (basic functionality)
function editInventoryItem(itemId) {
    const item = inventoryItems.find(i => i.id === itemId);
    if (item) {
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemQuantity').value = item.quantity;
        document.getElementById('itemStatus').value = item.status;

        // Remove item and save the edited version
        removeInventoryItem(itemId);
    }
}

// Remove Inventory Item
function removeInventoryItem(itemId) {
    inventoryItems = inventoryItems.filter(item => item.id !== itemId);
    displayInventory(); // Update table after removal
}

// Check and alert for low inventory items
function checkLowInventory() {
    inventoryItems.forEach(item => {
        if (item.quantity <= 5) {
            alert(`Low stock on item: ${item.name}`);
        }
    });
}
