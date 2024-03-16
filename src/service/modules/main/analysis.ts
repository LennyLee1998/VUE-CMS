import cmsRequest from "@/service";

export function getAmountListData() {
  return cmsRequest.get({
    url: "/goods/amount/list"
  });
}

export function getCategoryGoodsCount() {
  return cmsRequest.get({
    url: "/goods/category/count"
  });
}
export function getCategoryGoodsSale() {
  return cmsRequest.get({
    url: "/goods/category/sale"
  });
}
export function getCategoryGoodsFavor() {
  return cmsRequest.get({
    url: "/goods/category/favor"
  });
}
export function getGoodsSaleTop10() {
  return cmsRequest.get({
    url: "/goods/sale/top10"
  });
}
export function getGoodsAddressSale() {
  return cmsRequest.get({
    url: "/goods/address/sale"
  });
}
