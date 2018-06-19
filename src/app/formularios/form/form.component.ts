import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  profissoes = ['Programador', 'Empresario', 'Outra'];
  profissao = 'Outra';

  salvar(form: NgForm) {
    console.log(this.profissao);
    console.log(form.value.profissao);
  }

}

