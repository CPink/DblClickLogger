import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';

import { Log } from '../models/log'

@Injectable()
export class LogService {

  //properties
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, title: null, date: null});
  private stateSource  = new BehaviorSubject<boolean>(true);


  stateClear = this.stateSource.asObservable();

  selectedLog = this.logSource.asObservable();


  //methods
  constructor() { 
   this.logs = [];
  }

  //method to get the logs
  getLogs(): Observable<Log[]>{
    if(localStorage.getItem('logs') === null){
      this.logs = [];
    }else{
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a,b) => {
      return b.date = a.date;
    }));
  }

  //method to inject the log into the log form when clicked
  setFormLog(log: Log){
    this.logSource.next(log);
  }

  addLog(log: Log){
    this.logs.unshift(log);

    //add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log){
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id){
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);

      //update local storage
      localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log){
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id){
        this.logs.splice(index, 1);
      }
    });

      //delete from local storage
      localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState(){
    this.stateSource.next(true);
  }

}
