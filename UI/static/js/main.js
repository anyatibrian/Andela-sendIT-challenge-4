let  parcel_order_modal = document.getElementById('order-parcel-modal');
let update_parcel_Destination_modal= document.getElementById('update-parcel-modal');
let parcel_location_modal = document.getElementById('parcel-location-modal');
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
    fetch(`http://127.0.0.1:5000/api/v1/parcels/${id}`,{
        method:'GET',
        headers:{
            'Application':'application/json, text/plain, */*',
            'Content-type':'application/json',
            Authorization:`Bearer ${token}`
        }
    }).then((response)=>response.json())
        .then(function(data){
            document.getElementById('updateDestination').value =data['parcel_order']['destination'];
        });
    update_parcel_Destination_modal.style.display="block";
}
/* functions to update location and status modal*/
function update_location_modal() {
    parcel_location_modal.style.display ="block"
}
function close_update_modal(){
    parcel_location_modal.style.display="none";
}
/* the user profile modal section*/
let user_profile_modal = document.getElementById('user-profile-modal');
function display_user_profile() {
    user_profile_modal.style.display ="block";
}
function close_profile_modal() {
    user_profile_modal.style.display ="none";
}