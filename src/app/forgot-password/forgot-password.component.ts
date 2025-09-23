import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  email: string = '';

  constructor(private router: Router) {}

  resetPassword(): void {
    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if the email exists
    const user = users.find((u: any) => u.email === this.email);

    if (user) {
      // Generate a temporary password (or send a reset link in a real application)
      // const tempPassword = Math.random().toString(36).slice(-8);
      // user.password = tempPassword
      const tempPassword= user.password ;
      // Update the user in localStorage
      localStorage.setItem('users', JSON.stringify(users));

      alert(`Your temporary password is: ${tempPassword}`);
      this.router.navigate(['/login']); // Redirect to login page
    } else {
      alert('Email not found. Please check and try again.');
    }
  }
}
