import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleApiService } from '../google-api.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
user:any;
username:any;
  constructor(private readonly googleApi: GoogleApiService , private router:Router,  private studentService:StudentService) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.user=JSON.parse(sessionStorage.getItem('id_token_claims_obj'));
      if(!this.googleApi.isLoggedIn())
      this.router.navigate(['/login']) },100)
  
     
    }

    submit(){
      this.studentService.addStudent(this.user.sub, this.user.family_name, this.user.given_name, this.username, this.user.email, this.user.picture).subscribe(res=>{
        this.router.navigate(['/profil']) 
      })
    }
  

}
