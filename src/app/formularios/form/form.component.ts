import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

class Cliente {
nome: string;
email: string;
profissao: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  cliente = new Cliente();

  profissoes = ['Programador', 'Empresario', 'Outra'];
  profissao = 'Outra';

  salvar(form: NgForm) {
    //this.cliente.nome = form.value.nome;
    //this.cliente.email = form.value.email;
   // this.cliente.profissao = form.value.profissao;

     console.log(form.value);
     console.log(this.cliente);
  }

}

