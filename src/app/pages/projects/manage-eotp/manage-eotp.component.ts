import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ProjectData } from 'src/app/pages/projects/projects.component';

interface EotpData {
  code: string;
  name: string;
}

@Component({
  selector: 'app-manage-eotp',
  templateUrl: './manage-eotp.component.html',
  styleUrls: ['./manage-eotp.component.scss']
})
export class ManageEotpComponent implements OnInit {
  @Input() project: ProjectData | null = null;
  @Input() preEnteredEotp: string = '';
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  listOpenEotp: EotpData[] = [];
  listClosedEotp: EotpData[] = [];

  newPtCode: string = '';
  newPtName: string = '';

  constructor() { }

  showModal(): void {
    this.visible = true;
    this.visibleChange.emit(this.visible);

    this.newPtCode = this.preEnteredEotp;
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  validateModal(): void {
    this.closeModal();
  }

  addPT() {
    this.listOpenEotp = [
      ...this.listOpenEotp,
      {
        code: this.newPtCode,
        name: this.newPtName
      }
    ];
    if(this.project !== null) {
      this.project.pt = this.newPtCode;
    } else {
      console.error("project is null");
    }
    this.closeModal();
  }

  ngOnInit(): void {
  }

}
