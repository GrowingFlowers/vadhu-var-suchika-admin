import { Component } from '@angular/core';
import { TableComponent } from '../../Shared/table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { verifier } from '../../Core/Interfaces/profileVerify';
import { ReusableDialogService } from '../../Core/Services/Dialog/reusable-dialog.service';
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
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
export class ProfileVerifierComponent {

  displayedColumns: TableColumn[] = [
    { key: 'firstName', displayName: 'First Name' },
    { key: 'lastName', displayName: 'Last Name' },
    { key: 'mobileNo', displayName: 'Mobile No' },
   ];

  profileVerifyList: verifier[] = [
    { firstName: 'Shubham', lastName: 'Yadav', mobileNo: 9876543245 },
    { firstName: 'Yash', lastName: 'Sonawale', mobileNo: 99876789 },
    { firstName: 'Suraj', lastName: 'Kadam', mobileNo: 9856432123 },
    { firstName: 'Sahil', lastName: 'Jedhe', mobileNo: 789876543 },
    { firstName: 'Swaraj', lastName: 'Shirte', mobileNo: 9988776655 },
    { firstName: 'Saksham', lastName: 'Swami', mobileNo: 8888999956 },
  ];

  constructor(private dialogService: ReusableDialogService){}
  data:any;
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
    

    this.dialogService.openDialog('Profile Verifier Information', fields,'').subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
      }
    });
  }

  onEdit(element: verifier) {
    console.log('Edit:', element);
    // Implement your edit logic here (e.g., open a dialog)
  }

  onDelete(element: verifier) {
    console.log('Delete:', element);
    // Implement your delete logic here (e.g., confirm deletion and remove from data source)
    const index = this.profileVerifyList.indexOf(element);
    if (index >= 0) {
      this.profileVerifyList.splice(index, 1); // Remove the element from the data source
      // Optionally refresh the data source if needed
    }
  }
}
