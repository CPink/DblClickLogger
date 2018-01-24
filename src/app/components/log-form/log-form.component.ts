import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
import { Log } from '../../models/log';


@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  id: string;
  title: string;
  date: any;
  isNew: boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit() {
    //subscribe to selectedLog observable
    this.logService.selectedLog.subscribe(log => {
      if(log.id !== null){
        this.isNew = false;
        this.id = log.id;
        this.title = log.title;
        this.date = log.date;
      }
    });
  }

  onSubmit(){

    //check to see if the log being submited is new
    if(this.isNew){
      //create new Log
      const newLog = {
        id: this.generateId(),
        title: this.title,
        date: new Date()
      }

      //Add log
      this.logService.addLog(newLog);
    }else{
      //generate update log 
      const updLog = {
        id: this.id,
        title: this.title,
        date: new Date()
      }
      //update the Log
      this.logService.updateLog(updLog);
    }

    //clear state
    this.clearState();
  }

  //javascript method to generate a compliant RFC4112 version 4 id
  generateId() {
  
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
   }

   clearState(){
     this.isNew = true;
     this.id = null;
     this.title = null;
     this.date = null;
     this.logService.clearState();
   }

}
