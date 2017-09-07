
/** exp is a global variable that stores the expression */

let exp = "";

/** check if equal was pressed */
let isEqual = (operation) => {
  return operation == "=" ? true : false;
}
/** check if backspace was pressed */
let isBackSpace = (operation) => {
  return operation == "&lt;" ? true : false;
}
/** check if Clear was pressed */
let isClear = (operation) => {
  return operation == "C" ? true : false;
}


/**This function gets the expression typed on calculator 
* and put it on the display */
YUI().use(
"aui-button", "aui-node", 'aui-dropdown',
function (Y) {
    Y.one(".calc-digits").on("click",function(e) {
      let clearMsg = () => {
        Y.one(".error-msg").html("");
        }
      if(e.target._node.tagName == "BUTTON") {
        input = e.target._node.innerHTML;
        if(isEqual(input)) {
          try {
            exp = eval(exp);
            Y.one(".backspace").html("C");
          } catch (error) {
            Y.one(".error-msg").html(error.message);
          }
        } else if(isBackSpace(input)) {
          exp = exp.slice(0,-1);
          console.log(exp);
          clearMsg();
        } else if (isClear(input)) {
          exp = "";
          Y.one(".backspace").html("<");
        } else {
          exp += input;
          clearMsg();
        }
        let displayNode = Y.one("#display");
        displayNode.val(exp);
        }
    });
    /** Need to check all possibilities of operations */
    // Y.one("#display").on("change", function(e) {
    //   console.log(e);
    //   console.log(Y.one("#display").val());
    //   exp += Y.one("#display").val();
    // });

});

