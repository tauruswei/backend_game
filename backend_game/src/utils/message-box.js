//对于消息提醒限制，只显示一个。防止满屏提示。
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
const startMessage = function (msg,html,dur) {
    messagebox = ElMessage({
        dangerouslyUseHTMLString: html||false,
        message:msg,
        type:"error",
        duration: dur || 3000
    })
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
    error: (msg,html,dur) => {
        if (countMessage === 0) {
            startMessage(msg,html,dur);
        }
        countMessage += 1;
    }
}