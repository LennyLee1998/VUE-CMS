import { defineStore } from "pinia";
import {
  getAmountListData,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale,
  getGoodsAddressSale,
  getGoodsSaleTop10
} from "@/service/modules/main/analysis";
interface IState {
  amountList: any[];
  categoryGoodsCount: any[];
  categoryGoodsSale: any[];
  categoryGoodsFavor: any[];
  categoryTop10: any[];
  addressSale: any[];
}
const useAnalysisStore = defineStore("analysis", {
  state: (): IState => ({
    amountList: [],
    categoryGoodsCount: [],
    categoryGoodsSale: [],
    categoryGoodsFavor: [],
    categoryTop10: [],
    addressSale: []
  }),
  actions: {
    fetchAnalysisDataAction() {
      Promise.all([
        getAmountListData(),
        getCategoryGoodsCount(),
        getCategoryGoodsSale(),
        getCategoryGoodsFavor(),
        getGoodsSaleTop10(),
        getGoodsAddressSale()
      ]).then((res) => {
        const finalRes = res.map((item) => item.data);
        console.log(finalRes);
        this.amountList = finalRes[0];
        this.categoryGoodsCount = finalRes[1];
        this.categoryGoodsSale = finalRes[2];
        this.categoryGoodsFavor = finalRes[3];
        this.categoryTop10 = finalRes[4];
        this.addressSale = finalRes[5];
      });
    }
  }
});

export default useAnalysisStore;
