import { currencyOptions } from "@/components/constants";
import Modal from "@/components/Modal";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
interface CurrencyModalProps {
	open: boolean;
	close: () => void;
}
const CurrencyModal = ({ open, close }: CurrencyModalProps) => {
	const [search, setSearch] = useState("");
	const [currencies, setCurrencies] = useState(currencyOptions);
	useEffect(() => {
		const filteredOptions = currencyOptions.filter((currency) =>
			currency.name.toLowerCase().includes(search.toLowerCase())
		);
		setCurrencies(filteredOptions);
	}, [search]);
	const dispatch = useDispatch();
	const setCurrency = (currency: string) => {
		dispatch({
			type: "finance/setCurrency",
			payload: currency,
		});
		close();
	};

	return (
		<Modal open={open} close={close} title="Select Currency">
			<p className="text-p4 text-muted w-full">
				Select the currency you want to use for your transactions. This will be used across
				the application for all financial calculations and displays.
			</p>

			<div className="flex-1 w-full input-container ">
				<input
					type="text"
					placeholder="Search currency..."
					className=" flex-1 outline-none"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div className="flex-column gap-1 p-0.5 max-h-[40vh] min-h-[40vh] overflow-auto ">
				{currencies.length > 0 ? (
					currencies.map((currency) => (
						<div
							className="settings-option  "
							key={currency.code}
							onClick={() => setCurrency(currency.code)}
						>
							<p className="text-p4 flex-1 text-fg">{currency.name}</p>

							<div className="flex-center gap-4">
								<span className="text-h3 ">{currency.symbol}</span>
								<span className="text-p4 text-muted">{currency.code}</span>
							</div>
						</div>
					))
				) : (
					<p className="text-p4 text-muted text-center">
						No currencies with current search...
					</p>
				)}
			</div>
		</Modal>
	);
};

export default CurrencyModal;
