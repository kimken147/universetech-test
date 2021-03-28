## 如何啟動
執行`yarn start`, 開發模式網址為http://localhost:3000

## 資料來源
因為個人的github public repos數量

### 模組切分

#### `App.tsx`
此為程式的進入點，在這題目中負責偵測input變化以及延遲決定input變化結果
延遲使用debounce，時間為1000ms，避免過度頻繁發送request給github
#### `components`
List為展示infiniteScroll所用的component
List中還有一個repo.tsx是各個repo的展示，repo只做了簡單的css展示每個repo位置
List還負責發送github api獲取資料以及控制頁數變化
#### `hooks`
useInifiniteScroll
使用setInterval的方式偵測dom是否接觸到捲軸的底部
#### `services`
使用DI的方式建立API資料來源，可根據不同的實體提供不同的資料來源