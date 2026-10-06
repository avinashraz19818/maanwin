import{f as toast}from"./index-xnhGKCfe.js";
async function doCopy(text){
  text=String(text||"");
  if(!text){return false}
  try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);return true}}catch(e){}
  try{const ta=document.createElement("textarea");ta.value=text;ta.setAttribute("readonly","");ta.style.position="fixed";ta.style.left="-9999px";ta.style.top="0";document.body.appendChild(ta);ta.focus();ta.select();ta.setSelectionRange(0,ta.value.length);const ok=document.execCommand("copy");document.body.removeChild(ta);return !!ok}catch(e){return false}
}
function useCopy({source}={source:void 0}){const t=toast();return{text:source,copy:async(v)=>{const text=v||(source&&source.value)||"";const ok=await doCopy(text);ok?t.success("copy successful"):t.fail&&t.fail("copy failed");return ok},copied:{value:false},isSupported:{value:true}}}
export{useCopy as u};
