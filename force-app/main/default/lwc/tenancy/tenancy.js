/* eslint-disable @lwc/lwc/no-api-reassignments */
import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import healthAlive from '@salesforce/apex/LWCRest.healthAlive';
import getTenancies from '@salesforce/apex/LWCRest.getTenancies';
import basePath from '@salesforce/community/basePath';
// import getName from '@salesforce/apex/LWCRest.getName';
// import NAME_FIELD from '@salesforce/schema/Contact.Name';

const columns = [
	{
		label: 'Address',
		fieldName: 'address',
		iconName: 'utility:trending',
		fixedWidth: 350,
		type: 'text',
		wrapText: true,
		sortable: true
	},
	{
		label: 'Start Date',
		fieldName: 'startDate'
	},
	{
		label: 'End Date',
		fieldName: 'endDate'
	},
	{
		type: 'action',
		fixedWidth: 80,
		typeAttributes: {
			rowActions: [
				{
					label: 'Summary',
					name: 'show_details'
				},
				{
					label: 'Transactions',
					name: 'show_transactions'
				},
				{
					label: 'Statements',
					name: 'show_statements'
				},
				{
					label: 'Direct Debt',
					name: 'show_direct_debt'
				}
			],
			menuAlignment: 'auto'
		},
		cellAttributes: {
			class: 'slds-text-title_caps'
		},
	}
]


export default class Tenancy extends NavigationMixin(LightningElement) {
	@api pageTitle;
	@track responsedata;

	columns = columns;
	status = '';

	async connectedCallback() {

		healthAlive()
			.then(result => JSON.parse(result))
			.then(result => {
				this.status = result.status;
			})
			.catch(error => console.log(error));

		getTenancies()
			.then(result => JSON.parse(result))
			.then(result => {
				this.tenancies = result;
			})
			.catch(error => console.log(error));
	}

	handleRowAction(e) {
		e.preventDefault();
		const action = e.detail.action;
		const row = e.detail.row;
		// console.log(row);
		let url = '';
		switch (action.name) {
			case 'show_details':
				// Tenancy_Dashboard__c
				// Summary__c
				url = `${basePath}/tenancy-dashboard/summary?id=${row.id}`;
				break;

			case 'show_transactions':
				url = `${basePath}/tenancy-dashboard/transaction?id=${row.id}`;
				break;

			case 'show_statements':
				url = `${basePath}/tenancy-dashboard/statements?id=${row.id}`;
				break;

			case 'show_direct_debt':
				url = `${basePath}/tenancy-dashboard/direct-debits?id=${row.id}`;
				break;
			default:
				url = `${basePath}/tenancy-dashboard`;
				break;
		}

		this[NavigationMixin.Navigate]({
			type: 'standard__webPage',
			attributes: {
				url: url
			}
		});
	}

	handlePay() {
		console.log('Handle Pay')
	}
}
