import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Online_Shop';

  constructor(private _Router: Router, private _AuthService: AuthService){}

  ngOnInit() {
    this._Router.events.subscribe(event => {
      if (event instanceof NavigationStart) {

        if (this._AuthService.checkToken()){
          if (!this._AuthService.validateToken()) {
            this._AuthService.logout();
          }
        }

      }
    });
  }
}
