import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{

  constructor(private elementRef: ElementRef,private ac:ActivatedRoute,private router:Router , private service:StudentService, private locationStrategy: LocationStrategy ) 
  {}
  ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = 'teal';
  }

questions:any;
exam:any;
i=0;
ans=null;
googleId;
idExam;
loading=true;
disableNext=false;

  ngOnInit(): void {
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    });
    
    this.googleId=JSON.parse(sessionStorage.getItem('id_token_claims_obj')).sub;
    this.idExam=this.ac.snapshot.params['id'];
    this.service.getCurrentExam(this.idExam,this.googleId).subscribe(
      res=>{
        console.log(res.exam.questions);
        this.exam=res.exam
        this.questions=res.exam.questions;
        this.loading=false;
       
      }
    )
  }
  beforeUnloadHandler(event) {
    event.preventDefault();
    event.returnValue = '';
    return 'Are you sure you want to leave?';
  }
  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }
  next(){
    if(this.exam.questions[this.i].answer==this.ans){
      Swal.fire({
        title: 'Nice!',
        text: 'Correct Answer',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      this.exam.questions[this.i].selectedAnswer=this.ans;
      this.i+=1;
      this.ans=null;
      console.log(this.exam.questions);
      this.service.updateExam(this.googleId,this.exam).subscribe()
    }else{
      this.disableNext=true;
      this.service.gpt(this.exam.questions[this.i].question).subscribe(
        res=>{
          console.log(res);
          Swal.fire({
            title: 'Bad Answer!',
            text: res.choices[0].text,
            icon: 'error',
            confirmButtonText: 'Understood'
          });
          
          this.exam.questions[this.i].selectedAnswer=this.ans;
          this.i+=1;
          this.ans=null;
          console.log(this.exam.questions);
          this.service.updateExam(this.googleId,this.exam).subscribe();
          this.disableNext=false;
      
        }
      )
    
    }
  
  }
  submit(){
    if(this.exam.questions[this.i].answer==this.ans){
      Swal.fire({
        title: 'Nice!',
        text: 'Correct Answer',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      this.exam.questions[this.i].selectedAnswer=this.ans;
      this.service.submitExam(this.googleId,this.exam).subscribe(
        res=>{
          
          this.router.navigate(['result',this.idExam]);
        }
      )
    }else{
      this.service.gpt(this.exam.questions[this.i].question).subscribe(
        res=>{
          Swal.fire({
         
          })
          
        Swal.fire({
          title: 'Bad Answer!',
          text: res.choices[0].text,
          
          confirmButtonText: 'Understood',
          icon: 'error',
         
       
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.exam.questions[this.i].selectedAnswer=this.ans;
            this.service.submitExam(this.googleId,this.exam).subscribe(
              re=>{
                
                this.router.navigate(['result',this.idExam]);
              }
            )
          } else if (result.isDenied) {
            this.exam.questions[this.i].selectedAnswer=this.ans;
          this.service.submitExam(this.googleId,this.exam).subscribe(
            re=>{
              
              this.router.navigate(['result',this.idExam]);
            }
          )
          }
        });
         
        }
      )
    
    }
  
 

  }

}
