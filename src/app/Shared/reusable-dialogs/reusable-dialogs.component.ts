import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-reusable-dialogs',
  standalone: true,
  imports: [MatFormFieldModule,ReactiveFormsModule,CommonModule,MatSelectModule,MatDialogModule, MatInputModule,MatButtonModule,MatCardModule,FlexLayoutModule,MatDatepickerModule],
  templateUrl: './reusable-dialogs.component.html',
  styleUrl: './reusable-dialogs.component.css'
})
export class ReusableDialogsComponent {
  dialogForm!: FormGroup;
  title!: string;
  fields: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReusableDialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {  
    
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.fields = this.data.fields;
    const formGroupConfig: any = {};

    this.fields.forEach(field => {
      const validations = [];
      if (field.required) {
        validations.push(Validators.required);
      }
      if (field.inputType === 'email') {
        validations.push(Validators.email);
      }

      if(field.inputType === 'mobileNumber'){
        validations.push(Validators.pattern('^[0-9]{10}$'));
      }

      formGroupConfig[field.name] = ['', validations];
    });

    this.dialogForm = this.fb.group(formGroupConfig);

    if (this.data.formValues) {
      this.dialogForm.patchValue(this.data.formValues);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
