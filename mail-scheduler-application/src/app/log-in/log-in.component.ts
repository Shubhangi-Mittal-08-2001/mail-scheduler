import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserService } from '../login-user.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})


export class LogInComponent implements OnInit {

  constructor(private loginUserService:LoginUserService,private router:Router) { }

  ngOnInit(): void {
  }
  loginForm=new FormGroup({
    email:new FormControl('',Validators.required),
    pswd:new FormControl('',Validators.required)
  })

  loginUser()
  {
    console.log("inside the login user method , form data of login form is: ",this.loginForm.value);
    this.loginUserService.emailUsedForLogin=this.loginForm.controls['email'].value
    console.log("value of emailUsedForLogin is:   ",this.loginUserService.emailUsedForLogin);
    
    this.loginUserService.loginUserData(this.loginForm.value).subscribe((data)=>{
      console.log("after making the login request",data);
      this.loginUserService.isLoggedin=true
      alert("Login Successful")
      this.loginForm=new FormGroup({
        email:new FormControl(''),
        pswd:new FormControl('')
      })
      this.router.navigate([this.loginUserService.redirectUrl])
    },
    (error)=>{
      this.loginUserService.isLoggedin=false
      alert("Could Not Authenticate User")
      this.router.navigate([this.loginUserService.redirectUrl])
      console.error("error",error)
      
    },
   
    )
    
  }
}
