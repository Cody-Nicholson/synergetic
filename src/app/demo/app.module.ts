import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {
    TableModule,
    BulletModule,
    RingModule,
    SynFormsModule,
    ParallelBarsModule,
    LiftModule,
    /*SidebarModule,*/
    CounterModule
} from './index';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        TableModule,
        BulletModule,
        RingModule,
        SynFormsModule,
        CounterModule,
        LiftModule,
        ParallelBarsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
