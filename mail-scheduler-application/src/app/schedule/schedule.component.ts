import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { LoginUserService } from '../login-user.service';
import { NewAccountDialogComponent } from '../new-account-dialog/new-account-dialog.component';


// export interface email{
//   to:string,
//   body:string,
//   date:string,
//   time:string
// }

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(public dialog: MatDialog,private service:LoginUserService) {
  }
  
  filteredAccountDetails2:any
  filteredEmailData2:any=[]
  displayAccountName!:string
  emailContent:any={}
  AccountTypeId!:number
  accountContent:any={}
  ngOnInit(): void {
      console.log("inside ngOninit");
      this.service.getAccountTypeInfoFromJson()
      this.filteredAccountDetails2=this.service.filteredAccountDetails
      
  }
  reload(){
    console.log("inside the reload method");
    
    window.location.reload()
  }
  openDialog(): void {
    this.service.AccountForm=new FormGroup({
      accountName:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      incomingServer:new FormControl('',Validators.required),
      incomingServerPort:new FormControl('',Validators.required),
      outgoingServer:new FormControl('',Validators.required),
      outgoingServerPort:new FormControl('',Validators.required)
  
    })
   
    const dialogRef = this.dialog.open(NewAccountDialogComponent, {
      width: '470px',
      height:'550px',
    }
    );
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  openDialogWithData()
  {
    this.service.newAccountPopulate();
    const dialogRef = this.dialog.open(NewAccountDialogComponent, {
      width: '470px',
      height:'550px',
    }
    );
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
    
    
  }
  
  displayAccountType(type:string,email:string,id:number,account:any)
  {
    console.log("i am account information---------",account);
    this.service.getAccountInfoOfParticularAccounts(account)
    
    this.filteredEmailData2=[]
    this.AccountTypeId=id
    this.displayAccountName=type;
    console.log("email received as parameter , ",email);
    this.service.getAccountSpecificEmail().subscribe(dataRetrieved=>{
      this.service.emailDetails=dataRetrieved
      console.log("details retrieved from server *******",this.service.emailDetails);
      for(var i=0;i<this.service.emailDetails.length;i++)
      {
        console.log("cc value of each data retrieved is: ",this.service.emailDetails[i].cc);
        if(this.service.emailDetails[i].cc===email)
        {
          console.log(this.service.emailDetails[i]);
          this.filteredEmailData2.push(this.service.emailDetails[i])
        }
        
      }
      //this.service.getAccountInfoOfParticularAccount(this.AccountTypeId)
  })
}

  newEmailForm=new FormGroup({
    to:new FormControl('',Validators.required),
    bcc:new FormControl(''),
    cc:new FormControl('',Validators.required),
    subject:new FormControl('',Validators.required),
    date:new FormControl('',Validators.required),
    time:new FormControl('',Validators.required),
    body:new FormControl('')

  })
 
  submitEmail()
  {
    console.log("form data of submit email",this.newEmailForm.value);
    this.service.postNewEmailToJson(this.newEmailForm.value)
    this.filteredEmailData2=this.service.lastEmail
    alert("Mail Scheduled Successfully")
    //this.filteredEmailData2=this.service.filteredEmailData
    this.newEmailForm=new FormGroup({
      to:new FormControl(''),
      bcc:new FormControl(''),
      cc:new FormControl(''),
      subject:new FormControl(''),
      date:new FormControl(''),
      time:new FormControl(''),
      body:new FormControl('')
    })

  }
  
  initialiseEmailWithContent(idOfEmailChosen:number)
  {
    this.service.idOfEmailFormChosen=idOfEmailChosen
    this.service.getEmailOfParticularId(idOfEmailChosen).subscribe(data=>{
      console.log("data of particular email",data);
      this.emailContent=data
      this.newEmailForm=new FormGroup({
        to:new FormControl(this.emailContent.to,Validators.required),
        bcc:new FormControl(this.emailContent.bcc),
        cc:new FormControl(this.emailContent.cc,Validators.required),
        subject:new FormControl(this.emailContent.subject,Validators.required),
        date:new FormControl(this.emailContent.date,Validators.required),
        time:new FormControl(this.emailContent.time,Validators.required),
        body:new FormControl(this.emailContent.body)
      })
    },
    (error)=>{
      console.log("error could not retrieve email of particular id");
      
    })
  }

  saveChanges()
  {
    this.filteredEmailData2=[]
    console.log(this.newEmailForm.value);
    this.service.postingEditedEmailData(this.newEmailForm.value)
    this.filteredEmailData2=this.service.lastEmail
    
  }
  clearEmail()
  {
    this.newEmailForm=new FormGroup({
      to:new FormControl(''),
      bcc:new FormControl(''),
      cc:new FormControl(''),
      subject:new FormControl(''),
      date:new FormControl(''),
      time:new FormControl(''),
      body:new FormControl('')
    })
  }
}
