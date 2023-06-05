localStorage.setItem("supabasekey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmbGh1cXF6am1na2Roamd4em5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE5MDE1NzIsImV4cCI6MTk3NzQ3NzU3Mn0.h8KOM1CCXPY80ImmmsrLmGp0Wib0z8C80KNFFGjzcn8");

localStorage.setItem("supabaseurl", "https://vflhuqqzjmgkdhjgxzni.supabase.co/");

const load_start = async function(){
  
  var url = localStorage.getItem("supabaseurl") + "rest/v1/rpc/start";
  
  fetch(url, {
    
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'apikey': localStorage.supabasekey },
  
  })  
  .then(response => response.json())
  .then(data => {
    load_scripts(data.scripts); 
     set_session(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });


}();

const load_scripts = function(json){
  
 
  
  if(window.location.hostname=='doctor8.app'){
   
    var url_js = localStorage.getItem("supabaseurl")+"storage/v1/object/public/js/all/"+json.js.production.uuid+".js";
    var url_css = localStorage.getItem("supabaseurl")+"storage/v1/object/public/css/all/"+json.css.production.uuid+".css";

  }else{

    var url_js = localStorage.getItem("supabaseurl")+"storage/v1/object/public/js/all/"+json.js.dev.uuid+".js";
    var url_css = localStorage.getItem("supabaseurl")+"storage/v1/object/public/css/all/"+json.css.dev.uuid+".css";
    
  }

  load_css(url_css);
  
  script = document.createElement("script");
  script.setAttribute("onload","load()");
  script.src = url_js;

  document.head.appendChild(script);



  Object.entries(json.js.third).forEach(([key, value]) => {
 
    let url_js = value.label;
    
    load_js(url_js);
    
  });

  Object.entries(json.css.third).forEach(([key, value]) => {
    
    let url_css = value.label;
    
    load_css(url_css);
    
  });

}

const load_css = function(url){
  
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
  
}

const load_js = function(url){
  
  script = document.createElement("script");
  script.src = url;
  document.head.appendChild(script);

}

const set_session = function(data){

  var text = [];
  var config = {};

  for (var [key, value] of Object.entries(data.suites_config)) {

    config[value.label] = value.url;

  }

  localStorage.config = JSON.stringify(config);

}