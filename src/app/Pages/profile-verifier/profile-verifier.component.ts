import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../Shared/table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { ReusableDialogService } from '../../Core/Services/Dialog/reusable-dialog.service';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { dataRequestResult } from '../../Core/Interfaces/dataRequest';
import { Users } from '../../Core/Interfaces/Users';
import { UserService } from '../../Core/Services/Users/User.service';


interface TableColumn {
  key: string;
  displayName: string;
}


@Component({
  selector: 'app-profile-verifier',
  standalone: true,
  imports: [TableComponent, MatButtonModule],
  templateUrl: './profile-verifier.component.html',
  styleUrl: './profile-verifier.component.css'
})
export class ProfileVerifierComponent implements OnInit {
  profileForm!: FormGroup;

  displayedColumns: TableColumn[] = [
    { key: 'firstName', displayName: 'First Name' },
    { key: 'lastName', displayName: 'Last Name' },
    { key: 'mobileNumber', displayName: 'Mobile No' },
    { key: 'addressVO.city', displayName: 'City' },
    { key: 'addressVO.taluka', displayName: 'Taluka' },
    { key: 'createdDate', displayName: 'Joining Date' },

  ];
  displayedColumnKeys = this.displayedColumns.map(column => column.key);

  profileVerifyList: Users[] = [];

  public fields: any[] = [
    {
      name: 'firstName', label: 'First Name', type: 'input', inputType: 'text', placeholder: 'Enter your first name',
      FormControlName: 'firstName',
      required: true
    },
    {
      name: 'lastName', label: 'Last Name', type: 'input', inputType: 'text', placeholder: 'Enter your last name',
      FormControlName: 'lastName',
      required: true
    },
    {
      name: 'mobileNumber', label: 'Mobile Number', type: 'input', inputType: 'text', placeholder: 'Enter your mobile number',
      FormControlName: 'mobileNumber',
      required: true
    },
    {
      name: 'type', label: 'Type', type: 'input', inputType: 'text', placeholder: 'Enter Type', value: 'PROFILE_VERIFIER',
      FormControlName: 'type',
      required: true
    },

    {
      name: 'address1', label: 'Address Line 1', type: 'textarea', inputType: 'textarea', placeholder: 'Enter address',
      FormControlName: 'addressVO.contact1',
      required: true
    },
    {
      name: 'address2', label: 'Address Line 2', type: 'textarea', inputType: 'textarea', placeholder: 'Enter address',
      FormControlName: 'addressVO.address2',
      required: true
    },
    {
      name: 'area', label: 'Area', type: 'input', inputType: 'text', placeholder: 'Enter address',
      FormControlName: 'addressVO.area',
      required: true
    },

    {
      name: 'city', label: 'City', type: 'input', inputType: 'text', placeholder: 'Enter address',
      FormControlName: 'addressVO.city',
      required: true
    },
    {
      name: 'contact1', label: 'contact1', type: 'input', inputType: 'text', placeholder: 'Enter address',
      FormControlName: 'addressVO.contact1',
      required: true
    },
    {
      name: 'contact2', label: 'contact2', type: 'input', inputType: 'text', placeholder: 'Enter address',
      FormControlName: 'addressVO.contact2',
      required: true
    },
    {
      name: 'destrict', label: 'destrict', type: 'input', inputType: 'text', placeholder: 'Enter address',
      FormControlName: 'addressVO.destrict',
      required: true
    }, {
      name: 'pinCode', label: 'pinCode', type: 'input', inputType: 'text', placeholder: 'Enter address',
      FormControlName: 'addressVO.pinCode',
      required: true
    }, {
      name: 'country', label: 'country', type: 'input', inputType: 'text', placeholder: 'Enter address',
      FormControlName: 'addressVO.country',
      required: true
    }, {
      name: 'state', label: 'state', type: 'input', inputType: 'text', placeholder: 'Enter address',
      FormControlName: 'addressVO.state',
      required: true
    },
    {
      name: 'taluka', label: 'taluka', type: 'input', inputType: 'text', placeholder: 'Enter address',
      FormControlName: 'addressVO.taluka',
      required: true
    },
    {
      name: 'type', label: 'type', type: 'input', inputType: 'text', placeholder: 'Enter address',
      FormControlName: 'addressVO.type',
      required: true
    },
  ]



