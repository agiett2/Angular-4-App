import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstname: '',
    lastname: '',
    email: '',
    phone:'',
    balance: 0
  }

  disableBalanceOnEdit: boolean;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    //Get Client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}){
   
    if (!valid){
      this.flashMessagesService.show('Please fill in all the blanks', {
        cssClass:'alert-danger', timeout: 4000
      });
      this.router.navigate(['edit-client/'+this.id]);
    }else {
      //Update Client
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('client updated', {
        cssClass:'alert-success', timeout: 4000
      });
      this.router.navigate(['/client/'+this.id]);
    }
  }

}
