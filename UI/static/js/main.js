let  parcel_order_modal = document.getElementById('order-parcel-modal');
let update_parcel_Destination_modal= document.getElementById('update-parcel-modal');
let parcel_location_modal = document.getElementById('parcel-location-modal');
let parcel_status_modal = document.getElementById('parcel-status-modal');
function display_add_parcel_order() {
    parcel_order_modal.style.display = "block";
}
/* function to close the order parcel modal*/
function close_modal() {
    parcel_order_modal.style.display ="none";
    update_parcel_Destination_modal.style.display="none";
    parcel_location_modal.style.display ="none"

}
/* function update Delivery Modal */
function update_parcel_order(id){
    localStorage.setItem('parcel_id',id);
    fetch(`https://sendit-challenge-three.herokuapp.com/api/v1/parcels/${id}`,{
        method:'GET',
        headers:{
            'Application':'application/json, text/plain, */*',
            'Content-type':'application/json',
            Authorization:`Bearer ${token}`
        }
    }).then((response)=>response.json())
        .then(function(data){
            document.getElementById('updateDestination').value =data['parcel_order']['destination'];
            let parcel_id = parseInt(data['parcel_order']['parcel_id']);
            localStorage.setItem('parcel_id', parcel_id);
        });
    update_parcel_Destination_modal.style.display="block";
}
/* functions to update location and status modal*/
function update_location_modal(id){
    localStorage.setItem('admin_parcel_id', id);
    parcel_location_modal.style.display ="block"
}

/* function that updates the parcel delivery status */
function update_status_modal(id){
    localStorage.setItem('admin_status_id', id);
    parcel_status_modal.style.display='block';
}
function close_update_modal(){
    parcel_location_modal.style.display="none";
    parcel_status_modal.style.display="none";
}
/* the user profile modal section*/
let user_profile_modal = document.getElementById('user-profile-modal');
function display_user_profile() {
    // the function that fetches a specific user profile info
    fetch("https://sendit-challenge-three.herokuapp.com/api/v1/auth/profiles",{
        method:'GET',
        headers:{
            'Content-type':'application/json',
            Authorization:`Bearer ${token}`
        }
    }).then((response)=>response.json())
        .then(function(data){
            document.getElementById('Transit').innerText=data['Transit']['count'];
            document.getElementById('Delivered').innerText=data['delivered']['count'];
            document.getElementById('canceled').innerText=data['canceled']['count'];
            document.getElementById('Pending').innerText=data['pending']['count'];
            document.getElementById('total').innerText=data['total'];
        });
    user_profile_modal.style.display ="block";
}
function close_profile_modal() {
    user_profile_modal.style.display ="none";
}

// function that enables us to search through our product lists
