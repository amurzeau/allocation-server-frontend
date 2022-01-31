import { Component, OnInit } from '@angular/core';
import { ActivityTypeIdentifier } from 'src/app/interfaces/activity-type';
import { Allocation } from 'src/app/interfaces/allocation';
import { ProjectIdentifier } from 'src/app/interfaces/project';
import { AllocationsService } from 'src/app/services/allocations.service';


@Component({
  selector: 'app-allocations',
  templateUrl: './allocations.component.html',
  styleUrls: ['./allocations.component.scss']
})
export class AllocationsComponent implements OnInit {
  
  i = 0;
  month: Date = new Date();
  editId: string | null = null;
  allocations: Allocation[] = [];
  projects: Array<{ label: string; value: ProjectIdentifier;}> = [];
  activityTypes: Array<{ label: string; value: ActivityTypeIdentifier;}> = [];

  constructor(private allocationService: AllocationsService) { }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    this.allocations = [
      ...this.allocations,
      {
        id: this.i,
        project: undefined,
        activityType: undefined,
        duration: 0
      }
    ];
    this.i++;
  }

  deleteRow(id: number): void {
    this.allocations = this.allocations.filter(d => d.id !== id);
  }

  exportToSap(): void {

  }

  exportToCsv(): void {

  }

  addScrollSupportToInput() {
    const inputs = Array.from(document.getElementsByClassName('ant-input-number-input'));

    for (const input of inputs) {
      const inputElement = <HTMLElement> input;
      inputElement.setAttribute("type", "number");
    }
  }

  onSearchProject(event: string): void {

  }

  ngOnInit(): void {
    let allocations = this.allocationService.getAllocations('');
    this.allocations = allocations.map((allocation) => {
      return {
        id: allocation.id,
        project: allocation.project.id,
        activityType: allocation.activityType.id,
        duration: allocation.duration
      }
    });
    
    let projectsMap = this.allocationService
      .getProjectsFromAllocationApiData(allocations)
      .reduce((acc: Map<ProjectIdentifier, string>, project) => {
        if(!acc.has(project.id)) {
          acc.set(project.id, `${project.name} - ${project.board} - ${project.component} - ${project.type.name}`);
        }
        return acc;
      }, new Map<ProjectIdentifier, string>());

    this.projects = Array.from(projectsMap, ([value, label]) => ({ value: value, label: label}));

    this.activityTypes = this.allocationService.getActivityType().map((activity) => ({
      label: activity.name,
      value: activity.id
    }));
  }

}
