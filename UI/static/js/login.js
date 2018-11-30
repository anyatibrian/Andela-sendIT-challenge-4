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
    fetch("http://127.0.0.1:5000/api/v1/auth/login",{
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    }).then((response)=>response.json())
        .then((data)=>{
            document.getElementById('login_error').innerText=data['message'];
            document.getElementById('login_error').style.color='white';
            if (data['access-token']){
                window.location.replace('../templates/parcelOrder.html');
            }
    });
}