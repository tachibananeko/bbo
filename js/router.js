function Router() {
    this.routes = {};
    this.currentUrl = '';
}

Router.prototype.route = function(path, callback) {
    this.routes[path] = callback || function() {};
    //给不同的hash设置不同的回调函数
};
Router.prototype.refresh = function() {
    // 路由清單
    let routerList = ['', 'home','problem','resources','about','contact','report'];

    //获取到相应的hash值
    let index = routerList.indexOf(location.hash.slice(2))
    if (index == -1) {
        this.currentUrl = '/home'
        location.href = "#/home"
    } else {
        this.currentUrl = location.hash.slice(1) || '/home';
    }
    // this.currentUrl = location.hash.slice(1) || '/home'; 
    //如果存在hash值则获取到，否则设置hash值为/
    // console.log(this.currentUrl);
    if (this.currentUrl && this.currentUrl != '/') {
        this.routes[this.currentUrl](); //根据当前的hash值来调用相对应的回调函数
    }

};
Router.prototype.init = function() {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
}

//给window对象挂载属性
window.Router = new Router();
window.Router.init();

// 路由呼叫路徑
Router.route('/home', function() {
    mainInclude('tpl/home.html');
    topmenu_highlight(1);
});
Router.route('/problem', function() {
    mainInclude('tpl/problem.html');
    topmenu_highlight(2);
});
Router.route('/resources', function() {
    mainInclude('tpl/resources.html');
    topmenu_highlight(3);
});
Router.route('/about', function() {
    mainInclude('tpl/about.html');
    topmenu_highlight(4);
});
Router.route('/contact', function() {
    mainInclude('tpl/contact.html');
    topmenu_highlight(5);
});
Router.route('/report', function() {
    mainInclude('tpl/report.html');
    topmenu_highlight(6);
});


// 變更topmenu亮起
function topmenu_highlight(num){
    $('#topMenu li').removeClass('--on');
    $(`#topMenu li:eq(${num})`).addClass('--on');
}

function mainInclude(src) {
    $('#load').css('display','block');  
    $.ajax({
        url: src,
        success: function(html) {  
            $("#content").html(html);   
            window.scrollTo({ top: 0 });
        },
        // 發送前
        beforeSend: function() {},
        // 完成
        complete: function() {},
        error: function(error) {
            location.href = "#/home"
        }
    });
}


