//一つ前の入力を保存
var before_key;

//選択項目の色:緑
var choose_color = '#008000';

//google class名
var chrome_class_name = 'yuRUbf';

//one of list
var choose_int = -1;
//配列化
div_list = document.getElementsByClassName( chrome_class_name );

//code block
let content_location ;
let first_code_block = document.querySelector( 'code' );
let has_code_block = false;
let code_blocks = document.querySelectorAll( 'code' );
let code_block_int = -1;
let border_style = "solid 2px #D7Df01";
if( first_code_block != null ){
    has_code_block = true;
}


//on focus
let focus_status = false;
let first_input_focus = document.querySelector('input');
let input_focus_all = document.querySelectorAll('input');
let has_focus = false;
let on_focus_content = null;

//console.log( first_input_focus );
//inputが存在しない場合処理しない
if( first_input_focus != null ){
    //input要素が存在する。
    has_focus = true;
    //すべてのinput要素に適用させる
    for( i = 0 ; i < input_focus_all.length ; i++ ){
        //console.log( input_focus_all[i] );
        input_focus_all[i].onfocus = input_Focus;
        input_focus_all[i].onblur = input_Blur;
    }
}
function input_Focus() {
    focus_status = true;
    on_focus_content = document.activeElement;
}
function input_Blur() {
    focus_status = false;
}

