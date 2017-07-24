import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string;
  password:string;

  constructor(
    public authService:AuthService,
    public router:Router,
    public flashMessagesService:FlashMessagesService
  ) { }

  ngOnInit() {
  }
  onSubmit(){
    this.authService.register(this.email, this.password)
    .then((res) => {
      this.flashMessagesService.show('New user registered', { cssClass:'alter-sucess', timeout: 4000});
      this.router.navigate(['/']);
    })
    .catch((err) =>{
      this.flashMessagesService.show(err.message, { cssClass:'alter-danger', timeout: 4000});
      this.router.navigate(['/register']);
    });
  }
}
