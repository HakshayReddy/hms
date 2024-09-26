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
    const roomtype = document.getElementById('roomtype');
    let numstudents;
    const floorRooms = {
    '1' : [],
    '11' : ['001', '003', '005', '007', '009'],
    '21' : ['102', '104', '106', '108'],
    '12' : ['002', '004', '006', '008'],
    '22' : ['101', '103', '105', '107', '109'],
    '33' : ['201', '203', '205', '207', '209'],
    '43' : ['302', '304', '306', '308'],
    '34' : ['202', '204', '206', '208'],
    '44' : ['301', '303', '305', '307', '309'],
    '55' : ['401', '403', '405', '407', '409'],
    '65' : ['502', '504', '506', '508'],
    '56' : ['402', '404', '406', '408'],
    '66' : ['501', '503', '505', '507', '509'],
    '712' : ['601', '602', '603', '604', '606', '607', '608', '609', '605']
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
    def()
    };
    
    floorSelect.addEventListener('click', (e) => {
        if(e.target.value==1 || e.target.value==2)
        {
            roomtype.innerHTML=`<option value="1">2 Bed NAC</option>
                <option value="2">2 Bed AC</option>`;

            if(roomtype.value==1)
            {
                numstudents=2;
            }
            else{
                numstudents=2;

            }
        }
        else if(e.target.value==3 || e.target.value==4)
        {
            roomtype.innerHTML=`<option value="3">4 Bed NAC</option>
                <option value="4">4 Bed AC</option>`;

            if(roomtype.value==3)
            {
                numstudents=4;
            }
            else{
                numstudents=4;

            }
        }
        else if(e.target.value==5 || e.target.value==6)
        {
            roomtype.innerHTML=`<option value="5">5 Bed Apartment NAC</option>
                <option value="6">5 Bed Apartment AC</option>`;
            
            if(roomtype.value==5)
            {
                numstudents=5;
            }
            else{
                numstudents=5;

            }
        }
        else if(e.target.value==7){
            roomtype.innerHTML=`<option value="12">12 Dorms NAC</option>`;
            numstudents=12;
        }
    });
    roomtype.addEventListener('click', (e) => {
        renderRooms(floorSelect.value+e.target.value);
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
    function def()
    {
        details.innerHTML="";
        for(let i=1;i<=numstudents;i++)
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
