<template>
    <div class="live-list">
        <div class="live__form">
            <el-input v-model="liveForm.streamName" placeholder="输入直播间id" />
            <div class="live-url" v-if="liveForm.streamName">
                <span>推流地址：<el-tag>{{ liveForm.pushUrl }}</el-tag></span>
                <span>拉流地址： <el-tag v-for="item in liveForm.pullUrl" :key="item">{{ item }}</el-tag></span>
            </div>
        </div>
        <div class="list__btns">
            <el-button disabled type="primary" @click="handleLive">{{ doLiving ? '停止' : '开始' }}直播</el-button>
            <el-button type="primary" @click="handleShareScreen">{{ doSharing ? '停止' : '开始' }}分享屏幕</el-button>
            <el-button @click="handlePlay">播放直播</el-button>
        </div>

        <div class="live--status">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>状态信息</span>
                    </div>
                </template>
                <span><el-tag>设备支持情况:</el-tag>{{ deviceSupportTips }}</span>
                <span><el-tag>当前连接状态:</el-tag>{{ liveStatus }}</span>
                <span><el-tag>帧率:</el-tag>{{ fps }}</span>
                <span v-if="showLiveTime"><el-tag>开播时长:</el-tag>{{ formatLiveTime() }}</span>
                <span v-if="doLiving || doSharing"><el-tag>观看地址:</el-tag> <el-link v-for="item in liveForm.pullUrl"
                        :key="item">{{ item }}</el-link></span>
            </el-card>

        </div>
        <div id="id_local_video"
            style="width:100%;height:500px;display:flex;align-items:center;justify-content:center;border:1px solid #fff;">
        </div>

        <div class="pull-box">
            <video id="player-container-id" width="414" height="270" preload="auto" playsinline webkit-playsinline>
            </video>

        </div>
    </div>
</template>

<script>
import { tomorrow } from '@/utils/functions/core/date'
import TXLive from '@/utils/live/TXLive'

