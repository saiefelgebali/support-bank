import { UserAccountStore } from "./users";

function getMaxLength(originalList: string[]) {
	if (originalList.length < 0) {
		return 0;
	}

	const list = [...originalList];

	return list.sort((a, b) => b.length - a.length)[0].length;
}

function getMaxLengthsOfColumn(
	objectList: { [key: string]: string }[],
	headers: { [key: string]: string },
	key: string
) {
	const values = objectList.map((o) => o[key]);
	return getMaxLength([...values, headers[key]]);
}

export function listAll(users: UserAccountStore): void {
	const userList = Object.values(users).map((user) => ({
		name: user.name,
		balance: `${user.balance.toFixed(2)}`,
	}));

	const headers = {
		name: "Name",
		balance: "Balance (£)",
	};

	const maxLengths = {
		name: getMaxLengthsOfColumn(userList, headers, "name"),
		balance: getMaxLengthsOfColumn(userList, headers, "balance"),
	};

	console.log(
		`${headers.name.padEnd(maxLengths.name)} | ${headers.balance.padEnd(
			maxLengths.balance
		)}`
	);

	const borderName = new Array(maxLengths.name).fill("=").join("");
	const borderBalance = new Array(maxLengths.balance).fill("=").join("");

	console.log(`${borderName} | ${borderBalance}`);

	userList.forEach((user) => {
		const name = user.name.padEnd(maxLengths.name);
		const balance = user.balance.padStart(maxLengths.balance);

		console.log(`${name} | ${balance}`);
	});
}
