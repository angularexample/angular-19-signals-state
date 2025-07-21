import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { XxxContentApi } from "./xxx-content.types";

@Injectable({
  providedIn: 'root'
})
export class XxxContentService {
  /**
   * Get content for a given page or section.
   * @param key Key to desired content data. In this implementation, it is used as the filename for reading a JSON file.
   * For Example, "home" will get content from home.json
   */
  getContent(key: string): HttpResourceRef<XxxContentApi | undefined> {
    const url = `/data/content/${key}.json`;
    return  httpResource(() => url);
  }
}
