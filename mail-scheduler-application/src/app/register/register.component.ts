import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserService } from '../login-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerUserService:LoginUserService,private router:Router) { }

  ngOnInit(): void {
  }
  registrationForm=new FormGroup({
    email:new FormControl('',Validators.required),
    pswd:new FormControl('',Validators.required),
    confirmpswd:new FormControl('',Validators.required)
  })
  

  registerUser()
  {
    console.log("register form details",this.registrationForm.value);
    this.registerUserService.registerNewUser(this.registrationForm.value)
    this.registrationForm=new FormGroup({
      email:new FormControl(''),
      pswd:new FormControl(''),
      confirmpswd:new FormControl('')
    })
    this.router.navigate([''])
    
  }

  

}
