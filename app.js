(function () {
    'use strict';

    var ORDERING_TYPES, ORDERING_LIST, PhraseSplitView, PhraseReorder, pr;

    ORDERING_TYPES = {
        "normal": {
            "name": "Sem ordenação",
            "value": "normal"
        },
        "asc": {
            "name": "Ascendente",
            "value": "asc"
        },
        "desc": {
            "name": "Descendente",
            "value": "desc"
        }
    };

    ORDERING_LIST = [ "normal", "asc", "desc" ];

    function generateOptions(text, value) {
        var option = document.createElement("option");

        option.textContent = text;
        option.value = value;

        return option;
    }

    function generateLists(text) {
        var li = document.createElement("li");

        li.textContent = text;

        return li;
    }

    function bindEvents() {
        var that = this;

        this.inputField.addEventListener("input", function () {
            that.renderResults();
        }, false);

        this.select.addEventListener("change", function () {
            that.ordering = this.value;
            that.renderResults();
        }, false);
    }

    PhraseSplitView = function () {
        this.aValues = null;
        this.unorderedList = document.createElement("ul");
        this.wrapper = document.createElement("div");
    };

    PhraseSplitView.prototype.init = function () {
        this.wrapper.appendChild(this.unorderedList);
        document.body.appendChild(this.wrapper);
    };

    PhraseSplitView.prototype.setElements = function (aValues) {
        this.aValues = aValues;

        return this;
    };

    PhraseSplitView.prototype.cleanup = function () {
        this.unorderedList.innerHTML = "";

        return this;
    };

    PhraseSplitView.prototype.render = function () {
        var i;

        for (i = 0; i < this.aValues.length; i += 1) {
            this.unorderedList.appendChild(generateLists(this.aValues[i]));
        }

        return this;
    };

    PhraseReorder = function () {
        this.inputField = document.createElement("input");
        this.select = document.createElement("select");
        this.phraseSplitView = new PhraseSplitView();
        this.ordering = ORDERING_LIST[0];
    };

    PhraseReorder.prototype.init = function () {
        bindEvents.call(this);

        return this;
    };

    PhraseReorder.prototype.render = function () {
        var i, index, text, value;

        for (i = 0; i < ORDERING_LIST.length; i += 1) {
            index = ORDERING_LIST[i];
            text = ORDERING_TYPES[index].name;
            value = ORDERING_TYPES[index].value;

            this.select.appendChild(generateOptions(text, value));
        }

        document.body.appendChild(this.inputField);
        document.body.appendChild(this.select);
        this.phraseSplitView.init();

        return this;
    };

    PhraseReorder.prototype.renderResults = function () {
        var aValues;

        aValues = this.inputField.value.trim().split(" ");
        aValues = aValues.filter(function (item) {
            return item;
        });

        if (this.ordering === "asc") {
            aValues.sort();
        } else if (this.ordering === "desc") {
            aValues.sort().reverse();
        }

        this.phraseSplitView.cleanup();

        if (this.inputField.value.trim() !== "") {
            this.phraseSplitView.setElements(aValues).render();
        }

        return this;
    };

    pr = new PhraseReorder();

    pr.init().render();

}());
