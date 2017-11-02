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

  stCR: boolean = false; 
  stCP: boolean = false;
  stAR: boolean = false; 
  stAP: boolean = false;
  stTR: boolean = false; 
  showTrPOCList: boolean = false;

  pocs: string[] = ['Mumbai', 'Delhi', 'Ratlam', 'Budnawar', 'Vapi'];
  npocs: number = this.pocs.length;
  selectedPOC = new Array(this.npocs).fill(false);
  selectedPOCList: string = "";

  constructor(private db: AngularFireDatabase) {
    this.users = db.list('users').valueChanges();
  }

  ngOnInit() {}

  private stTRToggle() {
    this.showTrPOCList = !this.showTrPOCList;
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
    console.log(this.selectedPOCList.split('#'));
  }


}
