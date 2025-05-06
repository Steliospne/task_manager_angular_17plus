import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { CommonModule } from "@angular/common"
import { HeaderComponent } from "./core/components/header/header.component"
import { FooterComponent } from "./core/components/footer/footer.component"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [
    `
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .main-content {
      flex: 1;
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
  `,
  ],
})
export class AppComponent {}
