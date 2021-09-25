import { Component, OnInit } from '@angular/core';
import { FileService } from '@shared/services/file.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
  constructor(private fileService: FileService) {}

  ngOnInit(): void {}
}
