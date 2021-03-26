import { Component, OnInit } from '@angular/core';
import { DataInputService} from "../data-input.service";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';


@Component({
  selector: 'app-object-details',
  templateUrl: './object-details.component.html',
  styleUrls: ['./object-details.component.scss']
})
export class ObjectDetailsComponent implements OnInit {

  obj: any;
  constructor(
    private route: ActivatedRoute,
    private dataInputService: DataInputService,
    private location: Location
    ) { }


  ngOnInit(): void {
    this.getRow();
  }

  getRow(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if(this.dataInputService.get()){
      this.obj = this.dataInputService.get()[id];
    }

  }
  goBack(): void {
    this.location.back();
  }

}
