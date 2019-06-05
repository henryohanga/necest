import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any = {};
  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage,
  ) {
    if (this.authService.getToken()) {
      this.goToPics();
    }
  }

  ngOnInit() {}

  login() {
    this.authService.loginUser(this.user).subscribe(data => {
      if (data) {
        this.goToPics();
      }
    });
  }

  private goToPics() {
    this.navCtrl.navigateForward('/tabs/tab2');
  }
}
