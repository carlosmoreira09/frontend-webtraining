import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {ClientsModel} from "../../../models/clients.model";
import {AthletesService} from "../../../service/athletes.service";
import {ModalAtletaComponent} from "./components/modal-create/modal-athlete.component";
import {CommonModule} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {Router, RouterLink} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {ReturnMessage} from "../../../models/exercise.model";
import {CardAthleteComponent} from "./components/card-athlete/card-athlete.component";

@Component({
  selector: 'app-athlete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    CommonModule,
    ModalAtletaComponent,
    RouterLink,
    ConfirmDialogModule,
    ToastModule,
    CardAthleteComponent
  ],
  templateUrl: './athlete.component.html',
  styleUrl: './athlete.component.css',
  providers: [MessageService, ConfirmationService]
})
export class AtletasComponent implements OnInit {
  atletas: ClientsModel[];
  titleAds1: string;
  titleAds2: string;
  titleAds3: string;
  constructor(private athleteService: AthletesService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,) {
  }

  ngOnInit() {
    this.listAllUsers();
    this.titleAds1 = 'Parceria 1'
    this.titleAds2 = 'Parceria 2'
    this.titleAds3 = 'Parceria 3'

  }

  listAllUsers() {
    return this.athleteService.listAllAthletas().subscribe(
      (users: ClientsModel[]) => {
        this.atletas = users;
      }
    )
  }

  deleteAthlete(id_client: number | undefined) {
    this.athleteService.delete(id_client).subscribe({
      next: (res: ReturnMessage) => {
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          detail: res.message,
          life: 1500
        })
      },
      error: err => {
        this.messageService.add({
          key: 'tc',
          severity: 'error',
          detail: err.message,
          life: 1500
        })
      },
      complete: () => {
        this.listAllUsers()
      }
    })
  }

  confirm(event: Event, id: number | undefined) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você deseja deletar esse Atleta?',
      header: 'Confirmação',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "m-2 p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.deleteAthlete(id);
        this.listAllUsers();
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Atleta deletado', life: 1500});
      },
      reject: () => {
        this.listAllUsers();
      }
    });
  }
}
