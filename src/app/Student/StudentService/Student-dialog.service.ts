import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { StudentDialogComponent } from '../StudentDialog/student-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class StudentDialogService {

  dialogRef: MatDialogRef<StudentDialogComponent>;
  
  constructor(private dialog: MatDialog) { }

  public open(options) {
    this.dialogRef = this.dialog.open(StudentDialogComponent, {  
        disableClose:true,  
         data: {
           title: options.title,
           message: options.message,
           cancelText: options.cancelText,
           confirmText: options.confirmText,
           IsInstrucation : options.IsInstrucation
         }
    });  
  }

  public confirmed(): Observable<any> {
    
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }
    ));
  }

  
  
}
