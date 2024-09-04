import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isAuthenticated: boolean = false; 
  constructor(private _AuthService: AuthService, private _Router: Router){

    _AuthService.currentUser.subscribe(
      () => {
        console.log(_AuthService.getCurrentUser().getValue());
        if (_AuthService.getCurrentUser().getValue() != null) {this.isAuthenticated = true}
        else {this.isAuthenticated = false}
      }
    )
  }

  logout(){
    this._AuthService.logout();
    this._Router.navigate(['/home']);
  }

}
