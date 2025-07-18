import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {XxxContent} from "../xxx-common/xxx-content/xxx-content.types";
import {XxxContentComponent} from '../xxx-common/xxx-content/xxx-content.component';
import {XxxContentStore} from '../xxx-common/xxx-content/xxx-content-store';
import {XxxSanitizePipe} from '../xxx-common/xxx-sanitize/xxx-sanitize.pipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    XxxContentComponent,
    XxxSanitizePipe,
  ],
  selector: 'xxx-home',
  standalone: true,
  templateUrl: './xxx-home.component.html',
})
export class XxxHomeComponent {
  contentStore: XxxContentStore = inject(XxxContentStore);
  contentKey = 'home';
  $content: Signal<XxxContent | undefined> = this.contentStore.$content;

  constructor() {
    this.contentStore.showContent(this.contentKey);
  }
}
