import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable, share } from 'rxjs';
import { NamedItem } from 'src/app/interfaces/named-item';
import { NamedItemServiceBase } from 'src/app/services/named-item.service';

import { NzMessageService } from 'ng-zorro-antd/message';

@Component({ template: '' })
export class NamedItemComponent<T extends NamedItem> implements OnInit {
  showModalEvent = new EventEmitter<any>();
  namedItems: T[] = [];

  loadingAdd: boolean = false;

  constructor(private namedItemService: NamedItemServiceBase<T>, private message: NzMessageService) { }

  addRow(item: NamedItem): Observable<T> {
    this.loadingAdd = true;
    let addResult = this.namedItemService.add(item).pipe(share());

    addResult.subscribe({
      next: () => {
        this.namedItems = [
          ...this.namedItems,
          item as T
        ];
      },
      error: () => {
        this.loadingAdd = false;
      },
      complete: () => {
        this.loadingAdd = false;
      }
    });

    return addResult;
  }

  deleteRow(id: string): Observable<any> {
    let result = this.namedItemService.delete(id).pipe(share());

    result.subscribe({
      next: () => {
        this.namedItems = this.namedItems.filter(d => d.id !== id);
        this.message.create("success", `${id} supprimé`);
      },
      error: () => {
        this.message.create("error", `Impossible de supprimer ${id}`);
      }
    });

    return result;
  }

  updateRow(data: T): Observable<any> {
    return this.namedItemService.update(data);
  }

  exportToSap(): void {

  }

  exportToCsv(): void {

  }

  onSearchProject(event: string): void {

  }

  ngOnInit(): void {
    let data = this.namedItemService.getAllWithDeleted();
    data.subscribe({
      next: (data) => {
        this.namedItems = data;
      }
    });
  }

}
