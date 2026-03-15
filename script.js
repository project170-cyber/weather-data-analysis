

// BST Node
class Node{
constructor(temp,date){
this.temp=temp;
this.date=date;
this.left=null;
this.right=null;
}
}

// BST Tree
class BST{

constructor(){
this.root=null;
}

insert(temp,date){

let newNode=new Node(temp,date);

if(this.root==null){
this.root=newNode;
return;
}

let current=this.root;

while(true){

if(temp<current.temp){

if(current.left==null){
current.left=newNode;
return;
}

current=current.left;

}
else{

if(current.right==null){
current.right=newNode;
return;
}

current=current.right;

}

}

}

search(temp){

let current=this.root;

while(current!=null){

if(temp==current.temp){
return current;
}

if(temp<current.temp){
current=current.left;
}
else{
current=current.right;
}

}

return null;

}

inorder(node,result=[]){

if(node!=null){

this.inorder(node.left,result);
result.push(node.temp+"°C - "+node.date);
this.inorder(node.right,result);

}

return result;

}

findMin(node){
while(node.left!=null){
node=node.left;
}
return node;
}

findMax(node){
while(node.right!=null){
node=node.right;
}
return node;
}

delete(node,temp){

if(node==null) return null;

if(temp<node.temp){
node.left=this.delete(node.left,temp);
}

else if(temp>node.temp){
node.right=this.delete(node.right,temp);
}

else{

if(node.left==null) return node.right;
if(node.right==null) return node.left;

let minNode=this.findMin(node.right);

node.temp=minNode.temp;
node.date=minNode.date;

node.right=this.delete(node.right,minNode.temp);

}

return node;

}

}

let tree=new BST();
let recordCount=0;
let dateMap={};

function addRecord(){

let date=document.getElementById("date").value;
let temp=parseInt(document.getElementById("temp").value);

if(!date||isNaN(temp)){
alert("Enter date and temperature");
return;
}

if(dateMap[date]){
alert("Record for this date already exists");
return;
}

tree.insert(temp,date);

dateMap[date]=temp;

recordCount++;

document.getElementById("counter").innerHTML="Total Records: "+recordCount;

document.getElementById("output").innerHTML=
"Record Added: "+temp+"°C on "+date;

}

function searchTemp(){

let temp=parseInt(document.getElementById("searchTemp").value);

let result=tree.search(temp);

if(result){

document.getElementById("output").innerHTML=
"Temperature Found: "+result.temp+"°C on "+result.date;

}
else{

document.getElementById("output").innerHTML=
"Temperature Not Found";

}

}

function searchDate(){

let date=document.getElementById("searchDate").value;

if(dateMap[date]){

document.getElementById("output").innerHTML=
"Temperature on "+date+" was "+dateMap[date]+"°C";

}
else{

document.getElementById("output").innerHTML=
"No record for this date";

}

}

function deleteRecord(){

let date=document.getElementById("deleteDate").value;

if(!dateMap[date]){

document.getElementById("output").innerHTML=
"No record found for this date";

return;

}

let temp=dateMap[date];

tree.root=tree.delete(tree.root,temp);

delete dateMap[date];

recordCount--;

document.getElementById("counter").innerHTML=
"Total Records: "+recordCount;

document.getElementById("output").innerHTML=
"Record deleted for date "+date;

}

function displayRecords(){

let records=tree.inorder(tree.root);

if(records.length==0){

document.getElementById("output").innerHTML=
"No records available";

return;

}

document.getElementById("output").innerHTML=
records.join("<br>");

}

function highestTemp(){

let node=tree.findMax(tree.root);

if(node){
document.getElementById("output").innerHTML=
"Highest Temperature: "+node.temp+"°C on "+node.date;
}

}

function lowestTemp(){

let node=tree.findMin(tree.root);

if(node){
document.getElementById("output").innerHTML=
"Lowest Temperature: "+node.temp+"°C on "+node.date;
}

}

