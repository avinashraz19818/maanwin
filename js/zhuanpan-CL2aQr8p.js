import{b7 as defineComponent,aY as openBlock,aT as createElementBlock}from"./index-xnhGKCfe.js";

const ZhuanpanIcon = defineComponent({
  name: "ZhuanpanIcon",
  props: {
    width: [Number, String],
    height: [Number, String],
    src: String,
    blurSrc: String
  },
  setup(props) {
    return () => {
      // Direct render of the tabbar turntable icon using local working path
      return (openBlock(), createElementBlock("img", {
        src: "/assets/darkRed/tabbar/turntable_home-ee908e6a.webp",
        width: props.width || 145,
        height: props.height || 145,
        style: "display: block; width: 100%; height: 100%; object-fit: contain; transform: scale(1.15);"
      }));
    };
  }
});

const I = ZhuanpanIcon;
const a = "turntable_home";
const z = "turntable_home";

export default ZhuanpanIcon;
export {I, a, z};
