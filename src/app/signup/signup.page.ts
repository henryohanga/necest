import { Component, OnInit } from '@angular/core';

import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user: User = {} as User;

  constructor(private authService: AuthService, private navController: NavController) {}

  ngOnInit() {}

  /**
   * Handler for user signup
   */
  signup() {
    this.authService.createUser(this.user).subscribe(data => {
      if (data) {
        this.navController.navigateForward('/login');
      }
    });
  }
}
