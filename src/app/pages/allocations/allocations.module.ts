import { NgModule } from '@angular/core';

import { AllocationsRoutingModule } from './allocations-routing.module';

import { AllocationsComponent as AllocationsComponent } from './allocations.component';
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


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AllocationsRoutingModule,
    NzLayoutModule,
    NzTableModule,
    NzPopconfirmModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzIconModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzGridModule
  ],
  declarations: [AllocationsComponent],
  exports: [AllocationsComponent]
})
export class AllocationsModule { }
