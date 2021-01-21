import * as vscode from 'vscode';
import WeiBoService from './service/weiboService';
import { WeiboProvider } from './service/weiboProvider';

let weiboTreeView: vscode.TreeView<any> | null = null;

export function activate(context: vscode.ExtensionContext) {

	const weiBoService = new WeiBoService(context);
	const weiboProvider = new WeiboProvider(weiBoService);
	
	weiboTreeView = vscode.window.createTreeView('weiboTreeView', {
		treeDataProvider: weiboProvider,
	});

	vscode.commands.registerCommand('weiboTreeView.refreshWeiBo', () => {
		weiboProvider.refresh();

	});

	console.log('🐂 Congratulations, your extension "vscode-plugin-weibo-hot" is now active!');

	context.subscriptions.push(); //
}

// this method is called when your extension is deactivated
export function deactivate() {}


function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	  <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
  </body>
  </html>`;
}