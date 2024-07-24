import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

import {MessageService} from "primeng/api";
import {AthletesService} from "../../../service/athletes/athletes.service";
import {ClientsModel} from "../../../models/clients.model";



@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  providers: [ HttpClient, MessageService,]
})
export class UserProfileComponent implements OnInit {
  @ViewChild('openDialog')
  dialog!: ElementRef;

  clientInfo: ClientsModel;

  constructor(private router: Router,
              private athleteService: AthletesService,) {
  }

  ngOnInit() {
    this.getClientInfo()
  }
  getClientInfo() {
    this.athleteService.getClientInfo(7).subscribe({
      next: (value) => {
        this.clientInfo = value;
      },
      complete: () => {
      }
    })
  }

}
