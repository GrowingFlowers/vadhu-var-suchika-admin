import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../Shared/table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { verifier } from '../../Core/Interfaces/profileVerify';
import { ReusableDialogService } from '../../Core/Services/Dialog/reusable-dialog.service';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProfileVerifierService } from '../../Core/Services/Profile-verifier/profile-verifier.service';
import { dataRequestResult } from '../../Core/Interfaces/dataRequest';


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

  profileVerifyList: verifier[] = [];

  fields = [
    {
      name: 'firstName', label: 'First Name', type: 'input', inputType: 'text', placeholder: 'Enter your first name', required: true
    },
    {
      name: 'lastName', label: 'Last Name', type: 'input', inputType: 'text', placeholder: 'Enter your last name', required: true
    },
    {
      name: 'mobileNumber', label: 'Mobile Number', type: 'input', inputType: 'text', placeholder: 'Enter your mobile number', required: true
    },
    {
      name: 'address1', label: 'Address Line 1', type: 'textarea', inputType: 'textarea', placeholder: 'Enter address', required: true
    },
    {
      name: 'address2', label: 'Address Line 2', type: 'textarea', inputType: 'textarea', placeholder: 'Enter address', required: true
    },
    {
      name: 'area', label: 'Area', type: 'input', inputType: 'text', placeholder: 'Enter Area', required: true
    },
    {
      name: 'city', label: 'City', type: 'input', inputType: 'text', placeholder: 'Enter City', required: true
    },
    {
      name: 'contact1', label: 'Contact 1', type: 'input', inputType: 'text', placeholder: 'Enter your valid contact number', required: true
    },
    {
      name: 'contact2', label: 'Contact 2', type: 'input', inputType: 'text', placeholder: 'Enter your valid another contact number', required: true
    },
    {
      name: 'pincode', label: 'Pin Code', type: 'input', inputType: 'text', placeholder: 'Enter valid pincode', required: true
    },
    {
      name: 'country', label: 'Country', type: 'dropdown', options: [], placeholder: 'Select Country', required: true
    },
    {
      name: 'state', label: 'State', type: 'dropdown', options: [], placeholder: 'Select State', required: true, dependsOn: 'country'
    },
    {
      name: 'district', label: 'District', type: 'dropdown', options: [], placeholder: 'Select District', required: true, dependsOn: 'state'
    },
    {
      name: 'taluka', label: 'Taluka', type: 'dropdown', options: [], placeholder: 'Select Taluka', required: true, dependsOn: 'district'
    },
  ];


  constructor(private dialogService: ReusableDialogService, private fb: FormBuilder,
    private profileVerifier: ProfileVerifierService,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.getAllusers();
    // Initialize the form group
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required], 
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], 
      otp: [''], 
      type: ['PROFILE_VERIFIER', Validators.required], 
      addressVO: this.fb.group({ 
        address1: ['', Validators.required], 
        address2: [''],
        area: ['', Validators.required], 
        city: ['', Validators.required], 
        contact1: ['', Validators.required], 
        contact2: ['', Validators.required], 
        destrict: ['', Validators.required], 
        pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]], 
        country: ['', Validators.required], 
        state: ['', Validators.required], 
        taluka: ['', Validators.required], 
        type: ['', Validators.required] 
      }),
      createdBy: ['ADMIN'], 
    });

  }

  openDialog(): void {
    

    // Open the dialog and pass the form
    this.dialogService.openDialog('Profile Verifier Information', this.fields, this.profileForm).subscribe(value => {
      if (value) {
        // console.log('Dialog result:', value);
        let userObj: verifier = {
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
        this.http.post('http://localhost:8443/profile/adduser', userObj).subscribe((res: dataRequestResult) => {
          if (res.success) {
            alert("Creted Profile Verifier Successfully");
          } else {
            alert("Error");
          }
        })
       
      }
    });
  }


  onEdit(element: verifier) {
 
    this.dialogService.openDialog('Edit Profile Verifier', this.fields, element);
  }


  onDelete(element: verifier) {
   
    console.log('Delete:', element);
    const index = this.profileVerifyList.indexOf(element);
    if (index >= 0) {
      this.profileVerifyList.splice(index, 1); // Remove the profile from the list
    }

  }

  getAllusers() {
    // this.localStorageData = JSON.parse(localStorage.getItem('userValue') || '{}');
    this.profileVerifier.getUserList(9898989898).subscribe((response) => {
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
