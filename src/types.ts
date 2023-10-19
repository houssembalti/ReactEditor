type DialogButtonSpec = {
    label: string;
    onClick: () => void;
};

type MyDialogSpec = {
    title: string;
    body: HTMLElement;
    buttons: DialogButtonSpec[];
};
