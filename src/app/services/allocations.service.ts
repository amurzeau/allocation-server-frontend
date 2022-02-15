import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { UserIdentifier } from '../interfaces/user';
import { Allocation, AllocationApiData, AllocationIdentifier } from '../interfaces/allocation';
import { Project, ProjectApiData } from '../interfaces/project';
import { Eotp } from '../interfaces/eotp';
import { ActivityType } from '../interfaces/activity-type';
import { ApplicationType } from '../interfaces/application-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllocationsService {
  private baseUrl: string = "http://localhost:8080";

  constructor(private http: HttpClient) {
  }

  convertAllocation(allocation: AllocationApiData): Allocation {
    return {
      id: allocation.id,
      projectId: allocation.project?.id,
      activityTypeId: allocation.activityType?.id,
      duration: allocation.duration
    }
  }

  getAllocations(userId: UserIdentifier): Observable<AllocationApiData[]> {
    return this.http.get<AllocationApiData[]>(this.baseUrl + "/allocations");
  }

  addNewAllocation(): Observable<AllocationApiData> {
    return this.http.post<AllocationApiData>(this.baseUrl + "/allocations",
      {
        projectId: undefined,
        activityTypeId: undefined,
        duration: 0
      });
  }

  updateAllocation(allocation: Allocation): Observable<AllocationApiData> {
    return this.http.put<AllocationApiData>(this.baseUrl + "/allocations/" + allocation.id, allocation);
  }

  deleteAllocation(allocationId: AllocationIdentifier): Observable<void> {
    return this.http.delete<void>(this.baseUrl + "/allocations/" + allocationId);
  }


  convertProject(project: ProjectApiData): Project {
    return {
      id: project.id,
      name: project.name,
      board: project.board,
      component: project.component,
      arch: project.arch,
      type: project.type?.id,
      eotpOpen: project.eotpOpen.map(eotp => eotp.id),
      eotpClosed: project.eotpClosed.map(eotp => eotp.id)
    }
  }

  getProjects(): Observable<ProjectApiData[]> {
    return this.http.get<ProjectApiData[]>(this.baseUrl + "/projects");
  }

  getEotps(): Observable<Eotp[]> {
    return this.http.get<Eotp[]>(this.baseUrl + "/eotps");
  }

  getActivityType(): Observable<ActivityType[]> {
    return this.http.get<ActivityType[]>(this.baseUrl + "/activity-types");
  }

  getApplicationType(): Observable<ApplicationType[]> {
    return this.http.get<ApplicationType[]>(this.baseUrl + "/application-types");
  }

  getProjectsFromAllocationApiData(allocationApiData: AllocationApiData[]): ProjectApiData[] {
    return allocationApiData.filter((value) => (value.project !== null)).map((value) => {
      return value.project!;
    });
  }
}
