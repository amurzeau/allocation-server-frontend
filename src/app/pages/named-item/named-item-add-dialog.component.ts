import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Observable, Subject } from 'rxjs';
import { NamedItem } from 'src/app/interfaces/named-item';

type NewItemFunction = (data: NamedItem) => Observable<any>;

@Component({
  selector: 'app-named-item-add-dialog',
  template: `
        <nz-modal [(nzVisible)]="isVisible" [nzOkLoading]="isLoading" nzTitle="Create new item" (nzOnCancel)="isVisible = false" (nzOnOk)="submitForm()">
          <ng-container *nzModalContent>
            <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()" (keydown.enter)="submitForm()">
              <nz-form-item>
                <nz-form-label nzRequired nzFor="id">ID</nz-form-label>
                <nz-form-control nzErrorTip="The input is not valid ID or is empty!">
                  <input cdkFocusRegionStart nz-input formControlName="id" id="id" />
                </nz-form-control>
              </nz-form-item>
              <nz-form-item>
                <nz-form-label nzRequired nzFor="name">Nom</nz-form-label>
                <nz-form-control nzErrorTip="The input is required!">
                  <input nz-input formControlName="name" id="name" />
                </nz-form-control>
              </nz-form-item>
            </form>
          </ng-container>
        </nz-modal>
        `
})
export class NamedItemAddDialogComponent implements OnInit {
  @Input()
  showModal!: EventEmitter<any>;

  @Input()
  createItem!: NewItemFunction;

  validateForm!: FormGroup;
  isLoading: boolean = false;
  isVisible: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: [null, [Validators.required, Validators.pattern(/^[a-z0-9\-]+$/)]],
      name: [null, [Validators.required]]
    });

    this.showModal.subscribe({
      next: () => {
        if (this.isVisible === false) {
          this.validateForm.reset();
          this.isLoading = false;
          this.isVisible = true;
        }
      }
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isLoading = true;
      console.log('submit', this.validateForm.value);
      this.createItem(this.validateForm.value).subscribe({
        complete: () => {
          this.isLoading = false;
          this.isVisible = false;
        },
        error: () => {
          this.isLoading = false;
        }
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
