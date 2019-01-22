import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { User } from '@app/_models';
import { Subscription } from 'rxjs';
import { UserService, AuthenticationService, FilterPipe, AlertService } from '@app/_services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Productservice } from '@app/_models';
import { FormsModule } from '@angular/forms';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit {

   pid: number;
    pname: string;
   categoryid: number;
   categoryname: string;
   paddress: string;
    
    desc: string;

   product: Productservice;
   currentuser: User;


 

    currentUserSubscription: Subscription;
     loading = false;
        registerForm: FormGroup;
        title = 'app';
//const URL = 'http://localhost:3000/api/upload';
 // public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});


  constructor(
         private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentuser = user;
        });
    }

  ngOnInit() {

 // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  //  this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
   //      console.log('ImageUpload:uploaded:', item, status, response);
   //      alert('File uploaded successfully');
   //  };

  }

  saveProfile() {
       this.loading = true;
       console.log("test");
        this.userService.update(this.currentuser)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update successful', true);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

  }

     create()
    {
      try{
            console.log("inner");
           console.log(this.product.pname);
           
            this.userService.addProduct(this.product).subscribe();
            this.userService.updateProduct(this.product)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update successful', true);
                    
                },
                error => {
                    this.alertService.error(error);
                    
                });
            
      }
      catch(error)
      {
        console.log(error);
      }
    }

}


