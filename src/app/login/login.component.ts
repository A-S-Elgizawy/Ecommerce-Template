import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


loginObj:any={
  email:'',
  password:''
}

constructor(private router:Router){}
  ngOnInit(): void {
    this.Registration()
  }
// login(){
//   // Retrieve users from localStorage
//   const users = JSON.parse(localStorage.getItem('users') || '[]');
//   // Check if the entered email and password match any registered user
//   const user = users.find((u: any) => u.email === this.loginObj.email && u.password === this.loginObj.password);

//   if (user) {
//     alert('Login successfully');
//     this.router.navigateByUrl('/products'); // Redirect to products page
//   } else {
//     alert('Invalid email or password');
//   }
// }
login(): void {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: any) => u.email === this.loginObj.email && u.password === this.loginObj.password );

  if (user) {
    alert('Login successfully');
    this.router.navigateByUrl('/products');
  } else {
    alert('Invalid email or password');
  }
}

signupObj: any = {
  name: '',
  email: '',
  password: ''
};

registerUser(): void {
  if (!this.signupObj.name || !this.signupObj.email || !this.signupObj.password) {
    alert('Please fill in all fields.');
    return;
  }
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // Check if the email is already registered
  const existingUser = users.find((u: any) => u.email === this.signupObj.email);
  if (existingUser) {
    alert('Email is already registered!');
    return;
  }

  users.push(this.signupObj);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('token',"yes resgisterd")

  alert('Account created successfully!');
  const loginBtn = document.querySelector('.login-btn') as HTMLButtonElement;
  loginBtn?.click(); // Trigger the login button click event to switch to the login form
}


Registration(){
  const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const forgetBtn = document.querySelector('.forget-btn');
const loginBtn = document.querySelector('.login-btn');

if (registerBtn) {
    registerBtn.addEventListener('click', () => {
        if (container) {
            container.classList.add('active');
        }
    });
}

if (forgetBtn) {
  forgetBtn.addEventListener('click', () => {
        if (container) {
            container.classList.add('forgotactive');
        }
    });
}

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        if (container) {
            container.classList.remove('active');
            container.classList.remove('forgotactive');
        }
    });
}
}

email: string = '';


resetPassword(): void {
  // Retrieve users from localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // Check if the email exists
  const user = users.find((u: any) => u.email === this.email);

  if (user) {
    // Generate a temporary password (or send a reset link in a real application)
    const tempPassword= user.password ;
    // Update the user in localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert(`Your temporary password is: ${tempPassword}`);
    const loginBtn = document.querySelector('.login-btn') as HTMLButtonElement;
    loginBtn?.click();
    // this.router.navigate(['/login']); // Redirect to login page
  } else {
    alert('Email not found. Please check and try again.');
  }
}
}
