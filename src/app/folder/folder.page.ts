import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss']
})
export class FolderPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  public folder!: string;
  constructor() {}
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
