import {Component, Input, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import { UserSessionService} from "../../services/user-session.service";
import {UserFetcherService} from "../../services/user-fetcher.service";
import {ProfileData, ProfileDataPrivacy, Privacy} from "../../modules/user.module";
import {NgIf} from "@angular/common";
import {UserUpdaterService} from "../../services/user-updater.service";
import {lastValueFrom} from "rxjs";

// @ts-ignore
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})

export class AboutMeComponent implements OnInit {
  protected readonly Privacy = Privacy;

  @Input() professionalPosition: string = '';
  @Input() employmentAgency: string = '';
  @Input() experience: string = '';
  @Input() education: string = '';
  @Input() skills: string = '';

  @Input() professionalPositionPrivacy: Privacy | null = null;
  @Input() employmentAgencyPrivacy: Privacy | null = null;
  @Input() experiencePrivacy: Privacy | null = null;
  @Input() educationPrivacy: Privacy | null = null;
  @Input() skillsPrivacy: Privacy | null = null;

  placeHolders: ProfileData | undefined;

  showSuccessMessage: boolean = false;
  selectedFile: File | null = null;

  constructor(
    protected session: UserSessionService,
    private fetcher: UserFetcherService,
    private updater: UserUpdaterService,
  ) { }

  ngOnInit() {
    this.session.userObs.subscribe((x) => {
      if (x === 'ok') {
        const aboutMeUrl = this.session.user._links.info;
        this.fetcher.aboutMe(aboutMeUrl.href).subscribe({
          next: (res: any) => {
            this.placeHolders = res.body as ProfileData;
          }
        })
      }
    })
  }

  async onSubmitAboutMe(event: any) {
    await this.updateAboutMe();
    await this.updateAboutMePrivacy();
    this.updateAvatar();

    this.showSuccess();
    event.target.reset();
  }

  async updateAboutMe() {
    let newAboutMe = new ProfileData(
      this.professionalPosition,
      this.employmentAgency,
      this.experience,
      this.education,
      this.skills
    ).toPlainObj();

    Object.keys(newAboutMe)
      .forEach(k => // remove empty fields
        !newAboutMe[k] && delete newAboutMe[k]);

    // don't do unnecessary call if empty
    if (Object.keys(newAboutMe).length === 0) { return; }

    await lastValueFrom(this.updater
      .updateAboutMe(this.session.user.id, newAboutMe))
      .then((res: any) => {
        // update placeholders on the spot
        this.placeHolders = res.body as ProfileData
      });
  }

  async updateAboutMePrivacy() {
    let newAboutMePrivacy = new ProfileDataPrivacy(
      this.professionalPositionPrivacy,
      this.employmentAgencyPrivacy,
      this.experiencePrivacy,
      this.educationPrivacy,
      this.skillsPrivacy
    ).toPlainObj();

    Object.keys(newAboutMePrivacy)
      .forEach(k =>
        !newAboutMePrivacy[k] && delete newAboutMePrivacy[k]);

    if (Object.keys(newAboutMePrivacy).length === 0) { return; }

    await lastValueFrom(this.updater
      .updateAboutMePrivacy(this.session.user.id, newAboutMePrivacy))
      .then();
  }

  updateAvatar() {

  }

  showSuccess() {
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 2000);
  }
}
