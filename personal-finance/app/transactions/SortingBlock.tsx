"use client";
import { SearchIcon } from "lucide-react";
import DropDown from "@/components/DropDown";
import IconSortMobile from "@/components/svg/IconSortMobile";
import IconFilterMobile from "@/components/svg/IconFilterMobile";
import { sortByOptions } from "@/components/constants";
import { useState } from "react";
interface SortingBlockProps {
	search: string;
	setSearch: (val: string) => void;
	filter?: string;
	setFilter?: (val: string) => void;
	sortBy: string;
	setSortBy: (val: string) => void;
	categories?: { name: string }[];
}
export default function SortingBlock({
	search,
	setSearch,
	filter,
	setFilter,
	sortBy,
	setSortBy,
	categories,
}: SortingBlockProps) {
	const [openfilter, setOpenFilter] = useState(false);
	const [openSort, setOpenSort] = useState(false);

	return (
		<div className="flex-between gap-4 group">
			<label htmlFor="search" className="input-container flex-1 lg:max-w-[320px]">
				<input
					id="search"
					className="w-full flex-1 outline-none text-p4"
					type="text"
					placeholder="Search Transactions"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<SearchIcon className="size-4 text-muted group-focus-within:text-fg" />
			</label>
			<div className="flex gap-6 items-center justify-end">
				<DropDown
					icon={
						<IconSortMobile className="w-5 h-5 fill-muted hover:fill-fg cursor-pointer" />
					}
					label="Sort By"
					options={sortByOptions}
					selected={sortBy}
					setSelected={setSortBy}
					open={openSort} // Optionally, you can lift open state up as well
					setOpen={() => setOpenSort(!openSort)}
				/>
				{filter && setFilter && categories && (
					<DropDown
						icon={
							<IconFilterMobile className="w-5 h-5 fill-muted hover:fill-fg cursor-pointer" />
						}
						minWidth="min-w-[177px]"
						label="Category"
						options={["All Transactions", ...categories.map((c) => c.name)]}
						selected={filter}
						setSelected={(val) => {
							setFilter(val);
							// If you want to reset page or other state, do it in parent
						}}
						open={openfilter}
						setOpen={() => setOpenFilter(!openfilter)}
					/>
				)}
			</div>
		</div>
	);
}
