import {ResourceRef} from '@angular/core';

export interface XxxContent {
  contentResource?: ResourceRef<XxxContentApi>;
  key: string;
}

export interface XxxContentApi {
  contentModel: XxxContentModel;
  key: string;
}

export interface XxxContentModel {
  bodyText?: string;
  pageTitle?: string;
}

export const xxxContentInitialState: XxxContentState = {
  contents: [],
};

export interface XxxContentState {
  contents: XxxContent[];
  selectedKey?: string;
}
