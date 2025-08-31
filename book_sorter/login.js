document.getElementById('login-form').addEventListener('submit', async(e)=> {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  if(!email || !password){
    alert("❌ Please enter email and password");
    return;
  }
  try{
    const response=await fetch('http://localhost:5000/api/auth/login',{
        method:'post',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({email,password})
    });

    const data=await response.json();
    alert(data.message);
    if(response.ok){
        localStorage.setItem('userEmail',email);
        localStorage.setItem('username',data.name || email.split("@")[0]);
        window.location.href = 'http://127.0.0.1:5500/booklyn.html';

    }
  }
  catch(error){
    alert("Please try again later.");
    console.error("Login error:",error);
  }
});
window.onload = function () {
  const userEmail = localStorage.getItem('userEmail');
  const signinBtn = document.getElementById('signin-btn');
  if (userEmail && signinBtn) {
    signinBtn.innerText = "👋 Hi, " + userEmail.split("@")[0];
    signinBtn.disabled = true;
  }
};
