import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TuotevalintaPage } from './tuotevalinta.page';

describe('TuotevalintaPage', () => {
  let component: TuotevalintaPage;
  let fixture: ComponentFixture<TuotevalintaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuotevalintaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TuotevalintaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
