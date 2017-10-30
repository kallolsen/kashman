import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AuthComponent } from './shared/auth/auth.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserRightsComponent } from './user-rights/user-rights.component';


export const firebaseConfig = {
  apiKey: "AIzaSyDMBu3a2q1xTDr0Ae-hVbxqBOJitjmqF-4",
  authDomain: "kcashmanager.firebaseapp.com",
  databaseURL: "https://kcashmanager.firebaseio.com",
  projectId: "kcashmanager",
  storageBucket: "kcashmanager.appspot.com",
  messagingSenderId: "845108054418"
}

const appRoutes: Routes = [
  { 
    path: 'login',
    component: AuthComponent,
    data: { title: 'Authentication' }
  },
  { 
    path: 'users',
    component: UserRightsComponent,
    data: { title: 'Users' }
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserRightsComponent,
    TransactionsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
