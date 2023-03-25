import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements AfterViewInit {

  loading=true;
  public timeLeft: number = 2;
  private interval: any;

  constructor(private elementRef: ElementRef , private ac:ActivatedRoute, private router:Router, private service:StudentService , private locationStrategy: LocationStrategy){ 
  }
   qustLength=0;
   score=0;
  ngOnInit(): void {
    this.startTimer();
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    });
    const googleId=JSON.parse(sessionStorage.getItem('id_token_claims_obj')).sub;
    const  id=this.ac.snapshot.params['id'];
 
    this.service.getCurrentExam(id,googleId).subscribe(
      res=>{
if(res.message=='Got current exam successfully!'){
  this.score=res.exam.score;
  this.qustLength=res.exam.questions.length;
}
      }
    )
  }
 
  ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = 'teal';
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stopTimer();
this.loading=false;
      }
    },1000)
  }
  stopTimer() {
    clearInterval(this.interval);
  }
}
