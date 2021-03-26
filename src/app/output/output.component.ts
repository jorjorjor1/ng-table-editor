import { Component, OnInit } from '@angular/core';
import {DataInputService} from "../data-input.service";
import {Pair} from "../data-input/data-input.component";
import * as FileSaver from 'file-saver';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {

  data: object[];
  constructor(private dataInputService: DataInputService) { }

  ngOnInit(): void {
    this.data = this.convertInterfaceToJson(this.dataInputService.get());
  }

  convertInterfaceToJson(data: Pair[][]): object[] {
    let interfaceToJson = [];

    if (!data) {
      return
    }
    data.forEach(pairArr => {
      let objectsInArray: object[] = [];
      pairArr.forEach(obj => {
        let k = obj['key'];
        let v = obj['value'];
        let objToAdd = {[k]:v};
        objectsInArray.push(objToAdd);
      })
      let result = {};
      objectsInArray.forEach(obj => {
        Object.assign(result, obj);
      })
      interfaceToJson.push(result);
    })
    return interfaceToJson;
  }

  saveToCsv(filename:string): void {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(this.data[0]);
    let csv = this.data.map(row => header.map(fieldName => JSON.stringify(row[fieldName],replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
    let blob = new Blob([csvArray], {type: 'text/csv' });
    FileSaver.saveAs(blob, filename + ".csv");
  }

  saveToJson(filename:string): void {
    let file = new File([JSON.stringify(this.data, null, 2)], filename + ".json", {type: "application/json"});
    FileSaver.saveAs(file);
  }

}
