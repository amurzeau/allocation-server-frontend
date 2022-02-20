import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Observable, Subject } from 'rxjs';
import { NamedItem } from 'src/app/interfaces/named-item';

type ChangedFunction<T> = (data: T) => Observable<any>;
type DeleteRequestFunction = (data: string) => Observable<any>;

@Component({
  selector: 'tr[app-named-item-row]',
  template: `
        <td>
          {{ data.id }}
        </td>
        <td>
          <input nz-input type="text" [ngModel]="data.name" (ngModelChange)="data.name = $event; updateRow()" />
        </td>
        <td>
          <button nz-col nz-button (click)="deleteRow()" [nzLoading]="loadingDelete" nzType="default"><i nz-icon
              nzType='delete'></i></button>
        </td>
        `
})
export class NamedItemRowComponent<T extends NamedItem> implements OnInit {

  @Input()
  data!: T;

  @Input()
  dataChanged!: ChangedFunction<T>;

  @Input()
  deleteRequest!: DeleteRequestFunction;

  private dataChangedDebouncer = new Subject<T>();
  loadingUpdate: boolean = false;
  loadingDelete: boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.dataChangedDebouncer.pipe(
      debounceTime(500)
    ).subscribe({
      next: (data: T) => {
        if (this.loadingDelete == false) {
          this.dataChanged(data).subscribe({
            error: () => {
              this.loadingUpdate = false;
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
    this.deleteRequest(this.data.id).subscribe({
      error: () => {
        this.loadingDelete = false;
      },
      complete: () => {
        this.loadingDelete = false;
      }
    });
  }

  updateRow(): void {
    this.loadingUpdate = true;
    this.dataChangedDebouncer.next(this.data);
  }

  onSearchProject(event: string): void {

  }

  ngOnDestroy() {
    this.dataChangedDebouncer.complete();
  }

}
