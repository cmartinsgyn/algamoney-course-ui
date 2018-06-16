import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  profissoes = ['Programador', 'Empresario', 'Outra'];

  salvar(form: NgForm) {
    console.log(form);
    console.log(form.value.nome);
  }

}

