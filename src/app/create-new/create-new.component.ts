import { Component, OnInit } from '@angular/core';
import { DataInputService} from "../data-input.service";
import {Pair} from "../data-input/data-input.component";

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent implements OnInit {
  names: string[];
  obj: Pair[];
  rows: Pair[][];
  constructor(private dataInputService: DataInputService) { }

  ngOnInit(): void {
    if (!this.dataInputService.get()) return;
    this.rows = this.dataInputService.get();
    // if (rows.length) возможная проверка при кнопке создания на первом экране
    this.names = this.dataInputService.getNames();
    this.obj = [];
    this.names.forEach(elem => {
      let pair: Pair = {key: elem, value: ""};
      this.obj.push(pair);
    });

  }

  createNewRow(){
    let totalArr = [];
    this.obj.forEach(row => {
      totalArr.push(row);
    });
    this.dataInputService.createNew(totalArr);
  }

}
