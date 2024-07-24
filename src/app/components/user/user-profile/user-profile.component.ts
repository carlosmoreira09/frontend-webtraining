import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

import {MessageService} from "primeng/api";
import {AthletesService} from "../../../service/athletes/athletes.service";
import {ClientsModel} from "../../../models/clients.model";
import {AuthService} from "../../../service/auth/auth.service";



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

  constructor(private authService: AuthService,
              private athleteService: AthletesService,) {
  }

  ngOnInit() {
    this.getClientInfo()
  }
  getClientInfo() {
    const id_client = this.authService.getUserId();
    this.athleteService.getClientInfo(id_client).subscribe({
      next: (value) => {
        this.clientInfo = value;
      },
      complete: () => {
      }
    })
  }

}
