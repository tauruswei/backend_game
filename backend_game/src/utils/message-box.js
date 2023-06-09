import { ElMessageBox,ElMessage } from 'element-plus';
//全局只有一次的message
let count = 0,countMessage = 0;
let messagebox;
let message;
const start = function (msg, title, success, error) {
    messagebox = ElMessageBox.confirm(msg, title,
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
const startMessage = function (msg) {
    messagebox = ElMessage.error(msg)
}
const stop = () => {
    messagebox.close();
};
const stopMessage = () => {
    message.close();
};
export const messageHelper = {
    show: (msg, title, success, error) => {
        if (count === 0) {
            start(msg, title, success, error);
        }
        count += 1;
    },
    error:(msg)=>{
        if (countMessage === 0) {
            startMessage(msg);
        }
        countMessage += 1;
    }
}