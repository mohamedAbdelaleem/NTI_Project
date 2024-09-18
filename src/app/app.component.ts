import { Component } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeroComponent } from "./hero/hero.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AuthService } from './services/auth.service';
import { LoginComponent } from "./login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroComponent, SidebarComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Dashboard';
  isAuthenticated: boolean = false;
  constructor(private _Router: Router, private _AuthService: AuthService){}

  ngOnInit() {
    this._Router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log(this.isAuthenticated);
        this.isAuthenticated = true;
        if (this._AuthService.checkToken()){
          if (!this._AuthService.validateToken()) {
            this.isAuthenticated = false;
            this._AuthService.logout();
          }
        }
        else{
          this.isAuthenticated = false;
        }

      }
    });
  }
}
