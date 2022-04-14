import Taro, { EventChannel } from '@tarojs/taro';
import { isString } from '@/util/is';

export function useRoute() {
  const current = Taro.getCurrentInstance();
  if (!current?.router) throw new Error('getCurrentInstance().router is null');

  return new Route(current.router);
}

export function useRouter() {
  return new Router();
}

export class Route {
  private readonly route: RouterInfo;

  constructor(route: RouterInfo<Partial<Record<string, string>>>) {
    this.route = route;
  }

  /**
   * 页面路径
   */
  get path() {
   return this.route.path;
  }

  /**
   * 路由参数
   */
  get params() {
    return this.route.params;
  }

  get onReady() {
    return this.route.onReady;
  }

  get onHide() {
    return this.route.onHide;
  }

  get onShow() {
    return this.route.onShow;
  }

  get shareTicket() {
    return this.route.shareTicket;
  }

  get scene() {
    return this.route.scene;
  }
}

interface RouterInfo<TParams extends Partial<Record<string, string>> = Partial<Record<string, string>>> {
  /** 路由参数 */
  params: TParams

  /** 页面路径 */
  path: string

  onReady: string
  onHide: string
  onShow: string

  shareTicket: string | undefined
  scene: number | undefined
}


export class Router {


  get stack() {
   return  Taro.getCurrentPages().map(page => page.route);
  }

  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   * @param to
   */
  switchTab(to: RouteLocationRaw): Promise<TaroGeneral.CallbackResult> {
    const options = isString(to) ? { url: to } : { url: qs(to.path, to.params), events: to.events };

    return new Promise((resolve, reject) => {
      Taro.switchTab({
        ...options,
        fail: err => reject(err),
        success: success => resolve(success)
      }).then();
    });
  }

  /**
   * 关闭所有页面，打开到应用内的某个页面
   * @param to
   */
  reLaunch(to: RouteLocationRaw): Promise<TaroGeneral.CallbackResult> {
    const options = isString(to) ? { url: to } : { url: qs(to.path, to.params), events: to.events };

    return new Promise((resolve, reject) => {
      Taro.reLaunch({
        ...options,
        fail: err => reject(err),
        success: success => resolve(success)
      }).then();
    });
  }

  /**
   * 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
   * @param to 页面地址
   */
  redirectTo(to: RouteLocationRaw): Promise<TaroGeneral.CallbackResult> {
    const options = isString(to) ? { url: to } : { url: qs(to.path, to.params), events: to.events };

    return new Promise((resolve, reject) => {
      Taro.redirectTo({
        ...options,
        fail: err => reject(err),
        success: success => resolve(success)
      }).then();
    });
  }

  /**
   * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 Taro.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
   * @param to 页面地址
   * @returns
   */
  navigateTo(to: RouteLocationRaw): Promise<TaroGeneral.CallbackResult & { eventChannel: EventChannel }> {
    const options = isString(to) ? { url: to } : { url: qs(to.path, to.params), events: to.events };

    return new Promise((resolve, reject) => {
      Taro.navigateTo({
        ...options,
        fail: err => reject(err),
        success: success => resolve(success)
      }).then();
   });
  }

  /**
   * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。
   * @param delta 层级数
   */
  navigateBack(delta?: number) {
    return new Promise((resolve, reject) => {
      Taro.navigateBack({
        delta:delta || 1,
        fail: err => reject(err),
        success: success => resolve(success)
      }).then();
    });
  }
}



export declare type LocationParameterValue = string | null;

export declare type LocationParameterValueRaw = LocationParameterValue | number | undefined;

export declare type LocationParameterRaw = Record<string | number, LocationParameterValueRaw | LocationParameterValueRaw[]>;


export declare interface LocationAsPath {
  path: string;
}

export declare interface RouteParams {
  params?: LocationParameterRaw;
}

export declare interface RouteEvent {
 /**
  * 页面间通信接口，用于监听被打开页面发送到当前页面的数据。
  */
 events?: Record<string, Fn>
}


export declare  type RouteLocationRaw = string | (LocationAsPath & RouteParams & RouteEvent);

/**
 * 转换
 * @param uri
 * @param data
 */
 function qs(uri: string, data: Record<string, XOR<ValueType, Array<ValueType>>> = {}) {
  const keys = Object.keys(data || {});
  if (!keys.length) return uri;
  const joiner = uri.lastIndexOf('?') === -1 ? '?' : '&';
  return (
    uri +
    joiner +
    keys
      .map((item) => {
        if (data[item] === undefined || data[item] === null) {
          return '';
        }
        if (!(data[item] instanceof Array)) {
          return `${ item }=${ data[item] }`;
        }

        //  如果当前为数组,那么就解析数组参数
        //@ts-ignore
        if (!data[item]?.length) {
          return '';
        }
        // @ts-ignore
        const arrData: Array<string> = data[item];
        return arrData
          .map((d, i) => `${ item }[${ i }]=${ d }`)
          .filter((item) => item !== '')
          .join('&');
      })
      .filter((item) => item !== '')
      .join('&')
  );
}
