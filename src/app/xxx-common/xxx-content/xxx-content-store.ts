import {computed, inject, Injectable, ResourceRef, Signal, signal, WritableSignal} from "@angular/core";
import {XxxContent, XxxContentApi, xxxContentInitialState, XxxContentState} from "./xxx-content.types";
import {XxxContentService} from "./xxx-content.service";

/**
 * XxxContentStore is the feature state for all content.
 * State management for Angular using only Signals and RxJS.
 * If you already know NgRx, then we have organized it using the same categories.
 */
@Injectable({
  providedIn: 'root'
})
export class XxxContentStore {
  private contentService: XxxContentService = inject(XxxContentService);

  // State
  // Where we store all the properties needed to support the view
  private $contentState: WritableSignal<XxxContentState> = signal<XxxContentState>(xxxContentInitialState);

  // Actions
  // To trigger state changes which then change the view
  // If the operation is asynchronous, use RxJS Subject
  // If not, then we can call the effect or reducer directly

  // Action methods run the reducer and effect
  private getContent(key: string) {
    this.getContentEffect(key);
  }

  private getContentResource(contentResource: ResourceRef<XxxContentApi>) {
    this.getContentResourceReducer(contentResource);
  }

  showContent(key: string) {
    this.showContentReducer(key);
    this.showContentEffect(key);
  }

  // Selectors
  // Used to read current values from state.
  private $contents: Signal<XxxContent[]> = computed(() =>
    this.$contentState().contents
  );

  // NOTE: A computed signal cannot take a parameter,
  // While an NgRx selector can take a parameter.
  // The workaround is to store the parameter in state, then access it with a selector.
  // The flaw is the selected key could be overwritten if there are nearly simultaneous transactions of different keys!
  private $selectedKey: Signal<string | undefined> = computed(() =>
    this.$contentState().selectedKey
  );

$content: Signal<XxxContent | undefined> = computed(() => {
    const selectedKey: string | undefined = this.$selectedKey();
    const contents: XxxContent[] = this.$contents();
    let content: XxxContent | undefined;
    if (selectedKey) {
      content = contents.find(item => item.key === selectedKey);
    }
    return content;
  })

  // $errorMessage_: Signal<string | undefined> = computed(() => {
    // const content: XxxContent | undefined = this.$content_();
    // if (content) {
    //   return content?.errorMessage;
    // }
    //TODO
  //   return undefined;
  // })

  private $isContent: Signal<boolean> = computed(() => {
    return this.$content() !== undefined;
  })

  // Reducers
  // The only place where we change or update the state values
  // When an action fires, we run the reducer before the effect
  // Reducers are where we update state
  private showContentReducer(selectedKey: string) {
    this.$contentState.update(state => ({...state, selectedKey}));
  }

  private getContentResourceReducer(contentResource: ResourceRef<XxxContentApi>) {
    const selectedKey: string | undefined = this.$selectedKey();
    // Create a new content object
    const content: XxxContent = {
      contentResource,
      key: selectedKey ? selectedKey : '',
    };
    // Remove any existing content, also replaces the old array for immutability
    const contents: XxxContent[] = this.$contents().filter(item => item.key !== content.key);
    // Add the new content object
    contents.push(content);
    // Finally, update the state
    this.$contentState.update(state => ({
        ...state,
        contents
      })
    );
  }

  // Effects
  // For data access, navigation, or to open a dialog
  // They are often used to run a service
  private getContentEffect(key: string) {
    const contentResource: ResourceRef<XxxContentApi | undefined> = this.contentService.getContent(key);
    if(contentResource !== undefined) {
      this.getContentResource(contentResource as ResourceRef<XxxContentApi>)
    }
  }

  private showContentEffect(key: string) {
    // Check to see if content already exists
    // If content is not in state, then load it
    if (!this.$isContent()) {
      this.getContent(key);
    }
  }
}
