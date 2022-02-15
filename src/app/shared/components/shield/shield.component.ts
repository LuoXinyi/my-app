import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shield',
  templateUrl: './shield.component.html',
  styleUrls: ['./shield.component.scss'],
})
export class ShieldComponent {
  @Input() loadingFlag: boolean = false;

  constructor() {}
}
