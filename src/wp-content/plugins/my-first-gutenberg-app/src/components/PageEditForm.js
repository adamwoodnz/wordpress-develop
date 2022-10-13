import { useSelect, useDispatch } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";

import { PageForm } from "./PageForm";

export function PageEditForm({ pageId, onCancel, onSaveFinished }) {
	const args = ["postType", "page", pageId];
	const { lastError, page, isSaving, hasEdits } = useSelect(
		(select) => ({
			page: select(coreDataStore).getEditedEntityRecord(...args),
			hasEdits: select(coreDataStore).hasEditsForEntityRecord(...args),
			lastError: select(coreDataStore).getLastEntitySaveError(...args),
			isSaving: select(coreDataStore).isSavingEntityRecord(...args),
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
		<PageForm
			title={page.title}
			onChangeTitle={handleChange}
			hasEdits={hasEdits}
			lastError={lastError}
			isSaving={isSaving}
			onCancel={onCancel}
			onSave={handleSave}
		/>
	);
}
