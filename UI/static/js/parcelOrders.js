let create_orders=document.getElementById('submit');
//get the access token in our local storage
let token = localStorage.getItem('access-token');


create_orders.addEventListener('click', createParcelOrders);

function createParcelOrders(e) {
    e.preventDefault();

    let recieversName = document.getElementById('recname').value;
    let percelDesc = document.getElementById('parcelDesc').value;
    let pickup = document.getElementById('pickup').value;
    let destination=document.getElementById('destination').value;
    let weight =parseInt(document.getElementById('weight').value);


    // setting the data to be posted
    let data ={
        receivers_name:recieversName,
        destination:destination,
        description:percelDesc,
        pickup:pickup,
        weight:weight
    };

    //posting parcel orders
    fetch("http://127.0.0.1:5000/api/v1/parcels",{
        method:'POST',
        headers:{
            'Application':'application/json, text/plain,*/*',
            'Content_type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(data)
    })
        .then((response)=> response.json())
        .then(function(data){
            // showing respective errors to the users
            document.getElementById('order_errors').innerHTML= data['errors'];
           if(data['message']==='parcel order created successfully'){
               document.getElementById('order_errors').innerHTML= data['message'];
               window.location.replace('../templates/parcelOrder.html');
           }
    });
}


// fetch all the parcels of a specific user
window.onload = function loadParcelOrders(){
    fetch("http://127.0.0.1:5000/api/v1/parcels",{
        method:'GET',
        headers:{
            'Content-type':'application/json',
            Authorization:`Bearer ${token}`
        },
    }).then((response)=> response.json())
        .then(function (data){
            if(data['parcel_orders']){
                let output =`<table id="myTable">
                <tr class="header">
                    <th style="width:10%;">Serial No.</th>
                    <th style="width:10%;">Receiver</th>
                    <th style="width:30%;">Description</th>
                    <th style="width:10%;">Pick up</th>
                    <th style="width:10%;">Destination</th>
                    <th style="width:15%;">Current location</th>
                    <th style="width:10%;">Price</th>
                    <th style="width:10%;">Status</th>
                    <th style="width:15%;">Delivery </th>
                </tr>`;
                data['parcel_orders'].forEach(function (parcelorder){
                    let parcel_id =parcelorder.parcel_id;
                    output+=`<tr>
                    <td>${parcelorder.serial_no}</td>
                    <td>${parcelorder.receivers}</td>
                    <td>${parcelorder.description}</td>
                    <td>${parcelorder.pickup}</td>
                    <td>${parcelorder.destination}</td>
                    <td>${parcelorder.current_location}</td>
                    <td>${parcelorder.delivery_price}</td>
                    <td><span id="order-status" onclick="updateStatus(${parcel_id})">${parcelorder.status}</span></td>
                    <td><button  class="button-success" onclick="update_parcel_order(${parcel_id})">update</button></td>
                </tr>`;
                });
                document.getElementById('parcels_content').innerHTML=output;
            }else{
                document.getElementById('parcels_content').style.color="red";
                document.getElementById('parcels_content').innerHTML=`<h2>${data['errors']}</h2>`;
            }
        });
}


// update parcel destination
let update_destination= document.getElementById('updateCurrentDestination');
update_destination.addEventListener('click', updateParcelDestination);

// the function for updating the parcel orders
function updateParcelDestination(e){
    e.preventDefault();
    let update_destination = document.getElementById('updateDestination').value;
    let parcel_id = parseInt(localStorage.getItem('parcel_id'));
    alert(parcel_id);
    let data = {
        destination:update_destination
    };
    fetch(`http://127.0.0.1:5000/api/v1/parcels/${parcel_id}/destination`,{
        method:'PUT',
        headers:{
            'Application':'application/json, text/plain,*/*',
            'Content_type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(data)
    }).then((response)=>response.json())
        .then(function (data){
            alert(data['message']);
            window.location.replace('../templates/parcelOrder.html');
        });
}
// updating the parcel order status
function updateStatus(parcel_id){
    let data = {
        status:'canceled'
    };
    fetch(`http://127.0.0.1:5000/api/v1/parcels/${parcel_id}`,{
        method:'PUT',
        headers:{
            'Application':'application/json, text/plain,*/*',
            'Content_type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(data)
    }).then((response)=>response.json())
        .then(function (data){
            alert(data['message']);
            if(data['message']==='status has been successfully updated'){
                document.getElementById('order-status').style.color='red';
            }
            window.location.replace('../templates/parcelOrder.html');
        });
}