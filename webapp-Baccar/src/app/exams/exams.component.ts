import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  constructor(private router:Router , private studentService:StudentService) { }
exams:any;
loading=true;
  ngOnInit(): void {
    this.studentService.getExams().subscribe(res=>{
      
      this.exams=res.exams;
      this.loading=false
    })
  }
  startExam(id){
    const user=JSON.parse(sessionStorage.getItem('id_token_claims_obj')); 
   
    this.studentService.getCurrentExam(id,user.sub).subscribe(
      res=>{
        if(res.exam){
          Swal.fire({
            title: 'Error!',
            text: 'You have already passed this exam',
            icon: 'error',
            confirmButtonText: 'Understood'
          })
        }else{
          this.studentService.beginExam(id,user.sub).subscribe(
            res=>{
              if(res.message=='Successfully started exam!'){
                console.log(res);
               this.router.navigate(['startExam/',res.exam.title,res.exam._id]);
            
              }
            }
          ) 
        }
      
      }
    ) 
   
  }

}
