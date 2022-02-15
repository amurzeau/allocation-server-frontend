import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  month: Date = new Date();
  allocations: Allocation[] = [];
  projects: Array<{ label: string; value: ProjectIdentifier; }> = [];
  activityTypes: Array<{ label: string; value: ActivityTypeIdentifier; }> = [];

  loadingAdd: boolean = false;

  constructor(private allocationService: AllocationsService) { }

  addRow(): void {
    this.loadingAdd = true;
    this.allocationService.addNewAllocation().subscribe({
      next: (newAllocation) => {
    this.allocations = [
      ...this.allocations,
          this.allocationService.convertAllocation(newAllocation)
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
    this.allocationService.deleteAllocation(id).subscribe({
      next: () => {
    this.allocations = this.allocations.filter(d => d.id !== id);
      }
    });
  }

  exportToSap(): void {

  }

  exportToCsv(): void {

  }

  addScrollSupportToInput() {
    const inputs = Array.from(document.getElementsByClassName('ant-input-number-input'));

    for (const input of inputs) {
      const inputElement = <HTMLElement>input;
      inputElement.setAttribute("type", "number");
    }
  }

  onSearchProject(event: string): void {

  }

  ngOnInit(): void {
    let allocations = this.allocationService.getAllocations('');
    allocations.subscribe({
      next: (allocations) => {
        this.allocations = allocations.map(this.allocationService.convertAllocation);
      }
    });

    this.allocationService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects.map(project => {
      return {
            value: project.id,
            label: `${project.name} - ${project.board} - ${project.component} - ${project.type?.name}`
          }
        });
      }
    });

    this.allocationService.getActivityType().subscribe({
      next: (activities) => {
        this.activityTypes = activities.map(activity => {
          return {
            value: activity.id,
            label: activity.name
        }
        });
      }
    });

    this.allocationService.getActivityType().forEach((activities) => {
      this.activityTypes = activities.map((activity) => ({
      label: activity.name,
      value: activity.id
    }));
    });
  }

}