//key event
function ChromeVimKeyBind(){
    const that = this;
    window.addEventListener('keydown',function(e) { that.someMethod(e); });
    window.addEventListener('keyup',function(e) { that.testMethod(e); });
}
function testMethod(e) {
    //focus状態ではない
    if(focus_status == false){
        //dialogなどに現在対応できていないのでフォーカス状態でも意図しない動作が起きる。
        //on Shift
        //if(e.shiftKey){
        //    switch(e.keyCode){
        //        //I input要素の中身を消してfocus
        //        case 73:
        //            if( has_focus ){
        //                first_input_focus.value = '';
        //                first_input_focus.focus();
        //            }
        //            break;
        //    }
        //}
        if(e.ctrlKey){
            switch(e.keyCode){
                //Ctrl + I input要素にfocus
                case 73:
                    if( has_focus ){
                        first_input_focus.focus();
                        first_input_focus.setSelectionRange(-1,-1);
                    }
                    break;
            }
        }
        //off Shift
        //off Ctrl
    }
}
function someMethod(e) {

    if(focus_status == false){

        //Shift
        if(e.shiftKey){
            switch(e.keyCode){
                //次に進む N
                case 78:
                    history.forward();
                    break;
                //前に戻る P
                case 80:
                    history.back();
                    break;
                 
                //J
                case 74:
                    if( -1 <= choose_int && choose_int < div_list.length ){
                        if(choose_int != -1){
                        //カラーの初期化
                        before_block = div_list[ choose_int ];
                        before_block.style.backgroundColor = null;
                        }

                        choose_int++;

                        if(choose_int != div_list.length ){
                            //選択した項目の背景色を変更
                            block = div_list[ choose_int ];
                            block.style.backgroundColor = choose_color;
                        }
                    }
                    break;
                    
                //K
                case 75:

                    if( 0 <= choose_int && choose_int <= div_list.length ){
                        if(choose_int != div_list.length ){
                            //カラーの初期化
                            before_block = div_list[ choose_int ];
                            before_block.style.backgroundColor = null;
                        }

                        choose_int--;

                        if( 0 <= choose_int ){
                            //選択した項目の背景色を変更
                            block = div_list[ choose_int ];
                            block.style.backgroundColor = choose_color;
                        }
                    }
                    break;
                 
                //Shift + enter 
                case 13:
                    if(choose_int != -1 && choose_int != div_list.length ){
                        var raw_text = div_list[ choose_int ].innerHTML;
                        var result = raw_text.match(/href=\".*?\"/gi);
                        var link = result[0].slice( 5 ).replace(/"/g , '');
                        window.open( link , '_self');
                    }
                    break;
                 
                //G + go to bottom
                case 71:
                    var element = document.documentElement;
                    var bottom = element.scrollHeight - element.clientHeight;
                    window.scroll({ top : bottom , behavior : 'smooth' });
                    break;
                    
                //yY code block copy
                case 89:
                    if( before_key == 89 ){
                        if( has_code_block ){
                            if( -1 != code_block_int && code_block_int != code_blocks.length ){
                                var block_copy = code_blocks[code_block_int].innerText;
                                navigator.clipboard.writeText( block_copy );
                                //console.log( block_copy );
                            }
                        }
                    }
                    break;
            }
        }

        //Ctrl = true
        else if(e.ctrlKey){
            switch(e.keyCode){

                //Ctrl + enter 別のタブで開く
                case 13:
                    if(choose_int != -1 && choose_int != div_list.length ){
                        var raw_text = div_list[ choose_int ].innerHTML;
                        var result = raw_text.match(/href=\".*?\"/gi);
                        var link = result[0].slice( 5 ).replace(/"/g , '');
                        window.open( link );
                    }
                    break;
            }

        //Ctrl = else
        }else{
            switch(e.keyCode){

                //J + down browser
                case 74:
                    window.scrollBy(0, 50 );
                    break;

                //K + up   browser
                case 75:
                    window.scrollBy(0, -50 );
                    break;

                //GG + go to top
                case 71:
                    if( before_key == 71 ){
                        window.scroll({ top: 0 , behavior: 'smooth' });
                    }
                    break;

                //enter
                case 13:
                    if(choose_int != -1 && choose_int != div_list.length ){
                        var raw_text = div_list[ choose_int ].innerHTML;
                        var result = raw_text.match(/href=\".*?\"/gi);
                        var link = result[0].slice( 5 ).replace(/"/g , '');
                        window.open( link , '_self');
                    }
                    break;

                //yy 現在のリンクをクリップボードにコピー
                case 89:
                    if( before_key == 89 ){
                        navigator.clipboard.writeText( window.location.href );
                    }
                    break;
                 
                //F
                case 70:
                    break;
                //[
                case 219:
                    //前
                    if( has_code_block ){
                        if( -1 < code_block_int ){
                            //defaultカラーに戻す
                            if( code_block_int != code_blocks.length ){
                                code_blocks[code_block_int].style.border = null; 
                            }
                            code_block_int--;
                            if( code_block_int != -1 ){
                                //選択色
                                code_blocks[code_block_int].style.border = border_style;
                                //移動ブロック
                                content_location = code_blocks[code_block_int].getBoundingClientRect();
                                document.documentElement.scrollTop = content_location.top + window.pageYOffset -100;
                            }
                        }
                    }
                    break;

                //]
                case 221:
                    //次
                    if( has_code_block ){
                        if( code_block_int < code_blocks.length ){
                            //defaultカラーに戻す
                            if( code_block_int != -1 ){
                                code_blocks[code_block_int].style.border = null; 
                            }

                            code_block_int++;
                            
                            if( code_block_int != code_blocks.length ){
                                //選択色
                                code_blocks[code_block_int].style.border = border_style;
                                //移動ブロック
                                content_location = code_blocks[code_block_int].getBoundingClientRect();
                                document.documentElement.scrollTop = content_location.top + window.pageYOffset -100;
                            }
                        }
                    }
                    break;
                //default:
                    //break;
            }
        }
     
    //onFocus
    }else{
        switch(e.keyCode){
            //J + J input要素から離脱
            case 74:
                if( before_key == 74 ){
                    var blur_text = '' + on_focus_content.value;
                    on_focus_content.value = blur_text.slice( 0 , -1 );
                    on_focus_content.blur();
                }
                break;
        }

    }
    //keyの保存
    before_key = e.keyCode;
}

ChromeVimKeyBind();






