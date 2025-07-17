import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {JsonPipe} from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  selector: 'xxx-content',
  standalone: true,
  styleUrl: './xxx-content.component.scss',
  templateUrl: './xxx-content.component.html'
})
export class XxxContentComponent {
  contentKey = input.required();
  contentResource=httpResource(()=>
    `/data/content/${this.contentKey()}.json`
  );
}
