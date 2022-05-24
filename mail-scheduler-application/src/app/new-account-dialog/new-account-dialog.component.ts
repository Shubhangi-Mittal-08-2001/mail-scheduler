import { Component,  Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginUserService } from '../login-user.service';

// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { DialogData, ScheduleComponent } from '../schedule/schedule.component';
export interface email_Configuration{
  accountName:string,
  email:string,
  id:number
}

@Component({
  selector: 'app-new-account-dialog',
  templateUrl: './new-account-dialog.component.html',
  styleUrls: ['./new-account-dialog.component.css']
})

export class NewAccountDialogComponent implements OnInit {

  constructor(private service:LoginUserService,@Inject(MAT_DIALOG_DATA) public data: email_Configuration) { 
    this.NewAccountForm=this.service.AccountForm;
  }
 
  ngOnInit(): void {
    // this.service.accountName=this.service.accountFormDetailsOfParticularId.accountName
    // console.log(this.service.accountName);
    
  }

  NewAccountForm=new FormGroup({
    accountName:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required),
    incomingServer:new FormControl('',Validators.required),
    incomingServerPort:new FormControl('',Validators.required),
    outgoingServer:new FormControl('',Validators.required),
    outgoingServerPort:new FormControl('',Validators.required)

  })
 
  
  submit()
  {
    console.log("inside the submit method");
    console.log("new Account form data",this.NewAccountForm.value);
    this.service.postAccountTypeInfoToJson(this.NewAccountForm.value)
    this.service.AccountForm=this.NewAccountForm
  }

  
}
