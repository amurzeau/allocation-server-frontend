import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivityType } from 'src/app/interfaces/activity-type';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { NamedItemComponent } from './named-item.component';


@Component({
  selector: 'app-activity-type',
  templateUrl: './named-item.component.html',
  styleUrls: ['./named-item.component.scss']
})
export class ActivityTypeComponent extends NamedItemComponent<ActivityType> {
  constructor(service: ActivityTypeService, message: NzMessageService) {
    super(service, message);
  }
}
