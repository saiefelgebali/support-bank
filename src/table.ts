export class Table<T> {
	constructor(
		private labels: { [column in keyof T]: string },
		private data: T[]
	) {}

	public printTable() {
		const maxLengths = Object.keys(this.labels).reduce((acc, col) => {
			acc[col] = this.getMaxLengthsOfColumn(col as keyof T);
			return acc;
		}, {});

		const headerRow = Object.keys(this.labels)
			.map((col) => this.labels[col].padEnd(maxLengths[col]))
			.join(" | ");

		console.log(headerRow);

		this.data.forEach((record) => {
			const row = Object.keys(record)
				.map((col) => record[col].padStart(maxLengths[col]))
				.join(" | ");
			console.log(row);
		});
	}

	private getMaxLength(originalList: string[]) {
		if (originalList.length < 0) {
			return 0;
		}

		const list = [...originalList];

		return list.sort((a, b) => b.length - a.length)[0].length;
	}

	private getMaxLengthsOfColumn(col: keyof T) {
		const values = this.data.map((record) => String(record[col]));
		return this.getMaxLength([...values, this.labels[col]]);
	}
}
