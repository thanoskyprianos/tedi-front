export class UserModule {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string,
    public links: any[]) {
  }

  hideInformation(aboutMeToHide: string) : void {

    if (this.hasOwnProperty(aboutMeToHide))
    {
      (this as any)[aboutMeToHide] = null;
    }

  }

}
