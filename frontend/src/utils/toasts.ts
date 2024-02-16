import {toast} from "react-toastify";

export const successMessage = (message) => {
	toast.success(message, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const infoMessage = (message) => {
	toast.info(message, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const errorMessage = (message) => {
	toast.error(message, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const logOutMessage = () => {
	toast.info(`Вы вышли из аккаунта`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
}

export const groupAlreadyAddedMessage = () => {
	toast.warning(`Вы уже добавили эту группу в занятие`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const groupAddedMessage = (group_name, lesson_id) => {
	toast.success(`Группа ${group_name} успешно добавлена в занятие №${lesson_id}`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const groupRemoveMessage = (group_name, lesson_id) => {
	toast.info(`Группа ${group_name} успешно удалена из занятия №${lesson_id}`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const lessonDeleteMessage = (id) => {
	toast.info(`Занятие №${id} успешно удалено`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const lessonAddMessage = (id) => {
	toast.success(`Занятие №${id} успешно добавлено`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const lessonSaveMessage = (id) => {
	toast.success(`Занятие №${id} успешно сохранено`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const requestErrorMessage = () => {
	toast.error(`Что-то пошло не так`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};
