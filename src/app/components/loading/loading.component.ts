import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: '<div class="loading" ><div class="lds-hourglass"></div></div>',
  styles: [
    `
      .lds-hourglass {
        display: inline-block;
        position: relative;
        width: 250px;
        height: 250px;
      }
      .lds-hourglass:after {
        content: ' ';
        display: block;
        border-radius: 50%;
        width: 0;
        height: 0;
        margin: 8px;
        box-sizing: border-box;
        border: 100px solid #e5d41a;
        border-color: #e5d41a transparent #e5d41a transparent;
        animation: lds-hourglass 1.2s infinite;
      }
      @keyframes lds-hourglass {
        0% {
          transform: rotate(0);
          animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }
        50% {
          transform: rotate(900deg);
          animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        100% {
          transform: rotate(1800deg);
        }
      }
      .loading {
        text-align: center;
        margin-top: 10%;
      }
    `,
  ],
})
export class LoadingComponent {
  constructor() {}
}
