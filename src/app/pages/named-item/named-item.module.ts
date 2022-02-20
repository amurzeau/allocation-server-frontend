import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { NamedItemRowComponent } from './named-item-row.component';
import { EotpComponent } from './eotp.component';
import { ApplicationTypeComponent } from './application-type.component';
import { ActivityTypeComponent } from './activity-type.component';
import { NamedItemComponent } from './named-item.component';
import { NamedItemRoutingModule } from './named-item-routing.module';
import { NamedItemAddDialogComponent } from './named-item-add-dialog.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
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
    NamedItemRoutingModule,
    NzFormModule,
    NzModalModule,
    NzMessageModule
  ],
  declarations: [NamedItemComponent, NamedItemAddDialogComponent, EotpComponent, ApplicationTypeComponent, ActivityTypeComponent, NamedItemRowComponent],
  exports: [NamedItemComponent, NamedItemAddDialogComponent, EotpComponent, ApplicationTypeComponent, ActivityTypeComponent, NamedItemRowComponent]
})
export class NamedItemModule { }
