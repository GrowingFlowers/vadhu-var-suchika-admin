import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ReusableDialogService } from '../../Core/Services/Dialog/reusable-dialog.service';

@Component({
  selector: 'app-agent-profiles',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './agent-profiles.component.html',
  styleUrl: './agent-profiles.component.css'
})
export class AgentProfilesComponent {

  constructor(
    private dialogService: ReusableDialogService
  ){

  }
  openDialog(): void {
    const fields = [
      { name: 'number', label: 'Number', type: 'input', inputType: 'number', placeholder: 'Enter your number', required: true },
      { name: 'firstName', label: 'First Name', type: 'input', inputType: 'text', placeholder: 'Enter your first name', required: true },
      {
        name: 'lastName', label: 'Last Name', type: 'input', inputType: 'text', placeholder: 'ENter your Last name', required: true
      }
    ];

    this.dialogService.openDialog('User Information', fields).subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
      }
    });
  }
}
