// constants, variables ===========================================================================
let onFlag = true;
const saveKey = "onFlag";


// addEventListener ================================================================================
document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("hide-or-not").addEventListener("change", changeHideOrNot);
document.getElementById("reload-button").addEventListener("click", reloadCurrentPage);


// Functions =======================================================================================
function storageValue(value) {
    return browser.storage.local.set({[saveKey]: value});
    // return browser.storage.sync.set({[saveKey]: value});
}

// hide-or-not のチェックが変更された場合の処理をする関数
function changeHideOrNot() {
    let hideOrNotValue = document.getElementById("hide-or-not").checked;
    storageValue(hideOrNotValue);
    buttonDisplay(true);
}

// reload-button-div の class を display-none にセットしたり、はずしたりする関数
function buttonDisplay(displayFlag) {
    if (displayFlag) {
        document.getElementById("reload-button-div").classList.remove('display-none');
    }
    else {
        document.getElementById("reload-button-div").classList.add('display-none');
    }
}

// reload ==========================================================================================
function reloadCurrentPage() {
    // Reload the active tab of the current window:
    browser.tabs.reload();
    buttonDisplay(false);
}


// popup表示時に実行する関数 =======================================================================
// restoreOptions() → storageGet() → onGot()

// storage.get がエラーになったとき実行される関数
function onError(error) {
    console.error(`popup:onError: ${error}`);
}

// storage.get が正常に実行されたとき実行される関数
function onGot(item) {
    onFlag = item[saveKey]; // グローバル変数にセット
    document.getElementById("hide-or-not").checked = onFlag;
}

// storageから取得
// keys を指定せずに呼び出すと全て取得
// https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/get
function storageGet() {
    // return browser.storage.sync.get();
    return browser.storage.local.get();
}

// 保存してある設定項目の値を読み込む関数
function restoreOptions() {
    storageGet()
        .then(onGot)
        .catch(onError);
}
