import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from './diallog-data.model';
import { Subject, map, takeUntil } from 'rxjs';
import { Country } from '../../models/country.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-city-dialog',
  templateUrl: './add-city-dialog.component.html',
  styleUrls: ['./add-city-dialog.component.scss']
})
export class AddCityDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  title: string;

  cityName: string = '';

  sub$: Subject<boolean> = new Subject();

  control: FormControl = new FormControl<string>('', [
    // Validators.required, 
    // Validators.minLength(2)
  ]);

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    public dialogRef: MatDialogRef<AddCityDialogComponent>) {

  }

  ngOnInit(): void {
    this.setTitle();
    this.control.valueChanges.pipe(takeUntil(this.sub$)).subscribe((name: string) => this.cityName = name);
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.sub$.next(false);
    this.sub$.unsubscribe();
  }

  setTitle(): void {
    this.dialogData.countries$.pipe(map((counteis: Country[]) =>
      counteis.find((country: Country) => country.id === this.dialogData.countryId)))
      .pipe(takeUntil(this.sub$))
      .subscribe({
        next: (country: Country) => this.title = country.name
      });
  }

  cancel() {
    this.dialogRef.close();
  }

  ok() {
    this.dialogRef.close({ cityName: this.cityName });
  }
}
