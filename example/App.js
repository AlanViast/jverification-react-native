import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Platform} from 'react-native';
import JVerification from 'jverification-react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    setBtnStyle: {
        width: 320,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#3e83d7',
        borderRadius: 8,
        backgroundColor: '#3e83d7',
        padding: 10,
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 25,
        color: '#ffffff',
    },
});

class Button extends React.Component {
    render() {
        return <TouchableHighlight
            onPress={this.props.onPress}
            underlayColor='#e4083f'
            activeOpacity={0.5}
        >
            <View
                style={styles.setBtnStyle}>
                <Text
                    style={styles.textStyle}>
                    {this.props.title}
                </Text>
            </View>
        </TouchableHighlight>;
    }
}


const initParams = {
    'time': 5000,
    'appKey': '60e02a2a65ac4cdc6f80b776', //仅iOS
    'channel': 'channel',                 //仅iOS
    'advertisingId': 'advertisingId',     //仅iOS
    'isProduction': false,                //仅iOS
};

//一键登录页面自定义配置，需要在调用login之前设置
const customConfigParams = {
    backgroundImage: '',                      //背景图

    numberSize: 16,                           //手机号码字体大小（单位:sp）
    numberColor: -16777216,                   //手机号码字体颜色

    sloganHidden: true,                      //slogan是否隐藏

    loginBtnText: '一键登录',

    // privacyOne: ['隐私条款一', 'https://www.jiguang.cn/about'],  //隐私条款一（显示名称和url，请严格按照格式）
    // privacyTwo: ['隐私条款二', 'https://www.jiguang.cn/about'],  //隐私条款二（显示名称和url，请严格按照格式）
    // privacyColor: [-16777216, -65536],                          //隐私条款颜色 （显示名称和url的颜色，请严格按照格式）
    // privacyText: ['登录即同意', '和', '、', '并使用本机号码登录'],  //隐私条款名称外的文字
    // privacyTextSize: 15,                                        //隐私条款文字字体大小
    // privacyTextGravityMode: 'left',                             //隐私条款文本对齐方式，目前仅支持 left、center
    // privacyBookSymbolEnable: false,                             //隐私条款是否显示书名号，默认不显示
    //为保障显示效果，请同时设置x,y,w,h
    // privacyX:50,                                             //隐私条款相对于屏幕左边x轴偏移
    // privacyY:20,                                             //隐私条款相对于授权页面底部下边缘y偏移
    // privacyW:200,                                            //隐私条款宽度
    // privacyH:100,                                            //隐私条款高度

    privacyCheckEnable: true,                                  //checkBox默认状态 默认:NO
    privacyCheckboxSize: 10,                                     //设置隐私条款checkbox尺寸 默认是10
};

const codeConfig = {
    phoneNumber :  "18925241111", //在此替换你的phoneNumber
    signID : "1",             //在此替换你的signID
    templateID : "1"         //在此替换你的templateID
};
//安卓授权页弹窗模式
const androidDialogConfig = {
    privacyNeedClose:true,                       //弹窗是否需要关闭按钮 
    privacyCloseTheme:[10, 10, 0, 0],            //弹窗关闭按钮偏移量 privacyNeedClose为true时，必须设置它的偏移量
    privacyDialogTheme: [300, 400, 0, 0, false], //授权页弹窗模式
    navColor:0xff000000,
    loginBtnText:" 极光认证测试",
    privacyCheckEnable:true,
    loginBtnWidth:40,
}
//ios授权页弹窗模式
const iosDialogConfig = {
    navHidden:true,    //导航栏是否隐藏
    logoConstraints:[0,-100,60,60],           //LOGO图片布局对象
    logoHidden: false,                        //logo是否隐藏
    numberConstraints:[0,-42,200,14],         //号码栏布局对象
    sloganConstraints:[0,-20,200,14],         //slogan布局对象
    logBtnConstraints:[0,20,220,40],
    loginBtnText: '登录按钮',                  //登录按钮文字
    loginBtnTextSize: 16,                     //登录按钮字体大小
    loginBtnTextColor: -16777216,             //登录按钮文字颜色
    privacyConstraints:[0,100,200,40],        //隐私条款布局对象
    checkViewConstraints:[-108,100,10,10],    //checkBox布局对象
    loadingConstraints:[0,0,20,20],
    showWindow:true,  // 是否弹窗，默认no
    windowBackgroundImage:"bg", // 弹框内部背景图片
    windowBackgroundAlpha: 0.3,  //弹窗外侧 透明度 0~1.0
    windowCornerRadius:10, //弹窗圆角数值
    windowConstraints:[0,0,300,300], //弹窗布局对象
    windowCloseBtnImgs:["windowClose","windowClose"],//弹窗close按钮图片 @[普通状态图片，高亮状态图片]
    windowCloseBtnConstraints:[-135,-135,20,20],//弹窗close按钮布局,
}

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        JVerification.setLoggerEnable(true);
        this.LoginListener = result => {
            console.log('LoginListener:' + JSON.stringify(result));
        };
        JVerification.addLoginEventListener(this.LoginListener);
    }

    render() {
        return (
            <View style={styles.container}>

                <Button title='init'
                        onPress={() => JVerification.init(initParams, result => {
                            console.log('init:' + JSON.stringify(result));
                        })}/>

                <Button title='isInitSuccess'
                        onPress={() => JVerification.isInitSuccess(result =>
                            console.log('isInitSuccess:' + JSON.stringify(result)))}/>

                <Button title='checkLoginEnable'
                        onPress={() => JVerification.checkLoginEnable(result =>
                            console.log('checkLoginEnable:' + JSON.stringify(result)))}/>

                <Button title='getToken'
                        onPress={() => JVerification.getToken(5000, result => {
                            console.log('getToken:' + JSON.stringify(result));
                        })}/>

                <Button title='preLogin'
                        onPress={() => JVerification.preLogin(5000, result => {
                            console.log('preLogin:' + JSON.stringify(result));
                        })}/>
                <Button title='loginAuth'
                        onPress={() => JVerification.loginAuth(true)}/>

                <Button title='addLoginCustomConfig'
                       onPress={() => JVerification.addLoginCustomConfig(customConfigParams, null)}/>

                <Button title='自定义弹窗授权页'
                        onPress={() => {
                            if(Platform.OS == 'android'){
                                JVerification.addLoginCustomConfig(androidDialogConfig, undefined);
                            } else {
                                JVerification.addLoginCustomConfig(iosDialogConfig, []);
                            }
                        }}/>

                <Button title='login'
                        onPress={() => JVerification.login(true)}/>

                <Button title='获取验证码' onPress={() => JVerification.getVerifyCode(codeConfig, result => {
                    console.log('获取验证码:' + JSON.stringify(result));
                })}/>

                <Button title='设置获取验证码时间间隔' onPress={() => JVerification.setCodeTime(1000)}/>


            </View>
        );
    }
}
