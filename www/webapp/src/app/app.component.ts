import { Component, OnInit } from '@angular/core';
import { AuthService } from "./_services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  constructor(private authService:AuthService){}

  isLogged:boolean;

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
  }
}
