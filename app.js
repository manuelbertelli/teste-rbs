(function () {
  'use strict';

  // Const
  var ORDERING_TYPES = {
    "normal": {
      "name": "Sem ordenação",
      "value": ""
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

  var ORDERING_LIST = [ "normal", "asc", "desc" ];

  // Helpers
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

    this.inputField.addEventListener("input", function (e) {
      console.log("Input phrase: ", e.currentTarget.value);
      that.renderResults(this.value);
    }, false);
  }

  // Class PhraseSplitView
  var PhraseSplitView = function () {
    this.aValues = null;
    this.unorderedList = document.createElement("ul");
    this.wrapper = document.body.createElement("div");
  }

  PhraseSplitView.prototype.init = function () {

  }

  PhraseSplitView.prototype.setElements = function (aValues) {
    this.aValues = aValues;

    return this;
  }

  PhraseSplitView.prototype.render = function () {
    for (var i = 0; i < this.aValues.length; i++) {
      this.unorderedList.appendChild(generateLists(this.aValues[i]));
    };

    console.log("PhraseSplitView: ", this);

    // TODO: PAREI AQUI

    return this;
  }

  // Class PhraseOrder (Main.app)
  var PhraseReorder = function () {
    this.inputField = document.createElement("input");
    this.select = document.createElement("select");
    this.phraseSplitView = new PhraseSplitView();
  }

  // Methods
  PhraseReorder.prototype.init = function () {
    bindEvents.call(this);

    return this;
  }

  PhraseReorder.prototype.render = function () {
    for (var i = 0; i < ORDERING_LIST.length; i++) {
      var index = ORDERING_LIST[i];
      var text = ORDERING_TYPES[index]["name"];
      var value = ORDERING_TYPES[index]["value"];

      this.select.appendChild(generateOptions(text, value));
    };

    document.body.appendChild(this.inputField);
    document.body.appendChild(this.select);

    return this;
  }

  PhraseReorder.prototype.renderResults = function (sValues) {
    var aValues = sValues.split(" ");

    this.phraseSplitView.setElements(aValues).render();

    return this;
  }

  var pr = new PhraseReorder();

  pr.init().render();

})();