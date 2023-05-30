export default class TXLiveDevice {
    constructor() {
        this.deviceManager = null; // 设备(摄像头 麦克风)管理器
        deviceList = []
    }

    /**
     * @description 获得设备管理器
     */
    getDeviceManager() {
        this.deviceManager = this.livePusher.getDeviceManager();
    }

    /**
     * @description 获得设备列表
     */
    getDeviceList() {
        this.deviceManager.getDevicesList().then(res => {
            if (Array.isArray(res) && res.length > 0) {
                this.deviceList = res
            }
        })
    }

    /**
     * @description 动态添加设备
     * @param device: {deviceId, deviceName, type}
     */
    addDevice(device) {
        this.deviceList.push(device)
    }

    /**
     * @description 更新设备列表 适用于拔出媒体设备后
     */
    updateDevice() {
        this.getDeviceList()
    }

    /**
     * @description 切换设备 
     * @param deviceId 要切换到的设备ID
     * @param type  'video' or 'audio'
     * @param streamId 流id 启动本地混流后必传
     */
    switchDevice(deviceId, type, streamId) {
        if (type != 'video' && type != 'audio') {
            return '设备类型必须是video或audio'
        }
        this.deviceManager.switchDevice(type, deviceId, streamId)
    }


}
