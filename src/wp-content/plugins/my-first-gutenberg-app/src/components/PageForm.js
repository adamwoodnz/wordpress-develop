import { Button, TextControl, Spinner } from "@wordpress/components";

export function PageForm({
	title,
	onChangeTitle,
	lastError,
	onSave,
	hasEdits,
	isSaving,
	onCancel,
}) {
	return (
		<div className="my-gutenberg-form">
			<TextControl label="Page title:" value={title} onChange={onChangeTitle} />
			{lastError && (
				<div className="form-error">Error: {lastError.message}</div>
			)}
			<div className="form-buttons">
				<Button
					onClick={onSave}
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
