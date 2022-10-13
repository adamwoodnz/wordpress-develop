import { Button, Modal } from "@wordpress/components";
import { useState } from "@wordpress/element";

import { PageEditForm } from "./PageEditForm";

export function PageEditButton({ pageId }) {
	const [isOpen, setOpen] = useState(false);
	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);

	return (
		<>
			<Button onClick={openModal} variant="primary">
				Edit
			</Button>
			{isOpen && (
				<Modal onRequestClose={closeModal} title="Edit page">
					<PageEditForm
						pageId={pageId}
						onCancel={closeModal}
						onSaveFinished={closeModal}
					/>
				</Modal>
			)}
		</>
	);
}
