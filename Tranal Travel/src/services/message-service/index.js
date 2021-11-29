/*****************************************************************
 * Description:	<Display a message for users>
 * Creator:		<HaVH>
 * Created Date:	<2020/06/04>
 *****************************************************************/

import {Alert} from 'react-native';

export default class MessagesService {
  // Function: 	<ConfirmService>
  // Summary:	 	<Display a msg when user need to confirm a task>
  // Parameters:
  //	<msg> : <String> - <This is content of msg>
  //	<title> : <String> - <This is title of msg>
  //	<approve> : <String> - <This is text of approve button>
  //	<cancel> : <String> - <This is text of cancel button>
  //	<handleOK> : <Function> - <This is function when user click approve button>
  // Return:		<Nothing>
  // Remarks:		<Nothing>
  ConfirmService = (msg, title, approve, cancel, handleOK) => {
    Alert.alert(
      title,
      msg,
      [
        {text: cancel, onPress: () => console.log('Cancel Pressed')},
        {text: approve, onPress: () => handleOK()},
      ],
      {cancelable: false},
    );
  };

  // Function: 	<NoticeService>
  // Summary:	 	<Display a msg notice>
  // Parameters:
  //	<msg> : <String> - <This is content of msg>
  //	<title> : <String> - <This is title of msg>
  //	<confirm> : <String> - <This is text of OK button>
  // Return:		<Nothing>
  // Remarks:		<Nothing>
  NoticeService = (msg, title, confirm) => {
    Alert.alert(
      title,
      msg,
      [{text: confirm, onPress: () => console.log('Notice Pressed')}],
      {cancelable: false},
    );
  };

  // Function: 	<ComfirmNoticeService>
  // Summary:	 	<Display a msg notice>
  // Parameters:
  //	<msg> : <String> - <This is content of msg>
  //	<title> : <String> - <This is title of msg>
  //	<confirm> : <String> - <This is text of OK button>
  //	<handleOK> : <Function> - <This is function when user click approve button>
  // Return:		<Nothing>
  // Remarks:		<Nothing>
  ComfirmNoticeService = (msg, title, confirm, handleOK) => {
    Alert.alert(title, msg, [{text: confirm, onPress: () => handleOK()}], {
      cancelable: false,
    });
  };
}

export const messagesService = new MessagesService();
