import { listAll, listUserTransactions } from "./list";
import { getString } from "./userInput";
import type { UserAccountStore } from "./UserAccountStore.interface";

function listUserMenu(users: UserAccountStore) {
	const username = getString("Enter user name: ");
	if (!(username in users)) {
		return listUserMenu(users);
	}

	const user = users[username];
	listUserTransactions(user);
}

export function mainMenu(users: UserAccountStore) {
	const option = getString(
		"Enter (a) to list al users, or (u) to list a specific user: ",
		["a", "u", "q"]
	);

	switch (option) {
		case "a":
			listAll(users);
			break;
		case "u":
			listUserMenu(users);
			break;
		case "q":
			return;
	}

	mainMenu(users);
}
