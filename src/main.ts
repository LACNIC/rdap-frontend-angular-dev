import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'zone.js';
import 'reflect-metadata';

import { AppModule } from './app/app.module';
import {enableProdMode} from '@angular/core';

if (process.env.ENV === 'production') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
