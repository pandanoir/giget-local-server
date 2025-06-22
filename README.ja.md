[English readme](./README.md)

gigetはテンプレートとしてローカルディレクトリを選択する機能がない。そこで、テンプレートディレクトリをtarballに圧縮して返すサーバーを作った。

# 使い方

1. サーバーを起動する `node server.js {テンプレートディレクトリ}`
1. gigetする
   `npx giget@latest http://localhost:3000/template.tar.gz my-app --install`

tarballは2種類ある。

- http://localhost:3000/template.tar.gz: リクエスト時に動的に生成したtarball
- http://localhost:3000/cached.tar.gz: サーバー起動時に生成したtarball

cached.tar.gzの方がレスポンスは早いが、サーバー起動後にテンプレートディレクトリに行った変更は反映されない。
