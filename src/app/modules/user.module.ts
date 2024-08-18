export class UserModule {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string,
    public xpInfo : string,
    public edInfo : string,
    public skInfo : string,
    public _links: any) {
  }


}
