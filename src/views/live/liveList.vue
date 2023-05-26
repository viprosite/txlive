<template>
    <div class="live-list">
        <div class="list__btns">
            <el-button type="primary" @click="handleLive">{{ doLiving ? '停止' : '开始' }}直播</el-button>
            <el-button type="primary" @click="handleShareScreen">{{ doSharing ? '停止' : '开始' }}分享屏幕</el-button>
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
                <span v-if="doLiving || doSharing"><el-tag>观看地址:</el-tag> <el-link> rtmp://pull.vipro.site/live/11
                    </el-link></span>
            </el-card>

        </div>
        <div id="id_local_video"
            style="width:100%;height:500px;display:flex;align-items:center;justify-content:center;border:1px solid #fff;">
        </div>
    </div>
</template>

<script>
import { ElNotification } from 'element-plus'

export default {
    data() {
        return {
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
    computed: {

    },
    mounted() {
        this.init()
    },
    beforeUnmount() {
        this.livePusher.destroy();
    },
    methods: {
        init() {
            let livePusher = this.livePusher = new TXLivePusher();
            this.checkEnable()
            this.setObserver()
            console.log(livePusher)
            livePusher.setRenderView('id_local_video');
            // 设置视频质量
            livePusher.setVideoQuality('720p');
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
                    livePusher.startPush('webrtc://domain/AppName/StreamName?txSecret=xxx&txTime=xxx');
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
            // 先采集再推流 - 关闭时先停止推再停止采集
            if (!this.doSharing) {
                this.livePusher.startScreenCapture().then(streamId => {
                    console.log(streamId)

                    // 推流之前要保证已经采集到了音视频流，否则推流接口会调用失败。如果要实现采集到音视频流之后自动推流，可以等待视频流和音频流采集成功之后，再进行推流。
                    this.livePusher.startPush('webrtc://184703.push.tlivecloud.com/live/11?txSecret=a1e8ac8943b0f802c7985f044b1a3a7b&txTime=646CE300').then(() => {
                        this.doSharing = true
                        this.showLiveTime = true
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
        }
    }
}
</script>

<style lang="scss">
.live-list {
    .live--status {
        margin: 20px;

        .el-card {
            .el-card__body {
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                >span:not(:last-child) {
                    margin-bottom: 8px;
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