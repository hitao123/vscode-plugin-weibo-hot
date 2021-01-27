import * as vscode from 'vscode';
import WeiBoService from './service/weiboService';
import { WeiboProvider } from './service/weiboProvider';
import { ZhihuProvider } from './service/zhihuProvider';
import ZhihuService from './service/zhihuService';
import weiboLinkPreview from './webview/weiboLinkPreview';
import zhihuLinkPreview from './webview/zhihuLinkPreview';


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

	// 注册命令，需要在 package.json 声明
	vscode.commands.registerCommand('hot-news.refreshWeiBo', () => {
		weiboProvider.refresh();
	});
	vscode.commands.registerCommand('hot-news.refreshZhihu', () => {
		zhihuProvider.refresh();
	});
	// 注册命令，不需要在 package.json 声明
	vscode.commands.registerCommand('hot-news.weiboItemClick', () => weiboLinkPreview(weiBoService))
	vscode.commands.registerCommand('hot-news.zhihuItemClick', () => zhihuLinkPreview(zhihuService))


	console.log('🐂 Congratulations, your extension "vscode-plugin-weibo-hot" is now active!');

	context.subscriptions.push();
}

// this method is called when your extension is deactivated
export function deactivate() {}
