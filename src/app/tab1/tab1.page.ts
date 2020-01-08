import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { AlertController } from '@ionic/angular';
import { compileNgModule } from '@angular/compiler';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  constructor(public router: Router, private crudService: CrudService,public alertController: AlertController) { }
  
  
  tuote: any;
  nimi: string;
  maara: any;
  sijainti: any;
  hallussa: boolean;

  ngOnInit() {

    this.crudService.read_prod().subscribe(data => {

      this.tuote = data.map(e => {
        return {
          id: e.payload.doc.id,
          nimi: e.payload.doc.data()['nimi'],
          maara: e.payload.doc.data()['maara'],
          sijainti: e.payload.doc.data()['sijainti'],
          hallussa: e.payload.doc.data()['hallussa'],

        };
      })
      this.tuote.sort( (a,b) => a.hallussa - b.hallussa)
    })
    
  }
  
  goToPage(page: string) {
    console.log(page);
    this.router.navigateByUrl(page);
  }

  async openAlert() {
    const alert = await this.alertController.create({
      header: 'Lisää tuote',
      inputs: [
        {
          name: 'nimi',
          type: 'text',
          value: this.nimi,
          placeholder: 'Nimi'
        },
        {
          name: 'maara',
          type: 'text',
          id: 'name2-id',
          value: this.maara,
          placeholder: 'Määrä'
        },
       
        
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            let tuote = {}
            tuote['nimi'] = data.nimi;
            tuote['maara'] = data.maara;
            tuote['hallussa'] = false;

            console.log(data)

            this.crudService.create_prod(tuote).then(resp => {
              console.log(resp)
            })
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  } 

  

  changeState(id) {
    let tuote = {}
    tuote['hallussa'] = true;
    this.crudService.update_prod(id, tuote).then(resp => {
      console.log(resp)
    })


  }

  backToList(id)  {
    let tuote = {}
    tuote['hallussa'] = false;
    this.crudService.update_prod(id , tuote).then(resp => {
      console.log(resp)
    })
  }

  backToLack(item) {
    let puute = {}
    puute['nimi'] = item.nimi;
    puute['maara'] = item.maara;
    this.crudService.create_lack(puute).then(resp => {
      console.log(resp)
      this.crudService.del_prod(item.id)
    })
  }

  delProd(slidingItem,id) {
   if(confirm('Tuote poistetaan listalta?')) {
     this.crudService.del_prod(id).then(resp => {
       console.log(resp)
     })
   }else {
    slidingItem.close();

   }
  }
}
