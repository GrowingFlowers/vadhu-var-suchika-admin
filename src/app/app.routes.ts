import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { NavbarComponent } from './Layout/navbar/navbar.component';
import { AgentProfilesComponent } from './Pages/agent-profiles/agent-profiles.component';
import { ProfileVerifierComponent } from './Pages/profile-verifier/profile-verifier.component';
import { AuthorizationComponent } from './Pages/authorization/authorization.component';
import { MyProfileComponent } from './Pages/my-profile/my-profile.component';

export const routes: Routes = [

    {
        path: 'Login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: 'Login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: NavbarComponent,
        children: [
            {
                path: 'Agent',
                component: AgentProfilesComponent
            },
            {
                path: 'profile-verifier',
                component: ProfileVerifierComponent
            },
            {
                path: 'authorization',
                component: AuthorizationComponent
            },
            {
                path: 'profile',
                component: MyProfileComponent
            }

        ]
    }
];
