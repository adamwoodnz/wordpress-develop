import { SearchControl } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";

import { PagesList } from "./PagesList";
import { PageCreateButton } from "./PageCreateButton";

export function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const { pages, hasResolved } = useSelect(
		(select) => {
			const query = {};
			if (searchTerm) {
				query.search = searchTerm;
			}
			const args = ["postType", "page", query];
			return {
				pages: select(coreDataStore).getEntityRecords(...args),
				hasResolved: select(coreDataStore).hasFinishedResolution(
					"getEntityRecords",
					args
				),
			};
		},
		[searchTerm]
	);

	return (
		<div>
			<div className="list-controls">
				<SearchControl onChange={setSearchTerm} value={searchTerm} />
				<PageCreateButton />
			</div>
			<PagesList hasResolved={hasResolved} pages={pages} />
		</div>
	);
}
