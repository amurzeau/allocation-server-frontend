import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllocationsComponent as AllocationsComponent } from './allocations.component';

const routes: Routes = [
  { path: '', component: AllocationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllocationsRoutingModule { }
