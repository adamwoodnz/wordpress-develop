import { Spinner } from "@wordpress/components";
import { decodeEntities } from "@wordpress/html-entities";

import { PageEditButton } from "./PageEditButton";
import { PageDeleteButton } from "./PageDeleteButton";

export function PagesList({ hasResolved, pages }) {
	if (!hasResolved) {
		return <Spinner />;
	}

	if (!pages?.length) {
		return <div>No results</div>;
	}

	return (
		<table className="wp-list-table widefat striped table-view-list">
			<thead>
				<tr>
					<td width="80%">Title</td>
					<td>Actions</td>
				</tr>
			</thead>
			<tbody>
				{pages?.map((page) => (
					<tr key={page.id}>
						<td>{decodeEntities(page.title.rendered)}</td>
						<td>
							<div className="form-buttons">
								<PageEditButton pageId={page.id} />
								<PageDeleteButton pageId={page.id} />
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
