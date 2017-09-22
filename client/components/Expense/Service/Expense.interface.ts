

export class ExpenseInterface {

    static readonly TYPE = 'Expense';

    id: String;
    view: String;
    rev: String;
    created: Date;
    updated: Date;

    expenseNumber: number;
    date: Date;
    expenseSummery: String;
    items: items[];
    notes: String;          
    total: number;
    




    compareTo(other: ExpenseInterface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}

export class items {
    expenseCategory: string;
    description: String;
    unitprice: number;
    amount: number;
    discount: number;
    qty: number;

}