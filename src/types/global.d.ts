declare module "js-cookie" {
    interface CookieAttributes {
      expires?: number | Date;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: 'strict' | 'lax' | 'none';
      [property: string]: string | number | boolean | Date | undefined; // Replace `any` with specific types
    }
  
    function set(name: string, value: string, options?: CookieAttributes): void;
    function get(name: string): string | undefined;
    function remove(name: string, options?: CookieAttributes): void;
  
    const Cookies: {
      set: typeof set;
      get: typeof get;
      remove: typeof remove;
    };
  
    export default Cookies;
  }
  