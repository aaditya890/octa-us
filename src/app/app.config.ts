import { ApplicationConfig,importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import * as environment from '../environments/environment.development';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
     provideAnimations(),
      provideAnimationsAsync(),
       importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideFirestore(() => getFirestore()),        // 🔁 MOVE THIS BELOW                  // ✅ This should come before any usage
    ]), provideAnimationsAsync()
    ]
};
