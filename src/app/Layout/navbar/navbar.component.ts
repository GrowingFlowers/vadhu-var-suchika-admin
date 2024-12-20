import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatSidenavModule, RouterModule, MatListModule, MatButtonModule, FlexLayoutModule, MatMenuModule, FooterComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) { }

  logout(){
    console.log('Logout');
    localStorage.clear();
    this.router.navigate(['/Login']);
  }
}
