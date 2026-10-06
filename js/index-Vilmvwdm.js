import{l as api}from"./index-D4BxQHrC.js";

const orderToken=()=>localStorage.getItem("ar_p_t")||new URLSearchParams(location.search).get("token")||"";
const ok=r=>!!r&&(r.code===0||r.code==="0"||r.code===1||r.code==="1"||r.result===true);
const message=(r,fallback="Request failed")=>r&&typeof r.msg==="string"&&r.msg?r.msg:fallback;

function normalize(row={}){
  const customer=typeof row.customerInfo==="string"?safeJson(row.customerInfo):row.customerInfo||{};
  const recharge=typeof row.rechargeInfo==="string"?safeJson(row.rechargeInfo):row.rechargeInfo||{};
  const state=String(row.rechargeState||row.status||"");
  const expires=Number(row.expiredTime||0);
  const seconds=expires?Math.max(0,Math.floor((expires-Date.now())/1000)):900;
  const orderNo=row.orderNo||row.rechargeNumber||orderToken();
  const upi=row.upiId||row.upi||customer.upiId||customer.upi||recharge.upiId||recharge.upi||"";
  return{
    ...row,
    merchantCode:"DHANIWIN",
    merchantName:"Dhani Win",
    merchantOrder:orderNo,
    platformOrder:orderNo,
    buyOrderNo:orderNo,
    tid:orderNo,
    amount:Number(row.amount||row.rechargeAmount||0),
    randomAmount:0,
    paymentExpireTime:seconds,
    orderStatus:state==="Payed"?"2":state==="Cancel"?"3":"1",
    upiId:upi,
    utr:row.utr||row.utrNo||"",
    hideUpiCopyButton:0,
    isPhonepeWakeUp:0,
    returnUrl:"/wallet/recharge",
    qrCodeUrl:row.qrCodeUrl||row.qrCode||row.qrcode||customer.qrCodeUrl||customer.qrCode||recharge.qrCodeUrl||recharge.qrCode||""
  };
}

function safeJson(value){try{return JSON.parse(value||"{}")}catch{return{}}}

async function local(path,data={}){
  try{return await api.post(path,data)}catch(error){return{code:-1,msg:error&&error.msg?error.msg:"Network error",data:null}}
}

async function detail(extra={}){
  const orderNo=extra.orderNo||extra.rechargeNumber||extra.merchantOrderNo||extra.token||orderToken();
  const result=await local("/Recharge/GetLocalRechargeOrderDetail",{...extra,orderNo,rechargeNumber:orderNo,merchantOrderNo:orderNo});
  return ok(result)&&result.data?{code:"1",msg:message(result,"Success"),data:normalize(result.data)}:{code:"0",msg:message(result,"Recharge order not found"),data:null};
}

function readUtr(extra={}){
  if(extra.utr||extra.utrNo||extra.transactionId)return String(extra.utr||extra.utrNo||extra.transactionId).trim();
  const input=document.querySelector(".x-order-utr input, input[placeholder*='UTR' i], input[placeholder*='reference' i]");
  return input&&input.value?String(input.value).trim():"";
}

async function submit(extra={}){
  const orderNo=extra.orderNo||extra.rechargeNumber||extra.merchantOrderNo||orderToken();
  const utr=readUtr(extra);
  if(!utr)return{code:"0",msg:"Please enter a valid UTR / Reference number",data:false};
  const result=await local("/Recharge/SubmitCertificate",{...extra,orderNo,rechargeNumber:orderNo,merchantOrderNo:orderNo,utr});
  return ok(result)?{code:"1",msg:message(result,"Submitted"),data:result.data||true}:{code:"0",msg:message(result),data:false};
}

async function cancel(extra={}){
  const orderNo=extra.orderNo||extra.rechargeNumber||extra.merchantOrderNo||orderToken();
  const result=await local("/Recharge/CancelLocalRecharge",{...extra,orderNo,rechargeNumber:orderNo});
  return ok(result)?{code:"1",msg:message(result,"Cancelled"),data:true}:{code:"0",msg:message(result),data:false};
}

const customerService=async()=>({code:"1",msg:"Success",data:{serviceSystemUrl:"/#/workOrder"}});
const appealExist=async()=>({code:"1",msg:"Success",data:{isLink:false,orderStatus:0,existAppeal:false,isAutoFlag:true,url:""}});
const banks=async()=>({code:"1",msg:"Success",data:[{bankName:"State Bank of India",bankCode:"sbi"},{bankName:"HDFC Bank",bankCode:"hdfc"},{bankName:"ICICI Bank",bankCode:"icici"},{bankName:"Axis Bank",bankCode:"axis"},{bankName:"Airtel Payments Bank",bankCode:"airtel"}]});
const otpUnavailable=async()=>({code:"0",msg:"OTP verification is not configured. Please use the in-app work order.",data:false});
const success=async data=>({code:"1",msg:"Success",data:data||true});
const reasons=async()=>({code:"1",msg:"Success",data:[{id:1,reason:"I want to cancel"},{id:2,reason:"Payment problem"},{id:3,reason:"Created by mistake"}]});

const transport={
  post(path,data={}){
    if(String(path).includes("generateFileUrl"))return Promise.resolve({code:"0",msg:"Upload proof directly from the recharge order page",data:null});
    return local(path,data);
  },
  put(){return Promise.resolve(false)},
  get(path,{params}={}){return local(path,params||{})}
};

export{customerService as C,banks as G,otpUnavailable as K,appealExist as R,success as S,reasons as a,submit as b,cancel as c,otpUnavailable as d,submit as e,detail as f,detail as g,submit as h,transport as i,detail as p,success as s};
