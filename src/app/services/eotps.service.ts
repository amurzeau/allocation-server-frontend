import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Eotp } from '../interfaces/eotp';
import { ConfigService } from './config.service';
import { NamedItemServiceBase } from './named-item.service';

@Injectable({
    providedIn: 'root'
})
export class EotpsService extends NamedItemServiceBase<Eotp> {

    constructor(http: HttpClient) {
        super(http, ConfigService.baseUrl + "/eotps");
    }
}
