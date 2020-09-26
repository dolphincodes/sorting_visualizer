import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

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
  @Output() sortStatus = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sort) {
      if (changes.sort.currentValue) {
        const f = new Promise((resolve => {
          resolve(this.bubbleSort());
        }));
        f.finally(() => {
          this.sortStatus.emit({status: false});
        });
      }
    }

    if (changes.nums) {
      this.num = changes.nums.currentValue;
    }

    if (changes.width) {
      this.width = changes.width.currentValue;
    }

  }


  public bubbleSort(): Promise<boolean> {
    this.sortStatus.emit({status: true});
    let timestamp = 0;
    let count = 0;
    return new Promise((resolve, reject) => {
      for (let ptr1 = 0; ptr1 < this.num.length - 1; ptr1++) {
        for (let ptr2 = 0; ptr2 < this.num.length - 1 - ptr1; ptr2++) {
          this.time(ptr2, timestamp).then(() => {
            count++;
            if (count === 2 * this.num.length) {
              resolve();
            }
          });
          timestamp++;
        }
      }
    });
  }

  public async numberSwap(idx: number, timestamp: number): Promise<number> {
    return new Promise((resolve => {
      resolve(
        setTimeout(() => {
          const temp = this.num[idx + 1];
          this.num[idx + 1] = this.num[idx];
          this.num[idx] = temp;
        }, 400 * timestamp));
    }));
  }

  public async changeColor(idx: number, color: string, timestamp: number): Promise<number> {

    return new Promise((resolve => {
      resolve(
        setTimeout(() => {
          this.num[idx].color = color;
          this.num[idx + 1].color = color;
        }, 400 * timestamp));

    }));

  }

  public async time(idx: number, timestamp: number): Promise<void> {

    return new Promise((resolve => {
      setTimeout(() => {
        resolve(this.changeColor(idx, 'green', 1).then(() => {
          if (this.num[idx].value > this.num[idx + 1].value) {
            this.changeColor(idx, 'red', 2).then(() => {
              this.numberSwap(idx, 3).then(() => {
                this.changeColor(idx, 'green', 4).then(() => {
                  this.changeColor(idx, 'dodgerblue', 5);
                });
              });
            });
          } else {
            this.changeColor(idx, 'dodgerblue', 2);
          }
        }));
      }, 2000 * timestamp);
    }));
  }

}
