import { Event, EventEmitter, ExtensionContext, TreeDataProvider, TreeItem } from 'vscode';
import WeiBoService from './weiboService';
import WeiBoTreeItem from '../shared/weiboTreeItem';

export class WeiboProvider implements TreeDataProvider<WeiBoTreeItem> {

    private service: WeiBoService;
    private _onDidChangeTreeData: EventEmitter<any> = new EventEmitter<any>();
    readonly onDidChangeTreeData: Event<any> = this._onDidChangeTreeData.event;

    constructor(service: WeiBoService) {
        this.service = service;
    }

    refresh(): any {
        this._onDidChangeTreeData.fire(undefined);
    }
  
    getChildren(element: WeiBoTreeItem): Thenable<WeiBoTreeItem[]> {
        return this.service.getData();
    }
    
    getParent(element: WeiBoTreeItem): WeiBoTreeItem | null {
        return null;
    }

    getTreeItem(element: WeiBoTreeItem): TreeItem {
        return element;
    }
}