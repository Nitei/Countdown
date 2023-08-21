import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { BehaviorSubject, Subject, take } from 'rxjs';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `

  <h1>{{countDown._counter}}</h1>

  `,
})
export class App {
  countDown = {
    decrementTime: 10,
    _counter: 0,
    increment(time: number) {
      if (this._counter > 0) {
        this._counter += time;
      }
    },
    start(time: number) {
      this._counter = time;
      this.count();
    },
    interval: 0,
    count() {
      this.interval = setInterval(() => {
        this._counter -= this.decrementTime;
        if (this._counter <= 0) {
          this.clear();
          this.finished.next(null)
        }
      }, this.decrementTime);
    },
    clear() {
      this._counter = 0;
      clearInterval(this.interval);
      this.interval = 0;
    },
    finished: new Subject(),
  };

  constructor() {
    this.countDown.finished.pipe(take(1)).subscribe(() => {
      console.log('asdfads');
      // this.countDown.start(5000);
    });
    this.countDown.start(5000);
    setTimeout(() => {
      this.countDown.clear();
    }, 2000);
  }
}

bootstrapApplication(App);
