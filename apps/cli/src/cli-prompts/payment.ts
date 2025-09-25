import { cancel, isCancel, select } from "@clack/prompts";
import pc from "picocolors";
import type { Payment } from "../types";

export async function getPaymentChoice(
	payment?: Payment,
): Promise<Payment> {
	if (payment !== undefined) return payment;

	const paymentOptions: Array<{
		value: Payment;
		label: string;
		hint: string;
	}> = [
		{
			value: "none",
			label: "None",
			hint: "no payment setup",
		},
		{
			value: "stripe",
			label: "Stripe",
			hint: "complete payment processing platform",
		},
		{
			value: "lemonsqueezy",
			label: "Lemon Squeezy",
			hint: "all-in-one platform for selling digital products",
		},
	];

	const response = await select<Payment>({
		message: "Select payment provider",
		options: paymentOptions,
		initialValue: "none",
	});

	if (isCancel(response)) {
		cancel(pc.red("Operation cancelled"));
		process.exit(0);
	}

	return response;
} 