  constructor(private dialogService: ReusableDialogService, private fb: FormBuilder,
    private profileVerifier: UserService,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.getAllusers();
    // Initialize the form group
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required], // First name field
      lastName: ['', Validators.required], // Last name field
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Mobile number with pattern validation
      otp: [''], // OTP field, which can be empty initially
      type: ['PROFILE_VERIFIER', Validators.required], // Default type as 'PROFILE_VERIFIER'
      addressVO: this.fb.group({ // Nested FormGroup for addressVO
        address1: ['', Validators.required], // Address 1 field with required validation
        address2: [''], // Address 2, optional
        area: ['', Validators.required], // Area, required field
        city: ['', Validators.required], // City, required field
        contact1: ['', Validators.required], // Contact 1, required
        contact2: ['', Validators.required], // Contact 2, required
        destrict: ['', Validators.required], // District, required field (fixed typo from 'destrict' to 'district')
        pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]], // Pin code with pattern validation (assumes 6 digits)
        country: ['', Validators.required], // Country, required field
        state: ['', Validators.required], // State, required field
        taluka: ['', Validators.required], // Taluka, required field
        type: ['', Validators.required] // Address type field, required
      }),
      createdBy: ['ADMIN'], // Default value for createdBy
    });

  }

  openDialog(): void {
    

    // Open the dialog and pass the form
    this.dialogService.openDialog('Profile Verifier Information', this.fields, this.profileForm).subscribe(value => {
      if (value) {
        // console.log('Dialog result:', value);
        let userObj: Users = {
          firstName: value.firstName,
          lastName: value.lastName,
          mobileNumber: value.mobileNumber,
          otp: '',
          // agentMobileNumber: this.localStorageData.mobileNumber,
          type: value.type,
          addressVO: {
            address1: value.address1,
            address2: value.address2,
            area: value.area,
            city: value.city,
            contact1: value.contact1,
            contact2: value.contact2,
            destrict: value.destrict,
            pinCode: value.pinCode,
            country: value.country,
            state: value.state,
            taluka: value.taluka,
            type: value.type
          }
        }
        this.http.post('http://localhost:8443/profile/adduser', userObj).subscribe((res: any) => {
          if (res) {
            alert("Creted Profile Verifier Successfully");
          } else {
            alert("Error");
          }
        })
       
      }
    });
  }


  onEdit(element: Users) {
    // const formValues = {
    //   firstName: element.firstName,
    //   lastName: element.lastName,
    //   mobileNumber: element.mobileNumber,
    //   otp: '',  // assuming you want to reset OTP field
    //   type: element.type,
    //   addressVO: {
    //     address1: element.addressVO?.address1 || '',
    //     address2: element.addressVO?.address2 || '',
    //     area: element.addressVO?.area || '',
    //     city: element.addressVO?.city || '',
    //     contact1: element.addressVO?.contact1 || '',
    //     contact2: element.addressVO?.contact2 || '',
    //     destrict: element.addressVO?.destrict || '',
    //     pinCode: element.addressVO?.pinCode || '',
    //     country: element.addressVO?.country || '',
    //     state: element.addressVO?.state || '',
    //     taluka: element.addressVO?.taluka || '',
    //     type: element.addressVO?.type || ''
    //   }
    // };
    // console.log('Opening Dialog with formValues:', formValues); // Debugging the form values
    this.dialogService.openDialog('Edit Profile Verifier', this.fields, element);
  }


  onDelete(element: Users) {
    // console.log('Delete:', element);
    // // Implement your delete logic here (e.g., confirm deletion and remove from data source)
    // const index = this.profileVerifyList.indexOf(element);
    // if (index >= 0) {
    //   this.profileVerifyList.splice(index, 1); // Remove the element from the data source
    //   // Optionally refresh the data source if needed
    // }

    console.log('Delete:', element);
    const index = this.profileVerifyList.indexOf(element);
    if (index >= 0) {
      this.profileVerifyList.splice(index, 1); // Remove the profile from the list
    }

  }

  getAllusers() {
    // this.localStorageData = JSON.parse(localStorage.getItem('userValue') || '{}');
    this.profileVerifier.getAllUsers(9898989898).subscribe((response) => {
      if (response && response.result?.length > 0) {
        if (response?.result?.userType !== 'PROFILE_VERIFIER') {
          this.profileVerifyList = response.result;
          // console.log("List : -",this.profileVerifyList)
          // this.isSuccess = true;
          // this.getSuccessMessage('User Data Fetch Successfully','success');
        }
      } else {
        // this.getSuccessMessage('No Data Found','error');
      }
    }), (error: any) => {
      console.log('Error:', error);
    }
  }
}
