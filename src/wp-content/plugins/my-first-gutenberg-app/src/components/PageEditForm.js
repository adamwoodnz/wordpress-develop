import { Button, TextControl, Spinner } from "@wordpress/components";
import { useSelect, useDispatch } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";

export function PageEditForm({ pageId, onCancel, onSaveFinished }) {
	const args = ["postType", "page", pageId];
	const { lastError, page, isSaving, hasEdits } = useSelect(
		(select) => ({
			page: select(coreDataStore).getEditedEntityRecord(...args),
			lastError: select(coreDataStore).getLastEntitySaveError(...args),
			isSaving: select(coreDataStore).isSavingEntityRecord(...args),
			hasEdits: select(coreDataStore).hasEditsForEntityRecord(...args),
		}),
		[pageId]
	);
	const { editEntityRecord, saveEditedEntityRecord } = useDispatch(
		coreDataStore
	);

	const handleChange = (title) =>
		editEntityRecord("postType", "page", pageId, { title });

	const handleSave = async () => {
		const updatedRecord = await saveEditedEntityRecord(
			"postType",
			"page",
			pageId
		);
		if (updatedRecord) {
			onSaveFinished();
		}
	};

	return (
		<div className="my-gutenberg-form">
			<TextControl
				label="Page title:"
				value={page.title}
				onChange={handleChange}
			/>
			{lastError && (
				<div className="form-error">Error: {lastError.message}</div>
			)}
			<div className="form-buttons">
				<Button
					onClick={handleSave}
					variant="primary"
					disabled={!hasEdits || isSaving}
				>
					{isSaving ? (
						<>
							<Spinner />
							Saving
						</>
					) : (
						"Save"
					)}
				</Button>
				<Button onClick={onCancel} variant="tertiary" disabled={isSaving}>
					Cancel
				</Button>
			</div>
		</div>
	);
}
