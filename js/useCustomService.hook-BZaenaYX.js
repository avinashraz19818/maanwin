function useCustomService(){
  const LiveChatWidget={value:null};
  const open=async()=>{location.assign("/#/workOrder");return true};
  return{LiveChatWidget,onReady:async()=>true,handleOpen:open,handleLoginOpen:open};
}
export{useCustomService as u};
