import { Routes } from '@angular/router';
import { AdminPanelComponent } from './auth/admin-panel/admin-panel.component';
import { adminAccessGuard } from './auth/admin-access.guard';

export const routes: Routes = [
    {
    path: 'admin-3871-keypanel',
    canActivate: [adminAccessGuard],
    component: AdminPanelComponent
  }
];
