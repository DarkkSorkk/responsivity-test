import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleApiService } from '../google-api.service';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
user:any;
username;
exams:any;
loading=true;
constructor(private elementRef: ElementRef ,private readonly googleApi: GoogleApiService , private router:Router , private studentService:StudentService) {


   }

  ngOnInit(): void {
    setTimeout(()=>{
      this.user=JSON.parse(sessionStorage.getItem('id_token_claims_obj'));
      if(!this.googleApi.isLoggedIn()){
 this.router.navigate(['/login']) }
   else{

  this.studentService.getStudent(this.user.sub).subscribe(res=>{
    
    if(!res.student){
      console.log(res.student)
      this.router.navigate(['/username']);
    }else{
      if(res.student.allowed==false){
   
        Swal.fire({
          title: 'Sorry you cannot connect!',
          text: 'please contact the admin',
          icon: 'error',
          confirmButtonText: 'Understood!',
       
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.googleApi.signOut();
          } else if (result.isDenied) {
            this.googleApi.signOut();
          }
        });
    
        
  
       


      }else{
        this.username=res.student.userName
      
      this.studentService.getExams().subscribe(res=>{
      
        this.exams=res.exams;
        this.loading=false
      })
      }
      
      
    }
  })
 } },100)

     
    }
    ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = 'teal';
  }
    
  
   
    
 
  logout() {
    this.googleApi.signOut();
    this.router.navigate(['/login']);
  
  }

}
