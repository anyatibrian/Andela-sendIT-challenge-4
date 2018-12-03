//get the access token in our local storage
let token = localStorage.getItem('access-token');

// function that fetches all the parcel orders
window.onload = function loadAllOrders(e){
    e.preventDefault();
    fetch("http://127.0.0.1:5000/api/v1/admin/parcels", {
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
             output+=`<tr>
                    <td>${parcel_order.serial_no}</td>
                    <td>${parcel_order.receivers}</td>
                    <td>${parcel_order.description}</td>
                    <td>${parcel_order.pickup}</td>
                    <td>${parcel_order.destination}</td>
                    <td>${parcel_order.current_location}</td>
                    <td>${parcel_order.delivery_price}</td>
                    <td>${parcel_order.weight}</td>
                    <td>${parcel_order.status}</td>
                    <td><button  class="button-success" onclick="update_location_modal()">update</button></td>
                    <td><button  class="button-success" onclick="update_location_modal()">update</button></td>
                </tr>`;
          });
          let parcel_orders =document.getElementById('parcel-orders');
          parcel_orders.innerHTML=output
        });
}