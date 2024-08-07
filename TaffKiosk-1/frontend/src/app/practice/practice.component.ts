import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormBuilder,Validators, ValidationErrors } from '@angular/forms';
import { NoSpace } from '../validation/nospace.validators';
import { filter, map, Observable, of, scan } from 'rxjs';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit{

  firstName : string = 'Jayasuriya'
  lastName : string = 'G'

  amount : number = 100;

  sample = new Observable<any>

  constructor(){
     const sample = of(0,1,2,3,4).pipe(filter(x => x > 3))



     sample.subscribe(x=>console.log("map", x))


       


  }
  ngOnInit(): void {
    this.sample.subscribe({
      next: x=> console.log(x),
      error: x => console.log(x),
      complete() {
        console.log('Complete');
        
      },
      
    })
  }
 
 
 
}