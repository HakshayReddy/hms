document.addEventListener("DOMContentLoaded", function() {
    const availableRoomsSection = document.getElementById('availableRoomsSection');
    const allocatedRoomsSection = document.getElementById('allocatedRoomsSection');
    const availableRoomDetailsButton = document.getElementById('available-room-details');
    const allocatedRoomDetailsButton = document.getElementById('allocated-room-details');

    // Hide sections initially
    availableRoomsSection.style.display = 'none';
    allocatedRoomsSection.style.display = 'none';

    // Sample room data
    let roomsData = [
        { number: '101', floor: 'Ground Floor', status: 'available' },
        { number: '102', floor: 'First Floor', status: 'occupied' },
        { number: '103', floor: 'Second Floor', status: 'available' },
        { number: '104', floor: 'Third Floor', status: 'under-maintenance' }, // New under maintenance room
        { number: '105', floor: 'Fourth Floor', status: 'available' },
        { number: '106', floor: 'Fifth Floor', status: 'under-maintenance' }, // Another under maintenance room
    ];

    // Render Available Rooms
    availableRoomDetailsButton.addEventListener('click', function() {
        allocatedRoomsSection.style.display = 'none'; // Hide allocated rooms section
        availableRoomsSection.style.display = 'block'; // Show available rooms section
        renderAvailableRooms();
    });

    // Render Allocated Rooms
    allocatedRoomDetailsButton.addEventListener('click', function() {
        availableRoomsSection.style.display = 'none'; // Hide available rooms section
        allocatedRoomsSection.style.display = 'block'; // Show allocated rooms section
        renderAllocatedRooms();
    });

    // Function to render available rooms
    function renderAvailableRooms() {
        const availableRoomsTable = document.getElementById('availableRoomsTable').getElementsByTagName('tbody')[0];
        availableRoomsTable.innerHTML = ''; // Clear previous entries

        roomsData.filter(room => room.status === 'available').forEach(room => {
            const row = availableRoomsTable.insertRow();
            const roomNumberCell = row.insertCell(0);
            const floorCell = row.insertCell(1);
            roomNumberCell.textContent = room.number;
            floorCell.textContent = room.floor;
        });
    }

    // Function to render allocated rooms
    function renderAllocatedRooms() {
        const allocatedRoomsTable = document.getElementById('allocatedRoomsTable').getElementsByTagName('tbody')[0];
        allocatedRoomsTable.innerHTML = ''; // Clear previous entries

        roomsData.filter(room => room.status === 'occupied').forEach(room => {
            const row = allocatedRoomsTable.insertRow();
            const roomNumberCell = row.insertCell(0);
            const floorCell = row.insertCell(1);
            const studentNameCell = row.insertCell(2);
            const studentIdCell = row.insertCell(3);
            
            roomNumberCell.textContent = room.number;
            floorCell.textContent = room.floor;
            studentNameCell.textContent = "Student Name";  // Placeholder for student name
            studentIdCell.textContent = "Student ID";  // Placeholder for student ID
        });
    }

    // Render room grid dynamically based on room data (for map or visual layout)
    function renderRoomGrid() {
        const roomMap = document.querySelector('.room-map');
        roomMap.innerHTML = ''; // Clear any existing rooms

        roomsData.forEach(room => {
            const roomElement = document.createElement('div');
            roomElement.classList.add('room', room.status); // Apply class based on room status
            roomElement.textContent = room.number; // Display room number
            roomElement.addEventListener('click', () => {
                // Clear selection from all rooms
                document.querySelectorAll('.room').forEach(r => r.classList.remove('selected'));
                roomElement.classList.add('selected'); // Highlight selected room
            });
            roomMap.appendChild(roomElement);
        });
    }

    // Initial rendering of the room grid
    renderRoomGrid();
});
