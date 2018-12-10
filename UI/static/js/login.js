let login_btn = document.getElementById('login');
login_btn.addEventListener('click', loginUser);

function loginUser(e){
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password =document.getElementById('password').value;

    let data={
        username:username,
        password:password
    };
    fetch("https://sendit-challenge-three.herokuapp.com/api/v1/auth/login",{
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    }).then((response)=>response.json())
        .then((data)=>{

            if (data['access-token']=== data['access-token'] && username =='admin'){
                window.location.replace('../templates/adminParcel.html');
                let token = data['access-token'];

               // storing our data locally in the browser
               localStorage.setItem('access-token', token);
               localStorage.setItem('logged-in-user', username);

            }else if (data['access-token']){
                document.getElementById('login_error').innerText=data['message'];
                document.getElementById('login_error').style.color='white';

                window.location.replace('../templates/parcelOrder.html');
                //storing our data locally in the browser
                let token = data['access-token'];
                localStorage.setItem('access-token', token);
                localStorage.setItem('logged-in-user', username);

            }else{
                document.getElementById('login_error').innerText=data['message'];
                document.getElementById('login_error').style.color='white';
                // redirect the user to the sign up page
                window.location.replace('../templates/signup.html');
               return false
            }
    });
}


// the function that logs a user out

document.getElementById('logout').addEventListener('click', logout);
function logout(){
    alert('hi there');
    localStorage.removeItem('access-token');
    localStorage.removeItem('logged-in-user');
    localStorage.removeItem('parcel_id');
    window.location.replace('../templates/login.html');
}

