import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TuotevalintaPage } from './tuotevalinta.page';

const routes: Routes = [
  {
    path: '',
    component: TuotevalintaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TuotevalintaPageRoutingModule {}
