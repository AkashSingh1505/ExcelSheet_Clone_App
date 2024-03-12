
let rowCount =200
let colCount =200
let preSelCell;
let selCell ;
const cellObjects = new Map();
const cutData = new Map();


class CellProperties {
    constructor() {
        // Initialize default values for properties
        this.text = "";
        this.isBold = false;
        this.isItalic = false;
        this.isUnderlined = false;
        this.textAlign = "left";
        this.fontSize = "16px";
        this.bgColor = "#ffffff";
        this.textColor = "#000000";
    }
}

initialization()
document.addEventListener("DOMContentLoaded", function() {

});


function initialization(){
    createTable(rowCount,colCount);
    selCell = document.getElementById("1,1");
    setHighlighter(selCell,true)
    preSelCell = selCell;
    let prop =  new CellProperties()
    cellObjects.set(selCell.getAttribute("id"),prop);
    setTools(prop)

}





function createTable(rowCount,colCount){
    let rowHeader = document.getElementsByClassName("row-header")[0];
    let colHeader = document.getElementsByClassName("column-header")[0];
    let inputContainer = document.getElementsByClassName("input-container")[0]
    const alphaCodeList = getAlphaCodeList(colCount);

    for(let i = 0;i<rowCount;i++){
        let newInputRow = document.createElement("div")
        newInputRow.classList.add("input-row-conatiner");
        for(let j = 0;j<colCount;j++){

            // generate Column header
            if(i==0){
                const newColHeader = document.createElement("div");
                newColHeader.classList.add("column-heading");
                const cod = alphaCodeList[j];
                newColHeader.setAttribute("id",`colId-${j+1}`)
                newColHeader.textContent = cod
                colHeader.appendChild(newColHeader);
            }


            // generate Column
            const newCell = document.createElement("div");
            newCell.classList.add("input-cell");
            newCell.setAttribute("contenteditable",false);
            newCell.setAttribute("id", `${i+1},${j+1}`);
            newInputRow.appendChild(newCell);
        }
        //generate row
        inputContainer.appendChild(newInputRow)

        //generate row header
        const newRowHeader = document.createElement("div");
        newRowHeader.classList.add("row-heading");
        newRowHeader.setAttribute("id", `rowId-${i+1}`);
        newRowHeader.textContent=i+1;
        rowHeader.appendChild(newRowHeader);
    }
}

function getAlphaCodeList(col){
    const alphaCodeList = [];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < col; i++) {
        if(i==26){
            break;
        }
        alphaCodeList.push(alphabet[i]);
    }
    let count = 0
    if(col>26){
        for (let i = 0; i < 26; i++) {
            for (let j = 0; j < 26; j++) {
                alphaCodeList.push(alphabet[i] + alphabet[j]);
                count++;
            }
            if(count>=col-26){
            break}
        }
    }

    return alphaCodeList;
}



$(".toggleTool").click(function(){
    this.classList.toggle('selected');
})

function setTools(prop){
    // isBold
    if(prop.isBold){
        $(".icon-bold").addClass('selected');
    }else{
        $(".icon-bold").removeClass('selected');
    }
    // is Itelic
    if(prop.isItalic){
        $(".icon-italic").addClass('selected');
    }else{
        $(".icon-italic").removeClass('selected');
    }
    // is Underline
    if(prop.isUnderlined){
        $(".icon-underline").addClass('selected');
    }else{
        $(".icon-underline").removeClass('selected');
    }
    // Align
    if(prop.textAlign=="left"){
        $(".icon-leftAlign").addClass('selected');
        $(".icon-centerAlign").removeClass('selected');
        $(".icon-rightAlign").removeClass('selected');
    }
   else if(prop.textAlign=="center"){
    $(".icon-centerAlign").addClass('selected');
    $(".icon-leftAlign").removeClass('selected');
    $(".icon-rightAlign").removeClass('selected')
   }
    else{
        $(".icon-rightAlign").addClass('selected');
        $(".icon-leftAlign").removeClass('selected');
        $(".icon-centerAlign").removeClass('selected');
    }
    // background color
    $(".background-color-picker").val(prop.bgColor)
    //  text color
    $(".text-color-picker").val(prop.textColor)
    // setSizeContainer
    $(".sizeContainer").text(prop.fontSize);

}


