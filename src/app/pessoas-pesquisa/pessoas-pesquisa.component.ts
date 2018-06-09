import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
 pessoas = [
   {nome: 'Cláudio Martins', cidade: 'Goiania', estado: 'GO', ativo: true },
   {nome: 'Fulano da silva', cidade: 'Pirenópolis', estado: 'GO', ativo: true },
   {nome: 'Paisano Folgado ', cidade: 'Manaus', estado: 'AM', ativo: true },
   {nome: 'Marília Mendonça', cidade: 'Fortaleza', estado: 'CE', ativo: true },
   {nome: 'Atanagildo Praxedes', cidade: 'Cuiabá', estado: 'MT', ativo: true },
   {nome: 'Admastor Amancio', cidade: 'Raio que o parta', estado: 'TO', ativo: false },
   {nome: 'Sinfrônio Amancio', cidade: 'Taboca do Brejo Velho', estado: 'BA', ativo: true },
   {nome: 'Omoprogres Amancio', cidade: 'Toca do Coelho', estado: 'BA', ativo: true },
   {nome: 'Helokit da Silva ', cidade: 'Gambiarra', estado: 'PE', ativo: false }
 ];

}
