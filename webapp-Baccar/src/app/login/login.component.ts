import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { GoogleApiService, UserInfo } from '../google-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'angular-google-oauth-example';

  mailSnippets: string[] = []
  userInfo?: UserInfo

  constructor(private readonly googleApi: GoogleApiService , private router:Router) {
    if(this.googleApi.isLoggedIn())
    this.router.navigate(['/profil'])
    googleApi.userProfileSubject.subscribe( info => {
      this.userInfo = info
      console.log(info);
localStorage.setItem('user',JSON.stringify(this.userInfo.info))
    })
  }
  ngOnInit(): void {
 
     
    }
    
  
 login(){
this.googleApi.login();

}
  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn()
  }

  logout() {
    this.googleApi.signOut();
  
  }



}
