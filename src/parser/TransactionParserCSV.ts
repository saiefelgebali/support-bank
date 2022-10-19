import log4js from "log4js";
import { DateTime } from "luxon";
import { parse, CastingContext } from "csv-parse/sync";
import { TransactionParser } from "./TransactionParser";
import { Transaction } from "../Transaction";
import Decimal from "decimal.js";

const logger = log4js.getLogger("<TransactionParserCSV.ts>");

export class TransactionParserCSV extends TransactionParser {
    constructor(text: string) {
        super(text);
    }

    public override async parseTransactions() {
        logger.log(`Parsing CSV file`);

        return parse(this.text, {
            columns: true,
            onRecord: (record, ctx) => this.createTransaction(record, ctx),
        }) as Transaction[];
    }

    private createTransaction(
        record: { [col: string]: string },
        ctx: CastingContext
    ): Transaction {
        const date = DateTime.fromFormat(record.Date, "dd/mm/yyyy");
        const amount = this.formatAmount(record.Amount);

        if (date.invalidReason) {
            logger.error(
                `The date in line ${ctx.lines} is invalid: ${date.invalidExplanation}`
            );
        }

        if (!Decimal.isDecimal(amount)) {
            logger.error(
                `The amount in line ${ctx.lines} is invalid: ${record.Amount} is not a number`
            );
        }

        return new Transaction(
            date,
            record.From,
            record.To,
            record.Narrative,
            amount
        );
    }
}
