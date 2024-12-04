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
import { CommonService } from '../../Core/Services/Common/common.service';


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
  buttonName: string = 'Add';

  countryData: any[] = [];
  stateData: any[] = [];
  districtData: any[] = [];
  talukaData: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReusableDialogsComponent>,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.fields = this.data.fields;

    // Initialize form
    const formGroupConfig: any = {};
    this.fields.forEach((field) => {
      const validations = [];
      if (field.required) {
        validations.push(Validators.required);
      }
      if (field.inputType === 'email') {
        validations.push(Validators.email);
      }
      if (field.inputType === 'mobileNumber') {
        validations.push(Validators.pattern('^[0-9]{10}$'));
      }
      formGroupConfig[field.name] = ['', validations];
    });

    this.dialogForm = this.fb.group(formGroupConfig);

    if (this.data.elements) {
      this.buttonName = 'Update';
      this.dialogForm.patchValue(this.data.elements);
    }

    this.loadCountries();
    this.setupListeners();
  }

  loadCountries(): void {
    this.countryData = this.commonService.getAllCountries().map((country) => ({
      label: country.name,
      value: country.value,
    }));
  }

  loadStates(countryValue: string): void {
    this.stateData = this.commonService.getStatesByCountry(countryValue).map((state) => ({
      label: state.name,
      value: state.value,
    }));
  }

  loadDistricts(stateValue: string): void {
    debugger;
    this.districtData = this.commonService.getDistrictsByState(stateValue).map((district:any) => ({
      label: district.name,
      value: district.value,
    }));
  }

  loadTalukas(districtValue: string): void {
    this.talukaData = this.commonService.getTalukasByDistrict(districtValue).map((taluka:any) => ({
      label: taluka.name,
      value: taluka.value,
    }));
  }

  setupListeners(): void {
    this.dialogForm.get('country')?.valueChanges.subscribe((countryValue) => {
      this.loadStates(countryValue);
      this.dialogForm.get('state')?.reset();
      this.dialogForm.get('destrict')?.reset();
      this.dialogForm.get('taluka')?.reset();
    });

    this.dialogForm.get('state')?.valueChanges.subscribe((stateValue) => {
      this.loadDistricts(stateValue);
      this.dialogForm.get('destrict')?.reset();
      this.dialogForm.get('taluka')?.reset();
    });

    this.dialogForm.get('district')?.valueChanges.subscribe((districtValue) => {
      this.loadTalukas(districtValue);
      this.dialogForm.get('taluka')?.reset();
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  
}
