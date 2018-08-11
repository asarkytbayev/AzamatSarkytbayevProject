import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostRecentFirst'
})
export class MostRecentFirstPipe implements PipeTransform {

  /**
   * Compares two reviews
   * 
   * @param a first review
   * @param b second review
   * @return -1 if  review a is created more recently,
   *          1 otherwise
   */
  private compare(a: any, b: any): number {
    const createdOnA = a.createdOn;
    const createdOnB = b.createdOn;

    let comparison = 1;

    if (createdOnA > createdOnB) {
      comparison = -1;
    }
    return comparison;
  }

  /**
   * Sorts reviews - most recent first
   * 
   * @param reviews unsorted array of reviews
   * @return sorted array of reviews
   */
  transform(reviews: [any]): [any] {
    if (reviews && reviews.length > 0) {
      return reviews.sort(this.compare);
    }
    return null;
  }

}
