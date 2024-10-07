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

  displayedColumns: TableColumn[] = [
    {key:'firstName' ,displayName:'First Name'},
    {key:'lastName' ,displayName:'Last Name'},
    {key:'email' , displayName:'Email'},
    {key:'address' ,displayName:'Adderess'},
    {key:'mobileNumber' ,displayName:'Mobile No'},
    {key:'dateJoin' ,displayName:'date of joining'},
];
  
  dataSource:any; 
  constructor(
    private dialogService: ReusableDialogService
  ){}

  users:Agent[] = [
    {
      firstName: "Amit",
      lastName: "Sharma",
      email: "amit.sharma@example.com",
      address: "123 MG Road, Delhi, India",
      dateOfBirth: "1988-01-12",
      dateJoin: "2022-02-01",
      mobileNumber: "+91-9876543210"
    },
    {
      firstName: "Priya",
      lastName: "Rao",
      email: "priya.rao@example.com",
      address: "456 Brigade Road, Bengaluru, India",
      dateOfBirth: "1993-05-25",
      dateJoin: "2021-07-10",
      mobileNumber: "+91-9123456789"
    },
    {
      firstName: "Rajesh",
      lastName: "Patel",
      email: "rajesh.patel@example.com",
      address: "789 CG Road, Ahmedabad, India",
      dateOfBirth: "1985-09-19",
      dateJoin: "2020-08-15",
       mobileNumber: "+91-9988776655"
    },
    {
      firstName: "Suman",
      lastName: "Iyer",
      email: "suman.iyer@example.com",
      address: "321 Marine Drive, Mumbai, India",
      dateOfBirth: "1990-11-04",
      dateJoin: "2023-01-22",
      mobileNumber: "+91-9123678901"
    },
    {
      firstName: "Neha",
      lastName: "Verma",
      email: "neha.verma@example.com",
      address: "654 Park Street, Kolkata, India",
      dateOfBirth: "1995-07-16",
      dateJoin: "2022-03-30",
      mobileNumber: "+91-9123678901"
    }
  ];

  ngOnInit(): void {
    this.dataSource = this.users
  }
  
  openDialog(): void {
    const fields = [
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
        name: 'email', label: 'Email', type: 'input', inputType: 'email', placeholder: 'Enter email', required: true
      },
      {
        name: 'address', label: 'Address', type: 'textarea', inputType: 'textarea', placeholder: 'Enter address', required: true
      },
      {
        name: 'dateOfBirth', label: 'Date of Birth', type: 'input', inputType: 'date', placeholder: 'Enter date of birth', required: true
      },
      {
        name: 'joinDate', label: 'Join Date', type: 'input', inputType: 'date', placeholder: 'Enter join date', required: true
      }
    ];
    

    this.dialogService.openDialog('User Information', fields).subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
      }
    });
  }

  onEdit(event:any){
    console.log('Edit Event', event);
  }

  onDelete(event:any){
    console.log('Delete Event', event);
  }
}
