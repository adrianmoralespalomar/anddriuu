import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import ROUTES from './route';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(ROUTES), provideHttpClient()],
};
