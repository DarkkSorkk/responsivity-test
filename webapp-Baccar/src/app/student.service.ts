import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url:any;
  gpt_token:any;

  constructor(private http:HttpClient  ) {
    this.url=environment.url;
    this.gpt_token=environment.gpt_token;
   }
   getStudent(googleId):Observable<any>{
 

    return this.http.get(this.url+'/api/v1/students/'+googleId
    )
  }
  addStudent(googleId, firstName, lastName, userName, email, photoUrl):Observable<any>{

    return this.http.post<any>(this.url+'/api/v1/students/add',{
      googleId, firstName, lastName, userName, email, photoUrl
    }
    )
  }
  getExams():Observable<any>{
 

    return this.http.get(this.url+'/api/v1/exams/'
    )
  }
  beginExam(examId, googleId):Observable<any>{

    return this.http.post<any>(this.url+'/api/v1/students/begin',{
      examId, googleId
    }
    )
  }
  getCurrentExam(examId,googleId):Observable<any>{

    return this.http.get(`${this.url}/api/v1/students/current-exam/${examId}/${googleId}`
    )
  }

  updateExam( googleId,exam):Observable<any>{

    return this.http.put<any>(this.url+'/api/v1/students/update-exam',{
     googleId,exam
    }
    )
  }
  submitExam( googleId,exam):Observable<any>{

    return this.http.put<any>(this.url+'/api/v1/students/submit-exam',{
     googleId,exam
    }
    )
  }
  gpt( input):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.gpt_token}` 
    });
    const body=
    {
      "model": "text-davinci-003",
      "prompt": input,
      "temperature": 0.7,
      "max_tokens": 256,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0.6,
      "stop": [" Human:", " AI:"]
    }
    

    return this.http.post<any>('https://api.openai.com/v1/completions',body,{ headers }
    
    )
  }

  
  
}
