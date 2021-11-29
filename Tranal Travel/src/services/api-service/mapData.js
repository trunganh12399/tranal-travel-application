// import {RefLoading} from '../../components/Loading';

export const mapData = res => {
  //   RefLoading.hide();
  return res.data;
};

export const mapError = err => {
  //   RefLoading.hide();
  // TODO Log out when session expire
  if (err && err.response && err.response.status === 401) {
    console.log(err);
    return '';
  }

  if (__DEV__) {
    console.log('response:', err.response);
    console.log('request:', err.request);
    return err.response;
  }

  if (err && err.response && err.response.data) {
    console.log(err.response.data);
    return '';
  } else {
    console.log(err);
    return '';
  }
};
