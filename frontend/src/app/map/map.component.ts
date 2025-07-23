import {  Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  template: `<div id="map" style="height: 300px; width: 100%;"></div>`
})
export class MapComponent implements AfterViewInit {

  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {

    this.map = L.map('map').setView([44.7866, 20.4489], 13); // Београд

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

    L.marker([44.7866, 20.4489], {icon: customIcon})
      .addTo(this.map)
      .openPopup();
  }

}
