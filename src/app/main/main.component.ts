import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatSliderChange} from '@angular/material/slider';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  trigger = false;
  nums: { value: number, color: string }[] = [];
  range = 20;
  disable = false;
  sortType = '';
  sortDisable = true;
  generateDisable = false;


  constructor(public cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.rand();
    this.disable = false;
  }

  public sortTrigger(): void {
    this.trigger = true;
  }

  public sortTypeChange(sortType: string): void {
    this.sortType = sortType;
    this.sortDisable = false;
    this.disable = true;
  }

  public change(event: MatSliderChange): void {
    this.range = Number(event.value);
    this.rand();
  }

  public rand(): void {
    this.nums = [];
    const min = 1;
    const max = 150;
    for (let idx = 0; idx <= this.range + 4; idx++) {
      const randomNum = Math.random() * (max - min) + min;
      this.nums.push({value: Math.round(randomNum), color: '#0097A7'});
    }
  }

  public buttonDisable(event: { status: boolean }): void {
    this.trigger = false;
    this.disable = this.sortDisable = this.generateDisable = event.status;
    this.cdRef.detectChanges();
  }

}
