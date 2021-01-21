// import Axios from 'axios';
import fetch from 'node-fetch';
import { ExtensionContext } from 'vscode';
import WeiBoTreeItem from '../shared/weiboTreeItem';
const regexp = /<a href="(\/weibo\?q=[^"]+)".*?>(.+)<\/a>/g;

type Word = {
  title: string;
  url: string;
};

/** 合并两次热门话题并根据 id 去重 */
export function mergeWords(
  words: Word[],
  another: Word[],
): Word[] {
  const obj: Record<string, string> = {};
  for (const w of words.concat(another)) {
    obj[w.url] = w.title;
  }
  return Object.entries(obj).map(([url, title]) => ({
    url,
    title,
  }));
}
export default class WeiBoService {

  private context: ExtensionContext;
  private weiboUrl = 'https://s.weibo.com/top/summary';

  constructor(context: ExtensionContext) {
    this.context = context;
  }

  /**
   * 获取数据
   */
  async getData(): Promise<Array<WeiBoTreeItem>> {
    const res: any = await fetch(this.weiboUrl);

    const result: string = await res.text();
    const matches = result.matchAll(regexp);

    const words: Word[] = Array.from(matches).map(x => ({
      url: x[1],
      title: x[2],
    }));

    if (words.length) {
      return words.map((item, index) => {
        const fullUrl: string = 'https://s.weibo.com/' + item.url;
        return new WeiBoTreeItem({
          name: item.title,
          contextValue: item.title,
          label: fullUrl
        }, this.context, false);
      });
    }

    return Promise.resolve([]);
  }
}