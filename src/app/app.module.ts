import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FilterComponent } from './monthly-statements/filter/filter.component';
import { LoaderComponent } from './monthly-statements/loader/loader.component';
import { StatementsComponent } from './monthly-statements/statements/statements.component';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        FilterComponent,
        LoaderComponent,
        StatementsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
