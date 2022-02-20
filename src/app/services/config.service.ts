import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    public static readonly baseUrl: string = "http://localhost:8080";
}
