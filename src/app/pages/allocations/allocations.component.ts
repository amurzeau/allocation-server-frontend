import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityTypeIdentifier } from 'src/app/interfaces/activity-type';
import { Allocation } from 'src/app/interfaces/allocation';
import { ProjectIdentifier } from 'src/app/interfaces/project';
import { ActivityTypeService } from 'src/app/services/activity-type.service';
import { AllocationsService } from 'src/app/services/allocations.service';
import { ProjectsService } from 'src/app/services/projects.service';


@Component({
    selector: 'app-allocations',
    templateUrl: './allocations.component.html',
    styleUrls: ['./allocations.component.scss']
})
export class AllocationsComponent implements OnInit {
    month: Date = new Date();
    allocations: Allocation[] = [];
    projects: Array<{ label: string; value: ProjectIdentifier; }> = [];
    activityTypes: Array<{ label: string; value: ActivityTypeIdentifier; }> = [];

    loadingAdd: boolean = false;

    constructor(private allocationService: AllocationsService, private projectService: ProjectsService, private activityTypeService: ActivityTypeService) { }

    addRow(): void {
        this.loadingAdd = true;
        this.allocationService.add().subscribe({
            next: (newAllocation) => {
                this.allocations = [
                    ...this.allocations,
                    this.allocationService.convertApiDataToSimple(newAllocation)
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
        this.allocationService.delete(id).subscribe({
            next: () => {
                this.allocations = this.allocations.filter(d => d.id !== id);
            }
        });
    }

    updateRow(allocation: Allocation): Observable<any> {
        return this.allocationService.update(allocation);
    }

    exportToSap(): void {

    }

    exportToCsv(): void {

    }

    onSearchProject(event: string): void {

    }

    ngOnInit(): void {
        let allocations = this.allocationService.getAll('');
        allocations.subscribe({
            next: (allocations) => {
                this.allocations = allocations.map(this.allocationService.convertApiDataToSimple);
            }
        });

        this.projectService.getAll().subscribe({
            next: (projects) => {
                this.projects = projects.map(project => {
                    return {
                        value: project.id,
                        label: `${project.name} - ${project.board} - ${project.component} - ${project.type?.name}`
                    }
                });
            }
        });

        this.activityTypeService.getAsValueLabel().subscribe({
            next: (activities) => {
                this.activityTypes = activities;
            }
        });
    }

}
