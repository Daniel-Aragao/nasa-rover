import { Component, OnInit } from '@angular/core';

declare var particlesJS: {
  load: (elementId: string, configPath: string, callback: () => void) => void;
};

@Component({
  selector: 'app-particle',
  templateUrl: './particle.component.html',
  styleUrls: ['./particle.component.scss'],
})
export class ParticleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    particlesJS.load(
      'particle-container',
      'assets/particlesjs-config.json',
      function () {
        console.log('callback - particles.js config loaded');
      }
    );
  }
}
