let count = 0, countMessage = 0;
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
            success();
            stop()
        })
        .catch(() => {
            console.log('Delete canceled')
            stop()
            error ? error() : null
        })
}
const startMessage = function (msg) {
    messagebox = ElMessage.error(msg)
    setTimeout(function(){ countMessage = 0; }, 1000)
}
const stop = () => {
    count = 0;
};
export const messageHelper = {
    show: (msg, title, success, error) => {
        if (count === 0) {
            start(msg, title, success, error);
        }
        count += 1;
    },
    error: (msg) => {
        if (countMessage === 0) {
            startMessage(msg);
        }
        countMessage += 1;
    }
}