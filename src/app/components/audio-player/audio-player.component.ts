import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.css'
})
export class AudioPlayerComponent {
  @Input() src: string = '';
  @Input() type: string = '';
  @Output() loading: EventEmitter<any> = new EventEmitter();

  playing: boolean = false;
  muted: boolean = false;

  volume: number = 1;

  currentTime: number = 0;
  currentTimeStr: string = '';
  durationStr: string = '';
  maxDuration: number = 0;

  checkOverflow() {
    this.loading.emit(true);
  }

  playAudio() {
    const audio = document.querySelector(`[src="${this.src}"]`) as HTMLAudioElement;
    if (!audio) return;

    audio.play().then(() => {
      this.playing = true;
    })
  }

  pauseAudio() {
    const audio = document.querySelector(`[src="${this.src}"]`) as HTMLAudioElement;
    if (!audio) return;

    audio.pause();
    this.playing = false;
  }

  changeVolume(event: any) {
    const audio = document.querySelector(`[src="${this.src}"]`) as HTMLAudioElement;
    if (!audio) return;

    audio.volume = event.target.value / 100;
    this.volume = event.target.value / 100;

    this.muted = this.volume == 0;
  }

  mute() {
    const audio = document.querySelector(`[src="${this.src}"]`) as HTMLAudioElement;
    if (!audio) return;

    this.muted = true;
    audio.volume = 0;
  }

  unmute() {
    const audio = document.querySelector(`[src="${this.src}"]`) as HTMLAudioElement;
    if (!audio) return;

    this.muted = false;
    audio.volume = this.volume;
  }

  timeUpdated(event: any) {
    this.currentTime = event.target.currentTime;
    this.currentTimeStr = this.getTimeString(this.currentTime);
    this.durationStr = this.getTimeString(event.target.duration);
    this.maxDuration = event.target.duration;
  }

  getTimeString(sec: number | undefined): string {
    if (!sec) {
      return "00:00:00"
    }

    let hours: number | string   = Math.floor(sec / 3600); // get hours
    let minutes: number | string = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds: number | string = Math.floor(sec - (hours * 3600) - (minutes * 60)); //  get seconds


    if (hours < 10) { hours = "0" + hours + ":"; }
    else { hours = hours + ":"; }

    if (minutes < 10) { minutes = "0" + minutes + ":"; }
    else { minutes = minutes + ":"}

    if (seconds < 10) { seconds = "0" + seconds; }

    return hours + minutes + seconds;
  }

  changeTime(event: any) {
    const audio = document.querySelector(`[src="${this.src}"]`) as HTMLAudioElement;
    if (!audio) return;

    audio.currentTime = event.target.value;
  }
}
