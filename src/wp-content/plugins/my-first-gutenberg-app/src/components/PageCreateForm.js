import { useState } from "@wordpress/element";
import { useDispatch, useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";

import { PageForm } from "./PageForm";

export function PageCreateForm({ onCancel, onSaveFinished }) {
	const [title, setTitle] = useState("");
	const { saveEntityRecord } = useDispatch(coreDataStore);
	// Note that we don;t pass a pageId
	const args = ["postType", "page"];
	const { lastError, isSaving } = useSelect(
		(select) => ({
			lastError: select(coreDataStore).getLastEntitySaveError(...args),
			isSaving: select(coreDataStore).isSavingEntityRecord(...args),
		}),
		[args]
	);

	const handleSave = async () => {
		const savedRecord = await saveEntityRecord(...args, {
			title,
			status: "publish",
		});

		if (savedRecord) {
			onSaveFinished();
		}
	};

	const handleChange = (title) => setTitle(title);

	return (
		<PageForm
			title={title}
			onChangeTitle={handleChange}
			hasEdits={!!title}
			onSave={handleSave}
			onCancel={onCancel}
			isSaving={isSaving}
			lastError={lastError}
		/>
	);
}
