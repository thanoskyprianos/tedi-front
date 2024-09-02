import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserFetcherService} from "../../services/user-fetcher.service";
import {UserModule} from "../../modules/user.module";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import * as xml from "js2xmlparser";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit, OnDestroy {
  users!: UserModule[];
  avatars: string[] = [];

  constructor(
    private fetcher: UserFetcherService,
  ) {
  }

  ngOnInit() {
    this.fetcher.adminGetUsers().subscribe({
      next: (res: any) => {
        this.users = res.body._embedded.userList as UserModule[]
        this.users.sort((a, b) => a.firstName.localeCompare(b.firstName));

        this.getAvatars();
      },
      error: err => console.log(err),
    })
  }

  ngOnDestroy(): void {
    this.avatars.forEach(avatar => {
      URL.revokeObjectURL(avatar);
    })
  }

  getAvatars() {
    this.users!.forEach((user: UserModule) => {
      const avatarUrl = user._links.avatar;
      if (avatarUrl) {
        this.fetcher.avatar(avatarUrl.href).subscribe({
          next: (res: any) => {
            this.avatars[user.id] = URL.createObjectURL(res.body);
          }
        })
      }
    })
  }

  getJSON() {
    const checked = this.getCheckedUsers();
    if (checked.length === 0) return;

    this.fetcher.adminGetUsersByList(checked).subscribe({
      next: (res: any) => {
        const data = res.body;
        const blob = new Blob([JSON.stringify(data, null, "\t")], { type: "application/json" });
        const el = document.createElement("a");
        el.href = URL.createObjectURL(blob);
        el.download = "users.json";
        el.click();
      }
    });
  }

  getXML() {
    const checked = this.getCheckedUsers();
    if (checked.length === 0) return;

    this.fetcher.adminGetUsersByList(checked).subscribe({
      next: (res: any) => {
        const data = xml.parse("_embedded", res.body._embedded);
        const blob = new Blob([data], { type: "application/xml" });
        const el = document.createElement("a");
        el.href = URL.createObjectURL(blob);
        el.download = "users.xml";
        el.click();
      }
    });
  }

  getCheckedUsers() {
    // checkbox name saves the user id
    return Array.from(
      document
        .querySelectorAll('input[type=checkbox]:checked'))
        .map(el => parseInt(el.getAttribute('name')!));
  }

  filterUsers(event: any) {
    const users = document.getElementsByClassName('user');

    Array.from(users)!.forEach(_user => {
      const user = _user as HTMLElement

      const name = _user.querySelector('.details > p');
      if (name!.innerHTML.includes(event.target.value)) {
        user.style.display = 'flex';
      } else {
        user.style.display = 'none';
      }
    })
  }
}
