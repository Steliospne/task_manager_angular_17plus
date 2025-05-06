import { Component, Input, ChangeDetectionStrategy } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-task-stats",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-value">{{ stats?.total || 0 }}</div>
        <div class="stat-label">Total Tasks</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ stats?.completed || 0 }}</div>
        <div class="stat-label">Completed</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ stats?.incomplete || 0 }}</div>
        <div class="stat-label">Pending</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ stats?.completionRate || 0 }}%</div>
        <div class="stat-label">Completion Rate</div>
        <div class="progress-bar">
          <div 
            class="progress-value" 
            [style.width.%]="stats?.completionRate || 0"
            [ngClass]="{
              'low': (stats?.completionRate || 0) < 30,
              'medium': (stats?.completionRate || 0) >= 30 && (stats?.completionRate || 0) < 70,
              'high': (stats?.completionRate || 0) >= 70
            }"
          ></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .stat-card {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
    }
    
    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #3f51b5;
    }
    
    .stat-label {
      font-size: 0.875rem;
      color: #666;
      margin-bottom: 0.5rem;
    }
    
    .progress-bar {
      height: 6px;
      background-color: #e0e0e0;
      border-radius: 3px;
      overflow: hidden;
      margin-top: 0.5rem;
    }
    
    .progress-value {
      height: 100%;
      transition: width 0.3s ease;
    }
    
    .progress-value.low {
      background-color: #f44336;
    }
    
    .progress-value.medium {
      background-color: #ff9800;
    }
    
    .progress-value.high {
      background-color: #4caf50;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskStatsComponent {
  @Input() stats: { total: number; completed: number; incomplete: number; completionRate: number } | null = null
}
