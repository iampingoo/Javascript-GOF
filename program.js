import { Subject, Observer, extend } from "./Observers.js";

// DOMへの参照
const    controlCheckbox    = document.getElementById( "mainCheckbox" )
        ,addBtn             = document.getElementById( "addNewObserver")
        ,container          = document.getElementById( "observersContainer" );

// 具象サブジェクト

// 制御用チェックボックスをサブジェクトクラスで拡張
extend( new Subject(), controlCheckbox );

// チェックボックスをクリックするとオブザーバに通知する
controlCheckbox.onclick = () => { controlCheckbox.Notify( controlCheckbox.checked ) };

// 具象オブザーバ
const AddNewObserver = () => {
    // 追加するチェックボックスを新たに作成
    const check = document.createElement( "input" );
    check.type  = "checkbox";

    // オブザーバクラスでチェックボックスを拡張
    extend( new Observer(), check );

    // カスタム更新動作でオーバーライド
    check.Update    = ( value ) => {
        check.checked    = value;
    };

    // クリックでオブザーバリストから除外(動作をみたいのでチェックボックス自体は消さない)
    check.onclick = () => {
        controlCheckbox.RemoveObserver( check )
    };

    // メインサブジェクトのオブザーバのリストに新しいオブザーバを追加する
    controlCheckbox.AddObserver( check );

    // コンテナに項目を追加
    container.appendChild( check );
}

addBtn.onclick          = AddNewObserver;
