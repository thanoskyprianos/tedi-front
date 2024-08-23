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

  toPlainObj(): any {
    return {...this};
  }
}

export class ProfileDataPrivacy {
  constructor(
    public professionalPositionPrivacy: Privacy | null,
    public employmentAgencyPrivacy: Privacy | null,
    public experiencePrivacy: Privacy | null,
    public educationPrivacy: Privacy | null,
    public skillsPrivacy: Privacy | null
  ) {
  }

  toPlainObj(): any {
    return {...this};
  }
}

export enum Privacy { PUBLIC = "PUBLIC", PRIVATE = "PRIVATE" }
