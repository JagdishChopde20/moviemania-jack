import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-adult-confirm',
  templateUrl: './dialog-adult-confirm.component.html',
  styleUrls: ['./dialog-adult-confirm.component.css']
})
export class DialogAdultConfirmComponent implements OnInit {
  birthdate: Date;
  maxDate: Date = new Date();

  frmCtrl_birthdate = new FormControl(new Date(), [Validators.required]);

  constructor(public dialogRef: MatDialogRef<DialogAdultConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.frmCtrl_birthdate.hasError(errorName);
  }
}
