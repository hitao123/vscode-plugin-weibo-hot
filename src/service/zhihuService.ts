import { ExtensionContext } from 'vscode';
import fetch from 'node-fetch';
import ZhihuTreeItem from '../shared/zhihuTreeItem';

export type SearchWord = {
    query: string;
    display_query: string;
};

export type TopSearch = {
    top_search: {
        words: SearchWord[];
    };
};

export default class ZhihuService {
    private context: ExtensionContext;
    public feedList: ZhihuTreeItem[] = [];
    private zhihuUrl = 'https://www.zhihu.com/api/v4/search/top_search';

    constructor(context: ExtensionContext) {
        this.context = context;
    }

    async getData(): Promise<Array<ZhihuTreeItem>> {

        try {
            const response = await fetch(this.zhihuUrl);

            const result: TopSearch = await response.json();
    
            const words = result.top_search.words;
    
            if (words.length) {
                this.feedList = words.map((item, index) => {
                    const url = `https://www.zhihu.com/search?q=${item.query}`;
    
                    return new ZhihuTreeItem({
                        name: item.display_query,
                        contextValue: item.display_query,
                        label: url
                    }, this.context, false);
                });
    
                return this.feedList;
            }
        } catch (err) {
            return this.feedList;
        }

        return Promise.resolve([]);
    }
}