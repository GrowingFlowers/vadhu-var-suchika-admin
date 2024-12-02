import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../Shared/table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { ReusableDialogService } from '../../Core/Services/Dialog/reusable-dialog.service';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { dataRequestResult } from '../../Core/Interfaces/dataRequest';
import { Users } from '../../Core/Interfaces/Users';
import { UserService } from '../../Core/Services/Users/User.service';
// import { TableColumn } from '../../Core/Interfaces/table-column';


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
  profileForm:any;

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
      name: 'pincode', label: 'Pin Code', type: 'input', inputType: 'text', placeholder: 'Enter valid pincode', required: true
    },
    {
      name: 'contact1', label: 'Contact 1', type: 'input', inputType: 'text', placeholder: 'Enter your valid contact number', required: true
    },
    {
      name: 'contact2', label: 'Contact 2', type: 'input', inputType: 'text', placeholder: 'Enter your valid another contact number', required: true
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
    // {
    //   name: 'type', label: 'Address Type', type: 'dropdown', options: ["Current","Permanent"], placeholder: 'Select Address Type', required: true
    // },
  ];


  constructor(private dialogService: ReusableDialogService, private fb: FormBuilder,
    private userService: UserService,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.getAllusers();

  }

  getAllusers() {
    // this.localStorageData = JSON.parse(localStorage.getItem('userValue') || '{}');
    this.userService.getAllUsers(9898989898).subscribe((response:any) => {
      if (response && response.result?.length > 0) {
        if (response?.result?.userType !== 'PROFILE_VERIFIER') {
          this.profileVerifyList = response.result;
          
        }
      } else {
        console.log("Error found in get all users")
      }
    }), (error: any) => {
      console.log('Error:', error);
    }
  }

  openDialog(): void {

    this.dialogService.openDialog('Profile Verifier Information', this.fields, '').subscribe(value => {
      if (value) {
       
        let userObj: Users = {
          firstName: value.firstName,
          lastName: value.lastName,
          mobileNumber: value.mobileNumber,
          otp: '',
          type: 'PROFILE_VERIFIER',
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
        this.userService.addUsers( userObj).subscribe((res: dataRequestResult) => {
          if (res.success) {
            alert("Creted Profile Verifier Successfully");
            this.getAllusers();
          } else {
            alert("Error");
          }
        })
       
      }
    });
  }


  onEdit(element: Users) {

    this.dialogService.openDialog('Edit Profile Verifier', this.fields, element).subscribe((value:any)=>{
      console.log("on edit"+JSON.stringify(value))
      if(value){
       
        let userObj:Users = {
          firstName: value.firstName,
          lastName: value.lastName,
          mobileNumber: value.mobileNumber,
          otp: '',
          type: value.type,
          addressVO: {
            address1: value.address1,
            address2: value.address2,
            area: value.area,
            city: value.city,
            contact1: value.contact1,
            contact2: value.contact2,
            destrict: value.district,
            pinCode: value.pinCode,
            state: value.state,
            taluka: value.taluka,
            type: value.address_type
          }
        }

        this.http.post("http://localhost:8443/profile/updateUser",userObj).subscribe((response:any)=>{
         if(response.success){
          alert("updated");
          this.getAllusers();
         }else{
          alert("error Not updated pls try again")
         }
        })
      }
    })
  }


  onDelete(element: Users) {
   
    console.log('Delete:', element);
    const index = this.profileVerifyList.indexOf(element);
    if (index >= 0) {
      this.profileVerifyList.splice(index, 1); // Remove the profile from the list
    }

  }

 
}
