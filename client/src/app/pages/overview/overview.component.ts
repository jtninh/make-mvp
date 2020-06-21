import { Component, OnInit } from '@angular/core';
import { MainDataService } from 'src/app/services/main-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  data: any;

  constructor(private mainDataService: MainDataService) {
    this.mainDataService.getData().subscribe(res => (this.data = res));
  }

  ngOnInit(): void {}
}
