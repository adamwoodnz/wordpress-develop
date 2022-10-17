import { Button, Spinner } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";
import { store as noticesStore } from "@wordpress/notices";

export const PageDeleteButton = ({ pageId }) => {
	const { createSuccessNotice, createErrorNotice } = useDispatch(noticesStore);
	const { deleteEntityRecord } = useDispatch(coreDataStore);
	const { getLastEntityDeleteError } = useSelect(coreDataStore);
	const { isDeleting } = useSelect(
		(select) => ({
			isDeleting: select(coreDataStore).isDeletingEntityRecord(
				"postType",
				"page",
				pageId
			),
		}),
		[pageId]
	);

	const handleDelete = async () => {
		const success = await deleteEntityRecord("postType", "page", pageId);

		if (success) {
			// Tell the user the operation succeeded:
			createSuccessNotice("The page was deleted!", {
				type: "snackbar",
			});
		} else {
			// We use the selector directly to get the fresh error *after* the deleteEntityRecord
			// have failed.
			const lastError = getLastEntityDeleteError("postType", "page", pageId);
			const message =
				(lastError?.message || "There was an error.") +
				" Please refresh the page and try again.";
			// Tell the user how exactly the operation has failed:
			createErrorNotice(message, {
				type: "snackbar",
			});
		}
	};

	return (
		<Button variant="primary" onClick={handleDelete} disabled={isDeleting}>
			{isDeleting ? (
				<>
					<Spinner />
					Deleting...
				</>
			) : (
				"Delete"
			)}
		</Button>
	);
};
