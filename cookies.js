Shadowbox.init({displayCounter: false});
jQuery(function(){
	
	//LE ISTRUZIONI SONO IN FONDO AL FILE
	
	//INIZIO - parametri modificabili
	//********************************************************************************************

	//percorso della libreria
	var baseurl = 'http://192.168.1.28/stage/demoCookies/assets/js/cookielaw-2.0';	
	//lingua di default (it | en)
	var language = 'it';	
	//posizione banner (top | bottom)
	var cookieBannerPosition = 'bottom'; 						
	var coloreTestoBanner = '#000 !important';
	var coloreSfondoBanner = '#DAD94B !important';
	var coloreLink = '#913700 !important';
	var coloreTestoPulsante = '#FFF !important';
	var coloreSfondoPulsante = '#000 !important';
	var titolare = "Zenzero Comunicazione"; 			
	var indirizzo = "Via F.S.Nitti 14 - Parma"; 		
	var sitoweb = "www.zenzerocomunicazione.it";
	var email = "info@zenzerocomunicazione.it";
	//********************************************************************************************
	//FINE - parametri modificabili
			
	var content_it = 'Questo sito fa uso di cookie per migliorare l\'esperienza di navigazione degli utenti. Alcuni dei cookie utilizzati sono essenziali perch&eacute; esso funzioni correttamente. Proseguendo nella navigazione se ne accetta l\'uso. Per ulteriori dettagli si prega di consultare la nostra ';
	var content_en = 'This website uses cookies to improve the browsing experience of users and collect information on its use. Some of the cookies used are essential for it to operate properly. Continuing navigation you accept their use. For more details please refer to ';
	
	//scelta della lingua
	var pageurl = window.location.href;
	var pattern_ita1 = /\/ita\//;
	var pattern_ita2 = /\/it\//;
	var pattern_eng1 = /\/eng\//;
	var pattern_eng2 = /\/en\//;
	var pattern_deu1 = /\/deu\//;
	var pattern_deu2 = /\/de\//;
	var pattern_fra1 = /\/fra\//;
	var pattern_fra2 = /\/fr\//;
	var pattern_esp1 = /\/esp\//;
	var pattern_esp2 = /\/es\//;
	
	//se trovo un pattern di lingua nell'url scelgo la lingua altrimenti prendo il default
	if (pageurl.search(pattern_eng1) != -1 || pageurl.search(pattern_eng2) != -1) var lang = 'en';
	else if (pageurl.search(pattern_deu1) != -1 || pageurl.search(pattern_deu2) != -1) var lang = 'en';
	else if (pageurl.search(pattern_fra1) != -1 || pageurl.search(pattern_fra2) != -1) var lang = 'en';
	else if (pageurl.search(pattern_esp1) != -1 || pageurl.search(pattern_esp2) != -1) var lang = 'en';
	else if (pageurl.search(pattern_ita1) != -1 || pageurl.search(pattern_ita2) != -1) var lang = 'it';
	else var lang = language;
	//compongo la querystring
	var cookielaw_querystring = baseurl+'/cookies.php?lang='+lang+encodeURI('&titolare='+titolare+'&indirizzo='+indirizzo+'&sitoweb='+sitoweb+'&email='+email);
	var cookielaw_querystring_ita = baseurl+'/cookies.php?lang=it'+encodeURI('&titolare='+titolare+'&indirizzo='+indirizzo+'&sitoweb='+sitoweb+'&email='+email);
	var cookielaw_querystring_eng = baseurl+'/cookies.php?lang=en'+encodeURI('&titolare='+titolare+'&indirizzo='+indirizzo+'&sitoweb='+sitoweb+'&email='+email);
	switch (lang) {
		case 'it':
			var banner = '<div class="alertPolicyCookies"><div class="alertPolicyCookies-content">'+content_it+'<a id="cookiesreadmore" title="Cookie Policy" href="'+cookielaw_querystring+'" rel="shadowbox[cookielaw_it]">cookie policy</a>.<br><button class="alertPolicyCookies-button"><strong>OK</strong></button><!--<p><small>'+listCookies()+'</small></p>--></div></div>';
			break;
		case 'en':
		default:
			var banner = '<div class="alertPolicyCookies"><div class="alertPolicyCookies-content">'+content_en+'<a id="cookiesreadmore" title="Cookie Policy" href="'+cookielaw_querystring+'" rel="shadowbox[cookielaw_en]">cookie policy</a>.<br><button class="alertPolicyCookies-button"><strong>OK</strong></button><!--<p><small>'+listCookies()+'</small></p>--></div></div>';
			break;
	}
	
	//popup cookie
	if (!readCookie('zenPolicyCookie')) {	
	
		var positionCSSRules;
		if (cookieBannerPosition == 'top') positionCSSRules = 'top: 0px;';
		else positionCSSRules = 'bottom: -8px;';
	
		//stili per il banner
		jQuery('head').append('<style>a#cookiesreadmore { cursor: pointer; color: '+coloreLink+' } .alertPolicyCookies {display: none; position: fixed; '+positionCSSRules+' left: 0; width: 100%; background: '+coloreSfondoBanner+'; color: '+coloreTestoBanner+'; z-index: 999999999; box-shadow: 0 0 5px #666; opacity: 0.95 !important; text-align: center; font-size: 14px} .alertPolicyCookies-content { padding: 16px 48px 16px 48px } .alertPolicyCookies-button { cursor: pointer; margin-top: 10px; background: '+coloreSfondoPulsante+'; color: '+coloreTestoPulsante+'; border: none; padding: 6px 10px; border-radius: 5px; box-shadow: 0 0 3px #CCC;} .alertPolicyCookies a { color: #08437F; font-weight: bold }</style>');
		//accodo il banner
		jQuery('body').append(banner);
		var bannerHeight = jQuery('.alertPolicyCookies').height();
		//creo uno spazio nel container per ospitare il banner
		jQuery('.alertPolicyCookies').prev().css('margin-bottom',bannerHeight);
		jQuery('.alertPolicyCookies').fadeIn();
		jQuery('.alertPolicyCookies-button').click(function(){
			jQuery('.alertPolicyCookies').hide();
			createCookie('zenPolicyCookie',1,365);
		});
	}
	
	//stili per shadowbox
	jQuery('head').append('<style>#sb-title-inner,#sb-info-inner,#sb-loading-inner,div.sb-message{font-family:"HelveticaNeue-Light","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:200;color:#fff;}#sb-container{position:fixed;margin:0;padding:0;top:0;left:0;z-index:9999999991;text-align:left;visibility:hidden;display:none;}#sb-overlay{position:relative;height:100%;width:100%;}#sb-wrapper{position:absolute;visibility:hidden;width:100px;}#sb-wrapper-inner{position:relative;border:1px solid #303030;border-radius: 5px;overflow:hidden;height:100px;}#sb-body{position:relative;height:100%;}#sb-body-inner{position:absolute;height:100%;width:100%;}#sb-player.html{height:100%;overflow:auto;}#sb-body img{border:none;}#sb-loading{position:relative;height:100%;}#sb-loading-inner{position:absolute;font-size:14px;line-height:24px;height:24px;top:50%;margin-top:-12px;width:100%;text-align:center;}#sb-loading-inner span{background:url('+baseurl+'/loading.gif) no-repeat;padding-left:34px;display:inline-block;}#sb-body,#sb-loading{background-color:#FFF;}#sb-title,#sb-info{position:relative;margin:0;padding:0;overflow:hidden;}#sb-title,#sb-title-inner{height:26px;line-height:26px;}#sb-title-inner{font-size:16px;}#sb-info,#sb-info-inner{height:64px;line-height:4px;}#sb-info-inner{font-size:12px;}#sb-nav{float:right;height:120px;padding:2px 0;width:45%;}#sb-nav a{display:block;float:right;height:44px;width:44px;margin-top: 10px;margin-left:3px;cursor:pointer;background-repeat:no-repeat;}#sb-nav-close{background-image:url('+baseurl+'/close.png);}#sb-nav-next{background-image:url('+baseurl+'/next.png);}#sb-nav-previous{background-image:url('+baseurl+'/previous.png);}#sb-nav-play{background-image:url('+baseurl+'/play.png);}#sb-nav-pause{background-image:url('+baseurl+'/pause.png);}#sb-counter{float:left;width:45%;}#sb-counter a{padding:0 4px 0 0;text-decoration:none;cursor:pointer;color:#fff;}#sb-counter a.sb-counter-current{text-decoration:underline;}div.sb-message{font-size:12px;padding:10px;text-align:center;}div.sb-message a:link,div.sb-message a:visited{color:#fff;text-decoration:underline;}</style>');
		
	//se nella pagina sono presenti link alla policy estesa ne imposta l'url
	jQuery('.cookieurl').attr('href',cookielaw_querystring);
	jQuery('.cookieurl-ita').attr('href',cookielaw_querystring_ita);
	jQuery('.cookieurl-eng').attr('href',cookielaw_querystring_eng);
	
});

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ') ' + theCookies[i-1] + "<br>";
    }
    return aString;
}

