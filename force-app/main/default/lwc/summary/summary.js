import { LightningElement, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import basePath from '@salesforce/community/basePath';
import getTenanciesDetails from '@salesforce/apex/LWCRest.getTenanciesDetails';

const columns = [
	{
		label: 'Type',
		fieldName: 'chargeDescription'
	}, {
		label: 'Start date',
		fieldName: 'startDate',
		fixedWidth: 280,
	}, {
		label: 'Amount',
		fieldName: 'amount',
		fixedWidth: 120,
		type: 'currency',
		typeAttributes: {
			currencyCode: 'GBP',
			step: '0.01'
		},
	},
];

const mockData1 = {
	id: 77887,
	tenantNames: "John Smith",
	address: "20 Hill Top Road, Old Whittington, Chesterfield, S41 9NF",
	startDate: "29/10/2021",
	noticeReceived: "01/10/2021",
	expectedEndDate: "29/10/2021",
	propertyDetails: {
		propertyRef: "123",
		propertyType: "House",
		bedrooms: 3
	},
	accountDetails: {
		accountPaymentRef: "40056502",
		startDate: "29/10/2021",
		endDate: "14/03/2021",
		grossRent: 75.14,
		rebate: 0,
		netRent: 75.14,
		lastBalance: 50.06,
		lastBalanceDate: "07/11/2021",
		currentBalance: 350.62,
		paymentMethod: "No payment method"
	}
}

const mockData2 = [
	{
		id: 1,
		chargeDescription: "Rent",
		startDate: "29/10/2021",
		amount: 50
	},
	{
		id: 2,
		chargeDescription: "Communal Aerea Cleaning",
		startDate: "29/11/2021",
		amount: 10
	}
]

export default class Summary extends NavigationMixin(LightningElement) {
	details = mockData1;
	chargesData = mockData2;
	chargesColumns = columns;
	currentPageReference = null;
	urlStateParameters = null;
	urlId = null;

	@wire(CurrentPageReference)
	getStateParameters(currentPageReference) {
		if (currentPageReference) {
			this.urlStateParameters = currentPageReference.state;
			this.setParametersBasedOnUrl();
		}
	}

	setParametersBasedOnUrl() {
		this.urlId = this.urlStateParameters.id || null;
	}

	connectedCallback() {
		// fetchDataHelper({
		// 	amountOfRecords: 10
		// }).then(result => {
		// 	this.data = result;
		// });

		getTenanciesDetails()
			.then(result => JSON.parse(result))
			.then(result => {
				// this.details = result;
				console.log(result);
			});
	}

	handleBack(e) {
		e.preventDefault();
		this[NavigationMixin.Navigate]({
			type: 'standard__webPage',
			attributes: {
				url: `${basePath}/tenancy-dashboard`
			}
		});
	}
}
