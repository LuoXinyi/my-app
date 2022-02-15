import { Component, OnInit } from '@angular/core';
import { UserInfoDto } from 'src/app/shared/dto/user/user-info.dto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isSignIn = false;
  public userInfo: UserInfoDto = new UserInfoDto();

  constructor() { }

  ngOnInit(): void {
    // get userName form server TODO
    this.userInfo.userName = "Test User";
  }

}
