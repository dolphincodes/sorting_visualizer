import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  trigger = false;
  nums: { value: number, color: string }[] = [];
  range = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.rand();
  }

  public sort(): void {
    this.trigger = true;
  }

  public change(event: number | null): void {
    this.range = Number(event);
    this.rand();
  }

  public rand(): void {
    this.nums = [];
    const min = 1;
    const max = 200;
    for (let idx = 0; idx <= this.range + 4; idx++) {
      const randomNum = Math.random() * (max - min) + min;
      this.nums.push({value: Math.round(randomNum), color: 'dodgerblue'});
    }
  }

}
