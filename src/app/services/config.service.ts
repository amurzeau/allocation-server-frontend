import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    public static readonly baseUrl: string = environment.restBaseUrl;
}
