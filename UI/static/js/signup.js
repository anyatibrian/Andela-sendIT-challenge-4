let submit = document.getElementById('submit');
submit.addEventListener('click', registerUser);


function registerUser(e){
    e.preventDefault();
    // intializing our data
    let username=document.getElementById('username').value;
    let email=document.getElementById('useremail').value;
    let password=document.getElementById('password').value;
    // handling form validation
    if(username ===''){
        document.getElementById('name_error').innerText ="please enter your name";
        document.getElementById('name_error').style.color="red";
        return false
    }
    else if(email=== ''){
        document.getElementById('email_error').innerText="please enter your email";
        document.getElementById('email_error').style.color="red";
        return false
    }else if(password === ''){
        document.getElementById('password_error').innerText="please enter your password";
        document.getElementById('email_error').style.color="red";
        return false
    }
    //posting information into the database
    let data = {
        username:username,
        password:password,
        email:email
    };
    fetch("http://127.0.0.1:5000/api/v1/auth/signup",{
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    })
        .then((response) => response.json())
        .then(function(data){
            console.log(data['message']);
            if(data['message']==='your account has been created successfully'){
                alert('you account has been created successfully');
                window.location.replace('../templates/login.html');
            }
            else if( data['message']=== 'email already taken'){
                document.getElementById('email_error').innerHTML=data['message'];
                document.getElementById('email_error').style.color='red';
                return false
            }
            else {
                window.location.replace('../templates/signup.html');
            }
        });

}