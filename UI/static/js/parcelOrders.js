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
            'Application':'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        Authorization:`Bearer ${token}`
    }).then((response)=> response.json())
        .then(function (data){
            alert(data['message']);
        });
}