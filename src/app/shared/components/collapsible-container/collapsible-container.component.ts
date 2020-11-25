import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { CollapsibleContainerService } from '../../services/collapsible-container.service';;

@Component({
  selector: 'app-collapsible-container-component',
  templateUrl: 'collapsible-container.component.html',
  styleUrls: ['./collapsible-container.component.css']
})

export class CollapsibleContainerComponent implements OnInit {

  public expanded = true;

  @Input() collapseName: string;
  @Input() isWidget: boolean;
  @Input() titleText: string;

  constructor(private collapsibleContainerService: CollapsibleContainerService) {
  }

  public ngOnInit() {
  }
}
