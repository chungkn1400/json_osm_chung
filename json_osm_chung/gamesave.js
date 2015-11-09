// gamesave.js a program by NGUYEN.Chung (freeware 2015)
var gameprefix="";
document.getElementById("save0text").value="my game save new";
document.getElementById("save0date").value=new Date().toLocaleString();
document.getElementById("save0check").check=true;
var ngamesave=30,igamesave=0,gamesavequit=0;
var element=[],elementtext=[],elementdate=[],elementbr=[];
function formattext(text,letters){
    var word="",w="";
	for(var i=0;i<text.length;i++){
		w=text.substr(i,1);
		if(letters.indexOf(w)>=0){word+="?";}else{word+=w;}
	}
	return word;
}
function datetime(){return new Date().toLocaleString();}
function addelement(name,datetext){
var name2=formattext(name,'#&"');
if(igamesave>=ngamesave-1){return;}
igamesave+=1;var i=igamesave;
element[i] = document.createElement("input");
element[i].type="checkbox";element[i].name="gamesave";
element[i].value="save"+i;
elementtext[i] = document.createElement("input");
elementtext[i].type="text";elementtext[i].name="gamesavetext";
elementtext[i].value=name2;elementtext[i].size=53;
elementdate[i] = document.createElement("input");
elementdate[i].type="text";elementdate[i].name="datetext";
elementdate[i].value=datetext;elementdate[i].size=20;
elementbr[i]=document.createElement("br");
document.getElementById("gamesave").appendChild(element[i]);
document.getElementById("gamesave").appendChild(elementtext[i]);
document.getElementById("gamesave").appendChild(elementdate[i]);
document.getElementById("gamesave").appendChild(elementbr[i]);
}
function removeelement(i){
document.getElementById("gamesave").removeChild(element[i]);
document.getElementById("gamesave").removeChild(elementtext[i]);
document.getElementById("gamesave").removeChild(elementdate[i]);
document.getElementById("gamesave").removeChild(elementbr[i]);
}
function removeallelement(){
for(var i=1;i<ngamesave;i++){try{removeelement(i);}catch(e){}}
}
/*addelement("my game&# save 1",datetime());
/*addelement("my game&# save 2",datetime());
addelement("my game save 3",datetime());
removeelement(1);
//removeallelement();
addelement("my game save 4",datetime());
alert(document.getElementById("gamesave").children[4].value);
*/
function testlocalStorage(){
    var test = '_test';
    try {localStorage.setItem(test, test);
         localStorage.removeItem(test);
         return true;
    }catch(e){return false;}
}
var newgamename="new gamesave",newgamedata="",gamedata=[],tgamesave=0;
function initgamesave(name,data){
if(!testlocalStorage()){alert("no html5 localStorage support on this browser !");
                        return;}
newgamename=formattext(name,'#&"').trim();
newgamedata=data;
gamesavequit=0;tgamesave=1;gamereturndata=null;
if(newgamename==""){newgamename="new gamesave"}
removeallelement();
document.getElementById("save0text").focus();
document.getElementById("save0text").value=newgamename;
document.getElementById("save0date").value=new Date().toLocaleString();
igamesave=0;
for(var i=1;i<ngamesave;i++){
   var name1=localStorage.getItem(gameprefix+"gamesavename"+i);
   var date1=localStorage.getItem(gameprefix+"gamesavedate"+i);
   var data1=localStorage.getItem(gameprefix+"gamesavedata"+i);
   if(name1!=null && date1==null){date1=datetime();
      localStorage.setItem(gameprefix+"gamesavedate"+i,date1);}
   if(name1!=null && date1!=null){name1=name1.trim();
                                  if(name1==""){name1="?";}
								  addelement(name1,date1);
								  //igamesave+=1; done in addelement
								  gamedata[igamesave]=data1;
   }else{break;}							  
}
//addelement("my game&# save 1",datetime());
}
function subexport(){
var crlf=String.fromCharCode(13)+String.fromCharCode(10);
var link=document.createElement('a');
link.download="gamesaveimport_"+gameprefix+".txt";
var data="gamesaveimportprefix='"+gameprefix+"';"+crlf;
data+="gameimportname=[];gameimportdate=[];gameimportdata=[];"
data+="igameimport=0;"+crlf;
for(var i=1;i<ngamesave;i++){
   data+="igameimport+=1;"+crlf;
   var name1=localStorage.getItem(gameprefix+"gamesavename"+i);
   var date1=localStorage.getItem(gameprefix+"gamesavedate"+i);
   var data1=localStorage.getItem(gameprefix+"gamesavedata"+i);
   if(name1!=null && date1==null){date1=datetime();}
      //localStorage.setItem(gameprefix+"gamesavedate"+i,date1);}
   if(name1!=null && date1!=null){name1=name1.trim();
            if(name1==""){name1="?";}
			data+='gameimportname[igameimport]="'+name1+'";'+crlf;
			data+='gameimportdate[igameimport]="'+date1+'";'+crlf;
			data+='gameimportdata[igameimport]="'+data1+'";'+crlf;
   }
   }
link.href='data:text/gamesave;charset=utf-8,'+
           encodeURIComponent(data);
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
link=null;
}
function parseimport(text){
var crlf=String.fromCharCode(13)+String.fromCharCode(10);
var line=text.split(crlf);
//alert(line[0]);
gamesaveimportprefix="";
gameimportname=[];gameimportdate=[];gameimportdata=[];igameimport=0;
var msg="";
for(var i=0;i<line.length;i++){
	var test=0;
	var txt=line[i].substr(0,line[i].indexOf(";")+1);
	if(txt.indexOf("gamesaveimportprefix='")==0){test=1;}
	if(txt.indexOf("igameimport+=")==0){test=1;}
	if(txt.indexOf("gameimportname[igameimport]=")==0){test=1;}
	if(txt.indexOf("gameimportdate[igameimport]=")==0){test=1;}
	if(txt.indexOf("gameimportdata[igameimport]=")==0){test=1;}
	if(test==1){eval(txt);}//msg+=txt+crlf;}
}
//alert("ok end "+igameimport);
//alert(msg);
subimport2();
}
function subimport2(){
var crlf=String.fromCharCode(13)+String.fromCharCode(10);
 try{gamesaveimportprefix=gamesaveimportprefix;}
 catch(e){alert("error "+e);gamesaveimportprefix=null;}
 if(!gamesaveimportprefix){
	 alert('gamesaveimport_'+gameprefix+'.txt file not found !');
	 return;}
 if(gamesaveimportprefix!=gameprefix){
	 alert('bad gameprefix , found '+gamesaveimportprefix+' expected '+gameprefix);
	 return;}
var msg="data:"+crlf;
for(var i=1;i<ngamesave;i++){msg+=i+": "+gameimportname[i]+crlf;}
if(confirm("import data (will overwrite current values) ?"+crlf+msg)){
	importgamesave();
    gamesavequit=1;
	}
}
function importgamesave(){
if(!testlocalStorage()){alert("no html5 localStorage support on this browser !");
                        return;}
for(var i=1;i<ngamesave;i++){
 if(gameimportname[i] && gameimportdate[i] && gameimportdata[i]){
   localStorage.setItem(gameprefix+"gamesavename"+i,gameimportname[i]);
   localStorage.setItem(gameprefix+"gamesavedate"+i,gameimportdate[i]);
   localStorage.setItem(gameprefix+"gamesavedata"+i,gameimportdata[i]);}
}
}
var igamecheck=0;
function testgamecheck(){
var test=0;
for(var i=0;i<ngamesave;i++){
   if(document.getElementById("gamesave").children[4*i]){
      if(document.getElementById("gamesave").children[4*i].checked){
	     test=1;
		 if(i!=igamecheck){gameuncheck(igamecheck);igamecheck=i;}}}
}
if(test==0){igamecheck=0;gamesetcheck(0);}
}
function gamesetcheck(i){
   if(document.getElementById("gamesave").children[4*i]){
      document.getElementById("gamesave").children[4*i].checked=true;}
}
function gameuncheck(i){
   if(document.getElementById("gamesave").children[4*i]){
      document.getElementById("gamesave").children[4*i].checked=false;}
}
function cleargamecheck(){
for(var i=0;i<ngamesave;i++){gameuncheck(i);}
}
var gamereturndata=null;
function loopgamesave(){
   testgamecheck();
   if(gamesavequit==0){setTimeout("loopgamesave();",300);}
   else{//alert("bye "+igamecheck+"  "+igamesave);
        removeallelement();
        if(gamereturndata!=null){//alert(gamereturndata);
		     document.location.search=gamereturndata;}
        tgamesave=0;}
}
function subload(){
//alert(igamecheck+"  "+igamesave);
if(igamecheck==0){gamesavequit=1;return;}
if(confirm("load gamesave "+igamecheck+" ?")){
   gamereturndata=gamedata[igamecheck];
   gamesavequit=1;}
}
function subsave(){
//alert(igamecheck+"  "+igamesave);
if(igamecheck==0){
   var name=document.getElementById("save0text").value.trim();
   if(name==""){name="?";}
   if(igamesave>=ngamesave-1){alert("max "+ngamesave+" gamesaves !");}
   else{igamesave+=1;localStorage.setItem(gameprefix+"gamesavename"+igamesave,name);
        localStorage.setItem(gameprefix+"gamesavedate"+igamesave,datetime());
        localStorage.setItem(gameprefix+"gamesavedata"+igamesave,newgamedata);
        gamesavequit=1;}
}else if(confirm("write over gamesave "+igamecheck+" ?")){
   var name=document.getElementById("save0text").value.trim();
   if(name==""){name="?";}
   localStorage.setItem(gameprefix+"gamesavename"+igamecheck,name);
   localStorage.setItem(gameprefix+"gamesavedate"+igamecheck,datetime());
   localStorage.setItem(gameprefix+"gamesavedata"+igamecheck,newgamedata);
   gamesavequit=1;}
}
function subdelete(){
//alert("delete "+igamecheck+"  "+igamesave);
if(igamecheck==0){gamesavequit=1;return;}
if(confirm("delete gamesave "+igamecheck+" ?")){
   var i=igamecheck;
   for(var j=i;j<ngamesave-1;j++){
     if(localStorage.getItem(gameprefix+"gamesavename"+(j+1))!=null){
	   localStorage.setItem(gameprefix+"gamesavename"+j,localStorage.getItem(gameprefix+"gamesavename"+(j+1)));
       localStorage.setItem(gameprefix+"gamesavedate"+j,localStorage.getItem(gameprefix+"gamesavedate"+(j+1)));
       localStorage.setItem(gameprefix+"gamesavedata"+j,localStorage.getItem(gameprefix+"gamesavedata"+(j+1)));	   
	   i=j+1;
	 }else{break;}
   }
   localStorage.removeItem(gameprefix+"gamesavename"+i);
   localStorage.removeItem(gameprefix+"gamesavedate"+i);
   localStorage.removeItem(gameprefix+"gamesavedata"+i);
   igamesave-=1;
   gamesavequit=1;}

}
function subimport(){
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
}else{alert('The File APIs are not fully supported in this browser.');return;}
document.getElementById('gamesavefiles').click();
}
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    //alert(escape(files[0].name));
	var reader = new FileReader();
    reader.onload = (function(e) {
        parseimport(e.target.result);
      });
    reader.readAsText(files[0],'utf-8');
  }
document.getElementById('gamesavefiles').addEventListener('change', handleFileSelect, true);
//tgamesave=1;
//gamereturndata=null;
//initgamesave("my new game","my new gamedata");
//loopgamesave();
