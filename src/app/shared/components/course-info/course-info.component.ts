import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  date: string;
}

export interface PeriodicElement {
  sunday: number;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { sunday: 1, monday: 2, tuesday: 3, wednesday: 4, thursday: 5, friday: 6, saturday: 7 }
];

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
})
export class CourseInfoComponent implements OnInit {

  displayedColumns: string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  dataSource = ELEMENT_DATA;
  date: Date = new Date();

  today: number = 0;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.today = new Date().getDate();
    this._generateCalendarDays();
  }

  isOccupied(date: number) {
    if (date === 10 || date === 12 || date === 13) {
      return true;
    } else {
      return false;
    }
  }

  openDialog(event: any) {
    console.log("event", event);
    let date = "" + this.date.getFullYear() + "-"
      + this.date.getMonth() + "-"
      + event.target.parentElement.parentElement.parentElement.querySelector('p').textContent;
    const dialogRef = this.dialog.open(CourseInfoDialog, {
      data: {
        date: date,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("qqqqq", result);
    });
  }

  private _generateCalendarDays(): void {
    let calendar: PeriodicElement[] = [];
    let day: Date = new Date();
    // always begin with sunday
    let whichDay = new Date(day.setDate(day.getDate() - 7)).getDay();
    for (let i = 0; i < 7; i++) {
      if (whichDay === 0) {
        break;
      } else {
        day.setDate(day.getDate() + 1);
        whichDay = day.getDay();
      }
    }
    for (let i = 0; i < 5; i++) {
      let sunday = day.getDate();
      let monday = new Date(day.setDate(day.getDate() + 1)).getDate();
      let tuesday = new Date(day.setDate(day.getDate() + 1)).getDate();
      let wednesday = new Date(day.setDate(day.getDate() + 1)).getDate();
      let thursday = new Date(day.setDate(day.getDate() + 1)).getDate();
      let friday = new Date(day.setDate(day.getDate() + 1)).getDate();
      let saturday = new Date(day.setDate(day.getDate() + 1)).getDate();
      day.setDate(day.getDate() + 1);

      let a: PeriodicElement = {
        sunday: sunday, monday: monday, tuesday: tuesday, wednesday: wednesday,
        thursday: thursday, friday: friday, saturday: saturday
      };
      calendar.push(a);
    }
    this.dataSource = calendar;
  }

}

@Component({
  selector: 'course-info-dialog',
  templateUrl: 'course-info-dialog.html'
})
export class CourseInfoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}