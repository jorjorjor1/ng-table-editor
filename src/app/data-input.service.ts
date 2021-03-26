import { Injectable } from '@angular/core';
import {Pair} from "./data-input/data-input.component";

@Injectable({
  providedIn: 'root'
})
export class DataInputService {

  convertedArray: Pair[][];
  columnNames: string[];
  constructor() { }

  set(data: Pair[][]): void {
    this.convertedArray = data;
    console.log(this.convertedArray);
  }

  setColumnNames(names: string[]): void {
    this.columnNames = names;
  }

  get(): Pair[][] {
    if (this.convertedArray) return this.convertedArray;
  }

  getNames(): string[] {
    if (this.columnNames) return this.columnNames;
  }

  deleteIndex(id: number): void {
    this.convertedArray.splice(id,1);
  }

  createNew(pairArr: Pair[]): void {
    this.convertedArray.push(pairArr);
  }

  arraymove(fromIndex: number, toIndex: number): void {
    let element = this.convertedArray[fromIndex];
    this.convertedArray.splice(fromIndex, 1);
    // console.log(this.convertedArray);
    this.convertedArray.splice(toIndex, 0, element);
  }
}
