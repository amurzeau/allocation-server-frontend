import { NgModule } from '@angular/core';

import { ProjectsRoutingModule } from './projects-routing.module';

import { ProjectsComponent as ProjectsComponent } from './projects.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { ManageEotpModule } from 'src/app/pages/projects/manage-eotp/manage-eotp.module';
import { ProjectItemComponent } from './project-item.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ProjectsRoutingModule,
    NzLayoutModule,
    NzTableModule,
    NzPopconfirmModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzIconModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzGridModule,
    NzSpaceModule,
    NzTagModule,
    NzModalModule,
    ManageEotpModule,
    NzAutocompleteModule,
    NzMessageModule,
  ],
  declarations: [ProjectsComponent, ProjectItemComponent],
  exports: [ProjectsComponent, ProjectItemComponent]
})
export class ProjectsModule { }
