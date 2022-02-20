import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, ProjectApiData, ProjectIdentifier } from '../interfaces/project';
import { ConfigService } from './config.service';


@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    private baseUrl: string = "";

    constructor(private http: HttpClient) {
        this.baseUrl = ConfigService.baseUrl + "/projects";
    }

    convertApiDataToSimple(project: ProjectApiData): Project {
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

    getAll(): Observable<ProjectApiData[]> {
        return this.http.get<ProjectApiData[]>(this.baseUrl);
    }

    add(): Observable<ProjectApiData> {
        return this.http.post<ProjectApiData>(this.baseUrl, {});
    }

    update(data: Project): Observable<ProjectApiData> {
        return this.http.put<ProjectApiData>(this.baseUrl + "/" + data.id, data);
    }

    delete(id: ProjectIdentifier): Observable<void> {
        return this.http.delete<void>(this.baseUrl + "/" + id);
    }
}
