import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ReusableDialogService } from '../../Core/Services/Dialog/reusable-dialog.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableComponent } from "../../Shared/table/table.component";
import { TableColumn } from '../../Core/Interfaces/table-column';
import { UserService } from '../../Core/Services/Users/User.service';
import { Users } from '../../Core/Interfaces/users';
import { ToasterService } from '../../Core/Services/Toast/toaster.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../Shared/loader/loader.component";


@Component({
  selector: 'app-agent-profiles',
  standalone: true,
  imports: [MatButtonModule, FlexLayoutModule, TableComponent, CommonModule, LoaderComponent],
  templateUrl: './agent-profiles.component.html',
  styleUrl: './agent-profiles.component.css'
})
export class AgentProfilesComponent implements OnInit {

  loading: boolean = true;
  agentForm: any;
  displayedColumns: TableColumn[] = [
    { key: 'firstName', displayName: 'First Name' },
    { key: 'lastName', displayName: 'Last Name' },
    { key: 'addressVO.address1', displayName: 'Adderess' },
    { key: 'mobileNumber', displayName: 'Mobile No' },
    { key: 'createdDate', displayName: 'Created Date' },
  ];

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
      name: 'address1', label: 'Permant Address', type: 'textarea', inputType: 'textarea', placeholder: 'Enter Permant address', required: true
    },
    {
      name: 'address2', label: 'Current Address', type: 'textarea', inputType: 'textarea', placeholder: 'Enter Current address'
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
      name: 'contact2', label: 'Contact 2', type: 'input', inputType: 'text', placeholder: 'Enter your valid another contact number'
    },
    {
      name: 'pinCode', label: 'Pin Code', type: 'input', inputType: 'text', placeholder: 'Enter valid pincode', required: true
    },
    {
      name: 'country', label: 'Country', type: 'dropdown', options: [], placeholder: 'Select Country', required: true
    },
    {
      name: 'state', label: 'State', type: 'dropdown', options: [], placeholder: 'Select State', required: true, dependsOn: 'country'
    },
    {
      name: 'destrict', label: 'District', type: 'dropdown', options: [], placeholder: 'Select District', required: true, dependsOn: 'state'
    },
    {
      name: 'taluka', label: 'Taluka', type: 'dropdown', options: [], placeholder: 'Select Taluka', required: true, dependsOn: 'destrict'
    },
    {
      name: 'type', label: 'Residentioal Type', type: 'input', inputType: 'text', placeholder: 'Enter Residentioal Type', required: true
    },
  ];
  dataSource: any;
  //dataSource = new MatTableDataSource<Agent>([]);
  constructor(
    private dialogService: ReusableDialogService,
    private userService: UserService,
    public _snackbarService: ToasterService
  ) { }

  users: Users[] = []
  
  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    let mobileNumber = '7276414840';
    this.userService.getAllUsers(mobileNumber).subscribe((response) => {
      if (response && response.result?.length > 0) {
        if (response?.result) {
          this.dataSource = response.result;
          this.loading = false;
          this._snackbarService.openSuccessSnackBar('Fetch Agent Data');

        }
      } else {
        this._snackbarService.openErroSnackBar('No Data Found');
      }
    }), (error: any) => {
      console.log('Error:', error);
    }
  }
  openDialog(): void {

    this.dialogService.openDialog('Agent Information', this.fields, '').subscribe(result => {
      if (result) {
        let agentObj: Users = {
          firstName: result.firstName,
          lastName: result.lastName,
          mobileNumber: result.mobileNumber,
          otp: '',
          agentMobileNumber: '7276414840',
          type: 'AGENT',
          addressVO: {
            address1: result.address1,
            address2: result.address2,
            area: result.area,
            city: result.city,
            contact1: result.contact1,
            contact2: result.contact2,
            destrict: result.destrict,
            pinCode: result.pinCode,
            country: result.country,
            state: result.state,
            taluka: result.taluka,
            type: result.type
          }
        }
        this.userService.addUsers(agentObj).subscribe((data) => {
          console.log('Add Succesfully', data);
          if (data) {
            this._snackbarService.openSuccessSnackBar('SuccessFully Added');
            this.getAllUsers();
          }
        })
      }
    });
  }

  onEdit(value: any) {
    console.log('Edit Event', value);
    this.dialogService.openDialog('Edit Agent', this.fields, value).subscribe((response: any) => {

      if (response) {
        
          console.log('EDIT Dialog response:', response);
          let agentObj: Users = {
            firstName: response.firstName,
            lastName: response.lastName,
            mobileNumber: response.mobileNumber,
            otp: '',
            agentMobileNumber: '7276414840',
            type: 'AGENT',
            addressVO: {
              address1: response.address1,
              address2: response.address2,
              area: response.area,
              city: response.city,
              contact1: response.contact1,
              contact2: response.contact2,
              destrict: response.destrict,
              pinCode: response.pinCode,
              country: response.country,
              state: response.state,
              taluka: response.taluka,
              type: response.type
            }
          }
          this.userService.updateuser(agentObj).subscribe((data) => {
            console.log('Update Succesfully', data);
            this._snackbarService.openSuccessSnackBar('Update  Succesfully');
            this.getAllUsers();
          })
        }
    
      //this.dataSource = response;
    });
  }

  onDelete(event: any) {
    console.log('Delete Event', event);
  }
}
