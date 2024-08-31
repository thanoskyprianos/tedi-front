import {UserModule} from "./user.module";
import {PostModule} from "./post.module";
import {CommentModule} from "./comment.module";

export class ActivityModule {
  constructor(
    public id: number,
    public sender: UserModule,
    public receiver: UserModule,
    public read: boolean,
    public post: PostModule,
    public comment: CommentModule,
    public notificationType: "LIKE" |  "COMMENT" | "INTEREST",
    public _links: any
  ) {
  }
}
