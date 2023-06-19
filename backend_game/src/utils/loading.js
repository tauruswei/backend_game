import { ElLoading } from 'element-plus';
let loadingCount = 0;
let loading;
const start = function(msg) {
    loading = ElLoading.service({ text: msg||'Loading...', 'background': 'rgba(255, 255, 255, 0.6)' })
}
const stop = () => {
    loading.close();
};
export const loadingHelper = {
    show : (msg) => {
        if (loadingCount === 0) {
            start(msg);
        }
        loadingCount += 1;
    },
    hide : () => {
        if (loadingCount <= 0) {
            return;
        }
        loadingCount -= 1;
        if (loadingCount === 0) {
            stop();
        }
    }
}