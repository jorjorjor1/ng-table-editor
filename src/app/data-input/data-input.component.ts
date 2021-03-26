import { Component, OnInit } from '@angular/core';
import { DataInputService} from "../data-input.service";
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';

export interface Pair{
  key: string,
  value: string
}

@Component({
  selector: 'app-data-input',
  templateUrl: './data-input.component.html',
  styleUrls: ['./data-input.component.scss']
})
export class DataInputComponent implements OnInit {

  json: any;
  placeholder: string;
  csvRecords: any[] = [];
  header = true;
  // allfieldsArr: JSON[] = [] // different fields merge functionality

  constructor(
    private dataInputService: DataInputService,
    private ngxCsvParser: NgxCsvParser
  ) { }
  ngOnInit(): void {
    this.placeholder = "";
  }
  private getJson(event): JSON[] {
    let result = JSON.parse(event.target.value);
    return result;
  }

  private convertJsonToInterfaceArray(json:object[]): Pair[][] {
    const arr = Object.entries(json);
    const totalPairsArr = [];
    arr.forEach(elem => {
      let jsonPair = Object.entries(elem[1]);
      let pairInterfaceArray: Pair[] = [];
      jsonPair.forEach(pair =>{
        let newPair: Pair = {key: pair[0], value: pair[1]};
        pairInterfaceArray.push(newPair);
      })
      totalPairsArr.push(pairInterfaceArray);
    })
    return totalPairsArr;
  }


  private fileToJSON = (evt): Promise<string> =>  {
    const file = evt.target.files[0];
    return new Promise((resolve, reject)=> {
      const fileReader = new FileReader();
      fileReader.onload = event => resolve(JSON.parse(<string>event.target.result));
      fileReader.onerror = error => reject(error);
      fileReader.readAsText(file);
    })
  }

  private fileToCSV = (evt): Promise<string[]> => {
    const files = evt.target.files;
    return new Promise(((resolve, reject) => {
      this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
        .pipe().subscribe((result: Array<any>) => {
        resolve(result);
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
    }))
}

  public proceedInput = async(event): Promise<void> => {

    if (event.target.id === "textarea") {
      this.json = this.getJson(event);
      // this.allfieldsArr.push(...result)  // different fields merge functionality
    }
    if (event.target.id === 'file'){

      let fileName = event.target.value.split('/')
      fileName = fileName[fileName.length - 1]
      let fileExt = fileName.split('.')
      fileExt = fileExt[fileExt.length - 1]

      if (fileExt === 'json'){

        let result = await this.fileToJSON(event);
        this.json = result;
        this.placeholder = JSON.stringify(result);
        // this.allfieldsArr.push(...<JSON[]>readFromFile)  // different fields merge functionality
      } else if (fileExt === 'csv') {

        let result = await this.fileToCSV(event);
        this.json = result;
        this.placeholder = JSON.stringify(result);
        // сюда бы тоже merge functionality потом добавить (или переписать )
      }
    }

    let convertedArray = this.convertJsonToInterfaceArray(this.json);
    this.dataInputService.set(convertedArray);
    let allKeys = convertedArray[0].map(elem => {
      return elem['key'];
    })
    this.dataInputService.setColumnNames(allKeys);
  }


}
