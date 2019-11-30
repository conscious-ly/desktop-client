import Api from './Api';

export default {
  checkStatus() {
    return Api().get('https://consciously.free.beeceptor.com/my/api');
  },
  async getRandomMathQnA() {
    const res = await Api().get('https://studycounts.com/api/v1/algebra/linear-equations.json?difficulty=intermediate');
    const { data } = res.data;
    return data;
  },
  updateStatus(status, currentTaskName, time) {
    return Api().post('https://consciously.free.beeceptor.com/my/api', { status, current_task: currentTaskName, time });
  },
};
