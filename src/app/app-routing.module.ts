import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataInputComponent } from './data-input/data-input.component';
import {ObjectListComponent} from "./object-list/object-list.component";
import {ObjectDetailsComponent} from "./object-details/object-details.component";
import {OutputComponent} from "./output/output.component";
import {CreateNewComponent} from "./create-new/create-new.component";

const routes: Routes = [
  { path: 'data-input', component: DataInputComponent },
  { path: 'list', component: ObjectListComponent},
  { path: 'list/:id', component: ObjectDetailsComponent},
  { path: 'output', component: OutputComponent},
  { path: '', redirectTo: 'data-input', pathMatch: 'full'},
  { path: 'createnew', component: CreateNewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
