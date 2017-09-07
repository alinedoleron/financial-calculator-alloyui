YUI().use(
"aui-button", "aui-node", 'aui-dropdown',
function (Y) {

    let options = [
    "Choose an option...",
    "24 months with a rate of 7% per mo.",
    "36 months with a rate of 9% per mo.",
    "48 months with a rate of 15% per mo."
];
    let interestRate, months, initialValue;

    //Function to Set the dropdown selector
    function setSelector(option) {
        Y.one("#btn-choose").html(option);
        Y.one("#btn-choose").val(option);
        let spam = Y.Node.create("<spam/>");
        spam.attr("class","caret");
        Y.one("#btn-choose").append(spam);
    }

    function setInfos(str) {
        console.log(str);
        months = str.substring(0, str.indexOf(" months"));
        interestRate = str.substring(str.lastIndexOf("of ")+2,str.lastIndexOf("%"));
        initialValue = Y.one("#display").val();
        console.log("months: " + months);
        console.log("rate: " + interestRate);
        console.log("initialValue: " + initialValue);
    }

    function calculate() {
        setInfos(Y.one("#btn-choose").val());
        let tx = interestRate/100;
        total = initialValue * tx * months / (1-Math.pow(1+tx, -(months)));
        total = new Intl.NumberFormat('latn', { style: 'currency', currency: 'BRL' }).format(total);
        total = (total.substring(0,2) + " " + total.substring(2,total.length));
        Y.one("#total").val(total);
    }

    //Set default selection
    setSelector(options[0]);

    //This for loop fills the dropdown
    for (var i = 0; i < options.length; i++) {
        let li = Y.Node.create("<li/>");
        let a = Y.Node.create("<a/>");
        a.attr("tabindex","-1");
        a.html(options[i]);
        Y.one(".dropdown-menu").append(li);  
        li.append(a);      
    }

    new Y.Dropdown(
    {
        boundingBox: '#myDropdown',
        trigger: '#btn-choose'
    }
    ).render();

    Y.one(".dropdown-menu").on("click",function(e) {
        console.log(e.target._node.innerHTML);
        setSelector(e.target._node.innerHTML);
        e.preventDefault();
    });

    Y.one(".btn-calculate").on("click",function(e) {
        calculate(); 
    });
});
