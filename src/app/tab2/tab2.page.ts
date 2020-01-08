import { Component,OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  puute: {} = []
  nimi: string;
  maara: string;


  constructor( private crudService: CrudService,public alertController: AlertController) {}


  ngOnInit() {
    this.crudService.read_lacks().subscribe(data => {
      this.puute = data.map(e => {
        return {
          id: e.payload.doc.id,
          nimi: e.payload.doc.data()['nimi'],
          maara: e.payload.doc.data()['maara'],

        }
      })
    })
  }

  async openAlert() {
    const alert = await this.alertController.create({
      header: 'Lisää puute',
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
          text: 'Peruuta',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            let puute = {}
            puute['nimi'] = data.nimi;
            puute['maara'] = data.maara;
            console.log(data)
            this.crudService.create_lack(puute).then(resp => {
              console.log(resp)
            })
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  } 

  moveToList(item) {
    let puute = {}
    puute['nimi'] = item.nimi
    puute['maara'] = item.maara
    puute['hallussa'] = false
    this.crudService.create_prod(puute).then(resp => {
      this.crudService.del_lack(item.id)
      console.log(resp)
    })
    
  }
  
delLack(id) {
  this.crudService.del_lack(id)
}
}
