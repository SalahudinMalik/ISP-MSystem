import { Component, ViewChild, OnInit } from '@angular/core';
import { DrawingManager } from '@ngui/map';
import { LatLng, LatLngLiteral, PolyMouseEvent } from '@agm/core';

@Component({
  selector: 'ngx-cov',
  templateUrl: './cov.component.html',
  styleUrls: ['./cov.component.scss']
})
export class CovComponent implements OnInit {

  code: string;
  selectedOverlay: any;
  @ViewChild(DrawingManager) drawingManager: DrawingManager;

  // lat: number = 33.30;
  // lng: number = 45.300;
  // zoom: number = 10;
  // paths: Array<LatLngLiteral> = [
  //   { lat: 0,  lng: 10 },
  //   { lat: 0,  lng: 20 },
  //   { lat: 10, lng: 20 },
  //   { lat: 10, lng: 10 },
  //   { lat: 0,  lng: 10 }
  // ]

  constructor() { }

  ngOnInit() {
    this.drawingManager['initialized$'].subscribe(dm => {
      google.maps.event.addListener(dm, 'overlaycomplete', event => {
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          dm.setDrawingMode(null);
          google.maps.event.addListener(event.overlay, 'click', e => {
            this.selectedOverlay = event.overlay;
            this.selectedOverlay.setEditable(true);
          });
          this.selectedOverlay = event.overlay;
        }
      });
    });
  }
  deleteSelectedOverlay() {
    if (this.selectedOverlay) {
      this.selectedOverlay.setMap(null);
      delete this.selectedOverlay;
    }
  }
}
