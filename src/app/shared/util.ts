import {Constant} from "./constant";

export class ApplicationUtils {
  public static displayPrice(price: number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price * 1000);
  }

  public static displayCalories(calories: number) {
    return `${calories + ' ' + Constant.CALORIES_UNIT}`;
  }
}