$(".input-cell").click(function(){
    this.style.outline="none"
    selCell = this
    if(cellObjects.get(selCell.getAttribute("id"))==undefined){
        let prop = new CellProperties();
        cellObjects.set(selCell.getAttribute("id"),prop);
        setTools(prop)
    }else{
        const cellId = selCell.getAttribute("id");
        let prop = cellObjects.get(cellId);
        setTools(prop)
    }
    setHighlighter(preSelCell,false);
    preSelCell.setAttribute("contenteditable",false)
    if(selCell!=preSelCell && preSelCell.textContent.trim()==""){
        const cellId = preSelCell.getAttribute("id");
        const prop = cellObjects.get(cellId)
        preSelCell.style.fontSize = "16px"
        if(prop.bgColor=="#ffffff"){
            cellObjects.delete(cellId);
        }
        console.log(cellObjects)
    }else{
        const cellId = preSelCell.getAttribute("id");
        let prop = cellObjects.get(cellId);

        if (prop) {
            // Check if the cell already exists in cellObjects
            prop.text = preSelCell.textContent.trim();
        } else {
            // If the cell doesn't exist, create a new CellProperties object
            prop = new CellProperties();
            prop.text = preSelCell.textContent.trim();
            cellObjects.set(cellId, prop);
        }
        console.log(cellObjects)
    }
    preSelCell=this;
    setHighlighter(this,true);
    $("#input-tool").val(this.textContent)


});
$(".input-cell").dblclick(function(){
    this.setAttribute("contenteditable",true)
    this.focus();
});

$(".input-cell").on("input", function(event) {
    console.log(this.textContent)
    $("#input-tool").val(this.textContent);
});

$("#input-tool").on("input", function(event) {
    selCell.textContent = $(this).val();

});




function setHighlighter(cell,set){
    let cellId = cell.getAttribute("id")
    const splitString = cellId.split(`,`);
    const rowHead = document.getElementById(`rowId-${splitString[0]}`);
    const colHead = document.getElementById(`colId-${splitString[1]}`);
    if(set==true){
        rowHead.style.backgroundColor=`rgba(211, 209, 209, 0.498)`;
        rowHead.style.borderRight="1.5px solid green";
        colHead.style.backgroundColor=`rgba(211, 209, 209, 0.498)`;
        colHead.style.borderBottom="1.5px solid green"
        cell.style.outline="2px solid green"
    }else{
        rowHead.style.backgroundColor=`whitesmoke`;
        rowHead.style.borderRight="none"
        colHead.style.backgroundColor=`whitesmoke`;
        colHead.style.borderBottom="none"
        cell.style.outline="none"
    }
}



$(".icon-bold").click(function() {
    const cellId = selCell.getAttribute("id");
        let prop = cellObjects.get(cellId);
    if($(this).hasClass("selected")) {
        selCell.style.fontWeight = "bold"
        prop.isBold=true;

    } else {
        selCell.style.fontWeight = "normal"
        prop.isBold=false;
    }
});

$(".icon-italic").click(function() {
    const cellId = selCell.getAttribute("id");
    let prop = cellObjects.get(cellId);
    if ($(this).hasClass("selected")) {
        selCell.style.fontStyle = "italic";
        prop.isItalic = true;
    } else {
        selCell.style.fontStyle = "normal"; // Remove italic
        prop.isItalic = false;
    }
});

$(".icon-underline").click(function() {
    const cellId = selCell.getAttribute("id");
    let prop = cellObjects.get(cellId);
    if ($(this).hasClass("selected")) {
        selCell.style.textDecoration = "underline";
        prop.isUnderlined = true;
    } else {
        selCell.style.textDecoration = "none"; // Remove underline
        prop.isUnderlined = false;
    }

});

$(".icon-leftAlign").click(function() {
    const cellId = selCell.getAttribute("id");
    let prop = cellObjects.get(cellId);
    selCell.style.justifyContent = "start"
    console.log(selCell)
    prop.textAlign = "left";
    setTools(prop)
});

$(".icon-centerAlign").click(function() {
    const cellId = selCell.getAttribute("id");
    let prop = cellObjects.get(cellId);
    selCell.style.justifyContent = "center"
    prop.textAlign = "center";
    setTools(prop)

});

