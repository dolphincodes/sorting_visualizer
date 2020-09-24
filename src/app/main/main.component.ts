import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  trigger = false;
  nums: { value: number, color: string }[] = [];
  range = 0;
  disable = false;

  constructor(public cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.rand();
    this.disable = false;
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
    const max = 100;
    for (let idx = 0; idx <= this.range + 4; idx++) {
      const randomNum = Math.random() * (max - min) + min;
      this.nums.push({value: Math.round(randomNum), color: 'dodgerblue'});
    }
  }

  public buttonDisable(event: { status: boolean }): void {
    this.trigger = false;
    this.disable = event.status;
    this.cdRef.detectChanges();
  }

}
