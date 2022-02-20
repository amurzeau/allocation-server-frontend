import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivityType } from '../interfaces/activity-type';
import { ConfigService } from './config.service';
import { NamedItemServiceBase } from './named-item.service';

@Injectable({
    providedIn: 'root'
})
export class ActivityTypeService extends NamedItemServiceBase<ActivityType> {

    constructor(http: HttpClient) {
        super(http, ConfigService.baseUrl + "/activity-types");
    }
}
