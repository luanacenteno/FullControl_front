import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

/*import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoverComponent } from './pages/recover/recover.component';
import { LockComponent } from './pages/lock/lock.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { Error404Component } from './pages/error404/error404.component';
import { Error500Component } from './pages/error500/error500.component';*/

export const routes: Routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'calendario', pathMatch: 'full' },
            { path: 'auditorias', loadChildren: () => import('./auditorias/auditorias.module').then(m => m.AuditoriasModule) },
            { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
            { path: 'calendario', loadChildren: () => import('./calendario/calendario.module').then(m => m.CalendarioModule) }
        ]
    },

   /* // Not lazy-loaded routes
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'lock', component: LockComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },
*/
    // Not found
    { path: '**', redirectTo: 'calendario' }

];
