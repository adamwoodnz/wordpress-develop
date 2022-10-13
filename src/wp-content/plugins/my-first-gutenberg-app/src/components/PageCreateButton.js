import { useDispatch } from "@wordpress/data";
import { useState } from "@wordpress/element";
import { Button, Modal, TextControl } from "@wordpress/components";

import { PageCreateForm } from "./PageCreateForm";

export function PageCreateButton() {
	const [isOpen, setOpen] = useState(false);
	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);
	return (
		<>
			<Button onClick={openModal} variant="primary">
				Create a new Page
			</Button>
			{isOpen && (
				<Modal onRequestClose={closeModal} title="Create a new page">
					<PageCreateForm onCancel={closeModal} onSaveFinished={closeModal} />
				</Modal>
			)}
		</>
	);
}
