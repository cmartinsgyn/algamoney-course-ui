import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
 pessoas = [
   {nome: 'Cláudio Martins', cidade: 'Goiania', estado: 'GO', status: true },
   {nome: 'Fulano da silva', cidade: 'Pirenópolis', estado: 'GO', status: true },
   {nome: 'Paisano Folgado ', cidade: 'Manaus', estado: 'AM', status: true },
   {nome: 'Marília Mendonça', cidade: 'Fortaleza', estado: 'CE', status: true },
   {nome: 'Atanagildo Praxedes', cidade: 'Cuiabá', estado: 'MT', status: true },
   {nome: 'Admastor Amancio', cidade: 'Raio que o parta', estado: 'TO', status: true },
   {nome: 'Sinfrônio Amancio', cidade: 'Taboca do Brejo Velho', estado: 'BA', status: true },
   {nome: 'Omoprogres Amancio', cidade: 'Toca do Coelho', estado: 'BA', status: true },
   {nome: 'Helokit da Silva ', cidade: 'Gambiarra', estado: 'PE', status: true }
 ];

}
