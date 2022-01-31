import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Eotp } from 'src/app/interfaces/eotp';
import { Project } from 'src/app/interfaces/project';

@Component({
  selector: 'app-manage-eotp',
  templateUrl: './manage-eotp.component.html',
  styleUrls: ['./manage-eotp.component.scss']
})
export class ManageEotpComponent implements OnInit {
  @Input() project: Project | null = null;
  @Input() preEnteredEotp: string = '';
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  listOpenEotp: Eotp[] = [];
  listClosedEotp: Eotp[] = [];

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
        id: this.newPtCode,
        name: this.newPtName
      }
    ];
    if(this.project !== null) {
      
    } else {
      console.error("project is null");
    }
    this.closeModal();
  }

  ngOnInit(): void {
  }

}
