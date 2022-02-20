import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationTypeIdentifier } from 'src/app/interfaces/application-type';
import { EotpIdentifier } from 'src/app/interfaces/eotp';
import { Project, ProjectApiData } from 'src/app/interfaces/project';
import { AllocationsService } from 'src/app/services/allocations.service';
import { ApplicationTypeService } from 'src/app/services/application-type.service';
import { EotpsService } from 'src/app/services/eotps.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    projects: Project[] = [];
    eotps: Array<{ label: string; value: EotpIdentifier; }> = [];
    applicationTypes: Array<{ label: string; value: ApplicationTypeIdentifier; }> = [];

    loadingAdd: boolean = false;

    constructor(private projectService: ProjectsService,
        private applicationTypeService: ApplicationTypeService,
        private eotpService: EotpsService) { }

    addRow(): void {
        this.loadingAdd = true;
        this.projectService.add().subscribe({
            next: (newData) => {
                this.projects = [
                    ...this.projects,
                    this.projectService.convertApiDataToSimple(newData)
                ];
            },
            error: () => {
                this.loadingAdd = false;
            },
            complete: () => {
                this.loadingAdd = false;
            }
        });
    }

    deleteRow(id: number): void {
        this.projectService.delete(id).subscribe({
            next: () => {
                this.projects = this.projects.filter(d => d.id !== id);
            }
        });
    }

    updateRow(data: Project): Observable<ProjectApiData> {
        return this.projectService.update(data);
    }

    exportToCsv() {

    }

    ngOnInit(): void {
        let projects = this.projectService.getAll();
        projects.subscribe({
            next: (projects) => {
                this.projects = projects.map(this.projectService.convertApiDataToSimple);
            }
        });

        this.applicationTypeService.getAsValueLabel().subscribe({
            next: (applicationTypes) => {
                this.applicationTypes = applicationTypes;
            }
        });

        this.eotpService.getAsValueLabel().subscribe({
            next: (eotps) => {
                this.eotps = eotps;
            }
        });
    }
}
