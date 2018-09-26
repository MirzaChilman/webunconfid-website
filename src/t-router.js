export default class TRouter {
    constructor(){
        this.currentRoute='home';
        this.routes=[];
        this.notFound='404';
        this.activeRoute=null;
        this.initEvent();
    }

    initEvent(){
        //handle if a link click and prevent to reload the page
        document.addEventListener('click',(e) => {
            if (e.path[0].tagName!=='A') return;
            const link=e.path[0].getAttribute('href');
            //make sure the link not outside the app
            if(link.indexOf('http')<0 && link.substring(0,2)!=='//'){
                this.goTo(link);
                e.preventDefault();
            }
        });
    }

    goTo(url){
        let notFound=true;
        for (let i = 0; i < this.routes.length; i++) {
            const route = this.routes[i];
            const cleanUrl=url.substring(0, url.indexOf('#'));                  
            if(cleanUrl===route.pattern || url===route.pattern){
                this.setActiveRoute(url,route);
                notFound=false;
                break;
            } 
        }

        if(notFound){
            //this.goTo(this.notFound);
        } 
    }

    setActiveRoute(url,route){
        route.callback();
        this.activeRoute=route.pattern;
        history.pushState(null, null, url);
    }

    on(route,callback){
        const newRoute={
            pattern:route,
            callback:callback
        };
        this.routes.push(newRoute);
        if(window.location.pathname.match(route)){
            this.setActiveRoute(window.location.pathname,newRoute);
        }
    }


}