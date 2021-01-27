import { Event, EventEmitter, TreeDataProvider, TreeItem } from 'vscode';
import ZhihuService from './zhihuService';
import ZhihuTreeItem from '../shared/zhihuTreeItem';

export class ZhihuProvider implements TreeDataProvider<ZhihuTreeItem> {

    private service: ZhihuService;
    private _onDidChangeTreeData: EventEmitter<any> = new EventEmitter<any>();
    readonly onDidChangeTreeData: Event<any> = this._onDidChangeTreeData.event;

    constructor(service: ZhihuService) {
        this.service = service;
    }

    refresh(): any {
        this._onDidChangeTreeData.fire(undefined);
    }
  
    getChildren(element: ZhihuTreeItem): Thenable<ZhihuTreeItem[]> {
        return this.service.getData();
    }
    
    getParent(element: ZhihuTreeItem): ZhihuTreeItem | null {
        return null;
    }

    getTreeItem(element: ZhihuTreeItem): TreeItem {
        return element;
    }
}
