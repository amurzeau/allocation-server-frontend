import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationType } from 'src/app/interfaces/application-type';
import { ApplicationTypeService } from 'src/app/services/application-type.service';
import { NamedItemComponent } from './named-item.component';


@Component({
  selector: 'app-application-type',
  templateUrl: './named-item.component.html',
  styleUrls: ['./named-item.component.scss']
})
export class ApplicationTypeComponent extends NamedItemComponent<ApplicationType> {
  constructor(service: ApplicationTypeService, message: NzMessageService) {
    super(service, message);
  }
}
