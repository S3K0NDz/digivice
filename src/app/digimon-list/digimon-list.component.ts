import { DigimonapiService } from 'src/services/digimonapi.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-digimon-list',
  templateUrl: './digimon-list.component.html',
  styleUrls: ['./digimon-list.component.css']
})
export class DigimonListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'image'];
  dataSource = new MatTableDataSource<any>();

  nameFilter: string = '';
  attributeFilter: string = '';
  levelFilter: string = '';
  attributes: any[] | undefined;
  levels: any[] | undefined;

  totalElements: number | undefined;
 


  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  constructor(
    private digimonService: DigimonapiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
   
    console.log( this.totalElements);
    this.route.queryParams.subscribe(params => {
      this.nameFilter = params['name'] || '';
      this.attributeFilter = params['attribute'] || '';
      this.levelFilter = params['level'] || '';

      const pageIndex = +params['page'] || 0;
      const pageSize = +params['pageSize'] || 10;

      this.paginator.pageIndex = pageIndex;
      this.paginator.pageSize = pageSize;

      this.loadDigimons(this.nameFilter, this.attributeFilter, this.levelFilter);
    });

    this.digimonService.getAttributes().subscribe(attributes => {
      this.attributes = attributes;
      console.log(this.attributes);
    });

    this.digimonService.getLevels().subscribe(levels => {
      this.levels = levels;
      console.log(this.levels);
    });
    
  }


  loadDigimons(name?: string, attribute?: string, level?: string) {
    
    const pageSize = 9999;
    const page = 0;


    this.digimonService.getDigimonList(pageSize, page, name, attribute, level)
      .subscribe(
        (data: any) => {
          this.dataSource.data = data.content;
          this.dataSource.paginator = this.paginator;
          console.log(this.dataSource.data);
        },
        error => {
          console.error('Error fetching digimons:', error);
        }
      );
  }

  applyFilters() {
    this.loadDigimons(this.nameFilter, this.attributeFilter, this.levelFilter);


    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        name: this.nameFilter,
        attribute: this.attributeFilter,
        level: this.levelFilter,
        page: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize
      },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  async irDetalles(id: number) {
    this.applyFilters();

    await new Promise<void>(resolve => {
      resolve();
    });

    this.router.navigate(['/digimon-details', id]);
  }


  resetFilters() {
    this.nameFilter = '';
    this.attributeFilter = '';
    this.levelFilter = '';

    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 10;

    this.loadDigimons(this.nameFilter, this.attributeFilter, this.levelFilter);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        name: this.nameFilter,
        attribute: this.attributeFilter,
        level: this.levelFilter,
        page: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize
      },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }




 
  
  





}
