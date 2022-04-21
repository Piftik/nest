import { Repository, EntityRepository } from 'typeorm';
import { Meal } from '../entity/meal.entity';

@EntityRepository(Meal)
export class MealRepository extends Repository<Meal> {
  async findById(mealId: number) {
    const res = await this.query(`Select * from meal where id = ${mealId}`);
    if (res.length > 0) {
      return res[0];
    }

    return null;
  }

  // search(searchText: string, userId: number, page: number, itemsPerPage: number) {
  //     const offset = (page - 1) * itemsPerPage;
  //     return this.query(`
  //     select *
  //     from todo
  //     where name LIKE '%${searchText}%'
  //       and "userId" = ${userId}
  //     offset ${offset}
  //     limit ${itemsPerPage}
  //     `)
  // }

  // getAmountItemsByCriteria(searchText: string, userId: number) {
  //     return this.query(`
  //         select count(*)
  //         from todo
  //         where name LIKE '%${searchText}%'
  //           and "userId" = ${userId}
  //     `)
  // }
}
