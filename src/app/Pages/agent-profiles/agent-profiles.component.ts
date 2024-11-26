import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ReusableDialogService } from '../../Core/Services/Dialog/reusable-dialog.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Agent } from '../../Core/Interfaces/agent';
import { TableComponent } from "../../Shared/table/table.component";
interface TableColumn {
  key: string;
  displayName: string;
}
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
    { key: 'email', displayName: 'Email' },
    { key: 'address', displayName: 'Adderess' },
    { key: 'mobileNumber', displayName: 'Mobile No' },
    { key: 'dateJoin', displayName: 'date of joining' },
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
      name: 'address', label: 'Address', type: 'textarea', inputType: 'textarea', placeholder: 'Enter address', required: true
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
  dataSource: any;
  constructor(
    private dialogService: ReusableDialogService
  ) { }

  users: Agent[] = [
    {
      firstName: "John",
      lastName: "Doe",
      mobileNumber: "1234567890",
      type: "AGENT",
      agentMobileNumber: "",
      addressVO: {
        address1: "123 Main St",
        address2: "Apt 4B",
        area: "Downtown",
        city: "Metropolis",
        contact1: "1234567890",
        contact2: "0987654321",
        destrict: "Central District", // If "district" is the intended term, update the spelling.
        pinCode: "456789",
        country: "Fictionland",
        state: "Capital State",
        taluka: "West Taluka",
        type: "Residential",
      },
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      mobileNumber: "0987654321",
      otp: "5678",
      type: "Agent",
      agentMobileNumber: "1122334455",
      addressVO: {
        address1: "456 Elm St",
        address2: "Suite 100",
        area: "Uptown",
        city: "Smallville",
        contact1: "5678901234",
        contact2: "4321098765",
        destrict: "North District", // Correct as needed
        pinCode: "654321",
        country: "Fictionland",
        state: "Northern State",
        taluka: "East Taluka",
        type: "Commercial",
      },
    },
  ];

  ngOnInit(): void {
    this.dataSource = this.users
  }

  openDialog(): void {

    this.dialogService.openDialog('Agent Information', this.fields,'').subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
      }
    });
  }

  onEdit(value: any) {
    console.log('Edit Event', value);
    this.dialogService.openDialog('Edit Agent',this.fields,value)
  }

  onDelete(event: any) {
    console.log('Delete Event', event);
  }
}
