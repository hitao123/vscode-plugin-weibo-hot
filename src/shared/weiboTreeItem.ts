import { ExtensionContext, TreeItem, TreeItemCollapsibleState } from 'vscode';

interface WeiBoInfo {
    name: string;
    showLabel?: boolean;
    id?: string;
    contextValue?: string;
    label?: string;
    type?: string;
    isUpdated?: boolean;
    showEarnings?: boolean;
}


export default class WeiBoTreeItem extends TreeItem {

    info: WeiBoInfo;
    type: string | undefined;
    isCategory: boolean;
    contextValue: string | undefined;

    constructor(info: WeiBoInfo, context: ExtensionContext | undefined, isCategory = false) {
        super('', TreeItemCollapsibleState.None);
        this.info = info;
        this.isCategory = isCategory;

        const {
            type,
            label,
            name,
            contextValue
        } = info;

        this.type = type;
        this.contextValue = contextValue;
        this.label = name;
        this.tooltip = label;
        this.command = {
            title: name, // 标题
            command: 'hot-news.weiboItemClick', // 命令 ID
            arguments: []
        };
    }
}