import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { XxxHeaderComponent } from './xxx-header/xxx-header.component';
import { XxxLoadingComponent } from './xxx-common/xxx-loading/xxx-loading.component';

@Component({
  selector: 'xxx-app-root',
  imports: [
    RouterOutlet,
    XxxHeaderComponent,
    XxxLoadingComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
}
