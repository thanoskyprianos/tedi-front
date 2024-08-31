import {Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {UserModule} from "../../modules/user.module";
import {NgIf} from "@angular/common";
import {UserFetcherService} from "../../services/user-fetcher.service";
import {ConnectionService} from "../../services/connection.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent implements OnChanges, OnDestroy {
  @Input() user!: UserModule;
  avatarUrl!: string;
  type: CardType | undefined;

  constructor(
    private fetcher: UserFetcherService,
    private connection: ConnectionService,
    private host: ElementRef,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'].firstChange && this.user) {
      const url1 = this.user._links.avatar;

      this.fetcher.avatar(url1.href).subscribe({
        next: (res: any) => {
          if (res.status === 200) {
            this.displayAvatar(res.body);
          }
        },
        error: (err: any) => { console.log(err); }
      })

      const acceptUrl = this.user._links.accept;
      const addUrl = this.user._links.add;
      const cancelUrl = this.user._links.cancel;
      const removeUrl = this.user._links.remove;

      this.type = acceptUrl ?
          CardType.REQUEST : addUrl ?
          CardType.ADD : cancelUrl || removeUrl?
          CardType.CANCEL : undefined;
    }
  }

  ngOnDestroy() {
    URL.revokeObjectURL(this.avatarUrl);
  }

  displayAvatar(avatar: Blob) {
    this.avatarUrl = URL.createObjectURL(avatar);
  }

  accept() {
    const url = this.user._links.accept;
    if (!url) return;

    this.connection.accept(url.href).subscribe({
      next: (res) => {
        this.host.nativeElement.remove();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  reject() {
    const url = this.user._links.reject;
    if (!url) return;

    this.connection.reject(url.href).subscribe({
      next: (res) => {
        this.host.nativeElement.remove();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  add() {
    const url = this.user._links.add;
    if (!url) return;

    this.connection.add(url.href).subscribe({
      next: (res) => {
        this.type = CardType.CANCEL;
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  cancel() {
    const cancelUrl = this.user._links.cancel;
    const removeUrl = this.user._links.remove;

    const url = cancelUrl ? cancelUrl : removeUrl;
    if (!url) return;

    this.connection.cancel(url.href).subscribe({
      next: (res) => {
        this.type = CardType.ADD;
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  protected readonly CardType = CardType;
}

export enum CardType {
  REQUEST, ADD, CANCEL, REMOVE
}
