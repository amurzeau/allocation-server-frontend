import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Observable, Subject } from 'rxjs';
import { ApplicationTypeIdentifier } from 'src/app/interfaces/application-type';
import { EotpIdentifier } from 'src/app/interfaces/eotp';
import { Project, ProjectApiData, ProjectIdentifier } from 'src/app/interfaces/project';

type ChangedFunction = (data: Project) => Observable<ProjectApiData>;

@Component({
  selector: 'tr[app-project-item]',
  template: `
        <td>
          <input nz-input type="text" [ngModel]="data.name" (ngModelChange)="data.name = $event; updateRow()" />
        </td>
        <td>
          <input nz-input type="text" [ngModel]="data.board" (ngModelChange)="data.board = $event; updateRow()" />
        </td>
        <td>
          <input nz-input type="text" [ngModel]="data.component" (ngModelChange)="data.component = $event; updateRow()" />
        </td>
        <td>
            <input
                placeholder="Architecture"
                nz-input
                [ngModel]="data.arch"
                [nzAutocomplete]="auto"
                (ngModelChange)="data.arch = $event; updateRow()"
            />
            <nz-autocomplete [nzDataSource]="architectures" nzBackfill #auto></nz-autocomplete>
        </td>
        <td>
          <nz-select class="select-use-full-width" nzShowSearch nzPlaceHolder="type d'activité" [ngModel]="data.type" [nzOptions]="applicationTypes"
            (ngModelChange)="data.type = $event; updateRow()">
          </nz-select>
        </td>
        <td>
          <nz-select style="width: 20ch;" nzShowSearch nzPlaceHolder="eOTP" nzMode="multiple" [ngModel]="data.eotpOpen" (ngModelChange)="data.eotpOpen = $event; updateRow()" [nzOptions]="eotps"></nz-select>
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
export class ProjectItemComponent implements OnInit {
  @Input()
  data!: Project;

  @Input()
  dataChanged!: ChangedFunction;

  @Input()
  eotps: Array<{ label: string; value: EotpIdentifier; }> = [];

  @Input()
  applicationTypes: Array<{ label: string; value: ApplicationTypeIdentifier; }> = [];

  @Output()
  deleteRequest = new EventEmitter<ProjectIdentifier>();

  architectures: string[] = ["arm", "x86", "powerpc"];

  private dataChangedDebouncer = new Subject<Project>();
  loadingUpdate: boolean = false;
  loadingDelete: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.dataChangedDebouncer.pipe(
      debounceTime(1000)
    ).subscribe({
      next: (data: Project) => {
        if (this.loadingDelete == false) {
          this.dataChanged(data).subscribe({
            next: (updatedData) => {
            },
            complete: () => {
              this.loadingUpdate = false;
            }
          });
        } else {
          console.log(`Ignoring update of ${data.id} as it has been deleted`);
        }
      }
    });
  }

  deleteRow(): void {
    this.loadingDelete = true;
    this.deleteRequest.emit(this.data.id);
  }

  updateRow(): void {
    this.loadingUpdate = true;
    this.dataChangedDebouncer.next(this.data);
  }

  ngOnDestroy() {
    this.dataChangedDebouncer.complete();
  }

}
