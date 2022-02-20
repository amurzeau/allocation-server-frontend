import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityTypeComponent } from './activity-type.component';
import { ApplicationTypeComponent } from './application-type.component';
import { EotpComponent } from './eotp.component';

const routes: Routes = [
  { path: 'eotp', component: EotpComponent },
  { path: 'activity-type', component: ActivityTypeComponent },
  { path: 'application-type', component: ApplicationTypeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NamedItemRoutingModule { }
