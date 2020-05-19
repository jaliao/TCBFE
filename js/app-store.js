/*app.js version 2020-5-19 update*/ 

function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    //console.log(document.cookie)
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
}
function checkCookie(){
    var user = getCookie("username");
    if (user!=""){
    	//
       // console.log("欢迎 " + user + " 再次访问");

    }
    else {
    	//first visit
    	//console.log("欢迎 " + user + " 首次访问");
    	cookieAlert()

    	user = "noname"

    	setCookie("username",user,30);

        // user = prompt("请输入你的名字:","");
        //   if (user!="" && user!=null){
        //     setCookie("username",user,30);
        // }

    }
}




function cookieAlert(){

	const cookieAlert = $('.bv-cookie-alert');
	const $body = $('body')
	const btn = cookieAlert.find('.btn')

	cookieAlert.addClass('active')
	$body.addClass('body-lock')

	btn.on('click',function(){

		cookieAlert.removeClass('active').fadeOut()
		$body.removeClass('body-lock')

	})

}

function getDevice(){

    var module = {
        options: [],
        header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
        dataos: [
            { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
            { name: 'Windows', value: 'Win', version: 'NT' },
            { name: 'iPhone', value: 'iPhone', version: 'OS' },
            { name: 'iPad', value: 'iPad', version: 'OS' },
            { name: 'Kindle', value: 'Silk', version: 'Silk' },
            { name: 'Android', value: 'Android', version: 'Android' },
            { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
            { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
            { name: 'Macintosh', value: 'Mac', version: 'OS X' },
            { name: 'Linux', value: 'Linux', version: 'rv' },
            { name: 'Palm', value: 'Palm', version: 'PalmOS' }
        ],
        databrowser: [
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
        ],
        init: function () {
            var agent = this.header.join(' '),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);
            
            return { os: os, browser: browser };
        },
        matchItem: function (string, data) {
            var i = 0,
                j = 0,
                html = '',
                regex,
                regexv,
                match,
                matches,
                version;
            
            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, 'i');
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                    matches = string.match(regexv);
                    version = '';
                    if (matches) { if (matches[1]) { matches = matches[1]; } }
                    if (matches) {
                        matches = matches.split(/[._]+/);
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + '.';
                            } else {
                                version += matches[j];
                            }
                        }
                    } else {
                        version = '0';
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version)
                    };
                }
            }
            return { name: 'unknown', version: 0 };
        }
    };
    
    var e = module.init(),
        debug = '';
    
    debug += 'os.name = ' + e.os.name + ',';
    debug += 'os.version = ' + e.os.version + ',';
    debug += 'browser.name = ' + e.browser.name + ',';
    debug += 'browser.version = ' + e.browser.version + ',';
    
    debug += ',';
    debug += 'navigator.userAgent = ' + navigator.userAgent + ',';
    debug += 'navigator.appVersion = ' + navigator.appVersion + ',';
    debug += 'navigator.platform = ' + navigator.platform + ',';
    debug += 'navigator.vendor = ' + navigator.vendor + ',';
    
    //document.getElementById('log').innerHTML = debug;

    let _os = `os: ${e.os.name} [${e.os.version}]`
    let _browser = `browser: ${e.browser.name} [${e.os.version}]`
    let _navigator  = `navigator.userAgent: ${navigator.userAgent}`

    //console.log(_os,',',_browser,',',_navigator)

    const device = {
    	os: e.os.name,
    	browser: e.browser.name,
    	userAgent: navigator.userAgent,
    	language: navigator.language
    }

    return device;

}
function initPlugins(){

	lazyload()

}


function checkLocale(){

	let isCN = document.body.classList.contains('zh-CN')

	return (isCN == true)? "zh-cn" : "en"
	
}

//custom libs
function dateFormalizing(string,format,locale){

	var time = new Date(string)
	time = moment(time).locale(locale).format(format)

	return time
}

function navbarUI(){

	//set up item
	const navbar = $('.bv-navbar')
	const navCollapse = $('.navbar-collapse')

	let isbodylock = false;

	let threshhold = navbar.height()
	const $body = $('body');
	const $html = $('html')
	let lastScrollTop;

	const $parallaxmirror = $('.parallax-mirror')


	var handleNavLock = function(y){

		if( y > threshhold ){

			navbar.addClass('navbar-lock-top')

		}else{

			navbar.removeClass('navbar-lock-top')

		}

	}

	let defaultScrollTop = $(window).scrollTop()
	handleNavLock(defaultScrollTop)

	$(window).scroll(function(){

		if(isbodylock == true){
			navbar.addClass('navbar-lock-top')
		}else{
			var y = $(window).scrollTop();		
			handleNavLock(y)
		}

	})

    navCollapse.on('show.bs.collapse',function(){

        var $this = $(this);
        bodyScrollLock.enableBodyScroll($this);
        lastScrollTop = $(window).scrollTop();
       	$body.addClass('body-lock')
       	$html.css({'overflow-y':' scroll'})
        $body.css({'top': -lastScrollTop});
        $parallaxmirror.css({'top': -lastScrollTop});

       	isbodylock = true

    }).on('hide.bs.collapse',function(){

        bodyScrollLock.clearAllBodyScrollLocks()
        $body.removeClass('body-lock')
        $body.css({'top': 'auto'});
        $html.css({'overflow-y':' auto'})
        $parallaxmirror.css({'top': '0'});
        $(window).scrollTop(lastScrollTop);

        isbodylock = false
    })


}

function animation(object){

	let ismobile;
	if($(window).width()>576){ ismobile = true}else{ ismobile = false}

	var controller = new ScrollMagic.Controller();
	
	var card = object.find(".bv-card")
	for (var i=0; i<card.length; i++) { // create a scene for each element
		new ScrollMagic.Scene({
			triggerElement: card[i], // y value not modified, so we can use element as trigger as well
			offset: 50, // start a little later
			triggerHook: 0.9,
			reverse:false
		})
		.setClassToggle(card[i], "visible") // add class toggle
		//.addIndicators({name: "digit " + (i+1) }) // add indicators (requires plugin)
		.addTo(controller);
	}

}

function initApp(device){

	const animate_card = $('.bv-cards-animation')
	const video = $('video')

	navbarUI()

	if(animate_card.length>0 ){
		animation(animate_card)
	}

}

//app controller
document.onreadystatechange = function () {

	//const mask = $('.bv-loading-mask')

	let state = document.readyState;

  	if (document.readyState == "interactive") {

  		setTimeout(function(){
  			//mask.fadeOut('slow')
  			checkCookie()

  			let device = getDevice()

  			initPlugins()
  			initApp(device)

  		},500)

  	}

  	if (document.readyState == "complete") {

  		

  	}
}
