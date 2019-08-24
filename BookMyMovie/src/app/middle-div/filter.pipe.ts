import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})

// This is to filter the content as per the search string by movie name
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.movieName.toLowerCase().includes(searchText);
    });
   }
}