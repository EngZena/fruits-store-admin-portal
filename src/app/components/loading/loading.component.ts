import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class="spinner-6"></div>`,
  styles: [
    `
      .spinner-6 {
        width: 200px;
        height: 200px;
        display: grid;
        border: 4px solid #0000;
        border-radius: 50%;
        border-color: #ccc #0000;
        animation: s6 1s infinite linear;
      }

      .spinner-6::before,
      .spinner-6::after {
        content: '';
        grid-area: 1/1;
        margin: 10px;
        border: inherit;
        border-radius: 50%;
      }

      .spinner-6::before {
        border-color: #f03355 #0000;
        animation: inherit;
        animation-duration: 0.5s;
        animation-direction: reverse;
      }

      .spinner-6::after {
        margin: 20px;
      }

      @keyframes s6 {
        100% {
          transform: rotate(1turn);
        }
      }
    `,
  ],
})
export class LoadingComponent {
  constructor() {}
}
