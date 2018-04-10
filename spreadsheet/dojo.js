/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

if(typeof dojo=="undefined"){
    var dj_global=this;
    function dj_undef(_1,_2){
        if(_2==null){
            _2=dojo.global();
        }
        return (typeof _2[_1]=="undefined");
    }
    if(dj_undef("djConfig",this)){
        var djConfig={};
    }
    if(dj_undef("dojo",this)){
        var dojo={};
    }
    dojo._currentContext=this;
    if(!dj_undef("document",dojo._currentContext)){
        dojo._currentDocument=this.document;
    }
    dojo.locale=djConfig.locale;
    dojo.version={major:0,minor:0,patch:0,flag:"dev",revision:Number("$Rev: 4898 $".match(/[0-9]+/)[0]),toString:function(){
        with(dojo.version){
            return major+"."+minor+"."+patch+flag+" ("+revision+")";
        }
    }};
    dojo.evalProp=function(_3,_4,_5){
        return (_4&&!dj_undef(_3,_4)?_4[_3]:(_5?(_4[_3]={}):undefined));
    };
    dojo.parseObjPath=function(_6,_7,_8){
        var _9=(_7!=null?_7:dj_global);
        var _a=_6.split(".");
        var _b=_a.pop();
        for(var i=0,l=_a.length;i<l&&_9;i++){
            _9=dojo.evalProp(_a[i],_9,_8);
        }
        return {obj:_9,prop:_b};
    };
    dojo.evalObjPath=function(_d,_e){
        if(typeof _d!="string"){
            return dj_global;
        }
        if(_d.indexOf(".")==-1){
            return dojo.evalProp(_d,dj_global,_e);
        }
        var _f=dojo.parseObjPath(_d,dj_global,_e);
        if(_f){
            return dojo.evalProp(_f.prop,_f.obj,_e);
        }
        return null;
    };
    dojo.global=function(){
        return dojo._currentContext;
    };
    dojo.doc=function(){
        return dojo._currentDocument;
    };
    dojo.body=function(){
        return dojo.doc().body||dojo.doc().getElementsByTagName("body")[0];
    };
    dojo.withGlobal=function(_10,_11,_12){
        var _13=dojo._currentDocument;
        var _14=dojo._currentContext;
        var _15;
        try{
            dojo._currentContext=_10;
            dojo._currentDocument=_10.document;
            if(_12){
                _15=dojo.lang.curryArguments(_12,_11,arguments,3);
            }else{
                _15=_11();
            }
        }
        catch(e){
            dojo._currentContext=_14;
            dojo._currentDocument=_13;
            throw e;
        }
        dojo._currentContext=_14;
        dojo._currentDocument=_13;
        return _15;
    };
    dojo.withDoc=function(_16,_17,_18){
        var _19=this._currentDocument;
        var _1a;
        try{
            dojo._currentDocument=_16;
            if(_18){
                _1a=dojo.lang.curryArguments(_18,_17,arguments,3);
            }else{
                _1a=_17();
            }
        }
        catch(e){
            dojo._currentDocument=_19;
            throw e;
        }
        dojo._currentDocument=_19;
        return _1a;
    };
    dojo.errorToString=function(_1b){
        if(!dj_undef("message",_1b)){
            return _1b.message;
        }else{
            if(!dj_undef("description",_1b)){
                return _1b.description;
            }else{
                return _1b;
            }
        }
    };
    dojo.raise=function(_1c,_1d){
        if(_1d){
            _1c=_1c+": "+dojo.errorToString(_1d);
        }
        try{
            dojo.hostenv.println("FATAL: "+_1c);
        }
        catch(e){
        }
        throw Error(_1c);
    };
    dojo.debug=function(){
    };
    dojo.debugShallow=function(obj){
    };
    dojo.profile={start:function(){
    },end:function(){
    },stop:function(){
    },dump:function(){
    }};
    function dj_eval(_1f){
        return dj_global.eval?dj_global.eval(_1f):eval(_1f);
    }
    dojo.unimplemented=function(_20,_21){
        var _22="'"+_20+"' not implemented";
        if(_21!=null){
            _22+=" "+_21;
        }
        dojo.raise(_22);
    };
    dojo.deprecated=function(_23,_24,_25){
        var _26="DEPRECATED: "+_23;
        if(_24){
            _26+=" "+_24;
        }
        if(_25){
            _26+=" -- will be removed in version: "+_25;
        }
        dojo.debug(_26);
    };
    dojo.inherits=function(_27,_28){
        if(typeof _28!="function"){
            dojo.raise("dojo.inherits: superclass argument ["+_28+"] must be a function (subclass: ["+_27+"']");
        }
        _27.prototype=new _28();
        _27.prototype.constructor=_27;
        _27.superclass=_28.prototype;
        _27["super"]=_28.prototype;
    };
    dojo._mixin=function(obj,_2a){
        var _2b={};
        for(var x in _2a){
            if(typeof _2b[x]=="undefined"||_2b[x]!=_2a[x]){
                obj[x]=_2a[x];
            }
        }
        if(dojo.render.html.ie&&dojo.lang.isFunction(_2a["toString"])&&_2a["toString"]!=obj["toString"]){
            obj.toString=_2a.toString;
        }
        return obj;
    };
    dojo.mixin=function(obj,_2e){
        for(var i=1,l=arguments.length;i<l;i++){
            dojo._mixin(obj,arguments[i]);
        }
        return obj;
    };
    dojo.extend=function(_30,_31){
        for(var i=1,l=arguments.length;i<l;i++){
            dojo._mixin(_30.prototype,arguments[i]);
        }
        return _30;
    };
    dojo.render=(function(){
        function vscaffold(_33,_34){
            var tmp={capable:false,support:{builtin:false,plugin:false},prefixes:_33};
            for(var i=0;i<_34.length;i++){
                tmp[_34[i]]=false;
            }
            return tmp;
        }
        return {name:"",ver:dojo.version,os:{win:false,linux:false,osx:false},html:vscaffold(["html"],["ie","opera","khtml","safari","moz"]),svg:vscaffold(["svg"],["corel","adobe","batik"]),vml:vscaffold(["vml"],["ie"]),swf:vscaffold(["Swf","Flash","Mm"],["mm"]),swt:vscaffold(["Swt"],["ibm"])};
    })();
    dojo.hostenv=(function(){
        var _37={isDebug:false,allowQueryConfig:false,baseScriptUri:"",baseRelativePath:"",libraryScriptUri:"",iePreventClobber:false,ieClobberMinimal:true,preventBackButtonFix:true,searchIds:[],parseWidgets:true};
        if(typeof djConfig=="undefined"){
            djConfig=_37;
        }else{
            for(var _38 in _37){
                if(typeof djConfig[_38]=="undefined"){
                    djConfig[_38]=_37[_38];
                }
            }
        }
        return {name_:"(unset)",version_:"(unset)",getName:function(){
            return this.name_;
        },getVersion:function(){
            return this.version_;
        },getText:function(uri){
            dojo.unimplemented("getText","uri="+uri);
        }};
    })();
    dojo.hostenv.getBaseScriptUri=function(){
        if(djConfig.baseScriptUri.length){
            return djConfig.baseScriptUri;
        }
        var uri=new String(djConfig.libraryScriptUri||djConfig.baseRelativePath);
        if(!uri){
            dojo.raise("Nothing returned by getLibraryScriptUri(): "+uri);
        }
        var _3b=uri.lastIndexOf("/");
        djConfig.baseScriptUri=djConfig.baseRelativePath;
        return djConfig.baseScriptUri;
    };
    (function(){
        var _3c={pkgFileName:"__package__",loading_modules_:{},loaded_modules_:{},addedToLoadingCount:[],removedFromLoadingCount:[],inFlightCount:0,modulePrefixes_:{dojo:{name:"dojo",value:"src"}},setModulePrefix:function(_3d,_3e){
            this.modulePrefixes_[_3d]={name:_3d,value:_3e};
        },getModulePrefix:function(_3f){
            var mp=this.modulePrefixes_;
            if((mp[_3f])&&(mp[_3f]["name"])){
                return mp[_3f].value;
            }
            return _3f;
        },getTextStack:[],loadUriStack:[],loadedUris:[],post_load_:false,modulesLoadedListeners:[],unloadListeners:[],loadNotifying:false};
        for(var _41 in _3c){
            dojo.hostenv[_41]=_3c[_41];
        }
    })();
    dojo.hostenv.loadPath=function(_42,_43,cb){
        var uri;
        if((_42.charAt(0)=="/")||(_42.match(/^\w+:/))){
            uri=_42;
        }else{
            uri=this.getBaseScriptUri()+_42;
        }
        if(djConfig.cacheBust&&dojo.render.html.capable){
            uri+="?"+String(djConfig.cacheBust).replace(/\W+/g,"");
        }
        try{
            return ((!_43)?this.loadUri(uri,cb):this.loadUriAndCheck(uri,_43,cb));
        }
        catch(e){
            dojo.debug(e);
            return false;
        }
    };
    dojo.hostenv.loadUri=function(uri,cb){
        if(this.loadedUris[uri]){
            return 1;
        }
        var _48=this.getText(uri,null,true);
        if(_48==null){
            return 0;
        }
        this.loadedUris[uri]=true;
        if(cb){
            _48="("+_48+")";
        }
        var _49=dj_eval(_48);
        if(cb){
            cb(_49);
        }
        return 1;
    };
    dojo.hostenv.loadUriAndCheck=function(uri,_4b,cb){
        var ok=true;
        try{
            ok=this.loadUri(uri,cb);
        }
        catch(e){
            dojo.debug("failed loading ",uri," with error: ",e);
        }
        return ((ok)&&(this.findModule(_4b,false)))?true:false;
    };
    dojo.loaded=function(){
    };
    dojo.unloaded=function(){
    };
    dojo.hostenv.loaded=function(){
        this.loadNotifying=true;
        this.post_load_=true;
        var mll=this.modulesLoadedListeners;
        for(var x=0;x<mll.length;x++){
            mll[x]();
        }
        this.modulesLoadedListeners=[];
        this.loadNotifying=false;
        dojo.loaded();
    };
    dojo.hostenv.unloaded=function(){
        var mll=this.unloadListeners;
        while(mll.length){
            (mll.pop())();
        }
        dojo.unloaded();
    };
    dojo.addOnLoad=function(obj,_52){
        var dh=dojo.hostenv;
        if(arguments.length==1){
            dh.modulesLoadedListeners.push(obj);
        }else{
            if(arguments.length>1){
                dh.modulesLoadedListeners.push(function(){
                    obj[_52]();
                });
            }
        }
        if(dh.post_load_&&dh.inFlightCount==0&&!dh.loadNotifying){
            dh.callLoaded();
        }
    };
    dojo.addOnUnload=function(obj,_55){
        var dh=dojo.hostenv;
        if(arguments.length==1){
            dh.unloadListeners.push(obj);
        }else{
            if(arguments.length>1){
                dh.unloadListeners.push(function(){
                    obj[_55]();
                });
            }
        }
    };
    dojo.hostenv.modulesLoaded=function(){
        if(this.post_load_){
            return;
        }
        if((this.loadUriStack.length==0)&&(this.getTextStack.length==0)){
            if(this.inFlightCount>0){
                dojo.debug("files still in flight!");
                return;
            }
            dojo.hostenv.callLoaded();
        }
    };
    dojo.hostenv.callLoaded=function(){
        if(typeof setTimeout=="object"){
            setTimeout("dojo.hostenv.loaded();",0);
        }else{
            dojo.hostenv.loaded();
        }
    };
    dojo.hostenv.getModuleSymbols=function(_57){
        var _58=_57.split(".");
        for(var i=_58.length-1;i>0;i--){
            var _5a=_58.slice(0,i).join(".");
            var _5b=this.getModulePrefix(_5a);
            if(_5b!=_5a){
                _58.splice(0,i,_5b);
                break;
            }
        }
        return _58;
    };
    dojo._namespaces={};
    (function(){
        var _5c={};
        var _5d={};
        dojo.getNamespace=function(_5e){
            if(!dojo._namespaces[_5e]&&!_5d[_5e]){
                var req=dojo.require;
                var _60="dojo.namespaces."+_5e;
                if(!_5c[_60]){
                    _5c[_60]=true;
                    req(_60,false,true);
                    _5c[_60]=false;
                    if(!dojo._namespaces[_5e]){
                        _5d[_5e]=true;
                    }
                }
            }
            return dojo._namespaces[_5e];
        };
    })();
    dojo.hostenv._global_omit_module_check=false;
    dojo.hostenv.loadModule=function(_61,_62,_63){
        if(!_61){
            return;
        }
        _63=this._global_omit_module_check||_63;
        var _64=this.findModule(_61,false);
        if(_64){
            return _64;
        }
        if(dj_undef(_61,this.loading_modules_)){
            this.addedToLoadingCount.push(_61);
        }
        this.loading_modules_[_61]=1;
        var _65=_61.replace(/\./g,"/")+".js";
        var _66=_61.split(".");
        if(djConfig.autoLoadNamespace){
            dojo.getNamespace(_66[0]);
        }
        var _67=this.getModuleSymbols(_61);
        var _68=((_67[0].charAt(0)!="/")&&(!_67[0].match(/^\w+:/)));
        var _69=_67[_67.length-1];
        if(_69=="*"){
            _61=(_66.slice(0,-1)).join(".");
            while(_67.length){
                _67.pop();
                _67.push(this.pkgFileName);
                _65=_67.join("/")+".js";
                if(_68&&(_65.charAt(0)=="/")){
                    _65=_65.slice(1);
                }
                ok=this.loadPath(_65,((!_63)?_61:null));
                if(ok){
                    break;
                }
                _67.pop();
            }
        }else{
            _65=_67.join("/")+".js";
            _61=_66.join(".");
            var ok=this.loadPath(_65,((!_63)?_61:null));
            if((!ok)&&(!_62)){
                _67.pop();
                while(_67.length){
                    _65=_67.join("/")+".js";
                    ok=this.loadPath(_65,((!_63)?_61:null));
                    if(ok){
                        break;
                    }
                    _67.pop();
                    _65=_67.join("/")+"/"+this.pkgFileName+".js";
                    if(_68&&(_65.charAt(0)=="/")){
                        _65=_65.slice(1);
                    }
                    ok=this.loadPath(_65,((!_63)?_61:null));
                    if(ok){
                        break;
                    }
                }
            }
            if((!ok)&&(!_63)){
                dojo.raise("Could not load '"+_61+"'; last tried '"+_65+"'");
            }
        }
        if(!_63&&!this["isXDomain"]){
            _64=this.findModule(_61,false);
            if(!_64){
                dojo.raise("symbol '"+_61+"' is not defined after loading '"+_65+"'");
            }
        }
        return _64;
    };
    dojo.hostenv.startPackage=function(_6b){
        var _6c=(new String(_6b)).toString();
        var _6d=_6c;
        var _6e=_6b.split(/\./);
        if(_6e[_6e.length-1]=="*"){
            _6e.pop();
            _6d=_6e.join(".");
        }
        var _6f=dojo.evalObjPath(_6d.toString(),true);
        this.loaded_modules_[_6c]=_6f;
        this.loaded_modules_[_6d]=_6f;
        return _6f;
    };
    dojo.hostenv.findModule=function(_70,_71){
        var lmn=new String(_70).toString();
        if(this.loaded_modules_[lmn]){
            return this.loaded_modules_[lmn];
        }
        if(_71){
            dojo.raise("no loaded module named '"+_70+"'");
        }
        return null;
    };
    dojo.kwCompoundRequire=function(_73){
        var _74=_73["common"]||[];
        var _75=(_73[dojo.hostenv.name_])?_74.concat(_73[dojo.hostenv.name_]||[]):_74.concat(_73["default"]||[]);
        for(var x=0;x<_75.length;x++){
            var _77=_75[x];
            if(_77.constructor==Array){
                dojo.hostenv.loadModule.apply(dojo.hostenv,_77);
            }else{
                dojo.hostenv.loadModule(_77);
            }
        }
    };
    dojo.require=function(){
        dojo.hostenv.loadModule.apply(dojo.hostenv,arguments);
    };
    dojo.requireIf=function(){
        if((arguments[0]===true)||(arguments[0]=="common")||(arguments[0]&&dojo.render[arguments[0]].capable)){
            var _78=[];
            for(var i=1;i<arguments.length;i++){
                _78.push(arguments[i]);
            }
            dojo.require.apply(dojo,_78);
        }
    };
    dojo.requireAfterIf=dojo.requireIf;
    dojo.provide=function(){
        return dojo.hostenv.startPackage.apply(dojo.hostenv,arguments);
    };
    dojo.setModulePrefix=function(_7a,_7b){
        return dojo.hostenv.setModulePrefix(_7a,_7b);
    };
    dojo.exists=function(obj,_7d){
        var p=_7d.split(".");
        for(var i=0;i<p.length;i++){
            if(!(obj[p[i]])){
                return false;
            }
            obj=obj[p[i]];
        }
        return true;
    };
}
if(typeof window=="undefined"){
    dojo.raise("no window object");
}
(function(){
    if(djConfig.allowQueryConfig){
        var _80=document.location.toString();
        var _81=_80.split("?",2);
        if(_81.length>1){
            var _82=_81[1];
            var _83=_82.split("&");
            for(var x in _83){
                var sp=_83[x].split("=");
                if((sp[0].length>9)&&(sp[0].substr(0,9)=="djConfig.")){
                    var opt=sp[0].substr(9);
                    try{
                        djConfig[opt]=eval(sp[1]);
                    }
                    catch(e){
                        djConfig[opt]=sp[1];
                    }
                }
            }
        }
    }
    if(((djConfig["baseScriptUri"]=="")||(djConfig["baseRelativePath"]==""))&&(document&&document.getElementsByTagName)){
        var _87=document.getElementsByTagName("script");
        var _88=/(__package__|dojo|bootstrap1)\.js([\?\.]|$)/i;
        for(var i=0;i<_87.length;i++){
            var src=_87[i].getAttribute("src");
            if(!src){
                continue;
            }
            var m=src.match(_88);
            if(m){
                var _8c=src.substring(0,m.index);
                if(src.indexOf("bootstrap1")>-1){
                    _8c+="../";
                }
                if(!this["djConfig"]){
                    djConfig={};
                }
                if(djConfig["baseScriptUri"]==""){
                    djConfig["baseScriptUri"]=_8c;
                }
                if(djConfig["baseRelativePath"]==""){
                    djConfig["baseRelativePath"]=_8c;
                }
                break;
            }
        }
    }
    var dr=dojo.render;
    var drh=dojo.render.html;
    var drs=dojo.render.svg;
    var dua=(drh.UA=navigator.userAgent);
    var dav=(drh.AV=navigator.appVersion);
    var t=true;
    var f=false;
    drh.capable=t;
    drh.support.builtin=t;
    dr.ver=parseFloat(drh.AV);
    dr.os.mac=dav.indexOf("Macintosh")>=0;
    dr.os.win=dav.indexOf("Windows")>=0;
    dr.os.linux=dav.indexOf("X11")>=0;
    drh.opera=dua.indexOf("Opera")>=0;
    drh.khtml=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0);
    drh.safari=dav.indexOf("Safari")>=0;
    var _94=dua.indexOf("Gecko");
    drh.mozilla=drh.moz=(_94>=0)&&(!drh.khtml);
    if(drh.mozilla){
        drh.geckoVersion=dua.substring(_94+6,_94+14);
    }
    drh.ie=(document.all)&&(!drh.opera);
    drh.ie50=drh.ie&&dav.indexOf("MSIE 5.0")>=0;
    drh.ie55=drh.ie&&dav.indexOf("MSIE 5.5")>=0;
    drh.ie60=drh.ie&&dav.indexOf("MSIE 6.0")>=0;
    drh.ie70=drh.ie&&dav.indexOf("MSIE 7.0")>=0;
    var cm=document["compatMode"];
    drh.quirks=(cm=="BackCompat")||(cm=="QuirksMode")||drh.ie55||drh.ie50;
    dojo.locale=dojo.locale||(drh.ie?navigator.userLanguage:navigator.language).toLowerCase();
    dr.vml.capable=drh.ie;
    drs.capable=f;
    drs.support.plugin=f;
    drs.support.builtin=f;
    var _96=window["document"];
    var tdi=_96["implementation"];
    if((tdi)&&(tdi["hasFeature"])&&(tdi.hasFeature("org.w3c.dom.svg","1.0"))){
        drs.capable=t;
        drs.support.builtin=t;
        drs.support.plugin=f;
    }
    if(drh.safari){
        var tmp=dua.split("AppleWebKit/")[1];
        var ver=parseFloat(tmp.split(" ")[0]);
        if(ver>=420){
            drs.capable=t;
            drs.support.builtin=t;
            drs.support.plugin=f;
        }
    }
})();
dojo.hostenv.startPackage("dojo.hostenv");
dojo.render.name=dojo.hostenv.name_="browser";
dojo.hostenv.searchIds=[];
dojo.hostenv._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
dojo.hostenv.getXmlhttpObject=function(){
    var _9a=null;
    var _9b=null;
    try{
        _9a=new XMLHttpRequest();
    }
    catch(e){
    }
    if(!_9a){
        for(var i=0;i<3;++i){
            var _9d=dojo.hostenv._XMLHTTP_PROGIDS[i];
            try{
                _9a=new ActiveXObject(_9d);
            }
            catch(e){
                _9b=e;
            }
            if(_9a){
                dojo.hostenv._XMLHTTP_PROGIDS=[_9d];
                break;
            }
        }
    }
    if(!_9a){
        return dojo.raise("XMLHTTP not available",_9b);
    }
    return _9a;
};
dojo.hostenv._blockAsync=false;
dojo.hostenv.getText=function(uri,_9f,_a0){
    if(!_9f){
        this._blockAsync=true;
    }
    var _a1=this.getXmlhttpObject();
    function isDocumentOk(_a2){
        var _a3=_a2["status"];
        return Boolean((!_a3)||((200<=_a3)&&(300>_a3))||(_a3==304));
    }
    if(_9f){
        var _a4=this,timer=null,gbl=dojo.global();
        var xhr=dojo.evalObjPath("dojo.io.XMLHTTPTransport");
        _a1.onreadystatechange=function(){
            if(timer){
                gbl.clearTimeout(timer);
                timer=null;
            }
            if(_a4._blockAsync||(xhr&&xhr._blockAsync)){
                timer=gbl.setTimeout(function(){
                    _a1.onreadystatechange.apply(this);
                },10);
            }else{
                if(4==_a1.readyState){
                    if(isDocumentOk(_a1)){
                        _9f(_a1.responseText);
                    }
                }
            }
        };
    }
    _a1.open("GET",uri,_9f?true:false);
    try{
        _a1.send(null);
        if(_9f){
            return null;
        }
        if(!isDocumentOk(_a1)){
            var err=Error("Unable to load "+uri+" status:"+_a1.status);
            err.status=_a1.status;
            err.responseText=_a1.responseText;
            throw err;
        }
    }
    catch(e){
        this._blockAsync=false;
        if((_a0)&&(!_9f)){
            return null;
        }else{
            throw e;
        }
    }
    this._blockAsync=false;
    return _a1.responseText;
};
dojo.hostenv.defaultDebugContainerId="dojoDebug";
dojo.hostenv._println_buffer=[];
dojo.hostenv._println_safe=false;
dojo.hostenv.println=function(_a7){
    if(!dojo.hostenv._println_safe){
        dojo.hostenv._println_buffer.push(_a7);
    }else{
        try{
            var _a8=document.getElementById(djConfig.debugContainerId?djConfig.debugContainerId:dojo.hostenv.defaultDebugContainerId);
            if(!_a8){
                _a8=dojo.body();
            }
            var div=document.createElement("div");
            div.appendChild(document.createTextNode(_a7));
            _a8.appendChild(div);
        }
        catch(e){
            try{
                document.write("<div>"+_a7+"</div>");
            }
            catch(e2){
                window.status=_a7;
            }
        }
    }
};
dojo.addOnLoad(function(){
    dojo.hostenv._println_safe=true;
    while(dojo.hostenv._println_buffer.length>0){
        dojo.hostenv.println(dojo.hostenv._println_buffer.shift());
    }
});
function dj_addNodeEvtHdlr(_aa,_ab,fp,_ad){
    var _ae=_aa["on"+_ab]||function(){
    };
    _aa["on"+_ab]=function(){
        fp.apply(_aa,arguments);
        _ae.apply(_aa,arguments);
    };
    return true;
}
dj_addNodeEvtHdlr(window,"load",function(){
    if(arguments.callee.initialized){
        return;
    }
    arguments.callee.initialized=true;
    var _af=function(){
        if(dojo.render.html.ie){
            dojo.hostenv.makeWidgets();
        }
    };
    if(dojo.hostenv.inFlightCount==0){
        _af();
        dojo.hostenv.modulesLoaded();
    }else{
        dojo.addOnLoad(_af);
    }
});
dj_addNodeEvtHdlr(window,"unload",function(){
    dojo.hostenv.unloaded();
});
dojo.hostenv.makeWidgets=function(){
    var _b0=[];
    if(djConfig.searchIds&&djConfig.searchIds.length>0){
        _b0=_b0.concat(djConfig.searchIds);
    }
    if(dojo.hostenv.searchIds&&dojo.hostenv.searchIds.length>0){
        _b0=_b0.concat(dojo.hostenv.searchIds);
    }
    if((djConfig.parseWidgets)||(_b0.length>0)){
        if(dojo.evalObjPath("dojo.widget.Parse")){
            var _b1=new dojo.xml.Parse();
            if(_b0.length>0){
                for(var x=0;x<_b0.length;x++){
                    var _b3=document.getElementById(_b0[x]);
                    if(!_b3){
                        continue;
                    }
                    var _b4=_b1.parseElement(_b3,null,true);
                    dojo.widget.getParser().createComponents(_b4);
                }
            }else{
                if(djConfig.parseWidgets){
                    var _b4=_b1.parseElement(dojo.body(),null,true);
                    dojo.widget.getParser().createComponents(_b4);
                }
            }
        }
    }
};
dojo.addOnLoad(function(){
    if(!dojo.render.html.ie){
        dojo.hostenv.makeWidgets();
    }
});
try{
    if(dojo.render.html.ie){
        document.namespaces.add("v","urn:schemas-microsoft-com:vml");
        document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML)");
    }
}
catch(e){
}
dojo.hostenv.writeIncludes=function(){
};
dojo.byId=function(id,doc){
    if(id&&(typeof id=="string"||id instanceof String)){
        if(!doc){
            doc=dojo.doc();
        }
        return doc.getElementById(id);
    }
    return id;
};
(function(){
    if(typeof dj_usingBootstrap!="undefined"){
        return;
    }
    var _b7=false;
    var _b8=false;
    var _b9=false;
    if((typeof this["load"]=="function")&&((typeof this["Packages"]=="function")||(typeof this["Packages"]=="object"))){
        _b7=true;
    }else{
        if(typeof this["load"]=="function"){
            _b8=true;
        }else{
            if(window.widget){
                _b9=true;
            }
        }
    }
    var _ba=[];
    if((this["djConfig"])&&((djConfig["isDebug"])||(djConfig["debugAtAllCosts"]))){
        _ba.push("debug.js");
    }
    if((this["djConfig"])&&(djConfig["debugAtAllCosts"])&&(!_b7)&&(!_b9)){
        _ba.push("browser_debug.js");
    }
    if((this["djConfig"])&&(djConfig["compat"])){
        _ba.push("compat/"+djConfig["compat"]+".js");
    }
    var _bb=djConfig["baseScriptUri"];
    if((this["djConfig"])&&(djConfig["baseLoaderUri"])){
        _bb=djConfig["baseLoaderUri"];
    }
    for(var x=0;x<_ba.length;x++){
        var _bd=_bb+"src/"+_ba[x];
        if(_b7||_b8){
            load(_bd);
        }else{
            try{
                document.write("<scr"+"ipt type='text/javascript' src='"+_bd+"'></scr"+"ipt>");
            }
            catch(e){
                var _be=document.createElement("script");
                _be.src=_bd;
                document.getElementsByTagName("head")[0].appendChild(_be);
            }
        }
    }
})();
dojo.normalizeLocale=function(_bf){
    return _bf?_bf.toLowerCase():dojo.locale;
};
dojo.searchLocalePath=function(_c0,_c1,_c2){
    _c0=dojo.normalizeLocale(_c0);
    var _c3=_c0.split("-");
    var _c4=[];
    for(var i=_c3.length;i>0;i--){
        _c4.push(_c3.slice(0,i).join("-"));
    }
    _c4.push(false);
    if(_c1){
        _c4.reverse();
    }
    for(var j=_c4.length-1;j>=0;j--){
        var loc=_c4[j]||"ROOT";
        var _c8=_c2(loc);
        if(_c8){
            break;
        }
    }
};
dojo.requireLocalization=function(_c9,_ca,_cb){
    var _cc=[_c9,"_nls",_ca].join(".");
    var _cd=dojo.hostenv.startPackage(_cc);
    dojo.hostenv.loaded_modules_[_cc]=_cd;
    if(!dj_undef("dj_localesBuilt",dj_global)&&dojo.hostenv.loaded_modules_[_cc]){
        _cb=dojo.normalizeLocale(_cb);
        for(var i=0;i<dj_localesBuilt.length;i++){
            if(dj_localesBuilt[i]==_cb){
                return;
            }
        }
    }
    var _cf=dojo.hostenv.getModuleSymbols(_c9);
    var _d0=_cf.concat("nls").join("/");
    var _d1=false;
    dojo.searchLocalePath(_cb,false,function(loc){
        var pkg=_cc+"."+loc;
        var _d4=false;
        if(!dojo.hostenv.findModule(pkg)){
            dojo.hostenv.loaded_modules_[pkg]=null;
            var _d5=[_d0];
            if(loc!="ROOT"){
                _d5.push(loc);
            }
            _d5.push(_ca);
            var _d6=_d5.join("/")+".js";
            _d4=dojo.hostenv.loadPath(_d6,null,function(_d7){
                var _d8=function(){
                };
                _d8.prototype=_d1;
                _cd[loc]=new _d8();
                for(var j in _d7){
                    _cd[loc][j]=_d7[j];
                }
            });
        }else{
            _d4=true;
        }
        if(_d4&&_cd[loc]){
            _d1=_cd[loc];
        }
    });
};
(function(){
    function preload(_da){
        if(!dj_undef("dj_localesGenerated",dj_global)){
            dojo.setModulePrefix("nls","nls");
            _da=dojo.normalizeLocale(_da);
            dojo.searchLocalePath(_da,true,function(loc){
                for(var i=0;i<dj_localesGenerated.length;i++){
                    if(dj_localesGenerated[i]==loc){
                        dojo.require("nls.dojo_"+loc);
                        return true;
                    }
                }
                return false;
            });
        }
    }
    preload(dojo.locale);
    var _dd=djConfig.extraLocale;
    if(_dd){
        if(!(_dd instanceof Array)){
            _dd=[_dd];
        }
        for(var i=0;i<_dd.length;i++){
            preload(_dd[i]);
        }
        var req=dojo.requireLocalization;
        dojo.requireLocalization=function(m,b,_e2){
            req(m,b,_e2);
            if(_e2){
                return;
            }
            for(var i=0;i<_dd.length;i++){
                req(m,b,_dd[i]);
            }
        };
    }
})();
dojo.provide("dojo.string.common");
dojo.string.trim=function(str,wh){
    if(!str.replace){
        return str;
    }
    if(!str.length){
        return str;
    }
    var re=(wh>0)?(/^\s+/):(wh<0)?(/\s+$/):(/^\s+|\s+$/g);
    return str.replace(re,"");
};
dojo.string.trimStart=function(str){
    return dojo.string.trim(str,1);
};
dojo.string.trimEnd=function(str){
    return dojo.string.trim(str,-1);
};
dojo.string.repeat=function(str,_ea,_eb){
    var out="";
    for(var i=0;i<_ea;i++){
        out+=str;
        if(_eb&&i<_ea-1){
            out+=_eb;
        }
    }
    return out;
};
dojo.string.pad=function(str,len,c,dir){
    var out=String(str);
    if(!c){
        c="0";
    }
    if(!dir){
        dir=1;
    }
    while(out.length<len){
        if(dir>0){
            out=c+out;
        }else{
            out+=c;
        }
    }
    return out;
};
dojo.string.padLeft=function(str,len,c){
    return dojo.string.pad(str,len,c,1);
};
dojo.string.padRight=function(str,len,c){
    return dojo.string.pad(str,len,c,-1);
};
dojo.provide("dojo.string");
dojo.provide("dojo.lang");
dojo.deprecated("dojo.lang","replaced by dojo.lang.common","0.5");
dojo.provide("dojo.lang.common");
dojo.lang._mixin=dojo._mixin;
dojo.lang.mixin=dojo.mixin;
dojo.lang.extend=dojo.extend;
dojo.lang.find=function(_f9,_fa,_fb,_fc){
    if(!dojo.lang.isArrayLike(_f9)&&dojo.lang.isArrayLike(_fa)){
        dojo.deprecated("dojo.lang.find(value, array)","use dojo.lang.find(array, value) instead","0.5");
        var _fd=_f9;
        _f9=_fa;
        _fa=_fd;
    }
    var _fe=dojo.lang.isString(_f9);
    if(_fe){
        _f9=_f9.split("");
    }
    if(_fc){
        var _ff=-1;
        var i=_f9.length-1;
        var end=-1;
    }else{
        var _ff=1;
        var i=0;
        var end=_f9.length;
    }
    if(_fb){
        while(i!=end){
            if(_f9[i]===_fa){
                return i;
            }
            i+=_ff;
        }
    }else{
        while(i!=end){
            if(_f9[i]==_fa){
                return i;
            }
            i+=_ff;
        }
    }
    return -1;
};
dojo.lang.indexOf=dojo.lang.find;
dojo.lang.findLast=function(_102,_103,_104){
    return dojo.lang.find(_102,_103,_104,true);
};
dojo.lang.lastIndexOf=dojo.lang.findLast;
dojo.lang.inArray=function(_105,_106){
    return dojo.lang.find(_105,_106)>-1;
};
dojo.lang.isObject=function(it){
    if(typeof it=="undefined"){
        return false;
    }
    return (typeof it=="object"||it===null||dojo.lang.isArray(it)||dojo.lang.isFunction(it));
};
dojo.lang.isArray=function(it){
    return (it instanceof Array||typeof it=="array");
};
dojo.lang.isArrayLike=function(it){
    if((!it)||(dojo.lang.isUndefined(it))){
        return false;
    }
    if(dojo.lang.isString(it)){
        return false;
    }
    if(dojo.lang.isFunction(it)){
        return false;
    }
    if(dojo.lang.isArray(it)){
        return true;
    }
    if((it.tagName)&&(it.tagName.toLowerCase()=="form")){
        return false;
    }
    if(dojo.lang.isNumber(it.length)&&isFinite(it.length)){
        return true;
    }
    return false;
};
dojo.lang.isFunction=function(it){
    if(!it){
        return false;
    }
    return (it instanceof Function||typeof it=="function");
};
dojo.lang.isString=function(it){
    return (it instanceof String||typeof it=="string");
};
dojo.lang.isAlien=function(it){
    if(!it){
        return false;
    }
    return !dojo.lang.isFunction()&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.lang.isBoolean=function(it){
    return (it instanceof Boolean||typeof it=="boolean");
};
dojo.lang.isNumber=function(it){
    return (it instanceof Number||typeof it=="number");
};
dojo.lang.isUndefined=function(it){
    return ((it==undefined)&&(typeof it=="undefined"));
};
dojo.provide("dojo.lang.array");
dojo.lang.has=function(obj,name){
    try{
        return (typeof obj[name]!="undefined");
    }
    catch(e){
        return false;
    }
};
dojo.lang.isEmpty=function(obj){
    if(dojo.lang.isObject(obj)){
        var tmp={};
        var _114=0;
        for(var x in obj){
            if(obj[x]&&(!tmp[x])){
                _114++;
                break;
            }
        }
        return (_114==0);
    }else{
        if(dojo.lang.isArrayLike(obj)||dojo.lang.isString(obj)){
            return obj.length==0;
        }
    }
};
dojo.lang.map=function(arr,obj,_118){
    var _119=dojo.lang.isString(arr);
    if(_119){
        arr=arr.split("");
    }
    if(dojo.lang.isFunction(obj)&&(!_118)){
        _118=obj;
        obj=dj_global;
    }else{
        if(dojo.lang.isFunction(obj)&&_118){
            var _11a=obj;
            obj=_118;
            _118=_11a;
        }
    }
    if(Array.map){
        var _11b=Array.map(arr,_118,obj);
    }else{
        var _11b=[];
        for(var i=0;i<arr.length;++i){
            _11b.push(_118.call(obj,arr[i]));
        }
    }
    if(_119){
        return _11b.join("");
    }else{
        return _11b;
    }
};
dojo.lang.reduce=function(arr,_11e,obj,_120){
    var _121=_11e;
    var ob=obj?obj:dj_global;
    dojo.lang.map(arr,function(val){
        _121=_120.call(ob,_121,val);
    });
    return _121;
};
dojo.lang.forEach=function(_124,_125,_126){
    if(dojo.lang.isString(_124)){
        _124=_124.split("");
    }
    if(Array.forEach){
        Array.forEach(_124,_125,_126);
    }else{
        if(!_126){
            _126=dj_global;
        }
        for(var i=0,l=_124.length;i<l;i++){
            _125.call(_126,_124[i],i,_124);
        }
    }
};
dojo.lang._everyOrSome=function(_128,arr,_12a,_12b){
    if(dojo.lang.isString(arr)){
        arr=arr.split("");
    }
    if(Array.every){
        return Array[(_128)?"every":"some"](arr,_12a,_12b);
    }else{
        if(!_12b){
            _12b=dj_global;
        }
        for(var i=0,l=arr.length;i<l;i++){
            var _12d=_12a.call(_12b,arr[i],i,arr);
            if((_128)&&(!_12d)){
                return false;
            }else{
                if((!_128)&&(_12d)){
                    return true;
                }
            }
        }
        return (_128)?true:false;
    }
};
dojo.lang.every=function(arr,_12f,_130){
    return this._everyOrSome(true,arr,_12f,_130);
};
dojo.lang.some=function(arr,_132,_133){
    return this._everyOrSome(false,arr,_132,_133);
};
dojo.lang.filter=function(arr,_135,_136){
    var _137=dojo.lang.isString(arr);
    if(_137){
        arr=arr.split("");
    }
    if(Array.filter){
        var _138=Array.filter(arr,_135,_136);
    }else{
        if(!_136){
            if(arguments.length>=3){
                dojo.raise("thisObject doesn't exist!");
            }
            _136=dj_global;
        }
        var _138=[];
        for(var i=0;i<arr.length;i++){
            if(_135.call(_136,arr[i],i,arr)){
                _138.push(arr[i]);
            }
        }
    }
    if(_137){
        return _138.join("");
    }else{
        return _138;
    }
};
dojo.lang.unnest=function(){
    var out=[];
    for(var i=0;i<arguments.length;i++){
        if(dojo.lang.isArrayLike(arguments[i])){
            var add=dojo.lang.unnest.apply(this,arguments[i]);
            out=out.concat(add);
        }else{
            out.push(arguments[i]);
        }
    }
    return out;
};
dojo.lang.toArray=function(_13d,_13e){
    var _13f=[];
    for(var i=_13e||0;i<_13d.length;i++){
        _13f.push(_13d[i]);
    }
    return _13f;
};
dojo.provide("dojo.graphics.color");
dojo.graphics.color.Color=function(r,g,b,a){
    if(dojo.lang.isArray(r)){
        this.r=r[0];
        this.g=r[1];
        this.b=r[2];
        this.a=r[3]||1;
    }else{
        if(dojo.lang.isString(r)){
            var rgb=dojo.graphics.color.extractRGB(r);
            this.r=rgb[0];
            this.g=rgb[1];
            this.b=rgb[2];
            this.a=g||1;
        }else{
            if(r instanceof dojo.graphics.color.Color){
                this.r=r.r;
                this.b=r.b;
                this.g=r.g;
                this.a=r.a;
            }else{
                this.r=r;
                this.g=g;
                this.b=b;
                this.a=a;
            }
        }
    }
};
dojo.graphics.color.Color.fromArray=function(arr){
    return new dojo.graphics.color.Color(arr[0],arr[1],arr[2],arr[3]);
};
dojo.lang.extend(dojo.graphics.color.Color,{toRgb:function(_147){
    if(_147){
        return this.toRgba();
    }else{
        return [this.r,this.g,this.b];
    }
},toRgba:function(){
    return [this.r,this.g,this.b,this.a];
},toHex:function(){
    return dojo.graphics.color.rgb2hex(this.toRgb());
},toCss:function(){
    return "rgb("+this.toRgb().join()+")";
},toString:function(){
    return this.toHex();
},blend:function(_148,_149){
    return dojo.graphics.color.blend(this.toRgb(),new dojo.graphics.color.Color(_148).toRgb(),_149);
}});
dojo.graphics.color.named={white:[255,255,255],black:[0,0,0],red:[255,0,0],green:[0,255,0],blue:[0,0,255],navy:[0,0,128],gray:[128,128,128],silver:[192,192,192]};
dojo.graphics.color.blend=function(a,b,_14c){
    if(typeof a=="string"){
        return dojo.graphics.color.blendHex(a,b,_14c);
    }
    if(!_14c){
        _14c=0;
    }else{
        if(_14c>1){
            _14c=1;
        }else{
            if(_14c<-1){
                _14c=-1;
            }
        }
    }
    var c=new Array(3);
    for(var i=0;i<3;i++){
        var half=Math.abs(a[i]-b[i])/2;
        c[i]=Math.floor(Math.min(a[i],b[i])+half+(half*_14c));
    }
    return c;
};
dojo.graphics.color.blendHex=function(a,b,_152){
    return dojo.graphics.color.rgb2hex(dojo.graphics.color.blend(dojo.graphics.color.hex2rgb(a),dojo.graphics.color.hex2rgb(b),_152));
};
dojo.graphics.color.extractRGB=function(_153){
    var hex="0123456789abcdef";
    _153=_153.toLowerCase();
    if(_153.indexOf("rgb")==0){
        var _155=_153.match(/rgba*\((\d+), *(\d+), *(\d+)/i);
        var ret=_155.splice(1,3);
        return ret;
    }else{
        var _157=dojo.graphics.color.hex2rgb(_153);
        if(_157){
            return _157;
        }else{
            return dojo.graphics.color.named[_153]||[255,255,255];
        }
    }
};
dojo.graphics.color.hex2rgb=function(hex){
    var _159="0123456789ABCDEF";
    var rgb=new Array(3);
    if(hex.indexOf("#")==0){
        hex=hex.substring(1);
    }
    hex=hex.toUpperCase();
    if(hex.replace(new RegExp("["+_159+"]","g"),"")!=""){
        return null;
    }
    if(hex.length==3){
        rgb[0]=hex.charAt(0)+hex.charAt(0);
        rgb[1]=hex.charAt(1)+hex.charAt(1);
        rgb[2]=hex.charAt(2)+hex.charAt(2);
    }else{
        rgb[0]=hex.substring(0,2);
        rgb[1]=hex.substring(2,4);
        rgb[2]=hex.substring(4);
    }
    for(var i=0;i<rgb.length;i++){
        rgb[i]=_159.indexOf(rgb[i].charAt(0))*16+_159.indexOf(rgb[i].charAt(1));
    }
    return rgb;
};
dojo.graphics.color.rgb2hex=function(r,g,b){
    if(dojo.lang.isArray(r)){
        g=r[1]||0;
        b=r[2]||0;
        r=r[0]||0;
    }
    var ret=dojo.lang.map([r,g,b],function(x){
        x=new Number(x);
        var s=x.toString(16);
        while(s.length<2){
            s="0"+s;
        }
        return s;
    });
    ret.unshift("#");
    return ret.join("");
};
dojo.provide("dojo.lang.extras");
dojo.lang.setTimeout=function(func,_163){
    var _164=window,argsStart=2;
    if(!dojo.lang.isFunction(func)){
        _164=func;
        func=_163;
        _163=arguments[2];
        argsStart++;
    }
    if(dojo.lang.isString(func)){
        func=_164[func];
    }
    var args=[];
    for(var i=argsStart;i<arguments.length;i++){
        args.push(arguments[i]);
    }
    return dojo.global().setTimeout(function(){
        func.apply(_164,args);
    },_163);
};
dojo.lang.clearTimeout=function(_167){
    dojo.global().clearTimeout(_167);
};
dojo.lang.getNameInObj=function(ns,item){
    if(!ns){
        ns=dj_global;
    }
    for(var x in ns){
        if(ns[x]===item){
            return new String(x);
        }
    }
    return null;
};
dojo.lang.shallowCopy=function(obj,deep){
    var i,ret;
    if(obj===null){
        return null;
    }
    if(dojo.lang.isObject(obj)){
        ret=new obj.constructor();
        for(i in obj){
            if(dojo.lang.isUndefined(ret[i])){
                ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
            }
        }
    }else{
        if(dojo.lang.isArray(obj)){
            ret=[];
            for(i=0;i<obj.length;i++){
                ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
            }
        }else{
            ret=obj;
        }
    }
    return ret;
};
dojo.lang.firstValued=function(){
    for(var i=0;i<arguments.length;i++){
        if(typeof arguments[i]!="undefined"){
            return arguments[i];
        }
    }
    return undefined;
};
dojo.lang.getObjPathValue=function(_16f,_170,_171){
    with(dojo.parseObjPath(_16f,_170,_171)){
        return dojo.evalProp(prop,obj,_171);
    }
};
dojo.lang.setObjPathValue=function(_172,_173,_174,_175){
    if(arguments.length<4){
        _175=true;
    }
    with(dojo.parseObjPath(_172,_174,_175)){
        if(obj&&(_175||(prop in obj))){
            obj[prop]=_173;
        }
    }
};
dojo.provide("dojo.lang.func");
dojo.lang.hitch=function(_176,_177){
    var fcn=(dojo.lang.isString(_177)?_176[_177]:_177)||function(){
    };
    return function(){
        return fcn.apply(_176,arguments);
    };
};
dojo.lang.anonCtr=0;
dojo.lang.anon={};
dojo.lang.nameAnonFunc=function(_179,_17a,_17b){
    var nso=(_17a||dojo.lang.anon);
    if((_17b)||((dj_global["djConfig"])&&(djConfig["slowAnonFuncLookups"]==true))){
        for(var x in nso){
            try{
                if(nso[x]===_179){
                    return x;
                }
            }
            catch(e){
            }
        }
    }
    var ret="__"+dojo.lang.anonCtr++;
    while(typeof nso[ret]!="undefined"){
        ret="__"+dojo.lang.anonCtr++;
    }
    nso[ret]=_179;
    return ret;
};
dojo.lang.forward=function(_17f){
    return function(){
        return this[_17f].apply(this,arguments);
    };
};
dojo.lang.curry=function(ns,func){
    var _182=[];
    ns=ns||dj_global;
    if(dojo.lang.isString(func)){
        func=ns[func];
    }
    for(var x=2;x<arguments.length;x++){
        _182.push(arguments[x]);
    }
    var _184=(func["__preJoinArity"]||func.length)-_182.length;
    function gather(_185,_186,_187){
        var _188=_187;
        var _189=_186.slice(0);
        for(var x=0;x<_185.length;x++){
            _189.push(_185[x]);
        }
        _187=_187-_185.length;
        if(_187<=0){
            var res=func.apply(ns,_189);
            _187=_188;
            return res;
        }else{
            return function(){
                return gather(arguments,_189,_187);
            };
        }
    }
    return gather([],_182,_184);
};
dojo.lang.curryArguments=function(ns,func,args,_18f){
    var _190=[];
    var x=_18f||0;
    for(x=_18f;x<args.length;x++){
        _190.push(args[x]);
    }
    return dojo.lang.curry.apply(dojo.lang,[ns,func].concat(_190));
};
dojo.lang.tryThese=function(){
    for(var x=0;x<arguments.length;x++){
        try{
            if(typeof arguments[x]=="function"){
                var ret=(arguments[x]());
                if(ret){
                    return ret;
                }
            }
        }
        catch(e){
            dojo.debug(e);
        }
    }
};
dojo.lang.delayThese=function(farr,cb,_196,_197){
    if(!farr.length){
        if(typeof _197=="function"){
            _197();
        }
        return;
    }
    if((typeof _196=="undefined")&&(typeof cb=="number")){
        _196=cb;
        cb=function(){
        };
    }else{
        if(!cb){
            cb=function(){
            };
            if(!_196){
                _196=0;
            }
        }
    }
    setTimeout(function(){
        (farr.shift())();
        cb();
        dojo.lang.delayThese(farr,cb,_196,_197);
    },_196);
};
dojo.provide("dojo.event");
dojo.event=new function(){
    this.canTimeout=dojo.lang.isFunction(dj_global["setTimeout"])||dojo.lang.isAlien(dj_global["setTimeout"]);
    function interpolateArgs(args,_199){
        var dl=dojo.lang;
        var ao={srcObj:dj_global,srcFunc:null,adviceObj:dj_global,adviceFunc:null,aroundObj:null,aroundFunc:null,adviceType:(args.length>2)?args[0]:"after",precedence:"last",once:false,delay:null,rate:0,adviceMsg:false};
        switch(args.length){
            case 0:
                return;
            case 1:
                return;
            case 2:
                ao.srcFunc=args[0];
                ao.adviceFunc=args[1];
                break;
            case 3:
                if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isString(args[2]))){
                    ao.adviceType="after";
                    ao.srcObj=args[0];
                    ao.srcFunc=args[1];
                    ao.adviceFunc=args[2];
                }else{
                    if((dl.isString(args[1]))&&(dl.isString(args[2]))){
                        ao.srcFunc=args[1];
                        ao.adviceFunc=args[2];
                    }else{
                        if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isFunction(args[2]))){
                            ao.adviceType="after";
                            ao.srcObj=args[0];
                            ao.srcFunc=args[1];
                            var _19c=dl.nameAnonFunc(args[2],ao.adviceObj,_199);
                            ao.adviceFunc=_19c;
                        }else{
                            if((dl.isFunction(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))){
                                ao.adviceType="after";
                                ao.srcObj=dj_global;
                                var _19c=dl.nameAnonFunc(args[0],ao.srcObj,_199);
                                ao.srcFunc=_19c;
                                ao.adviceObj=args[1];
                                ao.adviceFunc=args[2];
                            }
                        }
                    }
                }
                break;
            case 4:
                if((dl.isObject(args[0]))&&(dl.isObject(args[2]))){
                    ao.adviceType="after";
                    ao.srcObj=args[0];
                    ao.srcFunc=args[1];
                    ao.adviceObj=args[2];
                    ao.adviceFunc=args[3];
                }else{
                    if((dl.isString(args[0]))&&(dl.isString(args[1]))&&(dl.isObject(args[2]))){
                        ao.adviceType=args[0];
                        ao.srcObj=dj_global;
                        ao.srcFunc=args[1];
                        ao.adviceObj=args[2];
                        ao.adviceFunc=args[3];
                    }else{
                        if((dl.isString(args[0]))&&(dl.isFunction(args[1]))&&(dl.isObject(args[2]))){
                            ao.adviceType=args[0];
                            ao.srcObj=dj_global;
                            var _19c=dl.nameAnonFunc(args[1],dj_global,_199);
                            ao.srcFunc=_19c;
                            ao.adviceObj=args[2];
                            ao.adviceFunc=args[3];
                        }else{
                            if((dl.isString(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))&&(dl.isFunction(args[3]))){
                                ao.srcObj=args[1];
                                ao.srcFunc=args[2];
                                var _19c=dl.nameAnonFunc(args[3],dj_global,_199);
                                ao.adviceObj=dj_global;
                                ao.adviceFunc=_19c;
                            }else{
                                if(dl.isObject(args[1])){
                                    ao.srcObj=args[1];
                                    ao.srcFunc=args[2];
                                    ao.adviceObj=dj_global;
                                    ao.adviceFunc=args[3];
                                }else{
                                    if(dl.isObject(args[2])){
                                        ao.srcObj=dj_global;
                                        ao.srcFunc=args[1];
                                        ao.adviceObj=args[2];
                                        ao.adviceFunc=args[3];
                                    }else{
                                        ao.srcObj=ao.adviceObj=ao.aroundObj=dj_global;
                                        ao.srcFunc=args[1];
                                        ao.adviceFunc=args[2];
                                        ao.aroundFunc=args[3];
                                    }
                                }
                            }
                        }
                    }
                }
                break;
            case 6:
                ao.srcObj=args[1];
                ao.srcFunc=args[2];
                ao.adviceObj=args[3];
                ao.adviceFunc=args[4];
                ao.aroundFunc=args[5];
                ao.aroundObj=dj_global;
                break;
            default:
                ao.srcObj=args[1];
                ao.srcFunc=args[2];
                ao.adviceObj=args[3];
                ao.adviceFunc=args[4];
                ao.aroundObj=args[5];
                ao.aroundFunc=args[6];
                ao.once=args[7];
                ao.delay=args[8];
                ao.rate=args[9];
                ao.adviceMsg=args[10];
                break;
        }
        if(dl.isFunction(ao.aroundFunc)){
            var _19c=dl.nameAnonFunc(ao.aroundFunc,ao.aroundObj,_199);
            ao.aroundFunc=_19c;
        }
        if(dl.isFunction(ao.srcFunc)){
            ao.srcFunc=dl.getNameInObj(ao.srcObj,ao.srcFunc);
        }
        if(dl.isFunction(ao.adviceFunc)){
            ao.adviceFunc=dl.getNameInObj(ao.adviceObj,ao.adviceFunc);
        }
        if((ao.aroundObj)&&(dl.isFunction(ao.aroundFunc))){
            ao.aroundFunc=dl.getNameInObj(ao.aroundObj,ao.aroundFunc);
        }
        if(!ao.srcObj){
            dojo.raise("bad srcObj for srcFunc: "+ao.srcFunc);
        }
        if(!ao.adviceObj){
            dojo.raise("bad adviceObj for adviceFunc: "+ao.adviceFunc);
        }
        if(!ao.adviceFunc){
            dojo.debug("bad adviceFunc for srcFunc: "+ao.srcFunc);
            dojo.debugShallow(ao);
        }
        return ao;
    }
    this.connect=function(){
        if(arguments.length==1){
            var ao=arguments[0];
        }else{
            var ao=interpolateArgs(arguments,true);
        }
        if(dojo.lang.isArray(ao.srcObj)&&ao.srcObj!=""){
            var _19e={};
            for(var x in ao){
                _19e[x]=ao[x];
            }
            var mjps=[];
            dojo.lang.forEach(ao.srcObj,function(src){
                if((dojo.render.html.capable)&&(dojo.lang.isString(src))){
                    src=dojo.byId(src);
                }
                _19e.srcObj=src;
                mjps.push(dojo.event.connect.call(dojo.event,_19e));
            });
            return mjps;
        }
        var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
        if(ao.adviceFunc){
            var mjp2=dojo.event.MethodJoinPoint.getForMethod(ao.adviceObj,ao.adviceFunc);
        }
        mjp.kwAddAdvice(ao);
        return mjp;
    };
    this.log=function(a1,a2){
        var _1a6;
        if((arguments.length==1)&&(typeof a1=="object")){
            _1a6=a1;
        }else{
            _1a6={srcObj:a1,srcFunc:a2};
        }
        _1a6.adviceFunc=function(){
            var _1a7=[];
            for(var x=0;x<arguments.length;x++){
                _1a7.push(arguments[x]);
            }
            dojo.debug("("+_1a6.srcObj+")."+_1a6.srcFunc,":",_1a7.join(", "));
        };
        this.kwConnect(_1a6);
    };
    this.connectBefore=function(){
        var args=["before"];
        for(var i=0;i<arguments.length;i++){
            args.push(arguments[i]);
        }
        return this.connect.apply(this,args);
    };
    this.connectAround=function(){
        var args=["around"];
        for(var i=0;i<arguments.length;i++){
            args.push(arguments[i]);
        }
        return this.connect.apply(this,args);
    };
    this.connectOnce=function(){
        var ao=interpolateArgs(arguments,true);
        ao.once=true;
        return this.connect(ao);
    };
    this._kwConnectImpl=function(_1ae,_1af){
        var fn=(_1af)?"disconnect":"connect";
        if(typeof _1ae["srcFunc"]=="function"){
            _1ae.srcObj=_1ae["srcObj"]||dj_global;
            var _1b1=dojo.lang.nameAnonFunc(_1ae.srcFunc,_1ae.srcObj,true);
            _1ae.srcFunc=_1b1;
        }
        if(typeof _1ae["adviceFunc"]=="function"){
            _1ae.adviceObj=_1ae["adviceObj"]||dj_global;
            var _1b1=dojo.lang.nameAnonFunc(_1ae.adviceFunc,_1ae.adviceObj,true);
            _1ae.adviceFunc=_1b1;
        }
        return dojo.event[fn]((_1ae["type"]||_1ae["adviceType"]||"after"),_1ae["srcObj"]||dj_global,_1ae["srcFunc"],_1ae["adviceObj"]||_1ae["targetObj"]||dj_global,_1ae["adviceFunc"]||_1ae["targetFunc"],_1ae["aroundObj"],_1ae["aroundFunc"],_1ae["once"],_1ae["delay"],_1ae["rate"],_1ae["adviceMsg"]||false);
    };
    this.kwConnect=function(_1b2){
        return this._kwConnectImpl(_1b2,false);
    };
    this.disconnect=function(){
        var ao=interpolateArgs(arguments,true);
        if(!ao.adviceFunc){
            return;
        }
        var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
        return mjp.removeAdvice(ao.adviceObj,ao.adviceFunc,ao.adviceType,ao.once);
    };
    this.kwDisconnect=function(_1b5){
        return this._kwConnectImpl(_1b5,true);
    };
};
dojo.event.MethodInvocation=function(_1b6,obj,args){
    this.jp_=_1b6;
    this.object=obj;
    this.args=[];
    for(var x=0;x<args.length;x++){
        this.args[x]=args[x];
    }
    this.around_index=-1;
};
dojo.event.MethodInvocation.prototype.proceed=function(){
    this.around_index++;
    if(this.around_index>=this.jp_.around.length){
        return this.jp_.object[this.jp_.methodname].apply(this.jp_.object,this.args);
    }else{
        var ti=this.jp_.around[this.around_index];
        var mobj=ti[0]||dj_global;
        var meth=ti[1];
        return mobj[meth].call(mobj,this);
    }
};
dojo.event.MethodJoinPoint=function(obj,_1be){
    this.object=obj||dj_global;
    this.methodname=_1be;
    this.methodfunc=this.object[_1be];
    this.before=[];
    this.after=[];
    this.around=[];
};
dojo.event.MethodJoinPoint.getForMethod=function(obj,_1c0){
    if(!obj){
        obj=dj_global;
    }
    if(!obj[_1c0]){
        obj[_1c0]=function(){
        };
        if(!obj[_1c0]){
            dojo.raise("Cannot set do-nothing method on that object "+_1c0);
        }
    }else{
        if((!dojo.lang.isFunction(obj[_1c0]))&&(!dojo.lang.isAlien(obj[_1c0]))){
            return null;
        }
    }
    var _1c1=_1c0+"$joinpoint";
    var _1c2=_1c0+"$joinpoint$method";
    var _1c3=obj[_1c1];
    if(!_1c3){
        var _1c4=false;
        if(dojo.event["browser"]){
            if((obj["attachEvent"])||(obj["nodeType"])||(obj["addEventListener"])){
                _1c4=true;
                dojo.event.browser.addClobberNodeAttrs(obj,[_1c1,_1c2,_1c0]);
            }
        }
        var _1c5=obj[_1c0].length;
        obj[_1c2]=obj[_1c0];
        _1c3=obj[_1c1]=new dojo.event.MethodJoinPoint(obj,_1c2);
        obj[_1c0]=function(){
            var args=[];
            if((_1c4)&&(!arguments.length)){
                var evt=null;
                try{
                    if(obj.ownerDocument){
                        evt=obj.ownerDocument.parentWindow.event;
                    }else{
                        if(obj.documentElement){
                            evt=obj.documentElement.ownerDocument.parentWindow.event;
                        }else{
                            if(obj.event){
                                evt=obj.event;
                            }else{
                                evt=window.event;
                            }
                        }
                    }
                }
                catch(e){
                    evt=window.event;
                }
                if(evt){
                    args.push(dojo.event.browser.fixEvent(evt,this));
                }
            }else{
                for(var x=0;x<arguments.length;x++){
                    if((x==0)&&(_1c4)&&(dojo.event.browser.isEvent(arguments[x]))){
                        args.push(dojo.event.browser.fixEvent(arguments[x],this));
                    }else{
                        args.push(arguments[x]);
                    }
                }
            }
            return _1c3.run.apply(_1c3,args);
        };
        obj[_1c0].__preJoinArity=_1c5;
    }
    return _1c3;
};
dojo.lang.extend(dojo.event.MethodJoinPoint,{unintercept:function(){
    this.object[this.methodname]=this.methodfunc;
    this.before=[];
    this.after=[];
    this.around=[];
},disconnect:dojo.lang.forward("unintercept"),run:function(){
    var obj=this.object||dj_global;
    var args=arguments;
    var _1cb=[];
    for(var x=0;x<args.length;x++){
        _1cb[x]=args[x];
    }
    var _1cd=function(marr){
        if(!marr){
            dojo.debug("Null argument to unrollAdvice()");
            return;
        }
        var _1cf=marr[0]||dj_global;
        var _1d0=marr[1];
        if(!_1cf[_1d0]){
            dojo.raise("function \""+_1d0+"\" does not exist on \""+_1cf+"\"");
        }
        var _1d1=marr[2]||dj_global;
        var _1d2=marr[3];
        var msg=marr[6];
        var _1d4;
        var to={args:[],jp_:this,object:obj,proceed:function(){
            return _1cf[_1d0].apply(_1cf,to.args);
        }};
        to.args=_1cb;
        var _1d6=parseInt(marr[4]);
        var _1d7=((!isNaN(_1d6))&&(marr[4]!==null)&&(typeof marr[4]!="undefined"));
        if(marr[5]){
            var rate=parseInt(marr[5]);
            var cur=new Date();
            var _1da=false;
            if((marr["last"])&&((cur-marr.last)<=rate)){
                if(dojo.event.canTimeout){
                    if(marr["delayTimer"]){
                        clearTimeout(marr.delayTimer);
                    }
                    var tod=parseInt(rate*2);
                    var mcpy=dojo.lang.shallowCopy(marr);
                    marr.delayTimer=setTimeout(function(){
                        mcpy[5]=0;
                        _1cd(mcpy);
                    },tod);
                }
                return;
            }else{
                marr.last=cur;
            }
        }
        if(_1d2){
            _1d1[_1d2].call(_1d1,to);
        }else{
            if((_1d7)&&((dojo.render.html)||(dojo.render.svg))){
                dj_global["setTimeout"](function(){
                    if(msg){
                        _1cf[_1d0].call(_1cf,to);
                    }else{
                        _1cf[_1d0].apply(_1cf,args);
                    }
                },_1d6);
            }else{
                if(msg){
                    _1cf[_1d0].call(_1cf,to);
                }else{
                    _1cf[_1d0].apply(_1cf,args);
                }
            }
        }
    };
    if(this.before.length>0){
        dojo.lang.forEach(this.before.concat(new Array()),_1cd);
    }
    var _1dd;
    if(this.around.length>0){
        var mi=new dojo.event.MethodInvocation(this,obj,args);
        _1dd=mi.proceed();
    }else{
        if(this.methodfunc){
            _1dd=this.object[this.methodname].apply(this.object,args);
        }
    }
    if(this.after.length>0){
        dojo.lang.forEach(this.after.concat(new Array()),_1cd);
    }
    return (this.methodfunc)?_1dd:null;
},getArr:function(kind){
    var arr=this.after;
    if((typeof kind=="string")&&(kind.indexOf("before")!=-1)){
        arr=this.before;
    }else{
        if(kind=="around"){
            arr=this.around;
        }
    }
    return arr;
},kwAddAdvice:function(args){
    this.addAdvice(args["adviceObj"],args["adviceFunc"],args["aroundObj"],args["aroundFunc"],args["adviceType"],args["precedence"],args["once"],args["delay"],args["rate"],args["adviceMsg"]);
},addAdvice:function(_1e2,_1e3,_1e4,_1e5,_1e6,_1e7,once,_1e9,rate,_1eb){
    var arr=this.getArr(_1e6);
    if(!arr){
        dojo.raise("bad this: "+this);
    }
    var ao=[_1e2,_1e3,_1e4,_1e5,_1e9,rate,_1eb];
    if(once){
        if(this.hasAdvice(_1e2,_1e3,_1e6,arr)>=0){
            return;
        }
    }
    if(_1e7=="first"){
        arr.unshift(ao);
    }else{
        arr.push(ao);
    }
},hasAdvice:function(_1ee,_1ef,_1f0,arr){
    if(!arr){
        arr=this.getArr(_1f0);
    }
    var ind=-1;
    for(var x=0;x<arr.length;x++){
        var aao=(typeof _1ef=="object")?(new String(_1ef)).toString():_1ef;
        var a1o=(typeof arr[x][1]=="object")?(new String(arr[x][1])).toString():arr[x][1];
        if((arr[x][0]==_1ee)&&(a1o==aao)){
            ind=x;
        }
    }
    return ind;
},removeAdvice:function(_1f6,_1f7,_1f8,once){
    var arr=this.getArr(_1f8);
    var ind=this.hasAdvice(_1f6,_1f7,_1f8,arr);
    if(ind==-1){
        return false;
    }
    while(ind!=-1){
        arr.splice(ind,1);
        if(once){
            break;
        }
        ind=this.hasAdvice(_1f6,_1f7,_1f8,arr);
    }
    return true;
}});
dojo.provide("dojo.event.topic");
dojo.event.topic=new function(){
    this.topics={};
    this.getTopic=function(_1fc){
        if(!this.topics[_1fc]){
            this.topics[_1fc]=new this.TopicImpl(_1fc);
        }
        return this.topics[_1fc];
    };
    this.registerPublisher=function(_1fd,obj,_1ff){
        var _1fd=this.getTopic(_1fd);
        _1fd.registerPublisher(obj,_1ff);
    };
    this.subscribe=function(_200,obj,_202){
        var _200=this.getTopic(_200);
        _200.subscribe(obj,_202);
    };
    this.unsubscribe=function(_203,obj,_205){
        var _203=this.getTopic(_203);
        _203.unsubscribe(obj,_205);
    };
    this.destroy=function(_206){
        this.getTopic(_206).destroy();
        delete this.topics[_206];
    };
    this.publishApply=function(_207,args){
        var _207=this.getTopic(_207);
        _207.sendMessage.apply(_207,args);
    };
    this.publish=function(_209,_20a){
        var _209=this.getTopic(_209);
        var args=[];
        for(var x=1;x<arguments.length;x++){
            args.push(arguments[x]);
        }
        _209.sendMessage.apply(_209,args);
    };
};
dojo.event.topic.TopicImpl=function(_20d){
    this.topicName=_20d;
    this.subscribe=function(_20e,_20f){
        var tf=_20f||_20e;
        var to=(!_20f)?dj_global:_20e;
        dojo.event.kwConnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
    };
    this.unsubscribe=function(_212,_213){
        var tf=(!_213)?_212:_213;
        var to=(!_213)?null:_212;
        dojo.event.kwDisconnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
    };
    this.destroy=function(){
        dojo.event.MethodJoinPoint.getForMethod(this,"sendMessage").disconnect();
    };
    this.registerPublisher=function(_216,_217){
        dojo.event.connect(_216,_217,this,"sendMessage");
    };
    this.sendMessage=function(_218){
    };
};
dojo.provide("dojo.event.browser");
dojo._ie_clobber=new function(){
    this.clobberNodes=[];
    function nukeProp(node,prop){
        try{
            node[prop]=null;
        }
        catch(e){
        }
        try{
            delete node[prop];
        }
        catch(e){
        }
        try{
            node.removeAttribute(prop);
        }
        catch(e){
        }
    }
    this.clobber=function(_21b){
        var na;
        var tna;
        if(_21b){
            tna=_21b.all||_21b.getElementsByTagName("*");
            na=[_21b];
            for(var x=0;x<tna.length;x++){
                if(tna[x]["__doClobber__"]){
                    na.push(tna[x]);
                }
            }
        }else{
            try{
                window.onload=null;
            }
            catch(e){
            }
            na=(this.clobberNodes.length)?this.clobberNodes:document.all;
        }
        tna=null;
        var _21f={};
        for(var i=na.length-1;i>=0;i=i-1){
            var el=na[i];
            if(el["__clobberAttrs__"]){
                for(var j=0;j<el.__clobberAttrs__.length;j++){
                    nukeProp(el,el.__clobberAttrs__[j]);
                }
                nukeProp(el,"__clobberAttrs__");
                nukeProp(el,"__doClobber__");
            }
        }
        na=null;
    };
};
if(dojo.render.html.ie){
    dojo.addOnUnload(function(){
        dojo._ie_clobber.clobber();
        try{
            if((dojo["widget"])&&(dojo.widget["manager"])){
                dojo.widget.manager.destroyAll();
            }
        }
        catch(e){
        }
        try{
            window.onload=null;
        }
        catch(e){
        }
        try{
            window.onunload=null;
        }
        catch(e){
        }
        dojo._ie_clobber.clobberNodes=[];
    });
}
dojo.event.browser=new function(){
    var _223=0;
    this.clean=function(node){
        if(dojo.render.html.ie){
            dojo._ie_clobber.clobber(node);
        }
    };
    this.addClobberNode=function(node){
        if(!dojo.render.html.ie){
            return;
        }
        if(!node["__doClobber__"]){
            node.__doClobber__=true;
            dojo._ie_clobber.clobberNodes.push(node);
            node.__clobberAttrs__=[];
        }
    };
    this.addClobberNodeAttrs=function(node,_227){
        if(!dojo.render.html.ie){
            return;
        }
        this.addClobberNode(node);
        for(var x=0;x<_227.length;x++){
            node.__clobberAttrs__.push(_227[x]);
        }
    };
    this.removeListener=function(node,_22a,fp,_22c){
        if(!_22c){
            var _22c=false;
        }
        _22a=_22a.toLowerCase();
        if(_22a.substr(0,2)=="on"){
            _22a=_22a.substr(2);
        }
        if(node.removeEventListener){
            node.removeEventListener(_22a,fp,_22c);
        }
    };
    this.addListener=function(node,_22e,fp,_230,_231){
        if(!node){
            return;
        }
        if(!_230){
            var _230=false;
        }
        _22e=_22e.toLowerCase();
        if(_22e.substr(0,2)!="on"){
            _22e="on"+_22e;
        }
        if(!_231){
            var _232=function(evt){
                if(!evt){
                    evt=window.event;
                }
                var ret=fp(dojo.event.browser.fixEvent(evt,this));
                if(_230){
                    dojo.event.browser.stopEvent(evt);
                }
                return ret;
            };
        }else{
            _232=fp;
        }
        if(node.addEventListener){
            node.addEventListener(_22e.substr(2),_232,_230);
            return _232;
        }else{
            if(typeof node[_22e]=="function"){
                var _235=node[_22e];
                node[_22e]=function(e){
                    _235(e);
                    return _232(e);
                };
            }else{
                node[_22e]=_232;
            }
            if(dojo.render.html.ie){
                this.addClobberNodeAttrs(node,[_22e]);
            }
            return _232;
        }
    };
    this.isEvent=function(obj){
        return (typeof obj!="undefined")&&(typeof Event!="undefined")&&(obj.eventPhase);
    };
    this.currentEvent=null;
    this.callListener=function(_238,_239){
        if(typeof _238!="function"){
            dojo.raise("listener not a function: "+_238);
        }
        dojo.event.browser.currentEvent.currentTarget=_239;
        return _238.call(_239,dojo.event.browser.currentEvent);
    };
    this.stopPropagation=function(){
        dojo.event.browser.currentEvent.cancelBubble=true;
    };
    this.preventDefault=function(){
        dojo.event.browser.currentEvent.returnValue=false;
    };
    this.keys={KEY_BACKSPACE:8,KEY_TAB:9,KEY_ENTER:13,KEY_SHIFT:16,KEY_CTRL:17,KEY_ALT:18,KEY_PAUSE:19,KEY_CAPS_LOCK:20,KEY_ESCAPE:27,KEY_SPACE:32,KEY_PAGE_UP:33,KEY_PAGE_DOWN:34,KEY_END:35,KEY_HOME:36,KEY_LEFT_ARROW:37,KEY_UP_ARROW:38,KEY_RIGHT_ARROW:39,KEY_DOWN_ARROW:40,KEY_INSERT:45,KEY_DELETE:46,KEY_LEFT_WINDOW:91,KEY_RIGHT_WINDOW:92,KEY_SELECT:93,KEY_F1:112,KEY_F2:113,KEY_F3:114,KEY_F4:115,KEY_F5:116,KEY_F6:117,KEY_F7:118,KEY_F8:119,KEY_F9:120,KEY_F10:121,KEY_F11:122,KEY_F12:123,KEY_NUM_LOCK:144,KEY_SCROLL_LOCK:145};
    this.revKeys=[];
    for(var key in this.keys){
        this.revKeys[this.keys[key]]=key;
    }
    this.fixEvent=function(evt,_23c){
        if(!evt){
            if(window["event"]){
                evt=window.event;
            }
        }
        if((evt["type"])&&(evt["type"].indexOf("key")==0)){
            evt.keys=this.revKeys;
            for(var key in this.keys){
                evt[key]=this.keys[key];
            }
            if((dojo.render.html.ie)&&(evt["type"]=="keypress")){
                evt.charCode=evt.keyCode;
            }
        }
        if(dojo.render.html.ie){
            if(!evt.target){
                evt.target=evt.srcElement;
            }
            if(!evt.currentTarget){
                evt.currentTarget=(_23c?_23c:evt.srcElement);
            }
            if(!evt.layerX){
                evt.layerX=evt.offsetX;
            }
            if(!evt.layerY){
                evt.layerY=evt.offsetY;
            }
            var doc=(evt.srcElement&&evt.srcElement.ownerDocument)?evt.srcElement.ownerDocument:document;
            var _23f=((dojo.render.html.ie55)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
            if(!evt.pageX){
                evt.pageX=evt.clientX+(_23f.scrollLeft||0);
            }
            if(!evt.pageY){
                evt.pageY=evt.clientY+(_23f.scrollTop||0);
            }
            if(evt.type=="mouseover"){
                evt.relatedTarget=evt.fromElement;
            }
            if(evt.type=="mouseout"){
                evt.relatedTarget=evt.toElement;
            }
            this.currentEvent=evt;
            evt.callListener=this.callListener;
            evt.stopPropagation=this.stopPropagation;
            evt.preventDefault=this.preventDefault;
        }
        return evt;
    };
    this.stopEvent=function(ev){
        if(window.event){
            ev.returnValue=false;
            ev.cancelBubble=true;
        }else{
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
};
dojo.provide("dojo.event.*");
dojo.provide("dojo.lang.declare");
dojo.lang.declare=function(_241,_242,init,_244){
    if((dojo.lang.isFunction(_244))||((!_244)&&(!dojo.lang.isFunction(init)))){
        var temp=_244;
        _244=init;
        init=temp;
    }
    var _246=[];
    if(dojo.lang.isArray(_242)){
        _246=_242;
        _242=_246.shift();
    }
    if(!init){
        init=dojo.evalObjPath(_241,false);
        if((init)&&(!dojo.lang.isFunction(init))){
            init=null;
        }
    }
    var ctor=dojo.lang.declare._makeConstructor();
    var scp=(_242?_242.prototype:null);
    if(scp){
        scp.prototyping=true;
        ctor.prototype=new _242();
        scp.prototyping=false;
    }
    ctor.superclass=scp;
    ctor.mixins=_246;
    for(var i=0,l=_246.length;i<l;i++){
        dojo.lang.extend(ctor,_246[i].prototype);
    }
    ctor.prototype.initializer=null;
    ctor.prototype.declaredClass=_241;
    if(dojo.lang.isArray(_244)){
        dojo.lang.extend.apply(dojo.lang,[ctor].concat(_244));
    }else{
        dojo.lang.extend(ctor,(_244)||{});
    }
    dojo.lang.extend(ctor,dojo.lang.declare.base);
    ctor.prototype.constructor=ctor;
    ctor.prototype.initializer=(ctor.prototype.initializer)||(init)||(function(){
    });
    dojo.lang.setObjPathValue(_241,ctor,null,true);
    return ctor;
};
dojo.lang.declare._makeConstructor=function(){
    return function(){
        var self=this._getPropContext();
        var s=self.constructor.superclass;
        if((s)&&(s.constructor)){
            if(s.constructor==arguments.callee){
                this.inherited("constructor",arguments);
            }else{
                this._inherited(s,"constructor",arguments);
            }
        }
        var m=(self.constructor.mixins)||([]);
        for(var i=0,l=m.length;i<l;i++){
            (((m[i].prototype)&&(m[i].prototype.initializer))||(m[i])).apply(this,arguments);
        }
        if((!this.prototyping)&&(self.initializer)){
            self.initializer.apply(this,arguments);
        }
    };
};
dojo.lang.declare.base={_getPropContext:function(){
    return (this.___proto||this);
},_inherited:function(_24e,_24f,args){
    var _251,stack=this.___proto;
    this.___proto=_24e;
    try{
        _251=_24e[_24f].apply(this,(args||[]));
    }
    catch(e){
        throw e;
    }
    finally{
        this.___proto=stack;
    }
    return _251;
},inheritedFrom:function(ctor,prop,args){
    var p=((ctor)&&(ctor.prototype)&&(ctor.prototype[prop]));
    return (dojo.lang.isFunction(p)?p.apply(this,(args||[])):p);
},inherited:function(prop,args){
    var p=this._getPropContext();
    do{
        if((!p.constructor)||(!p.constructor.superclass)){
            return;
        }
        p=p.constructor.superclass;
    }while(!(prop in p));
    return (dojo.lang.isFunction(p[prop])?this._inherited(p,prop,args):p[prop]);
}};
dojo.declare=dojo.lang.declare;
dojo.provide("dojo.widget.Manager");
dojo.widget.manager=new function(){
    this.widgets=[];
    this.widgetIds=[];
    this.topWidgets={};
    var _259={};
    var _25a=[];
    this.getUniqueId=function(_25b){
        return _25b+"_"+(_259[_25b]!=undefined?++_259[_25b]:_259[_25b]=0);
    };
    this.add=function(_25c){
        this.widgets.push(_25c);
        if(!_25c.extraArgs["id"]){
            _25c.extraArgs["id"]=_25c.extraArgs["ID"];
        }
        if(_25c.widgetId==""){
            if(_25c["id"]){
                _25c.widgetId=_25c["id"];
            }else{
                if(_25c.extraArgs["id"]){
                    _25c.widgetId=_25c.extraArgs["id"];
                }else{
                    _25c.widgetId=this.getUniqueId(_25c.widgetType);
                }
            }
        }
        if(this.widgetIds[_25c.widgetId]){
            dojo.debug("widget ID collision on ID: "+_25c.widgetId);
        }
        this.widgetIds[_25c.widgetId]=_25c;
    };
    this.destroyAll=function(){
        for(var x=this.widgets.length-1;x>=0;x--){
            try{
                this.widgets[x].destroy(true);
                delete this.widgets[x];
            }
            catch(e){
            }
        }
    };
    this.remove=function(_25e){
        if(dojo.lang.isNumber(_25e)){
            var tw=this.widgets[_25e].widgetId;
            delete this.widgetIds[tw];
            this.widgets.splice(_25e,1);
        }else{
            this.removeById(_25e);
        }
    };
    this.removeById=function(id){
        if(!dojo.lang.isString(id)){
            id=id["widgetId"];
            if(!id){
                dojo.debug("invalid widget or id passed to removeById");
                return;
            }
        }
        for(var i=0;i<this.widgets.length;i++){
            if(this.widgets[i].widgetId==id){
                this.remove(i);
                break;
            }
        }
    };
    this.getWidgetById=function(id){
        if(dojo.lang.isString(id)){
            return this.widgetIds[id];
        }
        return id;
    };
    this.getWidgetsByType=function(type){
        var lt=type.toLowerCase();
        var ret=[];
        dojo.lang.forEach(this.widgets,function(x){
            if(x.widgetType.toLowerCase()==lt){
                ret.push(x);
            }
        });
        return ret;
    };
    this.getWidgetsByFilter=function(_267,_268){
        var ret=[];
        dojo.lang.every(this.widgets,function(x){
            if(_267(x)){
                ret.push(x);
                if(_268){
                    return false;
                }
            }
            return true;
        });
        return (_268?ret[0]:ret);
    };
    this.getAllWidgets=function(){
        return this.widgets.concat();
    };
    this.getWidgetByNode=function(node){
        var w=this.getAllWidgets();
        node=dojo.byId(node);
        for(var i=0;i<w.length;i++){
            if(w[i].domNode==node){
                return w[i];
            }
        }
        return null;
    };
    this.byId=this.getWidgetById;
    this.byType=this.getWidgetsByType;
    this.byFilter=this.getWidgetsByFilter;
    this.byNode=this.getWidgetByNode;
    var _26e={};
    var _26f=["dojo.widget"];
    for(var i=0;i<_26f.length;i++){
        _26f[_26f[i]]=true;
    }
    this.registerWidgetPackage=function(_271){
        if(!_26f[_271]){
            _26f[_271]=true;
            _26f.push(_271);
        }
    };
    this.getWidgetPackageList=function(){
        return dojo.lang.map(_26f,function(elt){
            return (elt!==true?elt:undefined);
        });
    };
    this.getImplementation=function(_273,_274,_275,_276){
        var impl=this.getImplementationName(_273,_276);
        if(impl){
            var ret;
            if(_274){
                ret=new impl(ctor);
            }else{
                ret=new impl();
            }
            return ret;
        }
    };
    this.getImplementationName=function(_279,_27a){
        if(!_27a){
            _27a="dojo";
        }
        var _27b=_279.toLowerCase();
        if(!_26e[_27a]){
            _26e[_27a]={};
        }
        var impl=_26e[_27a][_27b];
        if(impl){
            return impl;
        }
        var ns=dojo.getNamespace(_27a);
        if(ns){
            ns.load(_279);
        }
        if(!_25a.length){
            for(var _27e in dojo.render){
                if(dojo.render[_27e]["capable"]===true){
                    var _27f=dojo.render[_27e].prefixes;
                    for(var i=0;i<_27f.length;i++){
                        _25a.push(_27f[i].toLowerCase());
                    }
                }
            }
            _25a.push("");
        }
        var _281=null;
        var _282=false;
        for(var _283=0;_283<2;_283++){
            for(var i=0;i<_26f.length;i++){
                var _284=dojo.evalObjPath(_26f[i]);
                if(!_284){
                    continue;
                }
                var pos=_26f[i].indexOf(".");
                if(pos>-1){
                    var n=_26f[i].substring(0,pos);
                    if(n!=_27a){
                        if(_283==0){
                            continue;
                        }
                        if(!_282){
                            _282=true;
                            dojo.deprecated("dojo.widget.Manager.getImplementationName","Wrong namespace ("+_27a+") specified. Developers should specify correct namespaces for all non-Dojo widgets","0.5");
                        }
                    }
                }
                for(var j=0;j<_25a.length;j++){
                    if(!_284[_25a[j]]){
                        continue;
                    }
                    for(var _288 in _284[_25a[j]]){
                        if(_288.toLowerCase()!=_27b){
                            continue;
                        }
                        _26e[_27a][_27b]=_284[_25a[j]][_288];
                        return _26e[_27a][_27b];
                    }
                }
                for(var j=0;j<_25a.length;j++){
                    for(var _288 in _284){
                        if(_288.toLowerCase()!=(_25a[j]+_27b)&&_288.toLowerCase()!=_27b){
                            continue;
                        }
                        _26e[_27a][_27b]=_284[_288];
                        return _26e[_27a][_27b];
                    }
                }
            }
            var _289=dojo.findNamespaceForWidget(_27b);
            if(_289){
                _27a=_289.nsPrefix;
            }
        }
        throw new Error("Could not locate \""+_279+"\" class");
    };
    this.resizing=false;
    this.onWindowResized=function(){
        if(this.resizing){
            return;
        }
        try{
            this.resizing=true;
            for(var id in this.topWidgets){
                var _28b=this.topWidgets[id];
                if(_28b.checkSize){
                    _28b.checkSize();
                }
            }
        }
        catch(e){
        }
        finally{
            this.resizing=false;
        }
    };
    if(typeof window!="undefined"){
        dojo.addOnLoad(this,"onWindowResized");
        dojo.event.connect(window,"onresize",this,"onWindowResized");
    }
};
(function(){
    var dw=dojo.widget;
    var dwm=dw.manager;
    var h=dojo.lang.curry(dojo.lang,"hitch",dwm);
    var g=function(_290,_291){
        dw[(_291||_290)]=h(_290);
    };
    g("add","addWidget");
    g("destroyAll","destroyAllWidgets");
    g("remove","removeWidget");
    g("removeById","removeWidgetById");
    g("getWidgetById");
    g("getWidgetById","byId");
    g("getWidgetsByType");
    g("getWidgetsByFilter");
    g("getWidgetsByType","byType");
    g("getWidgetsByFilter","byFilter");
    g("getWidgetByNode","byNode");
    dw.all=function(n){
        var _293=dwm.getAllWidgets.apply(dwm,arguments);
        if(arguments.length>0){
            return _293[n];
        }
        return _293;
    };
    g("registerWidgetPackage");
    g("getImplementation","getWidgetImplementation");
    g("getImplementationName","getWidgetImplementationName");
    dw.widgets=dwm.widgets;
    dw.widgetIds=dwm.widgetIds;
    dw.root=dwm.root;
})();
dojo.provide("dojo.widget.Widget");
dojo.provide("dojo.widget.tags");
dojo.declare("dojo.widget.Widget",null,function(){
    this.children=[];
    this.extraArgs={};
},{parent:null,isTopLevel:false,isModal:false,isEnabled:true,isHidden:false,isContainer:false,widgetId:"",widgetType:"Widget",namespace:"dojo",toString:function(){
    return "[Widget "+this.widgetType+", "+(this.widgetId||"NO ID")+"]";
},repr:function(){
    return this.toString();
},enable:function(){
    this.isEnabled=true;
},disable:function(){
    this.isEnabled=false;
},hide:function(){
    this.isHidden=true;
},show:function(){
    this.isHidden=false;
},onResized:function(){
    this.notifyChildrenOfResize();
},notifyChildrenOfResize:function(){
    for(var i=0;i<this.children.length;i++){
        var _295=this.children[i];
        if(_295.onResized){
            _295.onResized();
        }
    }
},create:function(args,_297,_298,_299){
    if(_299){
        this.namespace=_299;
    }
    this.satisfyPropertySets(args,_297,_298);
    this.mixInProperties(args,_297,_298);
    this.postMixInProperties(args,_297,_298);
    dojo.widget.manager.add(this);
    this.buildRendering(args,_297,_298);
    this.initialize(args,_297,_298);
    this.postInitialize(args,_297,_298);
    this.postCreate(args,_297,_298);
    return this;
},destroy:function(_29a){
    this.destroyChildren();
    this.uninitialize();
    this.destroyRendering(_29a);
    dojo.widget.manager.removeById(this.widgetId);
},destroyChildren:function(){
    while(this.children.length>0){
        var tc=this.children[0];
        this.removeChild(tc);
        tc.destroy();
    }
},getChildrenOfType:function(type,_29d){
    var ret=[];
    var _29f=dojo.lang.isFunction(type);
    if(!_29f){
        type=type.toLowerCase();
    }
    for(var x=0;x<this.children.length;x++){
        if(_29f){
            if(this.children[x] instanceof type){
                ret.push(this.children[x]);
            }
        }else{
            if(this.children[x].widgetType.toLowerCase()==type){
                ret.push(this.children[x]);
            }
        }
        if(_29d){
            ret=ret.concat(this.children[x].getChildrenOfType(type,_29d));
        }
    }
    return ret;
},getDescendants:function(){
    var _2a1=[];
    var _2a2=[this];
    var elem;
    while((elem=_2a2.pop())){
        _2a1.push(elem);
        if(elem.children){
            dojo.lang.forEach(elem.children,function(elem){
                _2a2.push(elem);
            });
        }
    }
    return _2a1;
},isFirstNode:function(){
    return this===this.parent.children[0];
},isLastNode:function(){
    return this===this.parent.children[this.parent.children.length-1];
},satisfyPropertySets:function(args){
    return args;
},mixInProperties:function(args,frag){
    if((args["fastMixIn"])||(frag["fastMixIn"])){
        for(var x in args){
            this[x]=args[x];
        }
        return;
    }
    var _2a9;
    var _2aa=dojo.widget.lcArgsCache[this.widgetType];
    if(_2aa==null){
        _2aa={};
        for(var y in this){
            _2aa[((new String(y)).toLowerCase())]=y;
        }
        dojo.widget.lcArgsCache[this.widgetType]=_2aa;
    }
    var _2ac={};
    for(var x in args){
        if(!this[x]){
            var y=_2aa[(new String(x)).toLowerCase()];
            if(y){
                args[y]=args[x];
                x=y;
            }
        }
        if(_2ac[x]){
            continue;
        }
        _2ac[x]=true;
        if((typeof this[x])!=(typeof _2a9)){
            if(typeof args[x]!="string"){
                this[x]=args[x];
            }else{
                if(dojo.lang.isString(this[x])){
                    this[x]=args[x];
                }else{
                    if(dojo.lang.isNumber(this[x])){
                        this[x]=new Number(args[x]);
                    }else{
                        if(dojo.lang.isBoolean(this[x])){
                            this[x]=(args[x].toLowerCase()=="false")?false:true;
                        }else{
                            if(dojo.lang.isFunction(this[x])){
                                if(args[x].search(/[^\w\.]+/i)==-1){
                                    this[x]=dojo.evalObjPath(args[x],false);
                                }else{
                                    var tn=dojo.lang.nameAnonFunc(new Function(args[x]),this);
                                    dojo.event.connect(this,x,this,tn);
                                }
                            }else{
                                if(dojo.lang.isArray(this[x])){
                                    this[x]=args[x].split(";");
                                }else{
                                    if(this[x] instanceof Date){
                                        this[x]=new Date(Number(args[x]));
                                    }else{
                                        if(typeof this[x]=="object"){
                                            if(this[x] instanceof dojo.uri.Uri){
                                                this[x]=args[x];
                                            }else{
                                                var _2ae=args[x].split(";");
                                                for(var y=0;y<_2ae.length;y++){
                                                    var si=_2ae[y].indexOf(":");
                                                    if((si!=-1)&&(_2ae[y].length>si)){
                                                        this[x][_2ae[y].substr(0,si).replace(/^\s+|\s+$/g,"")]=_2ae[y].substr(si+1);
                                                    }
                                                }
                                            }
                                        }else{
                                            this[x]=args[x];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }else{
            this.extraArgs[x.toLowerCase()]=args[x];
        }
    }
},postMixInProperties:function(){
},initialize:function(args,frag){
    return false;
},postInitialize:function(args,frag){
    return false;
},postCreate:function(args,frag){
    return false;
},uninitialize:function(){
    return false;
},buildRendering:function(){
    dojo.unimplemented("dojo.widget.Widget.buildRendering, on "+this.toString()+", ");
    return false;
},destroyRendering:function(){
    dojo.unimplemented("dojo.widget.Widget.destroyRendering");
    return false;
},cleanUp:function(){
    dojo.unimplemented("dojo.widget.Widget.cleanUp");
    return false;
},addedTo:function(_2b6){
},addChild:function(_2b7){
    dojo.unimplemented("dojo.widget.Widget.addChild");
    return false;
},removeChild:function(_2b8){
    for(var x=0;x<this.children.length;x++){
        if(this.children[x]===_2b8){
            this.children.splice(x,1);
            break;
        }
    }
    return _2b8;
},resize:function(_2ba,_2bb){
    this.setWidth(_2ba);
    this.setHeight(_2bb);
},setWidth:function(_2bc){
    if((typeof _2bc=="string")&&(_2bc.substr(-1)=="%")){
        this.setPercentageWidth(_2bc);
    }else{
        this.setNativeWidth(_2bc);
    }
},setHeight:function(_2bd){
    if((typeof _2bd=="string")&&(_2bd.substr(-1)=="%")){
        this.setPercentageHeight(_2bd);
    }else{
        this.setNativeHeight(_2bd);
    }
},setPercentageHeight:function(_2be){
    return false;
},setNativeHeight:function(_2bf){
    return false;
},setPercentageWidth:function(_2c0){
    return false;
},setNativeWidth:function(_2c1){
    return false;
},getPreviousSibling:function(){
    var idx=this.getParentIndex();
    if(idx<=0){
        return null;
    }
    return this.parent.children[idx-1];
},getSiblings:function(){
    return this.parent.children;
},getParentIndex:function(){
    return dojo.lang.indexOf(this.parent.children,this,true);
},getNextSibling:function(){
    var idx=this.getParentIndex();
    if(idx==this.parent.children.length-1){
        return null;
    }
    if(idx<0){
        return null;
    }
    return this.parent.children[idx+1];
}});
dojo.widget.lcArgsCache={};
dojo.widget.tags={};
dojo.widget.tags.addParseTreeHandler=function(type){
    var _2c5=type.toLowerCase();
    this[_2c5]=function(_2c6,_2c7,_2c8,_2c9,_2ca){
        var _2cb=_2c5;
        dojo.profile.start(_2cb);
        var n=dojo.widget.buildWidgetFromParseTree(_2c5,_2c6,_2c7,_2c8,_2c9,_2ca);
        dojo.profile.end(_2cb);
        return n;
    };
};
dojo.widget.tags.addParseTreeHandler("dojo:widget");
dojo.widget.tags["dojo:propertyset"]=function(_2cd,_2ce,_2cf){
    var _2d0=_2ce.parseProperties(_2cd["dojo:propertyset"]);
};
dojo.widget.tags["dojo:connect"]=function(_2d1,_2d2,_2d3){
    var _2d4=_2d2.parseProperties(_2d1["dojo:connect"]);
};
dojo.widget.buildWidgetFromParseTree=function(type,frag,_2d7,_2d8,_2d9,_2da){
    var _2db=type.split(":");
    _2db=(_2db.length==2)?_2db[1]:type;
    var _2dc=_2da||_2d7.parseProperties(frag[frag.namespace+":"+_2db]);
    var _2dd=dojo.widget.manager.getImplementation(_2db,null,null,frag.namespace);
    if(!_2dd){
        throw new Error("cannot find \""+_2db+"\" widget");
    }else{
        if(!_2dd.create){
            throw new Error("\""+_2db+"\" widget object does not appear to implement *Widget");
        }
    }
    _2dc["dojoinsertionindex"]=_2d9;
    var ret=_2dd.create(_2dc,frag,_2d8,frag.namespace);
    return ret;
};
dojo.widget.defineWidget=function(_2df,_2e0,_2e1,init,_2e3){
    if(dojo.lang.isString(arguments[3])){
        dojo.widget._defineWidget(arguments[0],arguments[3],arguments[1],arguments[4],arguments[2]);
    }else{
        var args=[arguments[0]],p=3;
        if(dojo.lang.isString(arguments[1])){
            args.push(arguments[1],arguments[2]);
        }else{
            args.push("",arguments[1]);
            p=2;
        }
        if(dojo.lang.isFunction(arguments[p])){
            args.push(arguments[p],arguments[p+1]);
        }else{
            args.push(null,arguments[p]);
        }
        dojo.widget._defineWidget.apply(this,args);
    }
};
dojo.widget.defineWidget.renderers="html|svg|vml";
dojo.widget._defineWidget=function(_2e5,_2e6,_2e7,init,_2e9){
    var _2ea=_2e5.split(".");
    var type=_2ea.pop();
    var regx="\\.("+(_2e6?_2e6+"|":"")+dojo.widget.defineWidget.renderers+")\\.";
    var r=_2e5.search(new RegExp(regx));
    _2ea=(r<0?_2ea.join("."):_2e5.substr(0,r));
    dojo.widget.manager.registerWidgetPackage(_2ea);
    var pos=_2ea.indexOf(".");
    var _2ef=(pos>-1)?_2ea.substring(0,pos):_2ea;
    dojo.widget.tags.addParseTreeHandler(_2ef+":"+type.toLowerCase());
    if(_2ef!="dojo"){
        dojo.widget.tags.addParseTreeHandler("dojo:"+type.toLowerCase());
    }
    _2e9=(_2e9)||{};
    _2e9.widgetType=type;
    if((!init)&&(_2e9["classConstructor"])){
        init=_2e9.classConstructor;
        delete _2e9.classConstructor;
    }
    dojo.declare(_2e5,_2e7,init,_2e9);
};
dojo.provide("dojo.dom");
dojo.dom.ELEMENT_NODE=1;
dojo.dom.ATTRIBUTE_NODE=2;
dojo.dom.TEXT_NODE=3;
dojo.dom.CDATA_SECTION_NODE=4;
dojo.dom.ENTITY_REFERENCE_NODE=5;
dojo.dom.ENTITY_NODE=6;
dojo.dom.PROCESSING_INSTRUCTION_NODE=7;
dojo.dom.COMMENT_NODE=8;
dojo.dom.DOCUMENT_NODE=9;
dojo.dom.DOCUMENT_TYPE_NODE=10;
dojo.dom.DOCUMENT_FRAGMENT_NODE=11;
dojo.dom.NOTATION_NODE=12;
dojo.dom.dojoml="http://www.dojotoolkit.org/2004/dojoml";
dojo.dom.xmlns={svg:"http://www.w3.org/2000/svg",smil:"http://www.w3.org/2001/SMIL20/",mml:"http://www.w3.org/1998/Math/MathML",cml:"http://www.xml-cml.org",xlink:"http://www.w3.org/1999/xlink",xhtml:"http://www.w3.org/1999/xhtml",xul:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",xbl:"http://www.mozilla.org/xbl",fo:"http://www.w3.org/1999/XSL/Format",xsl:"http://www.w3.org/1999/XSL/Transform",xslt:"http://www.w3.org/1999/XSL/Transform",xi:"http://www.w3.org/2001/XInclude",xforms:"http://www.w3.org/2002/01/xforms",saxon:"http://icl.com/saxon",xalan:"http://xml.apache.org/xslt",xsd:"http://www.w3.org/2001/XMLSchema",dt:"http://www.w3.org/2001/XMLSchema-datatypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",dc:"http://purl.org/dc/elements/1.1/",dcq:"http://purl.org/dc/qualifiers/1.0","soap-env":"http://schemas.xmlsoap.org/soap/envelope/",wsdl:"http://schemas.xmlsoap.org/wsdl/",AdobeExtensions:"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"};
dojo.dom.isNode=function(wh){
    if(typeof Element=="function"){
        try{
            return wh instanceof Element;
        }
        catch(E){
        }
    }else{
        return wh&&!isNaN(wh.nodeType);
    }
};
dojo.dom.getUniqueId=function(){
    var _2f1=dojo.doc();
    do{
        var id="dj_unique_"+(++arguments.callee._idIncrement);
    }while(_2f1.getElementById(id));
    return id;
};
dojo.dom.getUniqueId._idIncrement=0;
dojo.dom.firstElement=dojo.dom.getFirstChildElement=function(_2f3,_2f4){
    var node=_2f3.firstChild;
    while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
        node=node.nextSibling;
    }
    if(_2f4&&node&&node.tagName&&node.tagName.toLowerCase()!=_2f4.toLowerCase()){
        node=dojo.dom.nextElement(node,_2f4);
    }
    return node;
};
dojo.dom.lastElement=dojo.dom.getLastChildElement=function(_2f6,_2f7){
    var node=_2f6.lastChild;
    while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
        node=node.previousSibling;
    }
    if(_2f7&&node&&node.tagName&&node.tagName.toLowerCase()!=_2f7.toLowerCase()){
        node=dojo.dom.prevElement(node,_2f7);
    }
    return node;
};
dojo.dom.nextElement=dojo.dom.getNextSiblingElement=function(node,_2fa){
    if(!node){
        return null;
    }
    do{
        node=node.nextSibling;
    }while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
    if(node&&_2fa&&_2fa.toLowerCase()!=node.tagName.toLowerCase()){
        return dojo.dom.nextElement(node,_2fa);
    }
    return node;
};
dojo.dom.prevElement=dojo.dom.getPreviousSiblingElement=function(node,_2fc){
    if(!node){
        return null;
    }
    if(_2fc){
        _2fc=_2fc.toLowerCase();
    }
    do{
        node=node.previousSibling;
    }while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
    if(node&&_2fc&&_2fc.toLowerCase()!=node.tagName.toLowerCase()){
        return dojo.dom.prevElement(node,_2fc);
    }
    return node;
};
dojo.dom.moveChildren=function(_2fd,_2fe,trim){
    var _300=0;
    if(trim){
        while(_2fd.hasChildNodes()&&_2fd.firstChild.nodeType==dojo.dom.TEXT_NODE){
            _2fd.removeChild(_2fd.firstChild);
        }
        while(_2fd.hasChildNodes()&&_2fd.lastChild.nodeType==dojo.dom.TEXT_NODE){
            _2fd.removeChild(_2fd.lastChild);
        }
    }
    while(_2fd.hasChildNodes()){
        _2fe.appendChild(_2fd.firstChild);
        _300++;
    }
    return _300;
};
dojo.dom.copyChildren=function(_301,_302,trim){
    var _304=_301.cloneNode(true);
    return this.moveChildren(_304,_302,trim);
};
dojo.dom.removeChildren=function(node){
    var _306=node.childNodes.length;
    while(node.hasChildNodes()){
        node.removeChild(node.firstChild);
    }
    return _306;
};
dojo.dom.replaceChildren=function(node,_308){
    dojo.dom.removeChildren(node);
    node.appendChild(_308);
};
dojo.dom.removeNode=function(node){
    if(node&&node.parentNode){
        return node.parentNode.removeChild(node);
    }
};
dojo.dom.getAncestors=function(node,_30b,_30c){
    var _30d=[];
    var _30e=(_30b&&(_30b instanceof Function||typeof _30b=="function"));
    while(node){
        if(!_30e||_30b(node)){
            _30d.push(node);
        }
        if(_30c&&_30d.length>0){
            return _30d[0];
        }
        node=node.parentNode;
    }
    if(_30c){
        return null;
    }
    return _30d;
};
dojo.dom.getAncestorsByTag=function(node,tag,_311){
    tag=tag.toLowerCase();
    return dojo.dom.getAncestors(node,function(el){
        return ((el.tagName)&&(el.tagName.toLowerCase()==tag));
    },_311);
};
dojo.dom.getFirstAncestorByTag=function(node,tag){
    return dojo.dom.getAncestorsByTag(node,tag,true);
};
dojo.dom.isDescendantOf=function(node,_316,_317){
    if(_317&&node){
        node=node.parentNode;
    }
    while(node){
        if(node==_316){
            return true;
        }
        node=node.parentNode;
    }
    return false;
};
dojo.dom.innerXML=function(node){
    if(node.innerXML){
        return node.innerXML;
    }else{
        if(node.xml){
            return node.xml;
        }else{
            if(typeof XMLSerializer!="undefined"){
                return (new XMLSerializer()).serializeToString(node);
            }
        }
    }
};
dojo.dom.createDocument=function(){
    var doc=null;
    var _31a=dojo.doc();
    if(!dj_undef("ActiveXObject")){
        var _31b=["MSXML2","Microsoft","MSXML","MSXML3"];
        for(var i=0;i<_31b.length;i++){
            try{
                doc=new ActiveXObject(_31b[i]+".XMLDOM");
            }
            catch(e){
            }
            if(doc){
                break;
            }
        }
    }else{
        if((_31a.implementation)&&(_31a.implementation.createDocument)){
            doc=_31a.implementation.createDocument("","",null);
        }
    }
    return doc;
};
dojo.dom.createDocumentFromText=function(str,_31e){
    if(!_31e){
        _31e="text/xml";
    }
    if(!dj_undef("DOMParser")){
        var _31f=new DOMParser();
        return _31f.parseFromString(str,_31e);
    }else{
        if(!dj_undef("ActiveXObject")){
            var _320=dojo.dom.createDocument();
            if(_320){
                _320.async=false;
                _320.loadXML(str);
                return _320;
            }else{
                dojo.debug("toXml didn't work?");
            }
        }else{
            var _321=dojo.doc();
            if(_321.createElement){
                var tmp=_321.createElement("xml");
                tmp.innerHTML=str;
                if(_321.implementation&&_321.implementation.createDocument){
                    var _323=_321.implementation.createDocument("foo","",null);
                    for(var i=0;i<tmp.childNodes.length;i++){
                        _323.importNode(tmp.childNodes.item(i),true);
                    }
                    return _323;
                }
                return ((tmp.document)&&(tmp.document.firstChild?tmp.document.firstChild:tmp));
            }
        }
    }
    return null;
};
dojo.dom.prependChild=function(node,_326){
    if(_326.firstChild){
        _326.insertBefore(node,_326.firstChild);
    }else{
        _326.appendChild(node);
    }
    return true;
};
dojo.dom.insertBefore=function(node,ref,_329){
    if(_329!=true&&(node===ref||node.nextSibling===ref)){
        return false;
    }
    var _32a=ref.parentNode;
    _32a.insertBefore(node,ref);
    return true;
};
dojo.dom.insertAfter=function(node,ref,_32d){
    var pn=ref.parentNode;
    if(ref==pn.lastChild){
        if((_32d!=true)&&(node===ref)){
            return false;
        }
        pn.appendChild(node);
    }else{
        return this.insertBefore(node,ref.nextSibling,_32d);
    }
    return true;
};
dojo.dom.insertAtPosition=function(node,ref,_331){
    if((!node)||(!ref)||(!_331)){
        return false;
    }
    switch(_331.toLowerCase()){
        case "before":
            return dojo.dom.insertBefore(node,ref);
        case "after":
            return dojo.dom.insertAfter(node,ref);
        case "first":
            if(ref.firstChild){
                return dojo.dom.insertBefore(node,ref.firstChild);
            }else{
                ref.appendChild(node);
                return true;
            }
            break;
        default:
            ref.appendChild(node);
            return true;
    }
};
dojo.dom.insertAtIndex=function(node,_333,_334){
    var _335=_333.childNodes;
    if(!_335.length){
        _333.appendChild(node);
        return true;
    }
    var _336=null;
    for(var i=0;i<_335.length;i++){
        var _338=_335.item(i)["getAttribute"]?parseInt(_335.item(i).getAttribute("dojoinsertionindex")):-1;
        if(_338<_334){
            _336=_335.item(i);
        }
    }
    if(_336){
        return dojo.dom.insertAfter(node,_336);
    }else{
        return dojo.dom.insertBefore(node,_335.item(0));
    }
};
dojo.dom.textContent=function(node,text){
    if(arguments.length>1){
        var _33b=dojo.doc();
        dojo.dom.replaceChildren(node,_33b.createTextNode(text));
        return text;
    }else{
        if(node.textContent!=undefined){
            return node.textContent;
        }
        var _33c="";
        if(node==null){
            return _33c;
        }
        for(var i=0;i<node.childNodes.length;i++){
            switch(node.childNodes[i].nodeType){
                case 1:
                case 5:
                    _33c+=dojo.dom.textContent(node.childNodes[i]);
                    break;
                case 3:
                case 2:
                case 4:
                    _33c+=node.childNodes[i].nodeValue;
                    break;
                default:
                    break;
            }
        }
        return _33c;
    }
};
dojo.dom.hasParent=function(node){
    return node&&node.parentNode&&dojo.dom.isNode(node.parentNode);
};
dojo.dom.isTag=function(node){
    if(node&&node.tagName){
        for(var i=1;i<arguments.length;i++){
            if(node.tagName==String(arguments[i])){
                return String(arguments[i]);
            }
        }
    }
    return "";
};
dojo.dom.setAttributeNS=function(elem,_342,_343,_344){
    if(elem==null||((elem==undefined)&&(typeof elem=="undefined"))){
        dojo.raise("No element given to dojo.dom.setAttributeNS");
    }
    if(!((elem.setAttributeNS==undefined)&&(typeof elem.setAttributeNS=="undefined"))){
        elem.setAttributeNS(_342,_343,_344);
    }else{
        var _345=elem.ownerDocument;
        var _346=_345.createNode(2,_343,_342);
        _346.nodeValue=_344;
        elem.setAttributeNode(_346);
    }
};
dojo.provide("dojo.html.style");
dojo.html.getClass=function(node){
    node=dojo.byId(node);
    if(!node){
        return "";
    }
    var cs="";
    if(node.className){
        cs=node.className;
    }else{
        if(dojo.html.hasAttribute(node,"class")){
            cs=dojo.html.getAttribute(node,"class");
        }
    }
    return cs.replace(/^\s+|\s+$/g,"");
};
dojo.html.getClasses=function(node){
    var c=dojo.html.getClass(node);
    return (c=="")?[]:c.split(/\s+/g);
};
dojo.html.hasClass=function(node,_34c){
    return (new RegExp("(^|\\s+)"+_34c+"(\\s+|$)")).test(dojo.html.getClass(node));
};
dojo.html.prependClass=function(node,_34e){
    _34e+=" "+dojo.html.getClass(node);
    return dojo.html.setClass(node,_34e);
};
dojo.html.addClass=function(node,_350){
    if(dojo.html.hasClass(node,_350)){
        return false;
    }
    _350=(dojo.html.getClass(node)+" "+_350).replace(/^\s+|\s+$/g,"");
    return dojo.html.setClass(node,_350);
};
dojo.html.setClass=function(node,_352){
    node=dojo.byId(node);
    var cs=new String(_352);
    try{
        if(typeof node.className=="string"){
            node.className=cs;
        }else{
            if(node.setAttribute){
                node.setAttribute("class",_352);
                node.className=cs;
            }else{
                return false;
            }
        }
    }
    catch(e){
        dojo.debug("dojo.html.setClass() failed",e);
    }
    return true;
};
dojo.html.removeClass=function(node,_355,_356){
    try{
        if(!_356){
            var _357=dojo.html.getClass(node).replace(new RegExp("(^|\\s+)"+_355+"(\\s+|$)"),"$1$2");
        }else{
            var _357=dojo.html.getClass(node).replace(_355,"");
        }
        dojo.html.setClass(node,_357);
    }
    catch(e){
        dojo.debug("dojo.html.removeClass() failed",e);
    }
    return true;
};
dojo.html.replaceClass=function(node,_359,_35a){
    dojo.html.removeClass(node,_35a);
    dojo.html.addClass(node,_359);
};
dojo.html.classMatchType={ContainsAll:0,ContainsAny:1,IsOnly:2};
dojo.html.getElementsByClass=function(_35b,_35c,_35d,_35e,_35f){
    var _360=dojo.doc();
    _35c=dojo.byId(_35c)||_360;
    var _361=_35b.split(/\s+/g);
    var _362=[];
    if(_35e!=1&&_35e!=2){
        _35e=0;
    }
    var _363=new RegExp("(\\s|^)(("+_361.join(")|(")+"))(\\s|$)");
    var _364=_361.join(" ").length;
    var _365=[];
    if(!_35f&&_360.evaluate){
        var _366=".//"+(_35d||"*")+"[contains(";
        if(_35e!=dojo.html.classMatchType.ContainsAny){
            _366+="concat(' ',@class,' '), ' "+_361.join(" ') and contains(concat(' ',@class,' '), ' ")+" ')";
            if(_35e==2){
                _366+=" and string-length(@class)="+_364+"]";
            }else{
                _366+="]";
            }
        }else{
            _366+="concat(' ',@class,' '), ' "+_361.join(" ') or contains(concat(' ',@class,' '), ' ")+" ')]";
        }
        var _367=_360.evaluate(_366,_35c,null,XPathResult.ANY_TYPE,null);
        var _368=_367.iterateNext();
        while(_368){
            try{
                _365.push(_368);
                _368=_367.iterateNext();
            }
            catch(e){
                break;
            }
        }
        return _365;
    }else{
        if(!_35d){
            _35d="*";
        }
        _365=_35c.getElementsByTagName(_35d);
        var node,i=0;
        outer:
        while(node=_365[i++]){
            var _36a=dojo.html.getClasses(node);
            if(_36a.length==0){
                continue outer;
            }
            var _36b=0;
            for(var j=0;j<_36a.length;j++){
                if(_363.test(_36a[j])){
                    if(_35e==dojo.html.classMatchType.ContainsAny){
                        _362.push(node);
                        continue outer;
                    }else{
                        _36b++;
                    }
                }else{
                    if(_35e==dojo.html.classMatchType.IsOnly){
                        continue outer;
                    }
                }
            }
            if(_36b==_361.length){
                if((_35e==dojo.html.classMatchType.IsOnly)&&(_36b==_36a.length)){
                    _362.push(node);
                }else{
                    if(_35e==dojo.html.classMatchType.ContainsAll){
                        _362.push(node);
                    }
                }
            }
        }
        return _362;
    }
};
dojo.html.getElementsByClassName=dojo.html.getElementsByClass;
dojo.html.toCamelCase=function(_36d){
    var arr=_36d.split("-"),cc=arr[0];
    for(var i=1;i<arr.length;i++){
        cc+=arr[i].charAt(0).toUpperCase()+arr[i].substring(1);
    }
    return cc;
};
dojo.html.toSelectorCase=function(_370){
    return _370.replace(/([A-Z])/g,"-$1").toLowerCase();
};
dojo.html.getComputedStyle=function(node,_372,_373){
    node=dojo.byId(node);
    var _372=dojo.html.toSelectorCase(_372);
    var _374=dojo.html.toCamelCase(_372);
    if(!node||!node.style){
        return _373;
    }else{
        if(document.defaultView&&dojo.dom.isDescendantOf(node,node.ownerDocument)){
            try{
                var cs=document.defaultView.getComputedStyle(node,"");
                if(cs){
                    return cs.getPropertyValue(_372);
                }
            }
            catch(e){
                if(node.style.getPropertyValue){
                    return node.style.getPropertyValue(_372);
                }else{
                    return _373;
                }
            }
        }else{
            if(node.currentStyle){
                return node.currentStyle[_374];
            }
        }
    }
    if(node.style.getPropertyValue){
        return node.style.getPropertyValue(_372);
    }else{
        return _373;
    }
};
dojo.html.getStyleProperty=function(node,_377){
    node=dojo.byId(node);
    return (node&&node.style?node.style[dojo.html.toCamelCase(_377)]:undefined);
};
dojo.html.getStyle=function(node,_379){
    var _37a=dojo.html.getStyleProperty(node,_379);
    return (_37a?_37a:dojo.html.getComputedStyle(node,_379));
};
dojo.html.setStyle=function(node,_37c,_37d){
    node=dojo.byId(node);
    if(node&&node.style){
        var _37e=dojo.html.toCamelCase(_37c);
        node.style[_37e]=_37d;
    }
};
dojo.html.copyStyle=function(_37f,_380){
    if(!_380.style.cssText){
        _37f.setAttribute("style",_380.getAttribute("style"));
    }else{
        _37f.style.cssText=_380.style.cssText;
    }
    dojo.html.addClass(_37f,dojo.html.getClass(_380));
};
dojo.html.getUnitValue=function(node,_382,_383){
    var s=dojo.html.getComputedStyle(node,_382);
    if((!s)||((s=="auto")&&(_383))){
        return {value:0,units:"px"};
    }
    var _385=s.match(/(\-?[\d.]+)([a-z%]*)/i);
    if(!_385){
        return dojo.html.getUnitValue.bad;
    }
    return {value:Number(_385[1]),units:_385[2].toLowerCase()};
};
dojo.html.getUnitValue.bad={value:NaN,units:""};
dojo.html.getPixelValue=function(node,_387,_388){
    var _389=dojo.html.getUnitValue(node,_387,_388);
    if(isNaN(_389.value)){
        return 0;
    }
    if((_389.value)&&(_389.units!="px")){
        return NaN;
    }
    return _389.value;
};
dojo.html.setPositivePixelValue=function(node,_38b,_38c){
    if(isNaN(_38c)){
        return false;
    }
    node.style[_38b]=Math.max(0,_38c)+"px";
    return true;
};
dojo.html.styleSheet=null;
dojo.html.insertCssRule=function(_38d,_38e,_38f){
    if(!dojo.html.styleSheet){
        if(document.createStyleSheet){
            dojo.html.styleSheet=document.createStyleSheet();
        }else{
            if(document.styleSheets[0]){
                dojo.html.styleSheet=document.styleSheets[0];
            }else{
                return null;
            }
        }
    }
    if(arguments.length<3){
        if(dojo.html.styleSheet.cssRules){
            _38f=dojo.html.styleSheet.cssRules.length;
        }else{
            if(dojo.html.styleSheet.rules){
                _38f=dojo.html.styleSheet.rules.length;
            }else{
                return null;
            }
        }
    }
    if(dojo.html.styleSheet.insertRule){
        var rule=_38d+" { "+_38e+" }";
        return dojo.html.styleSheet.insertRule(rule,_38f);
    }else{
        if(dojo.html.styleSheet.addRule){
            return dojo.html.styleSheet.addRule(_38d,_38e,_38f);
        }else{
            return null;
        }
    }
};
dojo.html.removeCssRule=function(_391){
    if(!dojo.html.styleSheet){
        dojo.debug("no stylesheet defined for removing rules");
        return false;
    }
    if(dojo.html.render.ie){
        if(!_391){
            _391=dojo.html.styleSheet.rules.length;
            dojo.html.styleSheet.removeRule(_391);
        }
    }else{
        if(document.styleSheets[0]){
            if(!_391){
                _391=dojo.html.styleSheet.cssRules.length;
            }
            dojo.html.styleSheet.deleteRule(_391);
        }
    }
    return true;
};
dojo.html._insertedCssFiles=[];
dojo.html.insertCssFile=function(URI,doc,_394){
    if(!URI){
        return;
    }
    if(!doc){
        doc=document;
    }
    var _395=dojo.hostenv.getText(URI);
    _395=dojo.html.fixPathsInCssText(_395,URI);
    if(_394){
        var idx=-1,node,ent=dojo.html._insertedCssFiles;
        for(var i=0;i<ent.length;i++){
            if((ent[i].doc==doc)&&(ent[i].cssText==_395)){
                idx=i;
                node=ent[i].nodeRef;
                break;
            }
        }
        if(node){
            var _398=doc.getElementsByTagName("style");
            for(var i=0;i<_398.length;i++){
                if(_398[i]==node){
                    return;
                }
            }
            dojo.html._insertedCssFiles.shift(idx,1);
        }
    }
    var _399=dojo.html.insertCssText(_395);
    dojo.html._insertedCssFiles.push({"doc":doc,"cssText":_395,"nodeRef":_399});
    if(_399&&djConfig.isDebug){
        _399.setAttribute("dbgHref",URI);
    }
    return _399;
};
dojo.html.insertCssText=function(_39a,doc,URI){
    if(!_39a){
        return;
    }
    if(!doc){
        doc=document;
    }
    if(URI){
        _39a=dojo.html.fixPathsInCssText(_39a,URI);
    }
    var _39d=doc.createElement("style");
    _39d.setAttribute("type","text/css");
    var head=doc.getElementsByTagName("head")[0];
    if(!head){
        dojo.debug("No head tag in document, aborting styles");
        return;
    }else{
        head.appendChild(_39d);
    }
    if(_39d.styleSheet){
        _39d.styleSheet.cssText=_39a;
    }else{
        var _39f=doc.createTextNode(_39a);
        _39d.appendChild(_39f);
    }
    return _39d;
};
dojo.html.fixPathsInCssText=function(_3a0,URI){
    if(!_3a0||!URI){
        return;
    }
    var _3a2,str="",url="";
    var _3a3=/url\(\s*([\t\s\w()\/.\\'"-:#=&?]+)\s*\)/;
    var _3a4=/(file|https?|ftps?):\/\//;
    var _3a5=/^[\s]*(['"]?)([\w()\/.\\'"-:#=&?]*)\1[\s]*?$/;
    while(_3a2=_3a3.exec(_3a0)){
        url=_3a2[1].replace(_3a5,"$2");
        if(!_3a4.exec(url)){
            url=(new dojo.uri.Uri(URI,url).toString());
        }
        str+=_3a0.substring(0,_3a2.index)+"url("+url+")";
        _3a0=_3a0.substr(_3a2.index+_3a2[0].length);
    }
    return str+_3a0;
};
dojo.html.setActiveStyleSheet=function(_3a6){
    var i=0,a,els=dojo.doc().getElementsByTagName("link");
    while(a=els[i++]){
        if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")){
            a.disabled=true;
            if(a.getAttribute("title")==_3a6){
                a.disabled=false;
            }
        }
    }
};
dojo.html.getActiveStyleSheet=function(){
    var i=0,a,els=dojo.doc().getElementsByTagName("link");
    while(a=els[i++]){
        if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")&&!a.disabled){
            return a.getAttribute("title");
        }
    }
    return null;
};
dojo.html.getPreferredStyleSheet=function(){
    var i=0,a,els=dojo.doc().getElementsByTagName("link");
    while(a=els[i++]){
        if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("rel").indexOf("alt")==-1&&a.getAttribute("title")){
            return a.getAttribute("title");
        }
    }
    return null;
};
dojo.provide("dojo.xml.Parse");
dojo.xml.Parse=function(){
    function getDojoTagName(node){
        var _3ab=node.tagName;
        if(dojo.render.html.capable&&dojo.render.html.ie&&node.scopeName!="HTML"){
            _3ab=node.scopeName+":"+_3ab;
        }
        if(_3ab.substr(0,5).toLowerCase()=="dojo:"){
            return _3ab.toLowerCase();
        }
        if(_3ab.substr(0,4).toLowerCase()=="dojo"){
            return "dojo:"+_3ab.substring(4).toLowerCase();
        }
        var djt=node.getAttribute("dojoType")||node.getAttribute("dojotype");
        if(djt){
            if(djt.indexOf(":")<0){
                djt="dojo:"+djt;
            }
            return djt.toLowerCase();
        }
        if(node.getAttributeNS&&node.getAttributeNS(dojo.dom.dojoml,"type")){
            return "dojo:"+node.getAttributeNS(dojo.dom.dojoml,"type").toLowerCase();
        }
        try{
            djt=node.getAttribute("dojo:type");
        }
        catch(e){
        }
        if(djt){
            return "dojo:"+djt.toLowerCase();
        }
        if(!dj_global["djConfig"]||!djConfig["ignoreClassNames"]){
            var _3ad=node.className||node.getAttribute("class");
            if(_3ad&&_3ad.indexOf&&_3ad.indexOf("dojo-")!=-1){
                var _3ae=_3ad.split(" ");
                for(var x=0;x<_3ae.length;x++){
                    if(_3ae[x].length>5&&_3ae[x].indexOf("dojo-")>=0){
                        return "dojo:"+_3ae[x].substr(5).toLowerCase();
                    }
                }
            }
        }
        return _3ab.toLowerCase();
    }
    this.parseElement=function(node,_3b1,_3b2,_3b3){
        var _3b4={};
        if(node.tagName&&node.tagName.indexOf("/")==0){
            return null;
        }
        var _3b5=getDojoTagName(node);
        _3b4[_3b5]=[];
        if(_3b5.substr(0,4).toLowerCase()=="dojo"){
            _3b4.namespace="dojo";
        }else{
            var pos=_3b5.indexOf(":");
            if(pos>0){
                _3b4.namespace=_3b5.substring(0,pos);
            }
        }
        var _3b7=false;
        if(!_3b2){
            _3b7=true;
        }else{
            if(_3b4.namespace&&dojo.getNamespace(_3b4.namespace)){
                _3b7=true;
            }else{
                if(dojo.widget.tags[_3b5]){
                    dojo.deprecated("dojo.xml.Parse.parseElement","Widgets should be placed in a defined namespace","0.5");
                    _3b7=true;
                }
            }
        }
        if(_3b7){
            var _3b8=this.parseAttributes(node);
            for(var attr in _3b8){
                if((!_3b4[_3b5][attr])||(typeof _3b4[_3b5][attr]!="array")){
                    _3b4[_3b5][attr]=[];
                }
                _3b4[_3b5][attr].push(_3b8[attr]);
            }
            _3b4[_3b5].nodeRef=node;
            _3b4.tagName=_3b5;
            _3b4.index=_3b3||0;
        }
        var _3ba=0;
        for(var i=0;i<node.childNodes.length;i++){
            var tcn=node.childNodes.item(i);
            switch(tcn.nodeType){
                case dojo.dom.ELEMENT_NODE:
                    _3ba++;
                    var ctn=getDojoTagName(tcn);
                    if(!_3b4[ctn]){
                        _3b4[ctn]=[];
                    }
                    _3b4[ctn].push(this.parseElement(tcn,true,_3b2,_3ba));
                    if((tcn.childNodes.length==1)&&(tcn.childNodes.item(0).nodeType==dojo.dom.TEXT_NODE)){
                        _3b4[ctn][_3b4[ctn].length-1].value=tcn.childNodes.item(0).nodeValue;
                    }
                    break;
                case dojo.dom.TEXT_NODE:
                    if(node.childNodes.length==1){
                        _3b4[_3b5].push({value:node.childNodes.item(0).nodeValue});
                    }
                    break;
                default:
                    break;
            }
        }
        return _3b4;
    };
    this.parseAttributes=function(node){
        var _3bf={};
        var atts=node.attributes;
        var _3c1,i=0;
        while((_3c1=atts[i++])){
            if((dojo.render.html.capable)&&(dojo.render.html.ie)){
                if(!_3c1){
                    continue;
                }
                if((typeof _3c1=="object")&&(typeof _3c1.nodeValue=="undefined")||(_3c1.nodeValue==null)||(_3c1.nodeValue=="")){
                    continue;
                }
            }
            var nn=_3c1.nodeName.split(":");
            nn=(nn.length==2)?nn[1]:_3c1.nodeName;
            _3bf[nn]={value:_3c1.nodeValue};
        }
        return _3bf;
    };
};
dojo.provide("dojo.uri.Uri");
dojo.uri=new function(){
    this.dojoUri=function(uri){
        return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri(),uri);
    };
    this.nsUri=function(_3c4,uri){
        var ns=dojo.getNamespace(_3c4);
        if(!ns){
            return null;
        }
        var loc=ns.location;
        if(loc.lastIndexOf("/")!=loc.length-1){
            loc+="/";
        }
        return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri()+loc,uri);
    };
    this.Uri=function(){
        var uri=arguments[0];
        for(var i=1;i<arguments.length;i++){
            if(!arguments[i]){
                continue;
            }
            var _3ca=new dojo.uri.Uri(arguments[i].toString());
            var _3cb=new dojo.uri.Uri(uri.toString());
            if(_3ca.path==""&&_3ca.scheme==null&&_3ca.authority==null&&_3ca.query==null){
                if(_3ca.fragment!=null){
                    _3cb.fragment=_3ca.fragment;
                }
                _3ca=_3cb;
            }else{
                if(_3ca.scheme==null){
                    _3ca.scheme=_3cb.scheme;
                    if(_3ca.authority==null){
                        _3ca.authority=_3cb.authority;
                        if(_3ca.path.charAt(0)!="/"){
                            var path=_3cb.path.substring(0,_3cb.path.lastIndexOf("/")+1)+_3ca.path;
                            var segs=path.split("/");
                            for(var j=0;j<segs.length;j++){
                                if(segs[j]=="."){
                                    if(j==segs.length-1){
                                        segs[j]="";
                                    }else{
                                        segs.splice(j,1);
                                        j--;
                                    }
                                }else{
                                    if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
                                        if(j==segs.length-1){
                                            segs.splice(j,1);
                                            segs[j-1]="";
                                        }else{
                                            segs.splice(j-1,2);
                                            j-=2;
                                        }
                                    }
                                }
                            }
                            _3ca.path=segs.join("/");
                        }
                    }
                }
            }
            uri="";
            if(_3ca.scheme!=null){
                uri+=_3ca.scheme+":";
            }
            if(_3ca.authority!=null){
                uri+="//"+_3ca.authority;
            }
            uri+=_3ca.path;
            if(_3ca.query!=null){
                uri+="?"+_3ca.query;
            }
            if(_3ca.fragment!=null){
                uri+="#"+_3ca.fragment;
            }
        }
        this.uri=uri.toString();
        var _3cf="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
        var r=this.uri.match(new RegExp(_3cf));
        this.scheme=r[2]||(r[1]?"":null);
        this.authority=r[4]||(r[3]?"":null);
        this.path=r[5];
        this.query=r[7]||(r[6]?"":null);
        this.fragment=r[9]||(r[8]?"":null);
        if(this.authority!=null){
            _3cf="^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$";
            r=this.authority.match(new RegExp(_3cf));
            this.user=r[3]||null;
            this.password=r[4]||null;
            this.host=r[5];
            this.port=r[7]||null;
        }
        this.toString=function(){
            return this.uri;
        };
    };
};
dojo.provide("dojo.uri.*");
dojo.provide("dojo.widget.DomWidget");
dojo.widget._cssFiles={};
dojo.widget._cssStrings={};
dojo.widget._templateCache={};
dojo.widget.defaultStrings={dojoRoot:dojo.hostenv.getBaseScriptUri(),baseScriptUri:dojo.hostenv.getBaseScriptUri()};
dojo.widget.buildFromTemplate=function(){
    dojo.lang.forward("fillFromTemplateCache");
};
dojo.widget.fillFromTemplateCache=function(obj,_3d2,_3d3,_3d4){
    var _3d5=_3d2||obj.templatePath;
    if(_3d5&&!(_3d5 instanceof dojo.uri.Uri)){
        _3d5=dojo.uri.dojoUri(_3d5);
        dojo.deprecated("templatePath should be of type dojo.uri.Uri",null,"0.4");
    }
    var _3d6=dojo.widget._templateCache;
    if(!obj["widgetType"]){
        do{
            var _3d7="__dummyTemplate__"+dojo.widget._templateCache.dummyCount++;
        }while(_3d6[_3d7]);
        obj.widgetType=_3d7;
    }
    var wt=obj.widgetType;
    var ts=_3d6[wt];
    if(!ts){
        _3d6[wt]={"string":null,"node":null};
        if(_3d4){
            ts={};
        }else{
            ts=_3d6[wt];
        }
    }
    if((!obj.templateString)&&(!_3d4)){
        obj.templateString=_3d3||ts["string"];
    }
    if((!obj.templateNode)&&(!_3d4)){
        obj.templateNode=ts["node"];
    }
    if((!obj.templateNode)&&(!obj.templateString)&&(_3d5)){
        var _3da=dojo.hostenv.getText(_3d5);
        if(_3da){
            _3da=_3da.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
            var _3db=_3da.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
            if(_3db){
                _3da=_3db[1];
            }
        }else{
            _3da="";
        }
        obj.templateString=_3da;
        if(!_3d4){
            _3d6[wt]["string"]=_3da;
        }
    }
    if((!ts["string"])&&(!_3d4)){
        ts.string=obj.templateString;
    }
};
dojo.widget._templateCache.dummyCount=0;
dojo.widget.attachProperties=["dojoAttachPoint","id"];
dojo.widget.eventAttachProperty="dojoAttachEvent";
dojo.widget.onBuildProperty="dojoOnBuild";
dojo.widget.waiNames=["waiRole","waiState"];
dojo.widget.wai={waiRole:{name:"waiRole",namespace:"http://www.w3.org/TR/xhtml2",alias:"x2",prefix:"wairole:"},waiState:{name:"waiState",namespace:"http://www.w3.org/2005/07/aaa",alias:"aaa",prefix:""},setAttr:function(node,ns,attr,_3df){
    if(dojo.render.html.ie){
        node.setAttribute(this[ns].alias+":"+attr,this[ns].prefix+_3df);
    }else{
        node.setAttributeNS(this[ns].namespace,attr,this[ns].prefix+_3df);
    }
},getAttr:function(node,ns,attr){
    if(dojo.render.html.ie){
        return node.getAttribute(this[ns].alias+":"+attr);
    }else{
        return node.getAttributeNS(this[ns].namespace,attr);
    }
}};
dojo.widget.attachTemplateNodes=function(_3e3,_3e4,_3e5){
    var _3e6=dojo.dom.ELEMENT_NODE;
    function trim(str){
        return str.replace(/^\s+|\s+$/g,"");
    }
    if(!_3e3){
        _3e3=_3e4.domNode;
    }
    if(_3e3.nodeType!=_3e6){
        return;
    }
    var _3e8=_3e3.all||_3e3.getElementsByTagName("*");
    var _3e9=_3e4;
    for(var x=-1;x<_3e8.length;x++){
        var _3eb=(x==-1)?_3e3:_3e8[x];
        var _3ec=[];
        for(var y=0;y<this.attachProperties.length;y++){
            var _3ee=_3eb.getAttribute(this.attachProperties[y]);
            if(_3ee){
                _3ec=_3ee.split(";");
                for(var z=0;z<_3ec.length;z++){
                    if(dojo.lang.isArray(_3e4[_3ec[z]])){
                        _3e4[_3ec[z]].push(_3eb);
                    }else{
                        _3e4[_3ec[z]]=_3eb;
                    }
                }
                break;
            }
        }
        var _3f0=_3eb.getAttribute(this.templateProperty);
        if(_3f0){
            _3e4[_3f0]=_3eb;
        }
        dojo.lang.forEach(dojo.widget.waiNames,function(name){
            var wai=dojo.widget.wai[name];
            var val=_3eb.getAttribute(wai.name);
            if(val){
                if(val.indexOf("-")==-1){
                    dojo.widget.wai.setAttr(_3eb,wai.name,"role",val);
                }else{
                    var _3f4=val.split("-");
                    dojo.widget.wai.setAttr(_3eb,wai.name,_3f4[0],_3f4[1]);
                }
            }
        },this);
        var _3f5=_3eb.getAttribute(this.eventAttachProperty);
        if(_3f5){
            var evts=_3f5.split(";");
            for(var y=0;y<evts.length;y++){
                if((!evts[y])||(!evts[y].length)){
                    continue;
                }
                var _3f7=null;
                var tevt=trim(evts[y]);
                if(evts[y].indexOf(":")>=0){
                    var _3f9=tevt.split(":");
                    tevt=trim(_3f9[0]);
                    _3f7=trim(_3f9[1]);
                }
                if(!_3f7){
                    _3f7=tevt;
                }
                var tf=function(){
                    var ntf=new String(_3f7);
                    return function(evt){
                        if(_3e9[ntf]){
                            _3e9[ntf](dojo.event.browser.fixEvent(evt,this));
                        }
                    };
                }();
                dojo.event.browser.addListener(_3eb,tevt,tf,false,true);
            }
        }
        for(var y=0;y<_3e5.length;y++){
            var _3fd=_3eb.getAttribute(_3e5[y]);
            if((_3fd)&&(_3fd.length)){
                var _3f7=null;
                var _3fe=_3e5[y].substr(4);
                _3f7=trim(_3fd);
                var _3ff=[_3f7];
                if(_3f7.indexOf(";")>=0){
                    _3ff=dojo.lang.map(_3f7.split(";"),trim);
                }
                for(var z=0;z<_3ff.length;z++){
                    if(!_3ff[z].length){
                        continue;
                    }
                    var tf=function(){
                        var ntf=new String(_3ff[z]);
                        return function(evt){
                            if(_3e9[ntf]){
                                _3e9[ntf](dojo.event.browser.fixEvent(evt,this));
                            }
                        };
                    }();
                    dojo.event.browser.addListener(_3eb,_3fe,tf,false,true);
                }
            }
        }
        var _402=_3eb.getAttribute(this.onBuildProperty);
        if(_402){
            eval("var node = baseNode; var widget = targetObj; "+_402);
        }
    }
};
dojo.widget.getDojoEventsFromStr=function(str){
    var re=/(dojoOn([a-z]+)(\s?))=/gi;
    var evts=str?str.match(re)||[]:[];
    var ret=[];
    var lem={};
    for(var x=0;x<evts.length;x++){
        if(evts[x].legth<1){
            continue;
        }
        var cm=evts[x].replace(/\s/,"");
        cm=(cm.slice(0,cm.length-1));
        if(!lem[cm]){
            lem[cm]=true;
            ret.push(cm);
        }
    }
    return ret;
};
dojo.declare("dojo.widget.DomWidget",dojo.widget.Widget,function(){
    if((arguments.length>0)&&(typeof arguments[0]=="object")){
        this.create(arguments[0]);
    }
},{templateNode:null,templateString:null,templateCssString:null,preventClobber:false,domNode:null,containerNode:null,addChild:function(_40a,_40b,pos,ref,_40e){
    if(!this.isContainer){
        dojo.debug("dojo.widget.DomWidget.addChild() attempted on non-container widget");
        return null;
    }else{
        if(_40e==undefined){
            _40e=this.children.length;
        }
        this.addWidgetAsDirectChild(_40a,_40b,pos,ref,_40e);
        this.registerChild(_40a,_40e);
    }
    return _40a;
},addWidgetAsDirectChild:function(_40f,_410,pos,ref,_413){
    if((!this.containerNode)&&(!_410)){
        this.containerNode=this.domNode;
    }
    var cn=(_410)?_410:this.containerNode;
    if(!pos){
        pos="after";
    }
    if(!ref){
        if(!cn){
            cn=dojo.body();
        }
        ref=cn.lastChild;
    }
    if(!_413){
        _413=0;
    }
    _40f.domNode.setAttribute("dojoinsertionindex",_413);
    if(!ref){
        cn.appendChild(_40f.domNode);
    }else{
        if(pos=="insertAtIndex"){
            dojo.dom.insertAtIndex(_40f.domNode,ref.parentNode,_413);
        }else{
            if((pos=="after")&&(ref===cn.lastChild)){
                cn.appendChild(_40f.domNode);
            }else{
                dojo.dom.insertAtPosition(_40f.domNode,cn,pos);
            }
        }
    }
},registerChild:function(_415,_416){
    _415.dojoInsertionIndex=_416;
    var idx=-1;
    for(var i=0;i<this.children.length;i++){
        if(this.children[i].dojoInsertionIndex<_416){
            idx=i;
        }
    }
    this.children.splice(idx+1,0,_415);
    _415.parent=this;
    _415.addedTo(this,idx+1);
    delete dojo.widget.manager.topWidgets[_415.widgetId];
},removeChild:function(_419){
    dojo.dom.removeNode(_419.domNode);
    return dojo.widget.DomWidget.superclass.removeChild.call(this,_419);
},getFragNodeRef:function(frag){
    if(!frag||!frag[this.namespace+":"+this.widgetType.toLowerCase()]){
        dojo.raise("Error: no frag for widget type "+this.widgetType+" with namespace "+this.namespace+", id "+this.widgetId+" (maybe a widget has set it's type incorrectly)");
    }
    return frag?frag[this.namespace+":"+this.widgetType.toLowerCase()]["nodeRef"]:null;
},postInitialize:function(args,frag,_41d){
    var _41e=this.getFragNodeRef(frag);
    if(_41d&&(_41d.snarfChildDomOutput||!_41e)){
        _41d.addWidgetAsDirectChild(this,"","insertAtIndex","",args["dojoinsertionindex"],_41e);
    }else{
        if(_41e){
            if(this.domNode&&(this.domNode!==_41e)){
                var _41f=_41e.parentNode.replaceChild(this.domNode,_41e);
            }
        }
    }
    if(_41d){
        _41d.registerChild(this,args.dojoinsertionindex);
    }else{
        dojo.widget.manager.topWidgets[this.widgetId]=this;
    }
    if(this.isContainer&&!frag["dojoDontFollow"]){
        var _420=dojo.widget.getParser();
        _420.createSubComponents(frag,this);
    }
},buildRendering:function(args,frag){
    var ts=dojo.widget._templateCache[this.widgetType];
    if(args["templatecsspath"]){
        args["templateCssPath"]=args["templatecsspath"];
    }
    var _424=args["templateCssPath"]||this.templateCssPath;
    if(_424&&!(_424 instanceof dojo.uri.Uri)){
        _424=dojo.uri.dojoUri(_424);
        dojo.deprecated("templateCssPath should be of type dojo.uri.Uri",null,"0.4");
    }
    if(_424&&!dojo.widget._cssFiles[_424.toString()]){
        if((!this.templateCssString)&&(_424)){
            this.templateCssString=dojo.hostenv.getText(_424);
            this.templateCssPath=null;
        }
        dojo.widget._cssFiles[_424.toString()]=true;
    }
    if((this["templateCssString"])&&(!this.templateCssString["loaded"])){
        dojo.html.insertCssText(this.templateCssString,null,_424);
        if(!this.templateCssString){
            this.templateCssString="";
        }
        this.templateCssString.loaded=true;
    }
    if((!this.preventClobber)&&((this.templatePath)||(this.templateNode)||((this["templateString"])&&(this.templateString.length))||((typeof ts!="undefined")&&((ts["string"])||(ts["node"]))))){
        this.buildFromTemplate(args,frag);
    }else{
        this.domNode=this.getFragNodeRef(frag);
    }
    this.fillInTemplate(args,frag);
},buildFromTemplate:function(args,frag){
    var _427=false;
    if(args["templatepath"]){
        _427=true;
        args["templatePath"]=args["templatepath"];
    }
    dojo.widget.fillFromTemplateCache(this,args["templatePath"],null,_427);
    var ts=dojo.widget._templateCache[this.widgetType];
    if((ts)&&(!_427)){
        if(!this.templateString.length){
            this.templateString=ts["string"];
        }
        if(!this.templateNode){
            this.templateNode=ts["node"];
        }
    }
    var _429=false;
    var node=null;
    var tstr=this.templateString;
    if((!this.templateNode)&&(this.templateString)){
        _429=this.templateString.match(/\$\{([^\}]+)\}/g);
        if(_429){
            var hash=this.strings||{};
            for(var key in dojo.widget.defaultStrings){
                if(dojo.lang.isUndefined(hash[key])){
                    hash[key]=dojo.widget.defaultStrings[key];
                }
            }
            for(var i=0;i<_429.length;i++){
                var key=_429[i];
                key=key.substring(2,key.length-1);
                var kval=(key.substring(0,5)=="this.")?dojo.lang.getObjPathValue(key.substring(5),this):hash[key];
                var _430;
                if((kval)||(dojo.lang.isString(kval))){
                    _430=(dojo.lang.isFunction(kval))?kval.call(this,key,this.templateString):kval;
                    tstr=tstr.replace(_429[i],_430);
                }
            }
        }else{
            this.templateNode=this.createNodesFromText(this.templateString,true)[0];
            if(!_427){
                ts.node=this.templateNode;
            }
        }
    }
    if((!this.templateNode)&&(!_429)){
        dojo.debug("DomWidget.buildFromTemplate: could not create template");
        return false;
    }else{
        if(!_429){
            node=this.templateNode.cloneNode(true);
            if(!node){
                return false;
            }
        }else{
            node=this.createNodesFromText(tstr,true)[0];
        }
    }
    this.domNode=node;
    this.attachTemplateNodes(this.domNode,this);
    if(this.isContainer&&this.containerNode){
        var src=this.getFragNodeRef(frag);
        if(src){
            dojo.dom.moveChildren(src,this.containerNode);
        }
    }
},attachTemplateNodes:function(_432,_433){
    if(!_433){
        _433=this;
    }
    return dojo.widget.attachTemplateNodes(_432,_433,dojo.widget.getDojoEventsFromStr(this.templateString));
},fillInTemplate:function(){
},destroyRendering:function(){
    try{
        delete this.domNode;
    }
    catch(e){
    }
},cleanUp:function(){
},getContainerHeight:function(){
    dojo.unimplemented("dojo.widget.DomWidget.getContainerHeight");
},getContainerWidth:function(){
    dojo.unimplemented("dojo.widget.DomWidget.getContainerWidth");
},createNodesFromText:function(){
    dojo.unimplemented("dojo.widget.DomWidget.createNodesFromText");
}});
dojo.provide("dojo.html.common");
dojo.lang.mixin(dojo.html,dojo.dom);
dojo.html.body=function(){
    dojo.deprecated("dojo.html.body() moved to dojo.body()","0.5");
    return dojo.body();
};
dojo.html.getEventTarget=function(evt){
    if(!evt){
        evt=dojo.global().event||{};
    }
    var t=(evt.srcElement?evt.srcElement:(evt.target?evt.target:null));
    while((t)&&(t.nodeType!=1)){
        t=t.parentNode;
    }
    return t;
};
dojo.html.getViewport=function(){
    var _436=dojo.global();
    var _437=dojo.doc();
    var w=0;
    var h=0;
    if(dojo.render.html.mozilla){
        w=_437.documentElement.clientWidth;
        h=_436.innerHeight;
    }else{
        if(!dojo.render.html.opera&&_436.innerWidth){
            w=_436.innerWidth;
            h=_436.innerHeight;
        }else{
            if(!dojo.render.html.opera&&dojo.exists(_437,"documentElement.clientWidth")){
                var w2=_437.documentElement.clientWidth;
                if(!w||w2&&w2<w){
                    w=w2;
                }
                h=_437.documentElement.clientHeight;
            }else{
                if(dojo.body().clientWidth){
                    w=dojo.body().clientWidth;
                    h=dojo.body().clientHeight;
                }
            }
        }
    }
    return {width:w,height:h};
};
dojo.html.getScroll=function(){
    var _43b=dojo.global();
    var _43c=dojo.doc();
    var top=_43b.pageYOffset||_43c.documentElement.scrollTop||dojo.body().scrollTop||0;
    var left=_43b.pageXOffset||_43c.documentElement.scrollLeft||dojo.body().scrollLeft||0;
    return {top:top,left:left,offset:{x:left,y:top}};
};
dojo.html.getParentByType=function(node,type){
    var _441=dojo.doc();
    var _442=dojo.byId(node);
    type=type.toLowerCase();
    while((_442)&&(_442.nodeName.toLowerCase()!=type)){
        if(_442==(_441["body"]||_441["documentElement"])){
            return null;
        }
        _442=_442.parentNode;
    }
    return _442;
};
dojo.html.getAttribute=function(node,attr){
    node=dojo.byId(node);
    if((!node)||(!node.getAttribute)){
        return null;
    }
    var ta=typeof attr=="string"?attr:new String(attr);
    var v=node.getAttribute(ta.toUpperCase());
    if((v)&&(typeof v=="string")&&(v!="")){
        return v;
    }
    if(v&&v.value){
        return v.value;
    }
    if((node.getAttributeNode)&&(node.getAttributeNode(ta))){
        return (node.getAttributeNode(ta)).value;
    }else{
        if(node.getAttribute(ta)){
            return node.getAttribute(ta);
        }else{
            if(node.getAttribute(ta.toLowerCase())){
                return node.getAttribute(ta.toLowerCase());
            }
        }
    }
    return null;
};
dojo.html.hasAttribute=function(node,attr){
    return dojo.html.getAttribute(dojo.byId(node),attr)?true:false;
};
dojo.html.getCursorPosition=function(e){
    e=e||dojo.global().event;
    var _44a={x:0,y:0};
    if(e.pageX||e.pageY){
        _44a.x=e.pageX;
        _44a.y=e.pageY;
    }else{
        var de=dojo.doc().documentElement;
        var db=dojo.body();
        _44a.x=e.clientX+((de||db)["scrollLeft"])-((de||db)["clientLeft"]);
        _44a.y=e.clientY+((de||db)["scrollTop"])-((de||db)["clientTop"]);
    }
    return _44a;
};
dojo.html.isTag=function(node){
    node=dojo.byId(node);
    if(node&&node.tagName){
        for(var i=1;i<arguments.length;i++){
            if(node.tagName.toLowerCase()==String(arguments[i]).toLowerCase()){
                return String(arguments[i]).toLowerCase();
            }
        }
    }
    return "";
};
if(dojo.render.html.ie){
    if(window.location.href.substr(0,6).toLowerCase()!="https:"){
        (function(){
            var _44f=dojo.doc().createElement("script");
            _44f.src="javascript:'dojo.html.createExternalElement=function(doc, tag){ return doc.createElement(tag); }'";
            dojo.doc().getElementsByTagName("head")[0].appendChild(_44f);
        })();
    }
}else{
    dojo.html.createExternalElement=function(doc,tag){
        return doc.createElement(tag);
    };
}
dojo.html._callDeprecated=function(_452,_453,args,_455,_456){
    dojo.deprecated("dojo.html."+_452,"replaced by dojo.html."+_453+"("+(_455?"node, {"+_455+": "+_455+"}":"")+")"+(_456?"."+_456:""),"0.5");
    var _457=[];
    if(_455){
        var _458={};
        _458[_455]=args[1];
        _457.push(args[0]);
        _457.push(_458);
    }else{
        _457=args;
    }
    var ret=dojo.html[_453].apply(dojo.html,args);
    if(_456){
        return ret[_456];
    }else{
        return ret;
    }
};
dojo.html.getViewportWidth=function(){
    return dojo.html._callDeprecated("getViewportWidth","getViewport",arguments,null,"width");
};
dojo.html.getViewportHeight=function(){
    return dojo.html._callDeprecated("getViewportHeight","getViewport",arguments,null,"height");
};
dojo.html.getViewportSize=function(){
    return dojo.html._callDeprecated("getViewportSize","getViewport",arguments);
};
dojo.html.getScrollTop=function(){
    return dojo.html._callDeprecated("getScrollTop","getScroll",arguments,null,"top");
};
dojo.html.getScrollLeft=function(){
    return dojo.html._callDeprecated("getScrollLeft","getScroll",arguments,null,"left");
};
dojo.html.getScrollOffset=function(){
    return dojo.html._callDeprecated("getScrollOffset","getScroll",arguments,null,"offset");
};
dojo.provide("dojo.html.layout");
dojo.html.sumAncestorProperties=function(node,prop){
    node=dojo.byId(node);
    if(!node){
        return 0;
    }
    var _45c=0;
    while(node){
        if(dojo.html.getComputedStyle(node,"position")=="fixed"){
            return 0;
        }
        var val=node[prop];
        if(val){
            _45c+=val-0;
            if(node==dojo.body()){
                break;
            }
        }
        node=node.parentNode;
    }
    return _45c;
};
dojo.html.setStyleAttributes=function(node,_45f){
    node=dojo.byId(node);
    var _460=_45f.replace(/(;)?\s*$/,"").split(";");
    for(var i=0;i<_460.length;i++){
        var _462=_460[i].split(":");
        var name=_462[0].replace(/\s*$/,"").replace(/^\s*/,"").toLowerCase();
        var _464=_462[1].replace(/\s*$/,"").replace(/^\s*/,"");
        switch(name){
            case "opacity":
                dojo.html.setOpacity(node,_464);
                break;
            case "content-height":
                dojo.html.setContentBox(node,{height:_464});
                break;
            case "content-width":
                dojo.html.setContentBox(node,{width:_464});
                break;
            case "outer-height":
                dojo.html.setMarginBox(node,{height:_464});
                break;
            case "outer-width":
                dojo.html.setMarginBox(node,{width:_464});
                break;
            default:
                node.style[dojo.html.toCamelCase(name)]=_464;
        }
    }
};
dojo.html.boxSizing={MARGIN_BOX:"margin-box",BORDER_BOX:"border-box",PADDING_BOX:"padding-box",CONTENT_BOX:"content-box"};
dojo.html.getAbsolutePosition=dojo.html.abs=function(node,_466,_467){
    node=dojo.byId(node,node.ownerDocument);
    var ret={x:0,y:0};
    var bs=dojo.html.boxSizing;
    if(!_467){
        _467=bs.CONTENT_BOX;
    }
    var _46a=2;
    var _46b;
    switch(_467){
        case bs.MARGIN_BOX:
            _46b=3;
            break;
        case bs.BORDER_BOX:
            _46b=2;
            break;
        case bs.PADDING_BOX:
        default:
            _46b=1;
            break;
        case bs.CONTENT_BOX:
            _46b=0;
            break;
    }
    var h=dojo.render.html;
    var db=document["body"]||document["documentElement"];
    if(h.ie){
        with(node.getBoundingClientRect()){
            ret.x=left-2;
            ret.y=top-2;
        }
    }else{
        if(document.getBoxObjectFor){
            _46a=1;
            try{
                var bo=document.getBoxObjectFor(node);
                ret.x=bo.x-dojo.html.sumAncestorProperties(node,"scrollLeft");
                ret.y=bo.y-dojo.html.sumAncestorProperties(node,"scrollTop");
            }
            catch(e){
            }
        }else{
            if(node["offsetParent"]){
                var _46f;
                if((h.safari)&&(node.style.getPropertyValue("position")=="absolute")&&(node.parentNode==db)){
                    _46f=db;
                }else{
                    _46f=db.parentNode;
                }
                if(node.parentNode!=db){
                    var nd=node;
                    if(dojo.render.html.opera){
                        nd=db;
                    }
                    ret.x-=dojo.html.sumAncestorProperties(nd,"scrollLeft");
                    ret.y-=dojo.html.sumAncestorProperties(nd,"scrollTop");
                }
                var _471=node;
                do{
                    var n=_471["offsetLeft"];
                    if(!h.opera||n>0){
                        ret.x+=isNaN(n)?0:n;
                    }
                    var m=_471["offsetTop"];
                    ret.y+=isNaN(m)?0:m;
                    _471=_471.offsetParent;
                }while((_471!=_46f)&&(_471!=null));
            }else{
                if(node["x"]&&node["y"]){
                    ret.x+=isNaN(node.x)?0:node.x;
                    ret.y+=isNaN(node.y)?0:node.y;
                }
            }
        }
    }
    if(_466){
        var _474=dojo.html.getScroll();
        ret.y+=_474.top;
        ret.x+=_474.left;
    }
    var _475=[dojo.html.getPaddingExtent,dojo.html.getBorderExtent,dojo.html.getMarginExtent];
    if(_46a>_46b){
        for(var i=_46b;i<_46a;++i){
            ret.y+=_475[i](node,"top");
            ret.x+=_475[i](node,"left");
        }
    }else{
        if(_46a<_46b){
            for(var i=_46b;i>_46a;--i){
                ret.y-=_475[i-1](node,"top");
                ret.x-=_475[i-1](node,"left");
            }
        }
    }
    ret.top=ret.y;
    ret.left=ret.x;
    return ret;
};
dojo.html.isPositionAbsolute=function(node){
    return (dojo.html.getComputedStyle(node,"position")=="absolute");
};
dojo.html._sumPixelValues=function(node,_479,_47a){
    var _47b=0;
    for(var x=0;x<_479.length;x++){
        _47b+=dojo.html.getPixelValue(node,_479[x],_47a);
    }
    return _47b;
};
dojo.html.getMargin=function(node){
    return {width:dojo.html._sumPixelValues(node,["margin-left","margin-right"],(dojo.html.getComputedStyle(node,"position")=="absolute")),height:dojo.html._sumPixelValues(node,["margin-top","margin-bottom"],(dojo.html.getComputedStyle(node,"position")=="absolute"))};
};
dojo.html.getBorder=function(node){
    return {width:dojo.html.getBorderExtent(node,"left")+dojo.html.getBorderExtent(node,"right"),height:dojo.html.getBorderExtent(node,"top")+dojo.html.getBorderExtent(node,"bottom")};
};
dojo.html.getBorderExtent=function(node,side){
    return (dojo.html.getStyle(node,"border-"+side+"-style")=="none"?0:dojo.html.getPixelValue(node,"border-"+side+"-width"));
};
dojo.html.getMarginExtent=function(node,side){
    return dojo.html._sumPixelValues(node,["margin-"+side],dojo.html.isPositionAbsolute(node));
};
dojo.html.getPaddingExtent=function(node,side){
    return dojo.html._sumPixelValues(node,["padding-"+side],true);
};
dojo.html.getPadding=function(node){
    return {width:dojo.html._sumPixelValues(node,["padding-left","padding-right"],true),height:dojo.html._sumPixelValues(node,["padding-top","padding-bottom"],true)};
};
dojo.html.getPadBorder=function(node){
    var pad=dojo.html.getPadding(node);
    var _488=dojo.html.getBorder(node);
    return {width:pad.width+_488.width,height:pad.height+_488.height};
};
dojo.html.getBoxSizing=function(node){
    var h=dojo.render.html;
    var bs=dojo.html.boxSizing;
    if((h.ie)||(h.opera)){
        var cm=document["compatMode"];
        if((cm=="BackCompat")||(cm=="QuirksMode")){
            return bs.BORDER_BOX;
        }else{
            return bs.CONTENT_BOX;
        }
    }else{
        if(arguments.length==0){
            node=document.documentElement;
        }
        var _48d=dojo.html.getStyle(node,"-moz-box-sizing");
        if(!_48d){
            _48d=dojo.html.getStyle(node,"box-sizing");
        }
        return (_48d?_48d:bs.CONTENT_BOX);
    }
};
dojo.html.isBorderBox=function(node){
    return (dojo.html.getBoxSizing(node)==dojo.html.boxSizing.BORDER_BOX);
};
dojo.html.getBorderBox=function(node){
    node=dojo.byId(node);
    return {width:node.offsetWidth,height:node.offsetHeight};
};
dojo.html.getPaddingBox=function(node){
    var box=dojo.html.getBorderBox(node);
    var _492=dojo.html.getBorder(node);
    return {width:box.width-_492.width,height:box.height-_492.height};
};
dojo.html.getContentBox=function(node){
    node=dojo.byId(node);
    var _494=dojo.html.getPadBorder(node);
    return {width:node.offsetWidth-_494.width,height:node.offsetHeight-_494.height};
};
dojo.html.setContentBox=function(node,args){
    node=dojo.byId(node);
    var _497=0;
    var _498=0;
    var isbb=dojo.html.isBorderBox(node);
    var _49a=(isbb?dojo.html.getPadBorder(node):{width:0,height:0});
    var ret={};
    if(typeof args.width!=undefined){
        _497=args.width+_49a.width;
        ret.width=dojo.html.setPositivePixelValue(node,"width",_497);
    }
    if(typeof args.height!=undefined){
        _498=args.height+_49a.height;
        ret.height=dojo.html.setPositivePixelValue(node,"height",_498);
    }
    return ret;
};
dojo.html.getMarginBox=function(node){
    var _49d=dojo.html.getBorderBox(node);
    var _49e=dojo.html.getMargin(node);
    return {width:_49d.width+_49e.width,height:_49d.height+_49e.height};
};
dojo.html.setMarginBox=function(node,args){
    node=dojo.byId(node);
    var _4a1=0;
    var _4a2=0;
    var isbb=dojo.html.isBorderBox(node);
    var _4a4=(!isbb?dojo.html.getPadBorder(node):{width:0,height:0});
    var _4a5=dojo.html.getMargin(node);
    var ret={};
    if(typeof args.width!=undefined){
        _4a1=args.width-_4a4.width;
        _4a1-=_4a5.width;
        ret.width=dojo.html.setPositivePixelValue(node,"width",_4a1);
    }
    if(typeof args.height!=undefined){
        _4a2=args.height-_4a4.height;
        _4a2-=_4a5.height;
        ret.height=dojo.html.setPositivePixelValue(node,"height",_4a2);
    }
    return ret;
};
dojo.html.getElementBox=function(node,type){
    var bs=dojo.html.boxSizing;
    switch(type){
        case bs.MARGIN_BOX:
            return dojo.html.getMarginBox(node);
        case bs.BORDER_BOX:
            return dojo.html.getBorderBox(node);
        case bs.PADDING_BOX:
            return dojo.html.getPaddingBox(node);
        case bs.CONTENT_BOX:
        default:
            return dojo.html.getContentBox(node);
    }
};
dojo.html.toCoordinateObject=dojo.html.toCoordinateArray=function(_4aa,_4ab){
    if(_4aa instanceof Array||typeof _4aa=="array"){
        dojo.deprecated("dojo.html.toCoordinateArray","use dojo.html.toCoordinateObject({left: , top: , width: , height: }) instead","0.5");
        while(_4aa.length<4){
            _4aa.push(0);
        }
        while(_4aa.length>4){
            _4aa.pop();
        }
        var ret={left:_4aa[0],top:_4aa[1],width:_4aa[2],height:_4aa[3]};
    }else{
        if(!_4aa.nodeType&&!(_4aa instanceof String||typeof _4aa=="string")&&("width" in _4aa||"height" in _4aa||"left" in _4aa||"x" in _4aa||"top" in _4aa||"y" in _4aa)){
            var ret={left:_4aa.left||_4aa.x||0,top:_4aa.top||_4aa.y||0,width:_4aa.width||0,height:_4aa.height||0};
        }else{
            var node=dojo.byId(_4aa);
            var pos=dojo.html.abs(node,_4ab);
            var _4af=dojo.html.getMarginBox(node);
            var ret={left:pos.left,top:pos.top,width:_4af.width,height:_4af.height};
        }
    }
    ret.x=ret.left;
    ret.y=ret.top;
    return ret;
};
dojo.html.setMarginBoxWidth=dojo.html.setOuterWidth=function(node,_4b1){
    return dojo.html._callDeprecated("setMarginBoxWidth","setMarginBox",arguments,"width");
};
dojo.html.setMarginBoxHeight=dojo.html.setOuterHeight=function(){
    return dojo.html._callDeprecated("setMarginBoxHeight","setMarginBox",arguments,"height");
};
dojo.html.getMarginBoxWidth=dojo.html.getOuterWidth=function(){
    return dojo.html._callDeprecated("getMarginBoxWidth","getMarginBox",arguments,null,"width");
};
dojo.html.getMarginBoxHeight=dojo.html.getOuterHeight=function(){
    return dojo.html._callDeprecated("getMarginBoxHeight","getMarginBox",arguments,null,"height");
};
dojo.html.getTotalOffset=function(node,type,_4b4){
    return dojo.html._callDeprecated("getTotalOffset","getAbsolutePosition",arguments,null,type);
};
dojo.html.getAbsoluteX=function(node,_4b6){
    return dojo.html._callDeprecated("getAbsoluteX","getAbsolutePosition",arguments,null,"x");
};
dojo.html.getAbsoluteY=function(node,_4b8){
    return dojo.html._callDeprecated("getAbsoluteY","getAbsolutePosition",arguments,null,"y");
};
dojo.html.totalOffsetLeft=function(node,_4ba){
    return dojo.html._callDeprecated("totalOffsetLeft","getAbsolutePosition",arguments,null,"left");
};
dojo.html.totalOffsetTop=function(node,_4bc){
    return dojo.html._callDeprecated("totalOffsetTop","getAbsolutePosition",arguments,null,"top");
};
dojo.html.getMarginWidth=function(node){
    return dojo.html._callDeprecated("getMarginWidth","getMargin",arguments,null,"width");
};
dojo.html.getMarginHeight=function(node){
    return dojo.html._callDeprecated("getMarginHeight","getMargin",arguments,null,"height");
};
dojo.html.getBorderWidth=function(node){
    return dojo.html._callDeprecated("getBorderWidth","getBorder",arguments,null,"width");
};
dojo.html.getBorderHeight=function(node){
    return dojo.html._callDeprecated("getBorderHeight","getBorder",arguments,null,"height");
};
dojo.html.getPaddingWidth=function(node){
    return dojo.html._callDeprecated("getPaddingWidth","getPadding",arguments,null,"width");
};
dojo.html.getPaddingHeight=function(node){
    return dojo.html._callDeprecated("getPaddingHeight","getPadding",arguments,null,"height");
};
dojo.html.getPadBorderWidth=function(node){
    return dojo.html._callDeprecated("getPadBorderWidth","getPadBorder",arguments,null,"width");
};
dojo.html.getPadBorderHeight=function(node){
    return dojo.html._callDeprecated("getPadBorderHeight","getPadBorder",arguments,null,"height");
};
dojo.html.getBorderBoxWidth=dojo.html.getInnerWidth=function(){
    return dojo.html._callDeprecated("getBorderBoxWidth","getBorderBox",arguments,null,"width");
};
dojo.html.getBorderBoxHeight=dojo.html.getInnerHeight=function(){
    return dojo.html._callDeprecated("getBorderBoxHeight","getBorderBox",arguments,null,"height");
};
dojo.html.getContentBoxWidth=dojo.html.getContentWidth=function(){
    return dojo.html._callDeprecated("getContentBoxWidth","getContentBox",arguments,null,"width");
};
dojo.html.getContentBoxHeight=dojo.html.getContentHeight=function(){
    return dojo.html._callDeprecated("getContentBoxHeight","getContentBox",arguments,null,"height");
};
dojo.html.setContentBoxWidth=dojo.html.setContentWidth=function(node,_4c6){
    return dojo.html._callDeprecated("setContentBoxWidth","setContentBox",arguments,"width");
};
dojo.html.setContentBoxHeight=dojo.html.setContentHeight=function(node,_4c8){
    return dojo.html._callDeprecated("setContentBoxHeight","setContentBox",arguments,"height");
};
dojo.provide("dojo.html.util");
dojo.html.getElementWindow=function(_4c9){
    return dojo.html.getDocumentWindow(_4c9.ownerDocument);
};
dojo.html.getDocumentWindow=function(doc){
    if(dojo.render.html.safari&&!doc._parentWindow){
        var fix=function(win){
            win.document._parentWindow=win;
            for(var i=0;i<win.frames.length;i++){
                fix(win.frames[i]);
            }
        };
        fix(window.top);
    }
    if(dojo.render.html.ie&&window!==document.parentWindow&&!doc._parentWindow){
        doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
    }
    return doc._parentWindow||doc.parentWindow||doc.defaultView;
};
dojo.html.gravity=function(node,e){
    node=dojo.byId(node);
    var _4d0=dojo.html.getCursorPosition(e);
    with(dojo.html){
        var _4d1=getAbsolutePosition(node,true);
        var bb=getBorderBox(node);
        var _4d3=_4d1.x+(bb.width/2);
        var _4d4=_4d1.y+(bb.height/2);
    }
    with(dojo.html.gravity){
        return ((_4d0.x<_4d3?WEST:EAST)|(_4d0.y<_4d4?NORTH:SOUTH));
    }
};
dojo.html.gravity.NORTH=1;
dojo.html.gravity.SOUTH=1<<1;
dojo.html.gravity.EAST=1<<2;
dojo.html.gravity.WEST=1<<3;
dojo.html.overElement=function(_4d5,e){
    _4d5=dojo.byId(_4d5);
    var _4d7=dojo.html.getCursorPosition(e);
    with(dojo.html){
        var bb=getBorderBox(_4d5);
        var _4d9=getAbsolutePosition(_4d5,true);
        var top=_4d9.y;
        var _4db=top+bb.height;
        var left=_4d9.x;
        var _4dd=left+bb.width;
    }
    return (_4d7.x>=left&&_4d7.x<=_4dd&&_4d7.y>=top&&_4d7.y<=_4db);
};
dojo.html.renderedTextContent=function(node){
    node=dojo.byId(node);
    var _4df="";
    if(node==null){
        return _4df;
    }
    for(var i=0;i<node.childNodes.length;i++){
        switch(node.childNodes[i].nodeType){
            case 1:
            case 5:
                var _4e1="unknown";
                try{
                    _4e1=dojo.html.getStyle(node.childNodes[i],"display");
                }
                catch(E){
                }
                switch(_4e1){
                    case "block":
                    case "list-item":
                    case "run-in":
                    case "table":
                    case "table-row-group":
                    case "table-header-group":
                    case "table-footer-group":
                    case "table-row":
                    case "table-column-group":
                    case "table-column":
                    case "table-cell":
                    case "table-caption":
                        _4df+="\n";
                        _4df+=dojo.html.renderedTextContent(node.childNodes[i]);
                        _4df+="\n";
                        break;
                    case "none":
                        break;
                    default:
                        if(node.childNodes[i].tagName&&node.childNodes[i].tagName.toLowerCase()=="br"){
                            _4df+="\n";
                        }else{
                            _4df+=dojo.html.renderedTextContent(node.childNodes[i]);
                        }
                        break;
                }
                break;
            case 3:
            case 2:
            case 4:
                var text=node.childNodes[i].nodeValue;
                var _4e3="unknown";
                try{
                    _4e3=dojo.html.getStyle(node,"text-transform");
                }
                catch(E){
                }
                switch(_4e3){
                    case "capitalize":
                        var _4e4=text.split(" ");
                        for(var i=0;i<_4e4.length;i++){
                            _4e4[i]=_4e4[i].charAt(0).toUpperCase()+_4e4[i].substring(1);
                        }
                        text=_4e4.join(" ");
                        break;
                    case "uppercase":
                        text=text.toUpperCase();
                        break;
                    case "lowercase":
                        text=text.toLowerCase();
                        break;
                    default:
                        break;
                }
                switch(_4e3){
                    case "nowrap":
                        break;
                    case "pre-wrap":
                        break;
                    case "pre-line":
                        break;
                    case "pre":
                        break;
                    default:
                        text=text.replace(/\s+/," ");
                        if(/\s$/.test(_4df)){
                            text.replace(/^\s/,"");
                        }
                        break;
                }
                _4df+=text;
                break;
            default:
                break;
        }
    }
    return _4df;
};
dojo.html.createNodesFromText=function(txt,trim){
    if(trim){
        txt=txt.replace(/^\s+|\s+$/g,"");
    }
    var tn=dojo.doc().createElement("div");
    tn.style.visibility="hidden";
    dojo.body().appendChild(tn);
    var _4e8="none";
    if((/^<t[dh][\s\r\n>]/i).test(txt.replace(/^\s+/))){
        txt="<table><tbody><tr>"+txt+"</tr></tbody></table>";
        _4e8="cell";
    }else{
        if((/^<tr[\s\r\n>]/i).test(txt.replace(/^\s+/))){
            txt="<table><tbody>"+txt+"</tbody></table>";
            _4e8="row";
        }else{
            if((/^<(thead|tbody|tfoot)[\s\r\n>]/i).test(txt.replace(/^\s+/))){
                txt="<table>"+txt+"</table>";
                _4e8="section";
            }
        }
    }
    tn.innerHTML=txt;
    if(tn["normalize"]){
        tn.normalize();
    }
    var _4e9=null;
    switch(_4e8){
        case "cell":
            _4e9=tn.getElementsByTagName("tr")[0];
            break;
        case "row":
            _4e9=tn.getElementsByTagName("tbody")[0];
            break;
        case "section":
            _4e9=tn.getElementsByTagName("table")[0];
            break;
        default:
            _4e9=tn;
            break;
    }
    var _4ea=[];
    for(var x=0;x<_4e9.childNodes.length;x++){
        _4ea.push(_4e9.childNodes[x].cloneNode(true));
    }
    tn.style.display="none";
    dojo.body().removeChild(tn);
    return _4ea;
};
dojo.html.placeOnScreen=function(node,_4ed,_4ee,_4ef,_4f0,_4f1,_4f2){
    if(_4ed instanceof Array||typeof _4ed=="array"){
        _4f2=_4f1;
        _4f1=_4f0;
        _4f0=_4ef;
        _4ef=_4ee;
        _4ee=_4ed[1];
        _4ed=_4ed[0];
    }
    if(_4f1 instanceof String||typeof _4f1=="string"){
        _4f1=_4f1.split(",");
    }
    if(!isNaN(_4ef)){
        _4ef=[Number(_4ef),Number(_4ef)];
    }else{
        if(!(_4ef instanceof Array||typeof _4ef=="array")){
            _4ef=[0,0];
        }
    }
    var _4f3=dojo.html.getScroll().offset;
    var view=dojo.html.getViewport();
    node=dojo.byId(node);
    var _4f5=node.style.display;
    node.style.display="";
    var bb=dojo.html.getBorderBox(node);
    var w=bb.width;
    var h=bb.height;
    node.style.display=_4f5;
    if(!(_4f1 instanceof Array||typeof _4f1=="array")){
        _4f1=["TL"];
    }
    var _4f9,besty,bestDistance=Infinity;
    for(var _4fa=0;_4fa<_4f1.length;++_4fa){
        var _4fb=_4f1[_4fa];
        var _4fc=true;
        var tryX=_4ed-(_4fb.charAt(1)=="L"?0:w)+_4ef[0]*(_4fb.charAt(1)=="L"?1:-1);
        var tryY=_4ee-(_4fb.charAt(0)=="T"?0:h)+_4ef[1]*(_4fb.charAt(0)=="T"?1:-1);
        if(_4f0){
            tryX-=_4f3.x;
            tryY-=_4f3.y;
        }
        var x=tryX+w;
        if(x>view.width){
            x=view.width-w;
            _4fc=false;
        }else{
            x=tryX;
        }
        x=Math.max(_4ef[0],x)+_4f3.x;
        var y=tryY+h;
        if(y>view.height){
            y=view.height-h;
            _4fc=false;
        }else{
            y=tryY;
        }
        y=Math.max(_4ef[1],y)+_4f3.y;
        if(_4fc){
            _4f9=x;
            besty=y;
            bestDistance=0;
            break;
        }else{
            var dist=Math.pow(x-tryX-_4f3.x,2)+Math.pow(y-tryY-_4f3.y,2);
            if(bestDistance>dist){
                bestDistance=dist;
                _4f9=x;
                besty=y;
            }
        }
    }
    if(!_4f2){
        node.style.left=_4f9+"px";
        node.style.top=besty+"px";
    }
    return {left:_4f9,top:besty,x:_4f9,y:besty,dist:bestDistance};
};
dojo.html.placeOnScreenPoint=function(node,_503,_504,_505,_506){
    dojo.deprecated("dojo.html.placeOnScreenPoint","use dojo.html.placeOnScreen() instead","0.5");
    return dojo.html.placeOnScreen(node,_503,_504,_505,_506,["TL","TR","BL","BR"]);
};
dojo.html.placeOnScreenAroundElement=function(node,_508,_509,_50a,_50b,_50c){
    var best,bestDistance=Infinity;
    _508=dojo.byId(_508);
    var _50e=_508.style.display;
    _508.style.display="";
    var mb=dojo.html.getElementBox(_508,_50a);
    var _510=mb.width;
    var _511=mb.height;
    var _512=dojo.html.getAbsolutePosition(_508,true,_50a);
    _508.style.display=_50e;
    for(var _513 in _50b){
        var pos,desiredX,desiredY;
        var _515=_50b[_513];
        desiredX=_512.x+(_513.charAt(1)=="L"?0:_510);
        desiredY=_512.y+(_513.charAt(0)=="T"?0:_511);
        pos=dojo.html.placeOnScreen(node,desiredX,desiredY,_509,true,_515,true);
        if(pos.dist==0){
            best=pos;
            break;
        }else{
            if(bestDistance>pos.dist){
                bestDistance=pos.dist;
                best=pos;
            }
        }
    }
    if(!_50c){
        node.style.left=best.left+"px";
        node.style.top=best.top+"px";
    }
    return best;
};
dojo.html.scrollIntoView=function(node){
    if(!node){
        return;
    }
    if(dojo.render.html.ie){
        if(dojo.html.getBorderBox(node.parentNode).height<node.parentNode.scrollHeight){
            node.scrollIntoView(false);
        }
    }else{
        if(dojo.render.html.mozilla){
            node.scrollIntoView(false);
        }else{
            var _517=node.parentNode;
            var _518=_517.scrollTop+dojo.html.getBorderBox(_517).height;
            var _519=node.offsetTop+dojo.html.getMarginBox(node).height;
            if(_518<_519){
                _517.scrollTop+=(_519-_518);
            }else{
                if(_517.scrollTop>node.offsetTop){
                    _517.scrollTop-=(_517.scrollTop-node.offsetTop);
                }
            }
        }
    }
};
dojo.provide("dojo.html.display");
dojo.html._toggle=function(node,_51b,_51c){
    node=dojo.byId(node);
    _51c(node,!_51b(node));
    return _51b(node);
};
dojo.html.show=function(node){
    node=dojo.byId(node);
    if(dojo.html.getStyleProperty(node,"display")=="none"){
        dojo.html.setStyle(node,"display",(node.dojoDisplayCache||""));
        node.dojoDisplayCache=undefined;
    }
};
dojo.html.hide=function(node){
    node=dojo.byId(node);
    if(typeof node["dojoDisplayCache"]=="undefined"){
        var d=dojo.html.getStyleProperty(node,"display");
        if(d!="none"){
            node.dojoDisplayCache=d;
        }
    }
    dojo.html.setStyle(node,"display","none");
};
dojo.html.setShowing=function(node,_521){
    dojo.html[(_521?"show":"hide")](node);
};
dojo.html.isShowing=function(node){
    return (dojo.html.getStyleProperty(node,"display")!="none");
};
dojo.html.toggleShowing=function(node){
    return dojo.html._toggle(node,dojo.html.isShowing,dojo.html.setShowing);
};
dojo.html.displayMap={tr:"",td:"",th:"",img:"inline",span:"inline",input:"inline",button:"inline"};
dojo.html.suggestDisplayByTagName=function(node){
    node=dojo.byId(node);
    if(node&&node.tagName){
        var tag=node.tagName.toLowerCase();
        return (tag in dojo.html.displayMap?dojo.html.displayMap[tag]:"block");
    }
};
dojo.html.setDisplay=function(node,_527){
    dojo.html.setStyle(node,"display",((_527 instanceof String||typeof _527=="string")?_527:(_527?dojo.html.suggestDisplayByTagName(node):"none")));
};
dojo.html.isDisplayed=function(node){
    return (dojo.html.getComputedStyle(node,"display")!="none");
};
dojo.html.toggleDisplay=function(node){
    return dojo.html._toggle(node,dojo.html.isDisplayed,dojo.html.setDisplay);
};
dojo.html.setVisibility=function(node,_52b){
    dojo.html.setStyle(node,"visibility",((_52b instanceof String||typeof _52b=="string")?_52b:(_52b?"visible":"hidden")));
};
dojo.html.isVisible=function(node){
    return (dojo.html.getComputedStyle(node,"visibility")!="hidden");
};
dojo.html.toggleVisibility=function(node){
    return dojo.html._toggle(node,dojo.html.isVisible,dojo.html.setVisibility);
};
dojo.html.setOpacity=function(node,_52f,_530){
    node=dojo.byId(node);
    var h=dojo.render.html;
    if(!_530){
        if(_52f>=1){
            if(h.ie){
                dojo.html.clearOpacity(node);
                return;
            }else{
                _52f=0.999999;
            }
        }else{
            if(_52f<0){
                _52f=0;
            }
        }
    }
    if(h.ie){
        if(node.nodeName.toLowerCase()=="tr"){
            var tds=node.getElementsByTagName("td");
            for(var x=0;x<tds.length;x++){
                tds[x].style.filter="Alpha(Opacity="+_52f*100+")";
            }
        }
        node.style.filter="Alpha(Opacity="+_52f*100+")";
    }else{
        if(h.moz){
            node.style.opacity=_52f;
            node.style.MozOpacity=_52f;
        }else{
            if(h.safari){
                node.style.opacity=_52f;
                node.style.KhtmlOpacity=_52f;
            }else{
                node.style.opacity=_52f;
            }
        }
    }
};
dojo.html.clearOpacity=function clearOpacity(node){
    node=dojo.byId(node);
    var ns=node.style;
    var h=dojo.render.html;
    if(h.ie){
        try{
            if(node.filters&&node.filters.alpha){
                ns.filter="";
            }
        }
        catch(e){
        }
    }else{
        if(h.moz){
            ns.opacity=1;
            ns.MozOpacity=1;
        }else{
            if(h.safari){
                ns.opacity=1;
                ns.KhtmlOpacity=1;
            }else{
                ns.opacity=1;
            }
        }
    }
};
dojo.html.getOpacity=function getOpacity(node){
    node=dojo.byId(node);
    var h=dojo.render.html;
    if(h.ie){
        var opac=(node.filters&&node.filters.alpha&&typeof node.filters.alpha.opacity=="number"?node.filters.alpha.opacity:100)/100;
    }else{
        var opac=node.style.opacity||node.style.MozOpacity||node.style.KhtmlOpacity||1;
    }
    return opac>=0.999999?1:Number(opac);
};
dojo.provide("dojo.lfx.Animation");
dojo.provide("dojo.lfx.Line");
dojo.lfx.Line=function(_53a,end){
    this.start=_53a;
    this.end=end;
    if(dojo.lang.isArray(_53a)){
        var diff=[];
        dojo.lang.forEach(this.start,function(s,i){
            diff[i]=this.end[i]-s;
        },this);
        this.getValue=function(n){
            var res=[];
            dojo.lang.forEach(this.start,function(s,i){
                res[i]=(diff[i]*n)+s;
            },this);
            return res;
        };
    }else{
        var diff=end-_53a;
        this.getValue=function(n){
            return (diff*n)+this.start;
        };
    }
};
dojo.lfx.easeDefault=function(n){
    if(dojo.render.html.khtml){
        return (parseFloat("0.5")+((Math.sin((n+parseFloat("1.5"))*Math.PI))/2));
    }else{
        return (0.5+((Math.sin((n+1.5)*Math.PI))/2));
        dojo.debug(ret);
    }
};
dojo.lfx.easeIn=function(n){
    return Math.pow(n,3);
};
dojo.lfx.easeOut=function(n){
    return (1-Math.pow(1-n,3));
};
dojo.lfx.easeInOut=function(n){
    return ((3*Math.pow(n,2))-(2*Math.pow(n,3)));
};
dojo.lfx.IAnimation=function(){
};
dojo.lang.extend(dojo.lfx.IAnimation,{curve:null,duration:1000,easing:null,repeatCount:0,rate:25,handler:null,beforeBegin:null,onBegin:null,onAnimate:null,onEnd:null,onPlay:null,onPause:null,onStop:null,play:null,pause:null,stop:null,connect:function(evt,_549,_54a){
    if(!_54a){
        _54a=_549;
        _549=this;
    }
    _54a=dojo.lang.hitch(_549,_54a);
    var _54b=this[evt]||function(){
    };
    this[evt]=function(){
        var ret=_54b.apply(this,arguments);
        _54a.apply(this,arguments);
        return ret;
    };
    return this;
},fire:function(evt,args){
    if(this[evt]){
        this[evt].apply(this,(args||[]));
    }
    return this;
},repeat:function(_54f){
    this.repeatCount=_54f;
    return this;
},_active:false,_paused:false});
dojo.lfx.Animation=function(_550,_551,_552,_553,_554,rate){
    dojo.lfx.IAnimation.call(this);
    if(dojo.lang.isNumber(_550)||(!_550&&_551.getValue)){
        rate=_554;
        _554=_553;
        _553=_552;
        _552=_551;
        _551=_550;
        _550=null;
    }else{
        if(_550.getValue||dojo.lang.isArray(_550)){
            rate=_553;
            _554=_552;
            _553=_551;
            _552=_550;
            _551=null;
            _550=null;
        }
    }
    if(dojo.lang.isArray(_552)){
        this.curve=new dojo.lfx.Line(_552[0],_552[1]);
    }else{
        this.curve=_552;
    }
    if(_551!=null&&_551>0){
        this.duration=_551;
    }
    if(_554){
        this.repeatCount=_554;
    }
    if(rate){
        this.rate=rate;
    }
    if(_550){
        dojo.lang.forEach(["handler","beforeBegin","onBegin","onEnd","onPlay","onStop","onAnimate"],function(item){
            if(_550[item]){
                this.connect(item,_550[item]);
            }
        },this);
    }
    if(_553&&dojo.lang.isFunction(_553)){
        this.easing=_553;
    }
};
dojo.inherits(dojo.lfx.Animation,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Animation,{_startTime:null,_endTime:null,_timer:null,_percent:0,_startRepeatCount:0,play:function(_557,_558){
    if(_558){
        clearTimeout(this._timer);
        this._active=false;
        this._paused=false;
        this._percent=0;
    }else{
        if(this._active&&!this._paused){
            return this;
        }
    }
    this.fire("handler",["beforeBegin"]);
    this.fire("beforeBegin");
    if(_557>0){
        setTimeout(dojo.lang.hitch(this,function(){
            this.play(null,_558);
        }),_557);
        return this;
    }
    this._startTime=new Date().valueOf();
    if(this._paused){
        this._startTime-=(this.duration*this._percent/100);
    }
    this._endTime=this._startTime+this.duration;
    this._active=true;
    this._paused=false;
    var step=this._percent/100;
    var _55a=this.curve.getValue(step);
    if(this._percent==0){
        if(!this._startRepeatCount){
            this._startRepeatCount=this.repeatCount;
        }
        this.fire("handler",["begin",_55a]);
        this.fire("onBegin",[_55a]);
    }
    this.fire("handler",["play",_55a]);
    this.fire("onPlay",[_55a]);
    this._cycle();
    return this;
},pause:function(){
    clearTimeout(this._timer);
    if(!this._active){
        return this;
    }
    this._paused=true;
    var _55b=this.curve.getValue(this._percent/100);
    this.fire("handler",["pause",_55b]);
    this.fire("onPause",[_55b]);
    return this;
},gotoPercent:function(pct,_55d){
    clearTimeout(this._timer);
    this._active=true;
    this._paused=true;
    this._percent=pct;
    if(_55d){
        this.play();
    }
    return this;
},stop:function(_55e){
    clearTimeout(this._timer);
    var step=this._percent/100;
    if(_55e){
        step=1;
    }
    var _560=this.curve.getValue(step);
    this.fire("handler",["stop",_560]);
    this.fire("onStop",[_560]);
    this._active=false;
    this._paused=false;
    return this;
},status:function(){
    if(this._active){
        return this._paused?"paused":"playing";
    }else{
        return "stopped";
    }
    return this;
},_cycle:function(){
    clearTimeout(this._timer);
    if(this._active){
        var curr=new Date().valueOf();
        var step=(curr-this._startTime)/(this._endTime-this._startTime);
        if(step>=1){
            step=1;
            this._percent=100;
        }else{
            this._percent=step*100;
        }
        if((this.easing)&&(dojo.lang.isFunction(this.easing))){
            step=this.easing(step);
        }
        var _563=this.curve.getValue(step);
        this.fire("handler",["animate",_563]);
        this.fire("onAnimate",[_563]);
        if(step<1){
            this._timer=setTimeout(dojo.lang.hitch(this,"_cycle"),this.rate);
        }else{
            this._active=false;
            this.fire("handler",["end"]);
            this.fire("onEnd");
            if(this.repeatCount>0){
                this.repeatCount--;
                this.play(null,true);
            }else{
                if(this.repeatCount==-1){
                    this.play(null,true);
                }else{
                    if(this._startRepeatCount){
                        this.repeatCount=this._startRepeatCount;
                        this._startRepeatCount=0;
                    }
                }
            }
        }
    }
    return this;
}});
dojo.lfx.Combine=function(){
    dojo.lfx.IAnimation.call(this);
    this._anims=[];
    this._animsEnded=0;
    var _564=arguments;
    if(_564.length==1&&(dojo.lang.isArray(_564[0])||dojo.lang.isArrayLike(_564[0]))){
        _564=_564[0];
    }
    dojo.lang.forEach(_564,function(anim){
        this._anims.push(anim);
        anim.connect("onEnd",dojo.lang.hitch(this,"_onAnimsEnded"));
    },this);
};
dojo.inherits(dojo.lfx.Combine,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Combine,{_animsEnded:0,play:function(_566,_567){
    if(!this._anims.length){
        return this;
    }
    this.fire("beforeBegin");
    if(_566>0){
        setTimeout(dojo.lang.hitch(this,function(){
            this.play(null,_567);
        }),_566);
        return this;
    }
    if(_567||this._anims[0].percent==0){
        this.fire("onBegin");
    }
    this.fire("onPlay");
    this._animsCall("play",null,_567);
    return this;
},pause:function(){
    this.fire("onPause");
    this._animsCall("pause");
    return this;
},stop:function(_568){
    this.fire("onStop");
    this._animsCall("stop",_568);
    return this;
},_onAnimsEnded:function(){
    this._animsEnded++;
    if(this._animsEnded>=this._anims.length){
        this.fire("onEnd");
    }
    return this;
},_animsCall:function(_569){
    var args=[];
    if(arguments.length>1){
        for(var i=1;i<arguments.length;i++){
            args.push(arguments[i]);
        }
    }
    var _56c=this;
    dojo.lang.forEach(this._anims,function(anim){
        anim[_569](args);
    },_56c);
    return this;
}});
dojo.lfx.Chain=function(){
    dojo.lfx.IAnimation.call(this);
    this._anims=[];
    this._currAnim=-1;
    var _56e=arguments;
    if(_56e.length==1&&(dojo.lang.isArray(_56e[0])||dojo.lang.isArrayLike(_56e[0]))){
        _56e=_56e[0];
    }
    var _56f=this;
    dojo.lang.forEach(_56e,function(anim,i,_572){
        this._anims.push(anim);
        if(i<_572.length-1){
            anim.connect("onEnd",dojo.lang.hitch(this,"_playNext"));
        }else{
            anim.connect("onEnd",dojo.lang.hitch(this,function(){
                this.fire("onEnd");
            }));
        }
    },this);
};
dojo.inherits(dojo.lfx.Chain,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Chain,{_currAnim:-1,play:function(_573,_574){
    if(!this._anims.length){
        return this;
    }
    if(_574||!this._anims[this._currAnim]){
        this._currAnim=0;
    }
    var _575=this._anims[this._currAnim];
    this.fire("beforeBegin");
    if(_573>0){
        setTimeout(dojo.lang.hitch(this,function(){
            this.play(null,_574);
        }),_573);
        return this;
    }
    if(_575){
        if(this._currAnim==0){
            this.fire("handler",["begin",this._currAnim]);
            this.fire("onBegin",[this._currAnim]);
        }
        this.fire("onPlay",[this._currAnim]);
        _575.play(null,_574);
    }
    return this;
},pause:function(){
    if(this._anims[this._currAnim]){
        this._anims[this._currAnim].pause();
        this.fire("onPause",[this._currAnim]);
    }
    return this;
},playPause:function(){
    if(this._anims.length==0){
        return this;
    }
    if(this._currAnim==-1){
        this._currAnim=0;
    }
    var _576=this._anims[this._currAnim];
    if(_576){
        if(!_576._active||_576._paused){
            this.play();
        }else{
            this.pause();
        }
    }
    return this;
},stop:function(){
    var _577=this._anims[this._currAnim];
    if(_577){
        _577.stop();
        this.fire("onStop",[this._currAnim]);
    }
    return _577;
},_playNext:function(){
    if(this._currAnim==-1||this._anims.length==0){
        return this;
    }
    this._currAnim++;
    if(this._anims[this._currAnim]){
        this._anims[this._currAnim].play(null,true);
    }
    return this;
}});
dojo.lfx.combine=function(){
    var _578=arguments;
    if(dojo.lang.isArray(arguments[0])){
        _578=arguments[0];
    }
    if(_578.length==1){
        return _578[0];
    }
    return new dojo.lfx.Combine(_578);
};
dojo.lfx.chain=function(){
    var _579=arguments;
    if(dojo.lang.isArray(arguments[0])){
        _579=arguments[0];
    }
    if(_579.length==1){
        return _579[0];
    }
    return new dojo.lfx.Chain(_579);
};
dojo.provide("dojo.html.color");
dojo.html.getBackgroundColor=function(node){
    node=dojo.byId(node);
    var _57b;
    do{
        _57b=dojo.html.getStyle(node,"background-color");
        if(_57b.toLowerCase()=="rgba(0, 0, 0, 0)"){
            _57b="transparent";
        }
        if(node==document.getElementsByTagName("body")[0]){
            node=null;
            break;
        }
        node=node.parentNode;
    }while(node&&dojo.lang.inArray(["transparent",""],_57b));
    if(_57b=="transparent"){
        _57b=[255,255,255,0];
    }else{
        _57b=dojo.graphics.color.extractRGB(_57b);
    }
    return _57b;
};
dojo.provide("dojo.lfx.html");
dojo.lfx.html._byId=function(_57c){
    if(!_57c){
        return [];
    }
    if(dojo.lang.isArrayLike(_57c)){
        if(!_57c.alreadyChecked){
            var n=[];
            dojo.lang.forEach(_57c,function(node){
                n.push(dojo.byId(node));
            });
            n.alreadyChecked=true;
            return n;
        }else{
            return _57c;
        }
    }else{
        var n=[];
        n.push(dojo.byId(_57c));
        n.alreadyChecked=true;
        return n;
    }
};
dojo.lfx.html.propertyAnimation=function(_57f,_580,_581,_582,_583){
    _57f=dojo.lfx.html._byId(_57f);
    var _584={"propertyMap":_580,"nodes":_57f,"duration":_581,"easing":_582||dojo.lfx.easeDefault};
    var _585=function(args){
        if(args.nodes.length==1){
            var pm=args.propertyMap;
            if(!dojo.lang.isArray(args.propertyMap)){
                var parr=[];
                for(var _589 in pm){
                    pm[_589].property=_589;
                    parr.push(pm[_589]);
                }
                pm=args.propertyMap=parr;
            }
            dojo.lang.forEach(pm,function(prop){
                if(dj_undef("start",prop)){
                    if(prop.property!="opacity"){
                        prop.start=parseInt(dojo.html.getComputedStyle(args.nodes[0],prop.property));
                    }else{
                        prop.start=dojo.html.getOpacity(args.nodes[0]);
                    }
                }
            });
        }
    };
    var _58b=function(_58c){
        var _58d=[];
        dojo.lang.forEach(_58c,function(c){
            _58d.push(Math.round(c));
        });
        return _58d;
    };
    var _58f=function(n,_591){
        n=dojo.byId(n);
        if(!n||!n.style){
            return;
        }
        for(var s in _591){
            if(s=="opacity"){
                dojo.html.setOpacity(n,_591[s]);
            }else{
                n.style[s]=_591[s];
            }
        }
    };
    var _593=function(_594){
        this._properties=_594;
        this.diffs=new Array(_594.length);
        dojo.lang.forEach(_594,function(prop,i){
            if(dojo.lang.isFunction(prop.start)){
                prop.start=prop.start(prop,i);
            }
            if(dojo.lang.isFunction(prop.end)){
                prop.end=prop.end(prop,i);
            }
            if(dojo.lang.isArray(prop.start)){
                this.diffs[i]=null;
            }else{
                if(prop.start instanceof dojo.graphics.color.Color){
                    prop.startRgb=prop.start.toRgb();
                    prop.endRgb=prop.end.toRgb();
                }else{
                    this.diffs[i]=prop.end-prop.start;
                }
            }
        },this);
        this.getValue=function(n){
            var ret={};
            dojo.lang.forEach(this._properties,function(prop,i){
                var _59b=null;
                if(dojo.lang.isArray(prop.start)){
                }else{
                    if(prop.start instanceof dojo.graphics.color.Color){
                        _59b=(prop.units||"rgb")+"(";
                        for(var j=0;j<prop.startRgb.length;j++){
                            _59b+=Math.round(((prop.endRgb[j]-prop.startRgb[j])*n)+prop.startRgb[j])+(j<prop.startRgb.length-1?",":"");
                        }
                        _59b+=")";
                    }else{
                        _59b=((this.diffs[i])*n)+prop.start+(prop.property!="opacity"?prop.units||"px":"");
                    }
                }
                ret[dojo.html.toCamelCase(prop.property)]=_59b;
            },this);
            return ret;
        };
    };
    var anim=new dojo.lfx.Animation({beforeBegin:function(){
        _585(_584);
        anim.curve=new _593(_584.propertyMap);
    },onAnimate:function(_59e){
        dojo.lang.forEach(_584.nodes,function(node){
            _58f(node,_59e);
        });
    }},_584.duration,null,_584.easing);
    if(_583){
        for(var x in _583){
            if(dojo.lang.isFunction(_583[x])){
                anim.connect(x,anim,_583[x]);
            }
        }
    }
    return anim;
};
dojo.lfx.html._makeFadeable=function(_5a1){
    var _5a2=function(node){
        if(dojo.render.html.ie){
            if((node.style.zoom.length==0)&&(dojo.html.getStyle(node,"zoom")=="normal")){
                node.style.zoom="1";
            }
            if((node.style.width.length==0)&&(dojo.html.getStyle(node,"width")=="auto")){
                node.style.width="auto";
            }
        }
    };
    if(dojo.lang.isArrayLike(_5a1)){
        dojo.lang.forEach(_5a1,_5a2);
    }else{
        _5a2(_5a1);
    }
};
dojo.lfx.html.fade=function(_5a4,_5a5,_5a6,_5a7,_5a8){
    _5a4=dojo.lfx.html._byId(_5a4);
    var _5a9={property:"opacity"};
    if(!dj_undef("start",_5a5)){
        _5a9.start=_5a5.start;
    }else{
        _5a9.start=function(){
            return dojo.html.getOpacity(_5a4[0]);
        };
    }
    if(!dj_undef("end",_5a5)){
        _5a9.end=_5a5.end;
    }else{
        dojo.raise("dojo.lfx.html.fade needs an end value");
    }
    var anim=dojo.lfx.propertyAnimation(_5a4,[_5a9],_5a6,_5a7);
    anim.connect("beforeBegin",function(){
        dojo.lfx.html._makeFadeable(_5a4);
    });
    if(_5a8){
        anim.connect("onEnd",function(){
            _5a8(_5a4,anim);
        });
    }
    return anim;
};
dojo.lfx.html.fadeIn=function(_5ab,_5ac,_5ad,_5ae){
    return dojo.lfx.html.fade(_5ab,{end:1},_5ac,_5ad,_5ae);
};
dojo.lfx.html.fadeOut=function(_5af,_5b0,_5b1,_5b2){
    return dojo.lfx.html.fade(_5af,{end:0},_5b0,_5b1,_5b2);
};
dojo.lfx.html.fadeShow=function(_5b3,_5b4,_5b5,_5b6){
    _5b3=dojo.lfx.html._byId(_5b3);
    dojo.lang.forEach(_5b3,function(node){
        dojo.html.setOpacity(node,0);
    });
    var anim=dojo.lfx.html.fadeIn(_5b3,_5b4,_5b5,_5b6);
    anim.connect("beforeBegin",function(){
        if(dojo.lang.isArrayLike(_5b3)){
            dojo.lang.forEach(_5b3,dojo.html.show);
        }else{
            dojo.html.show(_5b3);
        }
    });
    return anim;
};
dojo.lfx.html.fadeHide=function(_5b9,_5ba,_5bb,_5bc){
    var anim=dojo.lfx.html.fadeOut(_5b9,_5ba,_5bb,function(){
        if(dojo.lang.isArrayLike(_5b9)){
            dojo.lang.forEach(_5b9,dojo.html.hide);
        }else{
            dojo.html.hide(_5b9);
        }
        if(_5bc){
            _5bc(_5b9,anim);
        }
    });
    return anim;
};
dojo.lfx.html.wipeIn=function(_5be,_5bf,_5c0,_5c1){
    _5be=dojo.lfx.html._byId(_5be);
    var _5c2=[];
    dojo.lang.forEach(_5be,function(node){
        var _5c4={overflow:null};
        var anim=dojo.lfx.propertyAnimation(node,{"height":{start:0,end:function(){
            return node.scrollHeight;
        }}},_5bf,_5c0);
        anim.connect("beforeBegin",function(){
            _5c4.overflow=dojo.html.getStyle(node,"overflow");
            with(node.style){
                if(_5c4.overflow=="visible"){
                    overflow="hidden";
                }
                visibility="visible";
                height="0px";
            }
            dojo.html.show(node);
        });
        anim.connect("onEnd",function(){
            with(node.style){
                overflow=_5c4.overflow;
                height="";
                visibility="visible";
            }
            if(_5c1){
                _5c1(node,anim);
            }
        });
        _5c2.push(anim);
    });
    return dojo.lfx.combine(_5c2);
};
dojo.lfx.html.wipeOut=function(_5c6,_5c7,_5c8,_5c9){
    _5c6=dojo.lfx.html._byId(_5c6);
    var _5ca=[];
    dojo.lang.forEach(_5c6,function(node){
        var _5cc={overflow:null};
        var anim=dojo.lfx.propertyAnimation(node,{"height":{start:function(){
            return dojo.html.getContentBox(node).height;
        },end:0}},_5c7,_5c8,{"beforeBegin":function(){
            _5cc.overflow=dojo.html.getStyle(node,"overflow");
            if(_5cc.overflow=="visible"){
                node.style.overflow="hidden";
            }
            node.style.visibility="visible";
            dojo.html.show(node);
        },"onEnd":function(){
            with(node.style){
                overflow=_5cc.overflow;
                visibility="hidden";
                height="";
            }
            if(_5c9){
                _5c9(node,anim);
            }
        }});
        _5ca.push(anim);
    });
    return dojo.lfx.combine(_5ca);
};
dojo.lfx.html.slideTo=function(_5ce,_5cf,_5d0,_5d1,_5d2){
    _5ce=dojo.lfx.html._byId(_5ce);
    var _5d3=[];
    var _5d4=dojo.html.getComputedStyle;
    if(dojo.lang.isArray(_5cf)){
        dojo.deprecated("dojo.lfx.html.slideTo(node, array)","use dojo.lfx.html.slideTo(node, {top: value, left: value});","0.5");
        _5cf={top:_5cf[0],left:_5cf[1]};
    }
    dojo.lang.forEach(_5ce,function(node){
        var top=null;
        var left=null;
        var init=(function(){
            var _5d9=node;
            return function(){
                var pos=_5d4(_5d9,"position");
                top=(pos=="absolute"?node.offsetTop:parseInt(_5d4(node,"top"))||0);
                left=(pos=="absolute"?node.offsetLeft:parseInt(_5d4(node,"left"))||0);
                if(!dojo.lang.inArray(["absolute","relative"],pos)){
                    var ret=dojo.html.abs(_5d9,true);
                    dojo.html.setStyleAttributes(_5d9,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
                    top=ret.y;
                    left=ret.x;
                }
            };
        })();
        init();
        var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:(_5cf.top||0)},"left":{start:left,end:(_5cf.left||0)}},_5d0,_5d1,{"beforeBegin":init});
        if(_5d2){
            anim.connect("onEnd",function(){
                _5d2(_5ce,anim);
            });
        }
        _5d3.push(anim);
    });
    return dojo.lfx.combine(_5d3);
};
dojo.lfx.html.slideBy=function(_5dd,_5de,_5df,_5e0,_5e1){
    _5dd=dojo.lfx.html._byId(_5dd);
    var _5e2=[];
    var _5e3=dojo.html.getComputedStyle;
    if(dojo.lang.isArray(_5de)){
        dojo.deprecated("dojo.lfx.html.slideBy(node, array)","use dojo.lfx.html.slideBy(node, {top: value, left: value});","0.5");
        _5de={top:_5de[0],left:_5de[1]};
    }
    dojo.lang.forEach(_5dd,function(node){
        var top=null;
        var left=null;
        var init=(function(){
            var _5e8=node;
            return function(){
                var pos=_5e3(_5e8,"position");
                top=(pos=="absolute"?node.offsetTop:parseInt(_5e3(node,"top"))||0);
                left=(pos=="absolute"?node.offsetLeft:parseInt(_5e3(node,"left"))||0);
                if(!dojo.lang.inArray(["absolute","relative"],pos)){
                    var ret=dojo.html.abs(_5e8,true);
                    dojo.html.setStyleAttributes(_5e8,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
                    top=ret.y;
                    left=ret.x;
                }
            };
        })();
        init();
        var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:top+(_5de.top||0)},"left":{start:left,end:left+(_5de.left||0)}},_5df,_5e0).connect("beforeBegin",init);
        if(_5e1){
            anim.connect("onEnd",function(){
                _5e1(_5dd,anim);
            });
        }
        _5e2.push(anim);
    });
    return dojo.lfx.combine(_5e2);
};
dojo.lfx.html.explode=function(_5ec,_5ed,_5ee,_5ef,_5f0){
    var h=dojo.html;
    _5ec=dojo.byId(_5ec);
    _5ed=dojo.byId(_5ed);
    var _5f2=h.toCoordinateObject(_5ec,true);
    var _5f3=document.createElement("div");
    h.copyStyle(_5f3,_5ed);
    with(_5f3.style){
        position="absolute";
        display="none";
    }
    dojo.body().appendChild(_5f3);
    with(_5ed.style){
        visibility="hidden";
        display="block";
    }
    var _5f4=h.toCoordinateObject(_5ed,true);
    _5f3.style.backgroundColor=h.getStyle(_5ed,"background-color").toLowerCase();
    with(_5ed.style){
        display="none";
        visibility="visible";
    }
    var _5f5={opacity:{start:0.5,end:1}};
    dojo.lang.forEach(["height","width","top","left"],function(type){
        _5f5[type]={start:_5f2[type],end:_5f4[type]};
    });
    var anim=new dojo.lfx.propertyAnimation(_5f3,_5f5,_5ee,_5ef,{"beforeBegin":function(){
        h.setDisplay(_5f3,"block");
    },"onEnd":function(){
        h.setDisplay(_5ed,"block");
        _5f3.parentNode.removeChild(_5f3);
    }});
    if(_5f0){
        anim.connect("onEnd",function(){
            _5f0(_5ed,anim);
        });
    }
    return anim;
};
dojo.lfx.html.implode=function(_5f8,end,_5fa,_5fb,_5fc){
    var h=dojo.html;
    _5f8=dojo.byId(_5f8);
    end=dojo.byId(end);
    var _5fe=dojo.html.toCoordinateObject(_5f8,true);
    var _5ff=dojo.html.toCoordinateObject(end,true);
    var _600=document.createElement("div");
    dojo.html.copyStyle(_600,_5f8);
    dojo.html.setOpacity(_600,0.3);
    with(_600.style){
        position="absolute";
        display="none";
        backgroundColor=h.getStyle(_5f8,"background-color").toLowerCase();
    }
    dojo.body().appendChild(_600);
    var _601={opacity:{start:1,end:0.5}};
    dojo.lang.forEach(["height","width","top","left"],function(type){
        _601[type]={start:_5fe[type],end:_5ff[type]};
    });
    var anim=new dojo.lfx.propertyAnimation(_600,_601,_5fa,_5fb,{"beforeBegin":function(){
        dojo.html.hide(_5f8);
        dojo.html.show(_600);
    },"onEnd":function(){
        _600.parentNode.removeChild(_600);
    }});
    if(_5fc){
        anim.connect("onEnd",function(){
            _5fc(_5f8,anim);
        });
    }
    return anim;
};
dojo.lfx.html.highlight=function(_604,_605,_606,_607,_608){
    _604=dojo.lfx.html._byId(_604);
    var _609=[];
    dojo.lang.forEach(_604,function(node){
        var _60b=dojo.html.getBackgroundColor(node);
        var bg=dojo.html.getStyle(node,"background-color").toLowerCase();
        var _60d=dojo.html.getStyle(node,"background-image");
        var _60e=(bg=="transparent"||bg=="rgba(0, 0, 0, 0)");
        while(_60b.length>3){
            _60b.pop();
        }
        var rgb=new dojo.graphics.color.Color(_605);
        var _610=new dojo.graphics.color.Color(_60b);
        var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:rgb,end:_610}},_606,_607,{"beforeBegin":function(){
            if(_60d){
                node.style.backgroundImage="none";
            }
            node.style.backgroundColor="rgb("+rgb.toRgb().join(",")+")";
        },"onEnd":function(){
            if(_60d){
                node.style.backgroundImage=_60d;
            }
            if(_60e){
                node.style.backgroundColor="transparent";
            }
            if(_608){
                _608(node,anim);
            }
        }});
        _609.push(anim);
    });
    return dojo.lfx.combine(_609);
};
dojo.lfx.html.unhighlight=function(_612,_613,_614,_615,_616){
    _612=dojo.lfx.html._byId(_612);
    var _617=[];
    dojo.lang.forEach(_612,function(node){
        var _619=new dojo.graphics.color.Color(dojo.html.getBackgroundColor(node));
        var rgb=new dojo.graphics.color.Color(_613);
        var _61b=dojo.html.getStyle(node,"background-image");
        var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:_619,end:rgb}},_614,_615,{"beforeBegin":function(){
            if(_61b){
                node.style.backgroundImage="none";
            }
            node.style.backgroundColor="rgb("+_619.toRgb().join(",")+")";
        },"onEnd":function(){
            if(_616){
                _616(node,anim);
            }
        }});
        _617.push(anim);
    });
    return dojo.lfx.combine(_617);
};
dojo.lang.mixin(dojo.lfx,dojo.lfx.html);
dojo.provide("dojo.lfx.*");
dojo.provide("dojo.lfx.toggle");
dojo.lfx.toggle.plain={show:function(node,_61e,_61f,_620){
    dojo.html.show(node);
    if(dojo.lang.isFunction(_620)){
        _620();
    }
},hide:function(node,_622,_623,_624){
    dojo.html.hide(node);
    if(dojo.lang.isFunction(_624)){
        _624();
    }
}};
dojo.lfx.toggle.fade={show:function(node,_626,_627,_628){
    dojo.lfx.fadeShow(node,_626,_627,_628).play();
},hide:function(node,_62a,_62b,_62c){
    dojo.lfx.fadeHide(node,_62a,_62b,_62c).play();
}};
dojo.lfx.toggle.wipe={show:function(node,_62e,_62f,_630){
    dojo.lfx.wipeIn(node,_62e,_62f,_630).play();
},hide:function(node,_632,_633,_634){
    dojo.lfx.wipeOut(node,_632,_633,_634).play();
}};
dojo.lfx.toggle.explode={show:function(node,_636,_637,_638,_639){
    dojo.lfx.explode(_639||{x:0,y:0,width:0,height:0},node,_636,_637,_638).play();
},hide:function(node,_63b,_63c,_63d,_63e){
    dojo.lfx.implode(node,_63e||{x:0,y:0,width:0,height:0},_63b,_63c,_63d).play();
}};
dojo.provide("dojo.widget.HtmlWidget");
dojo.declare("dojo.widget.HtmlWidget",dojo.widget.DomWidget,{widgetType:"HtmlWidget",templateCssPath:null,templatePath:null,toggle:"plain",toggleDuration:150,animationInProgress:false,initialize:function(args,frag){
},postMixInProperties:function(args,frag){
    this.toggleObj=dojo.lfx.toggle[this.toggle.toLowerCase()]||dojo.lfx.toggle.plain;
},getContainerHeight:function(){
    dojo.unimplemented("dojo.widget.HtmlWidget.getContainerHeight");
},getContainerWidth:function(){
    return this.parent.domNode.offsetWidth;
},setNativeHeight:function(_643){
    var ch=this.getContainerHeight();
},createNodesFromText:function(txt,wrap){
    return dojo.html.createNodesFromText(txt,wrap);
},destroyRendering:function(_647){
    try{
        if(!_647&&this.domNode){
            dojo.event.browser.clean(this.domNode);
        }
        this.domNode.parentNode.removeChild(this.domNode);
        delete this.domNode;
    }
    catch(e){
    }
},isShowing:function(){
    return dojo.html.isShowing(this.domNode);
},toggleShowing:function(){
    if(this.isHidden){
        this.show();
    }else{
        this.hide();
    }
},show:function(){
    this.animationInProgress=true;
    this.isHidden=false;
    this.toggleObj.show(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onShow),this.explodeSrc);
},onShow:function(){
    this.animationInProgress=false;
    this.checkSize();
},hide:function(){
    this.animationInProgress=true;
    this.isHidden=true;
    this.toggleObj.hide(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onHide),this.explodeSrc);
},onHide:function(){
    this.animationInProgress=false;
},_isResized:function(w,h){
    if(!this.isShowing()){
        return false;
    }
    var wh=dojo.html.getMarginBox(this.domNode);
    var _64b=w||wh.width;
    var _64c=h||wh.height;
    if(this.width==_64b&&this.height==_64c){
        return false;
    }
    this.width=_64b;
    this.height=_64c;
    return true;
},checkSize:function(){
    if(!this._isResized()){
        return;
    }
    this.onResized();
},resizeTo:function(w,h){
    if(!this._isResized(w,h)){
        return;
    }
    dojo.html.setMarginBox(this.domNode,{width:w,height:h});
    this.onResized();
},resizeSoon:function(){
    if(this.isShowing()){
        dojo.lang.setTimeout(this,this.onResized,0);
    }
},onResized:function(){
    dojo.lang.forEach(this.children,function(_64f){
        if(_64f["checkSize"]){
            _64f.checkSize();
        }
    });
}});
dojo.provide("dojo.namespace");
dojo.Namespace=function(_650,_651,_652,_653){
    this.root=_650;
    this.location=_651;
    this.nsPrefix=_652;
    this.resolver=_653;
    dojo.setModulePrefix(_652,_651);
};
dojo.Namespace.prototype._loaded={};
dojo.Namespace.prototype.load=function(name,_655){
    if(this.resolver){
        var _656=this.resolver(name,_655);
        if(_656&&!this._loaded[_656]){
            var req=dojo.require;
            req(_656);
            this._loaded[_656]=true;
        }
        if(this._loaded[_656]){
            return true;
        }
    }
    return false;
};
dojo.defineNamespace=function(_658,_659,_65a,_65b,_65c){
    if(dojo._namespaces[_658]){
        return;
    }
    var ns=new dojo.Namespace(_658,_659,_65a,_65b);
    dojo._namespaces[_658]=ns;
    if(_65a){
        dojo._namespaces[_65a]=ns;
    }
    if(_65c){
        dojo.widget.manager.registerWidgetPackage(_65c);
    }
};
dojo.findNamespaceForWidget=function(_65e){
    dojo.deprecated("dojo.findNamespaceForWidget","Widget ["+_65e+"] not defined for a namespace"+", so searching all namespaces. Developers should specify namespaces for all non-Dojo widgets","0.5");
    _65e=_65e.toLowerCase();
    for(x in dojo._namespaces){
        if(dojo._namespaces[x].load(_65e)){
            return dojo._namespaces[x];
        }
    }
};
dojo.provide("dojo.widget.Parse");
dojo.widget.Parse=function(_65f){
    this.propertySetsList=[];
    this.fragment=_65f;
    this.createComponents=function(frag,_661){
        var _662=[];
        var _663=false;
        try{
            if((frag)&&(frag["tagName"])&&(frag!=frag["nodeRef"])){
                var _664=dojo.widget.tags;
                var tna=String(frag["tagName"]).split(";");
                for(var x=0;x<tna.length;x++){
                    var ltn=(tna[x].replace(/^\s+|\s+$/g,"")).toLowerCase();
                    var pos=ltn.indexOf(":");
                    var _669=(pos>0)?ltn.substring(0,pos):null;
                    if(!_664[ltn]&&dojo.getNamespace&&dojo.lang.isString(ltn)&&pos>0){
                        var ns=dojo.getNamespace(_669);
                        var _66b=ltn.substring(pos+1,ltn.length);
                        var _66c=null;
                        var _66d=frag[ltn]["dojoDomain"]||frag[ltn]["dojodomain"];
                        if(_66d){
                            _66c=_66d[0].value;
                        }
                        if(ns){
                            ns.load(_66b,_66c);
                        }
                    }
                    if(!_664[ltn]){
                        dojo.deprecated("dojo.widget.Parse.createComponents","Widget not defined for  namespace"+_669+", so searching all namespaces. Developers should specify namespaces for all non-Dojo widgets","0.5");
                        var _66e=dojo.findNamespaceForWidget(_66b);
                        if(_66e){
                            ltn=_66e.nsPrefix+":"+(ltn.indexOf(":")>0?ltn.substring(ltn.indexOf(":")+1):ltn);
                        }
                    }
                    if(_664[ltn]){
                        _663=true;
                        frag.tagName=ltn;
                        var ret=_664[ltn](frag,this,_661,frag["index"]);
                        _662.push(ret);
                    }else{
                        if(dojo.lang.isString(ltn)&&_669&&dojo._namespaces[_669]){
                            dojo.debug("no tag handler registered for type: ",ltn);
                        }
                    }
                }
            }
        }
        catch(e){
            dojo.debug("dojo.widget.Parse: error:",e);
        }
        if(!_663){
            _662=_662.concat(this.createSubComponents(frag,_661));
        }
        return _662;
    };
    this.createSubComponents=function(_670,_671){
        var frag,comps=[];
        for(var item in _670){
            frag=_670[item];
            if((frag)&&(typeof frag=="object")&&(frag!=_670.nodeRef)&&(frag!=_670["tagName"])){
                comps=comps.concat(this.createComponents(frag,_671));
            }
        }
        return comps;
    };
    this.parsePropertySets=function(_674){
        return [];
        var _675=[];
        for(var item in _674){
            if((_674[item]["tagName"]=="dojo:propertyset")){
                _675.push(_674[item]);
            }
        }
        this.propertySetsList.push(_675);
        return _675;
    };
    this.parseProperties=function(_677){
        var _678={};
        for(var item in _677){
            if((_677[item]==_677["tagName"])||(_677[item]==_677.nodeRef)){
            }else{
                if((_677[item]["tagName"])&&(dojo.widget.tags[_677[item].tagName.toLowerCase()])){
                }else{
                    if((_677[item][0])&&(_677[item][0].value!="")&&(_677[item][0].value!=null)){
                        try{
                            if(item.toLowerCase()=="dataprovider"){
                                var _67a=this;
                                this.getDataProvider(_67a,_677[item][0].value);
                                _678.dataProvider=this.dataProvider;
                            }
                            _678[item]=_677[item][0].value;
                            var _67b=this.parseProperties(_677[item]);
                            for(var _67c in _67b){
                                _678[_67c]=_67b[_67c];
                            }
                        }
                        catch(e){
                            dojo.debug(e);
                        }
                    }
                }
            }
        }
        return _678;
    };
    this.getDataProvider=function(_67d,_67e){
        dojo.io.bind({url:_67e,load:function(type,_680){
            if(type=="load"){
                _67d.dataProvider=_680;
            }
        },mimetype:"text/javascript",sync:true});
    };
    this.getPropertySetById=function(_681){
        for(var x=0;x<this.propertySetsList.length;x++){
            if(_681==this.propertySetsList[x]["id"][0].value){
                return this.propertySetsList[x];
            }
        }
        return "";
    };
    this.getPropertySetsByType=function(_683){
        var _684=[];
        for(var x=0;x<this.propertySetsList.length;x++){
            var cpl=this.propertySetsList[x];
            var cpcc=cpl["componentClass"]||cpl["componentType"]||null;
            var _688=this.propertySetsList[x]["id"][0].value;
            if((cpcc)&&(_688==cpcc[0].value)){
                _684.push(cpl);
            }
        }
        return _684;
    };
    this.getPropertySets=function(_689){
        var ppl="dojo:propertyproviderlist";
        var _68b=[];
        var _68c=_689["tagName"];
        if(_689[ppl]){
            var _68d=_689[ppl].value.split(" ");
            for(var _68e in _68d){
                if((_68e.indexOf("..")==-1)&&(_68e.indexOf("://")==-1)){
                    var _68f=this.getPropertySetById(_68e);
                    if(_68f!=""){
                        _68b.push(_68f);
                    }
                }else{
                }
            }
        }
        return (this.getPropertySetsByType(_68c)).concat(_68b);
    };
    this.createComponentFromScript=function(_690,_691,_692,_693){
        if(!_693){
            _693="dojo";
        }
        var ltn=_693+":"+_691.toLowerCase();
        var _695=dojo.widget.tags;
        if(!_695[ltn]&&dojo.getNamespace&&dojo.lang.isString(ltn)){
            var ns=dojo.getNamespace(_693);
            if(ns){
                ns.load(_691);
            }
        }
        if(!_695[ltn]){
            dojo.deprecated("dojo.widget.Parse.createComponentFromScript","Widget not defined for namespace"+_693+", so searching all namespaces. Developers should specify namespaces for all non-Dojo widgets","0.5");
            var _697=dojo.findNamespaceForWidget(_691.toLowerCase());
            if(_697){
                var _698=_697.nsPrefix+":"+(ltn.indexOf(":")>0?ltn.substring(ltn.indexOf(":")+1):ltn);
                _692[_698]=_692[ltn];
                _692.namespace=_697.nsPrefix;
                ltn=_698;
            }
        }
        if(_695[ltn]){
            _692.fastMixIn=true;
            var ret=[dojo.widget.buildWidgetFromParseTree(ltn,_692,this,null,null,_692)];
            return ret;
        }else{
            dojo.debug("no tag handler registered for type: ",ltn);
        }
    };
};
dojo.widget._parser_collection={"dojo":new dojo.widget.Parse()};
dojo.widget.getParser=function(name){
    if(!name){
        name="dojo";
    }
    if(!this._parser_collection[name]){
        this._parser_collection[name]=new dojo.widget.Parse();
    }
    return this._parser_collection[name];
};
dojo.widget.createWidget=function(name,_69c,_69d,_69e){
    var _69f=false;
    var _6a0=(typeof name=="string");
    if(_6a0){
        var pos=name.indexOf(":");
        var _6a2=(pos>-1)?name.substring(0,pos):"dojo";
        if(pos>-1){
            name=name.substring(pos+1);
        }
        var _6a3=name.toLowerCase();
        var _6a4=_6a2+":"+_6a3;
        _69f=(dojo.byId(name)&&(!dojo.widget.tags[_6a4]));
    }
    if((arguments.length==1)&&((_69f)||(!_6a0))){
        var xp=new dojo.xml.Parse();
        var tn=(_69f)?dojo.byId(name):name;
        return dojo.widget.getParser().createComponents(xp.parseElement(tn,null,true))[0];
    }
    function fromScript(_6a7,name,_6a9,_6aa){
        _6a9[_6a4]={dojotype:[{value:_6a3}],nodeRef:_6a7,fastMixIn:true};
        _6a9.namespace=_6aa;
        return dojo.widget.getParser().createComponentFromScript(_6a7,name,_6a9,_6aa);
    }
    _69c=_69c||{};
    var _6ab=false;
    var tn=null;
    var h=dojo.render.html.capable;
    if(h){
        tn=document.createElement("span");
    }
    if(!_69d){
        _6ab=true;
        _69d=tn;
        if(h){
            dojo.body().appendChild(_69d);
        }
    }else{
        if(_69e){
            dojo.dom.insertAtPosition(tn,_69d,_69e);
        }else{
            tn=_69d;
        }
    }
    var _6ad=fromScript(tn,name.toLowerCase(),_69c,_6a2);
    if(!_6ad||!_6ad[0]||typeof _6ad[0].widgetType=="undefined"){
        throw new Error("createWidget: Creation of \""+name+"\" widget failed.");
    }
    if(_6ab){
        if(_6ad[0].domNode.parentNode){
            _6ad[0].domNode.parentNode.removeChild(_6ad[0].domNode);
        }
    }
    return _6ad[0];
};
dojo.provide("dojo.namespaces.dojo");
(function(){
    var map={html:{"accordioncontainer":"dojo.widget.AccordionContainer","treerpccontroller":"dojo.widget.TreeRPCController","accordionpane":"dojo.widget.AccordionPane","button":"dojo.widget.Button","chart":"dojo.widget.Chart","checkbox":"dojo.widget.Checkbox","civicrmdatepicker":"dojo.widget.CiviCrmDatePicker","colorpalette":"dojo.widget.ColorPalette","combobox":"dojo.widget.ComboBox","combobutton":"dojo.widget.Button","contentpane":"dojo.widget.ContentPane","contextmenu":"dojo.widget.ContextMenu","datepicker":"dojo.widget.DatePicker","debugconsole":"dojo.widget.DebugConsole","dialog":"dojo.widget.Dialog","docpane":"dojo.widget.DocPane","dropdownbutton":"dojo.widget.Button","dropdowndatepicker":"dojo.widget.DropdownDatePicker","editor2":"dojo.widget.Editor2","editor2toolbar":"dojo.widget.Editor2Toolbar","editor":"dojo.widget.Editor","editortree":"dojo.widget.EditorTree","editortreecontextmenu":"dojo.widget.EditorTreeContextMenu","editortreenode":"dojo.widget.EditorTreeNode","fisheyelist":"dojo.widget.FisheyeList","editortreecontroller":"dojo.widget.EditorTreeController","googlemap":"dojo.widget.GoogleMap","editortreeselector":"dojo.widget.EditorTreeSelector","floatingpane":"dojo.widget.FloatingPane","hslcolorpicker":"dojo.widget.HslColorPicker","inlineeditbox":"dojo.widget.InlineEditBox","layoutcontainer":"dojo.widget.LayoutContainer","linkpane":"dojo.widget.LinkPane","manager":"dojo.widget.Manager","popupcontainer":"dojo.widget.Menu2","popupmenu2":"dojo.widget.Menu2","menuitem2":"dojo.widget.Menu2","menuseparator2":"dojo.widget.Menu2","menubar2":"dojo.widget.Menu2","menubaritem2":"dojo.widget.Menu2","monthlyCalendar":"dojo.widget.MonthlyCalendar","richtext":"dojo.widget.RichText","remotetabcontroller":"dojo.widget.RemoteTabController","resizehandle":"dojo.widget.ResizeHandle","resizabletextarea":"dojo.widget.ResizableTextarea","select":"dojo.widget.Select","slideshow":"dojo.widget.SlideShow","sortabletable":"dojo.widget.SortableTable","splitcontainer":"dojo.widget.SplitContainer","svgbutton":"dojo.widget.SvgButton","tabcontainer":"dojo.widget.TabContainer","taskbar":"dojo.widget.TaskBar","timepicker":"dojo.widget.TimePicker","titlepane":"dojo.widget.TitlePane","toaster":"dojo.widget.Toaster","toggler":"dojo.widget.Toggler","toolbar":"dojo.widget.Toolbar","tooltip":"dojo.widget.Tooltip","tree":"dojo.widget.Tree","treebasiccontroller":"dojo.widget.TreeBasicController","treecontextmenu":"dojo.widget.TreeContextMenu","treeselector":"dojo.widget.TreeSelector","treecontrollerextension":"dojo.widget.TreeControllerExtension","treenode":"dojo.widget.TreeNode","validate":"dojo.widget.validate","treeloadingcontroller":"dojo.widget.TreeLoadingController","widget":"dojo.widget.Widget","wizard":"dojo.widget.Wizard","yahoomap":"dojo.widget.YahooMap"},svg:{"chart":"dojo.widget.svg.Chart","hslcolorpicker":"dojo.widget.svg.HslColorPicker"},vml:{"chart":"dojo.widget.vml.Chart"}};
    function dojoNamespaceResolver(name,_6b0){
        if(!_6b0){
            _6b0="html";
        }
        if(!map[_6b0]){
            return null;
        }
        return map[_6b0][name];
    }
    dojo.defineNamespace("dojo","src","dojo",dojoNamespaceResolver);
    dojo.addDojoNamespaceMapping=function(_6b1,_6b2){
        map[_6b1]=_6b2;
    };
})();
dojo.provide("dojo.widget.*");
dojo.provide("dojo.widget.ToolbarContainer");
dojo.provide("dojo.widget.Toolbar");
dojo.provide("dojo.widget.ToolbarItem");
dojo.provide("dojo.widget.ToolbarButtonGroup");
dojo.provide("dojo.widget.ToolbarButton");
dojo.provide("dojo.widget.ToolbarDialog");
dojo.provide("dojo.widget.ToolbarMenu");
dojo.provide("dojo.widget.ToolbarSeparator");
dojo.provide("dojo.widget.ToolbarSpace");
dojo.provide("dojo.widget.Icon");
dojo.widget.defineWidget("dojo.widget.ToolbarContainer",dojo.widget.HtmlWidget,{isContainer:true,templateString:"<div class=\"toolbarContainer\" dojoAttachPoint=\"containerNode\"></div>",templateCssPath:dojo.uri.dojoUri("src/widget/templates/Toolbar.css"),getItem:function(name){
    if(name instanceof dojo.widget.ToolbarItem){
        return name;
    }
    for(var i=0;i<this.children.length;i++){
        var _6b5=this.children[i];
        if(_6b5 instanceof dojo.widget.Toolbar){
            var item=_6b5.getItem(name);
            if(item){
                return item;
            }
        }
    }
    return null;
},getItems:function(){
    var _6b7=[];
    for(var i=0;i<this.children.length;i++){
        var _6b9=this.children[i];
        if(_6b9 instanceof dojo.widget.Toolbar){
            _6b7=_6b7.concat(_6b9.getItems());
        }
    }
    return _6b7;
},enable:function(){
    for(var i=0;i<this.children.length;i++){
        var _6bb=this.children[i];
        if(_6bb instanceof dojo.widget.Toolbar){
            _6bb.enable.apply(_6bb,arguments);
        }
    }
},disable:function(){
    for(var i=0;i<this.children.length;i++){
        var _6bd=this.children[i];
        if(_6bd instanceof dojo.widget.Toolbar){
            _6bd.disable.apply(_6bd,arguments);
        }
    }
},select:function(name){
    for(var i=0;i<this.children.length;i++){
        var _6c0=this.children[i];
        if(_6c0 instanceof dojo.widget.Toolbar){
            _6c0.select(arguments);
        }
    }
},deselect:function(name){
    for(var i=0;i<this.children.length;i++){
        var _6c3=this.children[i];
        if(_6c3 instanceof dojo.widget.Toolbar){
            _6c3.deselect(arguments);
        }
    }
},getItemsState:function(){
    var _6c4={};
    for(var i=0;i<this.children.length;i++){
        var _6c6=this.children[i];
        if(_6c6 instanceof dojo.widget.Toolbar){
            dojo.lang.mixin(_6c4,_6c6.getItemsState());
        }
    }
    return _6c4;
},getItemsActiveState:function(){
    var _6c7={};
    for(var i=0;i<this.children.length;i++){
        var _6c9=this.children[i];
        if(_6c9 instanceof dojo.widget.Toolbar){
            dojo.lang.mixin(_6c7,_6c9.getItemsActiveState());
        }
    }
    return _6c7;
},getItemsSelectedState:function(){
    var _6ca={};
    for(var i=0;i<this.children.length;i++){
        var _6cc=this.children[i];
        if(_6cc instanceof dojo.widget.Toolbar){
            dojo.lang.mixin(_6ca,_6cc.getItemsSelectedState());
        }
    }
    return _6ca;
}});
dojo.widget.defineWidget("dojo.widget.Toolbar",dojo.widget.HtmlWidget,{isContainer:true,templateString:"<div class=\"toolbar\" dojoAttachPoint=\"containerNode\" unselectable=\"on\" dojoOnMouseover=\"_onmouseover\" dojoOnMouseout=\"_onmouseout\" dojoOnClick=\"_onclick\" dojoOnMousedown=\"_onmousedown\" dojoOnMouseup=\"_onmouseup\"></div>",_getItem:function(node){
    var _6ce=new Date();
    var _6cf=null;
    while(node&&node!=this.domNode){
        if(dojo.html.hasClass(node,"toolbarItem")){
            var _6d0=dojo.widget.manager.getWidgetsByFilter(function(w){
                return w.domNode==node;
            });
            if(_6d0.length==1){
                _6cf=_6d0[0];
                break;
            }else{
                if(_6d0.length>1){
                    dojo.raise("Toolbar._getItem: More than one widget matches the node");
                }
            }
        }
        node=node.parentNode;
    }
    return _6cf;
},_onmouseover:function(e){
    var _6d3=this._getItem(e.target);
    if(_6d3&&_6d3._onmouseover){
        _6d3._onmouseover(e);
    }
},_onmouseout:function(e){
    var _6d5=this._getItem(e.target);
    if(_6d5&&_6d5._onmouseout){
        _6d5._onmouseout(e);
    }
},_onclick:function(e){
    var _6d7=this._getItem(e.target);
    if(_6d7&&_6d7._onclick){
        _6d7._onclick(e);
    }
},_onmousedown:function(e){
    var _6d9=this._getItem(e.target);
    if(_6d9&&_6d9._onmousedown){
        _6d9._onmousedown(e);
    }
},_onmouseup:function(e){
    var _6db=this._getItem(e.target);
    if(_6db&&_6db._onmouseup){
        _6db._onmouseup(e);
    }
},addChild:function(item,pos,_6de){
    var _6df=dojo.widget.ToolbarItem.make(item,null,_6de);
    var ret=dojo.widget.Toolbar.superclass.addChild.call(this,_6df,null,pos,null);
    return ret;
},push:function(){
    for(var i=0;i<arguments.length;i++){
        this.addChild(arguments[i]);
    }
},getItem:function(name){
    if(name instanceof dojo.widget.ToolbarItem){
        return name;
    }
    for(var i=0;i<this.children.length;i++){
        var _6e4=this.children[i];
        if(_6e4 instanceof dojo.widget.ToolbarItem&&_6e4._name==name){
            return _6e4;
        }
    }
    return null;
},getItems:function(){
    var _6e5=[];
    for(var i=0;i<this.children.length;i++){
        var _6e7=this.children[i];
        if(_6e7 instanceof dojo.widget.ToolbarItem){
            _6e5.push(_6e7);
        }
    }
    return _6e5;
},getItemsState:function(){
    var _6e8={};
    for(var i=0;i<this.children.length;i++){
        var _6ea=this.children[i];
        if(_6ea instanceof dojo.widget.ToolbarItem){
            _6e8[_6ea._name]={selected:_6ea._selected,enabled:_6ea._enabled};
        }
    }
    return _6e8;
},getItemsActiveState:function(){
    var _6eb=this.getItemsState();
    for(var item in _6eb){
        _6eb[item]=_6eb[item].enabled;
    }
    return _6eb;
},getItemsSelectedState:function(){
    var _6ed=this.getItemsState();
    for(var item in _6ed){
        _6ed[item]=_6ed[item].selected;
    }
    return _6ed;
},enable:function(){
    var _6ef=arguments.length?arguments:this.children;
    for(var i=0;i<_6ef.length;i++){
        var _6f1=this.getItem(_6ef[i]);
        if(_6f1 instanceof dojo.widget.ToolbarItem){
            _6f1.enable(false,true);
        }
    }
},disable:function(){
    var _6f2=arguments.length?arguments:this.children;
    for(var i=0;i<_6f2.length;i++){
        var _6f4=this.getItem(_6f2[i]);
        if(_6f4 instanceof dojo.widget.ToolbarItem){
            _6f4.disable();
        }
    }
},select:function(){
    for(var i=0;i<arguments.length;i++){
        var name=arguments[i];
        var item=this.getItem(name);
        if(item){
            item.select();
        }
    }
},deselect:function(){
    for(var i=0;i<arguments.length;i++){
        var name=arguments[i];
        var item=this.getItem(name);
        if(item){
            item.disable();
        }
    }
},setValue:function(){
    for(var i=0;i<arguments.length;i+=2){
        var name=arguments[i],value=arguments[i+1];
        var item=this.getItem(name);
        if(item){
            if(item instanceof dojo.widget.ToolbarItem){
                item.setValue(value);
            }
        }
    }
}});
dojo.widget.defineWidget("dojo.widget.ToolbarItem",dojo.widget.HtmlWidget,{templateString:"<span unselectable=\"on\" class=\"toolbarItem\"></span>",_name:null,getName:function(){
    return this._name;
},setName:function(_6fe){
    return (this._name=_6fe);
},getValue:function(){
    return this.getName();
},setValue:function(_6ff){
    return this.setName(_6ff);
},_selected:false,isSelected:function(){
    return this._selected;
},setSelected:function(is,_701,_702){
    if(!this._toggleItem&&!_701){
        return;
    }
    is=Boolean(is);
    if(_701||this._enabled&&this._selected!=is){
        this._selected=is;
        this.update();
        if(!_702){
            this._fireEvent(is?"onSelect":"onDeselect");
            this._fireEvent("onChangeSelect");
        }
    }
},select:function(_703,_704){
    return this.setSelected(true,_703,_704);
},deselect:function(_705,_706){
    return this.setSelected(false,_705,_706);
},_toggleItem:false,isToggleItem:function(){
    return this._toggleItem;
},setToggleItem:function(_707){
    this._toggleItem=Boolean(_707);
},toggleSelected:function(_708){
    return this.setSelected(!this._selected,_708);
},_enabled:true,isEnabled:function(){
    return this._enabled;
},setEnabled:function(is,_70a,_70b){
    is=Boolean(is);
    if(_70a||this._enabled!=is){
        this._enabled=is;
        this.update();
        if(!_70b){
            this._fireEvent(this._enabled?"onEnable":"onDisable");
            this._fireEvent("onChangeEnabled");
        }
    }
    return this._enabled;
},enable:function(_70c,_70d){
    return this.setEnabled(true,_70c,_70d);
},disable:function(_70e,_70f){
    return this.setEnabled(false,_70e,_70f);
},toggleEnabled:function(_710,_711){
    return this.setEnabled(!this._enabled,_710,_711);
},_icon:null,getIcon:function(){
    return this._icon;
},setIcon:function(_712){
    var icon=dojo.widget.Icon.make(_712);
    if(this._icon){
        this._icon.setIcon(icon);
    }else{
        this._icon=icon;
    }
    var _714=this._icon.getNode();
    if(_714.parentNode!=this.domNode){
        if(this.domNode.hasChildNodes()){
            this.domNode.insertBefore(_714,this.domNode.firstChild);
        }else{
            this.domNode.appendChild(_714);
        }
    }
    return this._icon;
},_label:"",getLabel:function(){
    return this._label;
},setLabel:function(_715){
    var ret=(this._label=_715);
    if(!this.labelNode){
        this.labelNode=document.createElement("span");
        this.domNode.appendChild(this.labelNode);
    }
    this.labelNode.innerHTML="";
    this.labelNode.appendChild(document.createTextNode(this._label));
    this.update();
    return ret;
},update:function(){
    if(this._enabled){
        dojo.html.removeClass(this.domNode,"disabled");
        if(this._selected){
            dojo.html.addClass(this.domNode,"selected");
        }else{
            dojo.html.removeClass(this.domNode,"selected");
        }
    }else{
        this._selected=false;
        dojo.html.addClass(this.domNode,"disabled");
        dojo.html.removeClass(this.domNode,"down");
        dojo.html.removeClass(this.domNode,"hover");
    }
    this._updateIcon();
},_updateIcon:function(){
    if(this._icon){
        if(this._enabled){
            if(this._cssHover){
                this._icon.hover();
            }else{
                if(this._selected){
                    this._icon.select();
                }else{
                    this._icon.enable();
                }
            }
        }else{
            this._icon.disable();
        }
    }
},_fireEvent:function(evt){
    if(typeof this[evt]=="function"){
        var args=[this];
        for(var i=1;i<arguments.length;i++){
            args.push(arguments[i]);
        }
        this[evt].apply(this,args);
    }
},_onmouseover:function(e){
    if(!this._enabled){
        return;
    }
    dojo.html.addClass(this.domNode,"hover");
},_onmouseout:function(e){
    dojo.html.removeClass(this.domNode,"hover");
    dojo.html.removeClass(this.domNode,"down");
    if(!this._selected){
        dojo.html.removeClass(this.domNode,"selected");
    }
},_onclick:function(e){
    if(this._enabled&&!this._toggleItem){
        this._fireEvent("onClick");
    }
},_onmousedown:function(e){
    if(e.preventDefault){
        e.preventDefault();
    }
    if(!this._enabled){
        return;
    }
    dojo.html.addClass(this.domNode,"down");
    if(this._toggleItem){
        if(this.parent.preventDeselect&&this._selected){
            return;
        }
        this.toggleSelected();
    }
},_onmouseup:function(e){
    dojo.html.removeClass(this.domNode,"down");
},fillInTemplate:function(args,frag){
    if(args.name){
        this._name=args.name;
    }
    if(args.selected){
        this.select();
    }
    if(args.disabled){
        this.disable();
    }
    if(args.label){
        this.setLabel(args.label);
    }
    if(args.icon){
        this.setIcon(args.icon);
    }
    if(args.toggleitem||args.toggleItem){
        this.setToggleItem(true);
    }
}});
dojo.widget.ToolbarItem.make=function(wh,_722,_723){
    var item=null;
    if(wh instanceof Array){
        item=dojo.widget.createWidget("ToolbarButtonGroup",_723);
        item.setName(wh[0]);
        for(var i=1;i<wh.length;i++){
            item.addChild(wh[i]);
        }
    }else{
        if(wh instanceof dojo.widget.ToolbarItem){
            item=wh;
        }else{
            if(wh instanceof dojo.uri.Uri){
                item=dojo.widget.createWidget("ToolbarButton",dojo.lang.mixin(_723||{},{icon:new dojo.widget.Icon(wh.toString())}));
            }else{
                if(_722){
                    item=dojo.widget.createWidget(wh,_723);
                }else{
                    if(typeof wh=="string"||wh instanceof String){
                        switch(wh.charAt(0)){
                            case "|":
                            case "-":
                            case "/":
                                item=dojo.widget.createWidget("ToolbarSeparator",_723);
                                break;
                            case " ":
                                if(wh.length==1){
                                    item=dojo.widget.createWidget("ToolbarSpace",_723);
                                }else{
                                    item=dojo.widget.createWidget("ToolbarFlexibleSpace",_723);
                                }
                                break;
                            default:
                                if(/\.(gif|jpg|jpeg|png)$/i.test(wh)){
                                    item=dojo.widget.createWidget("ToolbarButton",dojo.lang.mixin(_723||{},{icon:new dojo.widget.Icon(wh.toString())}));
                                }else{
                                    item=dojo.widget.createWidget("ToolbarButton",dojo.lang.mixin(_723||{},{label:wh.toString()}));
                                }
                        }
                    }else{
                        if(wh&&wh.tagName&&/^img$/i.test(wh.tagName)){
                            alert(wh.tagName);
                            item=dojo.widget.createWidget("ToolbarButton",dojo.lang.mixin(_723||{},{icon:wh}));
                        }else{
                            item=dojo.widget.createWidget("ToolbarButton",dojo.lang.mixin(_723||{},{label:wh.toString()}));
                        }
                    }
                }
            }
        }
    }
    return item;
};
dojo.widget.defineWidget("dojo.widget.ToolbarButtonGroup",dojo.widget.ToolbarItem,{isContainer:true,templateString:"<span unselectable=\"on\" class=\"toolbarButtonGroup\" dojoAttachPoint=\"containerNode\"></span>",defaultButton:"",postCreate:function(){
    for(var i=0;i<this.children.length;i++){
        this._injectChild(this.children[i]);
    }
},addChild:function(item,pos,_729){
    var _72a=dojo.widget.ToolbarItem.make(item,null,dojo.lang.mixin(_729||{},{toggleItem:true}));
    var ret=dojo.widget.ToolbarButtonGroup.superclass.addChild.call(this,_72a,null,pos,null);
    this._injectChild(_72a);
    return ret;
},_injectChild:function(_72c){
    dojo.event.connect(_72c,"onSelect",this,"onChildSelected");
    dojo.event.connect(_72c,"onDeselect",this,"onChildDeSelected");
    if(_72c._name==this.defaultButton||(typeof this.defaultButton=="number"&&this.children.length-1==this.defaultButton)){
        _72c.select(false,true);
    }
},getItem:function(name){
    if(name instanceof dojo.widget.ToolbarItem){
        return name;
    }
    for(var i=0;i<this.children.length;i++){
        var _72f=this.children[i];
        if(_72f instanceof dojo.widget.ToolbarItem&&_72f._name==name){
            return _72f;
        }
    }
    return null;
},getItems:function(){
    var _730=[];
    for(var i=0;i<this.children.length;i++){
        var _732=this.children[i];
        if(_732 instanceof dojo.widget.ToolbarItem){
            _730.push(_732);
        }
    }
    return _730;
},onChildSelected:function(e){
    this.select(e._name);
},onChildDeSelected:function(e){
    this._fireEvent("onChangeSelect",this._value);
},enable:function(_735,_736){
    for(var i=0;i<this.children.length;i++){
        var _738=this.children[i];
        if(_738 instanceof dojo.widget.ToolbarItem){
            _738.enable(_735,_736);
            if(_738._name==this._value){
                _738.select(_735,_736);
            }
        }
    }
},disable:function(_739,_73a){
    for(var i=0;i<this.children.length;i++){
        var _73c=this.children[i];
        if(_73c instanceof dojo.widget.ToolbarItem){
            _73c.disable(_739,_73a);
        }
    }
},_value:"",getValue:function(){
    return this._value;
},select:function(name,_73e,_73f){
    for(var i=0;i<this.children.length;i++){
        var _741=this.children[i];
        if(_741 instanceof dojo.widget.ToolbarItem){
            if(_741._name==name){
                _741.select(_73e,_73f);
                this._value=name;
            }else{
                _741.deselect(true,true);
            }
        }
    }
    if(!_73f){
        this._fireEvent("onSelect",this._value);
        this._fireEvent("onChangeSelect",this._value);
    }
},setValue:this.select,preventDeselect:false});
dojo.widget.defineWidget("dojo.widget.ToolbarButton",dojo.widget.ToolbarItem,{fillInTemplate:function(args,frag){
    dojo.widget.ToolbarButton.superclass.fillInTemplate.call(this,args,frag);
    dojo.html.addClass(this.domNode,"toolbarButton");
    if(this._icon){
        this.setIcon(this._icon);
    }
    if(this._label){
        this.setLabel(this._label);
    }
    if(!this._name){
        if(this._label){
            this.setName(this._label);
        }else{
            if(this._icon){
                var src=this._icon.getSrc("enabled").match(/[\/^]([^\.\/]+)\.(gif|jpg|jpeg|png)$/i);
                if(src){
                    this.setName(src[1]);
                }
            }else{
                this._name=this._widgetId;
            }
        }
    }
}});
dojo.widget.defineWidget("dojo.widget.ToolbarDialog",dojo.widget.ToolbarButton,{fillInTemplate:function(args,frag){
    dojo.widget.ToolbarDialog.superclass.fillInTemplate.call(this,args,frag);
    dojo.event.connect(this,"onSelect",this,"showDialog");
    dojo.event.connect(this,"onDeselect",this,"hideDialog");
},showDialog:function(e){
    dojo.lang.setTimeout(dojo.event.connect,1,document,"onmousedown",this,"deselect");
},hideDialog:function(e){
    dojo.event.disconnect(document,"onmousedown",this,"deselect");
}});
dojo.widget.defineWidget("dojo.widget.ToolbarMenu",dojo.widget.ToolbarDialog,{});
dojo.widget.ToolbarMenuItem=function(){
};
dojo.widget.defineWidget("dojo.widget.ToolbarSeparator",dojo.widget.ToolbarItem,{templateString:"<span unselectable=\"on\" class=\"toolbarItem toolbarSeparator\"></span>",defaultIconPath:new dojo.uri.dojoUri("src/widget/templates/buttons/sep.gif"),fillInTemplate:function(args,frag,skip){
    dojo.widget.ToolbarSeparator.superclass.fillInTemplate.call(this,args,frag);
    this._name=this.widgetId;
    if(!skip){
        if(!this._icon){
            this.setIcon(this.defaultIconPath);
        }
        this.domNode.appendChild(this._icon.getNode());
    }
},_onmouseover:null,_onmouseout:null,_onclick:null,_onmousedown:null,_onmouseup:null});
dojo.widget.defineWidget("dojo.widget.ToolbarSpace",dojo.widget.ToolbarSeparator,{fillInTemplate:function(args,frag,skip){
    dojo.widget.ToolbarSpace.superclass.fillInTemplate.call(this,args,frag,true);
    if(!skip){
        dojo.html.addClass(this.domNode,"toolbarSpace");
    }
}});
dojo.widget.defineWidget("dojo.widget.ToolbarSelect",dojo.widget.ToolbarItem,{templateString:"<span class=\"toolbarItem toolbarSelect\" unselectable=\"on\"><select dojoAttachPoint=\"selectBox\" dojoOnChange=\"changed\"></select></span>",fillInTemplate:function(args,frag){
    dojo.widget.ToolbarSelect.superclass.fillInTemplate.call(this,args,frag,true);
    var keys=args.values;
    var i=0;
    for(var val in keys){
        var opt=document.createElement("option");
        opt.setAttribute("value",keys[val]);
        opt.innerHTML=val;
        this.selectBox.appendChild(opt);
    }
},changed:function(e){
    this._fireEvent("onSetValue",this.selectBox.value);
},setEnabled:function(is,_757,_758){
    var ret=dojo.widget.ToolbarSelect.superclass.setEnabled.call(this,is,_757,_758);
    this.selectBox.disabled=!this._enabled;
    return ret;
},_onmouseover:null,_onmouseout:null,_onclick:null,_onmousedown:null,_onmouseup:null});
dojo.widget.Icon=function(_75a,_75b,_75c,_75d){
    if(!arguments.length){
        throw new Error("Icon must have at least an enabled state");
    }
    var _75e=["enabled","disabled","hover","selected"];
    var _75f="enabled";
    var _760=document.createElement("img");
    this.getState=function(){
        return _75f;
    };
    this.setState=function(_761){
        if(dojo.lang.inArray(_761,_75e)){
            if(this[_761]){
                _75f=_761;
                _760.setAttribute("src",this[_75f].src);
            }
        }else{
            throw new Error("Invalid state set on Icon (state: "+_761+")");
        }
    };
    this.setSrc=function(_762,_763){
        if(/^img$/i.test(_763.tagName)){
            this[_762]=_763;
        }else{
            if(typeof _763=="string"||_763 instanceof String||_763 instanceof dojo.uri.Uri){
                this[_762]=new Image();
                this[_762].src=_763.toString();
            }
        }
        return this[_762];
    };
    this.setIcon=function(icon){
        for(var i=0;i<_75e.length;i++){
            if(icon[_75e[i]]){
                this.setSrc(_75e[i],icon[_75e[i]]);
            }
        }
        this.update();
    };
    this.enable=function(){
        this.setState("enabled");
    };
    this.disable=function(){
        this.setState("disabled");
    };
    this.hover=function(){
        this.setState("hover");
    };
    this.select=function(){
        this.setState("selected");
    };
    this.getSize=function(){
        return {width:_760.width||_760.offsetWidth,height:_760.height||_760.offsetHeight};
    };
    this.setSize=function(w,h){
        _760.width=w;
        _760.height=h;
        return {width:w,height:h};
    };
    this.getNode=function(){
        return _760;
    };
    this.getSrc=function(_768){
        if(_768){
            return this[_768].src;
        }
        return _760.src||"";
    };
    this.update=function(){
        this.setState(_75f);
    };
    for(var i=0;i<_75e.length;i++){
        var arg=arguments[i];
        var _76b=_75e[i];
        this[_76b]=null;
        if(!arg){
            continue;
        }
        this.setSrc(_76b,arg);
    }
    this.enable();
};
dojo.widget.Icon.make=function(a,b,c,d){
    for(var i=0;i<arguments.length;i++){
        if(arguments[i] instanceof dojo.widget.Icon){
            return arguments[i];
        }
    }
    return new dojo.widget.Icon(a,b,c,d);
};
dojo.provide("dojo.html.selection");
dojo.html.selectionType={NONE:0,TEXT:1,CONTROL:2};
dojo.html.clearSelection=function(){
    var _771=dojo.global();
    var _772=dojo.doc();
    try{
        if(_771["getSelection"]){
            if(dojo.render.html.safari){
                _771.getSelection().collapse();
            }else{
                _771.getSelection().removeAllRanges();
            }
        }else{
            if(_772.selection){
                if(_772.selection.empty){
                    _772.selection.empty();
                }else{
                    if(_772.selection.clear){
                        _772.selection.clear();
                    }
                }
            }
        }
        return true;
    }
    catch(e){
        dojo.debug(e);
        return false;
    }
};
dojo.html.disableSelection=function(_773){
    _773=dojo.byId(_773)||dojo.body();
    var h=dojo.render.html;
    if(h.mozilla){
        _773.style.MozUserSelect="none";
    }else{
        if(h.safari){
            _773.style.KhtmlUserSelect="none";
        }else{
            if(h.ie){
                _773.unselectable="on";
            }else{
                return false;
            }
        }
    }
    return true;
};
dojo.html.enableSelection=function(_775){
    _775=dojo.byId(_775)||dojo.body();
    var h=dojo.render.html;
    if(h.mozilla){
        _775.style.MozUserSelect="";
    }else{
        if(h.safari){
            _775.style.KhtmlUserSelect="";
        }else{
            if(h.ie){
                _775.unselectable="off";
            }else{
                return false;
            }
        }
    }
    return true;
};
dojo.html.selectElement=function(_777){
    var _778=dojo.global();
    var _779=dojo.doc();
    _777=dojo.byId(_777);
    if(_779.selection&&dojo.body().createTextRange){
        var _77a=dojo.body().createTextRange();
        _77a.moveToElementText(_777);
        _77a.select();
    }else{
        if(_778["getSelection"]){
            var _77b=_778.getSelection();
            if(_77b["selectAllChildren"]){
                _77b.selectAllChildren(_777);
            }
        }
    }
};
dojo.html.selectInputText=function(_77c){
    var _77d=dojo.global();
    var _77e=dojo.doc();
    _77c=dojo.byId(_77c);
    if(_77e.selection&&dojo.body().createTextRange){
        var _77f=_77c.createTextRange();
        _77f.moveStart("character",0);
        _77f.moveEnd("character",_77c.value.length);
        _77f.select();
    }else{
        if(_77d["getSelection"]){
            var _780=_77d.getSelection();
            _77c.setSelectionRange(0,_77c.value.length);
        }
    }
    _77c.focus();
};
dojo.html.isSelectionCollapsed=function(){
    var _781=dojo.global();
    var _782=dojo.doc();
    if(_782["selection"]){
        return _782.selection.createRange().text=="";
    }else{
        if(_781["getSelection"]){
            var _783=_781.getSelection();
            if(dojo.lang.isString(_783)){
                return _783=="";
            }else{
                return _783.isCollapsed;
            }
        }
    }
};
dojo.lang.mixin(dojo.html.selection,{getType:function(){
    if(dojo.doc().selection){
        return dojo.html.selectionType[dojo.doc().selection.type.toUpperCase()];
    }else{
        var _784=dojo.html.selectionType.TEXT;
        var oSel;
        try{
            oSel=dojo.global().getSelection();
        }
        catch(e){
        }
        if(oSel&&oSel.rangeCount==1){
            var _786=oSel.getRangeAt(0);
            if(_786.startContainer==_786.endContainer&&(_786.endOffset-_786.startOffset)==1&&_786.startContainer.nodeType!=dojo.dom.TEXT_NODE){
                _784=dojo.html.selectionType.CONTROL;
            }
        }
        return _784;
    }
},getSelectedElement:function(){
    if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
        if(dojo.doc().selection){
            var _787=dojo.doc().selection.createRange();
            if(_787&&_787.item){
                return dojo.doc().selection.createRange().item(0);
            }
        }else{
            var _788=dojo.global().getSelection();
            return _788.anchorNode.childNodes[_788.anchorOffset];
        }
    }
},getParentElement:function(){
    if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
        var p=dojo.html.selection.getSelectedElement();
        if(p){
            return p.parentNode;
        }
    }else{
        if(dojo.doc().selection){
            return dojo.doc().selection.createRange().parentElement();
        }else{
            var _78a=dojo.global().getSelection();
            if(_78a){
                var node=_78a.anchorNode;
                while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
                    node=node.parentNode;
                }
                return node;
            }
        }
    }
},hasAncestorElement:function(_78c){
    return (dojo.html.selection.getAncestorElement.apply(this,arguments)!=null);
},getAncestorElement:function(_78d){
    var node=dojo.html.selection.getSelectedElement()||dojo.html.selection.getParentElement();
    while(node){
        if(dojo.html.selection.isTag(node,arguments).length>0){
            return node;
        }
        node=node.parentNode;
    }
    return null;
},isTag:function(node,tags){
    if(node&&node.tagName){
        for(var i=0;i<tags.length;i++){
            if(node.tagName.toLowerCase()==String(tags[i]).toLowerCase()){
                return String(tags[i]).toLowerCase();
            }
        }
    }
    return "";
},selectElement:function(_792){
    var _793=dojo.global();
    var _794=dojo.doc();
    _792=dojo.byId(_792);
    if(_794.selection&&dojo.body().createTextRange){
        try{
            var _795=dojo.body().createControlRange();
            _795.addElement(_792);
            _795.select();
        }
        catch(e){
            dojo.html.selection.selectElementChildren(_792);
        }
    }else{
        if(_793["getSelection"]){
            var _796=_793.getSelection();
            if(_796["removeAllRanges"]){
                var _795=_794.createRange();
                _795.selectNode(_792);
                _796.removeAllRanges();
                _796.addRange(_795);
            }
        }
    }
},selectElementChildren:function(_797){
    var _798=dojo.global();
    var _799=dojo.doc();
    _797=dojo.byId(_797);
    if(_799.selection&&dojo.body().createTextRange){
        var _79a=dojo.body().createTextRange();
        _79a.moveToElementText(_797);
        _79a.select();
    }else{
        if(_798["getSelection"]){
            var _79b=_798.getSelection();
            if(_79b["selectAllChildren"]){
                _79b.selectAllChildren(_797);
            }
        }
    }
},collapse:function(_79c){
    if(dojo.global().getSelection){
        var _79d=dojo.global().getSelection();
        if(_79d.removeAllRanges){
            if(_79c){
                _79d.collapseToStart();
            }else{
                _79d.collapseToEnd();
            }
        }else{
        }
    }else{
        if(dojo.doc().selection){
            var _79e=dojo.doc().selection.createRange();
            _79e.collapse(_79c);
            _79e.select();
        }
    }
},remove:function(){
    if(dojo.doc().selection){
        var oSel=dojo.doc().selection;
        if(oSel.type.toUpperCase()!="NONE"){
            oSel.clear();
        }
        return oSel;
    }else{
        var oSel=dojo.global().getSelection();
        for(var i=0;i<oSel.rangeCount;i++){
            oSel.getRangeAt(i).deleteContents();
        }
        return oSel;
    }
}});
dojo.provide("dojo.widget.ColorPalette");
dojo.widget.defineWidget("dojo.widget.ToolbarColorDialog",dojo.widget.ToolbarDialog,{palette:"7x10",fillInTemplate:function(args,frag){
    dojo.widget.ToolbarColorDialog.superclass.fillInTemplate.call(this,args,frag);
    this.dialog=dojo.widget.createWidget("ColorPalette",{palette:this.palette});
    this.dialog.domNode.style.position="absolute";
    dojo.event.connect(this.dialog,"onColorSelect",this,"_setValue");
},_setValue:function(_7a3){
    this._value=_7a3;
    this._fireEvent("onSetValue",_7a3);
},showDialog:function(e){
    dojo.widget.ToolbarColorDialog.superclass.showDialog.call(this,e);
    var abs=dojo.html.getAbsolutePosition(this.domNode,true);
    var y=abs.y+dojo.html.getBorderBox(this.domNode).height;
    this.dialog.showAt(abs.x,y);
},hideDialog:function(e){
    dojo.widget.ToolbarColorDialog.superclass.hideDialog.call(this,e);
    this.dialog.hide();
}});
dojo.widget.defineWidget("dojo.widget.ColorPalette",dojo.widget.HtmlWidget,{palette:"7x10",bgIframe:null,palettes:{"7x10":[["fff","fcc","fc9","ff9","ffc","9f9","9ff","cff","ccf","fcf"],["ccc","f66","f96","ff6","ff3","6f9","3ff","6ff","99f","f9f"],["c0c0c0","f00","f90","fc6","ff0","3f3","6cc","3cf","66c","c6c"],["999","c00","f60","fc3","fc0","3c0","0cc","36f","63f","c3c"],["666","900","c60","c93","990","090","399","33f","60c","939"],["333","600","930","963","660","060","366","009","339","636"],["000","300","630","633","330","030","033","006","309","303"]],"3x4":[["ffffff","00ff00","008000","0000ff"],["c0c0c0","ffff00","ff00ff","000080"],["808080","ff0000","800080","000000"]]},buildRendering:function(){
    this.domNode=document.createElement("table");
    dojo.html.disableSelection(this.domNode);
    dojo.event.connect(this.domNode,"onmousedown",function(e){
        e.preventDefault();
    });
    with(this.domNode){
        cellPadding="0";
        cellSpacing="1";
        border="1";
        style.backgroundColor="white";
    }
    var _7a9=this.palettes[this.palette];
    for(var i=0;i<_7a9.length;i++){
        var tr=this.domNode.insertRow(-1);
        for(var j=0;j<_7a9[i].length;j++){
            if(_7a9[i][j].length==3){
                _7a9[i][j]=_7a9[i][j].replace(/(.)(.)(.)/,"$1$1$2$2$3$3");
            }
            var td=tr.insertCell(-1);
            with(td.style){
                backgroundColor="#"+_7a9[i][j];
                border="1px solid gray";
                width=height="15px";
                fontSize="1px";
            }
            td.color="#"+_7a9[i][j];
            td.onmouseover=function(e){
                this.style.borderColor="white";
            };
            td.onmouseout=function(e){
                this.style.borderColor="gray";
            };
            dojo.event.connect(td,"onmousedown",this,"click");
            td.innerHTML="&nbsp;";
        }
    }
    if(dojo.render.html.ie){
        this.bgIframe=document.createElement("<iframe frameborder='0' src='javascript:void(0);'>");
        with(this.bgIframe.style){
            position="absolute";
            left=top="0px";
            display="none";
        }
        dojo.body().appendChild(this.bgIframe);
        dojo.html.setOpacity(this.bgIframe,0);
    }
},click:function(e){
    this.onColorSelect(e.currentTarget.color);
    e.currentTarget.style.borderColor="gray";
},onColorSelect:function(_7b1){
},hide:function(){
    this.domNode.parentNode.removeChild(this.domNode);
    if(this.bgIframe){
        this.bgIframe.style.display="none";
    }
},showAt:function(x,y){
    with(this.domNode.style){
        top=y+"px";
        left=x+"px";
        zIndex=999;
    }
    dojo.body().appendChild(this.domNode);
    if(this.bgIframe){
        with(this.bgIframe.style){
            display="block";
            top=y+"px";
            left=x+"px";
            zIndex=998;
            var s=dojo.html.getMarginBox(this.domNode);
            width=s.width+"px";
            height=s.height+"px";
        }
    }
}});
dojo.provide("dojo.string.extras");
dojo.string.substituteParams=function(_7b5,hash){
    var map=(typeof hash=="object")?hash:dojo.lang.toArray(arguments,1);
    return _7b5.replace(/\%\{(\w+)\}/g,function(_7b8,key){
        return map[key]||dojo.raise("Substitution not found: "+key);
    });
};
dojo.string.capitalize=function(str){
    if(!dojo.lang.isString(str)){
        return "";
    }
    if(arguments.length==0){
        str=this;
    }
    var _7bb=str.split(" ");
    for(var i=0;i<_7bb.length;i++){
        _7bb[i]=_7bb[i].charAt(0).toUpperCase()+_7bb[i].substring(1);
    }
    return _7bb.join(" ");
};
dojo.string.isBlank=function(str){
    if(!dojo.lang.isString(str)){
        return true;
    }
    return (dojo.string.trim(str).length==0);
};
dojo.string.encodeAscii=function(str){
    if(!dojo.lang.isString(str)){
        return str;
    }
    var ret="";
    var _7c0=escape(str);
    var _7c1,re=/%u([0-9A-F]{4})/i;
    while((_7c1=_7c0.match(re))){
        var num=Number("0x"+_7c1[1]);
        var _7c3=escape("&#"+num+";");
        ret+=_7c0.substring(0,_7c1.index)+_7c3;
        _7c0=_7c0.substring(_7c1.index+_7c1[0].length);
    }
    ret+=_7c0.replace(/\+/g,"%2B");
    return ret;
};
dojo.string.escape=function(type,str){
    var args=dojo.lang.toArray(arguments,1);
    switch(type.toLowerCase()){
        case "xml":
        case "html":
        case "xhtml":
            return dojo.string.escapeXml.apply(this,args);
        case "sql":
            return dojo.string.escapeSql.apply(this,args);
        case "regexp":
        case "regex":
            return dojo.string.escapeRegExp.apply(this,args);
        case "javascript":
        case "jscript":
        case "js":
            return dojo.string.escapeJavaScript.apply(this,args);
        case "ascii":
            return dojo.string.encodeAscii.apply(this,args);
        default:
            return str;
    }
};
dojo.string.escapeXml=function(str,_7c8){
    str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
    if(!_7c8){
        str=str.replace(/'/gm,"&#39;");
    }
    return str;
};
dojo.string.escapeSql=function(str){
    return str.replace(/'/gm,"''");
};
dojo.string.escapeRegExp=function(str){
    return str.replace(/\\/gm,"\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm,"\\$1");
};
dojo.string.escapeJavaScript=function(str){
    return str.replace(/(["'\f\b\n\t\r])/gm,"\\$1");
};
dojo.string.escapeString=function(str){
    return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.string.summary=function(str,len){
    if(!len||str.length<=len){
        return str;
    }else{
        return str.substring(0,len).replace(/\.+$/,"")+"...";
    }
};
dojo.string.endsWith=function(str,end,_7d1){
    if(_7d1){
        str=str.toLowerCase();
        end=end.toLowerCase();
    }
    if((str.length-end.length)<0){
        return false;
    }
    return str.lastIndexOf(end)==str.length-end.length;
};
dojo.string.endsWithAny=function(str){
    for(var i=1;i<arguments.length;i++){
        if(dojo.string.endsWith(str,arguments[i])){
            return true;
        }
    }
    return false;
};
dojo.string.startsWith=function(str,_7d5,_7d6){
    if(_7d6){
        str=str.toLowerCase();
        _7d5=_7d5.toLowerCase();
    }
    return str.indexOf(_7d5)==0;
};
dojo.string.startsWithAny=function(str){
    for(var i=1;i<arguments.length;i++){
        if(dojo.string.startsWith(str,arguments[i])){
            return true;
        }
    }
    return false;
};
dojo.string.has=function(str){
    for(var i=1;i<arguments.length;i++){
        if(str.indexOf(arguments[i])>-1){
            return true;
        }
    }
    return false;
};
dojo.string.normalizeNewlines=function(text,_7dc){
    if(_7dc=="\n"){
        text=text.replace(/\r\n/g,"\n");
        text=text.replace(/\r/g,"\n");
    }else{
        if(_7dc=="\r"){
            text=text.replace(/\r\n/g,"\r");
            text=text.replace(/\n/g,"\r");
        }else{
            text=text.replace(/([^\r])\n/g,"$1\r\n");
            text=text.replace(/\r([^\n])/g,"\r\n$1");
        }
    }
    return text;
};
dojo.string.splitEscaped=function(str,_7de){
    var _7df=[];
    for(var i=0,prevcomma=0;i<str.length;i++){
        if(str.charAt(i)=="\\"){
            i++;
            continue;
        }
        if(str.charAt(i)==_7de){
            _7df.push(str.substring(prevcomma,i));
            prevcomma=i+1;
        }
    }
    _7df.push(str.substr(prevcomma));
    return _7df;
};
dojo.provide("dojo.widget.html.layout");
dojo.widget.html.layout=function(_7e1,_7e2,_7e3){
    dojo.html.addClass(_7e1,"dojoLayoutContainer");
    _7e2=dojo.lang.filter(_7e2,function(_7e4,idx){
        _7e4.idx=idx;
        return dojo.lang.inArray(["top","bottom","left","right","client","flood"],_7e4.layoutAlign);
    });
    if(_7e3&&_7e3!="none"){
        var rank=function(_7e7){
            switch(_7e7.layoutAlign){
                case "flood":
                    return 1;
                case "left":
                case "right":
                    return (_7e3=="left-right")?2:3;
                case "top":
                case "bottom":
                    return (_7e3=="left-right")?3:2;
                default:
                    return 4;
            }
        };
        _7e2.sort(function(a,b){
            return (rank(a)-rank(b))||(a.idx-b.idx);
        });
    }
    var f={top:dojo.html.getPixelValue(_7e1,"padding-top",true),left:dojo.html.getPixelValue(_7e1,"padding-left",true)};
    dojo.lang.mixin(f,dojo.html.getContentBox(_7e1));
    dojo.lang.forEach(_7e2,function(_7eb){
        var elm=_7eb.domNode;
        var pos=_7eb.layoutAlign;
        with(elm.style){
            left=f.left+"px";
            top=f.top+"px";
            bottom="auto";
            right="auto";
        }
        dojo.html.addClass(elm,"dojoAlign"+dojo.string.capitalize(pos));
        if((pos=="top")||(pos=="bottom")){
            dojo.html.setMarginBox(elm,{width:f.width});
            var h=dojo.html.getMarginBox(elm).height;
            f.height-=h;
            if(pos=="top"){
                f.top+=h;
            }else{
                elm.style.top=f.top+f.height+"px";
            }
        }else{
            if(pos=="left"||pos=="right"){
                dojo.html.setMarginBox(elm,{height:f.height});
                var w=dojo.html.getMarginBox(elm).width;
                f.width-=w;
                if(pos=="left"){
                    f.left+=w;
                }else{
                    elm.style.left=f.left+f.width+"px";
                }
            }else{
                if(pos=="flood"||pos=="client"){
                    dojo.html.setMarginBox(elm,{width:f.width,height:f.height});
                }
            }
        }
        if(_7eb.onResized){
            _7eb.onResized();
        }
    });
};
dojo.html.insertCssText(".dojoLayoutContainer{ position: relative; display: block; }\n"+"body .dojoAlignTop, body .dojoAlignBottom, body .dojoAlignLeft, body .dojoAlignRight { position: absolute; overflow: hidden; }\n"+"body .dojoAlignClient { position: absolute }\n"+".dojoAlignClient { overflow: auto; }\n");
dojo.provide("dojo.widget.TabContainer");
dojo.widget.defineWidget("dojo.widget.TabContainer",dojo.widget.HtmlWidget,{isContainer:true,labelPosition:"top",closeButton:"none",useVisibility:false,doLayout:true,templatePath:dojo.uri.dojoUri("src/widget/templates/TabContainer.html"),templateCssPath:dojo.uri.dojoUri("src/widget/templates/TabContainer.css"),selectedTab:"",fillInTemplate:function(args,frag){
    var _7f2=this.getFragNodeRef(frag);
    dojo.html.copyStyle(this.domNode,_7f2);
    dojo.widget.TabContainer.superclass.fillInTemplate.call(this,args,frag);
},postCreate:function(args,frag){
    for(var i=0;i<this.children.length;i++){
        this._setupTab(this.children[i]);
    }
    if(this.closeButton=="pane"){
        var div=document.createElement("div");
        dojo.html.addClass(div,"dojoTabPanePaneClose");
        dojo.event.connect(div,"onclick",dojo.lang.hitch(this,function(){
            this._runOnCloseTab(this.selectedTabWidget);
        }));
        dojo.event.connect(div,"onmouseover",function(){
            dojo.html.addClass(div,"dojoTabPanePaneCloseHover");
        });
        dojo.event.connect(div,"onmouseout",function(){
            dojo.html.removeClass(div,"dojoTabPanePaneCloseHover");
        });
        this.dojoTabLabels.appendChild(div);
    }
    if(!this.doLayout){
        dojo.html.addClass(this.dojoTabLabels,"dojoTabNoLayout");
        if(this.labelPosition=="bottom"){
            var p=this.dojoTabLabels.parentNode;
            p.removeChild(this.dojoTabLabels);
            p.appendChild(this.dojoTabLabels);
        }
    }
    dojo.html.addClass(this.dojoTabLabels,"dojoTabLabels-"+this.labelPosition);
    this._doSizing();
    if(this.selectedTabWidget){
        this.selectTab(this.selectedTabWidget,true);
    }
},addChild:function(_7f8,_7f9,pos,ref,_7fc){
    this._setupTab(_7f8);
    dojo.widget.TabContainer.superclass.addChild.call(this,_7f8,_7f9,pos,ref,_7fc);
    this._doSizing();
},_setupTab:function(tab){
    tab.domNode.style.display="none";
    tab.div=document.createElement("div");
    dojo.html.addClass(tab.div,"dojoTabPaneTab");
    var _7fe=document.createElement("div");
    var _7ff=document.createElement("span");
    _7ff.innerHTML=tab.label;
    _7ff.tabIndex="-1";
    dojo.widget.wai.setAttr(_7ff,"waiRole","role","tab");
    _7fe.appendChild(_7ff);
    dojo.html.disableSelection(_7ff);
    if(this.closeButton=="tab"||tab.tabCloseButton){
        var img=document.createElement("span");
        dojo.html.addClass(img,"dojoTabPaneTabClose");
        dojo.event.connect(img,"onclick",dojo.lang.hitch(this,function(evt){
            this._runOnCloseTab(tab);
            dojo.event.browser.stopEvent(evt);
        }));
        dojo.event.connect(img,"onmouseover",function(){
            dojo.html.addClass(img,"dojoTabPaneTabCloseHover");
        });
        dojo.event.connect(img,"onmouseout",function(){
            dojo.html.removeClass(img,"dojoTabPaneTabCloseHover");
        });
        _7fe.appendChild(img);
    }
    tab.div.appendChild(_7fe);
    tab.div.tabTitle=_7ff;
    this.dojoTabLabels.appendChild(tab.div);
    dojo.event.connect(tab.div,"onclick",dojo.lang.hitch(this,function(){
        this.selectTab(tab);
    }));
    dojo.event.connect(tab.div,"onkeydown",dojo.lang.hitch(this,function(evt){
        this.tabNavigation(evt,tab);
    }));
    if(!this.selectedTabWidget||this.selectedTab==tab.widgetId||tab.selected||(this.children.length==0)){
        if(this.selectedTabWidget){
            this._hideTab(this.selectedTabWidget);
        }
        this.selectedTabWidget=tab;
        this._showTab(tab);
    }else{
        this._hideTab(tab);
    }
    dojo.html.addClass(tab.domNode,"dojoTabPane");
    if(this.doLayout){
        with(tab.domNode.style){
            top=dojo.html.getPixelValue(this.containerNode,"padding-top",true);
            left=dojo.html.getPixelValue(this.containerNode,"padding-left",true);
        }
    }
},_doSizing:function(){
    if(!this.doLayout){
        return;
    }
    var _803=this.labelPosition.replace(/-h/,"");
    var _804=[{domNode:this.dojoTabLabels,layoutAlign:_803},{domNode:this.containerNode,layoutAlign:"client"}];
    dojo.widget.html.layout(this.domNode,_804);
    var _805=dojo.html.getContentBox(this.containerNode);
    dojo.lang.forEach(this.children,function(_806){
        if(_806.selected){
            _806.resizeTo(_805.width,_805.height);
        }
    });
},removeChild:function(tab){
    dojo.event.disconnect(tab.div,"onclick",function(){
    });
    if(this.closeButton=="tab"){
        var img=tab.div.lastChild.lastChild;
        if(img){
            dojo.html.removeClass(img,"dojoTabPaneTabClose");
        }
    }
    dojo.widget.TabContainer.superclass.removeChild.call(this,tab);
    dojo.html.removeClass(tab.domNode,"dojoTabPane");
    this.dojoTabLabels.removeChild(tab.div);
    delete (tab.div);
    if(this.selectedTabWidget===tab){
        this.selectedTabWidget=undefined;
        if(this.children.length>0){
            this.selectTab(this.children[0],true);
        }
    }
    this._doSizing();
},selectTab:function(tab,_80a){
    if(this.selectedTabWidget){
        this._hideTab(this.selectedTabWidget);
    }
    this.selectedTabWidget=tab;
    this._showTab(tab,_80a);
},tabNavigation:function(evt,tab){
    if((evt.keyCode==evt.KEY_RIGHT_ARROW)||(evt.keyCode==evt.KEY_LEFT_ARROW)){
        var _80d=null;
        var next=null;
        for(var i=0;i<this.children.length;i++){
            if(this.children[i]==tab){
                _80d=i;
                break;
            }
        }
        if(evt.keyCode==evt.KEY_RIGHT_ARROW){
            next=this.children[(_80d+1)%this.children.length];
        }else{
            next=this.children[(_80d+(this.children.length-1))%this.children.length];
        }
        this.selectTab(next);
        dojo.event.browser.stopEvent(evt);
        next.div.tabTitle.focus();
    }
},keyDown:function(e){
    if(e.keyCode==e.KEY_UP_ARROW&&e.ctrlKey){
        this.selectTab(this.selectedTabWidget);
        dojo.event.browser.stopEvent(e);
        this.selectedTabWidget.div.tabTitle.focus();
    }
},_showTab:function(tab,_812){
    dojo.html.addClass(tab.div,"current");
    tab.selected=true;
    tab.div.tabTitle.setAttribute("tabIndex","0");
    if(this.useVisibility&&!dojo.render.html.ie){
        tab.domNode.style.visibility="visible";
    }else{
        if(_812&&tab.refreshOnShow){
            var tmp=tab.refreshOnShow;
            tab.refreshOnShow=false;
            tab.show();
            tab.refreshOnShow=tmp;
        }else{
            tab.show();
        }
        if(this.doLayout){
            var _814=dojo.html.getContentBox(this.containerNode);
            tab.resizeTo(_814.width,_814.height);
        }
    }
},_hideTab:function(tab){
    dojo.html.removeClass(tab.div,"current");
    tab.div.tabTitle.setAttribute("tabIndex","-1");
    tab.selected=false;
    if(this.useVisibility){
        tab.domNode.style.visibility="hidden";
    }else{
        tab.hide();
    }
},_runOnCloseTab:function(tab){
    var onc=tab.extraArgs.onClose||tab.extraArgs.onclose;
    var fcn=dojo.lang.isFunction(onc)?onc:window[onc];
    var _819=dojo.lang.isFunction(fcn)?fcn(this,tab):true;
    if(_819){
        this.removeChild(tab);
        tab.destroy();
    }
},onResized:function(){
    this._doSizing();
}});
dojo.lang.extend(dojo.widget.Widget,{label:"",selected:false,tabCloseButton:false});
dojo.provide("dojo.io");
dojo.io.transports=[];
dojo.io.hdlrFuncNames=["load","error","timeout"];
dojo.io.Request=function(url,_81b,_81c,_81d){
    if((arguments.length==1)&&(arguments[0].constructor==Object)){
        this.fromKwArgs(arguments[0]);
    }else{
        this.url=url;
        if(_81b){
            this.mimetype=_81b;
        }
        if(_81c){
            this.transport=_81c;
        }
        if(arguments.length>=4){
            this.changeUrl=_81d;
        }
    }
};
dojo.lang.extend(dojo.io.Request,{url:"",mimetype:"text/plain",method:"GET",content:undefined,transport:undefined,changeUrl:undefined,formNode:undefined,sync:false,bindSuccess:false,useCache:false,preventCache:false,load:function(type,data,evt){
},error:function(type,_822){
},timeout:function(type){
},handle:function(){
},timeoutSeconds:0,abort:function(){
},fromKwArgs:function(_824){
    if(_824["url"]){
        _824.url=_824.url.toString();
    }
    if(_824["formNode"]){
        _824.formNode=dojo.byId(_824.formNode);
    }
    if(!_824["method"]&&_824["formNode"]&&_824["formNode"].method){
        _824.method=_824["formNode"].method;
    }
    if(!_824["handle"]&&_824["handler"]){
        _824.handle=_824.handler;
    }
    if(!_824["load"]&&_824["loaded"]){
        _824.load=_824.loaded;
    }
    if(!_824["changeUrl"]&&_824["changeURL"]){
        _824.changeUrl=_824.changeURL;
    }
    _824.encoding=dojo.lang.firstValued(_824["encoding"],djConfig["bindEncoding"],"");
    _824.sendTransport=dojo.lang.firstValued(_824["sendTransport"],djConfig["ioSendTransport"],false);
    var _825=dojo.lang.isFunction;
    for(var x=0;x<dojo.io.hdlrFuncNames.length;x++){
        var fn=dojo.io.hdlrFuncNames[x];
        if(_824[fn]&&_825(_824[fn])){
            continue;
        }
        if(_824["handle"]&&_825(_824["handle"])){
            _824[fn]=_824.handle;
        }
    }
    dojo.lang.mixin(this,_824);
}});
dojo.io.Error=function(msg,type,num){
    this.message=msg;
    this.type=type||"unknown";
    this.number=num||0;
};
dojo.io.transports.addTransport=function(name){
    this.push(name);
    this[name]=dojo.io[name];
};
dojo.io.bind=function(_82c){
    if(!(_82c instanceof dojo.io.Request)){
        try{
            _82c=new dojo.io.Request(_82c);
        }
        catch(e){
            dojo.debug(e);
        }
    }
    var _82d="";
    if(_82c["transport"]){
        _82d=_82c["transport"];
        if(!this[_82d]){
            return _82c;
        }
    }else{
        for(var x=0;x<dojo.io.transports.length;x++){
            var tmp=dojo.io.transports[x];
            if((this[tmp])&&(this[tmp].canHandle(_82c))){
                _82d=tmp;
            }
        }
        if(_82d==""){
            return _82c;
        }
    }
    this[_82d].bind(_82c);
    _82c.bindSuccess=true;
    return _82c;
};
dojo.io.queueBind=function(_830){
    if(!(_830 instanceof dojo.io.Request)){
        try{
            _830=new dojo.io.Request(_830);
        }
        catch(e){
            dojo.debug(e);
        }
    }
    var _831=_830.load;
    _830.load=function(){
        dojo.io._queueBindInFlight=false;
        var ret=_831.apply(this,arguments);
        dojo.io._dispatchNextQueueBind();
        return ret;
    };
    var _833=_830.error;
    _830.error=function(){
        dojo.io._queueBindInFlight=false;
        var ret=_833.apply(this,arguments);
        dojo.io._dispatchNextQueueBind();
        return ret;
    };
    dojo.io._bindQueue.push(_830);
    dojo.io._dispatchNextQueueBind();
    return _830;
};
dojo.io._dispatchNextQueueBind=function(){
    if(!dojo.io._queueBindInFlight){
        dojo.io._queueBindInFlight=true;
        if(dojo.io._bindQueue.length>0){
            dojo.io.bind(dojo.io._bindQueue.shift());
        }else{
            dojo.io._queueBindInFlight=false;
        }
    }
};
dojo.io._bindQueue=[];
dojo.io._queueBindInFlight=false;
dojo.io.argsFromMap=function(map,_836,last){
    var enc=/utf/i.test(_836||"")?encodeURIComponent:dojo.string.encodeAscii;
    var _839=[];
    var _83a=new Object();
    for(var name in map){
        var _83c=function(elt){
            var val=enc(name)+"="+enc(elt);
            _839[(last==name)?"push":"unshift"](val);
        };
        if(!_83a[name]){
            var _83f=map[name];
            if(dojo.lang.isArray(_83f)){
                dojo.lang.forEach(_83f,_83c);
            }else{
                _83c(_83f);
            }
        }
    }
    return _839.join("&");
};
dojo.io.setIFrameSrc=function(_840,src,_842){
    try{
        var r=dojo.render.html;
        if(!_842){
            if(r.safari){
                _840.location=src;
            }else{
                frames[_840.name].location=src;
            }
        }else{
            var idoc;
            if(r.ie){
                idoc=_840.contentWindow.document;
            }else{
                if(r.safari){
                    idoc=_840.document;
                }else{
                    idoc=_840.contentWindow;
                }
            }
            if(!idoc){
                _840.location=src;
                return;
            }else{
                idoc.location.replace(src);
            }
        }
    }
    catch(e){
        dojo.debug(e);
        dojo.debug("setIFrameSrc: "+e);
    }
};
dojo.provide("dojo.undo.browser");
try{
    if((!djConfig["preventBackButtonFix"])&&(!dojo.hostenv.post_load_)){
        document.write("<iframe style='border: 0px; width: 1px; height: 1px; position: absolute; bottom: 0px; right: 0px; visibility: visible;' name='djhistory' id='djhistory' src='"+(dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"'></iframe>");
    }
}
catch(e){
}
if(dojo.render.html.opera){
    dojo.debug("Opera is not supported with dojo.undo.browser, so back/forward detection will not work.");
}
dojo.undo.browser={initialHref:window.location.href,initialHash:window.location.hash,moveForward:false,historyStack:[],forwardStack:[],historyIframe:null,bookmarkAnchor:null,locationTimer:null,setInitialState:function(args){
    this.initialState={"url":this.initialHref,"kwArgs":args,"urlHash":this.initialHash};
},addToHistory:function(args){
    var hash=null;
    if(!this.historyIframe){
        this.historyIframe=window.frames["djhistory"];
    }
    if(!this.bookmarkAnchor){
        this.bookmarkAnchor=document.createElement("a");
        dojo.body().appendChild(this.bookmarkAnchor);
        this.bookmarkAnchor.style.display="none";
    }
    if((!args["changeUrl"])||(dojo.render.html.ie)){
        var url=dojo.hostenv.getBaseScriptUri()+"iframe_history.html?"+(new Date()).getTime();
        this.moveForward=true;
        dojo.io.setIFrameSrc(this.historyIframe,url,false);
    }
    if(args["changeUrl"]){
        this.changingUrl=true;
        hash="#"+((args["changeUrl"]!==true)?args["changeUrl"]:(new Date()).getTime());
        setTimeout("window.location.href = '"+hash+"'; dojo.undo.browser.changingUrl = false;",1);
        this.bookmarkAnchor.href=hash;
        if(dojo.render.html.ie){
            var _849=args["back"]||args["backButton"]||args["handle"];
            var tcb=function(_84b){
                if(window.location.hash!=""){
                    setTimeout("window.location.href = '"+hash+"';",1);
                }
                _849.apply(this,[_84b]);
            };
            if(args["back"]){
                args.back=tcb;
            }else{
                if(args["backButton"]){
                    args.backButton=tcb;
                }else{
                    if(args["handle"]){
                        args.handle=tcb;
                    }
                }
            }
            this.forwardStack=[];
            var _84c=args["forward"]||args["forwardButton"]||args["handle"];
            var tfw=function(_84e){
                if(window.location.hash!=""){
                    window.location.href=hash;
                }
                if(_84c){
                    _84c.apply(this,[_84e]);
                }
            };
            if(args["forward"]){
                args.forward=tfw;
            }else{
                if(args["forwardButton"]){
                    args.forwardButton=tfw;
                }else{
                    if(args["handle"]){
                        args.handle=tfw;
                    }
                }
            }
        }else{
            if(dojo.render.html.moz){
                if(!this.locationTimer){
                    this.locationTimer=setInterval("dojo.undo.browser.checkLocation();",200);
                }
            }
        }
    }
    this.historyStack.push({"url":url,"kwArgs":args,"urlHash":hash});
},checkLocation:function(){
    if(!this.changingUrl){
        var hsl=this.historyStack.length;
        if((window.location.hash==this.initialHash||window.location.href==this.initialHref)&&(hsl==1)){
            this.handleBackButton();
            return;
        }
        if(this.forwardStack.length>0){
            if(this.forwardStack[this.forwardStack.length-1].urlHash==window.location.hash){
                this.handleForwardButton();
                return;
            }
        }
        if((hsl>=2)&&(this.historyStack[hsl-2])){
            if(this.historyStack[hsl-2].urlHash==window.location.hash){
                this.handleBackButton();
                return;
            }
        }
    }
},iframeLoaded:function(evt,_851){
    if(!dojo.render.html.opera){
        var _852=this._getUrlQuery(_851.href);
        if(_852==null){
            if(this.historyStack.length==1){
                this.handleBackButton();
            }
            return;
        }
        if(this.moveForward){
            this.moveForward=false;
            return;
        }
        if(this.historyStack.length>=2&&_852==this._getUrlQuery(this.historyStack[this.historyStack.length-2].url)){
            this.handleBackButton();
        }else{
            if(this.forwardStack.length>0&&_852==this._getUrlQuery(this.forwardStack[this.forwardStack.length-1].url)){
                this.handleForwardButton();
            }
        }
    }
},handleBackButton:function(){
    var _853=this.historyStack.pop();
    if(!_853){
        return;
    }
    var last=this.historyStack[this.historyStack.length-1];
    if(!last&&this.historyStack.length==0){
        last=this.initialState;
    }
    if(last){
        if(last.kwArgs["back"]){
            last.kwArgs["back"]();
        }else{
            if(last.kwArgs["backButton"]){
                last.kwArgs["backButton"]();
            }else{
                if(last.kwArgs["handle"]){
                    last.kwArgs.handle("back");
                }
            }
        }
    }
    this.forwardStack.push(_853);
},handleForwardButton:function(){
    var last=this.forwardStack.pop();
    if(!last){
        return;
    }
    if(last.kwArgs["forward"]){
        last.kwArgs.forward();
    }else{
        if(last.kwArgs["forwardButton"]){
            last.kwArgs.forwardButton();
        }else{
            if(last.kwArgs["handle"]){
                last.kwArgs.handle("forward");
            }
        }
    }
    this.historyStack.push(last);
},_getUrlQuery:function(url){
    var _857=url.split("?");
    if(_857.length<2){
        return null;
    }else{
        return _857[1];
    }
}};
dojo.provide("dojo.io.BrowserIO");
dojo.io.checkChildrenForFile=function(node){
    var _859=false;
    var _85a=node.getElementsByTagName("input");
    dojo.lang.forEach(_85a,function(_85b){
        if(_859){
            return;
        }
        if(_85b.getAttribute("type")=="file"){
            _859=true;
        }
    });
    return _859;
};
dojo.io.formHasFile=function(_85c){
    return dojo.io.checkChildrenForFile(_85c);
};
dojo.io.updateNode=function(node,_85e){
    node=dojo.byId(node);
    var args=_85e;
    if(dojo.lang.isString(_85e)){
        args={url:_85e};
    }
    args.mimetype="text/html";
    args.load=function(t,d,e){
        while(node.firstChild){
            if(dojo["event"]){
                try{
                    dojo.event.browser.clean(node.firstChild);
                }
                catch(e){
                }
            }
            node.removeChild(node.firstChild);
        }
        node.innerHTML=d;
    };
    dojo.io.bind(args);
};
dojo.io.formFilter=function(node){
    var type=(node.type||"").toLowerCase();
    return !node.disabled&&node.name&&!dojo.lang.inArray(["file","submit","image","reset","button"],type);
};
dojo.io.encodeForm=function(_865,_866,_867){
    if((!_865)||(!_865.tagName)||(!_865.tagName.toLowerCase()=="form")){
        dojo.raise("Attempted to encode a non-form element.");
    }
    if(!_867){
        _867=dojo.io.formFilter;
    }
    var enc=/utf/i.test(_866||"")?encodeURIComponent:dojo.string.encodeAscii;
    var _869=[];
    for(var i=0;i<_865.elements.length;i++){
        var elm=_865.elements[i];
        if(!elm||elm.tagName.toLowerCase()=="fieldset"||!_867(elm)){
            continue;
        }
        var name=enc(elm.name);
        var type=elm.type.toLowerCase();
        if(type=="select-multiple"){
            for(var j=0;j<elm.options.length;j++){
                if(elm.options[j].selected){
                    _869.push(name+"="+enc(elm.options[j].value));
                }
            }
        }else{
            if(dojo.lang.inArray(["radio","checkbox"],type)){
                if(elm.checked){
                    _869.push(name+"="+enc(elm.value));
                }
            }else{
                _869.push(name+"="+enc(elm.value));
            }
        }
    }
    var _86f=_865.getElementsByTagName("input");
    for(var i=0;i<_86f.length;i++){
        var _870=_86f[i];
        if(_870.type.toLowerCase()=="image"&&_870.form==_865&&_867(_870)){
            var name=enc(_870.name);
            _869.push(name+"="+enc(_870.value));
            _869.push(name+".x=0");
            _869.push(name+".y=0");
        }
    }
    return _869.join("&")+"&";
};
dojo.io.FormBind=function(args){
    this.bindArgs={};
    if(args&&args.formNode){
        this.init(args);
    }else{
        if(args){
            this.init({formNode:args});
        }
    }
};
dojo.lang.extend(dojo.io.FormBind,{form:null,bindArgs:null,clickedButton:null,init:function(args){
    var form=dojo.byId(args.formNode);
    if(!form||!form.tagName||form.tagName.toLowerCase()!="form"){
        throw new Error("FormBind: Couldn't apply, invalid form");
    }else{
        if(this.form==form){
            return;
        }else{
            if(this.form){
                throw new Error("FormBind: Already applied to a form");
            }
        }
    }
    dojo.lang.mixin(this.bindArgs,args);
    this.form=form;
    this.connect(form,"onsubmit","submit");
    for(var i=0;i<form.elements.length;i++){
        var node=form.elements[i];
        if(node&&node.type&&dojo.lang.inArray(["submit","button"],node.type.toLowerCase())){
            this.connect(node,"onclick","click");
        }
    }
    var _876=form.getElementsByTagName("input");
    for(var i=0;i<_876.length;i++){
        var _877=_876[i];
        if(_877.type.toLowerCase()=="image"&&_877.form==form){
            this.connect(_877,"onclick","click");
        }
    }
},onSubmit:function(form){
    return true;
},submit:function(e){
    e.preventDefault();
    if(this.onSubmit(this.form)){
        dojo.io.bind(dojo.lang.mixin(this.bindArgs,{formFilter:dojo.lang.hitch(this,"formFilter")}));
    }
},click:function(e){
    var node=e.currentTarget;
    if(node.disabled){
        return;
    }
    this.clickedButton=node;
},formFilter:function(node){
    var type=(node.type||"").toLowerCase();
    var _87e=false;
    if(node.disabled||!node.name){
        _87e=false;
    }else{
        if(dojo.lang.inArray(["submit","button","image"],type)){
            if(!this.clickedButton){
                this.clickedButton=node;
            }
            _87e=node==this.clickedButton;
        }else{
            _87e=!dojo.lang.inArray(["file","submit","reset","button"],type);
        }
    }
    return _87e;
},connect:function(_87f,_880,_881){
    if(dojo.evalObjPath("dojo.event.connect")){
        dojo.event.connect(_87f,_880,this,_881);
    }else{
        var fcn=dojo.lang.hitch(this,_881);
        _87f[_880]=function(e){
            if(!e){
                e=window.event;
            }
            if(!e.currentTarget){
                e.currentTarget=e.srcElement;
            }
            if(!e.preventDefault){
                e.preventDefault=function(){
                    window.event.returnValue=false;
                };
            }
            fcn(e);
        };
    }
}});
dojo.io.XMLHTTPTransport=new function(){
    var _884=this;
    var _885={};
    this.useCache=false;
    this.preventCache=false;
    function getCacheKey(url,_887,_888){
        return url+"|"+_887+"|"+_888.toLowerCase();
    }
    function addToCache(url,_88a,_88b,http){
        _885[getCacheKey(url,_88a,_88b)]=http;
    }
    function getFromCache(url,_88e,_88f){
        return _885[getCacheKey(url,_88e,_88f)];
    }
    this.clearCache=function(){
        _885={};
    };
    function doLoad(_890,http,url,_893,_894){
        if(((http.status>=200)&&(http.status<300))||(http.status==304)||(location.protocol=="file:"&&(http.status==0||http.status==undefined))||(location.protocol=="chrome:"&&(http.status==0||http.status==undefined))){
            var ret;
            if(_890.method.toLowerCase()=="head"){
                var _896=http.getAllResponseHeaders();
                ret={};
                ret.toString=function(){
                    return _896;
                };
                var _897=_896.split(/[\r\n]+/g);
                for(var i=0;i<_897.length;i++){
                    var pair=_897[i].match(/^([^:]+)\s*:\s*(.+)$/i);
                    if(pair){
                        ret[pair[1]]=pair[2];
                    }
                }
            }else{
                if(_890.mimetype=="text/javascript"){
                    try{
                        ret=dj_eval(http.responseText);
                    }
                    catch(e){
                        dojo.debug(e);
                        dojo.debug(http.responseText);
                        ret=null;
                    }
                }else{
                    if(_890.mimetype=="text/json"){
                        try{
                            ret=dj_eval("("+http.responseText+")");
                        }
                        catch(e){
                            dojo.debug(e);
                            dojo.debug(http.responseText);
                            ret=false;
                        }
                    }else{
                        if((_890.mimetype=="application/xml")||(_890.mimetype=="text/xml")){
                            ret=http.responseXML;
                            if(!ret||typeof ret=="string"||!http.getResponseHeader("Content-Type")){
                                ret=dojo.dom.createDocumentFromText(http.responseText);
                            }
                        }else{
                            ret=http.responseText;
                        }
                    }
                }
            }
            if(_894){
                addToCache(url,_893,_890.method,http);
            }
            _890[(typeof _890.load=="function")?"load":"handle"]("load",ret,http,_890);
        }else{
            var _89a=new dojo.io.Error("XMLHttpTransport Error: "+http.status+" "+http.statusText);
            _890[(typeof _890.error=="function")?"error":"handle"]("error",_89a,http,_890);
        }
    }
    function setHeaders(http,_89c){
        if(_89c["headers"]){
            for(var _89d in _89c["headers"]){
                if(_89d.toLowerCase()=="content-type"&&!_89c["contentType"]){
                    _89c["contentType"]=_89c["headers"][_89d];
                }else{
                    http.setRequestHeader(_89d,_89c["headers"][_89d]);
                }
            }
        }
    }
    this.inFlight=[];
    this.inFlightTimer=null;
    this.startWatchingInFlight=function(){
        if(!this.inFlightTimer){
            this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
        }
    };
    this.watchInFlight=function(){
        var now=null;
        if(!dojo.hostenv._blockAsync&&!_884._blockAsync){
            for(var x=this.inFlight.length-1;x>=0;x--){
                var tif=this.inFlight[x];
                if(!tif||tif.http._aborted||!tif.http.readyState){
                    this.inFlight.splice(x,1);
                    continue;
                }
                if(4==tif.http.readyState){
                    this.inFlight.splice(x,1);
                    doLoad(tif.req,tif.http,tif.url,tif.query,tif.useCache);
                }else{
                    if(tif.startTime){
                        if(!now){
                            now=(new Date()).getTime();
                        }
                        if(tif.startTime+(tif.req.timeoutSeconds*1000)<now){
                            if(typeof tif.http.abort=="function"){
                                tif.http.abort();
                            }
                            this.inFlight.splice(x,1);
                            tif.req[(typeof tif.req.timeout=="function")?"timeout":"handle"]("timeout",null,tif.http,tif.req);
                        }
                    }
                }
            }
        }
        clearTimeout(this.inFlightTimer);
        if(this.inFlight.length==0){
            this.inFlightTimer=null;
            return;
        }
        this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
    };
    var _8a1=dojo.hostenv.getXmlhttpObject()?true:false;
    this.canHandle=function(_8a2){
        return _8a1&&dojo.lang.inArray(["text/plain","text/html","application/xml","text/xml","text/javascript","text/json"],(_8a2["mimetype"].toLowerCase()||""))&&!(_8a2["formNode"]&&dojo.io.formHasFile(_8a2["formNode"]));
    };
    this.multipartBoundary="45309FFF-BD65-4d50-99C9-36986896A96F";
    this.bind=function(_8a3){
        if(!_8a3["url"]){
            if(!_8a3["formNode"]&&(_8a3["backButton"]||_8a3["back"]||_8a3["changeUrl"]||_8a3["watchForURL"])&&(!djConfig.preventBackButtonFix)){
                dojo.deprecated("Using dojo.io.XMLHTTPTransport.bind() to add to browser history without doing an IO request","Use dojo.undo.browser.addToHistory() instead.","0.4");
                dojo.undo.browser.addToHistory(_8a3);
                return true;
            }
        }
        var url=_8a3.url;
        var _8a5="";
        if(_8a3["formNode"]){
            var ta=_8a3.formNode.getAttribute("action");
            if((ta)&&(!_8a3["url"])){
                url=ta;
            }
            var tp=_8a3.formNode.getAttribute("method");
            if((tp)&&(!_8a3["method"])){
                _8a3.method=tp;
            }
            _8a5+=dojo.io.encodeForm(_8a3.formNode,_8a3.encoding,_8a3["formFilter"]);
        }
        if(url.indexOf("#")>-1){
            dojo.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
            url=url.split("#")[0];
        }
        if(_8a3["file"]){
            _8a3.method="post";
        }
        if(!_8a3["method"]){
            _8a3.method="get";
        }
        if(_8a3.method.toLowerCase()=="get"){
            _8a3.multipart=false;
        }else{
            if(_8a3["file"]){
                _8a3.multipart=true;
            }else{
                if(!_8a3["multipart"]){
                    _8a3.multipart=false;
                }
            }
        }
        if(_8a3["backButton"]||_8a3["back"]||_8a3["changeUrl"]){
            dojo.undo.browser.addToHistory(_8a3);
        }
        var _8a8=_8a3["content"]||{};
        if(_8a3.sendTransport){
            _8a8["dojo.transport"]="xmlhttp";
        }
        do{
            if(_8a3.postContent){
                _8a5=_8a3.postContent;
                break;
            }
            if(_8a8){
                _8a5+=dojo.io.argsFromMap(_8a8,_8a3.encoding);
            }
            if(_8a3.method.toLowerCase()=="get"||!_8a3.multipart){
                break;
            }
            var t=[];
            if(_8a5.length){
                var q=_8a5.split("&");
                for(var i=0;i<q.length;++i){
                    if(q[i].length){
                        var p=q[i].split("=");
                        t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+p[0]+"\"","",p[1]);
                    }
                }
            }
            if(_8a3.file){
                if(dojo.lang.isArray(_8a3.file)){
                    for(var i=0;i<_8a3.file.length;++i){
                        var o=_8a3.file[i];
                        t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
                    }
                }else{
                    var o=_8a3.file;
                    t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
                }
            }
            if(t.length){
                t.push("--"+this.multipartBoundary+"--","");
                _8a5=t.join("\r\n");
            }
        }while(false);
        var _8ae=_8a3["sync"]?false:true;
        var _8af=_8a3["preventCache"]||(this.preventCache==true&&_8a3["preventCache"]!=false);
        var _8b0=_8a3["useCache"]==true||(this.useCache==true&&_8a3["useCache"]!=false);
        if(!_8af&&_8b0){
            var _8b1=getFromCache(url,_8a5,_8a3.method);
            if(_8b1){
                doLoad(_8a3,_8b1,url,_8a5,false);
                return;
            }
        }
        var http=dojo.hostenv.getXmlhttpObject(_8a3);
        var _8b3=false;
        if(_8ae){
            var _8b4=this.inFlight.push({"req":_8a3,"http":http,"url":url,"query":_8a5,"useCache":_8b0,"startTime":_8a3.timeoutSeconds?(new Date()).getTime():0});
            this.startWatchingInFlight();
        }else{
            _884._blockAsync=true;
        }
        if(_8a3.method.toLowerCase()=="post"){
            http.open("POST",url,_8ae);
            setHeaders(http,_8a3);
            http.setRequestHeader("Content-Type",_8a3.multipart?("multipart/form-data; boundary="+this.multipartBoundary):(_8a3.contentType||"application/x-www-form-urlencoded"));
            try{
                http.send(_8a5);
            }
            catch(e){
                if(typeof http.abort=="function"){
                    http.abort();
                }
                doLoad(_8a3,{status:404},url,_8a5,_8b0);
            }
        }else{
            var _8b5=url;
            if(_8a5!=""){
                _8b5+=(_8b5.indexOf("?")>-1?"&":"?")+_8a5;
            }
            if(_8af){
                _8b5+=(dojo.string.endsWithAny(_8b5,"?","&")?"":(_8b5.indexOf("?")>-1?"&":"?"))+"dojo.preventCache="+new Date().valueOf();
            }
            http.open(_8a3.method.toUpperCase(),_8b5,_8ae);
            setHeaders(http,_8a3);
            try{
                http.send(null);
            }
            catch(e){
                if(typeof http.abort=="function"){
                    http.abort();
                }
                doLoad(_8a3,{status:404},url,_8a5,_8b0);
            }
        }
        if(!_8ae){
            doLoad(_8a3,http,url,_8a5,_8b0);
            _884._blockAsync=false;
        }
        _8a3.abort=function(){
            try{
                http._aborted=true;
            }
            catch(e){
            }
            return http.abort();
        };
        return;
    };
    dojo.io.transports.addTransport("XMLHTTPTransport");
};
dojo.provide("dojo.io.cookie");
dojo.io.cookie.setCookie=function(name,_8b7,days,path,_8ba,_8bb){
    var _8bc=-1;
    if(typeof days=="number"&&days>=0){
        var d=new Date();
        d.setTime(d.getTime()+(days*24*60*60*1000));
        _8bc=d.toGMTString();
    }
    _8b7=escape(_8b7);
    document.cookie=name+"="+_8b7+";"+(_8bc!=-1?" expires="+_8bc+";":"")+(path?"path="+path:"")+(_8ba?"; domain="+_8ba:"")+(_8bb?"; secure":"");
};
dojo.io.cookie.set=dojo.io.cookie.setCookie;
dojo.io.cookie.getCookie=function(name){
    var idx=document.cookie.lastIndexOf(name+"=");
    if(idx==-1){
        return null;
    }
    var _8c0=document.cookie.substring(idx+name.length+1);
    var end=_8c0.indexOf(";");
    if(end==-1){
        end=_8c0.length;
    }
    _8c0=_8c0.substring(0,end);
    _8c0=unescape(_8c0);
    return _8c0;
};
dojo.io.cookie.get=dojo.io.cookie.getCookie;
dojo.io.cookie.deleteCookie=function(name){
    dojo.io.cookie.setCookie(name,"-",0);
};
dojo.io.cookie.setObjectCookie=function(name,obj,days,path,_8c7,_8c8,_8c9){
    if(arguments.length==5){
        _8c9=_8c7;
        _8c7=null;
        _8c8=null;
    }
    var _8ca=[],cookie,value="";
    if(!_8c9){
        cookie=dojo.io.cookie.getObjectCookie(name);
    }
    if(days>=0){
        if(!cookie){
            cookie={};
        }
        for(var prop in obj){
            if(prop==null){
                delete cookie[prop];
            }else{
                if(typeof obj[prop]=="string"||typeof obj[prop]=="number"){
                    cookie[prop]=obj[prop];
                }
            }
        }
        prop=null;
        for(var prop in cookie){
            _8ca.push(escape(prop)+"="+escape(cookie[prop]));
        }
        value=_8ca.join("&");
    }
    dojo.io.cookie.setCookie(name,value,days,path,_8c7,_8c8);
};
dojo.io.cookie.getObjectCookie=function(name){
    var _8cd=null,cookie=dojo.io.cookie.getCookie(name);
    if(cookie){
        _8cd={};
        var _8ce=cookie.split("&");
        for(var i=0;i<_8ce.length;i++){
            var pair=_8ce[i].split("=");
            var _8d1=pair[1];
            if(isNaN(_8d1)){
                _8d1=unescape(pair[1]);
            }
            _8cd[unescape(pair[0])]=_8d1;
        }
    }
    return _8cd;
};
dojo.io.cookie.isSupported=function(){
    if(typeof navigator.cookieEnabled!="boolean"){
        dojo.io.cookie.setCookie("__TestingYourBrowserForCookieSupport__","CookiesAllowed",90,null);
        var _8d2=dojo.io.cookie.getCookie("__TestingYourBrowserForCookieSupport__");
        navigator.cookieEnabled=(_8d2=="CookiesAllowed");
        if(navigator.cookieEnabled){
            this.deleteCookie("__TestingYourBrowserForCookieSupport__");
        }
    }
    return navigator.cookieEnabled;
};
if(!dojo.io.cookies){
    dojo.io.cookies=dojo.io.cookie;
}
dojo.provide("dojo.io.*");
dojo.provide("dojo.widget.ContentPane");
dojo.widget.defineWidget("dojo.widget.ContentPane",dojo.widget.HtmlWidget,function(){
    this._styleNodes=[];
    this._onLoadStack=[];
    this._onUnLoadStack=[];
    this._callOnUnLoad=false;
    this.scriptScope;
    this._ioBindObj;
    this.bindArgs={};
},{isContainer:true,adjustPaths:true,href:"",extractContent:true,parseContent:true,cacheContent:true,preload:false,refreshOnShow:false,handler:"",executeScripts:false,postCreate:function(args,frag,_8d5){
    if(this.handler!==""){
        this.setHandler(this.handler);
    }
    if(this.isShowing()||this.preload){
        this.loadContents();
    }
},show:function(){
    if(this.refreshOnShow){
        this.refresh();
    }else{
        this.loadContents();
    }
    dojo.widget.ContentPane.superclass.show.call(this);
},refresh:function(){
    this.isLoaded=false;
    this.loadContents();
},loadContents:function(){
    if(this.isLoaded){
        return;
    }
    if(dojo.lang.isFunction(this.handler)){
        this._runHandler();
    }else{
        if(this.href!=""){
            this._downloadExternalContent(this.href,this.cacheContent&&!this.refreshOnShow);
        }else{
            this.isLoaded=true;
        }
    }
},setUrl:function(url){
    this.href=url;
    this.isLoaded=false;
    if(this.preload||this.isShowing()){
        this.loadContents();
    }
},abort:function(){
    var bind=this._ioBindObj;
    if(!bind||!bind.abort){
        return;
    }
    bind.abort();
    delete this._ioBindObj;
},_downloadExternalContent:function(url,_8d9){
    this.abort();
    this._handleDefaults("Loading...","onDownloadStart");
    var self=this;
    this._ioBindObj=dojo.io.bind(this._cacheSetting({url:url,mimetype:"text/html",load:function(type,data,xhr){
        self.onDownloadEnd.call(self,url,data);
    },error:function(type,err,xhr){
        var e={responseText:xhr.responseText,status:xhr.status,statusText:xhr.statusText,responseHeaders:xhr.getAllResponseHeaders(),_text:"Error loading '"+url+"' ("+xhr.status+" "+xhr.statusText+")"};
        self._handleDefaults.call(self,e,"onDownloadError");
        self.onLoad();
    }},_8d9));
},_cacheSetting:function(_8e2,_8e3){
    for(var x in this.bindArgs){
        if(dojo.lang.isUndefined(_8e2[x])){
            _8e2[x]=this.bindArgs[x];
        }
    }
    if(dojo.lang.isUndefined(_8e2.useCache)){
        _8e2.useCache=_8e3;
    }
    if(dojo.lang.isUndefined(_8e2.preventCache)){
        _8e2.preventCache=!_8e3;
    }
    if(dojo.lang.isUndefined(_8e2.mimetype)){
        _8e2.mimetype="text/html";
    }
    return _8e2;
},onLoad:function(e){
    this._runStack("_onLoadStack");
    this.isLoaded=true;
},onUnLoad:function(e){
    this._runStack("_onUnLoadStack");
    delete this.scriptScope;
},_runStack:function(_8e7){
    var st=this[_8e7];
    var err="";
    var _8ea=this.scriptScope||window;
    for(var i=0;i<st.length;i++){
        try{
            st[i].call(_8ea);
        }
        catch(e){
            err+="\n"+st[i]+" failed: "+e.description;
        }
    }
    this[_8e7]=[];
    if(err.length){
        var name=(_8e7=="_onLoadStack")?"addOnLoad":"addOnUnLoad";
        this._handleDefaults(name+" failure\n "+err,"onExecError",true);
    }
},addOnLoad:function(obj,func){
    this._pushOnStack(this._onLoadStack,obj,func);
},addOnUnLoad:function(obj,func){
    this._pushOnStack(this._onUnLoadStack,obj,func);
},_pushOnStack:function(_8f1,obj,func){
    if(typeof func=="undefined"){
        _8f1.push(obj);
    }else{
        _8f1.push(function(){
            obj[func]();
        });
    }
},destroy:function(){
    this.onUnLoad();
    dojo.widget.ContentPane.superclass.destroy.call(this);
},onExecError:function(e){
},onContentError:function(e){
},onDownloadError:function(e){
},onDownloadStart:function(e){
},onDownloadEnd:function(url,data){
    data=this.splitAndFixPaths(data,url);
    this.setContent(data);
},_handleDefaults:function(e,_8fb,_8fc){
    if(!_8fb){
        _8fb="onContentError";
    }
    if(dojo.lang.isString(e)){
        e={_text:e};
    }
    if(!e._text){
        e._text=e.toString();
    }
    e.toString=function(){
        return this._text;
    };
    if(typeof e.returnValue!="boolean"){
        e.returnValue=true;
    }
    if(typeof e.preventDefault!="function"){
        e.preventDefault=function(){
            this.returnValue=false;
        };
    }
    this[_8fb](e);
    if(e.returnValue){
        if(_8fc){
            alert(e.toString());
        }else{
            if(this._callOnUnLoad){
                this.onUnLoad();
            }
            this._callOnUnLoad=false;
            this._setContent(e.toString());
        }
    }
},splitAndFixPaths:function(s,url){
    var _8ff=[],scripts=[],tmp=[];
    var _900=[],requires=[],attr=[],styles=[];
    var str="",path="",fix="",tagFix="",tag="",origPath="";
    if(!url){
        url="./";
    }
    if(s){
        var _902=/<title[^>]*>([\s\S]*?)<\/title>/i;
        while(_900=_902.exec(s)){
            _8ff.push(_900[1]);
            s=s.substring(0,_900.index)+s.substr(_900.index+_900[0].length);
        }
        if(this.adjustPaths){
            var _903=/<[a-z][a-z0-9]*[^>]*\s(?:(?:src|href|style)=[^>])+[^>]*>/i;
            var _904=/\s(src|href|style)=(['"]?)([\w()\[\]\/.,\\'"-:;#=&?\s@]+?)\2/i;
            var _905=/^(?:[#]|(?:(?:https?|ftps?|file|javascript|mailto|news):))/;
            while(tag=_903.exec(s)){
                str+=s.substring(0,tag.index);
                s=s.substring((tag.index+tag[0].length),s.length);
                tag=tag[0];
                tagFix="";
                while(attr=_904.exec(tag)){
                    path="";
                    origPath=attr[3];
                    switch(attr[1].toLowerCase()){
                        case "src":
                        case "href":
                            if(_905.exec(origPath)){
                                path=origPath;
                            }else{
                                path=(new dojo.uri.Uri(url,origPath).toString());
                            }
                            break;
                        case "style":
                            path=dojo.html.fixPathsInCssText(origPath,url);
                            break;
                        default:
                            path=origPath;
                    }
                    fix=" "+attr[1]+"="+attr[2]+path+attr[2];
                    tagFix+=tag.substring(0,attr.index)+fix;
                    tag=tag.substring((attr.index+attr[0].length),tag.length);
                }
                str+=tagFix+tag;
            }
            s=str+s;
        }
        _902=/(?:<(style)[^>]*>([\s\S]*?)<\/style>|<link ([^>]*rel=['"]?stylesheet['"]?[^>]*)>)/i;
        while(_900=_902.exec(s)){
            if(_900[1]&&_900[1].toLowerCase()=="style"){
                styles.push(dojo.html.fixPathsInCssText(_900[2],url));
            }else{
                if(attr=_900[3].match(/href=(['"]?)([^'">]*)\1/i)){
                    styles.push({path:attr[2]});
                }
            }
            s=s.substring(0,_900.index)+s.substr(_900.index+_900[0].length);
        }
        var _902=/<script([^>]*)>([\s\S]*?)<\/script>/i;
        var _906=/src=(['"]?)([^"']*)\1/i;
        var _907=/.*(\bdojo\b\.js(?:\.uncompressed\.js)?)$/;
        var _908=/(?:var )?\bdjConfig\b(?:[\s]*=[\s]*\{[^}]+\}|\.[\w]*[\s]*=[\s]*[^;\n]*)?;?|dojo\.hostenv\.writeIncludes\(\s*\);?/g;
        var _909=/dojo\.(?:(?:require(?:After)?(?:If)?)|(?:widget\.(?:manager\.)?registerWidgetPackage)|(?:(?:hostenv\.)?setModulePrefix)|defineNamespace)\((['"]).*?\1\)\s*;?/;
        while(_900=_902.exec(s)){
            if(this.executeScripts&&_900[1]){
                if(attr=_906.exec(_900[1])){
                    if(_907.exec(attr[2])){
                        dojo.debug("Security note! inhibit:"+attr[2]+" from  beeing loaded again.");
                    }else{
                        scripts.push({path:attr[2]});
                    }
                }
            }
            if(_900[2]){
                var sc=_900[2].replace(_908,"");
                if(!sc){
                    continue;
                }
                while(tmp=_909.exec(sc)){
                    requires.push(tmp[0]);
                    sc=sc.substring(0,tmp.index)+sc.substr(tmp.index+tmp[0].length);
                }
                if(this.executeScripts){
                    scripts.push(sc);
                }
            }
            s=s.substr(0,_900.index)+s.substr(_900.index+_900[0].length);
        }
        if(this.extractContent){
            _900=s.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
            if(_900){
                s=_900[1];
            }
        }
        if(this.executeScripts){
            var _902=/(<[a-zA-Z][a-zA-Z0-9]*\s[^>]*\S=(['"])[^>]*[^\.\]])scriptScope([^>]*>)/;
            str="";
            while(tag=_902.exec(s)){
                tmp=((tag[2]=="'")?"\"":"'");
                str+=s.substring(0,tag.index);
                s=s.substr(tag.index).replace(_902,"$1dojo.widget.byId("+tmp+this.widgetId+tmp+").scriptScope$3");
            }
            s=str+s;
        }
    }
    return {"xml":s,"styles":styles,"titles":_8ff,"requires":requires,"scripts":scripts,"url":url};
},_setContent:function(cont){
    this.destroyChildren();
    for(var i=0;i<this._styleNodes.length;i++){
        if(this._styleNodes[i]&&this._styleNodes[i].parentNode){
            this._styleNodes[i].parentNode.removeChild(this._styleNodes[i]);
        }
    }
    this._styleNodes=[];
    var node=this.containerNode||this.domNode;
    while(node.firstChild){
        try{
            dojo.event.browser.clean(node.firstChild);
        }
        catch(e){
        }
        node.removeChild(node.firstChild);
    }
    try{
        if(typeof cont!="string"){
            node.innerHTML="";
            node.appendChild(cont);
        }else{
            node.innerHTML=cont;
        }
    }
    catch(e){
        e._text="Could'nt load content:"+e.description;
        this._handleDefaults(e,"onContentError");
    }
},setContent:function(data){
    this.abort();
    if(this._callOnUnLoad){
        this.onUnLoad();
    }
    this._callOnUnLoad=true;
    if(!data||dojo.html.isNode(data)){
        this._setContent(data);
        this.onResized();
        this.onLoad();
    }else{
        if(!data.xml){
            this.href="";
            data=this.splitAndFixPaths(data);
        }
        this._setContent(data.xml);
        for(var i=0;i<data.styles.length;i++){
            if(data.styles[i].path){
                this._styleNodes.push(dojo.html.insertCssFile(data.styles[i].path));
            }else{
                this._styleNodes.push(dojo.html.insertCssText(data.styles[i]));
            }
        }
        if(this.parseContent){
            for(var i=0;i<data.requires.length;i++){
                try{
                    eval(data.requires[i]);
                }
                catch(e){
                    e._text="Error in packageloading calls, "+e.description;
                    this._handleDefaults(e,"onContentError",true);
                }
            }
        }
        var _910=this;
        function asyncParse(){
            if(_910.executeScripts){
                _910._executeScripts(data.scripts);
            }
            if(_910.parseContent){
                var node=_910.containerNode||_910.domNode;
                var _912=new dojo.xml.Parse();
                var frag=_912.parseElement(node,null,true);
                dojo.widget.getParser().createSubComponents(frag,_910);
            }
            _910.onResized();
            _910.onLoad();
        }
        if(dojo.hostenv.isXDomain&&data.requires.length){
            dojo.addOnLoad(asyncParse);
        }else{
            asyncParse();
        }
    }
},setHandler:function(_914){
    var fcn=dojo.lang.isFunction(_914)?_914:window[_914];
    if(!dojo.lang.isFunction(fcn)){
        this._handleDefaults("Unable to set handler, '"+_914+"' not a function.","onExecError",true);
        return;
    }
    this.handler=function(){
        return fcn.apply(this,arguments);
    };
},_runHandler:function(){
    var ret=true;
    if(dojo.lang.isFunction(this.handler)){
        this.handler(this,this.domNode);
        ret=false;
    }
    this.onLoad();
    return ret;
},_executeScripts:function(_917){
    var self=this;
    var tmp="",code="";
    for(var i=0;i<_917.length;i++){
        if(_917[i].path){
            dojo.io.bind(this._cacheSetting({"url":_917[i].path,"load":function(type,_91c){
                dojo.lang.hitch(self,tmp=_91c);
            },"error":function(type,_91e){
                _91e._text=type+" downloading remote script";
                self._handleDefaults.call(self,_91e,"onExecError",true);
            },"mimetype":"text/plain","sync":true},this.cacheContent));
            code+=tmp;
        }else{
            code+=_917[i];
        }
    }
    try{
        delete this.scriptScope;
        this.scriptScope=new (new Function("_container_",code+"; return this;"))(self);
    }
    catch(e){
        e._text="Error running scripts from content:\n"+e.description;
        this._handleDefaults(e,"onExecError",true);
    }
}});


/**
 * Copyright (c) 2005-2006 Tremend Software Consulting, Licensed under the Academic Free License version 2.1 or BSD licenses
 */


dojo.provide("dojo.widget.Spreadsheet");
dojo.provide("dojo.widget.SpreadsheetSheet");

dojo.require("dojo.string");
dojo.require("dojo.graphics.color");
dojo.require("dojo.widget.HtmlWidget");
dojo.require("dojo.widget.ColorPalette");
dojo.require("dojo.widget.Toolbar");
dojo.require("dojo.widget.TabContainer");
dojo.require("dojo.widget.ContentPane");

dojo.widget.defineWidget(
    "dojo.widget.Spreadsheet",
    dojo.widget.HtmlWidget,
    {
        templateCssPath: dojo.uri.dojoUri("src/widget/templates/Spreadsheet.css"),
        widgetType: "Spreadsheet",
        tc: null,
        tabContainer: null,
        tabs: [],
        activeTab: null,
        boldItem: null,
        italicItem: null,
        underlineItem: null,
        colorItem: null,
        bgcolorItem: null,
        fontMenu: null,
        fontSizeMenu: null,
        rowsMenu: null,
        colsMenu: null,
        sheetMenu: null,
        functionsMenu: null,

        /**
         * Create toolbar, tabcontainer and first sheet
         */
        postCreate: function(args, frag){
            this.createToolbar();
            this.createTabContainer();

            this.createSheet("sheet 1");
        },

        /**
         * Initializes the toolbar
         */
        createToolbar: function() {
            this.tc = dojo.widget.createWidget("ToolbarContainer");
            this.domNode.appendChild(this.tc.domNode);

            tb = dojo.widget.createWidget("Toolbar");
            this.tc.addChild(tb);
            var bg = dojo.widget.createWidget("ToolbarButtonGroup", {
                name: "justify",
                defaultButton: "justifyleft",
                preventDeselect: true
            });
            bg.addChild(this.img("justifyleft"));
            bg.addChild(this.img("justifycenter"));
            bg.addChild(this.img("justifyright"));
            bg.addChild(this.img("justifyfull"));

            // rows menu
            this.rowsMenu = dojo.widget.createWidget("ToolbarSelect", {
                name: "formatBlock",
                values: {
                       "Rows": "-1",
                    "Insert before": "1",
                    "Insert after": "2",
                    "Delete": "3"
                }
            });
            dojo.event.connect(this.rowsMenu, "onSetValue", this, "rowAction");
            this.rowsMenu.domNode.getElementsByTagName("select")[0].style.width="60px";
            tb.addChild(this.rowsMenu);

            // cols menu
            this.colsMenu = dojo.widget.createWidget("ToolbarSelect", {
                name: "formatBlock",
                values: {
                       "Columns": "-1",
                    "Insert before": "1",
                    "Insert after": "2",
                    "Delete": "3"
                }
            });
            dojo.event.connect(this.colsMenu, "onSetValue", this, "colAction");
            this.colsMenu.domNode.getElementsByTagName("select")[0].style.width="80px";
            tb.addChild(this.colsMenu);

            // separator
            tb.addChild("|", null);

            // font menu
            this.fontMenu = dojo.widget.createWidget("ToolbarSelect", {
                name: "formatBlock",
                values: {
                    "Font": "-1",
                    "Serif": "serif",
                    "Sans-serif": "sans-serif",
                    "Cursive": "cursive",
                    "Fantasy": "fantasy",
                    "Monospace": "monospace"
                }
            });
            dojo.event.connect(this.fontMenu, "onSetValue", this, "changeFont");
            this.fontMenu.domNode.getElementsByTagName("select")[0].style.width="80px";
            tb.addChild(this.fontMenu);

            // font size menu
            this.fontSizeMenu = dojo.widget.createWidget("ToolbarSelect", {
                name: "formatBlock",
                values: {
                    "Size": "-1",
                    "10": "10",
                    "12": "12",
                    "14": "14",
                    "16": "16",
                    "18": "18",
                    "24": "24",
                    "32": "32",
                    "40": "40"
                }
            });
            dojo.event.connect(this.fontSizeMenu, "onSetValue", this, "changeFontSize");
            this.fontSizeMenu.domNode.getElementsByTagName("select")[0].style.width="55px";
            tb.addChild(this.fontSizeMenu);

            // separator
            tb.addChild("|", null);

            // bold toggle button
            this.boldItem = dojo.widget.ToolbarItem.make(this.img("bold"),null,{toggleItem:true});
            dojo.event.connect(this.boldItem.domNode, "onclick", this, "makeBold");
            tb.addChild(this.boldItem);

            // italic toggle button
            this.italicItem = dojo.widget.ToolbarItem.make(this.img("italic"),null,{toggleItem:true});
            dojo.event.connect(this.italicItem.domNode, "onclick", this, "makeItalic");
            tb.addChild(this.italicItem);

            // underline toggle button
            this.underlineItem = dojo.widget.ToolbarItem.make(this.img("underline"),null,{toggleItem:true});
            dojo.event.connect(this.underlineItem.domNode, "onclick", this, "makeUnderline");
            tb.addChild(this.underlineItem);

            // separator
            tb.addChild("|", null);

            // color dialog
            this.colorItem = dojo.widget.createWidget("ToolbarColorDialog", {toggleItem: true, icon: new dojo.widget.Icon(this.img("forecolor"))});
            dojo.event.connect(this.colorItem.dialog, "onColorSelect", this, "changeColor");
            tb.addChild(this.colorItem);

            // bg color dialog
            this.bgcolorItem = dojo.widget.createWidget("ToolbarColorDialog", {toggleItem: true, icon: new dojo.widget.Icon(this.img("backcolor"))});
            dojo.event.connect(this.bgcolorItem.dialog, "onColorSelect", this, "changeBGColor");
            tb.addChild(this.bgcolorItem);

            // sheet menu
            this.sheetMenu = dojo.widget.createWidget("ToolbarSelect", {
                name: "sheetMenu",
                values: {
                    "Sheet": "-1",
                    "Rename": "1",
                    "Delete": "2",
                    "New": "3"
                }
            });
            dojo.event.connect(this.sheetMenu, "onSetValue", this, "sheetAction");
            this.sheetMenu.domNode.getElementsByTagName("select")[0].style.width="65px";
            tb.addChild(this.sheetMenu);

            // functions menu
            this.functionsMenu = dojo.widget.createWidget("ToolbarSelect", {
                name: "functionsMenu",
                values: {
                    "Functions": "-1",
                    "Sum": "sum",
                    "Product": "product",
                    "Average": "avg",
                    "Min": "min",
                    "Max": "max",
                    "Count": "count",
                    "Equals": "equals",
                    "IfElse": "ifelse"
                }
            });
            dojo.event.connect(this.functionsMenu, "onSetValue", this, "applyFunction");
            this.functionsMenu.domNode.getElementsByTagName("select")[0].style.width="85px";
            tb.addChild(this.functionsMenu);
        },

        /**
         * Util function. The same as the one in test_toolbar.html. Returns the image from src/widget/templates/buttons
         * @param name the name of image (no extension)
         */
        img: function(name) {
            return dojo.uri.dojoUri("src/widget/templates/buttons/" + name + ".gif").toString();
        },

        /**
         * Creates the tab container which will hold the sheets
         */
        createTabContainer: function() {
            var domNode = this.tc.domNode;
            dojo.html.disableSelection(domNode);
            this.tabContainer = dojo.widget.createWidget("TabContainer",{doLayout: false, id:"tabsTabContainer", labelPosition: "bottom"},
                                                         domNode, 'after');

            dojo.event.connect(this.tabContainer, "selectTab", this, "tabChanged");

            with(this.tabContainer.domNode.style) {
                width="100%";
                height="80%";
            }
        },

        /**
         * Callback for row menu
         * @param item the menu item
         * @param val the value for the item selected
         */
        rowAction: function(item, val) {
            if(val != "-1") {
                switch(val) {
                    case "1": // insert row before
                        this.tabs[this.activeTab].sheet.insertRowBefore();
                        break;
                    case "2": // insert row before
                        this.tabs[this.activeTab].sheet.insertRowAfter();
                        break;
                    case "3": // insert row before
                        this.tabs[this.activeTab].sheet.removeRows();
                        break;
                }
                this.rowsMenu.domNode.getElementsByTagName("select")[0].selectedIndex = 0;
            }
        },

        /**
         * Callback for column menu
         * @param item the menu item
         * @param val the value for the item selected
         */
        colAction: function(item, val) {
            if(val != "-1") {
                switch(val) {
                    case "1": // insert row before
                        this.tabs[this.activeTab].sheet.insertColumnBefore();
                        break;
                    case "2": // insert row before
                        this.tabs[this.activeTab].sheet.insertColumnAfter();
                        break;
                    case "3": // insert row before
                        this.tabs[this.activeTab].sheet.removeCols();
                        break;
                }
                this.rowsMenu.domNode.getElementsByTagName("select")[0].selectedIndex = 0;
            }
        },

        /**
         * Callback for sheet menu
         * @param item the menu item
         * @param val the value for the item selected
         */
        sheetAction: function(item, val) {
            if(val != "-1") {
                switch(val) {
                    case "1": // rename current sheet
                        var newVal = prompt("Enter the new name for the sheet");
                        if(newVal) {
                            this.tabs[this.activeTab].div.getElementsByTagName("span")[0].innerHTML = newVal;
                            this.tabs[this.activeTab].label = newVal;
                        }
                        break;
                    case "2": // delete current sheet
                        this.removeCurrentSheet();
                        break;
                    case "3": // new sheet
                        this.createSheet("sheet " + (this.tabs.length + 1));
                        break;
                }
                this.sheetMenu.domNode.getElementsByTagName("select")[0].selectedIndex = 0;
            }
        },

        /**
         * Applies a formula
         * @param item the menu item
         * @param val the value for the item selected
         */
        applyFunction: function(item, val) {
            if(val != "-1") {
                this.tabs[this.activeTab].sheet.applyFormula(val);
            }
        },

        /**
         * Callback for font size menu
         * @param item the menu item
         * @param val the value for the item selected
         */
        changeFontSize: function(item, val) {
            if(val != "-1") {
                this.tabs[this.activeTab].sheet.formatSelectedCells(dojo.widget.SpreadsheetSheet.prototype.FORMATTING_TYPES.FONT_SIZE, val);
                this.fontSizeMenu.domNode.getElementsByTagName("select")[0].selectedIndex = 0;
            }
        },

        /**
         * Callback for font size menu
         * @param item the menu item
         * @param val the value for the item selected
         */
        changeFont: function(item, val) {
            if(val != "-1") {
                this.tabs[this.activeTab].sheet.formatSelectedCells(dojo.widget.SpreadsheetSheet.prototype.FORMATTING_TYPES.FONT, val);
                this.fontMenu.domNode.getElementsByTagName("select")[0].selectedIndex = 0;
            }
        },

        /**
         * Callback for color picker
         * @param color the color selected
         */
        changeColor: function(color) {
            this.tabs[this.activeTab].sheet.formatSelectedCells(dojo.widget.SpreadsheetSheet.prototype.FORMATTING_TYPES.COLOR, color);
        },

        /**
         * Callback for background color picker
         * @param color the color selected
         */
        changeBGColor: function(color) {
            this.tabs[this.activeTab].sheet.formatSelectedCells(dojo.widget.SpreadsheetSheet.prototype.FORMATTING_TYPES.BG_COLOR, color);
        },

        /**
         * Callback for bold button
         */
        makeBold: function() {
            this.tabs[this.activeTab].sheet.formatSelectedCells(dojo.widget.SpreadsheetSheet.prototype.FORMATTING_TYPES.BOLD, this.boldItem.isSelected());
        },

        /**
         * Callback for italic button
         */
        makeItalic: function() {
            this.tabs[this.activeTab].sheet.formatSelectedCells(dojo.widget.SpreadsheetSheet.prototype.FORMATTING_TYPES.ITALIC, this.italicItem.isSelected());
        },

        /**
         * Callback for underline button
         */
        makeUnderline: function() {
            this.tabs[this.activeTab].sheet.formatSelectedCells(dojo.widget.SpreadsheetSheet.prototype.FORMATTING_TYPES.UNDERLINE, this.underlineItem.isSelected());
        },

        /**
         * Creates a new sheet (new ContentPane and a new sheet inside)
         * @param name the name of the sheet
         */
        createSheet: function(sheetName) {
            // create the content pane for the new tab for this new sheet
            var currentTabIdx = this.tabs.length;
            this.tabs[currentTabIdx] = dojo.widget.createWidget("ContentPane",
                                                                {id:"sheet" + currentTabIdx, label:sheetName});
            this.tabContainer.addChild(this.tabs[currentTabIdx]);
            // called once (otherwise the selection gets broken
            this.tabContainer.selectTab(this.tabs[currentTabIdx]);

            var v = dojo.widget.createWidget("SpreadsheetSheet");
            v.init(this.tabs[currentTabIdx]);
            this.tabs[currentTabIdx].sheet = v;
            this.activeTab = currentTabIdx;

            // second call is necessary, since some props are set before this call
            this.tabContainer.selectTab(this.tabs[currentTabIdx]);

            // toolbar toggle buttons need to be notified so that they reflect the state
            // of the cell (if cell has bold style, bold button must be toggled)
            dojo.event.connect(v, "setFormatting", this, "setFormatting");
        },

        /**
         * Event handler for "setFormatting" event thrown by the sheet object. This is useful for chaning button states
         * according to cell's formatting. If one cell has bold style, the toolbar should reflect this state
         *
         * @param spreadsheet     the sheet that triggered the event
         * @param _bold         true if bold enabled, false otherwise
         * @param _italic         true if italic enabled, false otherwise
         * @param _underline    true if underline enabled, false otherwise
         */
        setFormatting: function(spreadsheet, _bold, _italic, _underline) {
            this.boldItem.setSelected(_bold);
            this.italicItem.setSelected(_italic);
            this.underlineItem.setSelected(_underline);
        },

        /**
         * Removes the current working sheet
         */
        removeCurrentSheet: function() {
            if(this.tabs.length > 1) {
                this.tabContainer.removeChild(this.tabs[this.activeTab]);
                for(var i = this.activeTab; i < this.tabs.length - 1; i++) {
                    this.tabs[i] = this.tabs[i+1];
                }
                this.tabs.length --;
                this.activeTab = this.activeTab > 0 ? this.activeTab - 1 : this.activeTab;
            } else {
                alert("The document must have at least one sheet");
            }
        },

        /**
         * Handles sheet change. This is needed for the sheet to decouple certain events that may mess up how sheet receive events
         */
        tabChanged: function() {
            for(var i = 0; i < this.tabs.length; i++) {
                if(this.tabs[i] == this.tabContainer.selectedTabWidget) {
                    this.activeTab = i;

                    if(this.tabs[i].sheet) {
                        this.tabs[i].sheet.gainFocus();
                    }
                } else {
                    if(this.tabs[i].sheet) {
                        this.tabs[i].sheet.loseFocus();
                    }
                }
            }
        }
    }
);

dojo.widget.defineWidget(
    "dojo.widget.SpreadsheetSheet",
    dojo.widget.HtmlWidget,
    {
        CELL_TYPES: { NUMBER:0, STRING:1, DATE:2, FORMULA:3 },
        FORMATTING_TYPES: { FONT:0, FONT_SIZE:1, COLOR:2, BG_COLOR:3, BOLD:4, ITALIC:5, UNDERLINE:6, ALIGN:7 },
        FORMULAS: { SUM:0, AVG:0 },
        //serif', 'sans-serif', 'cursive', 'fantasy', and 'monospace
        MINIMUM_CELL_WIDTH: 12,
        MINIMUM_CELL_HEIGHT: 12,
        currentFocusedCol : 0,
        currentFocusedRow : 0,
        tbody: null,
        rows: null,
        SELECTION_MODES: { RECTANGLE:0, RANDOM:1 },
        selectionMode: 0,
        // properties for cell selection
        isSelectingCells: false,
        selectionStartCell: null,
        lastSelectedRegion : null,
        // properties for column selection
        isSelectingColumns: false,
        selectionStartColumn: null,
        lastSelectedColumns: [],
        // properties for row selection
        isSelectingRows: false,
        selectionStartRow: null,
        lastSelectedRows: [],
        // properties needed for horizontal resizing of columns
        isResizingHorizontal: false,
        resizeOrigXPos: 0,
        resizeOrigTH: null,
        // properties needed for vertical resizing of rows
        isResizingVertical: false,
        resizeOrigYPos: 0,
        resizeOrigTD: null,
        // properties for editing
        isEditing: false,
        inputElem: null,
        spreadsheetWidth: 0,
        spreadsheetHeight: 0,
        /**
        * Regular expressions for detecting cell intervals, cells or functions
        */
        reInterval: /[a-zA-Z]{1}[0-9]+:[a-zA-Z]{1}[0-9]+/g,
        reCell: /[^a-zA-Z]{1}[a-zA-Z]{1}[0-9]+/g,
        reFunction: /[a-zA-Z]{3,}[a-zA-Z0-9]*\(/g,
        /**
        * For detecting circular dependencies, the spreadsheet will be represented as a
        * directed graph
        * The graph is represented as a matrix in which a value of 1 means there's a direct dependency
        * between node A and node B. For example, if A->B, A->C, B->D, B->E, D->C, C->B, the graph will look like:
        *      A B C D E
        *     __________
        *  A | 0 1 1 0 0
        *  B | 0 0 0 1 1
        *  C | 0 1 0 0 0
        *  D | 0 0 1 0 0
        *  E | 0 0 0 0 0
        */
        ssGraph: null,
        /**
        * This object will hold a map with correspondences btw cell notation and number in matrix
        * (A1 - 0, A2 - 1, A3 - 2..., B15 - 20)
        */
        cellGraphLookup: null,
        domNode: null,
        /**
         *
         */
        months: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
        reDate1: /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,4}/,
        reDate2: /[0-9]{1,2}-[a-z]{3}-[0-9]{4}/,
        reNumber1: /[^0-9e\.]/,

        postCreate: function() {
        },

        /**
         * Initializes the graphic widget (table, column/row headers, etc)
         * @param contentPane the ContentPane object corresponding to a tab in a TabContainer
         */
        init: function(contentPane) {
            this.domNode = contentPane.domNode;

            // create the table for this sheet
            this.createSpreadsheetCells(contentPane);
            this.resetSpreadsheet();
            this.initGraph();

            // disable selection
            dojo.html.disableSelection(this.domNode);

            this.gainFocus();
            this.createInputElem();
            this._focus(this.currentFocusedCol, this.currentFocusedRow);
        },

        /**
         * Called when a sheet is losing focus (other sheet becomes active) - disconnects event handlers
         */
        loseFocus: function() {
            dojo.event.disconnect(this.domNode, "onmousedown", this, "onMouseDown");
            dojo.event.disconnect(this.domNode, "onmousemove", this, "onMouseMove");
            dojo.event.disconnect(this.domNode, "onmouseup", this, "onMouseUp");
            dojo.event.disconnect(this.domNode, "onmouseover", this, "onMouseOver");
            dojo.event.disconnect(document, "onkeypress", this, "onKeyPress");
            dojo.event.disconnect(document, "onkeyup", this, "onKeyUp");
            dojo.event.disconnect(this.domNode, "ondblclick", this, "onDblClick");
        },

        /**
         * Called when a sheet is gaining focus - reconnects event handlers
         */
        gainFocus: function() {
            // make sure events are not connected twice
            this.loseFocus();
            dojo.event.connect(this.domNode, "onmousedown", this, "onMouseDown");
            dojo.event.connect(this.domNode, "onmousemove", this, "onMouseMove");
            dojo.event.connect(this.domNode, "onmouseup", this, "onMouseUp");
            dojo.event.connect(this.domNode, "onmouseover", this, "onMouseOver");
            dojo.event.connect(document, "onkeypress", this, "onKeyPress");
            dojo.event.connect(document, "onkeyup", this, "onKeyUp");
            dojo.event.connect(this.domNode, "ondblclick", this, "onDblClick");
        },

        /**
         * Creates the spreadsheet cells (the actual <TABLE> element)
         * @param contentPane the ContentPane object associated with a TabContainer
         */
        createSpreadsheetCells: function(contentPane) {
            var html = '';
            html += '<div style="height:100%;width:100%;overflow:auto;">';
            html += '<table class="sheet" cellspacing="0" cellpadding="0" >';
            html += '  <thead>';
            html += '    <th class="sheetRow1stCell"></th>';
            for(var col = 0; col < 26; col ++) {
                html += '    <th><div class="header"><div class="headerText">A</div><div class="horizontalResizer">&nbsp;</div></div></th>';
            }
            html += '  </thead>';
            html += '  <tbody>';
            for(var row = 0; row < 80; row ++) {
                html += '    <tr>';
                html += '      <td class="sheetRow1stCell"><div><div class="rowHeaderText"></div><div class="verticalResizer">&nbsp;</div></div></td>';
                for(var col = 0; col < 26; col ++) {
                    html += '      <td class="sheetCell"><div class="sheetCellContent"></div></td>';
                }
                html += '    </tr>';
            }
            html += '  </tbody>';
            html += '</table>';
            html += '</div>';

            contentPane.setContent(html);
        },

        /**
         * Initializes the dependencies graph
         */
        initGraph: function() {
            this.spreadsheetWidth = this.rows[0].cells.length - 1;
            this.spreadsheetHeight = dojo.render.html.ie ? (this.rows.length - 1) : this.rows.length;
            this.ssGraph = new Array();

            // initialize the graph edges
            var numNodes = this.spreadsheetWidth * this.spreadsheetHeight;
            for(var i = 0; i < numNodes; i++) {
                this.ssGraph[i] = new Array();
                for(var j = 0; j < numNodes; j++) {
                    this.ssGraph[i][j] = 0;
                }
            }

            // populate the lookup
            this.cellGraphLookup = new Object();
            for(var i = 0; i < this.spreadsheetWidth; i++) {
                for(var j = 1; j <= this.spreadsheetHeight; j++) {
                    this.cellGraphLookup[String.fromCharCode("A".charCodeAt(0) + i) + j] = j * this.spreadsheetWidth + i;
                }
            }
        },

        /**
         * Applies labels to column/row headers. Fixes width of first column and initializes internal data for each cell/header
         */
        resetSpreadsheet: function() {
            this.tbody = this.domNode.getElementsByTagName("tbody")[0];
            this.rows = this.tbody.getElementsByTagName("tr");

            for(var i = 0; i < this.rows.length; i++) {
                // - not discovered yet - for some reasons FF throws some errors when using firstChild.firstChild
                //if(this.rows[i].cells[0].firstChild && this.rows[i].cells[0].firstChild.firstChild) {
                this.rows[i].cells[0].firstChild.firstChild.innerHTML = "" + (i + 1);
                //}
                this.rows[i].dHeight = dojo.html.getInnerHeight(this.rows[i]);

                for(var j = 0; j < this.rows[i].cells.length; j++) {
                    var tmpW = dojo.html.getInnerWidth(this.rows[i].cells[j].firstChild) + (dojo.render.html.ie ? 2 : 3);
                    var tmpH = dojo.html.getInnerHeight(this.rows[i].cells[j].firstChild) + (dojo.render.html.ie ? 3 : 3);
                    this.rows[i].cells[j].firstChild.dWidth = tmpW;
                    this.rows[i].cells[j].firstChild.style.width = tmpW;
                    this.rows[i].cells[j].firstChild.dHeight = tmpH;
                    this.rows[i].cells[j].firstChild.style.height = tmpH;
                    var bgColor = dojo.html.getBackgroundColor(this.rows[i].cells[j].firstChild);
                    this.rows[i].cells[j].firstChild.dBackgroundColor = dojo.graphics.color.rgb2hex(bgColor[0], bgColor[1], bgColor[2]);

                    dojo.html.disableSelection(this.rows[i].cells[j]);
                    dojo.html.disableSelection(this.rows[i].cells[j].firstChild);
                }

                var cucu = this.rows[i].cells[0].getElementsByTagName("div");
                for(var ss = 0; ss < cucu.length; ss++) {
                    cucu[ss].style.width = "20px";
                }
                this.rows[i].cells[0].style.width = "20px";
                this.rows[i].cells[0].firstChild.style.height = "20px";
                this.rows[i].cells[0].firstChild.firstChild.style.height = "18px";
                this.rows[i].cells[0].firstChild.firstChild.nextSibling.style.height = "2px";
            }

            var ths = this.domNode.getElementsByTagName("TH");
            ths[0].style.width = "20px";
            for(var i = 1; i < ths.length; i++) {
                ths[i].dCellIndex = i - 1;
                ths[i].dWidth = dojo.html.getInnerWidth(ths[i]);
                if(ths[i].firstChild && ths[i].firstChild.firstChild) {
                    ths[i].firstChild.firstChild.innerHTML = String.fromCharCode("A".charCodeAt(0) + i - 1);
                }
                dojo.html.disableSelection(ths[i]);
                dojo.html.disableSelection(ths[i].firstChild);
                dojo.html.disableSelection(ths[i].firstChild.firstChild);
            }
        },

        /**
         * Creates the input element to display when editing a cell
         */
        createInputElem: function() {
            if(this.inputElem == null) {
                this.inputElem = document.createElement("input");

                with(this.inputElem) {
                    type = "text";
                    className = "sheetInput";
                    style.position = "absolute";
                    style.display = "none";
                    tdElem = null;
                }
                document.body.appendChild(this.inputElem);
                dojo.html.enableSelection(this.inputElem);
            }
        },

        /**
         * Handles onmousedown which can cause several relevant events for spreadsheet: focusing, selection, resizing
         */
        onMouseDown: function(e) {
            var inputElem = dojo.html.getParentByType(e.target, "INPUT");
            if(inputElem && dojo.html.hasClass(inputElem, "sheetInput")) {
                return;
            }

            this.deselectAll();

            var currentTDElem = dojo.html.getParentByType(e.target, "TD");
            if(currentTDElem && dojo.html.hasClass(currentTDElem, "sheetCell")) {
                this.isSelectingCells = true;
                this.selectionStartCell = currentTDElem;
                this.selectCellByTD(this.selectionStartCell, true);
                e.preventDefault();
            }

            var currentDIVElem = dojo.html.getParentByType(e.target, "DIV");
            if(currentDIVElem && dojo.html.hasClass(currentDIVElem, "horizontalResizer")) {
                this.isResizingHorizontal = true;
                var pos = dojo.html.getCursorPosition(e);
                this.resizeOrigXPos = pos.x;
                this.resizeOrigTH = dojo.html.getParentByType(e.target, "TH");
            }
            if(currentDIVElem && dojo.html.hasClass(currentDIVElem, "verticalResizer")) {
                this.isResizingVertical = true;
                var pos = dojo.html.getCursorPosition(e);
                this.resizeOrigYPos = pos.y;
                this.resizeOrigTD = dojo.html.getParentByType(e.target, "TD");
            }

            if(!this.isResizingHorizontal && !this.isResizingVertical) {
                var currentTH = dojo.html.getParentByType(e.target, "TH");
                if(currentTH) {
                    this.isSelectingColumns = true;
                    this.selectionStartColumn = currentTH.dCellIndex;
                    this.selectColumns(this.selectionStartColumn);
                }

                var currentTDRowHeader = dojo.html.getParentByType(e.target, "TD");
                if(currentTDRowHeader && dojo.html.hasClass(currentTDRowHeader, "sheetRow1stCell")) {
                    this.isSelectingRows = true;
                    this.selectionStartRow = this.getCellRow(currentTDRowHeader);
                    this.selectRows(this.selectionStartRow);
                }
            }
        },

        /**
         * Handles onmousemove - useful when resizing to dinamically resize as mouse moves
         */
        onMouseMove: function(e) {
            if(this.isResizingHorizontal) {
                this.resizeCol(e, false);
            }

            if(this.isResizingVertical) {
                this.resizeRow(e, false);
            }
        },

        /**
         * Handles onmouseover - to keep track of the selection process
         */
        onMouseOver: function(e) {
            if(this.isSelectingCells) {
                var currentTDElem = dojo.html.getParentByType(e.target, "TD");

                if(currentTDElem && dojo.html.hasClass(currentTDElem, "sheetCell")) {
                    this.deselectAll();

                    this.selectRegion(
                        this.getCellCol(currentTDElem),
                        this.getCellCol(this.selectionStartCell),
                        this.getCellRow(currentTDElem),
                        this.getCellRow(this.selectionStartCell),
                        true);
                }
            }

            if(this.isSelectingColumns) {
                // the mouse may move over THs or TDs. However we should detect in each case the column
                var currentTDElem = dojo.html.getParentByType(e.target, "TD");

                if(currentTDElem && dojo.html.hasClass(currentTDElem, "sheetCell")) {
                    var selectionEndColumn = this.getCellCol(currentTDElem);
                    this.selectColumns(selectionEndColumn);
                } else {
                    var currentTHElem = dojo.html.getParentByType(e.target, "TH");

                    if(currentTHElem) {
                        var selectionEndColumn = currentTHElem.dCellIndex;
                        this.selectColumns(selectionEndColumn);
                    }
                }
            }

            if(this.isSelectingRows) {
                var currentTDElem = dojo.html.getParentByType(e.target, "TD");
                if(currentTDElem &&
                   (dojo.html.hasClass(currentTDElem, "sheetCell") ||
                    dojo.html.hasClass(currentTDElem, "sheetRow1stCell"))) {
                    var selectionEndRow = this.getCellRow(currentTDElem);
                    this.selectRows(selectionEndRow);
                }
            }
        },

        /**
         * Handles onmouseup - either selection of resizing have finished
         */
        onMouseUp: function(e) {
            if(this.isSelectingCells) {
                // unselect only if the mouse up occured on the same cell
                if(this.selectionStartCell && this.selectionStartCell == dojo.html.getParentByType(e.target, "TD")) {
                    this.selectCellByTD(this.selectionStartCell, false);
                    this.focusOn(this.selectionStartCell);
                }

                this.isSelectingCells = false;
            }

            if(this.isResizingHorizontal) {
                this.resizeCol(e, true);
                this.isResizingHorizontal = false;
            }

            if(this.isResizingVertical) {
                this.resizeRow(e, true);
                this.isResizingVertical = false;
            }

            if(this.isSelectingColumns) {
                this.isSelectingColumns = false;
            }

            if(this.isSelectingRows) {
                this.isSelectingRows = false;
            }
        },

        /**
         * Ondblclick - the editing box is shown
         */
        onDblClick: function(e) {
            var currentTDElem = dojo.html.getParentByType(e.target, "TD");

            if(currentTDElem && dojo.html.hasClass(currentTDElem, "sheetCell")) {
                this.deselectAll();

                this.showInputOverTD(currentTDElem);
            }
        },

        /**
         * Onkeypress - manages delete, enter, backspace, esc, space keys
         */
        onKeyPress: function(e) {
            var keyCode = e.keyCode == 0 ? e.which : e.keyCode;
            var k = dojo.event.browser.keys;
            var keyHandled = false;

            if(keyCode == k.KEY_ESCAPE) {
                this.hideInput(true);
                keyHandled = true;
            }
            if(keyCode == k.KEY_BACKSPACE) {
                this.eraseCurrentCellContent();
            }
            if(keyCode == k.KEY_DELETE) {
                this.eraseCurrentCellContent();
            }
            if(keyCode == k.KEY_ENTER) {
                if(!this.isEditing) {
                    var tdElem = this.getCell(this.currentFocusedCol, this.currentFocusedRow);
                    this.showInputOverTD(tdElem);
                    keyHandled = true;
                } else {
                    this.moveFocus(0, 1);
                    keyHandled = true;
                }
            }
            if(keyCode == k.KEY_SPACE ||
               (keyCode >= 41 && keyCode <= 44) ||
               keyCode >= 47) {
                if(!this.isEditing) {
                    var tdElem = this.getCell(this.currentFocusedCol, this.currentFocusedRow);
                    this.showInputOverTD(tdElem);
                    if(!dojo.render.html.ie) {
                        this.inputElem.value = String.fromCharCode(keyCode);
                    }
                }
            }

            if(keyHandled == true) {
                e.preventDefault();
                e.stopPropagation();
            }
        },

        /**
         * onKeyUp - handles up/right/down/left arrows
         */
        onKeyUp: function(e) {
            var keyCode = e.keyCode == 0 ? e.which : e.keyCode;
            var k = dojo.event.browser.keys;
            var keyHandled = false;

            if(keyCode == k.KEY_DOWN_ARROW) {
                if(!this.isEditing) {
                    this.moveFocus(0, 1);
                    keyHandled = true;
                }
            }
            if(keyCode == k.KEY_UP_ARROW) {
                if(!this.isEditing) {
                    this.moveFocus(0, -1);
                    keyHandled = true;
                }
            }
            if(keyCode == k.KEY_LEFT_ARROW) {
                if(!this.isEditing) {
                    this.moveFocus(-1, 0);
                    keyHandled = true;
                }
            }
            if(keyCode == k.KEY_RIGHT_ARROW) {
                if(!this.isEditing) {
                    this.moveFocus(1, 0);
                    keyHandled = true;
                }
            }

            if(keyHandled == true) {
                e.preventDefault();
                e.stopPropagation();
            }
        },

        /**
         * Moves focus to the specified cell
         * @deltaX delta movement on columns
         * @deltaY delta movement on rows
         */
        moveFocus: function(deltaX, deltaY) {
            var newCol = this.currentFocusedCol;
            var anyChange = false;

            if(newCol + deltaX < this.spreadsheetWidth && newCol + deltaX >= 0) {
                newCol = newCol + deltaX;
                anyChange = true;
            }
            var newRow = this.currentFocusedRow;
            if(newRow + deltaY < this.spreadsheetHeight && newRow + deltaY >= 0) {
                newRow = newRow + deltaY;
                anyChange = true;
            }

            if(anyChange) {
                this.unfocus(this.currentFocusedCol, this.currentFocusedRow);
                this.currentFocusedCol = newCol;
                this.currentFocusedRow = newRow;
                this._focus(this.currentFocusedCol, this.currentFocusedRow);
            }
        },

        /**
         * Focuses on a given element
         * @param elem the <TD> element to focus on
         */
        focusOn: function(elem) {
            var _col = this.getCellCol(elem);
            var _row = this.getCellRow(elem);
            if( _row < this.spreadsheetHeight && _col < this.spreadsheetWidth) {
                this.focusAt(_col, _row);
            }
        },

        /**
         * Focuses at a given location
         * @param _col the col coordinate where to focus
         * @param _row the row coordinate where to focus
         */
        focusAt: function(_col, _row) {
            if(_row >= this.spreadsheetHeight) {
                _row = this.spreadsheetHeight - 1;
            }
            if(_col >= this.spreadsheetWidth) {
                _col = this.spreadsheetWidth - 1;
            }
            this.unfocus(this.currentFocusedCol, this.currentFocusedRow);
            this.currentFocusedCol = _col;
            this.currentFocusedRow = _row;
            this.selectionStartCell = this.getCell(_col, _row);
            this._focus(this.currentFocusedCol, this.currentFocusedRow);
        },

        /**
         * Internal fn which actually does the focusing
         * @param _col the col coordinate where to focus
         * @param _row the row coordinate where to focus
         */
        _focus: function(_col, _row) {
            if(typeof(_col) != "undefined" && typeof(_row) != "undefined") {
                if( _row < this.spreadsheetHeight && _col < this.spreadsheetWidth) {
                    var _tdElem = this.getCell(_col, _row);

                    var _italic = false;
                    var _bold = false;
                    var _underline = false;
                    if(typeof(_tdElem.styleList) != "undefined") {
                        _bold = _tdElem.styleList[this.FORMATTING_TYPES.BOLD] ? _tdElem.styleList[this.FORMATTING_TYPES.BOLD] : false;
                        _italic = _tdElem.styleList[this.FORMATTING_TYPES.ITALIC] ? _tdElem.styleList[this.FORMATTING_TYPES.ITALIC] : false;
                        _underline = _tdElem.styleList[this.FORMATTING_TYPES.UNDERLINE] ? _tdElem.styleList[this.FORMATTING_TYPES.UNDERLINE] : false;
                    }
                    this._fireEvent("setFormatting", _bold, _italic, _underline);

                    var w = _tdElem.firstChild.dWidth;
                    var h = _tdElem.firstChild.dHeight;
                    _tdElem.firstChild.style.width = this.toPx(w - (dojo.render.html.ie ? 0 : 4));
                    _tdElem.firstChild.style.height = this.toPx(h - (dojo.render.html.ie ? 0 : 4));
                    dojo.html.addClass(_tdElem.firstChild, "focused");
                }
            }
        },

        /**
         * Unfocuses the cell at a given position
         * @param _col the col coordinate where to unfocus
         * @param _row the row coordinate where to unfocus
         */
        unfocus: function(_col, _row) {
            this.hideInput();
            if(typeof(_col) != "undefined" && typeof(_row) != "undefined") {
                if( _row < this.spreadsheetHeight && _col < this.spreadsheetWidth) {
                    var _tdElem = this.getCell(_col, _row);

                    var w = _tdElem.firstChild.dWidth;
                    var h = _tdElem.firstChild.dHeight;
                    _tdElem.firstChild.style.width = this.toPx(w);
                    _tdElem.firstChild.style.height = this.toPx(h);
                    dojo.html.removeClass(_tdElem.firstChild, "focused");
                }
            }
        },

        /**
         * Selects a region of the spreadsheet
         * @param col1 the start col
         * @param col2 the end col
         * @param row1 the start row
         * @param row2 the end row
         * @param _select whether to select or deselect the region
         */
        selectRegion: function(col1, col2, row1, row2, _select) {
            var minCol = col1 < col2 ? col1 : col2;
            var maxCol = col1 > col2 ? col1 : col2;
            var minRow = row1 < row2 ? row1 : row2;
            var maxRow = row1 > row2 ? row1 : row2;

            this.lastSelectedRegion = [minCol, maxCol, minRow, maxRow];

            for(var i = minCol; i <= maxCol; i++) {
                for(var j = minRow; j <= maxRow; j++) {
                    this.selectCell(i, j, _select);
                }
            }

            if(this.selectionStartCell) {
                this.focusOn(this.selectionStartCell);
            }

            if(!_select) {
                this.lastSelectedRegion = null;
            }
        },

        /**
         * Selects a cell given the HTML element
         * @param _tdElem the <TD> element to select
         * @param _select whether to select or deselect the HTML element
         */
        selectCellByTD: function(_tdElem, _select) {
            if(typeof(_tdElem) != "undefined") {
                this.selectCell(this.getCellCol(_tdElem), this.getCellRow(_tdElem), _select);
            }
        },

        /**
         * Selects or deselects a cell. Selection means changing the color to a lighter/darker blue depending on B's value (B from RGB)
         * @param _col the column (0-n, where 0 corresponds to the A column of the spreadsheet which is actually the second column of the table
         * @param _row the row (0-n, 0 - corresponds similarly to row 1)
         * @param _select whether to select or deselect the cell
         */
        selectCell: function(_col, _row, _select) {
            if(typeof(_col) != "undefined" && typeof(_row) != "undefined") {
                if( _row < this.spreadsheetHeight && _col < this.spreadsheetWidth) {
                    var tdElem = this.getCell(_col, _row);

                    if(_select) {
                        var bgColor = dojo.html.getBackgroundColor(tdElem.firstChild);

                        //tdElem.firstChild.dBackgroundColor = dojo.graphics.color.rgb2hex(bgColor[0], bgColor[1], bgColor[2]);
                        bgColor[0] = parseInt(bgColor[0]);
                        bgColor[1] = parseInt(bgColor[1]);
                        bgColor[2] = parseInt(bgColor[2]);
                        bgColor[0] = bgColor[0] > 128 ? bgColor[0] - 32 : bgColor[0] + 32;
                        bgColor[1] = bgColor[1] > 128 ? bgColor[1] - 32 : bgColor[1] + 32;
                        tdElem.firstChild.style.backgroundColor = dojo.graphics.color.rgb2hex(bgColor[0], bgColor[1], bgColor[2]);
                    } else {
                        tdElem.firstChild.style.backgroundColor = tdElem.firstChild.dBackgroundColor;
                    }
                }
            }
        },

        /**
         * Selects an entire column
         * @param idx the index of the column to be selected
         * @param _select whether to select or deselect the column
         */
        selectColumn: function(idx, _select) {
            for(var i = 0; i < this.spreadsheetHeight; i++) {
                this.selectCell(idx, i, _select);
            }
        },

        /**
         * Selects an interval of columns
         * @selectionEndColumn the last column of the selection. The first one is maintained at mouse events
         */
        selectColumns: function(selectionEndColumn) {
            this.unfocus(this.currentFocusedCol, this.currentFocusedRow);
            this.deselectAll();
            this.lastSelectedColumns = [];
            var minCol = selectionEndColumn < this.selectionStartColumn ? selectionEndColumn : this.selectionStartColumn;
            var maxCol = selectionEndColumn > this.selectionStartColumn ? selectionEndColumn : this.selectionStartColumn;
            for(var i = minCol; i <= maxCol; i++) {
                this.addColumnToSelection(i);
                this.selectColumn(i, true);
            }

            // select first cell of first columnx
            this.focusAt(this.selectionStartColumn, 0);
        },

        /**
         * Adds a column to the list of columns to be selected
         * @param idx the index of the column to be selected
         */
        addColumnToSelection: function(idx) {
            this.lastSelectedColumns[this.lastSelectedColumns.length] = idx;
        },

        /**
         * Selects an entire row
         * @param idx the index of the row to be selected
         * @param _select whether to select or deselect the row
         */
        selectRow: function(idx, _select) {
            for(var i = 0; i < this.spreadsheetWidth; i++) {
                this.selectCell(i, idx, _select);
            }
        },

        /**
         * Selects an interval of rows
         * @selectionEndRow the last row of the selection. The first one is maintained at mouse events
         */
        selectRows: function(selectionEndRow) {
            this.deselectAll();
            this.lastSelectedRows = [];
            var minRow = selectionEndRow < this.selectionStartRow ? selectionEndRow : this.selectionStartRow;
            var maxRow = selectionEndRow > this.selectionStartRow ? selectionEndRow : this.selectionStartRow;
            for(var i = minRow; i <= maxRow; i++) {
                this.addRowToSelection(i);
                this.selectRow(i, true);
            }

            // select first cell of first row
            this.focusAt(1, this.selectionStartRow);
        },

        /**
         * Adds a row to the list of rows to be selected
         * @param idx the index of the row to be selected
         */
        addRowToSelection: function(idx) {
            this.lastSelectedRows[this.lastSelectedRows.length] = idx;
        },

        /**
         * Returns the selection mode. Possible values are: SELECTION_MODES.RECTANGLE and SELECTION_MODES.RANDOM
         * Random mode will be used when selecting random cells using SHIFT & CTRL. Not supported yet.
         * @return the selection mode
         */
        getSelectionMode: function() {
            return this.selectionMode;
        },

        /**
         * Returns a list of selected cells - to be used when selection mode is SELECTION_MODES.RANDOM
         * @return a list of selected cells
         */
        getSelection: function() {
            var selectedCells = new Array();

            if(this.getSelectionMode() == this.SELECTION_MODES.RECTANGLE) {
                if(this.lastSelectedRegion != null) {
                    for(var i = this.lastSelectedRegion[0]; i <= this.lastSelectedRegion[1]; i++) {
                        for(var j = this.lastSelectedRegion[2]; j <= this.lastSelectedRegion[3]; j++) {
                            selectedCells[selectedCells.length] = [i, j];
                        }
                    }
                } else {
                    selectedCells[selectedCells.length] = [this.currentFocusedCol, this.currentFocusedRow];
                }
            }

            return selectedCells;
        },

        /**
         * Returns the selection rectangle - to be used when selection mode is SELECTION_MODES.RECTANGLE
         * @return an array with 4 coordinates: [colStart, colEnd, rowStart, rowEnd]
         */
        getSelectionRectangle: function() {
            if(this.lastSelectedRegion && this.lastSelectedRegion != null) {
                return this.lastSelectedRegion;
            } else {
                return [this.currentFocusedCol, this.currentFocusedCol, this.currentFocusedRow, this.currentFocusedRow];
            }
        },

        /**
         * Deselects everything
         */
        deselectAll: function() {
            this.unfocus(this.currentFocusedCol, this.currentFocusedRow);
            this.resetSelectedColumns();
            this.resetSelectedRows();
            if(this.lastSelectedRegion && this.lastSelectedRegion != null) {
                this.selectRegion(this.lastSelectedRegion[0],
                                  this.lastSelectedRegion[1],
                                  this.lastSelectedRegion[2],
                                  this.lastSelectedRegion[3],
                                  false);
            }
        },

        /**
         * Deselects selected columns if any
         */
        resetSelectedColumns: function() {
            for(var i = 0; i < this.lastSelectedColumns.length; i++) {
                this.selectColumn(this.lastSelectedColumns[i], false);
            }
            this.lastSelectedColumns = [];
        },

        /**
         * Deselects selected rows if any
         */
        resetSelectedRows: function() {
            for(var i = 0; i < this.lastSelectedRows.length; i++) {
                this.selectRow(this.lastSelectedRows[i], false);
            }
            this.lastSelectedRows = [];
        },

        /**
         * Resizes a column
         * @param e the DOM event
         * @param storePosition whether to store position or not (used when the mouse is still moving)
         */
        resizeCol: function(e, storePosition) {
            var pos = dojo.html.getCursorPosition(e);
            var newX = pos.x;

            var currentCol = this.resizeOrigTH.dCellIndex + 1;

            //if(currentResizedCol) {
            var delta = newX - this.resizeOrigXPos;
            var newWidth = this.resizeOrigTH.dWidth + delta;

            if(newWidth < this.MINIMUM_CELL_WIDTH) {
                newWidth = this.MINIMUM_CELL_WIDTH;
            }

            this.resizeOrigTH.style.width = this.toPx(newWidth);
            this.resizeOrigTH.firstChild.style.width = this.toPx(newWidth - 3);
            this.resizeOrigTH.firstChild.firstChild.style.width = this.toPx(newWidth - 5);

            for(var i = 0; i < this.rows.length; i++) {
                this.rows[i].cells[currentCol].firstChild.style.width = this.toPx(newWidth);
            }

            if(storePosition) {
                this.resizeOrigTH.dWidth = newWidth;
                for(var i = 0; i < this.rows.length; i++) {
                    this.rows[i].cells[currentCol].firstChild.dWidth = newWidth;
                }
                this._focus(this.currentFocusedCol, this.currentFocusedRow);
            }
            //}
        },

        /**
         * Resizes a row
         * @param e the DOM event
         * @param storePosition whether to store position or not (used when the mouse is still moving)
         */
        resizeRow: function(e, storePosition) {
            var pos = dojo.html.getCursorPosition(e);
            var newY = pos.y;

            var currentRow = this.getCellRow(this.resizeOrigTD);

            var delta = newY - this.resizeOrigYPos;
            var newHeight = this.rows[currentRow].dHeight + delta + 2;
            if(newHeight < this.MINIMUM_CELL_HEIGHT) {
                newHeight = this.MINIMUM_CELL_HEIGHT;
            }

            // resize 1st cell (number + vertical resizer)
            this.rows[currentRow].cells[0].style.height = this.toPx(newHeight);
            this.rows[currentRow].cells[0].firstChild.firstChild.style.height = this.toPx(newHeight - (dojo.render.html.ie ? 2 : 0));

            for(var i = 1; i < this.rows[0].cells.length; i++) {
                this.rows[currentRow].cells[i].firstChild.style.height = this.toPx(newHeight);
            }

            if(storePosition) {
                this.rows[currentRow].dHeight = newHeight;
                for(var i = 1; i < this.rows[0].cells.length; i++) {
                    this.rows[currentRow].cells[i].firstChild.dHeight = newHeight;
                }
                this._focus(this.currentFocusedCol, this.currentFocusedRow);
            }
        },

        /**
         * Displays the input element at a given location
         * @param _tdElem the <TD> element over which the input element has to be displayed
         */
        showInputOverTD: function(_tdElem) {
            this.isEditing = true;
            var pos = dojo.html.getAbsolutePosition(_tdElem, true);

            with(this.inputElem) {
                tdElem = _tdElem;
                style.width = dojo.html.getInnerWidth(_tdElem) + 8;
                style.height = dojo.html.getInnerHeight(_tdElem) + 8;
                style.left = pos.x - 4;
                style.top = pos.y - 4;
                style.zIndex = 100;
                style.display = "";
                if(tdElem != null) {
                    if(typeof(tdElem.formula) == "undefined") {
                        value = "";
                    } else {
                        value = _tdElem.formula;
                    }
                    /*if(tdElem.cellType == this.CELL_TYPES.FORMULA) {
                        value = tdElem.formula;
                    } else {
                        value = tdElem.firstChild.innerHTML;
                    }*/
                } else {
                    value = "";
                }

                oldValue = value;
                if(typeof(oldValue) == "undefined" || oldValue == "undefined") {
                    oldValue = "";
                }

                focus();
            }

            dojo.html.selectInputText(this.inputElem);
        },

        /**
         * Hides the input element and saves the value
         * @param isCancel whether to cancel or not the modifications to the cell
         */
        hideInput: function(isCancel) {
            this.isEditing = false;

            with(this.inputElem) {
                // prevent this from executing twice - change the value and hide the input only if input is visible
                if(style.display == "") {
                    if(tdElem != null) {
                        if(isCancel) {
                            //tdElem.firstChild.innerHTML = oldValue;
                            tdElem.formula = oldValue;
                        } else {
                            //tdElem.firstChild.innerHTML = value;
                            tdElem.formula = value;
                        }
                        this.evalFormula(tdElem, true);
                    }
                    value = "";
                    style.display = "none";
                }
            }
        },

        /**
         * Deletes the content of the current focused cell
         */
        eraseCurrentCellContent: function() {
            var tdElem = this.getCell(this.currentFocusedCol, this.currentFocusedRow);
            tdElem.firstChild.innerHTML = "";
        },

        /**
         * Inserts a new column before the column of the current focused cell
         */
        insertColumnBefore: function() {
            try{
                var columnToInsertBefore = this.currentFocusedCol + 1;
                var thead = this.domNode.getElementsByTagName("THEAD")[0];
                var ths = thead.getElementsByTagName("TH");
                var newTH = ths[columnToInsertBefore].cloneNode(true);

                dojo.html.insertBefore(newTH, ths[columnToInsertBefore]);

                for(var i = 0; i < this.rows.length; i++) {
                    var newTD = this.rows[i].cells[columnToInsertBefore].cloneNode(true);
                    dojo.html.insertBefore(newTD, this.rows[i].cells[columnToInsertBefore]);
                }
                this.resetSpreadsheet();

                // reset cell's formatting and content
                if(columnToInsertBefore >= 1) {
                    for(var i = 0; i < this.rows.length; i++) {
                        this.rows[i].cells[columnToInsertBefore].firstChild.innerHTML = "";
                        this.unfocus(columnToInsertBefore, i);
                        this.selectCell(columnToInsertBefore, i, false);
                    }
                }
            }catch(e){
                alert(e + " $$ " + e.name + " $$ " + e.message);
            }
        },

        /**
         * Inserts a new column after the column of the current focused cell
         */
        insertColumnAfter: function() {
            try{
                var thead = this.domNode.getElementsByTagName("THEAD")[0];
                var ths = thead.getElementsByTagName("TH");
                var newTH = ths[this.currentFocusedCol].cloneNode(true);

                dojo.html.insertAfter(newTH, ths[this.currentFocusedCol]);

                for(var i = 0; i < this.rows.length; i++) {
                    var newTD = this.rows[i].cells[this.currentFocusedCol].cloneNode(true);
                    dojo.html.insertAfter(newTD, this.rows[i].cells[this.currentFocusedCol]);
                }
                this.rows = this.loadRows();
                this.resetSpreadsheet();

                // reset cell's formatting and content
                if(this.currentFocusedCol >= 1) {
                    for(var i = 0; i < this.rows.length; i++) {
                        this.rows[i].cells[this.currentFocusedCol + 1].firstChild.innerHTML = "";
                        this.unfocus(this.currentFocusedCol + 1, i);
                        this.selectCell(this.currentFocusedCol + 1, i, false);
                    }
                }
            }catch(e){
                alert(e + " $$ " + e.name + " $$ " + e.message);
            }
        },

        /**
         * Inserts a new row before the row of the current focused cell
         */
        insertRowBefore: function() {
            try{
                var newTR = this.rows[this.currentFocusedRow].cloneNode(true);
                dojo.html.insertBefore(newTR, this.rows[this.currentFocusedRow]);

                this.rows = this.loadRows();
                this.resetSpreadsheet();

                // reset cell's formatting and content
                for(var i = 1; i < newTR.cells.length; i++) {
                    newTR.cells[i].firstChild.innerHTML = "";
                    this.unfocus(i, this.currentFocusedRow);
                    this.selectCell(i, this.currentFocusedRow, false);
                }
            }catch(e){
                alert(e + " $$ " + e.name + " $$ " + e.message);
            }
        },

        /**
         * Inserts a new row after the row of the current focused cell
         */
        insertRowAfter: function() {
            try{
                var newTR = this.rows[this.currentFocusedRow].cloneNode(true);
                dojo.html.insertAfter(newTR, this.rows[this.currentFocusedRow]);

                this.rows = this.loadRows();
                this.resetSpreadsheet();

                // reset cell's formatting and content
                for(var i = 1; i < newTR.cells.length; i++) {
                    newTR.cells[i].firstChild.innerHTML = "";
                    this.unfocus(i, this.currentFocusedRow + 1);
                    this.selectCell(i, this.currentFocusedRow + 1, false);
                }
            }catch(e){
                alert(e + " $$ " + e.name + " $$ " + e.message);
            }
        },

        /**
         * Remove selected rows
         */
        removeRows: function() {
            var rowsToRemove = [];
            if(this.lastSelectedRows.length > 0) {
                for(var i = 0; i < this.lastSelectedRows.length; i++) {
                    rowsToRemove[rowsToRemove.length] = this.lastSelectedRows[i];
                }
            } else {
                rowsToRemove[rowsToRemove.length] = this.currentFocusedRow;
            }

            var rowStr = "";
            for(var i = 0; i < rowsToRemove.length; i++) {
                rowStr += "\t" + this.rows[rowsToRemove[i]].cells[0].firstChild.firstChild.innerHTML + "\n";
            }

            if(confirm("Are you sure you want to remove " + (rowsToRemove.length == 1 ? "this row?\n" : "these rows?\n") + rowStr)) {
                try{
                    for(var i = 0; i < rowsToRemove.length; i++) {
                        dojo.dom.removeNode(this.rows[rowsToRemove[i]]);
                    }
                    this.resetSpreadsheet();

                    // focus on the closest upper cell
                    this.focusAt(this.currentFocusedCol, this.currentFocusedRow);
                }catch(e){
                    alert(e + " $$ " + e.name + " $$ " + e.message);
                }
            }
        },

        /**
         * Remove selected cols
         */
        removeCols: function() {
            var columnsToRemove = [];

            if(this.lastSelectedColumns.length > 0) {
                for(var i = 0; i < this.lastSelectedColumns.length; i++) {
                    columnsToRemove[columnsToRemove.length] = this.lastSelectedColumns[i];
                }
            } else {
                columnsToRemove[columnsToRemove.length] = this.currentFocusedCol;
            }

            var ths = this.domNode.getElementsByTagName("TH");
            var colStr = "";
            for(var i = 0; i < columnsToRemove.length; i++) {
                colStr += "\t" + ths[columnsToRemove[i]].firstChild.firstChild.innerHTML + "\n";
            }

            if(confirm("Are you sure you want to remove " + (columnsToRemove.length == 1 ? "this column?\n" : "these columns?\n") + colStr)) {
                try{
                    for(var i = 0; i < columnsToRemove.length; i++) {
                        dojo.dom.removeNode(ths[columnsToRemove[i]]);

                        for(var j = 0; j < this.rows.length; j++) {
                            dojo.dom.removeNode(this.rows[j].cells[columnsToRemove[i]]);
                        }
                    }
                    this.resetSpreadsheet();

                    // focus on the closest upper cell
                    this.focusAt(this.currentFocusedCol, this.currentFocusedRow);
                }catch(e){
                    alert(e + " $$ " + e.name + " $$ " + e.message);
                }
            }
        },

        /**
         * Applies one of the available formatting types to the cell (FORMATTING_TYPES.FONT, FORMATTING_TYPES.FONT_SIZE, etc)
         * @param styleType     the style to change
         * @param styleValue     the value for the style
         */
        formatSelectedCells: function(styleType, styleValue) {
            var sel = this.getSelection();

            // sel[i][0] gives the column, sel[i][1] gives the row
            for(var i = 0; i < sel.length; i++) {
                var tdElem = this.getCell(sel[i][0], sel[i][1]);
                this.addStyleToCell(styleType, styleValue, tdElem);

                this.applyStylesToCell(tdElem);
            }
        },

        /**
         * Adds a style to the list of styles
         * @param styleType     the style to change
         * @param styleValue     the value for the style
         * @param tdElem         the <TD> element to be formatted
         */
        addStyleToCell: function(styleType, styleValue, tdElem) {
            if(typeof(tdElem.styleList) == "undefined") {
                tdElem.styleList = new Array();
            }
            //tdElem.styleList.add({style:styleType, value:styleValue});
            tdElem.styleList[styleType] = styleValue;
        },

        removeStyleForCell: function(style, tdElem) {
        },

        /**
         * Applies the styles for a cell
         * @param tdElem the <TD> element for which styles are applied
         */
        applyStylesToCell: function(tdElem) {
            var styles = tdElem.styleList;

            if(typeof(styles) != "undefined") {
                // font
                var font = styles[this.FORMATTING_TYPES.FONT];
                if(typeof(font) != "undefined") {
                    tdElem.firstChild.style.fontFamily = font;
                }

                // font size
                var font_size = styles[this.FORMATTING_TYPES.FONT_SIZE];
                if(typeof(font_size) != "undefined") {
                    tdElem.firstChild.style.fontSize = font_size;
                }

                // COLOR
                var color = styles[this.FORMATTING_TYPES.COLOR];
                if(typeof(color) != "undefined") {
                    tdElem.firstChild.style.color = color;
                }

                // BG_COLOR
                var bgColor = styles[this.FORMATTING_TYPES.BG_COLOR];
                if(typeof(bgColor) != "undefined") {
                    tdElem.firstChild.style.backgroundColor = bgColor;
                    var bgColor = dojo.html.getBackgroundColor(tdElem.firstChild);
                    tdElem.firstChild.dBackgroundColor = dojo.graphics.color.rgb2hex(bgColor[0], bgColor[1], bgColor[2]);
                }

                // BOLD
                var bold = styles[this.FORMATTING_TYPES.BOLD];
                if(typeof(bold) != "undefined") {
                    if(bold) {
                        tdElem.firstChild.style.fontWeight = "bold";
                    } else {
                        tdElem.firstChild.style.fontWeight = "";
                    }
                }

                // ITALIC
                var italic = styles[this.FORMATTING_TYPES.ITALIC];
                if(typeof(italic) != "undefined") {
                    if(italic) {
                        tdElem.firstChild.style.fontStyle = "italic";
                    } else {
                        tdElem.firstChild.style.fontStyle = "";
                    }
                }

                // UNDERLINE
                var underline = styles[this.FORMATTING_TYPES.UNDERLINE];
                if(typeof(underline) != "undefined") {
                    if(underline) {
                        tdElem.firstChild.style.textDecoration = "underline";
                    } else {
                        tdElem.firstChild.style.textDecoration = "";
                    }
                }
            }
        },

        /**
         * Applies a formula
         * @param formula the name of the formula
         */
        applyFormula: function(functionName) {
            // minX and maxY are used to determine where the result will be written (in the bottom-left corner of the
            // most comprehensive rectangle)
            var minCol = 1000000;
            var maxRow = -1;

            var sel = this.getSelection();

            // sel[i][0] gives the column, sel[i][1] gives the row
            for(var i = 0; i < sel.length; i++) {
                var tdElem = this.getCell(sel[i][1], sel[i][0]);
                minCol = minCol > sel[i][0] ? sel[i][0] : minCol;
                maxRow = maxRow < sel[i][1] ? sel[i][1] : maxRow;
            }

            // get the left-bottom most cell
            var resultCell = this.getCell(minCol, maxRow + 1);
            if(resultCell) {
                if(this.getSelectionMode() == this.SELECTION_MODES.RECTANGLE) {
                    var cellColStart = this.fromArrToCellNotation(this.lastSelectedRegion[0], this.lastSelectedRegion[2]);
                    var cellColStop = this.fromArrToCellNotation(this.lastSelectedRegion[1], this.lastSelectedRegion[3]);
                    resultCell.formula = "=" + functionName + "(" + cellColStart + ":" + cellColStop + ")";
                    this.evalFormula(resultCell, true);
                } else {
                    // only rectangle selection mode is supported for now, so will NEVER get here
                    resultCell.formula = "=" + functionName + "(";
                    for(var i = 0; i < sel.length; i++) {
                        var tdElem = this.getCell(sel[i][1], sel[i][0]);
                        var cellCol = String.fromCharCode("A".charCodeAt(0) + sel[i][0] - 1);
                        resultCell.formula = "" + cellCol + (sel[i][1] + 1) + (i == sel.length - 1 ? "" : ",");
                    }
                    resultCell.formula = ")";
                    this.evalFormula(resultCell, true);
                }
            }
        },

        /**
         * Checks the entire graph for circularities
         * @throws an exception if circularities are detected
         */
        checkCircularities: function() {
            var stack = new Array();

            try {
                for(var i = 0; i < this.ssGraph.length; i++) {
                    stack.push(i);
                    this.checkCircularitiesPerNode(stack, i);
                    stack.pop();
                }
            } catch(e) {
                throw(e);
            }
        },

        /**
         * Checks the graph for circularities given a start vertex
         * @throws an exception if circularities are detected
         */
        checkCircularitiesFromNode: function(node) {
            var stack = new Array();

            try {
                stack.push(node);
                this.checkCircularitiesPerNode(stack, node);
                stack.pop();
            } catch(e) {
                throw(e + " when evaluating cell " + this.fromGraphNodeToCellNotation(node));
            }
        },

        /**
         * Recursive function that checks for a given node if there is a circularity in the graph
         * @stack the stack of visited nodes
         * @param node the index of the node in the matrix (0,1,2...mxn) where m = num cols and n = num rows
         * @throws exception if circular dependencies are detected
         */
        checkCircularitiesPerNode: function(stack, node) {
            for(var i = 0; i < this.ssGraph.length; i++) {
                // there's no need to avoid nodeX-nodeX relationships since they're all going to be 0
                if(this.ssGraph[node][i] == 1) {
                    // check whether the stack already contains node i
                    for(var k = 0; k < stack.length; k++) {
                        if(stack[k] == i) {
                            throw "Circular Dependency Detected";// for cell: " + fromGraphNodeToCellNotation(i);
                        }
                    }
                    stack.push(i);
                    this.checkCircularitiesPerNode(stack, i);
                    stack.pop();
                }
            }
        },

        /**
         * Re-evaluate dependent cells. This method also checks for circular dependencies.
         * @throws an exception if circularities are detected
         */
        reevalDependentCells: function(node) {
            var stack = new Array();

            try {
                stack.push(node);

                this.reevalDependentCellsPerNode(stack, node);

                stack.pop();
            } catch(e) {
                throw(e + " when evaluating dependencies cell " + this.fromGraphNodeToCellNotation(node));
            }
        },

        /**
         * Recursive function for detecting cells dependent on current cell and reevaluating them
         * @stack the stack of visited nodes
         * @param node the index of the node in the matrix (0,1,2...mxn) where m = num cols and n = num rows
         * @throws exception if circular dependencies are detected
         */
        reevalDependentCellsPerNode: function(stack, node) {
            for(var i = 0; i < this.ssGraph.length; i++) {
                if(this.ssGraph[i][node] == 1) {
                    for(var k = 0; k < stack.length; k++) {
                        if(stack[k] == i) {
                            throw "Circular Dependency Detected";// for cell: " + fromGraphNodeToCellNotation(i);
                        }
                    }

                    // re-evaluate cell's value
                    var cell = this.getCellByCellNotation(this.fromGraphNodeToCellNotation(i));

                    this.evalFormula(cell, true, true);

                    stack.push(i);
                    this.reevalDependentCellsPerNode(stack, i);
                    stack.pop();
                }
            }
        },

        /**
         * Returns an array containing (col,row) as they are retrieved from the cell notation (A2, B33, etc).
         * The indexes are relative to the cells spreadsheet (col 0 - is actually the second column - 1st one is the header)
         * @param cellNotation a string representing the cell notation
         * @return an object with two properties: col and row
         */
        fromCellNotationToArr: function(cellNotation) {
            var letter = "" + cellNotation.match(/[a-zA-Z]*/);
            var number = "" + cellNotation.match(/[0-9]+/);

            // build the indices for the cell
            var col = this.fromCharToIdx(letter);
            var row = parseInt(number) - 1;

            return {"col": col, "row" : row};
        },

        /**
         * Creates a cell notation, given a cell and a row. The cell and row must start from 0 (this means, you can't pass
         * rowIndex and cellIndex properties of <TR> and <TD> elements. You need to handle conversion from these properties
         * to proper indexes (usually this is transparently handled by getCellRow and getCellCol). A (0,0) will be A1 in cell
         * notation
         * @param col the column index (for 0 a value of 'A' will be returned)
         * @param row the row index (for 0 a value of 1 will be returned)
         * @return a string representing the cell notation A1, C5, etc
         */
        fromArrToCellNotation: function(col, row) {
            return this.fromIdxToChar(col) + (row + 1);
        },

        /**
         * Utility function for transforming a char code to it's correspondent in number (a-0, b-1,...)
         * @param ch the char
         * @return a number
         */
        fromCharToIdx: function(ch) {
            return ch.toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
        },

        /**
         * Utility function for transforming and index to its corresponding char (0-a, 1-b, ...)
         * @idx the index
         * @return an uppercase string with one letter
         */
        fromIdxToChar: function(idx) {
            return String.fromCharCode("a".charCodeAt(0) + idx).toUpperCase();
        },

        /**
         * Returns the cell notation for a node in the graph of dependencies
         * @param nodeIdx a number representing the node in the graph
         * @return a string representing the cell notation A1, C5, etc
         */
        fromGraphNodeToCellNotation: function(nodeIdx) {
            var row = parseInt(nodeIdx / this.spreadsheetWidth);
            var col = nodeIdx % this.spreadsheetWidth;
            return this.fromArrToCellNotation(col, row);
        },

        /**
         * Returns the node in the graph of dependencies for a column/row
         * @param col the column
         * @param row the row
         * @return a number representing the node in the graph of dependencies
         */
        fromCellToGraphNode: function (col, row) {
            return col + row * this.spreadsheetWidth;
        },

        /**
         * Retrieves the <TD> element based on the cell notation (A1, C5, etc)
         * @param cellStr a string representing the cell notation
         * @return the <TD> object
         */
        getCellByCellNotation: function(cellStr) {
            var cellCoords = this.fromCellNotationToArr(cellStr);

            return this.getCell(cellCoords.col, cellCoords.row);
        },

        /**
         * Returns the row for a cell in the spreadsheet given a <TD> element. Note IE keeps track of TH elements also.
         * (ignoring cell headers)
         * @param tdElem the <TD> element
         * @return the row index
         */
        getCellRow: function(tdElem) {
            return dojo.render.html.ie ? tdElem.parentNode.rowIndex - 1 : tdElem.parentNode.rowIndex;
        },

        /**
         * Returns the column (within the spreadsheet) for a cell in the spreadsheet for a <TD> element (ignoring cell headers)
         * @param tdElem the <TD> element
         * @return the column index
         */
        getCellCol: function (tdElem) {
            return tdElem.cellIndex - 1;
        },

        /**
         * Returns the <TD> element for a given cell in the spreadsheet. For example, getCell(0,0) should return the first cell
         * on the first row (ignoring first column and the thead).
         * @param col a number representing the col of the cell in the spreadsheet. Starts from 0 (0 being the equivalent of column A).
         * @param row a number representing the row of the cell in the spreadsheet. Starts from 0 (0 being the equivalent of row 1).
         * @return a <TD> object
         */
        getCell: function (col, row) {
            if(dojo.render.html.ie) {
                return this.rows[row].cells[col + 1];
            } else {
                return this.rows[row].cells[col + 1];
            }
        },

        /**
         * Utility function for debugging the graph for manually checking the dependencies
         * @return a string with the entire graph
         */
        debugGraph: function() {
            var str = "          ";

            for(var i = 0; i < this.ssGraph[0].length; i++) {
                str += this.fromGraphNodeToCellNotation(i) + " ";
            }
            str += "\n";
            for(var r = 0; r < this.ssGraph.length; r++) {
                str += this.fromGraphNodeToCellNotation(r) + ": [";
                for(var c = 0; c < this.ssGraph[r].length; c++) {
                    str += "  " + this.ssGraph[r][c] + ",";
                }
                str += "]\n"
            }

            return str;
        },

        /**
         * Returns the number of quotation marks ignoring the escaped one
         * @param str   the string too look for quotation inside
         * @param start an integer representing the position to start looking for
         * @param stop  an integer representing the position to stop looking for
         */
        getNumberOfQuotes: function(str, start, stop) {
            var numQuotes = 0;
            for(var i = start; i < stop; i++) {
                if(str.charAt(i) == '"') {
                    if(numQuotes % 2 == 1 && i > 0 && str.charAt(i - 1) == "\\") {
                        if(i > 1 && str.charAt(i - 2) == "\\") {
                            numQuotes ++;
                        }
                    } else {
                        numQuotes ++;
                    }
                }
            }
            return numQuotes;
        },

        /**
         * Evaluates a formula for a cell, and puts the result back in the cell
         * @cell             the spreadsheet cell which has amongst other properties a formula property which is a
         *                  String containing the formula. Examples of strings are:
         *                    sum(e4:b6), sum(e2,b4,c5)+cos(3.14)*avg(1,2,3), etc
         * @evaluate         if true, the cell's value will be evaluated again. If false, if the cell's type has
         *                    been detected and its formula has been analyzed, return directly the value
         * @noDependencies     if true, dependencies are not re-evaluated
         * @return the result of the formula
         */
        evalFormula: function(_cell, evaluate, noDependencies) {
            var cellNotation = this.fromArrToCellNotation(this.getCellCol(_cell), this.getCellRow(_cell));
            var formula = _cell.formula;
            var errors = false;

            if(formula == "" || typeof(formula) == "undefined") {
                return "";
            }

            // a cell's value it's a formula only if it starts with "="
            if(!evaluate && _cell.cellType != this.CELL_TYPES.FORMULA) {
                return _cell.formula;
            }

            var result;
            var originalGraphNode = this.fromCellToGraphNode(this.getCellCol(_cell), this.getCellRow(_cell));
            if(trim("" + formula).charAt(0) != "=") {
                // try to detect a type for the cell (date, string, number)
                var tmp = formula.toLowerCase();

                // check if it's a date
                var _val;
                if((_val = this.parseDateFormat1(tmp)) != null) {
                    _cell.cellType = this.CELL_TYPES.DATE;
                } else if((_val = this.parseDateFormat2(tmp)) != null) {
                    _cell.cellType = this.CELL_TYPES.DATE;
                } else if((_val = this.parseNumberFormat1(tmp)) != null) {
                    // check if it's a number
                    _cell.cellType = this.CELL_TYPES.NUMBER;
                } else {
                    // if none of the above, consider it a string
                    _val = formula;
                    _cell.cellType = this.CELL_TYPES.STRING;
                }

                _cell.formula = _val;
                result = _val;
            } else {
                _cell.cellType = this.CELL_TYPES.FORMULA;

                this.debug("STEP 1: transform intervals of cells for " + cellNotation + ": " + _cell.formula);
                /********************************************************************
                STEP 1: transform intervals of cells to array of cells (B2:C3 => B2,B3,C2,C3
                *********************************************************************/
                var pcs = formula.match(this.reInterval);

                var inlinedFormula = formula;

                if(pcs != null) {
                    // for each interval

                    // TODO check the cells is not part of a string
                    for(var i = 0; i < pcs.length; i++) {
                        var cells = pcs[i].split(":");

                        var cell0 = this.fromCellNotationToArr(cells[0]);
                        var cell1 = this.fromCellNotationToArr(cells[1]);

                        // build a string with all the intermediary values
                        var inlinedInterval = "";
                        for(var colIdx = cell0.col; colIdx <= cell1.col; colIdx++) {
                            for(var rowIdx = cell0.row; rowIdx <= cell1.row; rowIdx++) {
                                inlinedInterval += this.fromIdxToChar(colIdx) + (rowIdx + 1) + ",";
                            }
                        }

                        // remove the last comma
                        inlinedInterval = inlinedInterval.substring(0, inlinedInterval.length - 1);

                        // replaced interval with inline formula
                        // for each occ of cells, replace it with inlinedInterval
                        var cellsPos = 0;
                        while((cellsPos = inlinedFormula.indexOf(pcs[i], cellsPos)) != -1) {
                            // check the number of " chars before pcs[i]
                            var numQuotes = this.getNumberOfQuotes(inlinedFormula, 0, cellsPos);

                            if(numQuotes % 2 == 0) {
                                inlinedFormula =
                                    inlinedFormula.substring(0, cellsPos) +
                                    inlinedInterval +
                                    inlinedFormula.substring(cellsPos + pcs[i].length);
                            }
                            cellsPos += pcs[i].length;
                        }
                    }
                }

                this.debug("STEP 2: search for cell notations and mark the graph for " + cellNotation + ": " + inlinedFormula);
                /********************************************************************
                STEP 2: search for cell notations that are not inside strings and mark the graph
                *********************************************************************/
                // reset the graph dependencies for this cell
                for(var grIdx = 0; grIdx < this.spreadsheetWidth * this.spreadsheetHeight; grIdx++) {
                    this.ssGraph[originalGraphNode][grIdx] = 0;
                }

                var cellsMatches = inlinedFormula.match(this.reCell);

                if(cellsMatches != null) {
                    // for each cell
                    for(var i = 0; i < cellsMatches.length; i++) {
                        var cell = cellsMatches[i].substring(1);

                        // mark edges in graph only for cells that are not inside strings
                        var cellPos = 0;
                        while((cellPos = inlinedFormula.indexOf(cell, cellPos)) != -1) {
                            // check the number of " chars before pcs[i]
                            var numQuotes = this.getNumberOfQuotes(inlinedFormula, 0, cellPos);

                            if(numQuotes % 2 == 0) {
                                // mark the edges in the graph
                                var cellCoords = this.fromCellNotationToArr(cell);
                                var graphNode = this.fromCellToGraphNode(cellCoords.col, cellCoords.row);

                                //alert("dependency : " + cellNotation + "  " + this.fromArrToCellNotation(cellCoords.col, cellCoords.row));
                                this.ssGraph[originalGraphNode][graphNode] = 1;
                            }

                            cellPos += cell.length;
                        }
                    }
                }

                try {
                    this.debug("STEP 3: check circularities for " + cellNotation + ", formula: " + inlinedFormula);
                    /********************************************************************
                     STEP 3: check circularities
                    *********************************************************************/
                    this.checkCircularitiesFromNode(originalGraphNode);

                    this.debug("STEP 4: evaluate each cell's value for " + cellNotation);
                    /********************************************************************
                     STEP 4: if no circularities, replace each cell name with its value
                    *********************************************************************/
                    var cells = inlinedFormula.match(this.reCell);

                    if(cells != null) {
                        // for each cell

                        // TODO check the cells is not part of a string
                        for(var i = 0; i < cells.length; i++) {
                            var cell = cells[i].substring(1);

                            // replaced cell with it.lengts value
                            var cellPos = 0;
                            while((cellPos = inlinedFormula.indexOf(cell, cellPos)) != -1) {
                                // check the number of " chars before pcs[i]
                                var numQuotes = this.getNumberOfQuotes(inlinedFormula, 0, cellPos);

                                if(numQuotes % 2 == 0) {
                                    var cellValue;
                                    var cellObj = this.getCellByCellNotation(cell);
                                    try {
                                        cellValue = this.evalFormula(cellObj, false, true);
                                    } catch(e) {
                                        throw e;
                                    }

                                    // for strings, the value to replace has to contain the quotes
                                    var toReplace = "";
                                    if(cellObj.cellType == this.CELL_TYPES.NUMBER) {
                                        toReplace = cellValue;
                                    }
                                    if(cellObj.cellType == this.CELL_TYPES.STRING) {
                                        toReplace = "\"" + cellValue + "\"";
                                    }
                                    if(cellObj.cellType == this.CELL_TYPES.FORMULA) {
                                        toReplace = cellValue;
                                    }

                                    // if cell has no value, remove previous , if exists or if previous char is ( remove next ,
                                    // make sure the cell that have no value don't affect the formula by leaving random commas
                                    if(toReplace == "") {
                                        var tmp = trim(inlinedFormula.substring(0, cellPos));
                                        var tmp2 = trim(inlinedFormula.substring(cellPos + cell.length));

                                        // two cases: comma is before and after
                                        if(cellPos > 0 && tmp.charAt(tmp.length - 1) == ',') {
                                            inlinedFormula =
                                                inlinedFormula.substring(0, cellPos - 1) +
                                                toReplace +
                                                inlinedFormula.substring(cellPos + cell.length);
                                        } else {
                                            if(cellPos > 0 && tmp.charAt(tmp.length - 1) == '(' &&
                                               cellPos < inlinedFormula.length - 1 && tmp2.charAt(0) == ',') {
                                                inlinedFormula =
                                                    tmp +
                                                    toReplace +
                                                    tmp2.substring(1);
                                            }
                                        }
                                    } else {
                                        inlinedFormula =
                                            inlinedFormula.substring(0, cellPos) +
                                            toReplace +
                                            inlinedFormula.substring(cellPos + cell.length);
                                    }
                                }
                                cellPos += cell.length;
                            }
                        }
                    }

                    this.debug("STEP 5: turn functions to lower case for " + cellNotation + ", formula: " + inlinedFormula);
                    /********************************************************************
                    STEP 5: turn function to lower case
                    *********************************************************************/
                    var functions = inlinedFormula.match(this.reFunction);

                    if(functions != null) {
                        // for each fn
                        for(var i = 0; i < functions.length; i++) {
                            var fnToLower = functions[i].toLowerCase();

                            // only if it's not lower already
                            if(fnToLower != functions[i]) {
                                var fnPos = 0;
                                while((fnPos = inlinedFormula.indexOf(functions[i], fnPos)) != -1) {
                                    // check the number of " chars before pcs[i]
                                    var numQuotes = this.getNumberOfQuotes(inlinedFormula, 0, fnPos);

                                    if(numQuotes % 2 == 0) {
                                        inlinedFormula =
                                            inlinedFormula.substring(0, fnPos) +
                                            fnToLower +
                                            inlinedFormula.substring(fnPos + functions[i].length);
                                    }
                                    fnPos += functions[i].length;
                                }
                            }
                        }
                    }

                    // and now evaluate the formula
                    result = eval(inlinedFormula.substring(1));

                    this.debug("result formula for " + cellNotation + ", formula: " + inlinedFormula);
                } catch(e) {
                    this.debug(e);
                    //throw(e);
                    result = e;
                    errors = true;
                }
            }

            if(!errors) {
                if(!noDependencies) {
                    this.debug("STEP 6: re-evaluate cells dependent on this very cell: " + cellNotation + ", formula: " + inlinedFormula);
                    /********************************************************************
                    STEP 6: reevaluate dependent cells
                    *********************************************************************/
                    this.reevalDependentCells(originalGraphNode);
                } else {
                    this.debug("STEP 6: dependencies will NOT be re-evaluated for cell: " + cellNotation);
                }
            }

            _cell.firstChild.innerHTML = result;

            this.debug("Final result for " + cellNotation + ": " + result);
            return result; // return this.formatCellForPresentation(cell);;
        },

        /**
         * Fires an event
         * @param evt the event to be fired
         */
        _fireEvent: function(evt) {
            if(typeof this[evt] == "function") {
                var args = [this];
                for(var i = 1; i < arguments.length; i++) {
                    args.push(arguments[i]);
                }

                this[evt].apply(this, args);
            }
        },

        /**
         * Formats the cell for presentation. The formatting should be based on cell's type (number, date, string) and cell's
         * format. Possible formats for date are "MM/DD/YYYY", "DD-MMM-YYYY", etc.
         * Currently cell's formats are not supported yet.
         * @param cell the <TD> element to be formatted for presentation
         * @return the formatted value
         */
        formatCellForPresentation: function(cell) {
            var formula = cell.formula;

            if(formula && typeof(formula) != "undefined" && formula != null) {
                // now, the cell format should be checked...
                if(formula instanceof Date) {
                    with (formula) {
                        return getDate() + "-" + this.months[getMonth()].toUpperCase() + "-" + getFullYear();
                    }
                }

                // now, the cell format should be checked...
                if(typeof(formula) == "number") {
                    return formula;
                }
            }
        },

        /**
         * Creates a date from a string parsing format 1: MM/DD/YYYY
         * @param str the string to be parsed
         * @return a Date object if parsing succeeded or null if string could not be parsed
         */
        parseDateFormat1: function(str) {
            var _date = str.match(this.reDate1);
            if(_date && _date != null) {
                _date = "" + _date;
                if(_date == trim(str)) {
                    var vals = _date.split("/");
                    var month = parseInt(vals[0]);
                    var day = parseInt(vals[1]);
                    var year = parseInt(vals[2]);

                    if(this.isDateValid(day, month, year)) {
                        if(year < 100 && year >= 30) {
                            year = 2000 + year;
                        } else if(year < 100) {
                            year = 1900 + year;
                        }

                        var dateObj = new Date();
                        dateObj.setFullYear(year);
                        dateObj.setMonth(month - 1);
                        dateObj.setUTCDate(day);

                        return dateObj;
                    }
                }
            }
            return null;
        },

        /**
         * Creates a date from a string parsing format 2: DD-MMM-YYYY
         * @param str the string to be parsed
         * @return a Date object if parsing succeeded or null if string could not be parsed
         */
        parseDateFormat2: function(str) {
            var _date = str.match(this.reDate2);
            if(_date && _date != null) {
                _date = "" + _date;
                if(_date == trim(str)) {
                    var vals = _date.split("-");

                    var month = vals[1];
                    var found = -1;
                    for(var i = 0; i < this.months.length; i++) {
                        if(this.months[i] == month) {
                            found = i;
                            break;
                        }
                    }
                    if(found == -1) {
                        return null;
                    }
                    var day = parseInt(vals[0]);
                    var year = parseInt(vals[2]);

                    if(this.isDateValid(day, month, year)) {
                        if(year < 100 && year >= 30) {
                            year = 2000 + year;
                        } else if(year < 100) {
                            year = 1900 + year;
                        }

                        var dateObj = new Date();
                        dateObj.setFullYear(year);
                        dateObj.setMonth(found);
                        dateObj.setUTCDate(day);

                        return dateObj;
                    }
                }
            }
            return null;
        },

        /**
         * Creates a number from a string
         * @param str the string to be parsed
         * @return an int or a float if parsing succeeded or null if string could not be parsed
         */
        parseNumberFormat1: function(str) {
            var _num = str.match(this.reNumber1);

            if(_num && _num != null) {
                return null;
            }

            var dotIdx = str.indexOf(".");
            if(dotIdx != -1 && dotIdx != str.lastIndexOf(".")) {
                return null;
            }

            var eIdx = str.indexOf("e");
            if(eIdx != -1 && eIdx != str.lastIndexOf("e")) {
                return null;
            }
            if(dotIdx != -1 && eIdx != -1 && dotIdx + 1 != eIdx) {
                return null;
            }

            var _int = parseInt(str);
            if("" + _int == str) {
                return _int;
            }

            var _float = parseFloat(str);
            if(!isNaN(_float)) {
                return _float;
            }

            return null;
        },

        /**
         * Validates a date. Not implemented yet - just a simple check the ranges for each param are good
         * @param day
         * @param month
         * @param year
         */
        isDateValid: function(day, month, year) {
            if(month < 1 && month > 12 && day < 1 && day > 31) {
                return false;
            }
            // TODO check valid date
            return true;
        },

        /**
         * Spreadsheet specific debug function
         * @param msg a string representing the message to debug
         */
        debug: function(msg) {
            var date = new Date();
            var tmp = date.getHours() + ":" + date.getMinutes() + "-" + date.getSeconds() + ":" + date.getMilliseconds() + " :  " + msg;
            var dbg = document.getElementById("debugDiv");
            dbg.value = tmp + "\n" + dbg.value;
            dojo.debug(tmp);
        },

        /**
         * Adds "px" to a number
         * @param num the number
         */
        toPx: function(num) {
            return num + "px";
        }
    }
);


/********************************************************************************
* MATHEMATICAL FUNCTIONS
*********************************************************************************/
function sum() {
    var _sum = 0;
    if(arguments != null && arguments.length > 0) {
        for(var i = 0; i < arguments.length; i++) {
            _sum += arguments[i];
        }
    }
    return _sum;
}

function avg() {
    var _avg = 0;
    if(arguments != null && arguments.length > 0) {
        for(var i = 0; i < arguments.length; i++) {
            _avg += arguments[i];
        }
        _avg /= arguments.length;
    }
    return _avg;
}

function min() {
    var _min = Number.POSITIVE_INFINITY;
    if(arguments != null && arguments.length > 0) {
        for(var i = 0; i < arguments.length; i++) {
            if(_min > arguments[i]) {
                _min = arguments[i];
            }
        }
    }
    return _min;
}

function max() {
    var _max = Number.NEGATIVE_INFINITY;
    if(arguments != null && arguments.length > 0) {
        for(var i = 0; i < arguments.length; i++) {
            if(_max < arguments[i]) {
                _max = arguments[i];
            }
        }
    }
    return _max;
}

function count() {
    var _count = 0;
    if(arguments != null && arguments.length > 0) {
        for(var i = 0; i < arguments.length; i++) {
            if(arguments[i] != null && typeof(arguments[i]) != "undefined" && arguments[i] != "") {
                _count ++;
            }
        }
    }

    return _count;
}

function product() {
    var _product = 1;
    if(arguments != null && arguments.length > 0) {
        for(var i = 0; i < arguments.length; i++) {
            _product *= arguments[i];
        }
    }

    return _product;
}

var abs     = Math.abs;
var acos    = Math.acos;
var asin    = Math.asin;
var atan    = Math.atan;
var atan2   = Math.atan2;
var ceil    = Math.ceil;
var cos     = Math.cos;
var exp     = Math.exp;
var floor   = Math.floor;
var log     = Math.log;
var pow     = Math.pow;
var random  = Math.random;
var round   = Math.round;
var sin     = Math.sin;
var sqrt    = Math.sqrt;
var tan     = Math.tan;

/********************************************************************************
* TEXT FUNCTIONS
*********************************************************************************/
function len() {
    if(arguments != null && arguments.length > 0) {
        return arguments[0].length;
    }
}

function lower() {
    if(arguments != null && arguments.length > 0) {
        return arguments[0].toLowerCase();
    }
}

function upper() {
    if(arguments != null && arguments.length > 0) {
        return arguments[0].toUpperCase();
    }
}

function left() {
    if(arguments != null && arguments.length > 0) {
        var endPos = 1;
        if(arguments[1]) {
            endPos = arguments[1];
        }
        return arguments[0].substring(0, endPos);
    }
}

function right() {
    if(arguments != null && arguments.length > 0) {
        var startPos = 1;
        if(arguments[1]) {
            startPos = arguments[1];
        }
        return arguments[0].substring(arguments[0].length - startPos);
    }
}

var trim    = dojo.string.trim;

/********************************************************************************
* PERSONAL FUNCTIONS
*********************************************************************************/

function equals()
{    
    var _bool = "False";
    if(arguments != null && arguments.length == 2) {
        if (arguments[0] == arguments[1])
            _bool = "True";
    }
    return _bool;
}

function ifelse()
{
    if (arguments != null && arguments.length == 3)
    {
        if (arguments[0] === "True") return arguments[1];
        else return arguments[2];
    }
    return "ERROR"
}