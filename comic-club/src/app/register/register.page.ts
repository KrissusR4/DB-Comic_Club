import { Component, OnInit } from '@angular/core';
import { Color } from '@ionic/core';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { PopoverController } from '@ionic/angular';
import { UrlComponent } from '../url/url.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userName: string;
  userIndex: number;
  userPassword: string;
  userRPassword: string;
  userFax: number;
  userPhoto: string;
  isDisabled = true;

  check: User = null;

  errUser: Color = 'danger';
  errPass: Color = 'danger';
  errIndex: Color = 'primary';
  constructor(private userService: UserServiceService, private router: Router,private http: HttpClient,
              private popoverController: PopoverController) { }

  ngOnInit() {
    // INTRO TOASTS, OPTONAL
  }
  async register() {

    this.userService.registerUser({Id: null , nickname: this.userName , password: this.userPassword , picture: this.userPhoto, comicIdList: []});
    this.router.navigate(['/login']);

  }

  indexCheck() {

    if (this.errPass === 'primary' && this.errIndex === 'primary' && this.errUser === 'primary') {
      this.isDisabled = false;
    }

    
  }

  passCheck() {
    if (this.userPassword !== null && this.userPassword !== undefined && this.userPassword !== '' &&
     this.userRPassword !== null && this.userRPassword !== undefined && this.userRPassword !== '') {
       if (this.userPassword === this.userRPassword) {
         this.errPass = 'primary';
       }
    }
    if (this.errPass === 'primary' && this.errIndex === 'primary' && this.errUser === 'primary') {
      this.isDisabled = false;
    }
  }
  userCheck() {
    if (this.userName !== null && this.userName !== undefined && this.userName !== '') {
      this.errUser = 'primary';
    }

    if (this.errPass === 'primary' && this.errIndex === 'primary' && this.errUser === 'primary') {
      this.isDisabled = false;
    }
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: UrlComponent,
      translucent: true
    });
    return await popover.present();
}
}
