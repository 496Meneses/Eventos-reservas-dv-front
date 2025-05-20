import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../../services/app.breadcrumb.service';
@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

  items: MenuItem[] = [];
  home: MenuItem;
  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    if (this.items.length == 0) {
      this.items.push({label: 'Principal'})
    }
    this.breadcrumbService.getBreadcrumbItems().subscribe(items => {
      this.items = items
      this.items = this.items.map(item => {
        return { label: item.label ? capitalize(item.label) : '' };
      }
      )
    })
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
}
function capitalize(str: string): string {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
