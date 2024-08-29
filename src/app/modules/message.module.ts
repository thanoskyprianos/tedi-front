import {UserModule} from "./user.module";

export class MessageModule {
  constructor(
    public id: number,
    public message: string,
    public created: string,
    public sender: UserModule,
    public recipient: UserModule
  ) { }

  getCreationDate() {
    return new Date(this.created);
  }
}