export default {
    data() {
        return {
            TXLiveInstance: null,
            liveForm: {
                streamName: '',
                pushUrl: '',
                pullUrl: [],
            },
            livePusher: null,
            doLiving: false, // 是否开始直播
            doSharing: false, // 是否在分享屏幕
            deviceSupportTips: '未检测',
            liveStatus: '--', // 连接状态
            fps: 0,
            liveTimer: null, // 统计开播时长
            liveTime: 0,
            showLiveTime: false
        }
    },
    watch: {
        'liveForm.streamName': {
            handler(n, o) {
                this.createUrl()
            }
        }
    },
    computed: {

    },
    beforeCreate() {

    },
    mounted() {
        this.TXLiveUtil = new TXLive()
        this.TXLiveUtil._initSdkScript().then(() => {
            // console.log(TXLivePusher)

            this.TXLiveUtil.checkDeviceSupport().then(res => {
                console.log(res)
            })
            console.log(this.TXLiveUtil.livePusher.getDeviceManager());
            this.init()
        })
        // this.init()
    },
    beforeUnmount() {
        this.livePusher.destroy();
    },
    methods: {
        createUrl() {
            if (this.liveForm.streamName === '') {
                return
            }
            // console.log(tomorrow())
            const pushHost = '184703.push.tlivecloud.com'
            const pullHost = 'pull.vipro.site'  //!!!! 注意不是CNAME
            const appName = 'live'
            const streamName = this.liveForm.streamName
            const pushKey = 'ce809c0d9d6ebab8ca9b9b93453c07dd'
            let pushPullUrl = this.TXLiveInstance.createPushPullUrl({ pushHost, pullHost, appName, streamName, expireDate: Date.now() + 24 * 60 * 60, pushKey, pullKey: '' })  // 过期时间默认24小时后
            this.liveForm.pushUrl = pushPullUrl.pushUrl
            this.liveForm.pullUrl = []
            this.liveForm.pullUrl.push(...pushPullUrl.pullUrls)
        },
        init() {
            let livePusher = this.livePusher = new TXLivePusher();
            this.checkEnable()
            this.setObserver()
            // console.log(livePusher)
            livePusher.setRenderView('id_local_video');
            // 设置视频质量
            livePusher.setVideoQuality('4K');
            // 设置音频质量
            livePusher.setAudioQuality('standard');
            // 自定义设置帧率
            livePusher.setProperty('setVideoFPS', 25);
            // livePusher.setVideoContentHint('detail');



        },
        // SDK 提供静态方法用于检测浏览器对于 WebRTC 的兼容性。
        checkEnable() {
            TXLivePusher.checkSupport().then(data => {
                // 是否支持WebRTC  
                if (data.isWebRTCSupported) {
                    // ElNotification('WebRTC Support')
                    this.deviceSupportTips = '当前设备支持WebRTC'
                } else {
                    console.log('WebRTC Not Support');
                }
                // // 是否支持H264编码  
                // if (data.isH264EncodeSupported) {
                //     ElNotification('H264 Encode Support');
                // } else {
                //     console.log('H264 Encode Not Support');
                // }
                if (data.isScreenCaptureSupported) {
                    // ElNotification('支持屏幕采集')
                    if (this.deviceSupportTips) {
                        this.deviceSupportTips += ', 支持屏幕采集'
                    }
                }
            });



        },
        // 回调事件通知，可以通过设置 Observer 来了解 SDK 内部的状态信息和 WebRTC 相关的数据统计
        setObserver() {
            this.livePusher.setObserver({
                // 推流警告信息
                onWarning: (code, msg) => {
                    console.log(code, msg);

                },
                // 推流连接状态
                onPushStatusUpdate: (status, msg) => {
                    // console.log(status, msg);
                    this.liveStatus = msg
                    // if (msg == 'connected') {
                    //     this.doSharing = true
                    //     this.showLiveTime = true
                    //     this.liveTimer = setInterval(() => {
                    //         this.liveTime++
                    //     }, 1000)
                    // }
                },
                // 推流统计数据
                onStatisticsUpdate: (data) => {
                    // console.log('video fps is ' + data.video.framesPerSecond);
                    this.fps = data.video.framesPerSecond
                }
            });


        },
        handleLive() {
            let livePusher = this.livePusher
            // 采集完摄像头画面后自动推流
            livePusher.startCamera()
                .then(function () {
                    livePusher.startPush(this.liveForm.pushUrl);
                })
                .catch(function (error) {
                    console.log('打开摄像头失败: ' + error.toString());
                });


            // // 采集完摄像头和麦克风之后自动推流
            // Promise.all([livePusher.startCamera(), livePusher.startMicrophone()])
            //     .then(function () {
            //         livePusher.startPush('webrtc://domain/AppName/StreamName?txSecret=xxx&txTime=xxx');
            //     }).catch(e => {
            //         console.log(e)
            //     })

        },
        handleShareScreen() {
            if (this.liveForm.streamName === '') {
                this.$message.warning('输入直播间id')
                return
            }
            // 先采集再推流 - 关闭时先停止推再停止采集
            if (!this.doSharing) {
                this.livePusher.startScreenCapture().then(streamId => {
                    console.log(streamId)

                    // 推流之前要保证已经采集到了音视频流，否则推流接口会调用失败。如果要实现采集到音视频流之后自动推流，可以等待视频流和音频流采集成功之后，再进行推流。
                    this.livePusher.startPush(this.liveForm.pushUrl).then(() => {
                        this.doSharing = true
                        this.showLiveTime = true
                        this.liveTime = 0
                        this.liveTimer = setInterval(() => {
                            this.liveTime++
                        }, 1000)
                    }).catch((e) => {
                        console.dir(e)
                        ElNotification(e.message)
                        this.livePusher.stopPush()
                        this.livePusher.stopScreenCapture()
                        this.liveStatus = 'connect failed'
                    })

                }).catch(e => {
                    console.log(e)
                })
            } else {
                if (this.livePusher.isPushing()) {
                    this.livePusher.stopPush()
                    this.livePusher.stopScreenCapture()
                }
                this.doSharing = false
                clearInterval(this.liveTimer)
                this.fps = 0
            }

        },
        formatLiveTime() {
            let time = this.liveTime; // 1485秒
            let ms = time * 1000; // 1485000毫秒
            let date = new Date(ms);

            // 注意这里是使用的getUTCHours()方法，转换成UTC(协调世界时)时间的小时
            let hour = date.getUTCHours();
            // let hour = date.getHours(); 如果直接使用getHours()方法，则得到的时分秒格式会多出来8个小时（在国内开发基本都是使用的是东八区时间），getHours()方法会把当前的时区给加上。
            let minute = date.getMinutes();
            let second = date.getSeconds();

            let formatTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;

            // console.log(formatTime); // "00:24:45"
            return formatTime; // "00
        },

        handlePlay() {
            var player = TCPlayer('player-container-id', {}); // player-container-id 为播放器容器 ID，必须与 html 中一致
            player.src(this.liveForm.pullUrl[0]); // url 播放地址



        }
    }
}
</script>

<style lang="scss">
.live-list {
    padding: 20px;

    .live__form {
        // width: 50%;
        margin: auto;
        margin-bottom: 20px;

        .live-url {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;

            .el-tag {
                margin-right: 20px;
            }
        }
    }

    .live--status {
        margin: 20px;

        .el-card {
            .el-card__body {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                text-align: left;

                >span:not(:last-child) {
                    margin-bottom: 8px;
                }

                .el-link {
                    margin-right: 30px;
                }
            }
        }

        span {
            font-size: 15px;
            color: #666;
        }
    }
}
</style>
