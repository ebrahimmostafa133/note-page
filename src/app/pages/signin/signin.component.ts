import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  loginForm!: FormGroup;
  loading = false;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.loginForm(this.loginForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          localStorage.setItem('token','3b8ny__' + response.token);
          this.toastr.success('Login successful ✅');
          this.router.navigate(['/notes']); 
        },
        error: (err) => {
          this.loading = false;
          this.toastr.error(err.error?.message || 'Login failed ❌');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
