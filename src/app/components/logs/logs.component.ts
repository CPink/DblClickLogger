import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/log';
import { LogService } from '../../services/log.service';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  //properties
  logs: Log[];

  selectedLog: Log;
  loaded: boolean = false;

  //methods
  constructor(private logService: LogService) { }

  ngOnInit() {

    this.logService.stateClear.subscribe( clear => {
      if(clear){
        this.selectedLog = {id: null, title: null, date: null};
      }
    })

    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true;
  })

  
}

  onSelect(log: Log){
    this.logService.setFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log: Log){
    if(confirm('Are you sure you want to delete this Log?'))
    this.logService.deleteLog(log);
  }

}
