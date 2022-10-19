import { Transaction } from "./Transaction";
import Decimal from "decimal.js";

export class UserAccount {
    public name: string;
    public balance: Decimal;
    private transactions: Transaction[];

    constructor(name: string) {
        this.name = name;
        this.balance = new Decimal(0);
        this.transactions = [];
    }

    public getTransactions() {
        return [...this.transactions];
    }

    public addBalance(number: Decimal) {
        this.balance = this.balance.add(number);
    }

    public removeBalance(number: Decimal) {
        this.balance = this.balance.sub(number);
    }

    public handleTransaction(transaction: Transaction) {
        if (![transaction.from, transaction.to].includes(this.name)) {
            return;
        }

        this.addTransaction(transaction);

        if (transaction.from === this.name) {
            this.removeBalance(transaction.amount);
        }

        if (transaction.to === this.name) {
            this.addBalance(transaction.amount);
        }
    }

    private addTransaction(transaction: Transaction) {
        this.transactions.push(transaction);
    }
}
