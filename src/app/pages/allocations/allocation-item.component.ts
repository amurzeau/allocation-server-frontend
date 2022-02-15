import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, EMPTY, Observable, of, Subject, Subscription, switchMap } from 'rxjs';
import { ActivityTypeIdentifier } from 'src/app/interfaces/activity-type';
import { Allocation, AllocationApiData, AllocationIdentifier } from 'src/app/interfaces/allocation';
import { ProjectIdentifier } from 'src/app/interfaces/project';

type AllocationChangedFunction = (allocation: Allocation) => Observable<any>;


@Component({
  selector: 'tr[app-allocation-item]',
  template: `
        <td>
          <nz-select class="select-use-full-width" nzShowSearch nzServerSearch (nzOnSearch)="onSearchProject($event)" nzPlaceHolder="Select a project"
            [(ngModel)]="allocation.projectId" (ngModelChange)="updateRow()" [nzOptions]="projects"></nz-select>
        </td>
        <td>
          <nz-select class="select-use-full-width" nzPlaceHolder="Select a nature" [(ngModel)]="allocation.activityTypeId" [nzOptions]="activityTypes"
            (ngModelChange)="updateRow()">
          </nz-select>
        </td>
        <td>
          <nz-input-number [(ngModel)]="allocation.duration" [nzMin]="0" [nzMax]="30" [nzStep]="0.25"
            [nzPlaceHolder]="'Nombre de jours'" [nzPrecision]="2" (nzBlur)="updateRow()">
          </nz-input-number>
          jour(s)
        </td>
        <td>
          <button nz-col nz-button (click)="deleteRow()" [nzLoading]="loadingDelete" nzType="default"><i nz-icon
              nzType='delete'></i></button>
        </td>
        `,
  styles: [`
        .select-use-full-width {
          width: 100%;
        };
        `]
})
export class AllocationsItemComponent implements OnInit {
  @Input()
  allocation!: Allocation;

  @Input()
  allocationChanged!: AllocationChangedFunction;

  @Input()
  projects: Array<{ label: string; value: ProjectIdentifier; }> = [];

  @Input()
  activityTypes: Array<{ label: string; value: ActivityTypeIdentifier; }> = [];

  @Output()
  deleteRequest = new EventEmitter<AllocationIdentifier>();

  private allocationChangedDebouncer = new Subject<Allocation>();
  loadingUpdate: boolean = false;
  loadingDelete: boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.allocationChangedDebouncer.pipe(
      debounceTime(500)
    ).subscribe({
      next: (allocation: Allocation) => {
        if (this.loadingDelete == false) {
          this.allocationChanged(allocation).subscribe({
            complete: () => {
              this.loadingUpdate = false;
            }
          });
        } else {
          console.log(`Ignoring update of ${allocation.id} as it has been deleted`);
        }
      }
    });

    this.addScrollSupportToInput();
  }

  deleteRow(): void {
    this.loadingDelete = true;
    this.deleteRequest.emit(this.allocation.id);
  }

  updateRow(): void {
    this.loadingUpdate = true;
    this.allocationChangedDebouncer.next(this.allocation);
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

  ngOnDestroy() {
    this.allocationChangedDebouncer.complete();
  }

}
