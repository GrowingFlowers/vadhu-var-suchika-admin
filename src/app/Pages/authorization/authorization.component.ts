import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [MatCardModule,MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule,CommonModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.css'
})
export class AuthorizationComponent implements OnInit {
  searchForm!: FormGroup;
  userFound: boolean = false;

  constructor(private fb: FormBuilder) {
    
  }


  ngOnInit(): void {
    this.searchForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }
  onSearch() {
    if (this.searchForm.valid) {
      const mobileNumber = this.searchForm.get('mobileNumber')?.value;
      // Logic to search user by mobile number
      this.userFound = true; // Set this to true if user is found
    }
  }

  makeAgent() {
    // Logic to make user an agent
    console.log('Making user an agent');
  }

  makeProfileVerifier() {
    // Logic to make user a profile verifier
    console.log('Making user a profile verifier');
  }

  removeAgent() {
    // Logic to remove agent role
    console.log('Removing user as agent');
  }

  removeProfileVerifier() {
    // Logic to remove profile verifier role
    console.log('Removing user as profile verifier');
  }
}
