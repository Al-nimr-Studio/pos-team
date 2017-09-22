import { SummaryObserver } from "./Summary.observer";
// import { PurchaseInvoiceInterface, items } from "../../PurchaseInvoice/Service/PurchaseInvoice.interface";



declare let PouchDB: any;
declare let emit: Function;
 

export class SummaryService {

    private pouchDb: any;
    private pouchDbEventEmitter: any;
    private pouchDbSyncEventEmitter: any;
    private observer: Array<SummaryObserver> = [];
    pager;


    constructor() {
        this.pouchDb = new PouchDB('crud-data');

        this.pouchDbEventEmitter = this.pouchDb.changes({
            since: 'now',
            live: true
        }).on('change', (event) => this.notifyObserver());

        // this.pouchDbSyncEventEmitter = this.pouchDb.sync('http://localhost:5984/Crud-data', {
        //     live: true,
        //     retry: true
        // });
    }

    registerObserver(observer: SummaryObserver): void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer: SummaryObserver): void {
        var index: number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver(): void {
        this.observer.forEach((observer: SummaryObserver) => observer.notify());
    }


    
      ///////////---------------------Summary Function of POP ------------------///////////////////////////////////
    fetchSupplierTotal(): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            // let mapFunc: Function = (doc: any) => emit(doc.view);
            var mapReduceFun = {
               map:  function  (doc){

                if(doc.view === "PurchaseInvoice"){

                  emit(doc.supplier,parseInt(doc.total))
                }
            },
                reduce: '_stats'
            };

            let options: Object = {
                
                reduce: true, 
                group: true,
            };

            this.pouchDb.query(mapReduceFun, options)
                .then((result: any) => {
                    // console.log("supplier total",result.rows);
                    var totalPrice=0;
                    for (var i = 0; i < result.rows.length; i++) {
                        totalPrice+= result.rows[i].value.sum;
                    }
                    console.log("supplier total",totalPrice);
                    result.rows.totalPrice = totalPrice;
                    
                    

                    resolve(result.rows);
                })
                .catch(reject);
        });
    }

    inventorySummary(): Promise<any> {
        return new Promise((resolve, reject) => {
            var mapReduceFun = {
               map:  function  (doc){

                if(doc.view === "PurchaseInvoice"){
                    for(var i =0; i<doc.item.length;i++){
                        emit([doc.item[i].itemname,doc.item[i].unitprice],[parseInt(doc.item[i].qty),parseInt(doc.item[i].amount)])
                    }
                }
            },
                reduce: '_stats'
            };

            let options: Object = {
                
                reduce: true, 
                group: true,
            };

            this.pouchDb.query(mapReduceFun, options)
                .then((result: any) => {
                    console.log("--------Inventory Result",result.rows);
                    resolve(result.rows);
                })
                .catch(reject);
        });
    }

    purchaseInvoiceSummary(): Promise<any> {
        return new Promise((resolve, reject) => {
            var mapReduceFun = {
               map:  function  (doc){

                if(doc.view === "PurchaseInvoice"){
                        emit(doc.type ,parseInt(doc.total))
                }
            },
                reduce: '_stats'
            };

            let options: Object = {
                
                reduce: true, 
                group: true,
            };

            this.pouchDb.query(mapReduceFun, options)
                .then((result: any) => {
                    console.log("--------PurchaseInvoice  Result",result);
                    resolve(result.rows);
                })
                .catch(reject);
        });
    }

    purchaseOrderSummary(): Promise<any> {
        return new Promise((resolve, reject) => {
            var mapReduceFun = {
               map:  function  (doc){

                if(doc.view === "PurchaseOrder"){
                        emit(doc.type ,parseInt(doc.total))
                }
            },
                reduce: '_stats'
            };

            let options: Object = {
                
                reduce: true, 
                group: true,
            };

            this.pouchDb.query(mapReduceFun, options)
                .then((result: any) => {
                    console.log("--------PurchaseInvoice  Result",result);
                    var totalPrice=0;
                    for (var i = 0; i < result.rows.length; i++) {
                        totalPrice+= result.rows[i].value.sum;
                    }
                    console.log("supplier total",totalPrice);
                    result.rows.totalPrice = totalPrice;
                    resolve(result.rows);
                })
                .catch(reject);
        });
    }

    expenseSummary(): Promise<any> {
        return new Promise((resolve, reject) => {
            var mapReduceFun = {
               map:  function  (doc){

                if(doc.view === "Expense"){
                    for(var i =0; i<doc.item.length;i++){
                        emit(doc.item[i].expenseCategory,parseInt(doc.item[i].amount))
                    }
                }
            },
                reduce: '_stats'
            };

            let options: Object = {
                
                reduce: true, 
                group: true,
            };

            this.pouchDb.query(mapReduceFun, options)
                .then((result: any) => {
                    console.log("@@@@@@@@@@@@@@@@----expense Result",result);
                    var totalPrice=0;
                    for (var i = 0; i < result.rows.length; i++) {
                        totalPrice+= result.rows[i].value.sum;
                    }
                    console.log("supplier total",totalPrice);
                    result.rows.totalPrice = totalPrice;
                    resolve(result.rows);
                })
                .catch(reject);
        });
    }

    ///////////---------------------Summary Function of POS ------------------///////////////////////////////////
    customerSummary(): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            // let mapFunc: Function = (doc: any) => emit(doc.view);
            var mapReduceFun = {
               map:  function  (doc){

                if(doc.view === "SalesInvoice"){

                  emit(doc.customer,parseInt(doc.total))
                }
            },
                reduce: '_stats'
            };

            let options: Object = {
                
                reduce: true, 
                group: true,
            };

            this.pouchDb.query(mapReduceFun, options)
                .then((result: any) => {
                    console.log("Customer Summary function ----------",result.rows);
                    var totalPrice=0;
                    for (var i = 0; i < result.rows.length; i++) {
                        totalPrice+= result.rows[i].value.sum;
                    }
                    console.log("customer grand total,,,,,,,,,,,",totalPrice);
                    result.rows.totalPrice = totalPrice;
                    
                    

                    resolve(result.rows);
                })
                .catch(reject);
        });
    }
    
    saleInvoiceSummary(): Promise<any> {
        return new Promise((resolve, reject) => {
            var mapReduceFun = {
               map:  function  (doc){

                if(doc.view === "SalesInvoice"){
                        emit(doc.type ,parseInt(doc.total))
                }
            },
                reduce: '_stats'
            };

            let options: Object = {
                
                reduce: true, 
                group: true,
            };

            this.pouchDb.query(mapReduceFun, options)
                .then((result: any) => {
                    console.log("-------SaleInvoice  Result",result);
                    resolve(result.rows);
                })
                .catch(reject);
        });
    }

    inventorySummaryPOS(): Promise<any> {
        return new Promise((resolve, reject) => {
            var mapReduceFun = {
               map:  function  (doc){

                if(doc.view === "SalesInvoice"){
                    for(var i =0; i<doc.item.length;i++){
                        emit([doc.item[i].itemname,doc.item[i].unitprice],[parseInt(doc.item[i].qty),parseInt(doc.item[i].amount)])
                    }
                }
            },
                reduce: '_stats'
            };

            let options: Object = {
                
                reduce: true, 
                group: true,
            };

            this.pouchDb.query(mapReduceFun, options)
                .then((result: any) => {
                    console.log("--------Inventory Result",result.rows);
                    resolve(result.rows);
                })
                .catch(reject);
        });
    }

} 
