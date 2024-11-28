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
  countryData: any[] = [];
  stateData: any[] = [];
  districtData: any[] = [];
  talukaData: any[] = [];
  buttonName:string = 'Add';
  bindData:any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReusableDialogsComponent>,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {

    this.title = this.data.title;
    this.fields = this.data.fields;
   
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
      const addressData = this.data.elements.addressVO;

      this.bindData  = {...this.data.elements}

      if (addressData) {
        Object.keys(addressData).forEach((key) => {
          // If there's a corresponding form field for address data, patch it
          if (this.dialogForm.contains(key)) {
            this.bindData[key] = addressData[key];
          } else {
            // If the address data has fields not in the form, add them dynamically
            const addressFieldName = `${key}`;
            this.bindData[addressFieldName] = addressData[key];
          }
        });
      }
      //this.dialogForm.patchValue(this.data.elements);
      this.dialogForm.patchValue(this.bindData);
      //this.dialogForm.patchValue(this.data.elements);
    }

    this.loadCountries();
    this.setupListeners();
  }
  
  // Load countries from the common service
  loadCountries(): void {
    console.log('Country Patch: ',this.bindData);
    const countryData = this.commonService.getAllData();
    this.countryData = countryData.map((country) => ({
      label: country.name,
      value: country.value,
    }));

    const countryField = this.fields.find((field) => field.name === 'country');
    if (countryField) {
      countryField.options = this.countryData;
    }

    this.dialogForm.patchValue({
      country: this.bindData.country
    });
  }

  // Set up listeners for cascading dropdowns
  setupListeners(): void {
    this.dialogForm.get('country')?.valueChanges.subscribe((countryValue) => {
      this.loadStates(countryValue);
      this.dialogForm.get('state')?.reset();
      this.dialogForm.get('district')?.reset();
      this.dialogForm.get('taluka')?.reset();
    });

    this.dialogForm.get('state')?.valueChanges.subscribe((stateValue) => {
      this.loadDistricts(stateValue);
      this.dialogForm.get('district')?.reset();
      this.dialogForm.get('taluka')?.reset();
    });

    this.dialogForm.get('district')?.valueChanges.subscribe((districtValue) => {
      this.loadTalukas(districtValue);
      this.dialogForm.get('taluka')?.reset();
    });
  }

  // Load states based on the selected country
  loadStates(countryValue: string): void {

    const countryData = this.commonService.getAllData();
    const selectedCountry = countryData.find(
      (country) => country.value === countryValue
    );
    const stateField = this.fields.find((field) => field.name === 'state');
    if (stateField && selectedCountry) {
      this.stateData = selectedCountry.states.map((state) => ({
        label: state.name,
        value: state.value,
      }));
    }
  }

  // Load districts based on the selected state
  loadDistricts(stateValue: string): void {
    const countryData = this.commonService.getAllData();
    const selectedCountry = countryData.find((country) =>
      country.states.find((state) => state.value === stateValue)
    );
    const selectedState = selectedCountry?.states.find(
      (state) => state.value === stateValue
    );

    const districtField = this.fields.find((field) => field.name === 'district');
    if (districtField && selectedState) {
      this.districtData = selectedState.districts.map((district) => ({
        label: district.name,
        value: district.name,
      }));
    }
  }

  // Load talukas based on the selected district
  loadTalukas(districtValue: string): void {
    const countryData = this.commonService.getAllData();
    const selectedCountry = countryData.find((country) =>
      country.states.find((state) =>
        state.districts.find((district) => district.name === districtValue)
      )
    );
    const selectedState = selectedCountry?.states.find((state) =>
      state.districts.find((district) => district.name === districtValue)
    );
    const selectedDistrict = selectedState?.districts.find(
      (district) => district.name === districtValue
    );

    const talukaField = this.fields.find((field) => field.name === 'taluka');
    if (talukaField && selectedDistrict) {
      this.talukaData = selectedDistrict.talukas.map((taluka) => ({
        label: taluka.name,
        value: taluka.name,
      }));
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
