import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  isLoggedin!:boolean
  redirectUrl:string=""
  emailUsedForLogin!:string
  accountDetails:any=[]
  filteredAccountDetails:any=[]
  lastAccountData:any=[]
  emailDetails:any=[]
  filteredEmailData:any=[]
  lastEmail:any=[]
  splitLoginEmail!:Array<string>
  splitAccountDetailEmail!:Array<string>
  displayAccountName!:string
  count1:number=0
  counter2:number=0
  idOfEmailFormChosen!:number
  AccountForm:any
  accountName?:string=""
  email?:string=""
  password?:string=""
  incomingServer?:string=""
  incomingServerPort?:string=""
  outgoingServer?:string=""
  outgoingServerPort?:string=""
  accountFormDetailsOfParticularId:any
  constructor(private http:HttpClient,private router:Router) { }

  registerNewUser(registerFormData:any)
  {
    console.log("inside the registerUser making a post request");
    console.log("registerformdata in service",registerFormData);
    
    this.http.post("http://localhost:3000/register",registerFormData).subscribe((data)=>{
      console.log("after making the request",data);
    },
    (error)=>{
      alert("Could Not Register User")
      console.error("error",error)
    },
    ()=>{
      alert("Registeration Successful")
      
    })
  }

  loginUserData(loginData:any)
  {
    console.log("posting the login credentials to server");
    console.log("loginformdata in service",loginData);
    return this.http.post("http://localhost:3000/authenticate",loginData)
  }

  getAccountTypeInfoFromJson()
  {
     
    this.http.get("http://localhost:3001/mail-configurations").subscribe((data)=>{
      console.log("data retrived successfully",data)
      console.log("email used for login == ",this.emailUsedForLogin);
      this.accountDetails=data
      if(this.count1==0)
      {
        for(var i=0;i<this.accountDetails.length;i++)
        {
          console.log("logging the accountDetails information===",this.accountDetails[i]);
          this.splitLoginEmail =this.emailUsedForLogin.split("@")
          console.log("splitted value of login email",this.splitLoginEmail);
          var splitAccountDetailEmail=this.accountDetails[i].email.split("@")
          console.log("splitted value of accountDetail email",splitAccountDetailEmail);
          console.log("problem statement:   ",splitAccountDetailEmail[0]);
          
          if(splitAccountDetailEmail[0]==this.splitLoginEmail[0])
          {
            this.filteredAccountDetails.push(this.accountDetails[i])
            console.log("new Account details: === ",this.filteredAccountDetails);
          }
        }
        this.count1++;
        console.log("value of counter1 increased: ",this.count1);
      }
      else{
        this.filteredAccountDetails.push(this.accountDetails[this.accountDetails.length-1])
        console.log("last entered account details: === ",this.filteredAccountDetails);
      }
    },
    (error)=>{
      console.log("error occured",error);
      
    })
  }

  postAccountTypeInfoToJson(newAccountFormData:any){
    this.http.post("http://localhost:3001/mail-configurations",newAccountFormData).subscribe(()=>{
      console.log("data posted successfully");
      this.getAccountTypeInfoFromJson()
    },
    (error)=>{
      console.log("error occured cannot post data",error);
    }
    )
  }

  postNewEmailToJson(newEmailContent:any){
    this.http.post(" http://localhost:3001/emails",newEmailContent).subscribe((data)=>{
      console.log("post successful")
      this.getEmailFromJson()
    },
      (error)=>{
        console.log("error occured");
        
    })
  }
  getEmailFromJson()
  {
    
    this.http.get(" http://localhost:3001/emails").subscribe((data)=>{
      console.log("retreival successful of the email",data);
      this.emailDetails=data
      // if(this.counter2==0)
      // {
        for(var i=0;i<this.emailDetails.length;i++)
        {
          if(this.emailUsedForLogin==this.emailDetails[i].cc)
          {
            this.filteredEmailData.push(this.emailDetails[i])
          }
        }
      // this.counter2++;
      // }
      // else{
        this.lastEmail.push(this.emailDetails[this.emailDetails.length-1])
        //this.filteredEmailData.push(this.emailDetails[this.emailDetails.length-1])
      //}
      
    },
    (error)=>{
      console.log("mail could not be retreived");
      
    })
  }
  getAccountSpecificEmail()
  {
    return this.http.get(" http://localhost:3001/emails")
  }

  getEmailOfParticularId(id:number)
  {
    var url=" http://localhost:3001/emails"+"/"+id
    return this.http.get(url)
  }
  emails:any=[]
  postingEditedEmailData(newContent:any)
  {
    var url=" http://localhost:3001/emails"+"/"+this.idOfEmailFormChosen
    this.http.delete(url).subscribe((data)=>{
      console.log("email data successfully deleted");
      
    },
    (error)=>{
      console.log("something went wrong could not delete the mail");
      
    })
    this.http.post("http://localhost:3001/emails",newContent).subscribe((data)=>{
      console.log("post done successfully",data);
      this.getEmailFromJson()
    },
    (error)=>{
      console.log("errorssssssss");
      
    })
  }

  // getAccountInfoOfParticularAccount(id:number)
  // {
  //   var newurl="http://localhost:3001/mail-configurations"+"/"+id
  //   this.http.get(newurl).subscribe((responseData)=>{
  //       this.accountFormDetailsOfParticularId=responseData
  //       console.log(this.accountFormDetailsOfParticularId);
  //       this.accountName=this.accountFormDetailsOfParticularId.accountName;
  //       this.email=this.accountFormDetailsOfParticularId.email;
  //       this.password=this.accountFormDetailsOfParticularId.password;
  //       this.incomingServer=this.accountFormDetailsOfParticularId.incomingServer;
  //       this.incomingServerPort=this.accountFormDetailsOfParticularId.incomingServerPort;
  //       this.outgoingServer=this.accountFormDetailsOfParticularId.outgoingServer;
  //       this.outgoingServerPort=this.accountFormDetailsOfParticularId.outgoingServerPort
  //     })
    
  // }
// accountForm:any
  newAccountPopulate()
  {
    this.AccountForm=new FormGroup({
      accountName:new FormControl(this.accountName,Validators.required),
      email:new FormControl(this.email,Validators.required),
      password:new FormControl(this.password,Validators.required),
      incomingServer:new FormControl(this.incomingServer,Validators.required),
      incomingServerPort:new FormControl(this.incomingServerPort,Validators.required),
      outgoingServer:new FormControl(this.outgoingServer,Validators.required),
      outgoingServerPort:new FormControl(this.outgoingServerPort,Validators.required)
  
    })
  }
  getAccountInfoOfParticularAccounts(accountFormDetailsOfParticularId:any)
  {
    console.log(accountFormDetailsOfParticularId.accountName);
   
    
    this.accountName=accountFormDetailsOfParticularId.accountName;
    console.log(this.accountName);
    this.email=accountFormDetailsOfParticularId.email;
    this.password=accountFormDetailsOfParticularId.password;
    this.incomingServer=accountFormDetailsOfParticularId.incomingServer;
    this.incomingServerPort=accountFormDetailsOfParticularId.incomingServerPort;
    this.outgoingServer=accountFormDetailsOfParticularId.outgoingServer;
    this.outgoingServerPort=accountFormDetailsOfParticularId.outgoingServerPort
  }
}
