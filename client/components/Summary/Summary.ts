import { Component, OnInit, OnDestroy } from "@angular/core";
import { SummaryInterface } from './Service/Summary.interface';
import { SummaryService } from './Service/Summary.service';
import { SummaryObserver } from './Service/Summary.observer';
import { NgForm, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
// import{ PurchaseInvoiceService} from '../PurchaseInvoice/Service/PurchaseInvoice.Service';

@Component({
    selector: 'Summary',
    template: require('./Summary.html'),
    styles: [`
    input.ng-dirty.ng-invalid { border: solid red 2px; }
    input.ng-dirty.ng-valid { border: solid green 2px; }
  `]

})
export class SummaryReadComponent implements OnInit, OnDestroy {
    entries: Array<SummaryInterface> = [];
    fetchSupplier: any;
    inventorySummary: any;
    inventorySummaryPOS : any;
    purchaseInvoiceSummary :any;
    purchaseOrderSummary :any;
    expenseSummary :any;

    customerSummary: any;
    saleInvoiceSummary: any;

    diffArray:any= [ ];
    

    constructor( private repository: SummaryService) {
    } 


 
    ngOnInit() {
       
    //  this.repository.fetchSupplierTotal().then((sum:any) =>console.log("------Supplier function summary ts--------", this.fetchSupplier =sum));
     this.repository.inventorySummary().then((sum:any) =>console.log("------ Inventory summary ts--------", this.inventorySummary =sum));
    //  this.repository.purchaseInvoiceSummary().then((sum:any) =>console.log("------ purchaseInvoice summary ts--------", this.purchaseInvoiceSummary =sum));
    //  this.repository.purchaseOrderSummary().then((sum:any) =>console.log("------ purchaseOrder summary ts--------", this.purchaseOrderSummary =sum));
    
    //  this.repository.customerSummary().then((sum:any) =>console.log("------ customer function call in summary ts--------", this.customerSummary =sum));
    //  this.repository.saleInvoiceSummary().then((sum:any) =>console.log("------ saleInvoice summary ts--------", this.saleInvoiceSummary =sum));
     
    //  this.repository.expenseSummary().then((sum:any) =>console.log("------ call Expense fun in summary ts--------", this.expenseSummary =sum));
      this.repository.inventorySummaryPOS().then((sum:any) =>console.log("------ Inventory summary ts--------", this.inventorySummaryPOS =sum));
       
      setTimeout(()=> {
            this.test()
        }, 3000);
     
    }

    test(){
        var diff=[];
        for(let i=0;i<this.inventorySummaryPOS.length;i++){

            // if(this.inventorySummaryPOS[i].key[0] === this.inventorySummary[i].key[0]){}

            diff[i]=this.inventorySummary[i].value.sum[0]-(this.inventorySummaryPOS[i].value.sum[0] || 0)
            console.log('>>>>>>>>>>>>>>diff',diff)
            this.diffArray.push({name:this.inventorySummaryPOS[i].key[0] ,diff:diff[i]})
        }

        console.log('gg',this.diffArray)
    }   

    ngOnDestroy(): void {
    }

   
    

}
