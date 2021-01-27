import * as vscode from 'vscode';
import WeiBoService from './service/weiboService';
import { WeiboProvider } from './service/weiboProvider';
import { ZhihuProvider } from './service/zhihuProvider';
import ZhihuService from './service/zhihuService';

let weiboTreeView: vscode.TreeView<any> | null = null;
let zhihuTreeView: vscode.TreeView<any> | null = null;

export function activate(context: vscode.ExtensionContext) {

	const weiBoService = new WeiBoService(context);
	const zhihuService = new ZhihuService(context);
	const weiboProvider = new WeiboProvider(weiBoService);
	const zhihuProvider = new ZhihuProvider(zhihuService);
	
	weiboTreeView = vscode.window.createTreeView('HotTreeView.weibo', {
		treeDataProvider: weiboProvider,
	});

	zhihuTreeView = vscode.window.createTreeView('HotTreeView.zhihu', {
		treeDataProvider: zhihuProvider,
	});

	vscode.commands.registerCommand('hot-news.refreshWeiBo', () => {
		weiboProvider.refresh();
	});

	vscode.commands.registerCommand('hot-news.refreshZhihu', () => {
		zhihuProvider.refresh();
	});

	console.log('🐂 Congratulations, your extension "vscode-plugin-weibo-hot" is now active!');

	context.subscriptions.push(); //
}

// this method is called when your extension is deactivated
export function deactivate() {}
