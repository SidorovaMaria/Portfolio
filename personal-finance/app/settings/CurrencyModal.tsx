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
		<Modal open={open} close={close}>
			<div className="flex flex-col w-full gap-3">
				<h2 className="text-2 leading-120 font-bold w-full">Set Currency</h2>
				<p className="text-4 leading-150 text-grey-500 w-full">
					Select the currency you want to use for your transactions. This will be used
					across the application for all financial calculations and displays.
				</p>
			</div>
			<div className="flex items-center gap-2 w-full">
				<input
					type="text"
					placeholder="Search currency..."
					className="w-full text-3 leading-150 border border-grey-300 rounded-md p-2 focus:outline-none focus:border-grey-900 transition-all duration-200"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div className="flex flex-col gap-1 w-full p-0.5 max-h-[40vh] min-h-[40vh] overflow-auto ">
				{currencies.length > 0 ? (
					currencies.map((currency) => (
						<div
							className="settings-option hover:bg-secondary-green/20 group flex items-center py-2 "
							key={currency.code}
							onClick={() => setCurrency(currency.code)}
						>
							<p className="text-3 leading-150 flex-1">{currency.name}</p>

							<div className="flex items-center gap-4">
								<span className="text-3 leading-150 text-grey-900 font-medium ">
									{currency.symbol}
								</span>
								<span className="text-4 leading-150 text-grey-500">
									{currency.code}
								</span>
							</div>
						</div>
					))
				) : (
					<p className="text-4 leading-150 text-grey-500 w-full text-center">
						No currencies
					</p>
				)}
			</div>
		</Modal>
	);
};

export default CurrencyModal;
