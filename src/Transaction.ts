import { DateTime } from "luxon";
import Decimal from "decimal.js";

export class Transaction {
    constructor(
        public date: DateTime,
        public from: string,
        public to: string,
        public narrative: string,
        public amount: Decimal
    ) {}
}
