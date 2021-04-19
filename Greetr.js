(function(global, $) {

    let Greetr = function(firstname, lastname, language) {
        return new Greetr.init(firstname, lastname, language)
    }
    
    let supportedLanguages = ["en", "ch"]

    let greetings = {
        en: "Hello",
        ch: "你好"
    };

    let formalGreetings = {
        en: "Greetings",
        ch: "您好"
    };

    let logMessages = {
        en: "Logged in",
        ch: "已登陆"
    };

    Greetr.prototype = {
        fullName: function() {
            return `${this.firstname} ${this.lastname}`
        },

        validate: function() {
            if (supportedLanguages.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },

        greeting: function() {
            return `${greetings[this.language]} ${this.firstname}!`;
        },

        formalGreeting: function() {
            return `${greetings[this.language]}, ${this.fullName()}`;
        },

        greet: function(formal) {
            let msg;

            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // make the method chainable
            return this
        },

        log: function() {
            if (console) {
                console.log(`${logMessages[this.language]}: ${this.fullName()}`)
            };
            return this
        },

        setLanguage: function(lang) {
            this.language = lang
            this.validate()
            return this;
        },

        HTMLGreeting: function(selector, formal) {
            if(!$) {
                throw "jQuery not loaded";
            }
            if (!selector) {
                throw "Missing jQuery selector";
            }

            let msg;
            if(formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }

            $(selector).html(msg);

            return this;
        }
    };

    Greetr.init = function(firstname, lastname, language) {
        let self = this;
        self.firstname = firstname;
        self.lastname = lastname;
        self. language = language || "en";
    }

    Greetr.init.prototype = Greetr.prototype;

    global.Greetr = global.G$ = Greetr


}(window, jQuery))