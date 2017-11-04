import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  uid: string = '';
  selectedPOC: string = '';
  
  pmtpressed: boolean = false;
  recpressed: boolean = false;
  admpressed: boolean = false;
  adrpressed: boolean = false;
  trspressed: boolean = false;

  pmPayee: string = '';
  pmAmount: number = 0;
  pmComment: string = '';
  rcPayer: string = '';
  rcAmount: number = 0;
  rcComment: string = '';
  apmPayee: string = '';
  apmAmount: number = 0;
  apmComment: string = '';
  arcPayer: string = '';
  arcAmount: number = 0;
  arcComment: string = '';
  transferPOC: string = '';
  transferAmount: number = 0;
  transferComment: string = '';

  pocs = [
    { value: 'Mumbai', viewValue: 'Mumbai'},
    { value: 'Delhi', viewValue: 'Delhi'},
    { value: 'Ratlam', viewValue: 'Ratlam'},
    { value: 'Budnawar', viewValue: 'Budnawar'},
    { value: 'Vapi', viewValue: 'Vapi'}
  ]

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) { 
    afAuth.authState.subscribe((user) => {
      if (user !== null) {
        this.uid = user.uid;
      }
    })
  }

  ngOnInit() {
  }

  private pmtbtnpressed() {
    this.closeotherforms();
    this.pmtpressed = true;
  }

  private pmtTransaction() {
    this.closeotherforms();
    let dt = new Date();
    let dtNow = dt.toLocaleString();
    console.log(dt);
    let pmObject = {payee: this.pmPayee, amount: this.pmAmount, payer: this.uid, comment: this.pmComment, timestamp: dtNow };
    this.db.list('transactions/' + this.selectedPOC + '/pmtMade').push(pmObject);
    this.clearInputs(1);
  }

  private recbtnpressed() {
    this.closeotherforms();
    this.recpressed = true;

  }

  private recTransaction() {
    this.closeotherforms();
    let dt = new Date();
    let dtNow = dt.toLocaleString();
    console.log(dt);
    let pmObject = {payer: this.rcPayer, amount: this.rcAmount, payee: this.uid, comment: this.rcComment, timestamp: dtNow };
    this.db.list('transactions/' + this.selectedPOC + '/pmtRec').push(pmObject);
    this.clearInputs(2);
  }

  private adrbtnpressed() {
    this.closeotherforms();
    this.adrpressed = true;

  }

  private arecTransaction() {
    this.closeotherforms();
    let dt = new Date();
    let dtNow = dt.toLocaleString();
    console.log(dt);
    let pmObject = {payer: this.arcPayer, amount: this.arcAmount, payee: this.uid, comment: this.arcComment, timestamp: dtNow };
    this.db.list('transactions/' + this.selectedPOC + '/apmtRec').push(pmObject);
    this.clearInputs(3);
  }

  private admbtnpressed() {
    this.closeotherforms();
    this.admpressed = true;

  }

  private apmtTransaction() {
    this.closeotherforms();
    let dt = new Date();
    let dtNow = dt.toLocaleString();
    console.log(dt);
    let pmObject = {payee: this.apmPayee, amount: this.apmAmount, payer: this.uid, comment: this.apmComment, timestamp: dtNow };
    this.db.list('transactions/' + this.selectedPOC + '/apmtMade').push(pmObject);
    this.clearInputs(4);
  }

  private trsbtnpressed() {
    this.closeotherforms();
    this.trspressed = true;

  }

  private transferTransaction() {
    this.closeotherforms();
    let dt = new Date();
    let dtNow = dt.toLocaleString();
    console.log(dtNow);
    let pmObject = {transferPOC: this.transferPOC, amount: this.transferAmount, payer: this.uid, comment: this.transferComment, timestamp: dtNow };
    this.db.list('transactions/' + this.selectedPOC + '/transfer').push(pmObject);
    this.clearInputs(5);
  }

  private closeotherforms(){
    this.pmtpressed = false;
    this.recpressed = false;
    this.admpressed = false;
    this.adrpressed = false;
    this.trspressed = false;
  }

  clearInputs(i: number) {
    switch(i) {
      case 1: 
        this.pmPayee = '';
        this.pmAmount = 0;
        this.pmComment = '';
        break;
      case 2:
        this.rcPayer = '';
        this.rcAmount = 0;
        this.rcComment = '';
        break;
      case 3:
        this.apmPayee = '';
        this.apmAmount = 0;
        this.apmComment = '';
        break;
      case 4:
        this.arcPayer = '';
        this.arcAmount = 0;
        this.arcComment = '';
        break;
      case 5:
        this.transferPOC = '';
        this.transferAmount = 0;
        this.transferComment = '';
        break;
      default: break;
    }
  }

}
