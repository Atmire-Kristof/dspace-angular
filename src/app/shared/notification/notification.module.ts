import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { NotificationEffects } from './notification.effects';

const effects = [
  NotificationEffects
];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    NotificationComponent
  ],
  providers: [
    NotificationService
  ],
  exports: [
    NotificationComponent
  ]
})
export class NotificationModule {
}
