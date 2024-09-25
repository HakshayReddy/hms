document.addEventListener('DOMContentLoaded', () => 
    {
        res=true;
        if(res==false)
        {
            // document.body.display = 'none';
            let a=confirm('You have no permission to access this page.');
            if(a)
            {
                window.location.href = "index.html";
            }
            // res=true;
        }
        // else {
        //     document.body.display = 'block'; // Show body content if permission is granted
        // }
    const roomMap = document.querySelector('.room-map');
    const roomNumberInput = document.getElementById('roomNumber');
    const statusSelect = document.getElementById('status');
    const details = document.getElementById('details');
    const roomForm = document.getElementById('roomForm');
    const floorSelect = document.getElementById('floorSelect');
    const floorRooms = {
        1: ['001', '002', '003', '004', '005', '006', '007', '008', '009'],
        2: ['101', '102', '103', '104', '105', '106', '107', '108', '109'],
        3: ['201', '202', '203', '204', '205', '206', '207', '208', '209'],
        4: ['301', '302', '303', '304', '305', '306', '307', '308', '309'],
        5: ['401', '402', '403', '404', '405', '406', '407', '408', '409'],
        6: ['501', '502', '503', '504', '505', '506', '507', '508', '509']
    };

    const singleRooms = ['001', '002', '003', '101', '102', '103', '201', '202', '203', '301', '302', '303', '401', '402', '403', '501', '502', '503'];

    const getRoomType = (room) => {
        return singleRooms.includes(room) ? 'Single' : 'Triple';
    };

    // room-map
    const renderRooms = (floor) => {
        const rooms = floorRooms[floor];
        roomMap.innerHTML = ''; // Clear previous rooms
        rooms.forEach(room => {
            const roomElement = document.createElement('div');
            roomElement.className = `room available`;

            roomElement.dataset.room = room;
            roomElement.textContent = room; // Display room number only in the box
            roomMap.appendChild(roomElement);
        });
    };

    floorSelect.addEventListener('change', (e) => {
        renderRooms(e.target.value);
    });

    roomMap.addEventListener('click', (e) => {
        if (e.target.classList.contains('room')) {
            const selectedRoom = document.querySelector('.room.selected');
            if(selectedRoom)
            {
                selectedRoom.classList.remove('selected');
                document.getElementById("sel").innerHTML="";
            } 
            e.target.classList.add('selected');

            const roomNumber = e.target.dataset.room;
            // const roomType = getRoomType(roomNumber);
            // roomNumberInput.value = `${roomNumber} (${roomType} Room)`;
            roomNumberInput.value = `${roomNumber}`;

            // Set the status select box to the room's current status
            statusSelect.value = e.target.classList.contains('available') ? 'available' : 'occupied';
        }
    });

    roomForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const roomNumber = roomNumberInput.value;
        const status = statusSelect.value;
        if (roomNumber && status) {
            const selectedRoom = document.querySelector(`.room[data-room="${roomNumber}"]`);
            if (selectedRoom) {
                selectedRoom.classList.remove('available', 'occupied');
                selectedRoom.classList.add(status);
            }
            showNotification(`Room ${roomNumber} updated to ${status} .`);
        } else {
            alert('Please select a room and status.');
        }
    });
    renderRooms(1);
    function def()
    {
        for(let i=1;i<6;i++)
            {
                details.innerHTML +=`<div class="childDetails" id="childDetails}">
            <div class="chdetails">
                <label for="student-id" id="stud-id">Student ${i} Id:</label>
                <input type="text" id="student${i}-id">
            </div>
            <div class="child">
                <label for="mess-type" id="mess-type">Mess Type:</label>
                <select id="type${1}" width="1fr">
                <option id="special-mess" value="1">Special Mess</option>
                <option id="nv-mess" value="2">Non Veg Mess</option>
                <option id="v-mess" value="3">Veg Mess</option>
            </select>
            </div>
        </div>`;
            }
            document.getElementById("student1-id").readOnly = true;
    }
    def()
    function showNotification(message) 
    {
        const notification = document.createElement('div');
        notification.className = 'notification-popup';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }, 3000);
    }
});
