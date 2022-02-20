import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Eotp } from 'src/app/interfaces/eotp';
import { EotpsService } from 'src/app/services/eotps.service';
import { NamedItemComponent } from './named-item.component';


@Component({
  selector: 'app-eotp',
  templateUrl: './named-item.component.html',
  styleUrls: ['./named-item.component.scss']
})
export class EotpComponent extends NamedItemComponent<Eotp> {
  constructor(service: EotpsService, message: NzMessageService) {
    super(service, message);
  }
}
