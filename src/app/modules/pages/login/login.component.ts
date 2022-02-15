import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loadingFlag: boolean = false;

  userName: string = "";
  password: string = "";
  loginFail = false;

  constructor(private router:Router,
    private loginService: LoginService) { }

  myForm: any;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'name': new FormControl('',
        {
          validators: [Validators.required, Validators.minLength(4)],
        }),
        'password': new FormControl('',{
          validators: [Validators.required, Validators.minLength(8)],
        })
    });
  }

  submit() {
    this.myForm.markAllAsTouched();
    this.loadingFlag = true;
    if(this.myForm.invalid){
      this.loadingFlag = false;
      return;
    }
    this.loginService.login(this.userName,this.password).subscribe(
      (res: any) =>{
        console.log(res);
        this.router.navigateByUrl("course-info");
        this.loadingFlag = false;
      },
      (err: any) => {
        this.loginFail = true;
        this.loadingFlag = false;
      }
    )
  }

  defaultBlur(tooltip:any,formControl:any){
    if(formControl.invalid){
      tooltip.show();
    }else{
      tooltip.hide();
    }
  }

  get name() { return this.myForm.get('name'); }

}
