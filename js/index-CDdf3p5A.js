import{C as api,bx as fail}from"./index-xnhGKCfe.js";
function tok(){return localStorage.getItem("ar_p_t")||new URLSearchParams(location.search).get("token")||""}
async function submitLocal(extra={}){const orderNo=tok(),input=document.querySelector(".x-order-utr input, input[placeholder*='UTR' i], input[placeholder*='reference' i]"),utr=String(extra.utr||extra.utrNo||(input&&input.value)||"").trim();if(!utr)return{code:"0",msg:"Please enter a valid UTR / Reference number",data:false};try{await api.post("/Recharge/SubmitCertificate",{orderNo,rechargeNumber:orderNo,merchantOrderNo:orderNo,utr,...extra});return{code:"1",msg:"Succeed",data:true}}catch(e){fail((e&&e.msg)||"Please contact customer service.");return{code:"0",msg:(e&&e.msg)||"Fail",data:false}}}
async function noop(data={}){return{code:"1",msg:"Succeed",data:data||true}}
function customerService(e){return api.post("/CustomerService/GetCustomerService",e).catch(()=>({code:0,data:[]}))}
function cancellationReasonList(){return Promise.resolve({code:"1",data:[{id:1,reason:"I want to cancel"},{id:2,reason:"Payment problem"}]})}
export{customerService as C,noop as G,noop as K,noop as R,noop as S,cancellationReasonList as a,submitLocal as b,noop as c,noop as d,submitLocal as e,noop as f,submitLocal as g,submitLocal as h,api as i,noop as p,noop as s};
