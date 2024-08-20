export class UserModule {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string,
    public _links: any) {
  }
}

export class ProfileData {
  constructor(
    public professionalPosition: string | null,
    public employmentAgency: string | null,
    public experience: string | null,
    public education: string | null,
    public skills: string | null
  ) {
  }
}
