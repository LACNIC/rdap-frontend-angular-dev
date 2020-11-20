import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { EmbedPageIframeCodeService } from '../../services/embed-page-iframe-code.service';


@Component({
  selector: 'app-embed-page-iframe-code-component',
  templateUrl: 'embed-page-iframe-code.component.html',
  styleUrls: ['./embed-page-iframe-code.component.css']
})

export class EmbedPageIframeCodeComponent implements OnInit {

  @Input() iframeSRC: string;

  public copyButtonPressed = false;

  constructor(private embedPageIframeCodeService: EmbedPageIframeCodeService) {
  }

  public ngOnInit() {
  }
}
