// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDMBu3a2q1xTDr0Ae-hVbxqBOJitjmqF-4",
    authDomain: "kcashmanager.firebaseapp.com",
    databaseURL: "https://kcashmanager.firebaseio.com",
    projectId: "kcashmanager",
    storageBucket: "kcashmanager.appspot.com",
    messagingSenderId: "845108054418"
  }
};
