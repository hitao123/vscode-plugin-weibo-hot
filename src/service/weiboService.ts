import fetch from 'node-fetch';
import { ExtensionContext } from 'vscode';
import WeiBoTreeItem from '../shared/weiboTreeItem';
const regexp = /<a href="(\/weibo\?q=[^"]+)".*?>(.+)<\/a>/g;

type Word = {
  title: string;
  url: string;
};

export default class WeiBoService {

  private context: ExtensionContext;
  private weiboUrl = 'https://s.weibo.com/top/summary';
  public feedList: Array<WeiBoTreeItem> = [];

  constructor(context: ExtensionContext) {
    this.context = context;
  }

  /**
   * 获取数据
   */
  async getData(): Promise<Array<WeiBoTreeItem>> {

    try { 
      const res: any = await fetch(this.weiboUrl);

      const result: string = await res.text();
      const matches = result.matchAll(regexp);
  
      const words: Word[] = Array.from(matches).map(x => ({
        url: x[1],
        title: x[2],
      }));
  
      if (words.length) {
        this.feedList = words.map((item, index) => {
          const fullUrl: string = 'https://s.weibo.com/' + item.url;
          return new WeiBoTreeItem({
            name: item.title,
            contextValue: item.title,
            label: fullUrl
          }, this.context, false);
        });
  
        return this.feedList;
      }
    } catch (err) {
      console.log(err);
      return this.feedList;
    }

    return Promise.resolve([]);
  }
}