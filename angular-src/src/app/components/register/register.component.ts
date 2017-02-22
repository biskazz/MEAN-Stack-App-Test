import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {FlashMessagesService} from 'angular2-flash-messages'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String
  username: String
  email: String
  password: String


  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please Fill in all fields', {cssClass: 'alert-danger', timeout: 3000})
      return false
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please enter valid email', {cssClass: 'alert-danger', timeout: 3000})
      return false
    }

    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You are now registered successfully.', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login'])
      } else {
        this.flashMessage.show('Register error.', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register'])
      }
    })
  }
}
