import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TuotevalintaPageRoutingModule } from './tuotevalinta-routing.module';

import { TuotevalintaPage } from './tuotevalinta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TuotevalintaPageRoutingModule
  ],
  declarations: [TuotevalintaPage]
})
export class TuotevalintaPageModule {}
