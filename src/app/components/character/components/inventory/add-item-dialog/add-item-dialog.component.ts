import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '@shared/models/category.model';
import { Item } from '@shared/models/item.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html'
})
export class AddItemDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  nameControl: FormControl = new FormControl(null, [Validators.required]);
  quantityControl: FormControl = new FormControl(null, [Validators.required]);
  weightControl: FormControl = new FormControl(null, [Validators.required]);
  priceControl: FormControl = new FormControl(null, [Validators.required]);
  categoryControl: FormControl = new FormControl(null, [Validators.required]);
  filteredOptions?: Observable<Category[]>;
  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category[]
  ) {
    this.form.addControl('name', this.nameControl);
    this.form.addControl('quantity', this.quantityControl);
    this.form.addControl('weight', this.weightControl);
    this.form.addControl('price', this.priceControl);
    this.form.addControl('categoryId', this.categoryControl);
  }

  ngOnInit(): void {
    this.filteredOptions = this.categoryControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.data.slice()))
    );
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const item: Item = {
        name: this.nameControl.value,
        quantity: this.quantityControl.value,
        weight: this.weightControl.value,
        price: this.priceControl.value,
        categoryId: this.categoryControl.value.id
      };
      this.dialogRef.close(item);
    }
  }

  displayFn(category: Category): string {
    return category && category.name ? category.name : '';
  }

  private _filter(name: string): Category[] {
    return this.data.filter((category) => category.name.toLowerCase().includes(name.toLowerCase()));
  }
}
