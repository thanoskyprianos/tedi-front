export class UserModule {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string,
    public _links: any[]) {
  }
}
