import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityTypeComponent } from './pages/named-item/activity-type.component';
import { ApplicationTypeComponent } from './pages/named-item/application-type.component';
import { EotpComponent } from './pages/named-item/eotp.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/allocations' },
  { path: 'allocations', loadChildren: () => import('./pages/allocations/allocations.module').then(m => m.AllocationsModule) },
  { path: 'projects', loadChildren: () => import('./pages/projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'named-item', loadChildren: () => import('./pages/named-item/named-item.module').then(m => m.NamedItemModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
