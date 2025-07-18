import {ChangeDetectionStrategy, Component, inject, input, InputSignal, Signal} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {XxxContent} from './xxx-content.types';
import {XxxContentStore} from './xxx-content-store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  selector: 'xxx-content',
  standalone: true,
  styleUrl: './xxx-content.component.scss',
  templateUrl: './xxx-content.component.html'
})
export class XxxContentComponent {
  contentStore: XxxContentStore = inject(XxxContentStore);
  contentKey: InputSignal<string> = input('home');
  $content: Signal<XxxContent | undefined> = this.contentStore.$content;

  constructor() {
    this.contentStore.showContent(this.contentKey());
  }
}
