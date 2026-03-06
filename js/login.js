const loginBtn = document.getElementById('login-btn') ; 
console.log(loginBtn) ; 

loginBtn.addEventListener('click' , ()=>{
    const name = document.querySelector('#name').value ; 
    const pass = document.querySelector('#pass').value ; 

    console.log(name) ; 
    console.log(pass) ; 
        if(name === "admin" && pass === "admin123"){
            window.location.href = "./home.html" ; 
        }
        else{
            alert(`invalid credentials !!! 
                Username : admin 
                Password : admin123` ) ; 
        }
})