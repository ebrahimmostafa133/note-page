import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  registerForm!: FormGroup;
  loading = false;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$'),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^(01)[0-9]{9}$'),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(10),
        Validators.max(100),
      ]),
    });
  }

  submitForm() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.authService.registerForm(this.registerForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          this.toastr.success('Account created successfully 🎉', 'Success');
          this.registerForm.reset();
          this.router.navigate(['/signin']);
        },
        error: (err) => {
          this.loading = false;
          this.toastr.error(err?.error?.message || 'Something went wrong 😥', 'Error');
          console.error(err);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
      this.toastr.warning('Please fill all fields correctly ⚠️', 'Validation');
    }
  }
}
