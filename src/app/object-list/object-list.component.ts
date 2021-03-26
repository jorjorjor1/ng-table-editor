import { Component, OnInit } from '@angular/core';
import {DataInputService} from "../data-input.service";
import {Pair} from "../data-input/data-input.component";

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss']
})
export class ObjectListComponent implements OnInit {
  inputObject: Pair[][];
  constructor(public dataInputService: DataInputService) { }

  ngOnInit(): void {
    this.inputObject = this.dataInputService.get();
  }

  rowUp(idx: number): void {
    this.dataInputService.arraymove(idx, idx-1);
  }

  rowDown(idx: number): void {
    this.dataInputService.arraymove(idx, idx+1);
  }
}