//istruzioni
//*************************************************************************
/*
	1) Verificare se jQuery viene caricato
		Se non viene caricato si può aggiungere con questa linea di codice
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	
	2) modificare il parametro 'baseurl' in cima a questo file
		- es. MODX: 
			var baseurl = 'http://www.sito.it/assets/js/cookielaw-2.0';
		- es. Wordpress: 
			var baseurl = 'http://www.sito.it/wp-content/themes/[tema]/js/cookielaw-2.0';
		
	3a) MODx
		- copiare la cartella cookielaw in assets/js/cookielaw-2.0/
		- inserire nei template 
		<script src="assets/js/cookielaw-2.0/shadowbox.js"></script>
		<script src="assets/js/cookielaw-2.0/cookies.js"></script>
		
	3b) Wordpress
		- copiare la cartella cookielaw-2.0 in root
		- inserire in coda al file functions.php del tema questo codice...
		function LoadCookieLaw() {
			wp_enqueue_script(
				'shadowbox',
				get_stylesheet_directory_uri() . '/js/cookielaw-2.0/shadowbox.js',
				array('jquery')
			);
			wp_enqueue_script(
				'CookieLaw',
				get_stylesheet_directory_uri() . '/js/cookielaw-2.0/cookies.js',
				array('shadowbox')
			);
		}
		add_action('wp_enqueue_scripts', 'LoadCookieLaw');		
		
	4) Per aggiungere un link nel footer dei siti alla cookie policy usare questa stringa
		<a rel="shadowbox[cookielaw_it]" href="#" class="cookieurl-ita">ITA</a>
		<a rel="shadowbox[cookielaw_en]" href="#" class="cookieurl-eng">ENG</a>
		<a rel="shadowbox[cookielaw]" href="#" class="cookieurl">DEFAULT</a>
*/