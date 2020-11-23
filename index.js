export default class PageActivity {
    constructor(element, setting = {}) {
        this.eventFlag = 0;
        let defaultSettings = {
            achieveTime: 60,
            loop: 0,
            eventList: 'touchmove blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error',
            testPeriod: 10,
            useMultiMode: true,
            callBack: function (e) {
                console.log('Achieved!')
            },
            watchEvery: 1,
            counter: {test: 0, achiev: 0}
        }

        this.settings = Object.assign(defaultSettings, setting);
        this.settings.watchEvery *= 1000;

        this.bindElement = element;

        if (setting.useMultiMode) {
            this.loadMultiData();
        }

        this.bindEvent();
        this.process();
    }

    bindEvent() {
        this.settings.eventList.split(' ').map((event) => {
            this.bindElement.addEventListener(event, this.eventTrigger.bind(this));
        });

    }

    process() {
        this.settings.counter.test += 1;

        if (
            this.settings.counter.test === this.settings.testPeriod
        || (this.settings.counter.achiev - this.settings.testPeriod) === this.settings.testPeriod
        ) {
            if (this.eventFlag) {
                this.eventFlag = 0;
                this.settings.counter.achiev += this.settings.testPeriod;
            }

            if ( this.settings.counter.test === this.settings.testPeriod) {
                this.settings.counter.test = 0;
            }
        }

        let timerHand = setTimeout(() => {
            this.process()
        }, this.settings.watchEvery);

        if (this.settings.counter.achiev >= this.settings.achieveTime) {
            if (!this.settings.loop) clearTimeout(timerHand);
            this.settings.counter.achiev = this.settings.loop ? 0 : -1;
            this.settings.callBack.call(this);
        }

        if (this.settings.useMultiMode) document.cookie = 'activity=' + this.settings.counter.test + '|' + this.settings.counter.achiev + '; path=/;';


    }

    loadMultiData() {
        let search = ' activity=';
        let cookie = ' ' + document.cookie;

        if (cookie.length > 0) {
            if (cookie.indexOf(search) != -1) {
                let offset = cookie.indexOf(search) + search.length;
                var m = unescape(cookie.substring(offset, cookie.indexOf(";", offset) == -1 ? cookie.length : cookie.indexOf(";", offset))).split('|');
                this.settings.test = parseInt(m[0]);
                this.settings.achiev = parseInt(m[1]);
                return;
            }
        }

        this.settings.counter.test = this.settings.counter.achiev = 0;
    }

    eventTrigger() {
        this.eventFlag = 1;
    }
}
let test = new PageActivity(document, {achieveTime: 30});
console.log(test)