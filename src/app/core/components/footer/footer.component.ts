import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <p>Task Manager /w Angular Demo © {{ currentYear }}</p>
    </footer>
  `,
  styles: [
    `
      .footer {
        padding: 1rem;
        background-color: #f5f5f5;
        text-align: center;
        margin-top: auto;
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
