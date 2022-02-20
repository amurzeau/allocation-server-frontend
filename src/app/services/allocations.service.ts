import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserIdentifier } from '../interfaces/user';
import { Allocation, AllocationApiData, AllocationIdentifier } from '../interfaces/allocation';
import { ProjectApiData } from '../interfaces/project';
import { Eotp } from '../interfaces/eotp';
import { ActivityType } from '../interfaces/activity-type';
import { ApplicationType } from '../interfaces/application-type';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class AllocationsService {
    private baseUrl: string = "";

    constructor(private http: HttpClient) {
        this.baseUrl = ConfigService.baseUrl + "/allocations";
    }

    convertApiDataToSimple(allocation: AllocationApiData): Allocation {
        return {
            id: allocation.id,
            projectId: allocation.project?.id,
            activityTypeId: allocation.activityType?.id,
            duration: allocation.duration
        }
    }

    getAll(userId: UserIdentifier): Observable<AllocationApiData[]> {
        return this.http.get<AllocationApiData[]>(this.baseUrl);
    }

    add(): Observable<AllocationApiData> {
        return this.http.post<AllocationApiData>(this.baseUrl,
            {
                duration: 0
            });
    }

    update(allocation: Allocation): Observable<AllocationApiData> {
        return this.http.put<AllocationApiData>(this.baseUrl + "/" + allocation.id, allocation);
    }

    delete(allocationId: AllocationIdentifier): Observable<void> {
        return this.http.delete<void>(this.baseUrl + "/" + allocationId);
    }
}
