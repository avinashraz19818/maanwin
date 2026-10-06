import {
  b3 as defineComponent,
  u as useI18n,
  d as useWallet,
  be as createElementBlock,
  aV as openBlock,
  b9 as createElementVNode,
  b6 as createCommentVNode,
  bh as toDisplayString,
  r as ref,
  b7 as unref,
  bf as Fragment,
  cK as receivePackageReward,
  f as useToast,
  b5 as exportSfc,
} from "./index-D4BxQHrC.js";
import { c as formatCurrency } from "./currency-DTUBf2lI.js";

const sectionClass = { class: "weekPop" };
const titleClass = { class: "title" };
const textClass = { class: "text" };
const closedBoxClass = { key: 0, class: "boxImg" };
const openBoxClass = { key: 1, class: "boxImg" };
const amountClass = { class: "amount" };
const tipClass = { key: 0, class: "btnTip" };

const WeekCardPop = defineComponent({
  __name: "WeekCardPop",
  props: {
    popupInfo: {
      default: () => ({ dailyRewardAmount: 0, rewardDays: 0, cardType: 0 }),
    },
  },
  emits: ["receiveReward"],
  setup(props, { emit }) {
    const toast = useToast();
    const { t } = useI18n();
    const { getARGameAndPlatWalletList } = useWallet();
    const state = ref(1);

    const claim = async () => {
      const { cardType } = props.popupInfo;
      if (state.value === 2) {
        emit("receiveReward", cardType);
        return;
      }
      if (state.value === 3) return;
      state.value = 3;
      try {
        const { code } = await receivePackageReward({ cardType });
        if (code === 0) {
          state.value = 2;
          getARGameAndPlatWalletList();
          toast.success(t("t246"));
        } else {
          state.value = 1;
        }
      } catch (_) {
        state.value = 1;
      }
    };

    return (ctx, cache) => (
      openBlock(),
      createElementBlock(Fragment, null, [
        createElementVNode("section", sectionClass, [
          createElementVNode("div", null, [
            createElementVNode(
              "div",
              titleClass,
              toDisplayString(props.popupInfo.cardType === 1 ? ctx.$t("t1024") : ctx.$t("t1025")),
              1,
            ),
            createElementVNode(
              "p",
              textClass,
              toDisplayString(props.popupInfo.rewardDays) + " " + toDisplayString(ctx.$t("t1032")),
              1,
            ),
            state.value === 1
              ? (openBlock(), createElementBlock("div", closedBoxClass, [
                  ...(cache[0] || (cache[0] = [createElementVNode("div", { class: "boxGift boxSwing" }, null, -1)])),
                ]))
              : (openBlock(), createElementBlock("div", openBoxClass, [
                  cache[1] || (cache[1] = createElementVNode("div", { class: "gifBoxOpen" }, null, -1)),
                  createElementVNode("div", amountClass, toDisplayString(unref(formatCurrency)(props.popupInfo.dailyRewardAmount)), 1),
                ])),
          ]),
          state.value === 1
            ? (openBlock(), createElementBlock("div", tipClass, toDisplayString(ctx.$t("t1033")), 1))
            : createCommentVNode("", true),
        ]),
        createElementVNode("div", { class: "weekWindow", onClick: claim }),
      ], 64)
    );
  },
});

export default exportSfc(WeekCardPop, [["__scopeId", "data-v-9c805d22"]]);
