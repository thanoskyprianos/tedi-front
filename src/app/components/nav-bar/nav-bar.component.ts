import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import {RouterLink} from "@angular/router";
import {UserSessionService} from "../../services/user-session.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf, CommonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css', './nav-bar-net.css']
})
export class NavBarComponent implements OnInit{
  isNetworkPage: boolean = false;
  isMessagesPage: boolean = false;
  isSettingsPage: boolean = false;
  isAdsPage: boolean = false;
  isHomePage: boolean = false;
  isNotificationPage: boolean = false;
  isProfilePage: boolean = false;

  constructor(protected session: UserSessionService
    ,private router: Router
  ) { this.setPage(); } // sets page on refresh

  logout() {
    this.session.logout().subscribe(() => {
      this.session.removeToken();
      location.reload();
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setPage();
      }
    });

    const notificationIcon = document.getElementById('not')
    if (!notificationIcon) return;

    this.session.userObs.subscribe({
      next: (x) => {
        if (x === 'ok') {
          if (this.session.user._links.received) {
            notificationIcon.id = 'not-has'
          } else {
            notificationIcon.id = 'not'
          }
        }
      }
    })
  }

  setPage() {
    this.isNetworkPage = this.router.url.includes('/network-page');
    this.isMessagesPage = this.router.url.includes('/messages-page');
    this.isSettingsPage = this.router.url.includes('/settings-page');
    this.isAdsPage = this.router.url.includes('/ads-page');
    this.isHomePage = this.router.url.includes('/home-page');
    this.isNotificationPage = this.router.url.includes('/notification-page');
    this.isProfilePage = this.router.url.includes('/profile-page');
  }
}
