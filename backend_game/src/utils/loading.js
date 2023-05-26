import { ElLoading } from 'element-plus';
let loadingCount = 0;
let loading;
const start = function() {
    loading = ElLoading.service({ text: '拼命加载中', 'background': 'rgba(255, 255, 255, 0.6)' })
}
const stop = () => {
    loading.close();
};
export const loadingHelper = {
    show : () => {
        if (loadingCount === 0) {
            start();
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