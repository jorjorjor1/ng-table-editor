import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCsvParserModule } from 'ngx-csv-parser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataInputComponent } from './data-input/data-input.component';
import { ObjectListComponent } from './object-list/object-list.component';
import { ObjectDetailsComponent } from './object-details/object-details.component';
import { OutputComponent } from './output/output.component';
import { ErrorComponent } from './error/error.component';
import { CreateNewComponent } from './create-new/create-new.component';

@NgModule({
  declarations: [
    AppComponent,
    DataInputComponent,
    ObjectListComponent,
    ObjectDetailsComponent,
    OutputComponent,
    ErrorComponent,
    CreateNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxCsvParserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
