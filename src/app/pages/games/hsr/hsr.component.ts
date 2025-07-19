import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { BackgroundService } from 'src/app/services/background.service';
import { BACKGROUND_HSR_PATH } from 'src/app/shared/constants/images';
import { HONKAI_STAR_RAIL_UID } from 'src/app/shared/constants/uid';
import { copyToClipboard } from 'src/app/shared/utils/copy-to-clipboard';

@Component({
  selector: 'app-hsr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hsr.component.html',
  styleUrls: ['./hsr.component.css'],
})
export class HsrComponent implements OnInit {
  @Input() value = '';
  protected isCopied = false;
  protected readonly hsrUID = HONKAI_STAR_RAIL_UID;
  private readonly backgroundService = inject(BackgroundService);

  ngOnInit() {
    this.backgroundService.setBackgroundImage(BACKGROUND_HSR_PATH);
  }

  async onCopy() {
    const success = await copyToClipboard(HONKAI_STAR_RAIL_UID);
    if (success) {
      this.isCopied = true;
      setTimeout(() => (this.isCopied = false), 2000);
    }
  }
}
