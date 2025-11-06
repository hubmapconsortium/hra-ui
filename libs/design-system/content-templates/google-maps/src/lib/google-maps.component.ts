import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  InjectionToken,
  input,
  PLATFORM_ID,
} from '@angular/core';
import { GoogleMap, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import { injectWindow } from '@hra-ui/common/injectors';

/**
 * Injection token for Google Maps library loader
 */
const GOOGLE_MAPS_LOADER = new InjectionToken<void>('Google Maps Loader', {
  providedIn: 'root',
  factory: () => {
    const document = inject(DOCUMENT);

    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }

    const window = injectWindow();
    if (window.google?.maps?.importLibrary !== undefined) {
      return;
    }

    const script = document.createElement('script');
    script.textContent = `
      (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=\`https://maps.\${c}apis.com/maps/api/js?\`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
        v: "weekly",
        key: ""
      });
    `;

    document.body.appendChild(script);
  },
});

/**
 * Google Maps wrapper component to load and display Google Maps.
 */
@Component({
  selector: 'hra-google-maps',
  imports: [GoogleMap, MapInfoWindow, MapAdvancedMarker],
  templateUrl: './google-maps.component.html',
  styleUrl: './google-maps.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class GoogleMapsComponent {
  readonly lat = input.required<number>();
  readonly lng = input.required<number>();
  readonly zoom = input<number>(10);
  protected readonly center = computed((): google.maps.LatLngLiteral => ({ lat: this.lat(), lng: this.lng() }));

  constructor() {
    inject(GOOGLE_MAPS_LOADER);
  }
}
