import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationType } from '../interfaces/application-type';
import { ConfigService } from './config.service';
import { NamedItemServiceBase } from './named-item.service';

@Injectable({
    providedIn: 'root'
})
export class ApplicationTypeService extends NamedItemServiceBase<ApplicationType> {

    constructor(http: HttpClient) {
        super(http, ConfigService.baseUrl + "/application-types");
    }
}
