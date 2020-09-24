import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit, OnChanges {

  num: { value: number, color: string }[] = [];
  @Input() sort = false;
  @Input() nums: object[] = [];
  @Input() width = 5;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sort) {
      this.bubbleSort();
    }

    if (changes.nums) {
      this.num = changes.nums.currentValue;
    }

    if (changes.width) {
      this.width = changes.width.currentValue;
    }

  }

  public bubbleSort(): void {
    let timestamp = 0;
    (async () => {
      for (let ptr1 = 0; ptr1 < this.num.length - 1; ptr1++) {
        for (let ptr2 = 0; ptr2 < this.num.length - 1 - ptr1; ptr2++) {
          await this.time(ptr2, timestamp);
          timestamp++;
        }
      }
    })();
  }

  public numberSwap(idx: number, timestamp: number): void {
    setTimeout(() => {
      const temp = this.num[idx + 1];
      this.num[idx + 1] = this.num[idx];
      this.num[idx] = temp;
    }, 600 * timestamp);
  }

  public changeColor(idx: number, color: string, timestamp: number): void {
    setTimeout(() => {
      this.num[idx].color = color;
      this.num[idx + 1].color = color;
    }, 600 * timestamp);
  }

  public time(idx: number, timestamp: number): void {

    setTimeout(() => {
      (async () => {
        this.changeColor(idx, 'green', 1);
        if (this.num[idx].value > this.num[idx + 1].value) {
          await this.changeColor(idx, 'red', 2);
          await this.numberSwap(idx, 3);
          this.changeColor(idx, 'green', 4);
          await this.changeColor(idx, 'dodgerblue', 5);
        } else {
          await this.changeColor(idx, 'dodgerblue', 2);
        }
      })();
    }, 3000 * timestamp);
  }

}
