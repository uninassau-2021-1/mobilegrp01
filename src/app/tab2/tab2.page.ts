import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViacepProvider } from 'src/providers/viacep/viacep';

declare var google: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  
  map: any;
  cep: String = '';
  endereco: any = [];
  vazio = '';
  coordenates:any = {};

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(public navCtrl: NavController, private viacep: ViacepProvider, public http: HttpClient) {}

  getEndereco(ev){
    this.cep = ev.target.value;

    if(this.cep.length > 7){
      this.viacep.callService(this.cep.trim())
      .subscribe(
          data =>{
            this.endereco = data;
            let lugar: any = [];
            lugar.push(data.logradouro);
            // lugar.push(data.bairro);
            lugar.push(data.localidade);
            // lugar.push(data.cep);
            // lugar.push(data.uf);


            this.getCoordenates(lugar.join(" "));
          }
      );
    }
  }

  getCoordenates(endereco){
    endereco = window.encodeURIComponent(endereco);
    
    let url = `https://nominatim.openstreetmap.org/search?q=${endereco}&format=json&polygon=1&addressdetails=1`;

    this.http.get(url).subscribe((data:any)=>{
      data = data[0];
      this.coordenates = { lat: parseFloat(data.lat), lng: parseFloat(data.lon) };
      this.initMap(this.coordenates);
    })
  }

  initMap(coordenates){

    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 15,
        center: coordenates,
      }
    );

    const marker = new google.maps.Marker({
      position: coordenates,
      map: map,
    });
  }
}
