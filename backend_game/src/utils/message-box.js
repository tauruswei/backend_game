import { ElMessageBox } from 'element-plus';
//全局只有一次的message
let count = 0;
let message;
const start = function (msg, title, success, error) {
    message = ElMessageBox.confirm(msg, title,
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        })
        .then(() => {
            success()
        })
        .catch(() => {
            console.log('Delete canceled')
            error ? error() : null
        })
}
const stop = () => {
    message.close();
};
export const messageHelper = {
    show: (msg, title, success, error) => {
        if (count === 0) {
            start(msg, title, success, error);
        }
        count += 1;
    }
}