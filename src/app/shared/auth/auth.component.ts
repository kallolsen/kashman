import { TransactionsComponent } from './../../transactions/transactions.component';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  showAuthTemplate: boolean = true;
  showSignInTemplate: boolean = false;
  showSignUpTemplate: boolean = false;

  showNavPanel: boolean = true;
  showTransactionsButton: boolean = false;
  showUserRightsButton: boolean = false;
  showTransactionsComponent: boolean = false;
  showUserRightsComponent: boolean = false;

  name: string;
  phone: string;
  email: string;
  password: string;
  selectedPoc: string;
  urole: any;
  uid: string;

  kusers: Observable<any[]>;
  kuser: Observable<any>;
  item: Observable<any>;
  userid: string;
  userRole: Observable<any>;
  
  
  pocs = [
    { value: 'POC01', viewValue: 'Mumbai'},
    { value: 'POC02', viewValue: 'Delhi'},
    { value: 'POC03', viewValue: 'Ratlam'},
    { value: 'POC04', viewValue: 'Budnawar'},
    { value: 'POC05', viewValue: 'Vapi'}
  ]

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    afAuth.authState.subscribe((usr) => {
      if (usr !== null) {
        this.uid = usr.uid;
        console.log("Logged user id: ", this.uid);
        const path = 'users/' + this.uid + '/role';
        this.userRole = db.object(path).valueChanges();
        db.object(path).valueChanges().subscribe((val) => {
          console.log("Logged user role: ", val);
          if(val=='user'){
            this.showUserRightsButton = false;
            console.log('user role defined!');
          } else {
            this.showUserRightsButton = true;          
            console.log('admin role defined!');
          }
        }); 
      };
      
    });
    //this.kusers = db.list('users').valueChanges();
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  signup() {
    this.showAuthTemplate = false;
    this.showSignUpTemplate = false;
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Failed to create new user: " + errorCode, errorMessage);
        // ...
      })
      .then((user) => {
        console.log(user);
        //const newUser = credential.user;
        this.createUserProfile(user.uid);
      })
  }

  private createUserProfile(nuserid: string) {
    const path = 'users/' + nuserid;
    const rolepath = path + 'role';
    const tProfile = { name: this.name, phone: this.phone, role: 'user', defaultPoc: this.selectedPoc };
    console.log("New user path: " + path);
    //this.userRole = 'user';
    return this.db.object(path).set(tProfile);
  }

  signin() {
    this.showAuthTemplate = false;
    console.log(this.email, this.password);
    //this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Failed to sign in user: " + errorCode, errorMessage);
        // ...
      })
      .then((user) => {
        this.showNavPanel = true;
      });
    this.showSignInTemplate = false;
    //this.db.object(path).subscribe((role) => this.userRole = role);
  }

  logout() {
    this.name = '';
    this.phone = '';
    this.email = '';
    this.password = '';
    this.selectedPoc = null;
    this.afAuth.auth.signOut();
    this.showAuthTemplate = true;
    this.showNavPanel = false;
    this.showTransactionsComponent = false;
    this.showUserRightsComponent = false;
  }


    
}


