import { Component, OnInit } from '@angular/core';
import { EotpIdentifier } from 'src/app/interfaces/eotp';
import { Project } from 'src/app/interfaces/project';
import { AllocationsService } from 'src/app/services/allocations.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  i = 0;
  projects: Project[] = [];
  eotps: Array<{ label: string; value: EotpIdentifier; }> = [];
  isCreatePTVisible: boolean = false;

  newPtCode: string = '';
  newPtName: string = '';
  newPtProject: Project | null = null;

  constructor(private allocationService: AllocationsService) { }

  addRow(): void {
    this.projects = [
      ...this.projects,
      {
        id: this.i,
        name: undefined,
        board: undefined,
        arch: undefined,
        component: undefined,
        type: undefined,
        eotpOpen: [],
        eotpClosed: []
      }
    ];
    this.i++;
  }

  deleteRow(id: number): void {
    this.projects = this.projects.filter(d => d.id !== id);
  }

  setLastSearch(searchText: string) {
    if (this.isCreatePTVisible === false) {
      this.newPtCode = searchText;
    }
  }

  showModalCreatePT(project: Project): void {
    this.newPtProject = project;
    this.isCreatePTVisible = true;
  }

  closePTModal() {
    this.isCreatePTVisible = false;
    this.newPtProject = null;
  }

  exportToCsv() {

  }

  ngOnInit(): void {
    this.allocationService.getProjects().forEach((projects) => {
      this.projects = projects.map((value) => ({
        ...value,
        type: value.type?.id,
        eotpOpen: value.eotpOpen.map((value) => value.id),
        eotpClosed: value.eotpClosed.map((value) => value.id)
      }));

      let eotpsMap = projects
        .reduce((acc: Map<EotpIdentifier, string>, value) => {
          value.eotpOpen.forEach(element => {
            if (!acc.has(element.id)) {
              acc.set(element.id, element.name);
            }
          });
          value.eotpClosed.forEach(element => {
            if (!acc.has(element.id)) {
              acc.set(element.id, element.name);
            }
          });
          return acc;
        }, new Map<EotpIdentifier, string>());

      this.eotps = Array.from(eotpsMap, ([value, label]) => ({ value: value, label: label }));
    });
  }
}
