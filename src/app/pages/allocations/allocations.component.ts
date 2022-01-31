import { Component, OnInit } from '@angular/core';

interface ItemData {
  id: string;
  name: string;
  nature: string;
  duration: string;
}

@Component({
  selector: 'app-allocations',
  templateUrl: './allocations.component.html',
  styleUrls: ['./allocations.component.scss']
})
export class AllocationsComponent implements OnInit {
  
  i = 0;
  editId: string | null = null;
  listOfData: ItemData[] = [];

  constructor() { }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `Project ${this.i}`,
        nature: 'development',
        duration: `1`
      }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  exportToSap(): void {

  }

  exportToCsv(): void {

  }

  ngOnInit(): void {
    this.addRow();
    this.addRow();
  }

}
