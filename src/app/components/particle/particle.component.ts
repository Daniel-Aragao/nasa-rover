import { Component, NgZone, OnInit } from '@angular/core';

declare var particlesJS: {
  load: (elementId: string, configPath: string, callback: () => void) => void;
};

@Component({
  selector: 'app-particle',
  templateUrl: './particle.component.html',
  styleUrls: ['./particle.component.scss'],
})
export class ParticleComponent implements OnInit {
  constructor(private _ngZone: NgZone) {}

  ngOnInit(): void {
    this._ngZone.runOutsideAngular(() => {
      particlesJS.load(
        'particle-container',
        'assets/particlesjs-config.json',
        () => {
          console.log('callback - particles.js config loaded');
        }
      );
    });
  }
}
