import {ChangeDetectionStrategy, Component, inject, input, InputSignal, Signal} from '@angular/core';
import {XxxContent} from './xxx-content.types';
import {XxxContentStore} from './xxx-content-store';
import {XxxLoadingComponent} from '../xxx-loading/xxx-loading.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [XxxLoadingComponent],
  selector: 'xxx-content',
  standalone: true,
  templateUrl: './xxx-content.component.html'
})
export class XxxContentComponent {
  contentStore: XxxContentStore = inject(XxxContentStore);
  contentKey: InputSignal<string> = input('home');
  $content: Signal<XxxContent | undefined> = this.contentStore.$content;

  constructor() {
    this.contentStore.showContentAction(this.contentKey());
  }
}
