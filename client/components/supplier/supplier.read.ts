import {Component, OnInit, OnDestroy} from "@angular/core";
import{ View1Interface} from './service/view1.interface';
import{ SupplierService} from './service/view1.service';
import{ View1Observer} from './service/view1.observer'; 

declare var $:any;
declare var $tr:any;

@Component({
    selector: 'view1',
    template: require('./supplier.read.html'),
     styles: [`
    input.ng-dirty.ng-invalid { border: solid red 2px; }
    input.ng-dirty.ng-valid { border: solid green 2px; }
  `]

})
export class SupplierreadComponent implements OnInit, OnDestroy, View1Observer {
        entries:Array<View1Interface> = [];

    constructor(private repository:SupplierService) {
        
    }
 hello(){
      
 }
 
    ngOnInit() {
        this.repository.registerObserver(this);
        this.repository.fetchEntriesv1()
        .then((entries:Array<View1Interface>) => this.entries = entries);
        this.repository.createv1();
  $(document).ready(function() {
		$('#datatables').DataTable({
		    "pagingType": "full_numbers",
		    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
		    responsive: true,
		    language: {
		    search: "_INPUT_",
		    searchPlaceholder: "Search records",
		    }

		});


		var table = $('#datatables').DataTable();

		// Edit record
		table.on( 'click', '.edit', function () {
		    $tr = $(this).closest('tr');

		    var data = table.row($tr).data();
		    alert( 'You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.' );
		} );

		// Delete a record
		table.on( 'click', '.remove', function (e) {
		    $tr = $(this).closest('tr');
		    table.row($tr).remove().draw();
		    e.preventDefault();
		} );

	
	});
    }

    ngOnDestroy():void {
        this.repository.unregisterObserver(this);
    }

    notify():void {
        this.repository.fetchEntriesv1()
            .then((entries:Array<View1Interface>) => this.entries = entries);
    }
}
