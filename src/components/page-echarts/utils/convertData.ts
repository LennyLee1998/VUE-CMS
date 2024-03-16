import { geoCoordMap } from "./geoCoordMap";
interface DataItem {
  name: string;
  value: number;
}
const convertData = function (data: DataItem[]) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};

export default convertData;
