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
            for (const idx of this.num) {
              idx.color = 'green';
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
        await this.changeColor(this.num.length - ptr1 - 1, 'rgba(169, 92, 232, 0.8)');
      }
      await this.changeColor(0, 'rgba(169, 92, 232, 0.8)');
    });
  }

  public async numberSwap(idx: number): Promise<number> {
    return new Promise((resolve => {
      resolve(
        setTimeout(() => {
          const temp = this.num[idx + 1];
          this.num[idx + 1] = this.num[idx];
          this.num[idx] = temp;
        }, 2));
    }));
  }

  public async changeColor(idx: number, color: string): Promise<number> {

    return new Promise((resolve => {
      resolve(
        setTimeout(() => {
          this.num[idx].color = color;
        }, 2));

    }));

  }

  public async time(idx: number): Promise<void> {

    return new Promise((resolve => {
      setTimeout(() => {
        resolve(this.changeColor(idx, 'green').then(() => {
          if (this.num[idx].value > this.num[idx + 1].value) {
            this.changeColor(idx, 'red').then(() => {
              this.numberSwap(idx).then(() => {
                this.changeColor(idx, 'green').then(() => {
                  this.changeColor(idx, 'dodgerblue');
                });
              });
            });
          } else {
            this.changeColor(idx, 'dodgerblue');
          }
        }));
      }, 5);
    }));
  }

}
