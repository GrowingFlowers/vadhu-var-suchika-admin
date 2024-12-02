import { mergeApplicationConfig, ApplicationConfig, NgModule } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { NgModel } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

const serverConfig: ApplicationConfig = {

  providers: [
    provideServerRendering(),
    
   
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
