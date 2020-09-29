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
        const promise = new Promise((resolve => {
          resolve(this.bubbleSort());
        }));
        promise.finally(() => {
          this.sortStatus.emit({status: false});
          setTimeout(() => {
            for (let idx = 0; idx < this.num.length; idx++) {
              this.changeColor(idx, 'rgba(78, 216, 96, 0.8)', 7, false).then();
            }
          }, 10);
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


  public bubbleSort(): Promise<unknown> {
    this.sortStatus.emit({status: true});
    let count = 0;
    let loopCount = 0;
    for (let idx = 1; idx < this.num.length; idx++) {
      loopCount += idx;
    }
    return new Promise(async (resolve) => {
      for (let ptr1 = 0; ptr1 < this.num.length - 1; ptr1++) {
        for (let ptr2 = 0; ptr2 < this.num.length - 1 - ptr1; ptr2++) {
          await this.time(ptr2).then(() => {
            count++;
            if (count === loopCount) {
              resolve();
            }
          });
        }
        await this.changeColor(this.num.length - ptr1 - 1, 'rgba(169, 92, 232, 0.8)', 6, false);
      }
      await this.changeColor(0, 'rgba(169, 92, 232, 0.8)', 6, false);
    });
  }

  public async numberSwap(idx: number, timestamp: number): Promise<number> {
    return new Promise((resolve => {
      resolve(
        setTimeout(() => {
          const temp = this.num[idx + 1];
          this.num[idx + 1] = this.num[idx];
          this.num[idx] = temp;
        }, 5 * timestamp * (75 - this.num.length)));
    }));
  }

  public async changeColor(idx: number, color: string, timestamp: number, both = true): Promise<number> {

    return new Promise((resolve => {
      resolve(
        setTimeout(() => {
          this.num[idx].color = color;
          if (both) {
            this.num[idx + 1].color = color;
          }
        }, 5 * timestamp * (75 - this.num.length)));

    }));

  }

  public async time(idx: number): Promise<void> {

    return new Promise((resolve => {
      setTimeout(() => {
        resolve(this.changeColor(idx, 'rgba(78, 216, 96, 0.8)', 1).then(() => {
          if (this.num[idx].value > this.num[idx + 1].value) {
            this.changeColor(idx, 'rgba(219, 57, 57, 0.8)', 2).then(() => {
              this.numberSwap(idx, 3).then(() => {
                this.changeColor(idx, 'rgba(78, 216, 96, 0.8)', 4).then(() => {
                  this.changeColor(idx, 'rgba(66, 134, 244, 0.8)', 5);
                });
              });
            });
          } else {
            this.changeColor(idx, 'rgba(66, 134, 244, 0.8)', 2);
          }
        }));
      }, 24 * (75 - this.num.length));
    }));
  }

}
