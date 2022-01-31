import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzSelectComponent } from 'ng-zorro-antd/select';

export interface ProjectData {
  id: string;
  name: string;
  board: string;
  target: string;
  type: string;
  pt: string;
}

interface PTData {
  code: string;
  name: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  i = 0;
  listOfData: ProjectData[] = [];
  listOfPT: PTData[] = [];
  isCreatePTVisible: boolean = false;

  newPtCode: string = '';
  newPtName: string = '';
  newPtProject: ProjectData | null = null;

  constructor() { }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `Project ${this.i}`,
        board: 'board',
        target: 'x86',
        type: 'firmware',
        pt: '5464981981-5651'
      }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  setLastSearch(searchText: string) {
    if(this.isCreatePTVisible === false) {
      this.newPtCode = searchText;
    }
  }

  showModalCreatePT(project: ProjectData): void {
    this.newPtProject = project;
    this.isCreatePTVisible = true;
  }

  closePTModal() {
    this.isCreatePTVisible = false;
    this.newPtProject = null;
  }

  addPT() {
    this.listOfPT = [
      ...this.listOfPT,
      {
        code: this.newPtCode,
        name: this.newPtName
      }
    ];
    if(this.newPtProject !== null) {
      this.newPtProject.pt = this.newPtCode;
    } else {
      console.error("newPtProject is null");
    }
    this.closePTModal();
  }

  exportToCsv() {

  }

  ngOnInit(): void {
    this.addRow();
    this.addRow();
  }

}