$(".icon-rightAlign").click(function() {
    const cellId = selCell.getAttribute("id");
    let prop = cellObjects.get(cellId);
    selCell.style.justifyContent = "end"
    prop.textAlign = "right";
    setTools(prop)

});

$(".background-color-picker").on("input",function() {
    // Your code to handle the click event goes here
    const cellId = selCell.getAttribute("id");
    let prop = cellObjects.get(cellId);
    const colorValue = $(this).val();
    console.log("Selected color:", colorValue);
    selCell.style.backgroundColor = colorValue
    prop.bgColor=colorValue

});

$(".text-color-picker").on("input",function(){
       // Your code to handle the click event goes here
       const cellId = selCell.getAttribute("id");
       let prop = cellObjects.get(cellId);
       const colorValue = $(this).val();
       console.log("Selected color:", colorValue);
       selCell.style.color = colorValue
       prop.textColor=colorValue
});

$(".icon-incFontSize").click(function() {
    const cellId = selCell.getAttribute("id");
    let prop = cellObjects.get(cellId);
    let size = parseInt(prop.fontSize)+2
    if(size<=40){
    prop.fontSize = size+"px"
    selCell.style.fontSize = prop.fontSize;
    $(".sizeContainer").text(prop.fontSize);
    $(".sizeContainer").css("border", "1.2px solid lightgray");
    }else{
        size-=2;
        $(".sizeContainer").css("border", "2px solid green");
    }

});
$(".icon-decFontSize").click(function() {
    const cellId = selCell.getAttribute("id");
    let prop = cellObjects.get(cellId);
    let size = parseInt(prop.fontSize)-2
    if(size>=10){
        prop.fontSize = size+"px"
        selCell.style.fontSize = prop.fontSize;
        $(".sizeContainer").text(prop.fontSize);
        $(".sizeContainer").css("border", "1.2px solid lightgray");
    }else{
        size+=2;
        $(".sizeContainer").css("border", "2px solid green");
    }

});

$(".icon-cut").click(function(){
    if(cutData.get("cell")){
        dashBorder(cutData.get("cell"),false)
    }
    cutData.set("cell",selCell);
    cutData.set("data",selCell.textContent);
    cutData.set("operation","cut")
    dashBorder(selCell,true)
    console.log(cutData)
});

$(".icon-copy").click(function(){
    if(cutData.get("cell")){
        dashBorder(cutData.get("cell"),false)
    }
    cutData.set("cell",selCell);
    cutData.set("data",selCell.textContent);
    selCell.style.border = "2px dashed green";
    console.log(cutData)
    cutData.set("operation","copy")
});

$(".icon-paste").click(function() {
    if(cutData.get("cell")){
        if(cutData.get("cell")!=selCell){
            const cellId = selCell.getAttribute("id");
            let prop = cellObjects.get(cellId);
            prop.text = cutData.get("data");
            selCell.textContent = prop.text

            let pCell = cutData.get("cell");
            // cut opertaion
            if(cutData.get("operation")=="cut"){
                pCell.textContent="";
                cellObjects.delete(pCell.getAttribute("id"));
            }
        }
        dashBorder(cutData.get("cell"),false)
        cutData.delete("data");
        cutData.delete("cell")
    }
});

$(".saveButton").click(function(){
    const cellId = selCell.getAttribute("id");
    let prop = cellObjects.get(cellId);

    if(prop.text.trim()!="" && prop.bgColor!="#ffffff"){
    // Convert the Map to a JSON string
    const cellObjectsJSON = JSON.stringify([...cellObjectsJSON]);

    AndroidInterface.dataSave(cellObjectsJSON);
        // return cellObjects
    }else{
        cellObjects.delete(cellId)
        // return cellObjects
        // Convert the Map to a JSON string
        const cellObjectsJSON = JSON.stringify([...cellObjects]);

        AndroidInterface.dataSave(cellObjectsJSON);
    }

});


function dashBorder(cell,apply){
    if(apply){
        cell.style.border = "2px dashed green";
    }else{
        cell.style.border = "none"
        cell.style.borderRight = "0.571px solid lightgray";
    }
}
