import {  Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  template: `<div id="map" style="height: 300px; width: 100%;"></div>`
})
export class MapComponent implements AfterViewInit, OnChanges {

  @Input() coordinates: [number, number] = [44.7866, 20.4489]

  private map!: L.Map;
  private marker!: L.Marker;

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['coordinates'] && this.map) {
      this.updateMarkerAndView();
    }
  }

  private initMap(): void {

    this.map = L.map('map').setView(this.coordinates, 13); // Београд

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const customIcon = L.divIcon({
      html: '<span style="font-size: 40px;">📌</span>',
      className: 'custom-pin-icon',
      iconSize: [40, 40],
      iconAnchor: [0, 40]
    });

    this.marker = L.marker(this.coordinates, { icon: customIcon }).addTo(this.map);
  }

  private updateMarkerAndView(): void {
    this.marker.setLatLng(this.coordinates);
    this.map.setView(this.coordinates, 14);
  }

}
