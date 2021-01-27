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

    constructor(context: ExtensionContext) {
        this.context = context;
    }

    async getData(): Promise<Array<ZhihuTreeItem>> {
        const response = await fetch('https://www.zhihu.com/api/v4/search/top_search');

        const result: TopSearch = await response.json();

        const words = result.top_search.words;

        if (words.length) {
            return words.map((item, index) => {
                const url = `https://www.zhihu.com/search?q=${item.query}`;

                return new ZhihuTreeItem({
                    name: item.display_query,
                    contextValue: item.display_query,
                    label: url
                }, this.context, false);
            });
        }

        return Promise.resolve([]);
    }
}