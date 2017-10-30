import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  pmtpressed: boolean = false;
  recpressed: boolean = false;
  admpressed: boolean = false;
  adrpressed: boolean = false;
  trspressed: boolean = false;

  pocs = [
    { value: 'POC01', viewValue: 'Mumbai'},
    { value: 'POC02', viewValue: 'Delhi'},
    { value: 'POC03', viewValue: 'Ratlam'},
    { value: 'POC04', viewValue: 'Budnawar'},
    { value: 'POC05', viewValue: 'Vapi'}
  ]

  constructor() { }

  ngOnInit() {
  }

  private pmtbtnpressed() {
    this.closeotherforms();
    this.pmtpressed = true;

  }

  private recbtnpressed() {
    this.closeotherforms();
    this.recpressed = true;

  }

  private adrbtnpressed() {
    this.closeotherforms();
    this.adrpressed = true;

  }

  private admbtnpressed() {
    this.closeotherforms();
    this.admpressed = true;

  }
  private trsbtnpressed() {
    this.closeotherforms();
    this.trspressed = true;

  }

  private closeotherforms(){
    this.pmtpressed = false;
    this.recpressed = false;
    this.admpressed = false;
    this.adrpressed = false;
    this.trspressed = false;
  }

}
