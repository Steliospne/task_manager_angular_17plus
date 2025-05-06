import { bootstrapApplication } from "@angular/platform-browser"
import { provideHttpClient } from "@angular/common/http"
import { provideRouter } from "@angular/router"
import { provideStore } from "@ngrx/store"
import { provideEffects } from "@ngrx/effects"

import { AppComponent } from "./app/app.component"
import { routes } from "./app/app.routes"
import { taskReducer } from "./app/state/tasks/task.reducer"
import { TaskEffects } from "./app/state/tasks/task.effects"

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore({ tasks: taskReducer }),
    provideEffects([TaskEffects]),
  ],
}).catch((err) => console.error(err))
