//get the access token in our local storage
let token = localStorage.getItem('access-token');

// function that fetches all the parcel orders
window.onload = function loadAllOrders(){
    fetch("https://sendit-challenge-three.herokuapp.com/api/v1/admin/parcels", {
        method:'GET',
        headers:{
            'Content-type':'application/json',
            Authorization:`Bearer ${token}`
        },
    }).then((response)=>response.json())
        .then(function(data){
            let output=` <div class="col-11">
            <table id="myTable">
                <tr class="header">
                    <th style="width:10%;">Serial No.</th>
                    <th style="width:10%;">Receiver</th>
                    <th style="width:30%;">Description</th>
                    <th style="width:10%;">Pick up</th>
                    <th style="width:10%;">Destination</th>
                    <th style="width:10%;">Location</th>
                    <th style="width:10%;">Price</th>
                    <th style="width:10%;">Weight</th>
                    <th style="width:10%;">status</th>
                    <th style="width:15%;">location</th>
                    <th style="width:15%;">status </th>
                </tr>`;
          data['parcel_orders'].forEach(function (parcel_order){
              let parcel_id = parcel_order.parcel_id;
             output+=`<tr>
                    <td>${parcel_order.serial_no}</td>
                    <td>${parcel_order.receivers}</td>
                    <td>${parcel_order.description}</td>
                    <td>${parcel_order.pickup}</td>
                    <td>${parcel_order.destination}</td>
                    <td>${parcel_order.current_location}</td>
                    <td>${parcel_order.delivery_price}</td>
                    <td>${parcel_order.weight}kgs</td>
                    <td>${parcel_order.status}</td>
                    <td><button  class="button-success" onclick="update_location_modal(${parcel_id})">update</button></td>
                    <td><button  class="button-success" onclick="update_status_modal(${parcel_id})">update</button></td>
                </tr>`;
          });
          let parcel_orders =document.getElementById('parcel-orders');
          parcel_orders.innerHTML=output
        });
}

// update the current location of parcel delivery order
let update_location = document.getElementById('update-location');
update_location.addEventListener('click', updateCurrentLocation);

function updateCurrentLocation(e){
    e.preventDefault();
    let id = localStorage.getItem('admin_parcel_id');
    let current_location = document.getElementById('current_location').value;
    if(current_location==''){
        document.getElementById('update-info').innerText = 'current location field is empty';
        return false
    }
    let data = {
        current_location:current_location
    };
    fetch(`https://sendit-challenge-three.herokuapp.com/api/v1/parcels/${id}/presentLocation`, {
        method:'PUT',
        headers:{
            'Application':'application/json, text/plain,*/*',
            'Content_type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(data)
    }).then((response)=>response.json())
        .then(function(data){
            if(data['message']=== 'present location successfully updated'){
                document.getElementById('update-info').innerText = data['message'];
                window.location.replace('../templates/adminParcel.html');
            }
        });
}

// update the status of the parcel delivery orders
let update_parcel_status = document.getElementById('update-status');

update_parcel_status.addEventListener('click', updateParcelStatus);
function updateParcelStatus(e){
    e.preventDefault();
    let status = document.getElementById('current_status').value;
    let id = localStorage.getItem('admin_status_id');
    if(status===''){
        document.getElementById('status-update').innerText='status field is empty';
        return false
    }
    let data = {
        status:status
    };
    fetch(`https://sendit-challenge-three.herokuapp.com/api/v1/parcels/${id}/status`,{
        method:'PUT',
        headers:{
            'Application':'application/json, text/plain,*/*',
            'Content_type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(data)
    }).then((response)=>response.json())
        .then(function(data){
            if(data['message']=== 'status has been successfully updated'){
                document.getElementById('status-update').innerText= data['message'];
                window.location.replace('../templates/adminParcel.html');
            }else {
                document.getElementById('status-update').innerText= data['error'];
                return false
            }
        });
}