let submit = document.getElementById('submit');
submit.addEventListener('click', registerUser);

function registerUser(e){
    e.preventDefault();
    // intializing our data
    let username=document.getElementById('username').value;
    let email=document.getElementById('useremail').value;
    let password=document.getElementById('password').value;


    let data = {
        username:username,
        password:password,
        email:email
    };

    fetch('http://127.0.0.1:5000/api/v1/auth/signup',{
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) =>{
            console.log(data);
            if(data['message']==='your account has been created successfully'){
                window.location.replace('../templates/login.html');
            }
            else if( data['message']=== email + 'already taken'){
                document.getElementById('email_error').innerHTML= email+ 'already taken';
                window.location.replace('../templates/signup.html');
            }
            else {
                window.location.replace('../templates/signup.html');
            }
        });

}