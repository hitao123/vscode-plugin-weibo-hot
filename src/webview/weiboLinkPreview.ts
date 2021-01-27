import { ViewColumn } from 'vscode';
import ReusedWebviewPanel from './ReusedWebviewPanel';
import WeiBoService from '../service/weiboService';

async function weiboLinkPreview(service: WeiBoService) {

  const feedList = service.feedList;
  const panel = ReusedWebviewPanel.create('weiboLinkWebview', '微博热点', ViewColumn.One, {
    enableScripts: true,
    retainContextWhenHidden: true,
  });

  panel.webview.html = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>微博热点列表</title>
          <style>
          body{
            background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
            color:#fff;
          }
         .header h2 {
            text-align: center;
         }
         .list-items {
           list-style: none;
           padding: 0;
         }
         .list-item {
           cursor: pointer;
           height: 30px;
           padding: 4px 8px;
           line-height: 30px;
         }
         .list-item a {
            text-decoration: none;
            color: #fff;
         }
       </style>
      </head>
      <body>
          <div class="list">
            <div class="header">
              <h2>热点列表</h2>
            </div>
            <ul class="list-items"></ul>
          </div>
      </body>
      <script>
        let feedList=${JSON.stringify(feedList)};
        let listEl = document.querySelector('.list');
        let listItemUlEl = document.querySelector('.list-items');
        let headerEl = document.querySelector('.header');
        let childs = listEl.childNodes;
        listEl.removeChild(listItemUlEl);
        let listStr = '';

        for (let j = 0; j < feedList.length; j++) {
          let info = feedList[j].info;

          listStr +=
            '<li class="list-item" ' +
            '">' +
            '<a href="' +
            info.label +
            '">' +
            (j+1) + '、 ' +
            info.name +
            '</a></li>';
        }
        headerEl.insertAdjacentHTML(
          'afterend',
          ' <ul class="list-items">' + listStr + '</ul>'
        );
      </script>
      </html>
    `;
}

export default weiboLinkPreview;
