// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: false,

  firebase: {
    apiKey: 'AIzaSyCkqJPOQdME7dV8fDh5sq0DwjTnHx_2j7I',
    authDomain: 'ng-fire-d5b62.firebaseapp.com',
    databaseURL: 'https://ng-fire-d5b62.firebaseio.com',
    projectId: 'ng-fire-d5b62',
    storageBucket: 'ng-fire-d5b62.appspot.com',
    messagingSenderId: '472835779658'
  }

};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
