import { Component, OnInit } from '@angular/core';
import { ZENLESS_ZONE_ZERO_UID } from 'src/shared/constants/uid';

@Component({
  selector: 'app-zzz',
  standalone: true,
  templateUrl: './zzz.component.html',
  styleUrls: ['./zzz.component.css'],
})
export class ZzzComponent implements OnInit {
  protected readonly zzzUID = ZENLESS_ZONE_ZERO_UID;

  ngOnInit() {}
}
