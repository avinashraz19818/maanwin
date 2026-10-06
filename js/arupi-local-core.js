function createLocalArUpi(api,ref,computed){
  const orderToken=()=>localStorage.getItem("ar_p_t")||new URLSearchParams(location.search).get("token")||"";
  const ok=r=>!!r&&(r.code===0||r.code==="0"||r.code===1||r.code==="1"||r.result===true);
  const proxyRef=value=>{const holder=ref(value);return new Proxy({}, {get:(_,key)=>holder.value[key],set:(_,key,next)=>(holder.value[key]=next,true)})};
  const safeJson=value=>{try{return JSON.parse(value||"{}")}catch{return{}}};
  const money=value=>"₹"+Number(value||0).toFixed(2);
  const time=value=>{const seconds=Math.max(0,Number(value||0)),minutes=Math.floor(seconds/60);return String(minutes).padStart(2,"0")+":"+String(Math.floor(seconds%60)).padStart(2,"0")};
  const local=async(path,data={})=>{try{return await api.post(path,data)}catch(error){return{code:-1,msg:error&&error.msg?error.msg:"Network error",data:null}}};

  function normalize(row={}){
    const customer=typeof row.customerInfo==="string"?safeJson(row.customerInfo):row.customerInfo||{};
    const recharge=typeof row.rechargeInfo==="string"?safeJson(row.rechargeInfo):row.rechargeInfo||{};
    const expires=Number(row.expiredTime||0);
    const orderNo=row.orderNo||row.rechargeNumber||orderToken();
    const upi=row.upiId||row.upi||customer.upiId||customer.upi||recharge.upiId||recharge.upi||"";
    return{...row,merchantOrder:orderNo,platformOrder:orderNo,buyOrderNo:orderNo,tid:orderNo,amount:Number(row.amount||row.rechargeAmount||0),randomAmount:0,paymentExpireTime:expires?Math.max(0,Math.floor((expires-Date.now())/1000)):900,upiId:upi,utr:row.utr||row.utrNo||"",hideUpiCopyButton:0,isPhonepeWakeUp:0,qrCodeUrl:row.qrCodeUrl||row.qrCode||row.qrcode||customer.qrCodeUrl||customer.qrCode||recharge.qrCodeUrl||recharge.qrCode||""};
  }

  return function useArUpi(){
    const pageData=proxyRef({type:0,info:{amount:0,paymentExpireTime:900,qrCodeUrl:"",payUrl:""}});
    const from=proxyRef({checked:-1,text:""});
    const appealPageData=proxyRef({bankList:[],pageId:1,msg:0});
    const fromData=proxyRef({upiName:"",upiId:"",verificationCode:"",bankCardNumber:"",bankCardOwner:"",bankCode:"",bankName:"",email:"",ifscCode:"",mobileNumber:"",type:3,utrVal:""});
    const qrcode=ref(""),qrCodeUrl=ref(""),utrVal=ref(""),reasonList=ref([]),confirmShow=ref(false),handleToPayType=ref(""),show=ref(false),arupiTips=ref(false),arupiTime=ref(3),TipName=ref(""),fileListImg=ref([]),existAppealUtr=ref(false),isLink=ref(false),updateImg=ref(""),smgFun=ref(null);
    const payList=[{name:"PhonePe",icon:"icon/PhonePe",url:"phonepe://pay"},{name:"Paytm",icon:"icon/Paytm",url:"paytmmp://cash_wallet"}];
    const payableAmount=computed(()=>Math.max(0,Number(pageData.info.amount||0)-Number(pageData.info.randomAmount||0)));
    const hasBonus=computed(()=>Number(pageData.info.randomAmount||0)>0);
    const isUtr=computed(()=>!!(pageData.info.utr||utrVal.value));
    const token=orderToken();

    async function getInfo(){
      const orderNo=orderToken();
      const result=await local("/Recharge/GetLocalRechargeOrderDetail",{orderNo,rechargeNumber:orderNo,merchantOrderNo:orderNo});
      if(ok(result)&&result.data){
        const info=normalize(result.data),state=String(info.rechargeState||info.status||"");
        pageData.info=info;
        pageData.type=state==="Cancel"?1:(state==="PendingReview"||state==="Payed"?3:0);
        qrcode.value=info.qrCodeUrl||"";
        qrCodeUrl.value=qrcode.value;
        if(info.utr)utrVal.value=info.utr;
      }else pageData.type=1;
      return result;
    }

    function getText(event){from.text=event&&event.target?event.target.value:String(event||"")}
    function getChecked(value){from.checked=value}
    function handleToPay(item){const url=pageData.info.payUrl||"";if(url.startsWith("upi:"))location.href=url}
    function handleToPaytmmp(item){handleToPayType.value=item&&item.name?item.name:"";TipName.value=handleToPayType.value;handleToPay(item)}
    async function getCancellationReasonList(){reasonList.value=[{id:1,reason:"I want to cancel"},{id:2,reason:"Payment problem"},{id:3,reason:"Created by mistake"}];return reasonList.value}
    async function submitCancel(){const orderNo=orderToken(),result=await local("/Recharge/CancelLocalRecharge",{orderNo,rechargeNumber:orderNo,reason:from.text||"cancel"});if(ok(result)){confirmShow.value=false;show.value=false;pageData.type=1}return result}
    async function submit(){const orderNo=orderToken(),utr=String(utrVal.value||"").trim();if(!utr)return{code:-1,msg:"Please enter a valid UTR / Reference number"};const result=await local("/Recharge/SubmitCertificate",{orderNo,rechargeNumber:orderNo,merchantOrderNo:orderNo,utr});if(ok(result)){pageData.type=3;pageData.info.utr=utr}return result}
    async function onPaste(){try{utrVal.value=await navigator.clipboard.readText()||utrVal.value}catch{}}
    function handleToInput(){pageData.type=4;confirmShow.value=false}
    function onClick(){history.length>1?history.back():location.assign("/wallet/recharge")}
    function onSelect(bank){fromData.bankName=bank&&bank.bankName||"";fromData.bankCode=bank&&bank.bankCode||"";appealPageData.pageId=2}
    async function getKycBankList(){appealPageData.bankList=[{bankName:"State Bank of India",bankCode:"sbi"},{bankName:"HDFC Bank",bankCode:"hdfc"},{bankName:"ICICI Bank",bankCode:"icici"},{bankName:"Axis Bank",bankCode:"axis"}];return appealPageData.bankList}
    async function getDetail(){existAppealUtr.value=false;isLink.value=false;return true}
    function support(){location.assign("/#/workOrder")}
    const noop=()=>{};
    return{formatUpiTime:time,getFormatAmount:money,qrcode,qrCodeUrl,getInfo,getText,getChecked,reasonList,confirmShow,payList,from,handleToPayType,handleToPaytmmp,handleToPay,getCancellationReasonList,submitCancel,onClick,stopFun:noop,pageData,pageView:noop,pageLeve:noop,pageClick:noop,utrVal,payableAmount,hasBonus,arupiTips,arupiTime,show,onPaste,isUtr,handleToInput,submit,TipName,getDetail,getKycBankList,onSelect,appealPageData,fromData,onRegister:support,onRegister2:support,onSubmit:support,existAppealUtr,isLink,fileListImg,token,updateImg,smgFun,afterRead:async()=>false,getFileType:()=>"",getFileNameUUID:()=>String(Date.now()),maskEmail:value=>String(value||"").replace(/^[^@]+/,"***")};
  };
}

const unavailableUpload=async()=>({code:-1,msg:"Use the recharge order work order to attach payment proof",data:null});
export{createLocalArUpi as c,unavailableUpload as g,unavailableUpload as u};
