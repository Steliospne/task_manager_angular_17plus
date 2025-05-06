import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink, RouterLinkActive } from "@angular/router"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="logo">
        <h1>Task Manager</h1>
      </div>
      <nav class="nav">
        <ul class="nav-list">
          <li>
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Dashboard</a>
          </li>
          <li>
            <a routerLink="/tasks" routerLinkActive="active">Tasks</a>
          </li>
        </ul>
      </nav>
    </header>
  `,
  styles: [
    `
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #3f51b5;
      color: white;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    .logo h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    
    .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 1.5rem;
    }
    
    .nav-list a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 0;
      position: relative;
    }
    
    .nav-list a.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: white;
    }
  `,
  ],
})
export class HeaderComponent {}
