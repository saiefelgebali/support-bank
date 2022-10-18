import { parseTransactionsCSV } from "./csv";

const { transactions, users } = parseTransactionsCSV(
	"./examples/Transactions2014.csv"
);

console.log(transactions);
