import { ExtensionContext, TreeItem, TreeItemCollapsibleState } from 'vscode';

interface ZhihuInfo {
    name: string;
    showLabel?: boolean;
    id?: string;
    contextValue?: string;
    label?: string;
    type?: string;
    isUpdated?: boolean;
    showEarnings?: boolean;
}


export default class ZhihuTreeItem extends TreeItem {

    info: ZhihuInfo;
    type: string | undefined;
    isCategory: boolean;
    contextValue: string | undefined;

    constructor(info: ZhihuInfo, context: ExtensionContext | undefined, isCategory = false) {
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
    }
}