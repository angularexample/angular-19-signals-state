import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {XxxContent} from "../xxx-common/xxx-content/xxx-content.types";
import {XxxContentComponent} from '../xxx-common/xxx-content/xxx-content.component';
import {XxxContentStore} from '../xxx-common/xxx-content/xxx-content-store';
import {XxxPost} from "./xxx-post.types";
import {XxxPostFacadeService} from "./xxx-post-facade.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    XxxContentComponent,
  ],
  selector: 'xxx-post',
  standalone: true,
  templateUrl: './xxx-post.component.html',
})
export class XxxPostComponent {
  contentKey: string = 'post';
  private contentStore: XxxContentStore = inject(XxxContentStore);
  private postFacade: XxxPostFacadeService = inject(XxxPostFacadeService);
  $content: Signal<XxxContent | undefined> = this.contentStore.$content;
  $isNoSelectedUser: Signal<boolean> = this.postFacade.$isNoSelectedUser;
  $isPostsEmpty: Signal<boolean> = this.postFacade.$isPostsEmpty;
  $isPostsLoaded: Signal<boolean> = this.postFacade.$isPostsLoaded;
  $isPostsLoading: Signal<boolean> = this.postFacade.$isPostsLoading;
  $posts: Signal<XxxPost[]> = this.postFacade.$posts;
  $selectedPostId: Signal<number | undefined> = this.postFacade.$selectedPostId;

  constructor() {
    this.contentStore.showContentAction(this.contentKey)
    this.postFacade.showPosts();
  }

  selectPost(post: XxxPost) {
    this.postFacade.selectPost(post.id);
  }
}
