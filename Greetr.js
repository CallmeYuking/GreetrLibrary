(function(global, $) {

    // 'new' an object
    let Greetr = function(firstname, lastname, language) {
        return new Greetr.init(firstname, lastname, language)
    }
    
    // hidden within the scope of the IIFE and never directly accessble
    let supportedLanguages = ["en", "ch"]

    // informal greetings
    let greetings = {
        en: "Hello",
        ch: "你好"
    };

    // formal greetings
    let formalGreetings = {
        en: "Greetings",
        ch: "您好"
    };

    // for login messages
    let logMessages = {
        en: "Logged in",
        ch: "已登陆"
    };

    // prototype holds method to save memory space
    Greetr.prototype = {

        // 'this' refers to the calling object at execution time
        fullName: function() {
            return `${this.firstname} ${this.lastname}`
        },

        validate: function() {
            // check that is a valid language
            // references the externally inaccessible 'supportedLangs' within the closure
            if (supportedLanguages.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },

        //retrieve messages from object by referring to properties using [] syntax
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
            //make chainable
            return this
        },

        
        setLanguage: function(lang) {
            // set the language
            this.language = lang
            // validate
            this.validate()
            // make chainable
            return this;
        },

        HTMLGreeting: function(selector, formal) {
            if(!$) {
                throw "jQuery not loaded";
            }
            if (!selector) {
                throw "Missing jQuery selector";
            }

            // determine the message
            let msg;
            if(formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }

            // inject the message in the chosen place in the DOM
            $(selector).html(msg);

            // make chainble
            return this;
        }
    };

    // the actual object is create here, allowing us to 'new' an object without calling 'new'
    Greetr.init = function(firstname, lastname, language) {
        let self = this;
        self.firstname = firstname;
        self.lastname = lastname;
        self. language = language || "en";
    }

    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;

    // attach our Greetr to the global object, and provide a shorthand '$G'
    global.Greetr = global.G$ = Greetr


}(window, jQuery))