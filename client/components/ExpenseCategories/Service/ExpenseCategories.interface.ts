

export class ExpenseCategoriesInterface {

    static readonly TYPE = 'ExpenseCategories';

    id: String;
    view: String;
    rev: String;
    created: Date;
    updated: Date;

    category: String;

    compareTo(other: ExpenseCategoriesInterface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}
