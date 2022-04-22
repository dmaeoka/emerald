import { LightningElement } from 'lwc';
const mockData = {
	wasteJobs: [
		{
			uprn: '100061380398.0',
			name: 'Food Waste',
			scheduledStart: '2020-09-08T07:00:00'
		},
		{
			uprn: '100061380398.0',
			name: 'Recycling',
			scheduledStart: '2020-09-09T07:00:00'
		}
	]
};

const week = [
	'SUNDAY',
	'MONDAY',
	'TUESDAY',
	'WEDNSDAY',
	'THURSDAY',
	'FRIDAY',
	'SATURDAY'
];

export default class WasteCollection extends LightningElement {
	textValue = false;
	showSearch = false;
	wasteJobs = {};

	connectedCallback() {
		try {
			this.wasteJobs = mockData.wasteJobs.map((item, index) => {
				const date = new Date(item.scheduledStart);
				item.id = index;
				item.week = week[date.getDay()];
				item.date = date;
				return item;
			});
			console.log(this.wasteJobs);
		} catch (error) {
			console.warn(error);
		}
	}

	handleInputChange(e) {
		try {
			e.preventDefault();
			this.textValue = e.detail.value;
		} catch (error) {
			console.warn(error);
		}
	}

	handleSearch(e) {
		e.preventDefault();
		this.showSearch = this.textValue !== '' ? true : false;
	}
}
