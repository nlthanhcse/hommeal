import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal-backdrop">
      <div class="modal-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  standalone: true,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(5px); /* Applies blur effect */
      transition: opacity 0.3s ease, visibility 0.3s ease;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1002;
    }

    .modal-content {
      background: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class AppModalComponent {}
