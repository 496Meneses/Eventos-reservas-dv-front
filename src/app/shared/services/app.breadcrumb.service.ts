import { Injectable } from '@angular/core';
import { Subject, Observable, filter, distinctUntilChanged } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class BreadcrumbService {

    constructor(private router: Router, private route: ActivatedRoute) { }

    getBreadcrumbItems(): Observable<MenuItem[]> {
      return this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged(),
        map(() => {
          let route = this.route;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        map(route => {
          const segments = route.snapshot.pathFromRoot
            .filter(segment => segment.routeConfig)
            .flatMap(segment => segment?.routeConfig?.path?.split('/'))
            .filter(segment => !!segment);
  
          let url = '';
          const items = segments.map(segment => {
            url += '/' + segment;
            return { label: segment, routerLink: url };
          });
  
          return [{ label: 'Principal', routerLink: '/' }, ...items];
        })
      );
    }
}
