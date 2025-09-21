import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptors';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    // Routing
    provideRouter(routes, withComponentInputBinding()),

    // HTTP Client + Interceptors
    provideHttpClient(withInterceptors([authInterceptor])),

    // Angular animations (needed for Material, smooth transitions, etc.)
    provideAnimations(), provideAnimationsAsync(),
  ],
};
