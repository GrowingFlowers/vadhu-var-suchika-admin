import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ReusableDialogService } from '../../Core/Services/Dialog/reusable-dialog.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableComponent } from "../../Shared/table/table.component";
import { AgentService } from '../../Core/Services/Agent/agent.service';
import { TableColumn } from '../../Core/Interfaces/table-column';
import { Users } from '../../Core/Interfaces/Users';
import { UserService } from '../../Core/Services/Users/User.service';

@Component({
  selector: 'app-agent-profiles',
  standalone: true,
  imports: [MatButtonModule, FlexLayoutModule, TableComponent],
  templateUrl: './agent-profiles.component.html',
  styleUrl: './agent-profiles.component.css'
})
export class AgentProfilesComponent implements OnInit {

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
    {
      name: 'type', label: 'Residentioal Type', type: 'input', inputType: 'text', placeholder: 'Enter Residentioal Type', required: true
    },
  ];
  dataSource: any;
  //dataSource = new MatTableDataSource<Agent>([]);
  constructor(
    private dialogService: ReusableDialogService,
    private userService: UserService
  ) { }

  users: Users[] = []
  // users: Users[] = [
  //   {
  //     firstName: "John",
  //     lastName: "Doe",
  //     mobileNumber: "1234567890",
  //     type: "AGENT",
  //     agentMobileNumber: "",
  //     addressVO: {
  //       address1: "123 Main St",
  //       address2: "Apt 4B",
  //       area: "Downtown",
  //       city: "Metropolis",
  //       contact1: "1234567890",
  //       contact2: "0987654321",
  //       destrict: "Central District", // If "district" is the intended term, update the spelling.
  //       pinCode: "456789",
  //       country: "Fictionland",
  //       state: "Capital State",
  //       taluka: "West Taluka",
  //       type: "Residential",
  //     },
  //   },
  //   {
  //     firstName: "Jane",
  //     lastName: "Smith",
  //     mobileNumber: "0987654321",
  //     otp: "5678",
  //     type: "Agent",
  //     agentMobileNumber: "1122334455",
  //     addressVO: {
  //       address1: "456 Elm St",
  //       address2: "Suite 100",
  //       area: "Uptown",
  //       city: "Smallville",
  //       contact1: "5678901234",
  //       contact2: "4321098765",
  //       destrict: "North District", // Correct as needed
  //       pinCode: "654321",
  //       country: "Fictionland",
  //       state: "Northern State",
  //       taluka: "East Taluka",
  //       type: "Commercial",
  //     },
  //   },
  // ];

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    let mobileNumber = '7276414840';
    this.userService.getAllUsers(mobileNumber).subscribe((response) => {
      if (response && response.result?.length > 0) {
        if (response?.result) {
          this.dataSource = response.result;
          console.log(this.dataSource)
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
  openDialog(): void {

    this.dialogService.openDialog('Agent Information', this.fields, '').subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
        let agentObj: Users = {
          firstName: result.firstName,
          lastName: result.lastName,
          mobileNumber: result.mobileNumber,
          otp: '',
          agentMobileNumber: '',
          type: 'AGENT',
          addressVO: {
            address1: result.address1,
            address2: result.address2,
            area: result.area,
            city: result.city,
            contact1: result.contact1,
            contact2: result.contact2,
            destrict: result.district,
            pinCode: result.pinCode,
            country: result.country,
            state: result.state,
            taluka: result.taluka,
            type: result.type
          }
        }
        this.userService.addUsers(agentObj).subscribe((data) => {
          console.log('Add Succesfully');
        })
      }
    });
  }

  onEdit(value: any) {
    console.log('Edit Event', value);
    this.dialogService.openDialog('Edit Agent', this.fields, value).subscribe((response: any) => {
      console.log('EDIT RESPONSE: ', response);
      //this.dataSource = response;
    });
  }

  onDelete(event: any) {
    console.log('Delete Event', event);
  }
}
