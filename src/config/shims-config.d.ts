declare type Configuration = Readonly<{
  APP_NAME: string;
  APP_LOGO: string;
  APP_VERSION: string;

  /**
   * 静态文件地址
   */
  FILE_BASE_URL: string

  /**
   * api base url
   */
  API_BASE_URL: string;

  UPLOAD_BASE_URL: string;
}>
