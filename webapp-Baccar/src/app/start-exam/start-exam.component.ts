import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { SubscriptionServiceService } from '../subscription-service.service';

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css']
})
export class StartExamComponent implements AfterViewInit{
  public timeLeft: number = 15;
  private interval: any;

  constructor(private elementRef: ElementRef , private ac:ActivatedRoute, private router:Router , private subscriptionService: SubscriptionServiceService) {

  }
  title=this.ac.snapshot.params['title'];
  id=this.ac.snapshot.params['id'];
  ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = 'teal';
  }

  ngOnInit(): void {
    this.startTimer();
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stopTimer();
        this.router.navigate(['test',this.id]);
      }
    },1000)
  }

  stopTimer() {
    clearInterval(this.interval);
  }

}