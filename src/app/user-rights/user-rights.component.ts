import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AuthComponent } from './../shared/auth/auth.component';
import { Component, OnInit } from '@angular/core';
import { MatCheckbox } from '@angular/material';


@Component({
  selector: 'app-user-rights',
  templateUrl: './user-rights.component.html',
  styleUrls: ['./user-rights.component.css']
})
export class UserRightsComponent implements OnInit {

  users: Observable<any[]>;
  selectedUser: string = "";
  basePOC: string = "";

  stCR: boolean = false; 
  stCP: boolean = false;
  stAR: boolean = false; 
  stAP: boolean = false;
  stTR: boolean = false; 
  stVTH: boolean = false;
  showTrPOCList: boolean = false;

  allPOCS: string[] = ['Mumbai', 'Delhi', 'Ratlam', 'Budnawar', 'Vapi'];
  pocs: string[] = ['Mumbai', 'Delhi', 'Ratlam', 'Budnawar', 'Vapi'];
  npocs: number = this.pocs.length;
  selectedPOC = new Array(this.npocs).fill(false);
  disabledPOC = new Array(this.npocs).fill(1);
  selectedPOCList: string = "";

  constructor(private db: AngularFireDatabase) {
    this.users = db.list('users').valueChanges();
  }

  ngOnInit() {}

  private invalidatePOC(poc: string) {
    this.pocs = this.allPOCS.slice(0);
    let index = this.pocs.indexOf(poc);
    this.pocs.splice(index, 1);
    this.selectedPOC.fill(false);
    this.selectedPOCList = "";
  }

  private stTRToggle() {
    this.showTrPOCList = !this.showTrPOCList;
    this.stTR = !this.stTR;
    if (!this.stTR) {
      this.selectedPOCList = "";
    }
  }

  private clickedPOC(i: number) {
    this.selectedPOC[i] = !(this.selectedPOC[i]);
    this.showSelectedPOCs();
  }

  private selectAllPOCs() {
    this.selectedPOC.fill(true);
    this.showSelectedPOCs();
  }

  private clearPOCList() {
    this.selectedPOC.fill(false);
    this.showSelectedPOCs();
  }

  private showSelectedPOCs() {
    var noEntry: boolean = true;
    this.selectedPOCList = "";
    for (var i = 0; i < this.npocs;  i++) {
      if (this.selectedPOC[i]) {
        this.selectedPOCList += (noEntry?'':'#') + this.pocs[i];
        noEntry = false;        
      }
    };
    console.log(this.stCR, this.stCP, this.stAR, this.stAP, this.stTR, this.stVTH)
    //console.log(this.selectedPOCList.split('#'));
    console.log(this.selectedPOCList);
    console.log(this.selectedUser);
    console.log(this.basePOC);
  }

  private updateRights() {
    if (this.selectedUser === "") {
      alert("You have not selected a user!")
    } else {
      if (this.basePOC === "") {
        alert("You have not selected base POC")
      } else {
        let rights = {allowAP: this.stAP, allowAR: this.stAR, allowCP: this.stCP, allowCR: this.stCR, allowTR: this.stTR, allowVTH: this.stVTH, transferPOCS: this.selectedPOCList};
        this.db.object('rights/' + this.selectedUser + '/' + this.basePOC).set(rights);
      }
    }
  }

}
