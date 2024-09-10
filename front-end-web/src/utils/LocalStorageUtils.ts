class LocalStorageUtils {

    private static AUTH_TOKEN_KEY: string = "auth-token";
  
    static set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
  
    static get(key: string): string | null {
        return localStorage.getItem(key);
    }
  
    static getAuthToken(): string | null {
        return localStorage.getItem(this.AUTH_TOKEN_KEY);
    }
  
    static setAuthToken(token: string): void {
        localStorage.setItem(this.AUTH_TOKEN_KEY, token);
    }
  
    static remove(key: string): void {
        localStorage.removeItem(key);
    }
  
    static removeAuthToken(): void {
         localStorage.removeItem(this.AUTH_TOKEN_KEY);
    }
}

export default LocalStorageUtils;